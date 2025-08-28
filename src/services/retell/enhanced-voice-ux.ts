/**
 * Enhanced Voice UX System for Retell Integration
 * Provides improved user experience features for voice interactions
 */

import { logger } from '@/lib/safe-logger';
import { getRetellService, RetellAgent } from './index';
import { prisma } from '@/lib/prisma-safe';
import { voiceAgentStubs, voiceCallMetricsStubs } from '@/lib/prisma-model-stubs';
import { aiClientIntakeSystem } from '@/lib/crewai/ai-powered-client-intake';
import { createNotification } from '@/lib/notifications';
import { sendEmail } from '@/lib/email';

export interface VoiceUXConfig {
  // Conversation Flow
  enableSmartRouting: boolean;
  enableContextAwareness: boolean;
  enableEmotionDetection: boolean;
  enableMultiLanguage: boolean;

  // User Experience
  naturalConversationMode: boolean;
  adaptiveSpeechRate: boolean;
  intelligentPausing: boolean;
  clarificationPrompts: boolean;

  // Accessibility
  enhancedAccessibility: boolean;
  visualImpairmentSupport: boolean;
  hearingImpairmentSupport: boolean;

  // Performance
  reducedLatency: boolean;
  streamingResponses: boolean;
  predictiveResponses: boolean;
}

export interface ConversationContext {
  userId?: string;
  sessionId: string;
  language: 'en' | 'es';
  emotionalState?: 'calm' | 'anxious' | 'frustrated' | 'urgent' | 'confused';
  conversationHistory: Array<{
    timestamp: Date;
    speaker: 'agent' | 'user';
    message: string;
    intent?: string;
    entities?: Record<string, any>;
  }>;
  userPreferences?: {
    speechRate?: number;
    volumeLevel?: number;
    accentPreference?: string;
    clarificationStyle?: 'verbose' | 'concise';
  };
  legalContext?: {
    practiceArea?: string;
    urgency?: string;
    previousInteractions?: number;
    caseId?: string;
  };
}

export interface VoiceInteractionMetrics {
  sessionId: string;
  interactionQuality: number; // 0-100
  userSatisfaction?: number; // 0-100
  clarityScore: number; // 0-100
  completionRate: number; // 0-100
  averageResponseTime: number; // milliseconds
  interruptionCount: number;
  clarificationCount: number;
  emotionalTransitions: Array<{
    from: string;
    to: string;
    timestamp: Date;
    trigger?: string;
  }>;
}

export class EnhancedVoiceUXSystem {
  private retellService = getRetellService();
  private conversationContexts = new Map<string, ConversationContext>();
  private voiceAgentConfigs = new Map<string, VoiceUXConfig>();

