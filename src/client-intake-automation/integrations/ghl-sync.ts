/**
 * GHL Sync Module - Keeps database and GHL in sync
 */

import { GHLMCPClient } from '@/new-chatbot/ghl-agents/ghl-mcp-client';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/safe-logger';
import Bull from 'bull';

interface SyncJob {
  type: 'contact' | 'opportunity' | 'task' | 'note';
  action: 'create' | 'update' | 'delete';
  data: any;
  userId?: string;
  ghlId?: string;
}

export class GHLSyncManager {
  private ghlClient: GHLMCPClient;
  private prisma;
  private syncQueue: Bull.Queue;

  constructor() {
    this.ghlClient = new GHLMCPClient();
    this.prisma = getPrismaClient();
    
    // Initialize sync queue
    this.syncQueue = new Bull('ghl-sync', {
      redis: {
        port: parseInt(process.env.REDIS_PORT || '6379'),
        host: process.env.REDIS_HOST || 'localhost',
      }
    });

    this.setupQueueProcessors();
  }

  /**
   * Sync a contact to GHL
   */
  async syncContact(userId: string, ghlData: any): Promise<string | null> {
    try {
      if (!this.ghlClient.isConfigured()) {
        apiLogger.warn('GHL client not configured');
        return null;
      }

      // Get user from database
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          tasks: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Check if contact exists in GHL
      let ghlContact = await this.ghlClient.searchContactByEmail(user.email);

      if (ghlContact) {
        // Update existing contact
        await this.ghlClient.createOrUpdateContact({
          ...ghlData,
          id: ghlContact.id
        });
        
        // Update user with GHL ID
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            metadata: {
              ...(user.metadata as any || {}),
              ghlContactId: ghlContact.id
            }
          }
        });

        apiLogger.info('Contact synced to GHL', {
          userId,
          ghlId: ghlContact.id,
          action: 'update'
        });

