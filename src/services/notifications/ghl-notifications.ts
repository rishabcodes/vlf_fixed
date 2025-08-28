import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { ghlService } from '@/services/gohighlevel';

// Schemas for validation
const SendSMSSchema = z.object({
  to: z.string().regex(/^\+?[1-9]\d{1,14}$/), // E.164 format
  body: z.string().min(1).max(1600),
  tags: z.array(z.string()).optional(),
});

const BulkSMSSchema = z.object({
  recipients: z.array(z.string().regex(/^\+?[1-9]\d{1,14}$/)),
  body: z.string().min(1).max(1600),
  tags: z.array(z.string()).optional(),
});

export class GHLNotificationService {
  private campaignIds: {
    appointmentReminder: string;
    caseUpdate: string;
    welcomeMessage: string;
    generalNotification: string;
  };

  constructor() {
    // Configure campaign IDs from environment
    this.campaignIds = {
      appointmentReminder: process.env.GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID || '',
      caseUpdate: process.env.GHL_CASE_UPDATE_CAMPAIGN_ID || '',
      welcomeMessage: process.env.GHL_WELCOME_CAMPAIGN_ID || '',
      generalNotification: process.env.GHL_GENERAL_NOTIFICATION_CAMPAIGN_ID || '',
    };
  }

  // Send SMS via GoHighLevel
  async sendSMS(options: z.infer<typeof SendSMSSchema>) {
    try {
      const validated = SendSMSSchema.parse(options);

      // Send SMS through GoHighLevel
      const result = await ghlService.sendSMSByPhone(
        validated.to,
        validated.body,
        validated.tags || ['automated-sms']
      );

      logger.info('SMS sent via GoHighLevel', {
        to: validated.to,
        tags: validated.tags,
      });

      return {
        success: true,
        provider: 'gohighlevel',
        messageId: result.id,
        to: validated.to,
        body: validated.body,
      };
    } catch (error) {
      logger.error('Failed to send SMS via GoHighLevel:', errorToLogMeta(error));
      throw error;
    }
  }

  // Send bulk SMS
  async sendBulkSMS(options: z.infer<typeof BulkSMSSchema>) {
    try {
      const validated = BulkSMSSchema.parse(options);
      const results: unknown[] = [];
      const errors: unknown[] = [];

      // Process in batches to avoid rate limiting
      const batchSize = 10;
      for (let i = 0; i < validated.recipients.length; i += batchSize) {
        const batch = validated.recipients.slice(i, i + batchSize);

        const promises = batch.map(async to => {
          try {
            const result = await this.sendSMS({
              to,
              body: validated.body,
              tags: validated.tags,
            });
            results.push(result);
          } catch (error) {
            errors.push({ recipient: to, error });
          }
        });

        await Promise.all(promises);

        // Rate limit: wait 1 second between batches
        if (i + batchSize < validated.recipients.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (errors.length > 0) {
        logger.warn('Some SMS messages failed to send', { errors });
      }

      return {
        sent: results.length,
        failed: errors.length,
        results,
        errors,
      };
    } catch (error) {
      logger.error('Failed to send bulk SMS:', errorToLogMeta(error));
      throw error;
    }
  }

  // Send appointment reminder using campaign
  async sendAppointmentReminder(appointment: {
    id: string;
    clientPhone: string;
    clientName: string;
    date: Date;
    time: string;
    attorneyName: string;
    type: string;
    location?: string;
  }) {
    try {
      const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });

      // If we have a campaign ID, use it
      if (this.campaignIds.appointmentReminder) {
        await ghlService.addToCampaignByPhone(
          appointment.clientPhone,
          this.campaignIds.appointmentReminder,
          {
            firstName: appointment.clientName.split(' ')[0],
            lastName: appointment.clientName.split(' ').slice(1).join(' '),
            customFields: {
              appointmentDate: formattedDate,
              appointmentTime: appointment.time,
              attorneyName: appointment.attorneyName,
              appointmentType: appointment.type,
              appointmentLocation: appointment.location || 'Phone Consultation',
            },
            tags: ['appointment-reminder', appointment.type],
          }
        );
      } else {
        // Fallback to direct SMS
        const message = this.formatAppointmentReminder(appointment);
        await this.sendSMS({
          to: appointment.clientPhone,
          body: message,
          tags: ['appointment-reminder', appointment.type],
        });
      }

      // Update appointment record
      await getPrismaClient().appointment.update({
        where: { id: appointment.id },
        data: {
          metadata: {
            reminderSent: true,
            reminderSentAt: new Date().toISOString(),
            reminderProvider: 'gohighlevel',
          },
        },
      });

      logger.info('Appointment reminder sent', {
        appointmentId: appointment.id,
        phone: appointment.clientPhone,
      });
    } catch (error) {
      logger.error('Failed to send appointment reminder:', errorToLogMeta(error));
      throw error;
    }
  }

