/**
 * Chat Persistence Utilities
 * Handles saving and restoring chat sessions to prevent data loss
 */

import { componentLogger as logger } from '@/lib/safe-logger';

export interface PersistedChatSession {
  sessionId: string;
  messages: Array<{
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    type?: string;
    metadata?: any;
  }>;
  contactInfo: {
    name?: string;
    phone?: string;
    email?: string;
  };
  ghlContactId?: string;
  ghlNoteId?: string;  // Track the note ID for updating same session
  conversationStartTime: Date;
  lastActivityTime: Date;
  status: 'active' | 'idle' | 'abandoned' | 'completed';
  language: 'en' | 'es';
}

const STORAGE_KEY_PREFIX = 'vlf_chat_session_';
const SESSION_EXPIRY_HOURS = 24;
const INACTIVITY_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes
const IDLE_THRESHOLD_MS = 3 * 60 * 1000; // 3 minutes

export class ChatPersistence {
  /**
   * Save chat session to localStorage
   */
  static saveSession(session: PersistedChatSession): void {
    try {
      const key = `${STORAGE_KEY_PREFIX}${session.sessionId}`;
      const data = {
        ...session,
        // Convert dates to ISO strings for storage
        messages: session.messages.map(m => ({
          ...m,
          timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp
        })),
        conversationStartTime: session.conversationStartTime instanceof Date 
          ? session.conversationStartTime.toISOString() 
          : session.conversationStartTime,
        lastActivityTime: new Date().toISOString()
      };
      
      localStorage.setItem(key, JSON.stringify(data));
      
      // Clean up old sessions
      this.cleanupOldSessions();
    } catch (error) {
      logger.error('Failed to save chat session:', error);
    }
  }
  
  /**
   * Restore chat session from localStorage
   */
  static restoreSession(sessionId: string): PersistedChatSession | null {
    try {
      const key = `${STORAGE_KEY_PREFIX}${sessionId}`;
      const data = localStorage.getItem(key);
      
      if (!data) return null;
      
      const session = JSON.parse(data);
      
      // Check if session is expired
      const lastActivity = new Date(session.lastActivityTime);
      const hoursSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceActivity > SESSION_EXPIRY_HOURS) {
        localStorage.removeItem(key);
        return null;
      }
      
      // Convert ISO strings back to dates
      return {
        ...session,
        messages: session.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })),
        conversationStartTime: new Date(session.conversationStartTime),
        lastActivityTime: new Date(session.lastActivityTime)
      };
    } catch (error) {
      logger.error('Failed to restore chat session:', error);
      return null;
    }
  }
  
  /**
   * Get or create session ID
   */
  static getOrCreateSessionId(): string {
    // Check for existing active session
    const existingSession = this.getActiveSession();
    if (existingSession) {
      return existingSession.sessionId;
    }
    
    // Create new session ID
    return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Get the most recent active session
   */
  static getActiveSession(): PersistedChatSession | null {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_KEY_PREFIX));
      let mostRecent: PersistedChatSession | null = null;
      let mostRecentTime = 0;
      
      for (const key of keys) {
        const data = localStorage.getItem(key);
        if (!data) continue;
        
        const session = JSON.parse(data);
        const lastActivity = new Date(session.lastActivityTime).getTime();
        
        // Check if session is not expired and not completed
        const hoursSinceActivity = (Date.now() - lastActivity) / (1000 * 60 * 60);
        
        if (hoursSinceActivity < SESSION_EXPIRY_HOURS && 
            session.status !== 'completed' &&
            lastActivity > mostRecentTime) {
          mostRecentTime = lastActivity;
          mostRecent = {
            ...session,
            messages: session.messages.map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp)
            })),
            conversationStartTime: new Date(session.conversationStartTime),
            lastActivityTime: new Date(session.lastActivityTime)
          };
        }
      }
      
      return mostRecent;
    } catch (error) {
      logger.error('Failed to get active session:', error);
      return null;
    }
  }
  
  /**
   * Mark session as completed
   */
  static markSessionCompleted(sessionId: string): void {
    try {
      const session = this.restoreSession(sessionId);
      if (session) {
        session.status = 'completed';
        this.saveSession(session);
      }
    } catch (error) {
      logger.error('Failed to mark session completed:', error);
    }
  }
  
  /**
   * Check if session is inactive
   */
  static isSessionInactive(lastActivityTime: Date): boolean {
    return Date.now() - lastActivityTime.getTime() > INACTIVITY_THRESHOLD_MS;
  }
  
  /**
   * Check if session is idle
   */
  static isSessionIdle(lastActivityTime: Date): boolean {
    return Date.now() - lastActivityTime.getTime() > IDLE_THRESHOLD_MS;
  }
  
  /**
   * Clean up old sessions
   */
  static cleanupOldSessions(): void {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_KEY_PREFIX));
      
      for (const key of keys) {
        const data = localStorage.getItem(key);
        if (!data) continue;
        
        const session = JSON.parse(data);
        const lastActivity = new Date(session.lastActivityTime);
        const hoursSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60);
        
        // Remove sessions older than 24 hours
        if (hoursSinceActivity > SESSION_EXPIRY_HOURS) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      logger.error('Failed to cleanup old sessions:', error);
    }
  }
  
  /**
   * Clear all chat sessions
   */
  static clearAllSessions(): void {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_KEY_PREFIX));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      logger.error('Failed to clear sessions:', error);
    }
  }
  
  /**
   * Get session statistics for debugging
   */
  static getSessionStats(): { total: number; active: number; completed: number; abandoned: number } {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_KEY_PREFIX));
      let active = 0, completed = 0, abandoned = 0;
      
      for (const key of keys) {
        const data = localStorage.getItem(key);
        if (!data) continue;
        
        const session = JSON.parse(data);
        if (session.status === 'active' || session.status === 'idle') active++;
        else if (session.status === 'completed') completed++;
        else if (session.status === 'abandoned') abandoned++;
      }
      
      return { total: keys.length, active, completed, abandoned };
    } catch (error) {
      logger.error('Failed to get session stats:', error);
      return { total: 0, active: 0, completed: 0, abandoned: 0 };
    }
  }
}