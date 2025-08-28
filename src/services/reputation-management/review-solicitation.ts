import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import {
  reviewStubs,
  scheduledEmailStubs,
  reviewSolicitationTrackingStubs,
  reviewSolicitationOptOutStubs,
} from '@/lib/prisma-model-stubs';
import { emailService } from '@/services/email.service';
import { z } from 'zod';
import type { LogMeta } from '@/types/logger';

export class ReviewSolicitationService {
  private campaigns: Map<string, SolicitationCampaign> = new Map();
  private templates: Map<string, EmailTemplate> = new Map();

  constructor() {
    this.initializeCampaigns();
    this.initializeTemplates();
  }

  private initializeCampaigns(): void {
    // Post-case closure campaign
    this.registerCampaign({
      id: 'post-case-success',
      name: 'Post-Case Success Review Request',
      trigger: 'case_closed_successful',
      timing: {
        delay: 7, // days after trigger
        followUp1: 14,
        followUp2: 30,
      },
      conditions: {
        caseOutcome: 'successful',
        clientSatisfaction: { min: 4 },
        hasReview: false,
      },
      platforms: ['google', 'avvo', 'facebook'],
      templateId: 'review-request-success',
    });

    // Post-consultation campaign
    this.registerCampaign({
      id: 'post-consultation',
      name: 'Post-Consultation Review Request',
      trigger: 'consultation_completed',
      timing: {
        delay: 3,
        followUp1: 10,
      },
      conditions: {
        consultationRating: { min: 4 },
        hasReview: false,
      },
      platforms: ['google'],
      templateId: 'review-request-consultation',
    });

    // Milestone campaign
    this.registerCampaign({
      id: 'case-milestone',
      name: 'Case Milestone Review Request',
      trigger: 'major_milestone_achieved',
      timing: {
        delay: 2,
      },
      conditions: {
        milestoneType: ['approval', 'hearing_won', 'settlement'],
      },
      platforms: ['google', 'avvo'],
      templateId: 'review-request-milestone',
    });

    // Anniversary campaign
    this.registerCampaign({
      id: 'client-anniversary',
      name: 'Client Anniversary Review Request',
      trigger: 'client_anniversary',
      timing: {
        delay: 0,
      },
      conditions: {
        yearsAsClient: { min: 1 },
        hasRecentReview: false, // No review in last 6 months
      },
      platforms: ['google', 'facebook'],
      templateId: 'review-request-anniversary',
    });
  }

  private initializeTemplates(): void {
    // Success case template
    this.registerTemplate({
      id: 'review-request-success',
      name: 'Successful Case Review Request',
      subject: 'Congratulations on Your {caseOutcome}! Share Your Experience',
      body: `
Dear {clientName},

Congratulations again on {caseOutcome}! We're thrilled we could help achieve this positive result for you.

Your experience and feedback are invaluable to us and help other people in similar situations find the legal help they need. Would you mind taking a moment to share your experience?

{platformLinks}

It only takes a minute, and your honest feedback helps us continue providing excellent service to our clients.

Thank you again for trusting us with your {practiceArea} case.

Warm regards,
{attorneyName}
{attorneyTitle}
Vasquez Law Firm, PLLC
      `,
      variables: [
        'clientName',
        'caseOutcome',
        'platformLinks',
        'practiceArea',
        'attorneyName',
        'attorneyTitle',
      ],
    });

    // Consultation template
    this.registerTemplate({
      id: 'review-request-consultation',
      name: 'Post-Consultation Review Request',
      subject: 'Thank You for Your Consultation - We Value Your Feedback',
      body: `
Dear {clientName},

Thank you for taking the time to meet with us for your {consultationType} consultation. We hope you found the information helpful and feel more confident about your legal options.

Your feedback helps us improve our services and assists others who may be facing similar legal questions. Would you share your consultation experience?

{platformLinks}

Your review will help others in our community find trusted legal guidance when they need it most.

Best regards,
{attorneyName}
Vasquez Law Firm, PLLC
      `,
      variables: ['clientName', 'consultationType', 'platformLinks', 'attorneyName'],
    });

    // Milestone template
    this.registerTemplate({
      id: 'review-request-milestone',
      name: 'Case Milestone Review Request',
      subject: 'Great News on Your Case! Share This Moment',
      body: `
Dear {clientName},

Wonderful news about {milestone}! This is a significant step forward in your case, and we're honored to be part of this journey with you.

Many people in similar situations search for experienced attorneys who can achieve results like yours. Would you share your experience to help them?

{platformLinks}

Your story could provide hope and guidance to someone facing similar challenges.

With gratitude,
{attorneyName}
Vasquez Law Firm, PLLC
      `,
      variables: ['clientName', 'milestone', 'platformLinks', 'attorneyName'],
    });

    // Anniversary template
    this.registerTemplate({
      id: 'review-request-anniversary',
      name: 'Client Anniversary Review Request',
      subject: 'Thank You for {years} Years of Trust',
      body: `
Dear {clientName},

It's been {years} year(s) since we first had the privilege of representing you. We're grateful for your continued trust in our firm.

As we reflect on our journey together, we'd love to hear about your experience with our firm. Your feedback helps us serve you and our community better.

{platformLinks}

Thank you for being part of the Vasquez Law Firm family.

Sincerely,
William Vasquez
Managing Attorney
Vasquez Law Firm, PLLC
      `,
      variables: ['clientName', 'years', 'platformLinks'],
    });

    // Spanish templates
    this.registerTemplate({
      id: 'review-request-success-es',
      name: 'Solicitud de Reseña - Caso Exitoso',
      subject: '¡Felicitaciones por su {caseOutcome}! Comparta su experiencia',
      body: `
Estimado/a {clientName},

¡Felicitaciones nuevamente por {caseOutcome}! Estamos muy contentos de haber podido ayudarle a lograr este resultado positivo.

Su experiencia y comentarios son invaluables para nosotros y ayudan a otras personas en situaciones similares a encontrar la ayuda legal que necesitan. ¿Podría tomar un momento para compartir su experiencia?

{platformLinks}

Solo toma un minuto, y sus comentarios honestos nos ayudan a continuar brindando un excelente servicio a nuestros clientes.

Gracias nuevamente por confiar en nosotros con su caso de {practiceArea}.

Atentamente,
{attorneyName}
{attorneyTitle}
Vasquez Law Firm, PLLC
      `,
      variables: [
        'clientName',
        'caseOutcome',
        'platformLinks',
        'practiceArea',
        'attorneyName',
        'attorneyTitle',
      ],
      language: 'es',
    });
  }

