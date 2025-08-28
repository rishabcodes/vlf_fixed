/**
 * Campaign Agent
 * Handles marketing automation and campaign management using GHL MCP
 */

import { BaseAgent, AgentContext, AgentResponse } from '../agents/base-agent';

interface CampaignOperation {
  action: 'trigger' | 'add_to_campaign' | 'remove_from_campaign' | 'get_campaigns' | 'track_event';
  data?: any;
}

interface CampaignMapping {
  trigger: string;
  campaignId: string;
  priority: number;
  conditions?: Record<string, any>;
}

export class CampaignAgent extends BaseAgent {
  private campaignMappings: CampaignMapping[];
  
  constructor() {
    super({
      name: 'CampaignAgent',
      description: 'Manages marketing campaigns and automation',
      capabilities: [
        'trigger_campaign',
        'add_contact_to_campaign',
        'remove_contact_from_campaign',
        'get_campaigns',
        'track_event'
      ],
      priority: 4
    });
    
    // Define campaign mappings based on triggers
    this.campaignMappings = [
      {
        trigger: 'new_lead',
        campaignId: process.env.GHL_NEW_LEAD_CAMPAIGN_ID || 'default_new_lead',
        priority: 1
      },
      {
        trigger: 'hot_lead',
        campaignId: process.env.GHL_HOT_LEAD_CAMPAIGN_ID || 'default_hot_lead',
        priority: 0,
        conditions: { urgency: 'high' }
      },
      {
        trigger: 'immigration_inquiry',
        campaignId: process.env.GHL_IMMIGRATION_CAMPAIGN_ID || 'default_immigration',
        priority: 2,
        conditions: { practiceArea: 'immigration' }
      },
      {
        trigger: 'personal_injury_inquiry',
        campaignId: process.env.GHL_PI_CAMPAIGN_ID || 'default_pi',
        priority: 2,
        conditions: { practiceArea: 'personal_injury' }
      },
      {
        trigger: 'follow_up_needed',
        campaignId: process.env.GHL_FOLLOW_UP_CAMPAIGN_ID || 'default_follow_up',
        priority: 3
      },
      {
        trigger: 'appointment_booked',
        campaignId: process.env.GHL_APPOINTMENT_CAMPAIGN_ID || 'default_appointment',
        priority: 2
      }
    ];
  }
  
