/**
 * Agent Orchestrator
 * Coordinates and manages all specialized agents
 */

import { BaseAgent, AgentContext, AgentResponse } from './base-agent';
import { componentLogger as logger } from '@/lib/safe-logger';
import { ContactManagementAgent } from '../ghl-agents/contact-management-agent';
import { ConversationAgent } from './conversation-agent';
import { AppointmentAgent } from '../ghl-agents/appointment-agent';
import { CampaignAgent } from '../ghl-agents/campaign-agent';

interface OrchestratorRequest {
  intent: string;
  data: any;
  context: AgentContext;
}

interface AgentResult {
  agent: string;
  response: AgentResponse;
  duration: number;
}

export class AgentOrchestrator {
  private static instance: AgentOrchestrator;
  private agents: Map<string, BaseAgent>;
  private conversationAgent: ConversationAgent;
  private contactAgent: ContactManagementAgent;
  private appointmentAgent: AppointmentAgent;
  private campaignAgent: CampaignAgent;
  
  private constructor() {
    // Initialize all agents
    this.conversationAgent = new ConversationAgent();
    this.contactAgent = new ContactManagementAgent();
    this.appointmentAgent = new AppointmentAgent();
    this.campaignAgent = new CampaignAgent();
    
    // Register agents
    this.agents = new Map<string, BaseAgent>([
      ['conversation', this.conversationAgent],
      ['contact', this.contactAgent],
      ['appointment', this.appointmentAgent],
      ['campaign', this.campaignAgent]
    ]);
  }
  
  /**
   * Get singleton instance
   */
  static getInstance(): AgentOrchestrator {
    if (!this.instance) {
      this.instance = new AgentOrchestrator();
    }
    return this.instance;
  }
  
  /**
   * Process a new lead through all necessary agents
   */
  async processNewLead(context: AgentContext, leadData: any): Promise<AgentResult[]> {
    logger.info('[Orchestrator] Processing new lead', leadData);
    const results: AgentResult[] = [];
    
    try {
      // Step 1: Create or update contact
      const contactStart = Date.now();
      const contactResult = await this.contactAgent.execute(context, {
        action: 'upsert',
        data: {
          firstName: leadData.firstName || context.contactInfo?.firstName,
          lastName: leadData.lastName || context.contactInfo?.lastName,
          email: leadData.email || context.contactInfo?.email,
          phone: leadData.phone || context.contactInfo?.phone,
          source: leadData.source || 'chatbot',
          tags: ['new_lead', 'chatbot_interaction']
        }
      });
      
      results.push({
        agent: 'contact',
        response: contactResult,
        duration: Date.now() - contactStart
      });
      
      // Store contact ID in context for other agents
      if (contactResult.success && contactResult.data?.id) {
        context.metadata = {
          ...context.metadata,
          ghlContactId: contactResult.data.id
        };
      }
      
      // Step 2: Create conversation
      const convStart = Date.now();
      const convResult = await this.conversationAgent.execute(context, {
        action: 'create',
        data: {
          contactId: context.metadata?.ghlContactId
        }
      });
      
      results.push({
        agent: 'conversation',
        response: convResult,
        duration: Date.now() - convStart
      });
      
      // Step 3: Trigger appropriate campaign
      const campaignStart = Date.now();
      const campaignResult = await this.campaignAgent.execute(context, {
        action: 'trigger',
        data: {
          contactId: context.metadata?.ghlContactId,
          trigger: this.determineCampaignTrigger(leadData),
          ...leadData
        }
      });
      
      results.push({
        agent: 'campaign',
        response: campaignResult,
        duration: Date.now() - campaignStart
      });
      
      // Step 4: Track event
      await this.campaignAgent.execute(context, {
        action: 'track_event',
        data: {
          eventType: 'lead_created',
          eventData: leadData
        }
      });
      
    } catch (error) {
      logger.error('[Orchestrator] Error processing new lead:', error);
    }
    
    return results;
  }
  
