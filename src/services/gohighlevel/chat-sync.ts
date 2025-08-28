import { ghlService } from './index';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import type { GHLContact } from '@/types/gohighlevel';

interface ChatSyncOptions {
  userId: string;
  sessionId: string;
  message: string;
  language: 'en' | 'es';
  isUserMessage: boolean;
  metadata?: Record<string, unknown>;
}

interface ContactInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export class GHLChatSyncService {
  private contactCache = new Map<string, string>(); // userId -> ghlContactId

  // Sync chat message to GHL
  async syncChatMessage(options: ChatSyncOptions) {
    try {
      const { userId, sessionId, message, language, isUserMessage, metadata } = options;

      // Get or create GHL contact
      const ghlContactId = await this.getOrCreateGHLContact(userId, metadata);
      if (!ghlContactId) {
        logger.warn('Failed to get GHL contact for chat sync', { userId });
        return;
      }

      // Format message for GHL note
      const formattedMessage = this.formatChatMessage(message, isUserMessage, language);

      // Add message as note to contact
      await ghlService.addNote(ghlContactId, formattedMessage);

      // Update contact tags based on message content
      const tags = this.extractTagsFromMessage(message, language);
      if (tags.length > 0) {
        // Create a task to update tags since we don't have direct contact update access
        await ghlService.createTask({
          contactId: ghlContactId,
          title: 'Update chat tags',
          body: `Add tags: ${tags.join(', ')}\nChat session: ${sessionId}\nLanguage: ${language}`,
          dueDate: new Date(),
        });
      }

      // Check for triggers (appointment request, urgent help, etc.)
      await this.checkChatTriggers(ghlContactId, message, language);

      logger.info('Chat message synced to GHL', {
        userId,
        ghlContactId,
        isUserMessage,
      });
    } catch (error) {
      logger.error('Failed to sync chat message to GHL:', errorToLogMeta(error));
    }
  }

