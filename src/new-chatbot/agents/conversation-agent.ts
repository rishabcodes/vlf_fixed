/**
 * Conversation Agent
 * Manages chat conversations and message history using GHL MCP
 */

import { BaseAgent, AgentContext, AgentResponse } from './base-agent';

interface ConversationOperation {
  action: 'create' | 'send' | 'search' | 'end' | 'summarize';
  data?: any;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
  metadata?: Record<string, any>;
}

export class ConversationAgent extends BaseAgent {
  private activeConversations: Map<string, string> = new Map(); // sessionId -> conversationId
  
  constructor() {
    super({
      name: 'ConversationAgent',
      description: 'Manages conversations and message history in GHL',
      capabilities: [
        'create_conversation',
        'send_message',
        'search_conversations',
        'end_conversation',
        'summarize_conversation'
      ],
      priority: 2
    });
  }
  
  async execute(context: AgentContext, input: ConversationOperation): Promise<AgentResponse> {
    try {
      switch (input.action) {
        case 'create':
          return await this.createConversation(context, input.data);
        case 'send':
          return await this.sendMessage(context, input.data);
        case 'search':
          return await this.searchConversations(context, input.data);
        case 'end':
          return await this.endConversation(context, input.data);
        case 'summarize':
          return await this.summarizeConversation(context, input.data);
        default:
          return this.handleError(new Error(`Unknown action: ${input.action}`));
      }
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Create a new conversation in GHL
   */
  private async createConversation(context: AgentContext, data: any): Promise<AgentResponse> {
    this.log('Creating conversation', { sessionId: context.sessionId });
    
    // Check if conversation already exists for this session
    if (this.activeConversations.has(context.sessionId)) {
      return {
        success: true,
        data: {
          conversationId: this.activeConversations.get(context.sessionId),
          existing: true
          }
};
    }
    
    const conversationData = {
      contactId: data?.contactId || context.metadata?.ghlContactId,
      channel: 'chat',
      source: 'website_chatbot',
      metadata: {
        sessionId: context.sessionId,
        language: context.language,
        startTime: Date.now(),
        ...data?.metadata
        }
};
    
    try {
      const result = await this.mcp.executeTool('conversations_create-conversation', conversationData);
      
      // Store conversation ID for this session
      this.activeConversations.set(context.sessionId, result.data?.id);
      
      // Cache conversation data
      this.setCache(`conversation:${context.sessionId}`, result.data, 1800); // 30 min cache
      
      this.log('Conversation created', result.data?.id);
      
      return {
        success: true,
        data: {
          conversationId: result.data?.id,
          new: true
        },
        metadata: {
          cached: true
          }
};
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Send a message in the conversation
   */
  private async sendMessage(context: AgentContext, data: Message): Promise<AgentResponse> {
    const conversationId = this.activeConversations.get(context.sessionId) || data?.conversationId;
    
    if (!conversationId) {
      // Auto-create conversation if it doesn't exist
      const createResult = await this.createConversation(context, {
        contactId: context.metadata?.ghlContactId
      });
      
      if (!createResult.success) {
        return createResult;
      }
    }
    
    this.log('Sending message', { 
      conversationId, 
      role: data.role,
      preview: data.content.substring(0, 50) 
    });
    
    const messageData = {
      conversationId: this.activeConversations.get(context.sessionId),
      type: data.role === 'user' ? 'inbound' : 'outbound',
      message: data.content,
      metadata: {
        role: data.role,
        timestamp: data.timestamp || Date.now(),
        sessionId: context.sessionId,
        ...data.metadata
        }
};
    
    try {
      const result = await this.mcp.executeTool('conversations_send-message', messageData);
      
      return {
        success: true,
        data: {
          messageId: result.data?.id,
          conversationId: this.activeConversations.get(context.sessionId)
          }
};
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Search for conversations
   */
  private async searchConversations(context: AgentContext, data: any): Promise<AgentResponse> {
    this.log('Searching conversations', data);
    
    const searchParams = {
      contactId: data?.contactId,
      channel: data?.channel || 'chat',
      status: data?.status,
      limit: data?.limit || 10,
      offset: data?.offset || 0
    };
    
    try {
      const result = await this.mcp.executeTool('conversations_search', searchParams);
      
      return {
        success: true,
        data: result.data,
        metadata: {
          count: result.data?.length || 0
          }
};
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * End a conversation and save summary
   */
  private async endConversation(context: AgentContext, data: any): Promise<AgentResponse> {
    const conversationId = this.activeConversations.get(context.sessionId);
    
    if (!conversationId) {
      return {
        success: false,
        error: 'No active conversation found for this session'
      };
    }
    
    this.log('Ending conversation', conversationId);
    
    // Generate summary if provided
    if (data?.summary) {
      await this.sendMessage(context, {
        role: 'system',
        content: `Conversation Summary: ${data.summary}`,
        metadata: {
          type: 'summary',
          endTime: Date.now()
        }
      });
    }
    
    // Clear from active conversations
    this.activeConversations.delete(context.sessionId);
    
    // Clear cache
    this.cache.delete(`conversation:${context.sessionId}`);
    
    return {
      success: true,
      data: {
        conversationId,
        ended: true,
        summary: data?.summary
        }
};
  }
  
  /**
   * Generate a summary of the conversation
   */
  private async summarizeConversation(context: AgentContext, data: any): Promise<AgentResponse> {
    const messages = data?.messages || [];
    
    if (messages.length === 0) {
      return {
        success: false,
        error: 'No messages to summarize'
      };
    }
    
    this.log('Generating conversation summary', { messageCount: messages.length });
    
    // Create a basic summary
    const summary = this.generateBasicSummary(messages);
    
    // Save summary to contact notes if we have a contact ID
    if (context.metadata?.ghlContactId) {
      await this.updateContactNotes(context.metadata.ghlContactId, summary);
    }
    
    return {
      success: true,
      data: {
        summary,
        messageCount: messages.length,
        duration: this.calculateDuration(messages)
        }
};
  }
  
  /**
   * Helper: Generate basic summary from messages
   */
  private generateBasicSummary(messages: Message[]): string {
    const userMessages = messages.filter(m => m.role === 'user');
    const topics = this.extractTopics(userMessages);
    
    return `Conversation Summary:
- Total messages: ${messages.length}
- User messages: ${userMessages.length}
- Topics discussed: ${topics.join(', ')}
- Duration: ${this.calculateDuration(messages)} minutes`;
  }
  
  /**
   * Helper: Extract topics from messages
   */
  private extractTopics(messages: Message[]): string[] {
    const topics = new Set<string>();
    
    const keywords = {
      'immigration': ['visa', 'green card', 'citizenship', 'deportation', 'asylum'],
      'personal injury': ['accident', 'injury', 'hurt', 'pain', 'crash'],
      'workers comp': ['work injury', 'workplace', 'compensation', 'disability'],
      'criminal': ['arrest', 'charge', 'criminal', 'dui', 'court'],
      'family law': ['divorce', 'custody', 'child support', 'separation']
    };
    
    messages.forEach(msg => {
      const content = msg.content.toLowerCase();
      Object.entries(keywords).forEach(([topic, words]) => {
        if (words.some(word => content.includes(word))) {
          topics.add(topic);
        }
      });
    });
    
    return Array.from(topics);
  }
  
  /**
   * Helper: Calculate conversation duration
   */
  private calculateDuration(messages: Message[]): number {
    if (messages.length < 2) return 0;
    
    const firstTime = messages[0].timestamp || 0;
    const lastTime = messages[messages.length - 1].timestamp || 0;
    
    return Math.round((lastTime - firstTime) / 60000); // Convert to minutes
  }
  
  /**
   * Helper: Update contact notes with summary
   */
  private async updateContactNotes(contactId: string, summary: string): Promise<void> {
    try {
      await this.mcp.executeTool('contacts_update-contact', {
        contactId,
        notes: summary,
        customFields: {
          lastChatSummary: summary,
          lastChatDate: new Date().toISOString()
        }
      });
      
      this.log('Updated contact notes with summary', contactId);
    } catch (error) {
      this.log('Failed to update contact notes', error);
    }
  }
  
  /**
   * Get active conversation ID for a session
   */
  getActiveConversation(sessionId: string): string | undefined {
    return this.activeConversations.get(sessionId);
  }
  
  /**
   * Check if session has active conversation
   */
  hasActiveConversation(sessionId: string): boolean {
    return this.activeConversations.has(sessionId);
  }
}
