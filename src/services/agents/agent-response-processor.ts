import { AgentType, AgentConfig } from '@/config/agents/types';
import { agentConfigs } from '@/config/agents/agent-configs';
import { ConversationStateManager } from './conversation-state-manager';
import { ClassificationHandler } from './classification-handler';
import { logger } from '@/lib/safe-logger';
import OpenAI from 'openai';

export interface ProcessedResponse {
  response: string;
  agent: AgentType;
  confidence: number;
  suggestedSwitch?: AgentType;
  switchReason?: string;
  actions?: Array<{
    type: string;
    data: any;
  }>;
  metadata?: Record<string, any>;
}

export class AgentResponseProcessor {
  private static instance: AgentResponseProcessor;
  private openai: OpenAI | null = null;
  private classificationHandler: ClassificationHandler;
  private stateManager: ConversationStateManager;

  private constructor() {
    this.classificationHandler = ClassificationHandler.getInstance();
    this.stateManager = ConversationStateManager.getInstance();
    
    // Initialize OpenAI if configured
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here') {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  static getInstance(): AgentResponseProcessor {
    if (!AgentResponseProcessor.instance) {
      AgentResponseProcessor.instance = new AgentResponseProcessor();
    }
    return AgentResponseProcessor.instance;
  }

  /**
   * Process message through specified agent
   */
  async processWithAgent(
    agentType: AgentType,
    message: string,
    conversationId: string,
    language: 'en' | 'es' = 'en'
  ): Promise<ProcessedResponse> {
    const agentConfig = agentConfigs[agentType];
    if (!agentConfig) {
      throw new Error(`Agent configuration not found for ${agentType}`);
    }

    // Get conversation context
    const conversationState = this.stateManager.getOrCreateConversation(conversationId, agentType);
    
    // Add user message to history
    this.stateManager.addMessage(conversationId, 'user', message);

    // Special handling for Classification Agent
    if (agentType === AgentType.CLASSIFICATION) {
      return this.handleClassificationAgent(message, conversationId, conversationState.contextData);
    }

    // For other agents, use prompt template with OpenAI or fallback
    const response = await this.generateAgentResponse(
      agentConfig,
      message,
      this.stateManager.getFormattedContext(conversationId),
      language
    );

    // Check confidence and potential switches
    const switchRequest = this.stateManager.checkForAgentSwitchTriggers(conversationId, message);
    
    // Calculate confidence based on response quality and topic match
    const confidence = this.calculateConfidence(agentType, message, response);
    this.stateManager.updateConfidence(conversationId, confidence);

    // Add assistant response to history
    this.stateManager.addMessage(conversationId, 'assistant', response, agentType);

    const result: ProcessedResponse = {
      response,
      agent: agentType,
      confidence,
      metadata: {
        agentName: agentConfig.name,
        language: agentConfig.language,
      },
    };

    // Add switch suggestion if confidence is low or switch triggered
    if (switchRequest) {
      result.suggestedSwitch = switchRequest.toAgent;
      result.switchReason = switchRequest.reason;
    } else if (confidence < 0.6) {
      result.suggestedSwitch = AgentType.GENERAL_LEGAL;
      result.switchReason = 'Low confidence in current agent specialization';
    }

    return result;
  }

  /**
   * Handle Classification Agent logic
   */
  private async handleClassificationAgent(
    message: string,
    conversationId: string,
    contextData: any
  ): Promise<ProcessedResponse> {
    const context = {
      userInput: message,
      conversationHistory: [],
      questionsAsked: contextData.questionsAsked || 0,
      emergencyDetected: contextData.emergencyDetected,
      existingClient: contextData.existingClient,
      languagePreference: contextData.userInfo?.language,
      legalArea: contextData.legalArea,
    };

    // Get next question or route
    const routingResult = await this.classificationHandler.classifyAndRoute(context);
    
    if (routingResult.agent === AgentType.CLASSIFICATION) {
      // Need to ask more questions
      const nextQuestion = this.classificationHandler.getNextQuestion(context);
      
      if (nextQuestion) {
        // Update context
        this.stateManager.updateContextData(conversationId, {
          questionsAsked: (contextData.questionsAsked || 0) + 1,
        });

        return {
          response: nextQuestion,
          agent: AgentType.CLASSIFICATION,
          confidence: 1.0,
          metadata: {
            questionNumber: context.questionsAsked + 1,
            maxQuestions: 3,
          },
        };
      }
    }

    // We have a routing decision
    if (routingResult.agent !== AgentType.CLASSIFICATION) {
      // Request agent switch
      await this.stateManager.requestAgentSwitch(conversationId, {
        fromAgent: AgentType.CLASSIFICATION,
        toAgent: routingResult.agent,
        reason: routingResult.reasoning,
        confidence: 1.0,
      });

      // Generate handoff message
      const agentConfig = agentConfigs[routingResult.agent];
      const handoffMessage = `I'm connecting you with our ${agentConfig.name}. They'll be able to help you with your specific needs.`;

      return {
        response: handoffMessage,
        agent: AgentType.CLASSIFICATION,
        confidence: 1.0,
        suggestedSwitch: routingResult.agent,
        switchReason: routingResult.reasoning,
        actions: [
          {
            type: 'agent-handoff',
            data: {
              toAgent: routingResult.agent,
              reason: routingResult.reasoning,
            },
          },
        ],
      };
    }

    // Fallback
    return {
      response: 'Let me help you find the right specialist for your needs.',
      agent: AgentType.CLASSIFICATION,
      confidence: 0.5,
      suggestedSwitch: AgentType.GENERAL_LEGAL,
      switchReason: 'Unable to determine specific need',
    };
  }