  private registerCampaign(campaign: SolicitationCampaign): void {
    this.campaigns.set(campaign.id, campaign);
  }

  private registerTemplate(template: EmailTemplate): void {
    this.templates.set(template.id, template);
  }

  async processTrigger(trigger: CampaignTrigger): Promise<void> {
    try {
      logger.info(`Processing review solicitation trigger: ${trigger.type}`);

      // Find applicable campaigns
      const applicableCampaigns = this.getApplicableCampaigns(trigger);

      if (applicableCampaigns.length === 0) {
        logger.info('No applicable campaigns for trigger');
        return;
      }

      for (const campaign of applicableCampaigns) {
        await this.scheduleCampaign(campaign, trigger);
      }
    } catch (error) {
      logger.error('Failed to process review solicitation trigger', errorToLogMeta(error));
    }
  }

  private getApplicableCampaigns(trigger: CampaignTrigger): SolicitationCampaign[] {
    return Array.from(this.campaigns.values()).filter(campaign => {
      if (campaign.trigger !== trigger.type) return false;

      // Check conditions
      const conditions = campaign.conditions;

      if (conditions.caseOutcome && trigger.data.caseOutcome !== conditions.caseOutcome) {
        return false;
      }

      if (
        conditions.clientSatisfaction &&
        (trigger.data.satisfaction ?? 0) < conditions.clientSatisfaction.min
      ) {
        return false;
      }

      if (conditions.hasReview !== undefined) {
        const hasReview = trigger.data.hasExistingReview || false;
        if (conditions.hasReview !== hasReview) return false;
      }

      return true;
    });
  }

  private async scheduleCampaign(
    campaign: SolicitationCampaign,
    trigger: CampaignTrigger
  ): Promise<void> {
    const client = trigger.data.client;

    // Check if client has opted out
    const optedOut = await this.isOptedOut(client.id);
    if (optedOut) {
      logger.info(`Client ${client.id} has opted out of review solicitations`);
      return;
    }

    // Check if client has recent review
    if (campaign.conditions.hasRecentReview === false) {
      const hasRecent = await this.hasRecentReview(client.id, 180); // 6 months
      if (hasRecent) {
        logger.info(`Client ${client.id} has recent review, skipping campaign`);
        return;
      }
    }

    // Schedule initial email
    const scheduleDate = new Date();
    scheduleDate.setDate(scheduleDate.getDate() + campaign.timing.delay);

    await this.scheduleEmail({
      campaignId: campaign.id,
      clientId: client.id,
      templateId: campaign.templateId,
      scheduledFor: scheduleDate,
      attempt: 1,
      data: {
        ...trigger.data,
        platforms: campaign.platforms,
      },
    });

    // Schedule follow-ups if defined
    if (campaign.timing.followUp1) {
      const followUp1Date = new Date();
      followUp1Date.setDate(followUp1Date.getDate() + campaign.timing.followUp1);

      await this.scheduleEmail({
        campaignId: campaign.id,
        clientId: client.id,
        templateId: campaign.templateId + '-followup1',
        scheduledFor: followUp1Date,
        attempt: 2,
        data: trigger.data,
      });
    }

    logger.info(`Scheduled review solicitation campaign ${campaign.id} for client ${client.id}`);
  }