  /**
   * Create an enhanced voice agent with improved UX features
   */
  async createEnhancedVoiceAgent(params: {
    name: string;
    practiceArea: string;
    language: 'en' | 'es';
    personality?: 'professional' | 'friendly' | 'empathetic';
    uxConfig?: Partial<VoiceUXConfig>;
  }): Promise<RetellAgent> {
    logger.info('Creating enhanced voice agent', { params });

    const defaultUXConfig: VoiceUXConfig = {
      enableSmartRouting: true,
      enableContextAwareness: true,
      enableEmotionDetection: true,
      enableMultiLanguage: true,
      naturalConversationMode: true,
      adaptiveSpeechRate: true,
      intelligentPausing: true,
      clarificationPrompts: true,
      enhancedAccessibility: true,
      visualImpairmentSupport: true,
      hearingImpairmentSupport: true,
      reducedLatency: true,
      streamingResponses: true,
      predictiveResponses: true,
    };

    const uxConfig = { ...defaultUXConfig, ...params.uxConfig };

    // Generate enhanced system prompt with UX considerations
    const systemPrompt = this.generateEnhancedSystemPrompt({
      practiceArea: params.practiceArea,
      language: params.language,
      personality: params.personality || 'professional',
      uxConfig,
    });

    // Select optimal voice based on language and personality
    const voiceId = await this.selectOptimalVoice({
      language: params.language,
      personality: params.personality || 'professional',
    });

    // Create Retell agent with enhanced configuration
    const agent = await this.retellService.createAgent({
      agent_name: params.name,
      voice_id: voiceId,
      language: params.language === 'es' ? 'spanish' : 'english',
      response_engine: {
        type: 'llm',
        llm_id: process.env.RETELL_LLM_ID || 'default',
        system_prompt: systemPrompt,
      },
      webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/retell/webhook`,

      // Enhanced UX settings
      interruption_sensitivity: uxConfig.naturalConversationMode ? 0.7 : 0.5,
      ambient_sound: false,
      responsiveness: uxConfig.reducedLatency ? 0.9 : 0.7,
      voice_temperature: 0.7, // Balanced for natural speech
      voice_speed: 1.0, // Will be adjusted dynamically
      enable_backchannel: uxConfig.naturalConversationMode,
      reminder_trigger_ms: 10000, // 10 seconds of silence
      reminder_max_count: 2,
    });

    // Store UX configuration
    this.voiceAgentConfigs.set(agent.agent_id, uxConfig);

    // Store agent configuration in database
    await voiceAgentStubs.create({
      data: {
        agentId: agent.agent_id,
        name: params.name,
        practiceArea: params.practiceArea,
        language: params.language,
        personality: params.personality || 'professional',
        uxConfig: JSON.stringify(uxConfig),
        isActive: true,
      },
    });

    logger.info('Enhanced voice agent created', {
      agentId: agent.agent_id,
      name: params.name,
    });

    return agent;
  }

  /**
   * Initialize conversation with enhanced context
   */
  async initializeConversation(params: {
    agentId: string;
    userId?: string;
    language?: 'en' | 'es';
    metadata?: Record<string, any>;
  }): Promise<{
    sessionId: string;
    webCallLink?: string;
    phoneNumber?: string;
  }> {
    logger.info('Initializing enhanced conversation', { params });

    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create conversation context
    const context: ConversationContext = {
      userId: params.userId,
      sessionId,
      language: params.language || 'en',
      conversationHistory: [],
      userPreferences: {},
      legalContext: {},
    };

    // Load user preferences if userId provided
    if (params.userId) {
      const userPrefs = await this.loadUserPreferences(params.userId);
      if (userPrefs) {
        context.userPreferences = userPrefs;
      }
    }

    this.conversationContexts.set(sessionId, context);

    // Get agent configuration
    const agentConfig = this.voiceAgentConfigs.get(params.agentId);

    // Create web call with enhanced metadata
    const webCall = await this.retellService.createWebCall({
      agent_id: params.agentId,
      metadata: {
        ...params.metadata,
        sessionId,
        userId: params.userId,
        language: params.language,
        enhancedUX: true,
        features: agentConfig,
      },
    });

    return {
      sessionId,
      webCallLink: webCall.web_call_link,
    };
  }

  /**
   * Handle real-time conversation updates with enhanced UX
   */
  async handleConversationUpdate(params: {
    sessionId: string;
    callId: string;
    transcript: Array<{
      role: 'agent' | 'user';
      content: string;
      timestamp: number;
    }>;
    currentSpeaker?: 'agent' | 'user';
  }): Promise<void> {
    const context = this.conversationContexts.get(params.sessionId);
    if (!context) return;

    // Update conversation history
    for (const turn of params.transcript) {
      if (
        !context.conversationHistory.find(
          h => h.timestamp.getTime() === turn.timestamp && h.message === turn.content
        )
      ) {
        context.conversationHistory.push({
          timestamp: new Date(turn.timestamp),
          speaker: turn.role,
          message: turn.content,
        });
      }
    }

    // Analyze conversation for UX improvements
    const analysis = await this.analyzeConversation(context);

    // Apply adaptive UX based on analysis
    if (analysis.suggestedAdjustments) {
      await this.applyUXAdjustments(params.callId, analysis.suggestedAdjustments);
    }

    // Detect if smart routing is needed
    if (analysis.routingNeeded && analysis.routingTarget) {
      await this.handleSmartRouting(params.sessionId, analysis.routingTarget);
    }

    // Update emotional state tracking
    if (analysis.detectedEmotion && analysis.detectedEmotion !== context.emotionalState) {
      context.emotionalState = analysis.detectedEmotion;
      logger.info('Emotional state change detected', {
        sessionId: params.sessionId,
        from: context.emotionalState,
        to: analysis.detectedEmotion,
      });
    }
  }

  /**
   * Analyze conversation for UX improvements
   */
  private async analyzeConversation(context: ConversationContext): Promise<{
    detectedEmotion?: 'calm' | 'anxious' | 'frustrated' | 'urgent' | 'confused';
    suggestedAdjustments?: {
      speechRate?: number;
      clarificationStyle?: 'verbose' | 'concise';
      pauseDuration?: number;
    };
    routingNeeded?: boolean;
    routingTarget?: string;
    comprehensionScore: number;
  }> {
    const recentMessages = context.conversationHistory.slice(-5);

    // Emotion detection based on conversation patterns
    const emotionIndicators = {
      frustrated: ["don't understand", 'this is confusing', 'frustrated', 'annoying'],
      anxious: ['worried', 'urgent', 'emergency', 'nervous', 'scared'],
      confused: ['what', 'how', 'explain', "don't get it", 'unclear'],
      urgent: ['immediately', 'asap', 'emergency', 'right now', 'urgent'],
    };

    let detectedEmotion: typeof context.emotionalState = 'calm';
    for (const [emotion, indicators] of Object.entries(emotionIndicators)) {
      const hasIndicator = recentMessages.some(
        msg =>
          msg.speaker === 'user' && indicators.some(ind => msg.message.toLowerCase().includes(ind))
      );
      if (hasIndicator) {
        detectedEmotion = emotion as typeof context.emotionalState;
        break;
      }
    }

    // Calculate comprehension score
    const clarificationRequests = recentMessages.filter(
      msg =>
        msg.speaker === 'user' &&
        (msg.message.includes('?') ||
          msg.message.toLowerCase().includes('what') ||
          msg.message.toLowerCase().includes('repeat'))
    ).length;

    const comprehensionScore = Math.max(0, 100 - clarificationRequests * 20);

    // Suggest UX adjustments based on analysis
    const suggestedAdjustments: any = {};

    if (detectedEmotion === 'confused' || comprehensionScore < 60) {
      suggestedAdjustments.speechRate = 0.9; // Slower
      suggestedAdjustments.clarificationStyle = 'verbose';
      suggestedAdjustments.pauseDuration = 1.5; // Longer pauses
    } else if (detectedEmotion === 'urgent') {
      suggestedAdjustments.speechRate = 1.1; // Slightly faster
      suggestedAdjustments.clarificationStyle = 'concise';
      suggestedAdjustments.pauseDuration = 0.5; // Shorter pauses
    }

    // Check if routing is needed based on conversation content
    const routingKeywords = {
      immigration: ['visa', 'green card', 'citizenship', 'deportation'],
      personal_injury: ['accident', 'injury', 'hurt', 'medical bills'],
      criminal_defense: ['arrested', 'criminal', 'police', 'charges'],
      family_law: ['divorce', 'custody', 'child support', 'separation'],
      workers_compensation: ['work injury', 'workers comp', 'workplace accident'],
    };

    let routingTarget: string | undefined;
    for (const [area, keywords] of Object.entries(routingKeywords)) {
      const hasKeyword = recentMessages.some(msg =>
        keywords.some(kw => msg.message.toLowerCase().includes(kw))
      );
      if (hasKeyword) {
        routingTarget = area;
        break;
      }
    }

    return {
      detectedEmotion,
      suggestedAdjustments:
        Object.keys(suggestedAdjustments).length > 0 ? suggestedAdjustments : undefined,
      routingNeeded: !!routingTarget && routingTarget !== context.legalContext?.practiceArea,
      routingTarget,
      comprehensionScore,
    };
  }

  /**
   * Apply UX adjustments to ongoing call
   */
  private async applyUXAdjustments(
    callId: string,
    adjustments: {
      speechRate?: number;
      clarificationStyle?: 'verbose' | 'concise';
      pauseDuration?: number;
    }
  ): Promise<void> {
    logger.info('Applying UX adjustments', { callId, adjustments });

    // In a real implementation, this would update the agent's behavior
    // For now, we'll log the adjustments
    // Future: Use Retell's API to update agent parameters in real-time
  }

  /**
   * Handle smart routing to specialized agents
   */
  private async handleSmartRouting(sessionId: string, targetArea: string): Promise<void> {
    logger.info('Smart routing initiated', { sessionId, targetArea });

    const context = this.conversationContexts.get(sessionId);
    if (!context) return;

    // Create notification for routing
    // Log routing event instead of creating notification
    logger.info('Voice call routing initiated', {
      sessionId,
      fromArea: context.legalContext?.practiceArea,
      toArea: targetArea,
    });

    // Update context
    context.legalContext = {
      ...context.legalContext,
      practiceArea: targetArea,
    };
  }

  /**
   * Generate enhanced system prompt with UX considerations
   */
  private generateEnhancedSystemPrompt(params: {
    practiceArea: string;
    language: 'en' | 'es';
    personality: 'professional' | 'friendly' | 'empathetic';
    uxConfig: VoiceUXConfig;
  }): string {
    const personalityTraits = {
      professional: 'professional, clear, and efficient',
      friendly: 'warm, approachable, and conversational',
      empathetic: 'understanding, patient, and supportive',
    };

    const languageInstructions =
      params.language === 'es'
        ? 'Speak in Spanish. Use formal "usted" unless the caller uses "tú".'
        : 'Speak in clear, simple English. Avoid legal jargon unless necessary.';

    return `You are an AI legal assistant for Vasquez Law Firm, specializing in ${params.practiceArea}.

PERSONALITY: Be ${personalityTraits[params.personality]}.

LANGUAGE: ${languageInstructions}

ENHANCED UX FEATURES:
${params.uxConfig.enableEmotionDetection ? '- Detect and respond to emotional cues appropriately' : ''}
${params.uxConfig.naturalConversationMode ? '- Allow natural interruptions and maintain conversational flow' : ''}
${params.uxConfig.adaptiveSpeechRate ? '- Adjust speaking pace based on caller comprehension' : ''}
${params.uxConfig.clarificationPrompts ? '- Ask for clarification when information is unclear' : ''}
${params.uxConfig.enhancedAccessibility ? '- Provide clear, accessible communication for all users' : ''}

CONVERSATION GUIDELINES:
1. Start with a warm greeting and ask how you can help
2. Listen actively and acknowledge the caller's concerns
3. Ask clarifying questions to understand their legal situation
4. Provide general information about the legal process
5. Never give specific legal advice - schedule consultations instead
6. If the caller seems distressed, acknowledge their emotions
7. Summarize key points before ending the conversation
8. Always offer to schedule a consultation with an attorney

SMART ROUTING:
- If the legal issue doesn't match ${params.practiceArea}, politely explain and offer to connect them with the right specialist
- Identify urgent matters and prioritize accordingly

ACCESSIBILITY:
${params.uxConfig.visualImpairmentSupport ? '- Provide detailed verbal descriptions when needed' : ''}
${params.uxConfig.hearingImpairmentSupport ? '- Speak clearly and offer to repeat information' : ''}

Remember: You represent Vasquez Law Firm. Be helpful, professional, and always prioritize the caller's needs.`;
  }

  /**
   * Select optimal voice based on criteria
   */
  private async selectOptimalVoice(params: {
    language: 'en' | 'es';
    personality: 'professional' | 'friendly' | 'empathetic';
  }): Promise<string> {
    const voices = await this.retellService.listVoices();

    // Filter by language
    const languageVoices = voices.filter(
      v =>
        (params.language === 'es' && v.language.toLowerCase().includes('spanish')) ||
        (params.language === 'en' && v.language.toLowerCase().includes('english'))
    );

    // Select based on personality
    // In practice, this would use more sophisticated voice matching
    const personalityPreferences = {
      professional: { gender: 'neutral', accent: 'neutral' },
      friendly: { gender: 'female', accent: 'neutral' },
      empathetic: { gender: 'female', accent: 'neutral' },
    };

    const prefs = personalityPreferences[params.personality];

    // Find best match
    const optimalVoice =
      languageVoices.find(
        v =>
          (!prefs.gender || v.gender.toLowerCase() === prefs.gender) &&
          (!prefs.accent || v.accent.toLowerCase().includes(prefs.accent))
      ) || languageVoices[0];

    return optimalVoice?.voice_id || languageVoices[0]?.voice_id || 'default-voice-id';
  }

  /**
   * Load user preferences from database
   */
  private async loadUserPreferences(userId: string): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
        },
      });

      // Mock voice preferences for now
      return user ? { speechRate: 1.0, volumeLevel: 50 } : null;
    } catch (error) {
      logger.error('Failed to load user preferences', { error, userId });
      return null;
    }
  }

  /**
   * Generate conversation metrics
   */
  async generateConversationMetrics(sessionId: string): Promise<VoiceInteractionMetrics> {
    const context = this.conversationContexts.get(sessionId);
    if (!context) {
      throw new Error('Session not found');
    }

    // Calculate metrics
    const totalTurns = context.conversationHistory.length;
    const userTurns = context.conversationHistory.filter(h => h.speaker === 'user').length;
    const agentTurns = context.conversationHistory.filter(h => h.speaker === 'agent').length;

    // Calculate average response time (simplified)
    let totalResponseTime = 0;
    let responseCount = 0;

    for (let i = 1; i < context.conversationHistory.length; i++) {
      const current = context.conversationHistory[i];
      const previous = context.conversationHistory[i - 1];

      if (current && previous && current.speaker === 'agent' && previous.speaker === 'user') {
        const responseTime = current.timestamp.getTime() - previous.timestamp.getTime();
        totalResponseTime += responseTime;
        responseCount++;
      }
    }

    const averageResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;

    // Count clarifications
    const clarificationCount = context.conversationHistory.filter(
      h =>
        h.speaker === 'agent' &&
        (h.message.includes('Could you clarify') || h.message.includes('Can you explain'))
    ).length;

    // Calculate completion rate (simplified)
    const hasGreeting = context.conversationHistory.some(
      h => h.speaker === 'agent' && h.message.toLowerCase().includes('hello')
    );
    const hasIssueIdentified = context.conversationHistory.some(
      h =>
        h.message.toLowerCase().includes('understand') ||
        h.message.toLowerCase().includes('help you with')
    );
    const hasNextSteps = context.conversationHistory.some(
      h =>
        h.message.toLowerCase().includes('schedule') ||
        h.message.toLowerCase().includes('consultation')
    );

    const completionRate =
      (hasGreeting ? 33 : 0) + (hasIssueIdentified ? 33 : 0) + (hasNextSteps ? 34 : 0);

    // Interaction quality based on conversation flow
    const interactionQuality = Math.min(
      100,
      completionRate * 0.4 +
        (100 - clarificationCount * 10) * 0.3 +
        (averageResponseTime < 2000 ? 100 : 50) * 0.3
    );

    return {
      sessionId,
      interactionQuality,
      clarityScore: 100 - clarificationCount * 10,
      completionRate,
      averageResponseTime,
      interruptionCount: 0, // Would need real-time data
      clarificationCount,
      emotionalTransitions: [], // Would track from context updates
    };
  }

  /**
   * Handle post-call processing with enhanced UX insights
   */
  async processCallCompletion(params: {
    callId: string;
    sessionId: string;
    transcript: any[];
    duration: number;
  }): Promise<void> {
    logger.info('Processing call completion with enhanced UX', { params });

    const context = this.conversationContexts.get(params.sessionId);
    if (!context) return;

    // Generate metrics
    const metrics = await this.generateConversationMetrics(params.sessionId);

    // Prepare intake if legal issue was identified
    if (context.legalContext?.practiceArea && context.userId) {
      const intakeRequest = {
        personalInfo: {
          // Would be populated from user data
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          preferredLanguage: context.language,
          location: { city: '', state: '', zipCode: '' },
        },
        legalIssue: {
          primaryArea: context.legalContext.practiceArea,
          description: this.extractIssueDescription(context.conversationHistory),
          urgency: context.legalContext.urgency || 'within_weeks',
          hasDeadlines: false,
        },
        priorLegalExperience: {
          hasAttorney: false,
          priorCases: false,
          priorDenials: false,
        },
        financialSituation: {
          employmentStatus: 'unknown',
          hasInsurance: false,
          abilityToPay: 'unknown',
        },
        clientGoals: this.extractClientGoals(context.conversationHistory),
        specificQuestions: this.extractQuestions(context.conversationHistory),
        source: 'voice_agent',
      };

      // Process through AI intake system
      try {
        const assessment = await aiClientIntakeSystem.processClientIntake(intakeRequest as any);

        // Send follow-up email
        if (context.userId) {
          await this.sendFollowUpEmail(context.userId, assessment);
        }
      } catch (error) {
        logger.error('Failed to process voice intake', { error });
      }
    }

    // Store call metrics
    await voiceCallMetricsStubs.create({
      data: {
        callId: params.callId,
        sessionId: params.sessionId,
        userId: context.userId,
        duration: params.duration,
        interactionQuality: metrics.interactionQuality,
        clarityScore: metrics.clarityScore,
        completionRate: metrics.completionRate,
        averageResponseTime: metrics.averageResponseTime,
        emotionalState: context.emotionalState,
        language: context.language,
        metadata: {
          practiceArea: context.legalContext?.practiceArea,
          clarificationCount: metrics.clarificationCount,
        },
      },
    });

    // Clean up context
    this.conversationContexts.delete(params.sessionId);
  }

  /**
   * Extract issue description from conversation
   */
  private extractIssueDescription(history: ConversationContext['conversationHistory']): string {
    const userMessages = history
      .filter(h => h.speaker === 'user')
      .map(h => h.message)
      .join(' ');

    // Simple extraction - in practice would use NLP
    return userMessages.substring(0, 500);
  }

  /**
   * Extract client goals from conversation
   */
  private extractClientGoals(history: ConversationContext['conversationHistory']): string[] {
    // Simple extraction - in practice would use NLP
    const goals: string[] = [];

    const goalKeywords = ['want', 'need', 'hope', 'goal', 'looking for'];
    history
      .filter(h => h.speaker === 'user')
      .forEach(h => {
        if (goalKeywords.some(kw => h.message.toLowerCase().includes(kw))) {
          goals.push(h.message.substring(0, 100));
        }
      });

    return goals.slice(0, 3);
  }

  /**
   * Extract questions from conversation
   */
  private extractQuestions(history: ConversationContext['conversationHistory']): string[] {
    return history
      .filter(h => h.speaker === 'user' && h.message.includes('?'))
      .map(h => h.message)
      .slice(0, 5);
  }

  /**
   * Send follow-up email after voice call
   */
  private async sendFollowUpEmail(userId: string, assessment: any): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });

    if (!user?.email) return;

    await sendEmail({
      to: user.email,
      subject: 'Follow-up from Your Call with Vasquez Law Firm',
      html: `<p>Dear ${user.name},</p><p>Thank you for your call. We will follow up with you soon.</p>`,
    });
  }
}

// Export singleton instance
export const enhancedVoiceUXSystem = new EnhancedVoiceUXSystem();