  async execute(context: AgentContext, input: CampaignOperation): Promise<AgentResponse> {
    try {
      switch (input.action) {
        case 'trigger':
          return await this.triggerCampaign(context, input.data);
        case 'add_to_campaign':
          return await this.addToCampaign(context, input.data);
        case 'remove_from_campaign':
          return await this.removeFromCampaign(context, input.data);
        case 'get_campaigns':
          return await this.getCampaigns(context, input.data);
        case 'track_event':
          return await this.trackEvent(context, input.data);
        default:
          return this.handleError(new Error(`Unknown action: ${input.action}`));
      }
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Trigger appropriate campaign based on context
   */
  private async triggerCampaign(context: AgentContext, data: any): Promise<AgentResponse> {
    this.log('Triggering campaign', data);
    
    // Determine which campaign to trigger
    const campaign = this.selectCampaign(data);
    
    if (!campaign) {
      return {
        success: false,
        error: 'No matching campaign found for trigger'
      };
    }
    
    // Ensure we have a contact ID
    const contactId = data?.contactId || context.metadata?.ghlContactId;
    if (!contactId) {
      return {
        success: false,
        error: 'Contact ID required to trigger campaign'
      };
    }
    
    this.log(`Selected campaign: ${campaign.campaignId} for trigger: ${campaign.trigger}`);
    
    // Add contact to campaign
    return await this.addToCampaign(context, {
      contactId,
      campaignId: campaign.campaignId,
      trigger: campaign.trigger
    });
  }
  
  /**
   * Add contact to a specific campaign
   */
  private async addToCampaign(context: AgentContext, data: any): Promise<AgentResponse> {
    if (!data?.contactId || !data?.campaignId) {
      return {
        success: false,
        error: 'Contact ID and Campaign ID are required'
      };
    }
    
    this.log('Adding contact to campaign', {
      contactId: data.contactId,
      campaignId: data.campaignId
    });
    
    const campaignData = {
      contactId: data.contactId,
      campaignId: data.campaignId,
      metadata: {
        addedAt: Date.now(),
        source: 'chatbot',
        sessionId: context.sessionId,
        trigger: data.trigger || 'manual',
        ...data.metadata
        }
};
    
    try {
      // Note: GHL MCP might not have direct campaign management
      // This would typically be done through opportunities or tags
      const result = await this.mcp.executeTool('opportunities_create', {
        contactId: data.contactId,
        name: `Campaign: ${data.campaignId}`,
        pipelineId: data.campaignId,
        status: 'open',
        metadata: campaignData.metadata
      });
      
      // Also add a tag for tracking
      await this.mcp.executeTool('contacts_add-tag', {
        contactId: data.contactId,
        tags: [`campaign_${data.campaignId}`, data.trigger || 'chatbot_lead']
      });
      
      return {
        success: true,
        data: {
          contactId: data.contactId,
          campaignId: data.campaignId,
          opportunityId: result.data?.id,
          added: true
        },
        metadata: {
          trigger: data.trigger
          }
};
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Remove contact from campaign
   */
  private async removeFromCampaign(context: AgentContext, data: any): Promise<AgentResponse> {
    if (!data?.contactId || !data?.campaignId) {
      return {
        success: false,
        error: 'Contact ID and Campaign ID are required'
      };
    }
    
    this.log('Removing contact from campaign', {
      contactId: data.contactId,
      campaignId: data.campaignId
    });
    
    try {
      // Remove campaign tag
      await this.mcp.executeTool('contacts_remove-tag', {
        contactId: data.contactId,
        tags: [`campaign_${data.campaignId}`]
      });
      
      // Update opportunity status if exists
      if (data.opportunityId) {
        await this.mcp.executeTool('opportunities_update-status', {
          opportunityId: data.opportunityId,
          status: 'cancelled',
          metadata: {
            removedAt: Date.now(),
            reason: data.reason || 'Manual removal'
          }
        });
      }
      
      return {
        success: true,
        data: {
          contactId: data.contactId,
          campaignId: data.campaignId,
          removed: true
          }
};
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Get available campaigns
   */
  private async getCampaigns(context: AgentContext, data: any): Promise<AgentResponse> {
    this.log('Getting campaigns');
    
    // Return configured campaign mappings
    const campaigns = this.campaignMappings.map(cm => ({
      trigger: cm.trigger,
      campaignId: cm.campaignId,
      priority: cm.priority,
      conditions: cm.conditions
    }));
    
    return {
      success: true,
      data: {
        campaigns,
        total: campaigns.length
        }
};
  }
  
  /**
   * Track a marketing event
   */
  private async trackEvent(context: AgentContext, data: any): Promise<AgentResponse> {
    this.log('Tracking event', data);
    
    const eventData = {
      contactId: data?.contactId || context.metadata?.ghlContactId,
      eventType: data.eventType,
      eventData: data.eventData,
      timestamp: Date.now(),
      sessionId: context.sessionId
    };
    
    // Store event as custom field or note
    if (eventData.contactId) {
      try {
        await this.mcp.executeTool('contacts_update-contact', {
          contactId: eventData.contactId,
          customFields: {
            [`event_${eventData.eventType}`]: JSON.stringify(eventData),
            lastEventType: eventData.eventType,
            lastEventDate: new Date().toISOString()
          }
        });
        
        return {
          success: true,
          data: {
            eventTracked: true,
            eventType: eventData.eventType
            }
};
      } catch (error) {
        return this.handleError(error);
      }
    }
    
    return {
      success: false,
      error: 'Contact ID required to track event'
    };
  }
  
  /**
   * Select appropriate campaign based on data
   */
  private selectCampaign(data: any): CampaignMapping | null {
    // Check for specific trigger
    if (data.trigger) {
      const campaign = this.campaignMappings.find(cm => cm.trigger === data.trigger);
      if (campaign) return campaign;
    }
    
    // Check conditions
    const matchingCampaigns = this.campaignMappings.filter(cm => {
      if (!cm.conditions) return false;
      
      return Object.entries(cm.conditions).every(([key, value]) => {
        return data[key] === value;
      });
    });
    
    if (matchingCampaigns.length > 0) {
      // Return highest priority match
      return matchingCampaigns.sort((a, b) => a.priority - b.priority)[0];
    }
    
    // Default to new lead campaign
    return this.campaignMappings.find(cm => cm.trigger === 'new_lead') || null;
  }
  
  /**
   * Batch add contacts to campaign
   */
  async batchAddToCampaign(contacts: string[], campaignId: string, trigger?: string): Promise<AgentResponse[]> {
    this.log(`Batch adding ${contacts.length} contacts to campaign ${campaignId}`);
    
    const batchSize = 10;
    const results: AgentResponse[] = [];
    
    for (let i = 0; i < contacts.length; i += batchSize) {
      const batch = contacts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(contactId => 
          this.execute(
            { sessionId: 'batch', language: 'en' },
            {
              action: 'add_to_campaign',
              data: { contactId, campaignId, trigger }
            }
          )
        )
      );
      results.push(...batchResults);
    }
    
    return results;
  }
}
