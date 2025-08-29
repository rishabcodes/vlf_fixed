/**
 * Enhanced Conversation Manager
 * Integrates with the new agent system for complete GHL MCP functionality
 */

import { AgentOrchestrator } from '../agents/agent-orchestrator';
import { componentLogger as logger } from '@/lib/safe-logger';
import { AgentContext } from '../agents/base-agent';

interface Session {
  sessionId: string;
  language: 'en' | 'es';
  disclaimerShown: boolean;
  contactCollected: boolean;
  contactInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  ghlContactId?: string;
  ghlConversationId?: string;
  messages: Message[];
  metadata: {
    startTime: number;
    lastActivity: number;
    [key: string]: any;
  };
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export class EnhancedConversationManager {
  private sessions: Map<string, Session> = new Map();
  private orchestrator: AgentOrchestrator;
  
  constructor() {
    this.orchestrator = AgentOrchestrator.getInstance();
  }
  
  /**
   * Get or create a session
   */
  getOrCreateSession(sessionId: string, language: 'en' | 'es' = 'en'): Session {
    if (!this.sessions.has(sessionId)) {
      const newSession: Session = {
        sessionId,
        language,
        disclaimerShown: false,
        contactCollected: false,
        messages: [],
        metadata: {
          startTime: Date.now(),
          lastActivity: Date.now()
          }
};
      this.sessions.set(sessionId, newSession);
    }
    
    const session = this.sessions.get(sessionId)!;
    session.metadata.lastActivity = Date.now();
    return session;
  }
  
  /**
   * Get existing session
   */
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }
  
  /**
   * Check if disclaimer needs to be shown
   */
  needsDisclaimer(sessionId: string): boolean {
    const session = this.getSession(sessionId);
    return session ? !session.disclaimerShown : true;
  }
  
  /**
   * Mark disclaimer as shown
   */
  markDisclaimerShown(sessionId: string): void {
    const session = this.getSession(sessionId);
    if (session) {
      session.disclaimerShown = true;
    }
  }
  
  /**
   * Check if contact info is needed
   */
  needsContactInfo(sessionId: string): boolean {
    const session = this.getSession(sessionId);
    return session ? !session.contactCollected : true;
  }
  
  /**
   * Save contact info and create GHL contact
   */
  async saveContactInfo(sessionId: string, contactInfo: any): Promise<boolean> {
    const session = this.getSession(sessionId);
    if (!session) return false;
    
    try {
      // Update session
      session.contactInfo = {
        ...session.contactInfo,
        ...contactInfo
      };
      
      // Create agent context
      const context: AgentContext = {
        sessionId,
        language: session.language,
        contactInfo: session.contactInfo,
        metadata: session.metadata
      };
      
      // Process as new lead through orchestrator
      const results = await this.orchestrator.processNewLead(context, contactInfo);
      
      // Check if contact was created successfully
      const contactResult = results.find(r => r.agent === 'contact');
      if (contactResult?.response.success) {
        session.ghlContactId = contactResult.response.data?.id;
        session.contactCollected = true;
        
        // Get conversation ID if created
        const convResult = results.find(r => r.agent === 'conversation');
        if (convResult?.response.success) {
          session.ghlConversationId = convResult.response.data?.conversationId;
        }
        
        logger.info('Contact created successfully:', session.ghlContactId);
        return true;
      }
      
      return false;
    } catch (error) {
      logger.error('Failed to save contact info:', error);
      return false;
    }
  }
  
  /**
   * Add message to conversation
   */
  async addMessage(sessionId: string, role: 'user' | 'assistant' | 'system', content: string): Promise<void> {
    const session = this.getSession(sessionId);
    if (!session) return;
    
    const message: Message = {
      role,
      content,
      timestamp: Date.now()
    };
    
    session.messages.push(message);
    
    // Send to GHL if we have a conversation
    if (session.ghlConversationId) {
      const context: AgentContext = {
        sessionId,
        language: session.language,
        contactInfo: session.contactInfo,
        metadata: {
          ...session.metadata,
          ghlContactId: session.ghlContactId,
          ghlConversationId: session.ghlConversationId
          }
};
      
      await this.orchestrator.processMessage(context, content, role === 'system' ? 'assistant' : role);
    }
  }
  
  /**
   * Parse contact info from natural language
   */
  parseContactInfo(message: string, language: 'en' | 'es'): any {
    const contactInfo: any = {};
    
    // Email patterns
    const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      contactInfo.email = emailMatch[0].toLowerCase();
    }
    
    // Phone patterns
    const phoneMatch = message.match(/[\d\s()+-]{10,}/);
    if (phoneMatch) {
      contactInfo.phone = phoneMatch[0].replace(/\D/g, '');
    }
    
