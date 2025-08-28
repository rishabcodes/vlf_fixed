/**
 * Contact Management Agent
 * Handles all contact-related operations using GHL MCP
 */

import { BaseAgent, AgentContext, AgentResponse } from '../agents/base-agent';

interface ContactOperation {
  action: 'create' | 'update' | 'find' | 'tag' | 'untag' | 'upsert';
  data?: any;
}

export class ContactManagementAgent extends BaseAgent {
  constructor() {
    super({
      name: 'ContactManagementAgent',
      description: 'Manages contact creation, updates, and tagging in GHL',
      capabilities: [
        'create_contact',
        'update_contact',
        'find_contact',
        'add_tags',
        'remove_tags',
        'upsert_contact'
      ],
      priority: 1
    });
  }
  
  async execute(context: AgentContext, input: ContactOperation): Promise<AgentResponse> {
    try {
      switch (input.action) {
        case 'create':
          return await this.createContact(context, input.data);
        case 'update':
          return await this.updateContact(context, input.data);
        case 'find':
          return await this.findContact(context, input.data);
        case 'upsert':
          return await this.upsertContact(context, input.data);
        case 'tag':
          return await this.addTags(context, input.data);
        case 'untag':
          return await this.removeTags(context, input.data);
        default:
          return this.handleError(new Error(`Unknown action: ${input.action}`));
      }
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Create a new contact in GHL
   */
  private async createContact(context: AgentContext, data: any): Promise<AgentResponse> {
    const validation = this.validateContext(context, ['email']);
    if (validation) {
      return { success: false, error: validation };
    }
    
    this.log('Creating contact', data);
    
    const contactData = {
      firstName: data?.firstName || context.contactInfo?.firstName || '',
      lastName: data?.lastName || context.contactInfo?.lastName || '',
      email: data?.email || context.contactInfo?.email,
      phone: data?.phone || context.contactInfo?.phone || '',
      source: data?.source || 'website_chatbot',
      tags: data?.tags || ['chatbot_lead'],
      customFields: {
        chatSessionId: context.sessionId,
        language: context.language,
        ...data?.customFields
        }
};
    
    try {
      const result = await this.mcp.executeTool('contacts_create-contact', contactData);
      
      // Cache the contact for quick retrieval
      this.setCache(`contact:${contactData.email}`, result.data, 600);
      
      this.log('Contact created successfully', result.data?.id);
      
      return {
        success: true,
        data: result.data,
        metadata: {
          contactId: result.data?.id,
          cached: true
          }
};
    } catch (error: any) {
      // If contact already exists, try to update instead
      if (error.message?.includes('already exists')) {
        return await this.upsertContact(context, contactData);
      }
      throw error;
    }
  }
  
  /**
   * Update an existing contact
   */
  private async updateContact(context: AgentContext, data: any): Promise<AgentResponse> {
    if (!data.contactId) {
      return { success: false, error: 'Contact ID is required for update' };
    }
    
    this.log('Updating contact', data.contactId);
    
    const updateData = {
      contactId: data.contactId,
      ...data.updates
    };
    
    const result = await this.mcp.executeTool('contacts_update-contact', updateData);
    
    // Invalidate cache
    if (data.email) {
      this.cache.delete(`contact:${data.email}`);
    }
    
    return {
      success: true,
      data: result.data,
      metadata: {
        contactId: data.contactId,
        updated: true
        }
};
  }
  
  /**
   * Find a contact by email or phone
   */
  private async findContact(context: AgentContext, data: any): Promise<AgentResponse> {
    const identifier = data?.email || data?.phone || context.contactInfo?.email;
    
    if (!identifier) {
      return { success: false, error: 'Email or phone required to find contact' };
    }
    
    // Check cache first
    const cacheKey = `contact:${identifier}`;
    const cached = this.getCache(cacheKey);
    if (cached) {
      this.log('Contact found in cache', identifier);
      return {
        success: true,
        data: cached,
        metadata: { fromCache: true   }
};
    }
    
    this.log('Searching for contact', identifier);
    
    const searchData = data?.email 
      ? { email: data.email }
      : { phone: data.phone };
    
    const result = await this.mcp.executeTool('contacts_get-contact', searchData);
    
    if (result.data) {
      // Cache the result
      this.setCache(cacheKey, result.data, 600);
      
      return {
        success: true,
        data: result.data,
        metadata: { fromCache: false   }
};
    }
    
    return {
      success: false,
      error: 'Contact not found',
      metadata: { searched: identifier   }
};
  }
  
  /**
   * Create or update a contact (upsert)
   */
  private async upsertContact(context: AgentContext, data: any): Promise<AgentResponse> {
    this.log('Upserting contact', data);
    
    // First try to find the contact
    const findResult = await this.findContact(context, data);
    
    if (findResult.success && findResult.data) {
      // Contact exists, update it
      return await this.updateContact(context, {
        contactId: findResult.data.id,
        updates: data
      });
    } else {
      // Contact doesn't exist, create it
      return await this.createContact(context, data);
    }
  }
  
  /**
   * Add tags to a contact
   */
  private async addTags(context: AgentContext, data: any): Promise<AgentResponse> {
    if (!data.contactId || !data.tags) {
      return { 
        success: false, 
        error: 'Contact ID and tags are required' 
      };
    }
    
    this.log('Adding tags to contact', { contactId: data.contactId, tags: data.tags });
    
    const result = await this.mcp.executeTool('contacts_add-tag', {
      contactId: data.contactId,
      tags: Array.isArray(data.tags) ? data.tags : [data.tags]
    });
    
    return {
      success: true,
      data: result.data,
      metadata: {
        tagsAdded: data.tags
        }
};
  }
  
  /**
   * Remove tags from a contact
   */
  private async removeTags(context: AgentContext, data: any): Promise<AgentResponse> {
    if (!data.contactId || !data.tags) {
      return { 
        success: false, 
        error: 'Contact ID and tags are required' 
      };
    }
    
    this.log('Removing tags from contact', { contactId: data.contactId, tags: data.tags });
    
    const result = await this.mcp.executeTool('contacts_remove-tag', {
      contactId: data.contactId,
      tags: Array.isArray(data.tags) ? data.tags : [data.tags]
    });
    
    return {
      success: true,
      data: result.data,
      metadata: {
        tagsRemoved: data.tags
        }
};
  }
  
  /**
   * Batch operations for efficiency
   */
  async batchUpsert(contacts: any[]): Promise<AgentResponse[]> {
    this.log(`Batch upserting ${contacts.length} contacts`);
    
    // Process in parallel but limit concurrency
    const batchSize = 5;
    const results: AgentResponse[] = [];
    
    for (let i = 0; i < contacts.length; i += batchSize) {
      const batch = contacts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(contact => 
          this.execute({ 
            sessionId: 'batch', 
            language: 'en' 
          }, {
            action: 'upsert',
            data: contact
          })
        )
      );
      results.push(...batchResults);
    }
    
    return results;
  }
}
