import nodemailer from 'nodemailer';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { emailQueue } from '@/lib/queue/bull';
import { cache, cacheKeys, CacheTTL } from '@/lib/cache';
import fs from 'fs/promises';
import path from 'path';

export interface EmailOptions {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  template?: string;
  templateData?: Record<string, unknown>;
  attachments?: EmailAttachment[];
  replyTo?: string;
  priority?: 'high' | 'normal' | 'low';
  headers?: Record<string, string>;
}

export interface EmailAttachment {
  filename: string;
  content?: Buffer | string;
  path?: string;
  contentType?: string;
  encoding?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  response?: string;
}

// Simple template function to replace handlebars
function compileTemplate(template: string, data: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return String(data[key] || match);
  });
}

class EmailService {
  private transporter: nodemailer.Transporter;
  private templates: Map<string, string> = new Map();
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor() {
    // Office 365 SMTP configuration
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.OFFICE365_EMAIL || '',
        pass: process.env.OFFICE365_PASSWORD || '',
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
    });

    this.fromEmail =
      process.env.EMAIL_FROM || process.env.OFFICE365_EMAIL || 'leads@vasquezlawfirm.com';
    this.fromName = 'Vasquez Law Firm';

    // Skip verification during build
    if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PHASE) {
      // Defer verification to avoid build-time connection attempts
      import('@/lib/utils/async').then(({ delay }) => {
        delay(5000).then(() => {
          this.verifyConnection();
        });
      });
    }

    // Load email templates
    this.loadTemplates();
  }

  /**
   * Verify SMTP connection
   */
  private async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      logger.info('Office 365 SMTP connection established');
    } catch (error) {
      logger.error('Office 365 SMTP connection error:', errorToLogMeta(error));
    }
  }

  /**
   * Load email templates
   */
  private async loadTemplates(): Promise<void> {
    try {
      const templatesDir = path.join(process.cwd(), 'src/templates/email');

      // Load common templates
      const templateFiles = [
        'welcome.hbs',
        'appointment-confirmation.hbs',
        'appointment-reminder.hbs',
        'payment-receipt.hbs',
        'password-reset.hbs',
        'case-update.hbs',
        'document-ready.hbs',
        'consultation-followup.hbs',
        'newsletter.hbs',
      ];

      for (const file of templateFiles) {
        try {
          const templatePath = path.join(templatesDir, file);
          const templateContent = await fs.readFile(templatePath, 'utf-8');
          const templateName = file.replace('.hbs', '');
          this.templates.set(templateName, templateContent);
        } catch (error) {
          // Template doesn't exist yet, will create default
          logger.debug(`Template ${file} not found, using default`);
        }
      }
    } catch (error) {
      logger.error('Error loading email templates:', errorToLogMeta(error));
    }
  }

  /**
   * Send email
   */
  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      // Prepare email content
      let html = options.html;
      let text = options.text;

      // Use template if specified
      if (options.template) {
        const templateContent =
          this.templates.get(options.template) || this.getDefaultTemplate(options.template);
        html = compileTemplate(templateContent, options.templateData || {});

        // Generate text version from HTML if not provided
        if (!text) {
          text = this.htmlToText(html);
        }
      }

      // Wrap in layout
      html = this.wrapInLayout(html || '', String(options.templateData?.title || options.subject));

      // Prepare mail options
      const mailOptions: nodemailer.SendMailOptions = {
        from: `"${this.fromName}" <${this.fromEmail}>`,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        cc: options.cc
          ? Array.isArray(options.cc)
            ? options.cc.join(', ')
            : options.cc
          : undefined,
        bcc: options.bcc
          ? Array.isArray(options.bcc)
            ? options.bcc.join(', ')
            : options.bcc
          : undefined,
        subject: options.subject,
        html,
        text,
        attachments: options.attachments,
        replyTo: options.replyTo,
        priority: options.priority,
        headers: options.headers,
      };

      // Send email
      const info = await this.transporter.sendMail(mailOptions);

      logger.info('Email sent successfully', {
        messageId: info.messageId,
        to: options.to,
        subject: options.subject,
      });

      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
      };
    } catch (error) {
      logger.error('Email send error:', errorToLogMeta(error));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Queue email for async sending
   */
  async queue(options: EmailOptions, delay?: number): Promise<void> {
    await emailQueue.add('send-email', options, {
      delay,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  }

  /**
   * Send bulk emails
   */
  async sendBulk(
    recipients: string[],
    options: Omit<EmailOptions, 'to'>,
    options2: { batchSize?: number; delayBetweenBatches?: number } = {}
  ): Promise<{ sent: number; failed: number; errors: string[] }> {
    const { batchSize = 50, delayBetweenBatches = 1000 } = options2;
    const results = { sent: 0, failed: 0, errors: [] as string[] };

    // Process in batches
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      // Queue each email
      for (const recipient of batch) {
        try {
          await this.queue({ ...options, to: recipient });
          results.sent++;
        } catch (error) {
          results.failed++;
          results.errors.push(`Failed to queue email for ${recipient}`);
        }
      }

      // Delay between batches
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    }

    return results;
  }

  /**
   * Get default template
   */
  private getDefaultTemplate(templateName: string): string {
    const defaultTemplates: Record<string, string> = {
      welcome: `
        <h2>Welcome to Vasquez Law Firm!</h2>
        <p>Dear {{name}},</p>
        <p>Thank you for choosing Vasquez Law Firm. We're committed to providing you with honest, reliable legal representation at an affordable price.</p>
        <p>If you have any questions, please don't hesitate to contact us at 1-844-YO-PELEO (1-844-967-3536).</p>
        <p>Best regards,<br>The Vasquez Law Team</p>
      `,
      'appointment-confirmation': `
        <h2>Appointment Confirmed</h2>
        <p>Dear {{clientName}},</p>
        <p>Your appointment has been confirmed for:</p>
        <ul>
          <li><strong>Date:</strong> {{formatDate appointmentDate}}</li>
          <li><strong>Time:</strong> {{appointmentTime}}</li>
          <li><strong>Location:</strong> {{location}}</li>
          <li><strong>Attorney:</strong> {{attorneyName}}</li>
        </ul>
        <p>Please arrive 10 minutes early and bring any relevant documents.</p>
        <p>If you need to reschedule, please call us at 1-844-967-3536.</p>
      `,
      'payment-receipt': `
        <h2>Payment Receipt</h2>
        <p>Dear {{clientName}},</p>
        <p>Thank you for your payment. Here are the details:</p>
        <ul>
          <li><strong>Amount:</strong> {{formatCurrency amount}}</li>
          <li><strong>Date:</strong> {{formatDate date}}</li>
          <li><strong>Transaction ID:</strong> {{transactionId}}</li>
          <li><strong>Description:</strong> {{description}}</li>
        </ul>
        <p>This receipt serves as confirmation of your payment.</p>
      `,
    };

    return defaultTemplates[templateName] || '<p>{{content}}</p>';
  }

  /**
   * Wrap content in email layout
   */
  private wrapInLayout(content: string, title: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #6B1F2E;
      padding-bottom: 20px;
    }
    .logo {
      max-width: 200px;
      height: auto;
    }
    .content {
      margin-bottom: 30px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      color: #666;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #6B1F2E;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      margin: 10px 0;
    }
    .button:hover {
      background-color: #8B2635;
    }
    h1, h2, h3 {
      color: #6B1F2E;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: #6B1F2E; margin: 0;">Vasquez Law Firm</h1>
      <p style="margin: 5px 0; color: #C9974D;">Honest, Reliable Legal Representation</p>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>
        <strong>Vasquez Law Firm, PLLC</strong><br>
        1-844-YO-PELEO (1-844-967-3536)<br>
        <a href="https://www.vasquezlawnc.com" style="color: #6B1F2E;">www.vasquezlawnc.com</a>
      </p>
      <p>
        Offices in Raleigh, Charlotte, Winston-Salem, and Orlando<br>
        © ${new Date().getFullYear()} Vasquez Law Firm. All rights reserved.
      </p>
      <p style="font-size: 12px; color: #999;">
        This email and any attachments are confidential and may be legally privileged.
        If you are not the intended recipient, please notify us immediately.
      </p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Convert HTML to plain text
   */
  private htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/"/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Send appointment confirmation
   */
  async sendAppointmentConfirmation(appointment: {
    clientEmail: string;
    clientName: string;
    date: Date;
    time: string;
    location: string;
    attorneyName: string;
    type: string;
    notes?: string;
  }): Promise<EmailResult> {
    return this.send({
      to: appointment.clientEmail,
      subject: 'Appointment Confirmation - Vasquez Law Firm',
      template: 'appointment-confirmation',
      templateData: {
        clientName: appointment.clientName,
        appointmentDate: appointment.date,
        appointmentTime: appointment.time,
        location: appointment.location,
        attorneyName: appointment.attorneyName,
        appointmentType: appointment.type,
        notes: appointment.notes,
      },
    });
  }

  /**
   * Send payment receipt
   */
  async sendPaymentReceipt(payment: {
    clientEmail: string;
    clientName: string;
    amount: number;
    transactionId: string;
    description: string;
    date: Date;
  }): Promise<EmailResult> {
    return this.send({
      to: payment.clientEmail,
      subject: 'Payment Receipt - Vasquez Law Firm',
      template: 'payment-receipt',
      templateData: payment,
    });
  }

  /**
   * Send case update
   */
  async sendCaseUpdate(update: {
    clientEmail: string;
    clientName: string;
    caseNumber: string;
    updateTitle: string;
    updateContent: string;
    nextSteps?: string[];
    attorneyName: string;
  }): Promise<EmailResult> {
    return this.send({
      to: update.clientEmail,
      subject: `Case Update: ${update.updateTitle}`,
      template: 'case-update',
      templateData: update,
    });
  }

  /**
   * Send newsletter
   */
  async sendNewsletter(
    recipients: string[],
    content: {
      subject: string;
      title: string;
      content: string;
      articles?: Array<{
        title: string;
        summary: string;
        link: string;
      }>;
    }
  ): Promise<{ sent: number; failed: number; errors: string[] }> {
    return this.sendBulk(recipients, {
      subject: content.subject,
      template: 'newsletter',
      templateData: content,
      priority: 'low',
    });
  }

  /**
   * Get email statistics
   */
  async getStats(period: 'day' | 'week' | 'month' = 'day'): Promise<{
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    complaints: number;
  }> {
    const cacheKey = `email:stats:${period}`;

    return cache.remember(
      cacheKey,
      async () => {
        // In production, this would query email logs from database
        return {
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          bounced: 0,
          complaints: 0,
        };
      },
      CacheTTL.LONG
    );
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export convenience function
export const sendEmail = (options: EmailOptions) => emailService.send(options);