    // Name patterns - stop at common delimiters
    const namePatterns = language === 'es' 
      ? [
          /mi nombre es ([\w\s]+?)(?:\s*(?:y|,|\.|mi\s+correo|mi\s+email)|$)/i,
          /me llamo ([\w\s]+?)(?:\s*(?:y|,|\.|mi\s+correo|mi\s+email)|$)/i,
          /soy ([\w\s]+?)(?:\s*(?:y|,|\.|mi\s+correo|mi\s+email)|$)/i
        ]
      : [
          /my name is ([\w\s]+?)(?:\s*(?:and|,|\.|my\s+email|email)|$)/i,
          /i am ([\w\s]+?)(?:\s*(?:and|,|\.|my\s+email|email)|$)/i,
          /i'm ([\w\s]+?)(?:\s*(?:and|,|\.|my\s+email|email)|$)/i,
          /this is ([\w\s]+?)(?:\s*(?:and|,|\.|my\s+email|email)|$)/i
        ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        const fullName = match[1].trim();
        const parts = fullName.split(/\s+/);
        
        if (parts.length >= 1) {
          contactInfo.firstName = parts[0];
        }
        if (parts.length >= 2) {
          contactInfo.lastName = parts.slice(1).join(' ');
        }
        break;
      }
    }
    
    return contactInfo;
  }
  
  /**
   * Process appointment request
   */
  async processAppointmentRequest(sessionId: string, appointmentData: any): Promise<any> {
    const session = this.getSession(sessionId);
    if (!session) return null;
    
    const context: AgentContext = {
      sessionId,
      language: session.language,
      contactInfo: session.contactInfo,
      metadata: {
        ...session.metadata,
        ghlContactId: session.ghlContactId
        }
};
    
    const results = await this.orchestrator.processAppointmentRequest(context, appointmentData);
    
    // Return the appointment result
    const appointmentResult = results.find(r => r.agent === 'appointment' && r.response.data?.appointmentId);
    return appointmentResult?.response.data;
  }
  
  /**
   * Generate conversation summary
   */
  async generateSummary(sessionId: string): Promise<string | null> {
    const session = this.getSession(sessionId);
    if (!session) return null;
    
    const context: AgentContext = {
      sessionId,
      language: session.language,
      contactInfo: session.contactInfo,
      metadata: {
        ...session.metadata,
        ghlContactId: session.ghlContactId,
        messages: session.messages
        }
};
    
    // End conversation with orchestrator
    const results = await this.orchestrator.endConversation(context);
    
    // Get summary from results
    const summaryResult = results.find(r => r.response.data?.summary);
    const summary = summaryResult?.response.data?.summary || this.generateBasicSummary(session);
    
    // Clear session
    this.sessions.delete(sessionId);
    
    return summary;
  }
  
  /**
   * Generate basic summary without AI
   */
  private generateBasicSummary(session: Session): string {
    const duration = Math.round((Date.now() - session.metadata.startTime) / 60000);
    const userMessages = session.messages.filter(m => m.role === 'user').length;
    
    return `Chat Summary:
- Session ID: ${session.sessionId}
- Language: ${session.language}
- Duration: ${duration} minutes
- Messages: ${session.messages.length} (${userMessages} from user)
- Contact: ${session.contactInfo?.firstName} ${session.contactInfo?.lastName || ''}
- Email: ${session.contactInfo?.email || 'Not provided'}
- Phone: ${session.contactInfo?.phone || 'Not provided'}`;
  }
  
  /**
   * Clean up old sessions
   */
  cleanupSessions(maxAge: number = 3600000): void {
    const now = Date.now();
    const sessionsToDelete: string[] = [];
    
    this.sessions.forEach((session, sessionId) => {
      if (now - session.metadata.lastActivity > maxAge) {
        sessionsToDelete.push(sessionId);
      }
    });
    
    sessionsToDelete.forEach(sessionId => {
      this.generateSummary(sessionId); // Generate summary before deletion
    });
  }
  
  /**
   * Get all active sessions
   */
  getActiveSessions(): string[] {
    return Array.from(this.sessions.keys());
  }
  
  /**
   * Get session statistics
   */
  getStatistics(): any {
    const stats = {
      totalSessions: this.sessions.size,
      withContact: 0,
      withGHLContact: 0,
      averageMessages: 0,
      languages: { en: 0, es: 0   }
};
    
    let totalMessages = 0;
    
    this.sessions.forEach(session => {
      if (session.contactCollected) stats.withContact++;
      if (session.ghlContactId) stats.withGHLContact++;
      totalMessages += session.messages.length;
      stats.languages[session.language]++;
    });
    
    if (stats.totalSessions > 0) {
      stats.averageMessages = Math.round(totalMessages / stats.totalSessions);
    }
    
    return stats;
  }
}

// Export singleton instance
export const enhancedConversationManager = new EnhancedConversationManager();