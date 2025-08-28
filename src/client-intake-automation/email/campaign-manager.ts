/**
 * Email Campaign Manager - Automated email sequences for lead nurturing
 */

import { emailService } from '@/services/email.service';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/safe-logger';
import Bull from 'bull';

interface CampaignData {
  userId: string;
  email: string;
  name: string;
  campaignType: 'hot-lead' | 'standard' | 'cold-lead' | 're-engagement';
  data: {
    caseType: string;
    language: string;
    leadScore: number;
    assignedTeam: string;
    ghlContactId?: string;
  };
}

interface EmailSequence {
  delay: number; // Delay in milliseconds
  templateKey: string;
  subject: string;
  condition?: (data: CampaignData) => boolean;
}

export class EmailCampaignManager {
  private emailQueue: Bull.Queue;
  private prisma;

  constructor() {
    // Initialize Bull queue for scheduled emails
    this.emailQueue = new Bull('email-campaigns', {
      redis: {
        port: parseInt(process.env.REDIS_PORT || '6379'),
        host: process.env.REDIS_HOST || 'localhost',
      }
    });

    this.prisma = getPrismaClient();
    this.setupQueueProcessors();
  }

  /**
   * Start an email campaign for a lead
   */
  async startCampaign(campaign: CampaignData): Promise<void> {
    try {
      const sequence = this.getSequenceForCampaign(campaign.campaignType);
      
      // Schedule each email in the sequence
      for (const email of sequence) {
        // Check if condition is met (if any)
        if (email.condition && !email.condition(campaign)) {
          continue;
        }

        // Add to queue with delay
        await this.emailQueue.add('send-campaign-email', {
          ...campaign,
          templateKey: email.templateKey,
          subject: email.subject,
        }, {
          delay: email.delay,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000
          }
        });

        apiLogger.info('Campaign email scheduled', {
          userId: campaign.userId,
          email: campaign.email,
          template: email.templateKey,
          delay: email.delay
        });
      }

      // Save campaign to database
      await this.prisma.emailCampaign.create({
        data: {
          userId: campaign.userId,
          type: campaign.campaignType,
          status: 'active',
          metadata: campaign.data as any,
          startedAt: new Date()
        }
      });

    } catch (error) {
      apiLogger.error('Failed to start campaign', error as Error);
      throw error;
    }
  }

  /**
   * Get email sequence based on campaign type
   */
  private getSequenceForCampaign(type: string): EmailSequence[] {
    const sequences: Record<string, EmailSequence[]> = {
      'hot-lead': [
        {
          delay: 0, // Immediate
          templateKey: 'hot-lead-immediate',
          subject: 'We received your urgent request - Attorney reviewing now'
        },
        {
          delay: 15 * 60 * 1000, // 15 minutes
          templateKey: 'hot-lead-followup',
          subject: 'Your case is being reviewed by our senior attorney'
        },
        {
          delay: 60 * 60 * 1000, // 1 hour
          templateKey: 'hot-lead-checkin',
          subject: 'Quick update on your case',
          condition: (data) => data.data.leadScore >= 80
        },
        {
          delay: 24 * 60 * 60 * 1000, // 24 hours
          templateKey: 'hot-lead-documents',
          subject: 'Documents needed for your case'
        }
      ],
      'standard': [
        {
          delay: 0, // Immediate
          templateKey: 'standard-welcome',
          subject: 'Thank you for contacting Vasquez Law Firm'
        },
        {
          delay: 60 * 60 * 1000, // 1 hour
          templateKey: 'standard-review',
          subject: 'Your case is under review'
        },
        {
          delay: 24 * 60 * 60 * 1000, // 24 hours
          templateKey: 'standard-nextSteps',
          subject: 'Next steps for your legal matter'
        },
        {
          delay: 3 * 24 * 60 * 60 * 1000, // 3 days
          templateKey: 'standard-resources',
          subject: 'Helpful resources for your case type'
        },
        {
          delay: 7 * 24 * 60 * 60 * 1000, // 7 days
          templateKey: 'standard-consultation',
          subject: 'Schedule your free consultation'
        }
      ],
      'cold-lead': [
        {
          delay: 0, // Immediate
          templateKey: 'cold-acknowledgment',
          subject: 'We received your inquiry'
        },
        {
          delay: 3 * 24 * 60 * 60 * 1000, // 3 days
          templateKey: 'cold-information',
          subject: 'Information about our services'
        },
        {
          delay: 7 * 24 * 60 * 60 * 1000, // 7 days
          templateKey: 'cold-testimonials',
          subject: 'See what our clients say about us'
        },
        {
          delay: 14 * 24 * 60 * 60 * 1000, // 14 days
          templateKey: 'cold-offer',
          subject: 'Free consultation available'
        }
      ],
      're-engagement': [
        {
          delay: 0,
          templateKey: 'reengagement-hello',
          subject: 'We noticed you visited our site'
        },
        {
          delay: 2 * 24 * 60 * 60 * 1000, // 2 days
          templateKey: 'reengagement-help',
          subject: 'Can we help with your legal matter?'
        },
        {
          delay: 5 * 24 * 60 * 60 * 1000, // 5 days
          templateKey: 'reengagement-final',
          subject: 'Last chance for free consultation'
        }
      ]
    };

    return sequences[type] || sequences['standard'];
  }

  /**
   * Setup queue processors
   */
  private setupQueueProcessors(): void {
    this.emailQueue.process('send-campaign-email', async (job) => {
      const data = job.data as CampaignData & { 
        templateKey: string; 
        subject: string; 
      };

      try {
        // Get email template content
        const content = this.getEmailContent(
          data.templateKey,
          data.name,
          data.data
        );

        // Send email using existing email service
        await emailService.sendRawEmail({
          to: data.email,
          subject: data.subject,
          html: content.html,
          text: content.text
        });

        // Log success
        await this.prisma.emailLog.create({
          data: {
            userId: data.userId,
            type: 'campaign',
            template: data.templateKey,
            status: 'sent',
            metadata: {
              campaignType: data.campaignType,
              ...data.data
            } as any
          }
        });

        apiLogger.info('Campaign email sent', {
          userId: data.userId,
          email: data.email,
          template: data.templateKey
        });

      } catch (error) {
        apiLogger.error('Failed to send campaign email', error as Error);
        throw error;
      }
    });
  }

  /**
   * Get email content based on template
   */
  private getEmailContent(
    templateKey: string,
    name: string,
    data: any
  ): { html: string; text: string } {
    // In production, these would be proper templates
    const templates: Record<string, { html: string; text: string }> = {
      'hot-lead-immediate': {
        html: `
          <h2>Dear ${name},</h2>
          <p>Thank you for reaching out to Vasquez Law Firm regarding your <strong>${data.caseType}</strong> matter.</p>
          <p>Due to the urgent nature of your case, one of our senior attorneys is reviewing your information right now.</p>
          <p><strong>You can expect a call within the next 15 minutes.</strong></p>
          <p>Please keep your phone nearby. If we cannot reach you, we will leave a voicemail and send a follow-up email.</p>
          <hr>
          <p>If you need immediate assistance, please call us directly at: <strong>1-877-827-7839</strong></p>
        `,
        text: `Dear ${name}, Thank you for reaching out regarding your ${data.caseType} matter. An attorney is reviewing your case and will call you within 15 minutes. Please keep your phone nearby.`
      },
      'standard-welcome': {
        html: `
          <h2>Welcome ${name},</h2>
          <p>Thank you for contacting Vasquez Law Firm about your <strong>${data.caseType}</strong> case.</p>
          <p>We have received your information and one of our experienced attorneys will review it shortly.</p>
          <p>What happens next:</p>
          <ul>
            <li>Your case will be reviewed by our legal team</li>
            <li>We will contact you within 1 business hour</li>
            <li>We'll discuss your options and next steps</li>
          </ul>
          <p>In the meantime, feel free to call us at <strong>1-877-827-7839</strong> if you have any immediate questions.</p>
        `,
        text: `Welcome ${name}, Thank you for contacting us about your ${data.caseType} case. We will review your information and contact you within 1 business hour.`
      },
      'cold-acknowledgment': {
        html: `
          <h2>Hello ${name},</h2>
          <p>We received your inquiry about <strong>${data.caseType}</strong>.</p>
          <p>Our team will review your information and get back to you with relevant information about how we can help.</p>
          <p>If you have any questions in the meantime, please don't hesitate to reach out to us at <strong>1-877-827-7839</strong>.</p>
        `,
        text: `Hello ${name}, We received your inquiry about ${data.caseType}. Our team will review and get back to you soon.`
        }
};

    // Return template or default
    return templates[templateKey] || {
      html: `<p>Dear ${name}, Thank you for contacting Vasquez Law Firm. We will be in touch soon.</p>`,
      text: `Dear ${name}, Thank you for contacting Vasquez Law Firm. We will be in touch soon.`
    };
  }

  /**
   * Stop a campaign for a user
   */
  async stopCampaign(userId: string): Promise<void> {
    try {
      // Update campaign status in database
      await this.prisma.emailCampaign.updateMany({
        where: {
          userId,
          status: 'active'
        },
        data: {
          status: 'stopped',
          stoppedAt: new Date()
        }
      });

      // Remove pending jobs from queue
      const jobs = await this.emailQueue.getJobs(['delayed', 'waiting']);
      for (const job of jobs) {
        if (job.data.userId === userId) {
          await job.remove();
        }
      }

      apiLogger.info('Campaign stopped', { userId });
    } catch (error) {
      apiLogger.error('Failed to stop campaign', error as Error);
    }
  }

  /**
   * Get campaign status for a user
   */
  async getCampaignStatus(userId: string): Promise<any> {
    const campaign = await this.prisma.emailCampaign.findFirst({
      where: {
        userId,
        status: 'active'
      },
      include: {
        emails: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return campaign;
  }
}