  // Send case update
  async sendCaseUpdate(caseInfo: {
    clientPhone: string;
    clientName: string;
    caseNumber: string;
    updateType: string;
    message: string;
  }) {
    try {
      // If we have a campaign ID, use it
      if (this.campaignIds.caseUpdate) {
        await ghlService.addToCampaignByPhone(caseInfo.clientPhone, this.campaignIds.caseUpdate, {
          firstName: caseInfo.clientName.split(' ')[0],
          lastName: caseInfo.clientName.split(' ').slice(1).join(' '),
          customFields: {
            caseNumber: caseInfo.caseNumber,
            updateType: caseInfo.updateType,
            updateMessage: caseInfo.message,
          },
          tags: ['case-update', caseInfo.updateType.toLowerCase().replace(/\s+/g, '-')],
        });
      } else {
        // Fallback to direct SMS
        const body = `Hello ${caseInfo.clientName},

Case Update (${caseInfo.caseNumber}):
${caseInfo.updateType}

${caseInfo.message}

Questions? Call 1-844-YO-PELEO or visit vasquezlawnc.com

- Vasquez Law Firm`;

        await this.sendSMS({
          to: caseInfo.clientPhone,
          body,
          tags: ['case-update', caseInfo.updateType.toLowerCase().replace(/\s+/g, '-')],
        });
      }

      logger.info('Case update sent', {
        caseNumber: caseInfo.caseNumber,
        phone: caseInfo.clientPhone,
      });
    } catch (error) {
      logger.error('Failed to send case update:', errorToLogMeta(error));
      throw error;
    }
  }

  // Send welcome message to new contact
  async sendWelcomeMessage(contact: {
    phone: string;
    name: string;
    email?: string;
    source?: string;
  }) {
    try {
      if (this.campaignIds.welcomeMessage) {
        await ghlService.addToCampaignByPhone(contact.phone, this.campaignIds.welcomeMessage, {
          firstName: contact.name.split(' ')[0],
          lastName: contact.name.split(' ').slice(1).join(' '),
          email: contact.email,
          source: contact.source || 'Website',
          tags: ['welcome-message', 'new-contact'],
        });
      } else {
        // Fallback to direct SMS
        const message = `Welcome to Vasquez Law Firm, ${contact.name}!

Thank you for contacting us. We're here to help with your legal needs.

Our team will review your inquiry and contact you within 24 hours.

For immediate assistance:
📞 1-844-YO-PELEO
🌐 vasquezlawnc.com

Se habla español`;

        await this.sendSMS({
          to: contact.phone,
          body: message,
          tags: ['welcome-message', 'new-contact'],
        });
      }
    } catch (error) {
      logger.error('Failed to send welcome message:', errorToLogMeta(error));
      throw error;
    }
  }

  // Format appointment reminder message
  private formatAppointmentReminder(appointment: {
    clientName: string;
    type: string;
    attorneyName: string;
    date: Date;
    time: string;
    location?: string;
  }): string {
    const date = new Date(appointment.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    let message = `Hi ${appointment.clientName},

Reminder: You have a ${appointment.type} appointment with ${appointment.attorneyName} on ${formattedDate} at ${appointment.time}.`;

    if (appointment.location) {
      message += `\n\nLocation: ${appointment.location}`;
    } else {
      message += '\n\nThis is a phone consultation. We will call you at this number.';
    }

    message += '\n\nNeed to reschedule? Call 1-844-YO-PELEO';

    return message;
  }

  // Notify attorneys
  async notifyAttorneys(message: string, urgency: 'low' | 'medium' | 'high' = 'medium') {
    try {
      // Get all attorneys with phone numbers
      const attorneys = await getPrismaClient().user.findMany({
        where: {
          role: 'ATTORNEY',
          phone: { not: null },
        },
      });

      const phoneNumbers = attorneys.map(a => a.phone).filter((p): p is string => p !== null);

      if (phoneNumbers.length > 0) {
        const prefix = urgency === 'high' ? '🚨 URGENT: ' : '';
        const tags = ['attorney-notification', `urgency-${urgency}`];

        await this.sendBulkSMS({
          recipients: phoneNumbers,
          body: prefix + message,
          tags,
        });
      }
    } catch (error) {
      logger.error('Failed to notify attorneys:', errorToLogMeta(error));
    }
  }

  // Make outbound call via GoHighLevel
  async makeCall(options: { to: string; campaignId?: string; tags?: string[] }) {
    try {
      // GoHighLevel typically handles calls through campaigns
      if (options.campaignId) {
        await ghlService.addToCampaignByPhone(options.to, options.campaignId, {
          tags: options.tags || ['outbound-call'],
        });

        logger.info('Call campaign triggered via GoHighLevel', {
          to: options.to,
          campaignId: options.campaignId,
        });
      } else {
        logger.warn('No campaign ID provided for call - GoHighLevel requires campaign for calls');
        throw new Error('Campaign ID required for making calls via GoHighLevel');
      }
    } catch (error) {
      logger.error('Failed to make call via GoHighLevel:', errorToLogMeta(error));
      throw error;
    }
  }
}

// Export singleton instance
export const ghlNotificationService = new GHLNotificationService();