  private async scheduleEmail(params: {
    campaignId: string;
    clientId: string;
    templateId: string;
    scheduledFor: Date;
    attempt: number;
    data: any;
  }): Promise<void> {
    await scheduledEmailStubs.create({
      data: {
        type: 'review_solicitation',
        recipientId: params.clientId,
        templateId: params.templateId,
        scheduledFor: params.scheduledFor,
        status: 'scheduled',
        metadata: {
          campaignId: params.campaignId,
          attempt: params.attempt,
          data: params.data,
        },
      },
    });
  }

  async sendScheduledEmails(): Promise<void> {
    const now = new Date();

    const scheduledEmails = await scheduledEmailStubs.findMany({
      where: {
        type: 'review_solicitation',
        status: 'scheduled',
        scheduledFor: { lte: now },
      },
      take: 50, // Process in batches
    });

    logger.info(`Processing ${scheduledEmails.length} scheduled review solicitation emails`);

    for (const scheduledEmail of scheduledEmails) {
      try {
        await this.sendSolicitationEmail(scheduledEmail);

        // Mark as sent
        await scheduledEmailStubs.update({
          where: { id: (scheduledEmail as any).id },
          data: {
            status: 'sent',
            sentAt: new Date(),
          },
        });
      } catch (error) {
        logger.error(
          `Failed to send scheduled email ${(scheduledEmail as any).id}`,
          errorToLogMeta(error)
        );

        // Mark as failed
        await scheduledEmailStubs.update({
          where: { id: (scheduledEmail as any).id },
          data: {
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        });
      }
    }
  }

  private async sendSolicitationEmail(scheduledEmail: any): Promise<void> {
    const template = this.templates.get(scheduledEmail.templateId);
    if (!template) {
      throw new Error(`Template not found: ${scheduledEmail.templateId}`);
    }

    const client = await prisma.user.findUnique({
      where: { id: scheduledEmail.recipientId },
    });

    if (!client) {
      throw new Error(`Client not found: ${scheduledEmail.recipientId}`);
    }

    const metadata = scheduledEmail.metadata as any;
    const platformLinks = this.generatePlatformLinks(metadata.data.platforms || ['google']);

    // Fill template variables
    const variables: Record<string, string> = {
      clientName: client.name || 'Valued Client',
      caseOutcome: metadata.data.caseOutcome || 'successful resolution',
      platformLinks,
      practiceArea: metadata.data.practiceArea || 'legal',
      attorneyName: metadata.data.attorneyName || 'Your Attorney',
      attorneyTitle: metadata.data.attorneyTitle || 'Attorney',
      consultationType: metadata.data.consultationType || 'legal',
      milestone: metadata.data.milestone || 'recent progress',
      years: metadata.data.years || '1',
    };

    let subject = template.subject;
    let body = template.body;

    // Replace variables
    Object.entries(variables).forEach(([key, value]) => {
      subject = subject.replace(`{${key}}`, value);
      body = body.replace(new RegExp(`{${key}}`, 'g'), value);
    });

    // Send email with basic options (email service uses template system)
    await emailService.sendEmail({
      to: client.email!,
      subject,
      template: 'client-notification', // Use existing template
      data: {
        name: client.name || 'Valued Client',
        email: client.email!,
        message: body,
        subject,
      },
    });

    // Track email sent
    await this.trackEmailSent((scheduledEmail as any).id, client.id, metadata.campaignId);
  }

  private generatePlatformLinks(platforms: string[]): string {
    const links: string[] = [];

    const platformUrls: Record<string, string> = {
      google: 'https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review',
      avvo: 'https://www.avvo.com/attorneys/YOUR_AVVO_PROFILE/reviews/write',
      facebook: 'https://www.facebook.com/vasquezlawfirm/reviews',
      yelp: 'https://www.yelp.com/writeareview/biz/YOUR_YELP_ID',
      martindale: 'https://www.martindale.com/attorney/YOUR_PROFILE/reviews',
    };

    platforms.forEach(platform => {
      const url = platformUrls[platform];
      if (url) {
        const name = platform.charAt(0).toUpperCase() + platform.slice(1);
        links.push(`• <a href="${url}" style="color: #2563eb; text-decoration: none;">${name}</a>`);
      }
    });

    return links.join('<br>');
  }

  private formatEmailHtml(body: string, platformLinks: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9fafb; }
    .platforms { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
    a { color: #2563eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Vasquez Law Firm</h1>
    </div>
    <div class="content">
      ${body.replace(/\n/g, '<br>')}
    </div>
    <div class="footer">
      <p>
        Vasquez Law Firm, PLLC<br>
        333 Fayetteville St, Raleigh, NC 27601<br>
        <a href="{unsubscribeUrl}">Unsubscribe from review requests</a>
      </p>
    </div>
  </div>
</body>
</html>
    `;
  }

  private async trackEmailSent(
    emailId: string,
    clientId: string,
    campaignId: string
  ): Promise<void> {
    await reviewSolicitationTrackingStubs.create({
      data: {
        emailId,
        clientId,
        campaignId,
        sentAt: new Date(),
        status: 'sent',
      },
    });
  }

  private async isOptedOut(clientId: string): Promise<boolean> {
    const optOut = await reviewSolicitationOptOutStubs.findUnique({
      where: { clientId },
    });

    return !!optOut;
  }

  private async hasRecentReview(clientId: string, daysSince: number): Promise<boolean> {
    const since = new Date();
    since.setDate(since.getDate() - daysSince);

    const recentReview = await reviewStubs.findFirst({
      where: {
        authorEmail: clientId, // Assuming we track client reviews by email
        publishedAt: { gte: since },
      },
    });

    return !!recentReview;
  }

  async optOutClient(clientId: string, reason?: string): Promise<void> {
    await reviewSolicitationOptOutStubs.create({
      data: {
        clientId,
        reason,
        optedOutAt: new Date(),
      },
    });

    // Cancel any scheduled emails
    await scheduledEmailStubs.updateMany({
      where: {
        recipientId: clientId,
        type: 'review_solicitation',
        status: 'scheduled',
      },
      data: {
        status: 'cancelled',
      },
    });

    logger.info(`Client ${clientId} opted out of review solicitations`);
  }

  async getClientSolicitationHistory(clientId: string): Promise<any[]> {
    return await reviewSolicitationTrackingStubs.findMany({
      where: { clientId },
      orderBy: { sentAt: 'desc' },
      include: {
        email: true,
      },
    });
  }

  async getCampaignPerformance(campaignId: string): Promise<CampaignPerformance> {
    const tracking: any[] = await reviewSolicitationTrackingStubs.findMany({
      where: { campaignId },
    });

    const trackingClientIds = tracking.map((t: { clientId: string }) => t.clientId);
    const earliestDate = new Date(
      Math.min(...tracking.map((t: { sentAt: Date }) => t.sentAt.getTime()))
    );

    const reviews = await reviewStubs.findMany({
      where: {
        authorEmail: { in: trackingClientIds },
        publishedAt: {
          gte: earliestDate,
        },
      },
    });

    const emailsSent = tracking.length;
    const reviewsReceived = reviews.length;
    const conversionRate = emailsSent > 0 ? reviewsReceived / emailsSent : 0;

    return {
      campaignId,
      emailsSent,
      reviewsReceived,
      conversionRate,
      averageRating:
        reviews.length > 0
          ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
            reviews.length
          : 0,
      platformBreakdown: this.calculatePlatformBreakdown(reviews),
    };
  }

  private calculatePlatformBreakdown(reviews: any[]): Record<string, number> {
    const breakdown: Record<string, number> = {};

    reviews.forEach((review: { platformId: string }) => {
      breakdown[review.platformId] = (breakdown[review.platformId] || 0) + 1;
    });

    return breakdown;
  }
}

// Types
interface SolicitationCampaign {
  id: string;
  name: string;
  trigger: string;
  timing: {
    delay: number; // days
    followUp1?: number;
    followUp2?: number;
  };
  conditions: {
    caseOutcome?: string;
    clientSatisfaction?: { min: number };
    hasReview?: boolean;
    hasRecentReview?: boolean;
    consultationRating?: { min: number };
    milestoneType?: string[];
    yearsAsClient?: { min: number };
  };
  platforms: string[];
  templateId: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  language?: string;
}

interface CampaignTrigger {
  type: string;
  data: {
    client: {
      id: string;
      name: string;
      email: string;
    };
    caseOutcome?: string;
    satisfaction?: number;
    hasExistingReview?: boolean;
    practiceArea?: string;
    attorneyName?: string;
    attorneyTitle?: string;
    consultationType?: string;
    milestone?: string;
    years?: number;
  };
}

interface CampaignPerformance {
  campaignId: string;
  emailsSent: number;
  reviewsReceived: number;
  conversionRate: number;
  averageRating: number;
  platformBreakdown: Record<string, number>;
}

export const reviewSolicitation = new ReviewSolicitationService();
