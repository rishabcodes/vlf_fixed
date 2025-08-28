import { ghlService } from '@/services/gohighlevel';
import { getPrismaClient } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { z } from 'zod';
import { notificationService } from '@/services/notifications';
import { emailService } from '@/services/email.service';
import { Lead, LeadStatus, LeadUrgency, PracticeArea, Contact, Prisma } from '@prisma/client';
import type { GHLContactData } from '@/types/services';

// Lead capture schemas - map to Prisma enums
const LeadCaptureSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  practiceArea: z.enum([
    'immigration',
    'personal_injury',
    'workers_compensation',
    'criminal_defense',
    'family_law',
    'traffic',
  ]),
  message: z.string().optional(),
  source: z.string(),
  language: z.enum(['en', 'es']).default('en'),
  urgency: z.enum(['immediate', 'soon', 'planning']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

const WebFormSchema = LeadCaptureSchema.extend({
  formId: z.string(),
  pageUrl: z.string(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

type LeadCaptureData = z.infer<typeof LeadCaptureSchema>;
type WebFormData = z.infer<typeof WebFormSchema>;

export class LeadCaptureService {
  // Process new lead from website
  async captureWebLead(data: WebFormData) {
    try {
      const validated = WebFormSchema.parse(data);
      const prisma = getPrismaClient();

      // Create or update contact in database
      const contact = await prisma.contact.upsert({
        where: { phone: validated.phone },
        update: {
          email: validated.email || undefined,
          name: `${validated.firstName} ${validated.lastName}`,
          source: validated.source,
          metadata: {
            ...(typeof validated.metadata === 'object' ? validated.metadata : {}),
            lastFormSubmission: new Date().toISOString(),
            language: validated.language,
          },
        },
        create: {
          email: validated.email,
          phone: validated.phone,
          name: `${validated.firstName} ${validated.lastName}`,
          source: validated.source,
          metadata: {
            ...(typeof validated.metadata === 'object' ? validated.metadata : {}),
            language: validated.language,
            formId: validated.formId,
            pageUrl: validated.pageUrl,
          },
        },
      });

      // Create lead in database
      const lead = await prisma.lead.create({
        data: {
          contactId: contact.id,
          source: validated.source,
          practiceArea: validated.practiceArea as PracticeArea,
          status: 'new' as LeadStatus,
          urgency: this.mapUrgencyToEnum(validated.urgency),
          description: validated.message,
          metadata: {
            formId: validated.formId,
            pageUrl: validated.pageUrl,
            ipAddress: validated.ipAddress,
            userAgent: validated.userAgent,
            language: validated.language,
            firstName: validated.firstName,
            lastName: validated.lastName,
            ...(typeof validated.metadata === 'object' ? validated.metadata : {}),
          },
        },
        include: {
          contact: true,
        },
      });

      // Score the lead immediately
      const { score } = await this.scoreAndPrioritizeLead(lead.id);

      // Create GHL contact
      const ghlContact = await ghlService.upsertContact({
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        phone: validated.phone,
        tags: [
          'website-lead',
          `practice-area-${validated.practiceArea}`,
          `language-${validated.language}`,
          `urgency-${validated.urgency || 'planning'}`,
          `source-${validated.source}`,
          `lead-score-${score}`,
        ],
        source: validated.source,
        customFields: {
          practiceArea: validated.practiceArea,
          initialMessage: validated.message,
          captureDate: new Date().toISOString(),
          formId: validated.formId,
          pageUrl: validated.pageUrl,
          language: validated.language,
          urgency: validated.urgency,
          leadScore: score,
          leadId: lead.id,
          ...validated.metadata,
        },
      });

      // Trigger appropriate campaign based on practice area and urgency
      await this.triggerLeadNurtureCampaign(ghlContact.id, validated);

      // Create opportunity in GHL
      await this.createLeadOpportunity(ghlContact.id, validated);

      // Send immediate notification for urgent leads
      if (validated.urgency === 'immediate' || lead.urgency === 'critical') {
        await this.notifyTeamOfUrgentLead(lead, validated);
      }

      // Assign high-scoring leads
      if (score >= 70) {
        await this.assignLeadToAttorney(lead.id);
      }

      logger.info('Web lead captured', {
        leadId: lead.id,
        contactId: contact.id,
        ghlContactId: ghlContact.id,
        practiceArea: validated.practiceArea,
        email: validated.email,
        score,
      });

      return { lead, contact, ghlContact, score };
    } catch (error) {
      logger.error('Failed to capture web lead:', errorToLogMeta(error));
      throw error;
    }
  }

  // Helper method to map urgency strings to enum
  private mapUrgencyToEnum(urgency?: string): LeadUrgency {
    switch (urgency) {
      case 'immediate':
        return 'critical';
      case 'soon':
        return 'high';
      case 'planning':
        return 'medium';
      default:
        return 'low';
    }
  }

  // Trigger nurture campaign based on lead data
  private async triggerLeadNurtureCampaign(contactId: string, data: LeadCaptureData) {
    try {
      // Determine campaign based on practice area and language
      const campaignMap: Record<string, Record<string, string>> = {
        immigration: {
          en: process.env.GHL_IMMIGRATION_NURTURE_EN || '',
          es: process.env.GHL_IMMIGRATION_NURTURE_ES || '',
        },
        personal_injury: {
          en: process.env.GHL_PERSONAL_INJURY_NURTURE_EN || '',
          es: process.env.GHL_PERSONAL_INJURY_NURTURE_ES || '',
        },
        workers_compensation: {
          en: process.env.GHL_WORKERS_COMP_NURTURE_EN || '',
          es: process.env.GHL_WORKERS_COMP_NURTURE_ES || '',
        },
        criminal_defense: {
          en: process.env.GHL_CRIMINAL_NURTURE_EN || '',
          es: process.env.GHL_CRIMINAL_NURTURE_ES || '',
        },
        family_law: {
          en: process.env.GHL_FAMILY_LAW_NURTURE_EN || '',
          es: process.env.GHL_FAMILY_LAW_NURTURE_ES || '',
        },
        traffic: {
          en: process.env.GHL_TRAFFIC_NURTURE_EN || '',
          es: process.env.GHL_TRAFFIC_NURTURE_ES || '',
        },
      };

      const campaignId = campaignMap[data.practiceArea]?.[data.language];

      if (campaignId) {
        await ghlService.triggerCampaign({
          contactId,
          campaignId,
        });
      } else {
        // Fallback to generic nurture campaign
        const genericCampaignId = process.env.GHL_GENERIC_NURTURE_CAMPAIGN_ID;
        if (genericCampaignId) {
          await ghlService.triggerCampaign({
            contactId,
            campaignId: genericCampaignId,
          });
        }
      }
    } catch (error) {
      logger.error('Failed to trigger nurture campaign:', errorToLogMeta(error));
    }
  }

  // Create opportunity in GHL pipeline
  private async createLeadOpportunity(contactId: string, data: LeadCaptureData) {
    try {
      const pipelineId = process.env.GHL_LEAD_PIPELINE_ID || '';
      const stageId = process.env.GHL_NEW_LEAD_STAGE_ID || '';

      if (!pipelineId || !stageId) {
        logger.warn('GHL pipeline not configured for opportunities');
        return;
      }

      await ghlService.createOpportunity({
        contactId,
        name: `${data.firstName} ${data.lastName} - ${data.practiceArea}`,
        pipelineId,
        stageId,
        customFields: {
          practiceArea: data.practiceArea,
          language: data.language,
          urgency: data.urgency,
          source: data.source,
          captureDate: new Date().toISOString(),
        },
      });
    } catch (error) {
      logger.error('Failed to create lead opportunity:', errorToLogMeta(error));
    }
  }

  // Notify team of urgent lead
  private async notifyTeamOfUrgentLead(
    lead: Lead & { contact: Contact | null },
    data: LeadCaptureData
  ) {
    try {
      const prisma = getPrismaClient();

      // Get attorneys for urgent notifications
      const attorneys = await prisma.user.findMany({
        where: {
          role: 'ATTORNEY',
          phone: { not: null },
        },
      });

      const practiceAreaDisplay = data.practiceArea.replace(/_/g, ' ').toLowerCase();
      const urgentMessage = `🚨 URGENT LEAD: ${data.firstName} ${data.lastName} needs immediate ${practiceAreaDisplay} help. Phone: ${data.phone}. Lead Score: ${lead.score}/100. Check dashboard for details.`;

      // Send SMS notifications
      const smsPromises = attorneys
        .filter(attorney => attorney.phone)
        .map(attorney => attorney.phone ? notificationService.sendSMS(attorney.phone, urgentMessage) : Promise.resolve());

      // Send in-app notifications
      const inAppPromises = attorneys.map(attorney =>
        notificationService.sendInApp(attorney.id, urgentMessage, 'warning')
      );

      // Send email notification
      const emailPromise = emailService.sendEmail({
        to: process.env.URGENT_LEAD_EMAIL || 'intake@vasquezlawnc.com',
        subject: `🚨 Urgent ${practiceAreaDisplay} Lead: ${data.firstName} ${data.lastName}`,
        template: 'urgent-lead-notification',
        data: {
          lead: {
            ...data,
            id: lead.id,
            score: lead.score,
            status: lead.status,
            createdAt: lead.createdAt,
          },
          leadId: lead.id,
        },
      });

      await Promise.allSettled([...smsPromises, ...inAppPromises, emailPromise]);

      logger.info('Urgent lead notifications sent', {
        leadId: lead.id,
        attorneysNotified: attorneys.length,
      });
    } catch (error) {
      logger.error('Failed to notify team of urgent lead:', errorToLogMeta(error));
    }
  }

  // Process chat lead
  async captureChatLead(data: {
    conversationId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    practiceArea?: string;
    messages: Array<{ role: string; content: string; timestamp: string }>;
  }) {
    try {
      // Extract contact info from conversation if not provided
      const contactInfo = this.extractContactInfoFromChat(data.messages);

      // Map practice area to valid enum value
      const practiceAreaMap: Record<string, PracticeArea> = {
        immigration: 'immigration',
        'personal injury': 'personal_injury',
        'workers compensation': 'workers_compensation',
        'criminal defense': 'criminal_defense',
        'family law': 'family_law',
        traffic: 'traffic',
      };

      const practiceArea = data.practiceArea || contactInfo.practiceArea || 'immigration';
      const mappedPracticeArea = practiceAreaMap[practiceArea.toLowerCase()] || 'immigration';

      const leadData: LeadCaptureData = {
        firstName: data.firstName || contactInfo.firstName || 'Chat',
        lastName: data.lastName || contactInfo.lastName || 'Visitor',
        email: data.email || contactInfo.email || `chat-${Date.now()}@chat.com`,
        phone: data.phone || contactInfo.phone || `000${Date.now()}`.slice(-10),
        practiceArea: mappedPracticeArea,
        source: 'website-chat',
        language: (contactInfo.language === 'es' ? 'es' : 'en') as 'en' | 'es',
        message: data.messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        urgency: (contactInfo.urgency as 'immediate' | 'soon' | 'planning') || 'planning',
        metadata: {
          conversationId: data.conversationId,
          messageCount: data.messages.length,
          extractedInfo: contactInfo,
        },
      };

      return await this.captureWebLead({
        ...leadData,
        formId: 'chat-widget',
        pageUrl: 'website-chat',
      });
    } catch (error) {
      logger.error('Failed to capture chat lead:', errorToLogMeta(error));
      throw error;
    }
  }

  // Extract contact info from chat messages
  private extractContactInfoFromChat(messages: Array<{ role: string; content: string }>) {
    const info: {
      firstName: string;
      lastName: string;
      language: string;
      urgency: string;
      phone?: string;
      email?: string;
      practiceArea?: string;
      caseDetails?: string;
    } = {
      firstName: 'Chat',
      lastName: 'Visitor',
      language: 'en',
      urgency: 'planning',
    };

    // Simple pattern matching - in production, use NLP
    for (const msg of messages) {
      const content = msg.content.toLowerCase();

      // Detect phone numbers
      const phoneMatch = content.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);
      if (phoneMatch) {
        info.phone = phoneMatch[0].replace(/\D/g, '');
      }

      // Detect email
      const emailMatch = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
      if (emailMatch) {
        info.email = emailMatch[0];
      }

      // Detect practice area
      if (
        content.includes('immigration') ||
        content.includes('visa') ||
        content.includes('green card') ||
        content.includes('deportation')
      ) {
        info.practiceArea = 'immigration';
      } else if (
        content.includes('accident') ||
        content.includes('injury') ||
        content.includes('hurt')
      ) {
        info.practiceArea = 'personal injury';
      } else if (
        content.includes('criminal') ||
        content.includes('arrest') ||
        content.includes('charge')
      ) {
        info.practiceArea = 'criminal defense';
      } else if (
        content.includes('divorce') ||
        content.includes('custody') ||
        content.includes('child support')
      ) {
        info.practiceArea = 'family law';
      } else if (
        content.includes('workers comp') ||
        content.includes('work injury') ||
        content.includes('workplace')
      ) {
        info.practiceArea = 'workers compensation';
      } else if (
        content.includes('ticket') ||
        content.includes('traffic') ||
        content.includes('dui')
      ) {
        info.practiceArea = 'traffic';
      }

      // Detect urgency
      if (
        content.includes('urgent') ||
        content.includes('emergency') ||
        content.includes('immediately') ||
        content.includes('asap') ||
        content.includes('today') ||
        content.includes('right now')
      ) {
        info.urgency = 'immediate';
      } else if (
        content.includes('soon') ||
        content.includes('this week') ||
        content.includes('few days')
      ) {
        info.urgency = 'soon';
      }

      // Detect language
      if (
        content.includes('español') ||
        content.includes('spanish') ||
        content.includes('habla español')
      ) {
        info.language = 'es';
      }

      // Extract name (basic pattern)
      const nameMatch = content.match(/my name is (\w+)\s*(\w*)/i);
      if (nameMatch) {
        info.firstName = nameMatch[1] || '';
        info.lastName = nameMatch[2] || 'Unknown';
      }
    }

    return info;
  }

  // Process phone lead
  async capturePhoneLead(data: {
    callId: string;
    fromNumber: string;
    toNumber: string;
    duration: number;
    recordingUrl?: string;
    transcription?: string;
    agentNotes?: string;
    practiceArea?: string;
    urgency?: string;
  }) {
    try {
      const prisma = getPrismaClient();

      // Create or update contact in database
      const contact = await prisma.contact.upsert({
        where: { phone: data.fromNumber },
        update: {
          source: 'phone',
          metadata: {
            lastCallDate: new Date().toISOString(),
            totalCalls:
              ((
                (await prisma.contact.findUnique({ where: { phone: data.fromNumber } }))
                  ?.metadata as Record<string, unknown>
              )?.totalCalls as number) + 1 || 1,
          },
        },
        create: {
          phone: data.fromNumber,
          name: 'Phone Lead',
          source: 'phone',
          metadata: {
            firstCallDate: new Date().toISOString(),
            totalCalls: 1,
          },
        },
      });

      // Extract practice area from transcription or notes if not provided
      let practiceArea = data.practiceArea;
      if (!practiceArea && (data.transcription || data.agentNotes)) {
        const content = (data.transcription || data.agentNotes || '').toLowerCase();
        if (content.includes('immigration') || content.includes('visa')) {
          practiceArea = 'immigration';
        } else if (content.includes('accident') || content.includes('injury')) {
          practiceArea = 'personal_injury';
        } else if (content.includes('criminal') || content.includes('arrest')) {
          practiceArea = 'criminal_defense';
        } else if (content.includes('divorce') || content.includes('custody')) {
          practiceArea = 'family_law';
        } else if (content.includes('workers comp')) {
          practiceArea = 'workers_compensation';
        } else if (content.includes('traffic') || content.includes('ticket')) {
          practiceArea = 'traffic';
        }
      }

      // Create lead record
      const lead = await prisma.lead.create({
        data: {
          contactId: contact.id,
          source: 'phone',
          practiceArea: (practiceArea as PracticeArea) || null,
          status: 'contacted' as LeadStatus,
          urgency: this.mapUrgencyToEnum(data.urgency),
          description:
            data.transcription ||
            data.agentNotes ||
            `Phone call - Duration: ${data.duration} seconds`,
          firstContactAt: new Date(),
          lastContactAt: new Date(),
          metadata: {
            callId: data.callId,
            toNumber: data.toNumber,
            duration: data.duration,
            recordingUrl: data.recordingUrl,
            hasTranscription: !!data.transcription,
            hasAgentNotes: !!data.agentNotes,
          },
        },
        include: {
          contact: true,
        },
      });

      // Score the lead
      const { score } = await this.scoreAndPrioritizeLead(lead.id);

      // Create or update GHL contact
      const ghlContact = await ghlService.upsertContact({
        firstName: contact.name?.split(' ')[0] || 'Phone',
        lastName: contact.name?.split(' ')[1] || 'Lead',
        phone: data.fromNumber,
        tags: [
          'phone-lead',
          'inbound-call',
          `lead-score-${score}`,
          ...(practiceArea ? [`practice-area-${practiceArea}`] : []),
        ],
        source: 'phone-call',
        customFields: {
          firstCallDate: new Date().toISOString(),
          callDuration: data.duration,
          leadScore: score,
          leadId: lead.id,
          practiceArea,
        },
      });

      // Create call log
      await prisma.callLog.create({
        data: {
          contactId: contact.id,
          fromNumber: data.fromNumber,
          toNumber: data.toNumber,
          direction: 'inbound',
          status: 'completed',
          startedAt: new Date(),
          duration: data.duration,
          recordingUrl: data.recordingUrl,
          metadata: {
            callId: data.callId,
            agentNotes: data.agentNotes,
            leadId: lead.id,
            transcription: data.transcription,
          },
        },
      });

      // Trigger phone lead follow-up campaign
      const phoneCampaignId = process.env.GHL_PHONE_LEAD_CAMPAIGN_ID;
      if (phoneCampaignId) {
        await ghlService.triggerCampaign({
          contactId: ghlContact.id,
          campaignId: phoneCampaignId,
        });
      }

      // Notify team if urgent
      if (data.urgency === 'immediate' || lead.urgency === 'critical') {
        await this.notifyTeamOfUrgentLead(lead, {
          firstName: contact.name?.split(' ')[0] || 'Phone',
          lastName: contact.name?.split(' ')[1] || 'Lead',
          email: contact.email || `phone-${contact.id}@lead.com`,
          phone: data.fromNumber,
          practiceArea: (practiceArea &&
          [
            'immigration',
            'personal_injury',
            'workers_compensation',
            'criminal_defense',
            'family_law',
            'traffic',
          ].includes(practiceArea)
            ? practiceArea
            : 'immigration') as
            | 'immigration'
            | 'personal_injury'
            | 'workers_compensation'
            | 'criminal_defense'
            | 'family_law'
            | 'traffic',
          source: 'phone',
          language: 'en',
          urgency: (data.urgency as 'immediate' | 'soon' | 'planning') || 'planning',
          message: data.transcription || data.agentNotes,
        });
      }

      // Assign high-scoring leads
      if (score >= 70) {
        await this.assignLeadToAttorney(lead.id);
      }

      logger.info('Phone lead captured', {
        leadId: lead.id,
        contactId: contact.id,
        ghlContactId: ghlContact.id,
        phone: data.fromNumber,
        callId: data.callId,
        score,
      });

      return { lead, contact, ghlContact, score };
    } catch (error) {
      logger.error('Failed to capture phone lead:', errorToLogMeta(error));
      throw error;
    }
  }

  // Score lead based on various factors
  async scoreAndPrioritizeLead(leadId: string) {
    try {
      const prisma = getPrismaClient();
      const lead = await prisma.lead.findUnique({
        where: { id: leadId },
        include: { contact: true },
      });

      if (!lead) {
        throw new Error(`Lead not found: ${leadId}`);
      }

      let score = 0;
      const factors: Record<string, number> = {};

      // Time factor - newer leads score higher
      const hoursSinceCreation = (Date.now() - lead.createdAt.getTime()) / (1000 * 60 * 60);
      if (hoursSinceCreation < 1) {
        score += 30; // Very fresh lead
        factors.freshness = 30;
      } else if (hoursSinceCreation < 24) {
        score += 20; // Less than a day old
        factors.freshness = 20;
      } else if (hoursSinceCreation < 72) {
        score += 10; // Less than 3 days old
        factors.freshness = 10;
      } else if (hoursSinceCreation < 168) {
        score += 5; // Less than a week old
        factors.freshness = 5;
      }

      // Urgency factor
      const urgencyScores: Record<LeadUrgency, number> = {
        critical: 30,
        high: 20,
        medium: 10,
        low: 5,
      };
      score += urgencyScores[lead.urgency];
      factors.urgency = urgencyScores[lead.urgency];

      // Practice area value
      const practiceAreaScores: Record<string, number> = {
        personal_injury: 25,
        workers_compensation: 25,
        immigration: 20,
        criminal_defense: 20,
        family_law: 15,
        traffic: 10,
      };
      if (lead.practiceArea) {
        score += practiceAreaScores[lead.practiceArea] || 10;
        factors.practiceArea = practiceAreaScores[lead.practiceArea] || 10;
      }

      // Contact info completeness
      if (lead.contact) {
        if (lead.contact.email && !lead.contact.email.includes('@chat.com')) {
          score += 10;
          factors.emailProvided = 10;
        }
        if (
          lead.contact.phone &&
          lead.contact.phone.length === 10 &&
          !lead.contact.phone.startsWith('000')
        ) {
          score += 15;
          factors.phoneProvided = 15;
        }
        if (
          lead.contact.name &&
          lead.contact.name !== 'Chat Visitor' &&
          lead.contact.name !== 'Phone Lead'
        ) {
          score += 5;
          factors.nameProvided = 5;
        }
      }

      // Source quality
      const sourceScores: Record<string, number> = {
        'website-form': 15,
        'website-chat': 10,
        'phone-call': 20,
        phone: 20,
        referral: 25,
        'google-ads': 15,
        'facebook-ads': 12,
        organic: 10,
      };
      score += sourceScores[lead.source] || 5;
      factors.source = sourceScores[lead.source] || 5;

      // Message content analysis
      if (lead.description) {
        const urgentKeywords = [
          'urgent',
          'emergency',
          'immediately',
          'asap',
          'today',
          'arrest',
          'accident',
          'hospital',
        ];
        const hasUrgentKeywords = urgentKeywords.some(
          keyword => lead.description?.toLowerCase().includes(keyword) ?? false
        );
        if (hasUrgentKeywords) {
          score += 10;
          factors.urgentKeywords = 10;
        }

        // Bonus for detailed descriptions
        if (lead.description.length > 200) {
          score += 5;
          factors.detailedDescription = 5;
        }
      }

      // Engagement factor
      if (lead.status === 'contacted' && lead.lastContactAt) {
        score += 5;
        factors.previousContact = 5;

        // Recent contact bonus
        const hoursSinceContact = (Date.now() - lead.lastContactAt.getTime()) / (1000 * 60 * 60);
        if (hoursSinceContact < 24) {
          score += 5;
          factors.recentContact = 5;
        }
      }

      // Ensure score is between 0 and 100
      score = Math.min(Math.max(score, 0), 100);

      // Update lead with score and urgency based on score
      const updatedLead = await prisma.lead.update({
        where: { id: leadId },
        data: {
          score,
          urgency: score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 40 ? 'medium' : 'low',
        },
      });

      logger.info('Lead scored', {
        leadId,
        score,
        factors,
        urgency: updatedLead.urgency,
      });

      return { score, factors };
    } catch (error) {
      logger.error('Failed to score lead:', errorToLogMeta(error));
      throw error;
    }
  }

  // Assign lead to attorney
  async assignLeadToAttorney(leadId: string) {
    try {
      const prisma = getPrismaClient();

      // Get the lead with practice area
      const lead = await prisma.lead.findUnique({
        where: { id: leadId },
        include: { assignedTo: true },
      });

      if (!lead || lead.assignedToId) {
        return; // Lead doesn't exist or already assigned
      }

      // Get available attorneys with capacity (less than 10 active leads)
      const attorneys = await prisma.user.findMany({
        where: {
          role: 'ATTORNEY',
        },
        include: {
          _count: {
            select: {
              leads: {
                where: {
                  status: {
                    notIn: ['won', 'lost'],
                  },
                },
              },
            },
          },
        },
      });

      // Filter attorneys with capacity and sort by workload
      const availableAttorneys = attorneys
        .filter(attorney => attorney._count.leads < 10)
        .sort((a, b) => a._count.leads - b._count.leads);

      if (availableAttorneys.length === 0) {
        logger.warn('No available attorneys for lead assignment', { leadId });
        return;
      }

      // Assign to attorney with lowest workload
      const selectedAttorney = availableAttorneys[0];
      if (!selectedAttorney) {
        logger.warn('No attorney selected for lead assignment', { leadId });
        return;
      }

      await prisma.lead.update({
        where: { id: leadId },
        data: {
          assignedToId: selectedAttorney.id,
          assignedAt: new Date(),
        },
      });

      // Notify the assigned attorney
      await notificationService.sendMultiChannel(
        {
          email: selectedAttorney.email,
          phone: selectedAttorney.phone || undefined,
          userId: selectedAttorney.id,
        },
        `New lead assigned: ${lead.practiceArea ? lead.practiceArea.replace(/_/g, ' ') : 'General inquiry'} - Score: ${lead.score}/100. Check your dashboard for details.`,
        {
          subject: 'New Lead Assignment',
          channels: ['email', 'sms', 'in-app'],
        }
      );

      logger.info('Lead assigned to attorney', {
        leadId,
        attorneyId: selectedAttorney.id,
        attorneyName: selectedAttorney.name,
        currentWorkload: availableAttorneys[0]?._count.leads ? availableAttorneys[0]._count.leads + 1 : 1,
      });
    } catch (error) {
      logger.error('Failed to assign lead to attorney:', errorToLogMeta(error));
    }
  }

  // Get lead analytics
  async getLeadAnalytics(dateRange?: { start: Date; end: Date }) {
    try {
      const prisma = getPrismaClient();
      const where = dateRange
        ? {
            createdAt: {
              gte: dateRange.start,
              lte: dateRange.end,
            },
          }
        : {};

      const [
        totalLeads,
        leadsByPracticeArea,
        leadsBySource,
        leadsByStatus,
        leadsByUrgency,
        averageScore,
        wonLeads,
        recentLeads,
      ] = await Promise.all([
        // Total leads
        prisma.lead.count({ where }),

        // Leads by practice area
        prisma.lead.groupBy({
          by: ['practiceArea'],
          where,
          _count: true,
        }),

        // Leads by source
        prisma.lead.groupBy({
          by: ['source'],
          where,
          _count: true,
        }),

        // Leads by status
        prisma.lead.groupBy({
          by: ['status'],
          where,
          _count: true,
        }),

        // Leads by urgency
        prisma.lead.groupBy({
          by: ['urgency'],
          where,
          _count: true,
        }),

        // Average lead score
        prisma.lead.aggregate({
          where,
          _avg: { score: true },
        }),

        // Won leads (for conversion rate)
        prisma.lead.count({
          where: {
            ...where,
            status: 'won',
          },
        }),

        // Recent leads
        prisma.lead.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            contact: true,
            assignedTo: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        }),
      ]);

      return {
        totalLeads,
        leadsByPracticeArea: leadsByPracticeArea
          .filter(item => item.practiceArea !== null)
          .map(item => ({
            practiceArea: item.practiceArea,
            count: item._count,
          })),
        leadsBySource: leadsBySource.map(item => ({
          source: item.source,
          count: item._count,
        })),
        leadsByStatus: leadsByStatus.map(item => ({
          status: item.status,
          count: item._count,
        })),
        leadsByUrgency: leadsByUrgency.map(item => ({
          urgency: item.urgency,
          count: item._count,
        })),
        averageScore: averageScore._avg.score || 0,
        conversionRate: totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0,
        recentLeads: recentLeads.map(lead => ({
          id: lead.id,
          contact: lead.contact,
          practiceArea: lead.practiceArea,
          status: lead.status,
          score: lead.score,
          urgency: lead.urgency,
          source: lead.source,
          assignedTo: lead.assignedTo,
          createdAt: lead.createdAt,
        })),
      };
    } catch (error) {
      logger.error('Failed to get lead analytics:', errorToLogMeta(error));
      throw error;
    }
  }
}

// Export singleton instance
export const leadCaptureService = new LeadCaptureService();
