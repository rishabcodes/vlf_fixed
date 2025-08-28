import { AgentType } from '@/config/agents/types';
import { logger } from '@/lib/safe-logger';

export interface ConversationState {
  conversationId: string;
  currentAgent: AgentType;
  agentHistory: Array<{
    agent: AgentType;
    startTime: Date;
    endTime?: Date;
    reason?: string;
  }>;
  conversationHistory: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    agent?: AgentType;
  }>;
  contextData: {
    userInfo?: {
      name?: string;
      email?: string;
      phone?: string;
      language?: 'en' | 'es';
    };
    legalIssues?: string[];
    urgencyLevel?: 'low' | 'medium' | 'high' | 'emergency';
    questionsAsked?: number;
    emergencyDetected?: boolean;
    existingClient?: boolean;
    metadata?: Record<string, any>;
  };
  agentConfidence: number;
  lastActivity: Date;
}

export interface AgentSwitchRequest {
  fromAgent: AgentType;
  toAgent: AgentType;
  reason: string;
  confidence?: number;
  userRequested?: boolean;
}

export class ConversationStateManager {
  private static instance: ConversationStateManager;
  private conversations: Map<string, ConversationState> = new Map();
  private confidenceThreshold = 0.6; // 60% confidence threshold

  private constructor() {}

  static getInstance(): ConversationStateManager {
    if (!ConversationStateManager.instance) {
      ConversationStateManager.instance = new ConversationStateManager();
    }
    return ConversationStateManager.instance;
  }

  /**
   * Initialize or get conversation state
   */
  getOrCreateConversation(
    conversationId: string,
    initialAgent: AgentType = AgentType.CLASSIFICATION
  ): ConversationState {
    if (!this.conversations.has(conversationId)) {
      const newState: ConversationState = {
        conversationId,
        currentAgent: initialAgent,
        agentHistory: [
          {
            agent: initialAgent,
            startTime: new Date(),
          },
        ],
        conversationHistory: [],
        contextData: {
          questionsAsked: 0,
        },
        agentConfidence: 1.0,
        lastActivity: new Date(),
      };
      this.conversations.set(conversationId, newState);
      logger.info(`Created new conversation state`, { conversationId, initialAgent });
    }
    return this.conversations.get(conversationId)!;
  }

  /**
   * Add message to conversation history
   */
  addMessage(
    conversationId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
    agent?: AgentType
  ): void {
    const state = this.getOrCreateConversation(conversationId);
    state.conversationHistory.push({
      role,
      content,
      timestamp: new Date(),
      agent: agent || state.currentAgent,
    });
    state.lastActivity = new Date();
  }

  /**
   * Update agent confidence
   */
  updateConfidence(conversationId: string, confidence: number): void {
    const state = this.getOrCreateConversation(conversationId);
    state.agentConfidence = Math.max(0, Math.min(1, confidence));
    
    logger.info(`Agent confidence updated`, {
      conversationId,
      agent: state.currentAgent,
      confidence: state.agentConfidence,
    });

    // Check if we need to suggest agent switch
    if (state.agentConfidence < this.confidenceThreshold) {
      logger.warn(`Low agent confidence detected`, {
        conversationId,
        agent: state.currentAgent,
        confidence: state.agentConfidence,
      });
    }
  }

  /**
   * Request agent switch with context preservation
   */
  async requestAgentSwitch(
    conversationId: string,
    request: AgentSwitchRequest
  ): Promise<boolean> {
    const state = this.getOrCreateConversation(conversationId);
    
    // Log the switch request
    logger.info(`Agent switch requested`, {
      conversationId,
      from: request.fromAgent,
      to: request.toAgent,
      reason: request.reason,
      userRequested: request.userRequested,
    });

    // End current agent session
    const currentAgentSession = state.agentHistory[state.agentHistory.length - 1];
    if (currentAgentSession && !currentAgentSession.endTime) {
      currentAgentSession.endTime = new Date();
      currentAgentSession.reason = request.reason;
    }

    // Start new agent session
    state.agentHistory.push({
      agent: request.toAgent,
      startTime: new Date(),
      reason: request.reason,
    });

    // Update current agent
    state.currentAgent = request.toAgent;
    state.agentConfidence = request.confidence || 1.0;

    // Add system message about the switch
    this.addMessage(
      conversationId,
      'system',
      `Agent switched from ${request.fromAgent} to ${request.toAgent}. Reason: ${request.reason}`,
      request.toAgent
    );

    return true;
  }

  /**
   * Get full conversation context for agent handoff
   */
  getConversationContext(conversationId: string): ConversationState | null {
    return this.conversations.get(conversationId) || null;
  }

