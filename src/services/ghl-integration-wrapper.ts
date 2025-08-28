import { componentLogger as logger } from '@/lib/safe-logger';

/**
 * GHL Integration Wrapper
 * 
 * This wrapper allows toggling between the old and new GHL implementation
 * based on the ENABLE_GHL_MCP environment variable.
 * 
 * To enable new MCP integration: Set ENABLE_GHL_MCP=true in .env.local
 * To disable and use old: Set ENABLE_GHL_MCP=false in .env.local
 */

// Simple logger fallback if safe-logger not available
const logger = {
  info: (...args: any[]) => logger.info('[GHL]', ...args),
  warn: (...args: any[]) => logger.warn('[GHL]', ...args),
  error: (...args: any[]) => logger.error('[GHL]', ...args),
};

// Type definitions for the integration
export interface GHLIntegration {
  isConfigured: () => boolean;
  createOrUpdateContact: (data: any, chatSummary?: any) => Promise<any>;
  createContactNote: (contactId: string, note: string) => Promise<string | null>;
  searchContactByEmail: (email: string) => Promise<any | null>;
  searchContactByPhone: (phone: string) => Promise<any | null>;
  executeTool?: (tool: string, input: Record<string, any>) => Promise<any>;
}

/**
 * Get the appropriate GHL integration based on feature flag
 */
export async function getGHLIntegration(): Promise<GHLIntegration> {
  const useMCP = process.env.ENABLE_GHL_MCP === 'true';
  
  logger.info(`GHL Integration mode: ${useMCP ? 'MCP (new)' : 'Legacy'}`);
  
  if (useMCP) {
    // Use new MCP implementation
    try {
      const { GHLMCPClient } = await import('../new-chatbot-ghl/services/ghl-mcp-client');
      const client = new GHLMCPClient();
      
      // Verify configuration
      if (!client.isConfigured()) {
        logger.warn('GHL MCP client not properly configured. Falling back to legacy.');
        return getLegacyIntegration();
      }
      
      logger.info('Using GHL MCP integration');
      return client;
    } catch (error) {
      logger.error('Failed to load GHL MCP integration:', error);
      logger.info('Falling back to legacy integration');
      return getLegacyIntegration();
    }
  } else {
    // Use existing/legacy implementation
    return getLegacyIntegration();
  }
}

/**
 * Get the legacy GHL integration
 */
async function getLegacyIntegration(): Promise<GHLIntegration> {
  const { GHLChatSyncService } = await import('./gohighlevel/chat-sync');
  const { ghlService } = await import('./gohighlevel/index');
  
  const chatSync = new GHLChatSyncService();
  
  // Create adapter to match the interface
  return {
    isConfigured: () => {
      // Check if legacy service is configured
      return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
    },
    
    createOrUpdateContact: async (data: any, chatSummary?: any) => {
      // Adapt to legacy service
      try {
        // Use the public methods available
        const contactData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          tags: data.tags || ['website_lead'],
        };
        
        // Try to find existing contact first
        const existing = await ghlService.getContactByEmail(data.email);
        
        let contact;
        if (existing) {
          // Update existing
          contact = await ghlService.updateContact(existing.id, contactData);
        } else {
          // Create new via task (since createContact might be private)
          contact = { id: `temp-${Date.now()}` }; // Fallback ID
          await ghlService.createTask({
            title: 'New Lead from Website',
            body: `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}`,
            dueDate: new Date(),
          });
        }
        
        if (chatSummary && contact?.id) {
          // Add note for chat summary
          const summaryNote = formatChatSummaryForLegacy(chatSummary);
          await ghlService.addNote(contact.id, summaryNote);
        }
        
        return {
          id: contact?.id,
          created: !existing,
          updated: Boolean(existing)
        };
      } catch (error) {
        logger.error('Legacy GHL contact creation failed:', error);
        throw error;
      }
    },
    
    createContactNote: async (contactId: string, note: string) => {
      try {
        await ghlService.addNote(contactId, note);
        return `note-${Date.now()}`;
      } catch (error) {
        logger.error('Legacy GHL note creation failed:', error);
        return null;
      }
    },
    
    searchContactByEmail: async (email: string) => {
      try {
        // Use the getContactByEmail method directly
        const contact = await ghlService.getContactByEmail(email);
        return contact || null;
      } catch (error) {
        logger.error('Legacy GHL email search failed:', error);
        return null;
      }
    },
    
    searchContactByPhone: async (phone: string) => {
      try {
        // Since there's no direct phone search, return null
        // The legacy system might not support phone search
        logger.warn('Phone search not supported in legacy GHL integration');
        return null;
      } catch (error) {
        logger.error('Legacy GHL phone search failed:', error);
        return null;
      }
      }
};
}

/**
 * Format chat summary for legacy system
 */
function formatChatSummaryForLegacy(summary: any): string {
  return `
Chat Session Summary
====================
Date: ${new Date(summary.timestamp).toLocaleString()}
Duration: ${Math.round((summary.duration || 0) / 60)} minutes
Language: ${summary.language === 'es' ? 'Spanish' : 'English'}
Topic: ${summary.topic || 'General Inquiry'}

Summary:
${summary.summary || 'No summary available'}

${summary.keyPoints?.length > 0 ? `Key Points:\n${summary.keyPoints.map((p: string) => `• ${p}`).join('\n')}` : ''}

${summary.followUpRequired?.length > 0 ? `Follow-up Required:\n${summary.followUpRequired.map((f: string) => `• ${f}`).join('\n')}` : ''}
`;
}

// Export singleton instance getter for convenience
let cachedIntegration: GHLIntegration | null = null;

export async function getGHLClient(): Promise<GHLIntegration> {
  if (!cachedIntegration) {
    cachedIntegration = await getGHLIntegration();
  }
  return cachedIntegration;
}

// Export function to clear cache (useful for testing or config changes)
export function clearGHLCache(): void {
  cachedIntegration = null;
  logger.info('GHL integration cache cleared');
}