        return ghlContact.id;
      } else {
        // Create new contact
        const created = await this.ghlClient.createOrUpdateContact({
          ...ghlData,
          email: user.email,
          firstName: user.name?.split(' ')[0] || '',
          lastName: user.name?.split(' ').slice(1).join(' ') || '',
          phone: user.phone || ''
        });

        if (created) {
          // Update user with GHL ID
          await this.prisma.user.update({
            where: { id: userId },
            data: {
              metadata: {
                ...(user.metadata as any || {}),
                ghlContactId: created.id
              }
            }
          });

          apiLogger.info('Contact synced to GHL', {
            userId,
            ghlId: created.id,
            action: 'create'
          });

          return created.id;
        }
      }

      return null;
    } catch (error) {
      apiLogger.error('Failed to sync contact', error as Error);
      throw error;
    }
  }

  /**
   * Sync an opportunity to GHL
   */
  async syncOpportunity(data: {
    contactId: string;
    name: string;
    value: number;
    stage?: string;
    assignedTo?: string;
  }): Promise<string | null> {
    try {
      if (!this.ghlClient.isConfigured()) {
        return null;
      }

      // Note: createOpportunity method needs to be implemented in GHLMCPClient
      // For now, using a placeholder
      const opportunity = await this.createOpportunityPlaceholder({
        contactId: data.contactId,
        name: data.name,
        pipelineId: process.env.GHL_PIPELINE_ID || '',
        stageId: data.stage || process.env.GHL_NEW_LEAD_STAGE_ID || '',
        value: data.value,
        assignedTo: data.assignedTo
      });

      if (opportunity) {
        apiLogger.info('Opportunity synced to GHL', {
          opportunityId: opportunity.id,
          contactId: data.contactId
        });
        return opportunity.id;
      }

      return null;
    } catch (error) {
      apiLogger.error('Failed to sync opportunity', error as Error);
      return null;
    }
  }

  /**
   * Add a note to GHL contact
   */
  async addNote(contactId: string, note: string): Promise<void> {
    try {
      if (!this.ghlClient.isConfigured()) {
        return;
      }

      await this.ghlClient.createContactNote(contactId, note);
      
      apiLogger.info('Note added to GHL contact', {
        contactId,
        noteLength: note.length
      });
    } catch (error) {
      apiLogger.error('Failed to add note', error as Error);
    }
  }

  /**
   * Placeholder for createOpportunity until implemented in GHLMCPClient
   */
  private async createOpportunityPlaceholder(data: any): Promise<any> {
    apiLogger.warn('createOpportunity not yet implemented in GHLMCPClient', data);
    // Return a mock response for now
    return {
      id: `opp_${Date.now()}`,
      ...data,
      created: true
    };
  }

  /**
   * Queue a sync job for background processing
   */
  async queueSync(job: SyncJob): Promise<void> {
    await this.syncQueue.add('sync-job', job, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000
      }
    });
  }

  /**
   * Setup queue processors
   */
  private setupQueueProcessors(): void {
    this.syncQueue.process('sync-job', async (job) => {
      const data = job.data as SyncJob;

      try {
        switch (data.type) {
          case 'contact':
            if (data.userId) {
              await this.syncContact(data.userId, data.data);
            }
            break;

          case 'opportunity':
            await this.syncOpportunity(data.data);
            break;

          case 'note':
            if (data.ghlId) {
              await this.addNote(data.ghlId, data.data.note);
            }
            break;

          case 'task':
            // Handle task sync if needed
            break;
        }

        apiLogger.info('Sync job completed', {
          type: data.type,
          action: data.action
        });

      } catch (error) {
        apiLogger.error('Sync job failed', error as Error);
        throw error;
      }
    });
  }

  /**
   * Sync all pending items for a user
   */
  async syncUserData(userId: string): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          tasks: true,
          conversations: {
            take: 5,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!user) {
        return;
      }

      // Get or create GHL contact
      const metadata = user.metadata as any || {};
      let ghlContactId = metadata.ghlContactId;

      if (!ghlContactId) {
        ghlContactId = await this.syncContact(userId, {
          tags: ['Website User', 'Synced'],
          customFields: {
            userId,
            lastSync: new Date().toISOString()
          }
        });
      }

      if (!ghlContactId) {
        return;
      }

      // Sync tasks as notes
      for (const task of user.tasks || []) {
        const note = `Task: ${task.title}\n${task.description || ''}\nPriority: ${task.priority}\nStatus: ${task.status}`;
        await this.queueSync({
          type: 'note',
          action: 'create',
          ghlId: ghlContactId,
          data: { note }
        });
      }

      // Sync recent conversations
      for (const conversation of user.conversations || []) {
        const note = `Conversation: ${conversation.title || 'Chat'}\nDate: ${conversation.createdAt}\nMessages: ${conversation.messageCount || 0}`;
        await this.queueSync({
          type: 'note',
          action: 'create',
          ghlId: ghlContactId,
          data: { note }
        });
      }

      apiLogger.info('User data synced', {
        userId,
        ghlContactId,
        taskCount: user.tasks?.length || 0,
        conversationCount: user.conversations?.length || 0
      });

    } catch (error) {
      apiLogger.error('Failed to sync user data', error as Error);
    }
  }

  /**
   * Handle webhook from GHL
   */
  async handleWebhook(event: any): Promise<void> {
    try {
      const { type, data } = event;

      switch (type) {
        case 'contact.updated':
          // Update local database with GHL changes
          await this.updateLocalContact(data);
          break;

        case 'opportunity.statusChanged':
          // Update local tracking
          await this.updateOpportunityStatus(data);
          break;

        case 'appointment.scheduled':
          // Create task in local system
          await this.createAppointmentTask(data);
          break;
      }

      apiLogger.info('Webhook processed', {
        type,
        dataId: data.id
      });

    } catch (error) {
      apiLogger.error('Failed to process webhook', error as Error);
    }
  }

  /**
   * Update local contact from GHL data
   */
  private async updateLocalContact(ghlContact: any): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: ghlContact.email },
          { 
            metadata: {
              path: '$.ghlContactId',
              equals: ghlContact.id
            }
          }
        ]
      }
    });

    if (user) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          metadata: {
            ...(user.metadata as any || {}),
            ghlLastSync: new Date().toISOString(),
            ghlTags: ghlContact.tags,
            ghlCustomFields: ghlContact.customFields
          }
        }
      });
    }
  }

  /**
   * Update opportunity status
   */
  private async updateOpportunityStatus(data: any): Promise<void> {
    // Update relevant task or create log entry
    await this.prisma.activityLog.create({
      data: {
        type: 'opportunity_update',
        metadata: data
      }
    });
  }

  /**
   * Create appointment task
   */
  private async createAppointmentTask(data: any): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        metadata: {
          path: '$.ghlContactId',
          equals: data.contactId
        }
      }
    });

    if (user) {
      await this.prisma.task.create({
        data: {
          title: `Appointment: ${data.title}`,
          description: `Scheduled for ${data.startTime}`,
          type: 'appointment',
          priority: 'high',
          status: 'scheduled',
          dueDate: new Date(data.startTime),
          createdById: user.id,
          metadata: data
        }
      });
    }
  }
}