  /**
   * Get formatted context for agent consumption
   */
  getFormattedContext(conversationId: string): string {
    const state = this.getOrCreateConversation(conversationId);
    
    let context = `CONVERSATION CONTEXT:\n`;
    context += `Current Agent: ${state.currentAgent}\n`;
    context += `Confidence: ${(state.agentConfidence * 100).toFixed(0)}%\n`;
    
    if (state.contextData.userInfo) {
      context += `\nUSER INFO:\n`;
      if (state.contextData.userInfo.name) context += `Name: ${state.contextData.userInfo.name}\n`;
      if (state.contextData.userInfo.email) context += `Email: ${state.contextData.userInfo.email}\n`;
      if (state.contextData.userInfo.phone) context += `Phone: ${state.contextData.userInfo.phone}\n`;
      if (state.contextData.userInfo.language) context += `Language: ${state.contextData.userInfo.language}\n`;
    }

    if (state.contextData.legalIssues && state.contextData.legalIssues.length > 0) {
      context += `\nLEGAL ISSUES IDENTIFIED:\n`;
      state.contextData.legalIssues.forEach(issue => {
        context += `- ${issue}\n`;
      });
    }

    if (state.contextData.urgencyLevel) {
      context += `\nURGENCY: ${state.contextData.urgencyLevel.toUpperCase()}\n`;
    }

    // Add recent conversation history (last 10 messages)
    const recentMessages = state.conversationHistory.slice(-10);
    if (recentMessages.length > 0) {
      context += `\nRECENT CONVERSATION:\n`;
      recentMessages.forEach(msg => {
        const role = msg.role === 'user' ? 'User' : msg.agent || 'Assistant';
        context += `${role}: ${msg.content}\n`;
      });
    }

    // Add agent history if there were switches
    if (state.agentHistory.length > 1) {
      context += `\nAGENT HISTORY:\n`;
      state.agentHistory.forEach(history => {
        context += `- ${history.agent} (${history.startTime.toISOString()})`;
        if (history.reason) context += ` - ${history.reason}`;
        context += '\n';
      });
    }

    return context;
  }

  /**
   * Update context data
   */
  updateContextData(
    conversationId: string,
    updates: Partial<ConversationState['contextData']>
  ): void {
    const state = this.getOrCreateConversation(conversationId);
    state.contextData = {
      ...state.contextData,
      ...updates,
    };
  }

  /**
   * Check if agent switch is needed based on message content
   */
  checkForAgentSwitchTriggers(
    conversationId: string,
    message: string
  ): AgentSwitchRequest | null {
    const state = this.getOrCreateConversation(conversationId);
    const lowerMessage = message.toLowerCase();

    // Check for explicit switch requests
    const switchPhrases = [
      { phrase: 'talk to someone else', toAgent: AgentType.GENERAL_INTAKE },
      { phrase: 'need immigration help', toAgent: AgentType.CLASSIFICATION },
      { phrase: 'wrong department', toAgent: AgentType.CLASSIFICATION },
      { phrase: 'different lawyer', toAgent: AgentType.CLASSIFICATION },
    ];

    for (const { phrase, toAgent } of switchPhrases) {
      if (lowerMessage.includes(phrase)) {
        return {
          fromAgent: state.currentAgent,
          toAgent,
          reason: `User requested: "${phrase}"`,
          userRequested: true,
        };
      }
    }

    // Check for emergency escalation
    const emergencyKeywords = ['detained', 'arrested', 'ice', 'emergency', 'urgent', 'dying'];
    if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      if (state.currentAgent !== AgentType.EMERGENCY_AFTER_HOURS) {
        return {
          fromAgent: state.currentAgent,
          toAgent: AgentType.EMERGENCY_AFTER_HOURS,
          reason: 'Emergency situation detected',
          confidence: 1.0,
        };
      }
    }

    // Check for topic changes that warrant switching
    const topicSwitches: Array<{ keywords: string[]; agent: AgentType }> = [
      { keywords: ['divorce', 'custody', 'child support'], agent: AgentType.FAMILY_LAW },
      { keywords: ['visa', 'green card', 'immigration'], agent: AgentType.AFFIRMATIVE_IMMIGRATION },
      { keywords: ['deportation', 'removal', 'ice hold'], agent: AgentType.REMOVAL_DEFENSE },
      { keywords: ['car accident', 'injury', 'hurt'], agent: AgentType.PERSONAL_INJURY },
      { keywords: ['dui', 'arrest', 'criminal'], agent: AgentType.CRIMINAL_DEFENSE },
      { keywords: ['work injury', 'workers comp'], agent: AgentType.WORKERS_COMP },
    ];

    // Only suggest switch if we're not already with the right specialist
    for (const { keywords, agent } of topicSwitches) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        if (state.currentAgent !== agent && 
            state.currentAgent !== AgentType.CLASSIFICATION &&
            state.currentAgent !== AgentType.GENERAL_LEGAL) {
          return {
            fromAgent: state.currentAgent,
            toAgent: agent,
            reason: `Topic change detected: ${keywords.find(k => lowerMessage.includes(k))}`,
            confidence: 0.8,
          };
        }
      }
    }

    return null;
  }

  /**
   * Clean up old conversations (older than 24 hours)
   */
  cleanupOldConversations(): void {
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    
    for (const [id, state] of this.conversations.entries()) {
      if (state.lastActivity < cutoffTime) {
        this.conversations.delete(id);
        logger.info(`Cleaned up old conversation`, { conversationId: id });
      }
    }
  }
}