  /**
   * Generate response using agent's prompt template
   */
  private async generateAgentResponse(
    agentConfig: AgentConfig,
    message: string,
    context: string,
    language: 'en' | 'es'
  ): Promise<string> {
    // Check if agent supports the requested language
    const agentLanguage = agentConfig.language;
    if (agentLanguage !== 'both' && agentLanguage !== language) {
      return language === 'es' 
        ? 'Lo siento, este especialista solo habla inglés. ¿Te gustaría que te conecte con un especialista bilingüe?'
        : 'This specialist primarily works in Spanish. Would you like me to connect you with an English-speaking specialist?';
    }

    // If OpenAI is available, use it with the agent's prompt template
    if (this.openai) {
      try {
        const systemPrompt = `${agentConfig.promptTemplate}\n\nCONTEXT:\n${context}\n\nRespond in ${language === 'es' ? 'Spanish' : 'English'}.`;
        
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        return completion.choices[0]?.message?.content || this.getFallbackResponse(agentConfig, language);
      } catch (error) {
        logger.error('OpenAI generation failed', { error, agent: agentConfig.type });
        return this.getFallbackResponse(agentConfig, language);
      }
    }

    // Fallback to template-based response
    return this.getFallbackResponse(agentConfig, language);
  }

  /**
   * Get fallback response for agent
   */
  private getFallbackResponse(agentConfig: AgentConfig, language: 'en' | 'es'): string {
    const responses = {
      en: {
        [AgentType.REMOVAL_DEFENSE]: "I understand you're facing immigration challenges. Our deportation defense team can help protect your rights. Can you tell me more about your situation?",
        [AgentType.CRIMINAL_DEFENSE]: "I understand you're dealing with criminal charges. It's important to act quickly. What type of charges are you facing?",
        [AgentType.PERSONAL_INJURY]: "I'm sorry to hear about your injury. We can help you get the compensation you deserve. When did the accident occur?",
        [AgentType.FAMILY_LAW]: "Family law matters can be emotionally challenging. We're here to guide you through the process. What specific family law issue do you need help with?",
        [AgentType.WORKERS_COMP]: "Workplace injuries require immediate attention. We can help you get the benefits you're entitled to. Have you reported the injury to your employer?",
        [AgentType.GENERAL_LEGAL]: "I can help you with various legal matters. Could you provide more details about your situation so I can better assist you?",
        default: `I'm ${agentConfig.name} and I'm here to help you. ${agentConfig.description}. How can I assist you today?`,
      },
      es: {
        [AgentType.REMOVAL_DEFENSE]: "Entiendo que estás enfrentando desafíos migratorios. Nuestro equipo de defensa contra la deportación puede ayudar a proteger tus derechos. ¿Puedes contarme más sobre tu situación?",
        [AgentType.CRIMINAL_DEFENSE]: "Entiendo que estás lidiando con cargos criminales. Es importante actuar rápidamente. ¿Qué tipo de cargos enfrentas?",
        [AgentType.PERSONAL_INJURY]: "Lamento escuchar sobre tu lesión. Podemos ayudarte a obtener la compensación que mereces. ¿Cuándo ocurrió el accidente?",
        [AgentType.FAMILY_LAW]: "Los asuntos de derecho familiar pueden ser emocionalmente desafiantes. Estamos aquí para guiarte. ¿Con qué asunto específico necesitas ayuda?",
        [AgentType.WORKERS_COMP]: "Las lesiones laborales requieren atención inmediata. Podemos ayudarte a obtener los beneficios que te corresponden. ¿Has reportado la lesión a tu empleador?",
        [AgentType.GENERAL_LEGAL]: "Puedo ayudarte con varios asuntos legales. ¿Podrías proporcionar más detalles sobre tu situación?",
        default: `Soy ${agentConfig.name} y estoy aquí para ayudarte. ${agentConfig.description}. ¿Cómo puedo asistirte hoy?`,
      },
    };

    const langResponses = responses[language];
    return langResponses[agentConfig.type] || langResponses.default;
  }

  /**
   * Calculate confidence score for agent response
   */
  private calculateConfidence(
    agentType: AgentType,
    message: string,
    response: string
  ): number {
    let confidence = 0.7; // Base confidence

    const agentConfig = agentConfigs[agentType];
    const lowerMessage = message.toLowerCase();

    // Check if message contains keywords related to agent's skills
    const relevantSkills = agentConfig.skills.filter(skill => 
      lowerMessage.includes(skill.replace(/_/g, ' '))
    );

    // Increase confidence for skill matches
    confidence += relevantSkills.length * 0.1;

    // Check if message is within practice areas
    const relevantAreas = agentConfig.practiceAreas.filter(area =>
      area === 'all' || lowerMessage.includes(area.replace(/_/g, ' '))
    );

    // Increase confidence for practice area matches
    confidence += relevantAreas.length * 0.05;

    // Decrease confidence if response is too generic
    const genericPhrases = ['I can help', 'tell me more', 'provide more details'];
    const hasGenericResponse = genericPhrases.some(phrase => 
      response.toLowerCase().includes(phrase)
    );
    if (hasGenericResponse) {
      confidence -= 0.2;
    }

    // Ensure confidence is between 0 and 1
    return Math.max(0, Math.min(1, confidence));
  }
}