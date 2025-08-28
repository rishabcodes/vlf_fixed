/**
 * Notification Service
 * Handles email, SMS, and in-app notifications
 * Using GoHighLevel for SMS
 */

import { logger } from '@/lib/safe-logger';
import { ghlNotificationService } from './ghl-notifications';

export interface Notification {
  id: string;
  type: 'email' | 'sms' | 'in-app' | 'push';
  recipient: string;
  subject?: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  metadata?: Record<string, unknown>;
  createdAt: Date;
  sentAt?: Date;
}

export class NotificationService {
  /**
   * Send email notification
   */
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    try {
      logger.info('Sending email notification', { to, subject });

      // In production, this would use a real email service
      // For now, we'll just log it
      if (process.env.NODE_ENV === 'production') {
        // TODO: Implement actual email sending
        // await emailService.send({ to, subject, html: message });
      }

      logger.info('Email notification sent successfully', { to });
    } catch (error) {
      logger.error('Failed to send email notification', { error, to });
      throw error;
    }
  }

  /**
   * Send SMS notification via GoHighLevel
   */
  async sendSMS(to: string, message: string): Promise<void> {
    try {
      logger.info('Sending SMS notification via GoHighLevel', { to });

      await ghlNotificationService.sendSMS({
        to,
        body: message,
        tags: ['notification-service'],
      });

      logger.info('SMS notification sent successfully', { to });
    } catch (error) {
      logger.error('Failed to send SMS notification', { error, to });
      throw error;
    }
  }

  /**
   * Send in-app notification
   */
  async sendInApp(
    userId: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ): Promise<void> {
    try {
      logger.info('Creating in-app notification', { userId, type });

      // Store notification in database
      // This would typically be saved to a notifications table
      const notification = {
        userId,
        message,
        type,
        read: false,
        createdAt: new Date(),
      };

      // TODO: Save to database
      // await getPrismaClient().notification.create({ data: notification });

      // Emit real-time event if socket.io is available
      const globalWithIo = global as typeof globalThis & {
        io?: { to: (userId: string) => { emit: (event: string, data: unknown) => void   }
};
      };
      if (globalWithIo.io) {
        globalWithIo.io.to(userId).emit('notification', notification);
      }

      logger.info('In-app notification created', { userId });
    } catch (error) {
      logger.error('Failed to create in-app notification', { error, userId });
      throw error;
    }
  }

  /**
   * Send notification to multiple channels
   */
  async sendMultiChannel(
    recipient: { email?: string; phone?: string; userId?: string },
    message: string,
    options: {
      subject?: string;
      channels?: ('email' | 'sms' | 'in-app')[];
    } = {}
  ): Promise<void> {
    const channels = options.channels || ['email', 'in-app'];
    const promises: Promise<void>[] = [];

    if (channels.includes('email') && recipient.email) {
      promises.push(this.sendEmail(recipient.email, options.subject || 'Notification', message));
    }

    if (channels.includes('sms') && recipient.phone) {
      promises.push(this.sendSMS(recipient.phone, message));
    }

    if (channels.includes('in-app') && recipient.userId) {
      promises.push(this.sendInApp(recipient.userId, message));
    }

    await Promise.allSettled(promises);
  }

  /**
   * Notify about case update
   */
  async notifyCaseUpdate(
    caseId: string,
    clientEmail: string,
    updateType: string,
    details: string
  ): Promise<void> {
    const subject = `Case Update: ${updateType}`;
    const message = `
      <h2>Your case has been updated</h2>
      <p><strong>Update Type:</strong> ${updateType}</p>
      <p><strong>Details:</strong> ${details}</p>
      <p>Log in to your client portal to view more details.</p>
    `;

    await this.sendEmail(clientEmail, subject, message);
  }

  /**
   * Notify about appointment
   */
  async notifyAppointment(
    appointment: {
      id: string;
      clientEmail: string;
      clientPhone?: string;
      date: Date;
      type: string;
    },
    notificationType: 'confirmation' | 'reminder' | 'cancellation'
  ): Promise<void> {
    let subject: string;
    let message: string;

    switch (notificationType) {
      case 'confirmation':
        subject = 'Appointment Confirmed';
        message = `Your ${appointment.type} appointment has been confirmed for ${appointment.date.toLocaleString()}.`;
        break;
      case 'reminder':
        subject = 'Appointment Reminder';
        message = `This is a reminder about your ${appointment.type} appointment on ${appointment.date.toLocaleString()}.`;
        break;
      case 'cancellation':
        subject = 'Appointment Cancelled';
        message = `Your ${appointment.type} appointment scheduled for ${appointment.date.toLocaleString()} has been cancelled.`;
        break;
    }

    // Send via multiple channels
    await this.sendMultiChannel(
      {
        email: appointment.clientEmail,
        phone: appointment.clientPhone,
      },
      message,
      {
        subject,
        channels: ['email', 'sms'],
      }
    );
  }
}

// Export singleton instance
export const notificationService = new NotificationService();

// Export convenience function for backward compatibility
export const createNotification = async (options: {
  userId: string;
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}) => {
  await notificationService.sendInApp(options.userId, options.message);
};