  /**
   * Process an appointment request
   */
  async processAppointmentRequest(context: AgentContext, appointmentData: any): Promise<AgentResult[]> {
    logger.info('[Orchestrator] Processing appointment request', appointmentData);
    const results: AgentResult[] = [];
    
    try {
      // Step 1: Check availability
      const availStart = Date.now();
      const availResult = await this.appointmentAgent.execute(context, {
        action: 'check_availability',
        data: appointmentData
      });
      
      results.push({
        agent: 'appointment',
        response: availResult,
        duration: Date.now() - availStart
      });
      
      if (!availResult.success || !availResult.data?.available) {
        // Get alternative slots if requested time not available
        const slotsResult = await this.appointmentAgent.execute(context, {
          action: 'get_slots',
          data: appointmentData
        });
        
        results.push({
          agent: 'appointment',
          response: slotsResult,
          duration: Date.now() - availStart
        });
        
        return results;
      }
      
      // Step 2: Book appointment
      const bookStart = Date.now();
      const bookResult = await this.appointmentAgent.execute(context, {
        action: 'book',
        data: appointmentData
      });
      
      results.push({
        agent: 'appointment',
        response: bookResult,
        duration: Date.now() - bookStart
      });
      
      if (bookResult.success) {
        // Step 3: Trigger appointment confirmation campaign
        const campaignResult = await this.campaignAgent.execute(context, {
          action: 'trigger',
          data: {
            trigger: 'appointment_booked',
            appointmentId: bookResult.data?.appointmentId,
            ...appointmentData
          }
        });
        
        results.push({
          agent: 'campaign',
          response: campaignResult,
          duration: Date.now() - bookStart
        });
        
        // Step 4: Log appointment in conversation
        await this.conversationAgent.execute(context, {
          action: 'send',
          data: {
            role: 'system',
            content: `Appointment booked: ${appointmentData.date} at ${appointmentData.time}`,
            metadata: {
              type: 'appointment_confirmation',
              appointmentId: bookResult.data?.appointmentId
            }
          }
        });
      }
      
    } catch (error) {
      logger.error('[Orchestrator] Error processing appointment:', error);
    }
    
    return results;
  }
  
  /**
   * Process a message in the conversation
   */
  async processMessage(context: AgentContext, message: string, role: 'user' | 'assistant' = 'user'): Promise<AgentResponse> {
    logger.info('[Orchestrator] Processing message', { role, preview: message.substring(0, 50) });
    
    try {
      // Log message to conversation
      const result = await this.conversationAgent.execute(context, {
        action: 'send',
        data: {
          role,
          content: message,
          timestamp: Date.now()
        }
      });
      
      // Analyze message for intents
      const intents = this.analyzeIntents(message);
      
      // Process intents if found
      if (intents.length > 0) {
        await this.processIntents(context, intents, message);
      }
      
      return result;
      
    } catch (error) {
      logger.error('[Orchestrator] Error processing message:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process message'
      };
    }
  }
  
  /**
   * End conversation and clean up
   */
  async endConversation(context: AgentContext, summary?: string): Promise<AgentResult[]> {
    logger.info('[Orchestrator] Ending conversation', context.sessionId);
    const results: AgentResult[] = [];
    
    try {
      // Generate summary if not provided
      if (!summary && context.metadata?.messages) {
        const summaryResult = await this.conversationAgent.execute(context, {
          action: 'summarize',
          data: {
            messages: context.metadata.messages
          }
        });
        
        summary = summaryResult.data?.summary;
      }
      
      // End conversation
      const endResult = await this.conversationAgent.execute(context, {
        action: 'end',
        data: { summary }
      });
      
      results.push({
        agent: 'conversation',
        response: endResult,
        duration: 0
      });
      
      // Update contact with summary
      if (context.metadata?.ghlContactId && summary) {
        const updateResult = await this.contactAgent.execute(context, {
          action: 'update',
          data: {
            contactId: context.metadata.ghlContactId,
            updates: {
              notes: summary,
              customFields: {
                lastChatSummary: summary,
                lastChatDate: new Date().toISOString()
              }
            }
          }
        });
        
        results.push({
          agent: 'contact',
          response: updateResult,
          duration: 0
        });
      }
      
      // Trigger follow-up campaign if needed
      if (this.shouldTriggerFollowUp(context)) {
        const campaignResult = await this.campaignAgent.execute(context, {
          action: 'trigger',
          data: {
            trigger: 'follow_up_needed',
            reason: 'conversation_ended'
          }
        });
        
        results.push({
          agent: 'campaign',
          response: campaignResult,
          duration: 0
        });
      }
      
    } catch (error) {
      logger.error('[Orchestrator] Error ending conversation:', error);
    }
    
    return results;
  }
  
