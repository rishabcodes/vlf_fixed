import { getPrismaClient } from '@/lib/prisma';
import { ghlService } from '@/services/gohighlevel';
import { emailService } from '@/services/email';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { addDays, subDays, startOfDay, endOfDay } from 'date-fns';

interface AppointmentWithUser {
  id: string;
  scheduledAt: Date;
  type: string;
  practiceArea?: string;
  location?: string | null;
  notes?: string | null;
  user: {
    id: string;
    email: string;
    name?: string | null;
    phone?: string | null;
  };
  case?: {
    attorney?: {
      name?: string | null;
    } | null;
  } | null;
  metadata?: Record<string, unknown>;
}

export class AppointmentReminderService {
  // Send reminders for appointments
  async sendUpcomingReminders() {
    try {
      // Get appointments for tomorrow
      const tomorrow = addDays(new Date(), 1);
      const appointments = await this.getAppointmentsForDate(tomorrow);

      logger.info(`Found ${appointments.length} appointments for reminder`);

      for (const appointment of appointments) {
        await this.sendReminder(appointment as AppointmentWithUser);
      }

      // Get appointments for 1 week out
      const nextWeek = addDays(new Date(), 7);
      const weeklyAppointments = await this.getAppointmentsForDate(nextWeek);

      for (const appointment of weeklyAppointments) {
        await this.sendWeeklyReminder(appointment as AppointmentWithUser);
      }
    } catch (error) {
      logger.error('Failed to send appointment reminders:', errorToLogMeta(error));
    }
  }

  // Get appointments for a specific date
  private async getAppointmentsForDate(date: Date) {
    return getPrismaClient().appointment.findMany({
      where: {
        scheduledAt: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
        status: 'scheduled',
        // reminderSent: false,
      },
      include: {
        user: true,
        case: true,
      },
    });
  }

  // Send 24-hour reminder
  private async sendReminder(appointment: {
    id: string;
    scheduledAt: Date | string;
    type: string;
    location?: string | null;
    notes?: string | null;
    metadata?: unknown;
    user: {
      id: string;
      email: string;
      name?: string | null;
      phone?: string | null;
    };
    case?: {
      attorney?: {
        name?: string | null;
      } | null;
    } | null;
  }) {
    try {
      const user = appointment.user;
      const appointmentDate = new Date(appointment.scheduledAt);
      const dateStr = appointmentDate.toLocaleDateString();
      const timeStr = appointmentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Send SMS via GHL if phone number available
      if (user.phone) {
        await ghlService.sendAppointmentReminder({
          id: appointment.id,
          clientPhone: user.phone,
          clientName: user.name || user.email,
          date: appointmentDate,
          time: timeStr,
          attorneyName: appointment.case?.attorney?.name || 'Your Attorney',
          type: appointment.type,
          location: appointment.location || 'Phone consultation',
        });
      }

      // Send email reminder
      if (user.email) {
        await emailService.send({
          to: user.email,
          subject: 'Appointment Reminder - Vasquez Law Firm',
          template: 'appointment-reminder',
          templateData: {
            clientName: user.name || user.email,
            appointmentDate: dateStr,
            appointmentTime: timeStr,
            attorneyName:
              (appointment as AppointmentWithUser & { case?: { attorney?: { name?: string } } })
                .case?.attorney?.name || 'Your Attorney',
            appointmentType: appointment.type,
            location: appointment.location || 'Phone consultation',
            notes: appointment.notes,
          },
        });
      }

      // Mark reminder as sent (add these fields to metadata)
      await getPrismaClient().appointment.update({
        where: { id: appointment.id },
        data: {
          metadata: {
            ...((appointment.metadata as object) || {}),
            reminderSent: true,
            reminderSentAt: new Date().toISOString(),
          },
        },
      });

      logger.info('Appointment reminder sent', {
        appointmentId: appointment.id,
        userId: user.id,
      });
    } catch (error) {
      logger.error('Failed to send appointment reminder:', errorToLogMeta(error));
    }
  }

  // Send 1-week reminder
  private async sendWeeklyReminder(appointment: AppointmentWithUser) {
    try {
      const user = appointment.user;
      const appointmentDate = new Date(appointment.scheduledAt);
      const dateStr = appointmentDate.toLocaleDateString();
      const timeStr = appointmentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Only send email for weekly reminders
      if (user.email) {
        await emailService.send({
          to: user.email,
          subject: 'Upcoming Appointment - Vasquez Law Firm',
          template: 'appointment-reminder-weekly',
          templateData: {
            clientName: user.name || user.email,
            appointmentDate: dateStr,
            appointmentTime: timeStr,
            attorneyName:
              (appointment as AppointmentWithUser & { case?: { attorney?: { name?: string } } })
                .case?.attorney?.name || 'Your Attorney',
            appointmentType: appointment.type,
            documentsNeeded: this.getRequiredDocuments(appointment.type),
          },
        });
      }
    } catch (error) {
      logger.error('Failed to send weekly reminder:', errorToLogMeta(error));
    }
  }

