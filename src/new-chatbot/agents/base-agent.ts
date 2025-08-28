/**
 * Base Agent Class
 * Foundation for all specialized agents in the new chatbot system
 */

import { ghlMCPClient } from '../ghl-agents/ghl-mcp-client';
import { componentLogger as logger } from '@/lib/safe-logger';

export interface AgentConfig {
  name: string;
  description: string;
  capabilities: string[];
  priority?: number;
}

export interface AgentContext {
  sessionId: string;
  userId?: string;
  language: 'en' | 'es';
  contactInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  metadata?: Record<string, any>;
}

export interface AgentResponse {
  success: boolean;
  data?: any;
  error?: string;
  nextAction?: string;
  metadata?: Record<string, any>;
}

export abstract class BaseAgent {
  protected config: AgentConfig;
  protected mcp: typeof ghlMCPClient;
  protected cache: Map<string, { data: any; expiry: number }> = new Map();
  
  constructor(config: AgentConfig) {
    this.config = config;
    this.mcp = ghlMCPClient;
  }
  
  /**
   * Get agent name
   */
  getName(): string {
    return this.config.name;
  }
  
  /**
   * Get agent capabilities
   */
  getCapabilities(): string[] {
    return this.config.capabilities;
  }
  
  /**
   * Check if agent can handle a specific task
   */
  canHandle(task: string): boolean {
    return this.config.capabilities.some(cap => 
      task.toLowerCase().includes(cap.toLowerCase())
    );
  }
  
  /**
   * Abstract method - must be implemented by each agent
   */
  abstract execute(context: AgentContext, input: any): Promise<AgentResponse>;
  
  /**
   * Cache helper - store data with TTL
   */
  protected setCache(key: string, data: any, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + (ttlSeconds * 1000)
    });
  }
  
  /**
   * Cache helper - retrieve cached data
   */
  protected getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }
  
  /**
   * Log agent activity
   */
  protected log(message: string, data?: any): void {
    logger.info(`[${this.config.name}] ${message}`, data || '');
  }
  
  /**
   * Handle errors consistently
   */
  protected handleError(error: any): AgentResponse {
    logger.error(`[${this.config.name}] Error:`, error);
    return {
      success: false,
      error: error.message || 'An error occurred',
      metadata: {
        agent: this.config.name,
        timestamp: Date.now()
        }
};
  }
  
  /**
   * Validate required fields in context
   */
  protected validateContext(context: AgentContext, required: string[]): string | null {
    for (const field of required) {
      if (field === 'email' && !context.contactInfo?.email) {
        return 'Email is required';
      }
      if (field === 'phone' && !context.contactInfo?.phone) {
        return 'Phone is required';
      }
      if (field === 'name' && (!context.contactInfo?.firstName && !context.contactInfo?.lastName)) {
        return 'Name is required';
      }
    }
    return null;
  }
}