  // Sync entire conversation transcript
  async syncConversationTranscript(conversationId: string) {
    try {
      const prisma = getPrismaClient();

      // Get conversation with messages
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
          user: true,
        },
      });

      if (!conversation) {
        logger.warn('Conversation not found for transcript sync', { conversationId });
        return;
      }

      // Get or create GHL contact
      const ghlContactId = await this.getOrCreateGHLContact(conversation.userId, {
        email: conversation.user.email,
        name: conversation.user.name,
      });

      if (!ghlContactId) return;

      // Format full transcript
      const transcript = this.formatTranscript(conversation);

      // Add transcript as note
      await ghlService.addNote(ghlContactId, transcript);

      // Update contact with conversation summary via task
      await ghlService.createTask({
        contactId: ghlContactId,
        title: 'Update conversation metadata',
        body: `Last conversation: ${conversationId}\nTotal messages: ${conversation.messages.length}\nStatus: ${conversation.status}\nLanguage: ${conversation.language || 'en'}`,
        dueDate: new Date(),
      });

      // Check if conversation needs follow-up
      if (this.needsFollowUp(conversation)) {
        await this.triggerFollowUpCampaign(ghlContactId, conversation);
      }

      logger.info('Conversation transcript synced to GHL', {
        conversationId,
        ghlContactId,
        messageCount: conversation.messages.length,
      });
    } catch (error) {
      logger.error('Failed to sync conversation transcript:', errorToLogMeta(error));
    }
  }

  // Create chat lead in GHL
  async createChatLead(contactInfo: ContactInfo & { message?: string; language?: string }) {
    try {
      const { firstName, lastName, email, phone, message, language = 'en' } = contactInfo;

      // Create contact in GHL
      const contact = await ghlService.upsertContact({
        firstName: firstName || 'Chat',
        lastName: lastName || 'Visitor',
        email,
        phone: phone || '',
        tags: ['chat-lead', 'website-chat', language],
        source: 'Website Chat',
        customFields: {
          firstMessage: message,
          chatLanguage: language,
          chatStartDate: new Date().toISOString(),
        },
      });

      // Trigger new lead campaign if configured
      const campaignId = process.env.GHL_CHAT_LEAD_CAMPAIGN_ID;
      if (campaignId && contact.id) {
        await ghlService.triggerCampaign({
          contactId: contact.id,
          campaignId,
        });
      }

      logger.info('Chat lead created in GHL', {
        contactId: contact.id,
        email,
        phone,
      });

      return contact;
    } catch (error) {
      logger.error('Failed to create chat lead in GHL:', errorToLogMeta(error));
      throw error;
    }
  }

  // Private helper methods
  private async getOrCreateGHLContact(
    userId: string,
    metadata?: Record<string, unknown>
  ): Promise<string | null> {
    try {
      // Check cache first
      if (this.contactCache.has(userId)) {
        return this.contactCache.get(userId)!;
      }

      const prisma = getPrismaClient();

      // Get user details
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) return null;

      // Find or create GHL contact
      let ghlContact: GHLContact | null = null;

      if (user.phone) {
        ghlContact = await ghlService.findContactByPhone(user.phone);
      }

      if (!ghlContact && user.email) {
        ghlContact = await ghlService.findContactByEmail(user.email);
      }

      if (!ghlContact) {
        // Create new contact
        const [firstName, ...lastNameParts] = (user.name || 'Chat User').split(' ');
        const lastName = lastNameParts.join(' ') || 'User';

        ghlContact = await ghlService.upsertContact({
          firstName: firstName || 'Chat',
          lastName,
          email: user.email,
          phone: user.phone || '',
          tags: ['chat-user', 'website'],
          source: 'Website Chat',
          customFields: {
            userId: userId,
            ...metadata,
          },
        });
      }

      if (ghlContact?.id) {
        this.contactCache.set(userId, ghlContact.id);
        return ghlContact.id;
      }

      return null;
    } catch (error) {
      logger.error('Failed to get or create GHL contact:', errorToLogMeta(error));
      return null;
    }
  }

  private formatChatMessage(message: string, isUserMessage: boolean, language: string): string {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
    });
    const sender = isUserMessage ? 'User' : 'Assistant';
    const langLabel = language === 'es' ? '(Español)' : '(English)';

    return `[Chat Message ${langLabel}] ${timestamp}\n${sender}: ${message}\n---`;
  }

  private formatTranscript(conversation: {
    id: string;
    startedAt: Date;
    language?: string;
    status: string;
    messages: Array<{
      createdAt: Date;
      role: string;
      content: string;
    }>;
  }): string {
    const startTime = new Date(conversation.startedAt).toLocaleString('en-US', {
      timeZone: 'America/New_York',
    });

    let transcript = `=== CHAT TRANSCRIPT ===\n`;
    transcript += `Session ID: ${conversation.id}\n`;
    transcript += `Started: ${startTime}\n`;
    transcript += `Language: ${conversation.language || 'en'}\n`;
    transcript += `Status: ${conversation.status}\n`;
    transcript += `\n--- MESSAGES ---\n\n`;

    for (const msg of conversation.messages) {
      const msgTime = new Date(msg.createdAt).toLocaleString('en-US', {
        timeZone: 'America/New_York',
      });
      const role = msg.role === 'user' ? 'User' : 'Assistant';
      transcript += `[${msgTime}] ${role}:\n${msg.content}\n\n`;
    }

    transcript += `\n=== END TRANSCRIPT ===`;

    return transcript;
  }

  private extractTagsFromMessage(message: string, language: string): string[] {
    const tags: string[] = [];
    const lowerMessage = message.toLowerCase();

    // Check for practice areas
    if (lowerMessage.includes('immigration') || lowerMessage.includes('inmigración')) {
      tags.push('chat-immigration');
    }
    if (
      lowerMessage.includes('injury') ||
      lowerMessage.includes('accident') ||
      lowerMessage.includes('lesion') ||
      lowerMessage.includes('accidente')
    ) {
      tags.push('chat-personal-injury');
    }
    if (
      lowerMessage.includes('criminal') ||
      lowerMessage.includes('arrest') ||
      lowerMessage.includes('criminal') ||
      lowerMessage.includes('arresto')
    ) {
      tags.push('chat-criminal-defense');
    }
    if (
      lowerMessage.includes('divorce') ||
      lowerMessage.includes('custody') ||
      lowerMessage.includes('divorcio') ||
      lowerMessage.includes('custodia')
    ) {
      tags.push('chat-family-law');
    }
    if (
      (lowerMessage.includes('work') &&
        (lowerMessage.includes('injury') || lowerMessage.includes('compensation'))) ||
      (lowerMessage.includes('trabajo') &&
        (lowerMessage.includes('lesión') || lowerMessage.includes('compensación')))
    ) {
      tags.push('chat-workers-comp');
    }

    // Check for urgency
    if (
      lowerMessage.includes('urgent') ||
      lowerMessage.includes('emergency') ||
      lowerMessage.includes('urgente') ||
      lowerMessage.includes('emergencia')
    ) {
      tags.push('chat-urgent');
    }

    // Check for appointment interest
    if (
      lowerMessage.includes('appointment') ||
      lowerMessage.includes('consultation') ||
      lowerMessage.includes('cita') ||
      lowerMessage.includes('consulta')
    ) {
      tags.push('chat-appointment-interest');
    }

    return tags;
  }

  private async checkChatTriggers(contactId: string, message: string, language: string) {
    const lowerMessage = message.toLowerCase();

    // Appointment request trigger
    if (
      lowerMessage.includes('appointment') ||
      lowerMessage.includes('consultation') ||
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('cita') ||
      lowerMessage.includes('consulta') ||
      lowerMessage.includes('agendar')
    ) {
      const campaignId = process.env.GHL_APPOINTMENT_REQUEST_CAMPAIGN_ID;
      if (campaignId) {
        await ghlService.triggerCampaign({ contactId, campaignId });
      }
    }

    // Urgent/Emergency trigger
    if (
      lowerMessage.includes('urgent') ||
      lowerMessage.includes('emergency') ||
      lowerMessage.includes('asap') ||
      lowerMessage.includes('urgente') ||
      lowerMessage.includes('emergencia')
    ) {
      const campaignId = process.env.GHL_URGENT_INQUIRY_CAMPAIGN_ID;
      if (campaignId) {
        await ghlService.triggerCampaign({ contactId, campaignId });
      }

      // Also create a task for immediate follow-up
      await ghlService.createTask({
        contactId,
        title: 'URGENT: Chat inquiry requires immediate attention',
        body: `User expressed urgency in chat. Message: "${message}"`,
        dueDate: new Date(),
        assignedTo: process.env.GHL_DEFAULT_USER_ID,
      });
    }

    // Practice area specific campaigns
    const practiceAreaCampaigns: Record<string, string | undefined> = {
      immigration: process.env.GHL_IMMIGRATION_CHAT_CAMPAIGN_ID,
      injury: process.env.GHL_PERSONAL_INJURY_CHAT_CAMPAIGN_ID,
      criminal: process.env.GHL_CRIMINAL_DEFENSE_CHAT_CAMPAIGN_ID,
      divorce: process.env.GHL_FAMILY_LAW_CHAT_CAMPAIGN_ID,
      workers: process.env.GHL_WORKERS_COMP_CHAT_CAMPAIGN_ID,
    };

    for (const [keyword, campaignId] of Object.entries(practiceAreaCampaigns)) {
      if (campaignId && lowerMessage.includes(keyword)) {
        await ghlService.triggerCampaign({ contactId, campaignId });
        break; // Only trigger one practice area campaign
      }
    }
  }

  private needsFollowUp(conversation: {
    messages: Array<{
      role: string;
      content: string;
    }>;
    user: {
      phone?: string | null;
      email?: string | null;
    };
  }): boolean {
    // Check if conversation ended without resolution
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) return false;

    const lastMessageLower = lastMessage.content.toLowerCase();

    // Check for unresolved questions
    if (
      lastMessage.role === 'user' &&
      (lastMessageLower.includes('?') ||
        lastMessageLower.includes('help') ||
        lastMessageLower.includes('ayuda'))
    ) {
      return true;
    }

    // Check for appointment interest without booking
    const hasAppointmentInterest = conversation.messages.some(
      (msg: { content: string }) =>
        msg.content.toLowerCase().includes('appointment') ||
        msg.content.toLowerCase().includes('consultation') ||
        msg.content.toLowerCase().includes('cita') ||
        msg.content.toLowerCase().includes('consulta')
    );

    const hasContactInfo = !!(conversation.user.phone || conversation.user.email);

    return hasAppointmentInterest && hasContactInfo;
  }

  private async triggerFollowUpCampaign(
    contactId: string,
    conversation: {
      messages: Array<{ content: string }>;
    }
  ) {
    const campaignId = process.env.GHL_CHAT_FOLLOWUP_CAMPAIGN_ID;
    if (!campaignId) return;

    try {
      await ghlService.triggerCampaign({ contactId, campaignId });

      // Also create a follow-up task
      await ghlService.createTask({
        contactId,
        title: 'Follow up on incomplete chat conversation',
        body: `User had ${conversation.messages.length} messages but conversation ended without resolution. Review transcript and follow up.`,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        assignedTo: process.env.GHL_DEFAULT_USER_ID,
      });
    } catch (error) {
      logger.error('Failed to trigger follow-up campaign:', errorToLogMeta(error));
    }
  }

  // Get GHL contact ID for a user
  async getGHLContactId(userId: string): Promise<string | null> {
    return this.contactCache.get(userId) || null;
  }

  // Clear cache (useful for testing or memory management)
  clearCache() {
    this.contactCache.clear();
  }
}

// Export singleton instance
export const ghlChatSync = new GHLChatSyncService();