  // Handle appointment confirmation
  async handleConfirmation(phoneNumber: string, appointmentId: string) {
    try {
      const appointment = await getPrismaClient().appointment.findUnique({
        where: { id: appointmentId },
        include: { user: true },
      });

      if (!appointment) {
        return 'Appointment not found.';
      }

      // Verify phone number matches
      if (appointment.user.phone !== phoneNumber) {
        return 'Phone number does not match appointment.';
      }

      // Update appointment status and metadata
      await getPrismaClient().appointment.update({
        where: { id: appointmentId },
        data: {
          status: 'confirmed',
          metadata: {
            ...((appointment.metadata as object) || {}),
            confirmed: true,
            confirmedAt: new Date().toISOString(),
          },
        },
      });

      return 'Thank you! Your appointment has been confirmed. We look forward to seeing you.';
    } catch (error) {
      logger.error('Failed to confirm appointment:', errorToLogMeta(error));
      return 'Sorry, we could not confirm your appointment. Please call our office.';
    }
  }

  // Handle appointment cancellation
  async handleCancellation(phoneNumber: string, appointmentId: string) {
    try {
      const appointment = await getPrismaClient().appointment.findUnique({
        where: { id: appointmentId },
        include: { user: true, case: { include: { attorney: true } } },
      });

      if (!appointment) {
        return 'Appointment not found.';
      }

      // Verify phone number matches
      if (appointment.user.phone !== phoneNumber) {
        return 'Phone number does not match appointment.';
      }

      // Update appointment status
      await getPrismaClient().appointment.update({
        where: { id: appointmentId },
        data: {
          status: 'cancelled',
          metadata: {
            ...((appointment.metadata as object) || {}),
            cancelledAt: new Date().toISOString(),
            cancelReason: 'Client requested via SMS',
          },
        },
      });

      // Notify attorney via GHL
      if (appointment.case?.attorney?.phone) {
        const appointmentDate = new Date(appointment.scheduledAt);
        const dateStr = appointmentDate.toLocaleDateString();
        const timeStr = appointmentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        await ghlService.sendSMSByPhone(
          appointment.case.attorney.phone,
          `Appointment cancelled: ${appointment.user.name || appointment.user.email} on ${dateStr} at ${timeStr}`,
          ['attorney-notification', 'appointment-cancelled']
        );
      }

      return 'Your appointment has been cancelled. Please call 1-844-YO-PELEO to reschedule.';
    } catch (error) {
      logger.error('Failed to cancel appointment:', errorToLogMeta(error));
      return 'Sorry, we could not cancel your appointment. Please call our office.';
    }
  }

  // Get required documents based on appointment type
  private getRequiredDocuments(appointmentType: string): string[] {
    const documentMap: Record<string, string[]> = {
      'immigration-consultation': [
        'Passport',
        'Current visa (if applicable)',
        'I-94 arrival record',
        'Any immigration notices',
      ],
      'personal-injury-consultation': [
        'Police report',
        'Medical records',
        'Insurance information',
        'Photos of injuries/damage',
      ],
      'criminal-defense-consultation': [
        'Court documents',
        'Police report',
        'Bail paperwork',
        'Any notices received',
      ],
      'family-law-consultation': [
        'Marriage certificate',
        'Financial documents',
        'Custody agreements (if applicable)',
        'Property deeds',
      ],
    };

    return documentMap[appointmentType] || ['Government-issued ID'];
  }

  // Send follow-up after appointment
  async sendFollowUpSurvey(appointmentId: string) {
    try {
      const appointment = await getPrismaClient().appointment.findUnique({
        where: { id: appointmentId },
        include: { user: true },
      });

      if (!appointment || appointment.status !== 'completed') {
        return;
      }

      const user = appointment.user;

      // Send SMS survey via GHL
      if (user.phone) {
        // Trigger survey campaign
        const surveyCampaignId = process.env.GHL_SURVEY_CAMPAIGN_ID;

        if (surveyCampaignId) {
          await ghlService.addToCampaignByPhone(user.phone, surveyCampaignId, {
            firstName: user.name?.split(' ')[0] || '',
            lastName: user.name?.split(' ').slice(1).join(' ') || '',
            tags: ['appointment-survey', 'follow-up'],
            customFields: {
              appointmentId: appointment.id,
              appointmentDate: appointment.scheduledAt.toISOString(),
            },
          });
        } else {
          // Fallback to direct SMS
          await ghlService.sendSMSByPhone(
            user.phone,
            `Thank you for visiting Vasquez Law Firm! How was your experience? Reply with a rating 1-5 (5 being excellent).`,
            ['survey-request']
          );
        }
      }

      // Send email survey
      if (user.email) {
        const appointmentDate = new Date(appointment.scheduledAt);
        await emailService.send({
          to: user.email,
          subject: 'How was your appointment?',
          template: 'appointment-survey',
          templateData: {
            clientName: user.name || user.email,
            appointmentDate: appointmentDate.toLocaleDateString(),
            surveyLink: `${process.env.NEXT_PUBLIC_APP_URL}/survey/${appointment.id}`,
          },
        });
      }
    } catch (error) {
      logger.error('Failed to send follow-up survey:', errorToLogMeta(error));
    }
  }
}

export const appointmentReminderService = new AppointmentReminderService();