  /**
   * Analyze message for intents
   */
  private analyzeIntents(message: string): string[] {
    const intents: string[] = [];
    const lowerMessage = message.toLowerCase();
    
    // Appointment-related intents
    if (lowerMessage.includes('appointment') || 
        lowerMessage.includes('schedule') || 
        lowerMessage.includes('book') ||
        lowerMessage.includes('consultation')) {
      intents.push('appointment');
    }
    
    // Contact update intents
    if (lowerMessage.includes('my email is') || 
        lowerMessage.includes('my phone is') ||
        lowerMessage.includes('my name is')) {
      intents.push('contact_update');
    }
    
    // Urgency indicators
    if (lowerMessage.includes('urgent') || 
        lowerMessage.includes('emergency') ||
        lowerMessage.includes('asap')) {
      intents.push('urgent');
    }
    
    // Practice area mentions
    if (lowerMessage.includes('immigration') || 
        lowerMessage.includes('visa') ||
        lowerMessage.includes('green card')) {
      intents.push('immigration');
    }
    
    if (lowerMessage.includes('injury') || 
        lowerMessage.includes('accident') ||
        lowerMessage.includes('hurt')) {
      intents.push('personal_injury');
    }
    
    return intents;
  }
  
  /**
   * Process identified intents
   */
  private async processIntents(context: AgentContext, intents: string[], message: string): Promise<void> {
    for (const intent of intents) {
      switch (intent) {
        case 'appointment':
          // Track appointment interest
          await this.campaignAgent.execute(context, {
            action: 'track_event',
            data: {
              eventType: 'appointment_interest',
              eventData: { message }
            }
          });
          break;
          
        case 'urgent':
          // Trigger hot lead campaign
          await this.campaignAgent.execute(context, {
            action: 'trigger',
            data: {
              trigger: 'hot_lead',
              urgency: 'high'
            }
          });
          break;
          
        case 'immigration':
        case 'personal_injury':
          // Add practice area tag
          await this.contactAgent.execute(context, {
            action: 'tag',
            data: {
              contactId: context.metadata?.ghlContactId,
              tags: [intent]
            }
          });
          break;
      }
    }
  }
  
  /**
   * Determine campaign trigger based on lead data
   */
  private determineCampaignTrigger(leadData: any): string {
    if (leadData.urgency === 'high' || leadData.urgent) {
      return 'hot_lead';
    }
    
    if (leadData.practiceArea === 'immigration') {
      return 'immigration_inquiry';
    }
    
    if (leadData.practiceArea === 'personal_injury') {
      return 'personal_injury_inquiry';
    }
    
    return 'new_lead';
  }
  
  /**
   * Determine if follow-up campaign should be triggered
   */
  private shouldTriggerFollowUp(context: AgentContext): boolean {
    // Don't trigger if appointment was booked
    if (context.metadata?.appointmentBooked) {
      return false;
    }
    
    // Don't trigger if contact info not collected
    if (!context.metadata?.ghlContactId) {
      return false;
    }
    
    // Trigger if conversation had substantial interaction
    const messageCount = context.metadata?.messageCount || 0;
    return messageCount > 4;
  }
  
  /**
   * Get orchestrator status
   */
  getStatus(): Record<string, any> {
    return {
      agents: Array.from(this.agents.keys()),
      activeConversations: this.conversationAgent.hasActiveConversation('*') ? 1 : 0,
      ready: true
    };
  }
}
