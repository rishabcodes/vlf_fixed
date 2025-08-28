import OpenAI from 'openai';
import { AgentOrchestrator, AgentContext, AgentResponse } from '@/lib/agents/agent-orchestrator';
import { t } from '@/lib/translations';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { performance } from 'perf_hooks';
import { EventEmitter } from 'events';

// Circuit breaker for AI service
interface CircuitBreaker {
  isOpen: boolean;
  failures: number;
  threshold: number;
  timeout: number;
  lastFailureTime: number;
}

// Enhanced message context for socket communication
export interface EnhancedMessageContext extends AgentContext {
  socketId: string;
  conversationContext: Array<{ role: string; content: string; timestamp: number }>;
  userProfile?: {
    tier: string;
    practiceAreas: string[];
    urgencyLevel: string;
    communicationPreference: string;
  };
  metadata: {
    source: 'socket' | 'web_chat' | 'voice' | 'sms';
    quickResponse?: string;
    intentAnalysis?: {
      primary: string;
      confidence: number;
      entities: Array<{ type: string; value: string }>;
    };
    escalationTriggers?: string[];
    [key: string]: unknown;
  };
}

// Enhanced response with socket-specific features
// Intent analysis type definition
export interface IntentAnalysis {
  primary: string;
  confidence: number;
  entities: Array<{ type: string; value: string }>;
}

// Enhanced response with socket-specific features
export interface EnhancedChatResponse extends AgentResponse {
  processingTime: number;
  model?: string;
  intentAnalysis?: IntentAnalysis;
  escalation?: {
    type: 'voice' | 'human' | 'urgent' | 'technical';
    reason: string;
    metadata?: Record<string, unknown>;
  };
  followUpActions?: Array<{
    type: string;
    delay: number;
    content: string;
  }>;
  confidence: number;
  contextAnalysis?: {
    conversationStage: string;
    userEmotionalState: string;
    legalComplexity: string;
  };
}

// Legal disclaimers and compliance
const LEGAL_DISCLAIMERS = {
  en: 'This is not legal advice and does not create an attorney-client relationship. For specific legal matters, please consult with one of our attorneys.',
  es: 'Esto no es asesoramiento legal y no crea una relación abogado-cliente. Para asuntos legales específicos, consulte con uno de nuestros abogados.',
};

// System prompts optimized for socket chat
const SOCKET_SYSTEM_PROMPTS = {
  en: `You are the AI assistant for Vasquez Law Firm, specializing in providing immediate, helpful guidance through real-time chat. Your role:

CORE RESPONSIBILITIES:
1. Provide general legal information (NOT legal advice)
2. Analyze user intent and route to appropriate specialists
3. Collect essential case information efficiently
4. Guide users toward consultation when appropriate
5. Maintain professional, empathetic communication

PRACTICE AREAS & EXPERTISE:
- Immigration Law: Visas, green cards, citizenship, deportation defense, asylum, DACA
- Personal Injury: Car accidents, slip/fall, medical malpractice, workers' comp
- Criminal Defense: DUI, drug charges, assault, theft, federal crimes
- Family Law: Divorce, custody, child support, domestic violence
- Traffic Violations: Speeding tickets, license issues, CDL violations

COMMUNICATION GUIDELINES:
- Be warm, professional, and culturally sensitive
- Ask clarifying questions to understand specific needs
- Always include appropriate legal disclaimers
- For urgent matters, immediately escalate to phone support
- If case complexity exceeds your scope, recommend attorney consultation
- Use simple, clear language avoiding legal jargon

FIRM INFORMATION:
- Phone: 1-844-967-3536 (1-844-YO-PELEO)
- Offices: Charlotte NC, Atlanta GA
- Services: Nationwide for immigration, local for other practice areas
- Free consultations available for most practice areas
- "YO PELEO POR TI" - We fight for you

ESCALATION TRIGGERS:
- Emergency legal situations
- Active legal proceedings with deadlines
- Complex multi-jurisdictional matters
- Users expressing emotional distress
- Technical questions beyond your knowledge

Always end with appropriate disclaimers and encourage consultation for specific legal matters.`,

  es: `Eres el asistente de IA de Vasquez Law Firm, especializado en brindar orientación inmediata y útil a través de chat en tiempo real. Tu función:

RESPONSABILIDADES PRINCIPALES:
1. Proporcionar información legal general (NO asesoramiento legal)
2. Analizar la intención del usuario y dirigir a especialistas apropiados
3. Recopilar información esencial del caso de manera eficiente
4. Guiar a los usuarios hacia la consulta cuando sea apropiado
5. Mantener comunicación profesional y empática

ÁREAS DE PRÁCTICA Y EXPERIENCIA:
- Ley de Inmigración: Visas, tarjetas verdes, ciudadanía, defensa de deportación, asilo, DACA
- Lesiones Personales: Accidentes automovilísticos, resbalones/caídas, negligencia médica, compensación laboral
- Defensa Criminal: DUI, cargos por drogas, asalto, robo, crímenes federales
- Derecho Familiar: Divorcio, custodia, manutención infantil, violencia doméstica
- Violaciones de Tráfico: Multas de velocidad, problemas de licencia, violaciones de CDL

PAUTAS DE COMUNICACIÓN:
- Sé cálido, profesional y culturalmente sensible
- Haz preguntas aclaratorias para entender necesidades específicas
- Siempre incluye descargos de responsabilidad legal apropiados
- Para asuntos urgentes, escala inmediatamente al soporte telefónico
- Si la complejidad del caso excede tu alcance, recomienda consulta con abogado
- Usa lenguaje simple y claro evitando jerga legal

INFORMACIÓN DE LA FIRMA:
- Teléfono: 1-844-967-3536 (1-844-YO-PELEO)
- Oficinas: Charlotte NC, Atlanta GA
- Servicios: En todo el país para inmigración, local para otras áreas de práctica
- Consultas gratuitas disponibles para la mayoría de áreas de práctica
- "YO PELEO POR TI" - Luchamos por ti

DISPARADORES DE ESCALACIÓN:
- Situaciones legales de emergencia
- Procedimientos legales activos con fechas límite
- Asuntos complejos multi-jurisdiccionales
- Usuarios expresando angustia emocional
- Preguntas técnicas más allá de tu conocimiento

Siempre termina con descargos de responsabilidad apropiados y alienta la consulta para asuntos legales específicos.`,
};

// Pre-defined responses for common scenarios
const QUICK_RESPONSES = {
  en: {
    greeting:
      "Hello! I'm here to help with your legal questions. What brings you to Vasquez Law Firm today?",
    consultation:
      "I'd be happy to help you schedule a consultation. You can call us at 1-844-967-3536 or I can collect your information to have someone contact you. What works best for you?",
    fees: "Many of our consultations are free, and we often work on contingency for personal injury cases (you don't pay unless we win). For other matters, we offer competitive rates and payment plans. Would you like to discuss this with an attorney?",
    locations:
      'We have offices in Charlotte, NC and Atlanta, GA. For immigration matters, we assist clients nationwide. We also offer virtual consultations for your convenience.',
    emergency:
      'If this is a legal emergency, please call us immediately at 1-844-967-3536. We have attorneys available for urgent matters.',
    spanish: '¡Perfecto! Hablamos español. Permíteme cambiar al español para ayudarte mejor.',
    after_hours:
      "I'm available 24/7 to help with general questions. For urgent legal matters or to speak with an attorney, please call 1-844-967-3536.",
    complex_case:
      'This sounds like a complex situation that would benefit from direct attorney consultation. I can schedule you for a free consultation where an attorney can review your specific circumstances.',
    document_help:
      "I can help you understand what documents you might need. For document review or preparation, I'd recommend speaking with one of our attorneys who can provide specific guidance for your situation.",
  },
  es: {
    greeting:
      '¡Hola! Estoy aquí para ayudarte con tus preguntas legales. ¿Qué te trae a Vasquez Law Firm hoy?',
    consultation:
      'Me encantaría ayudarte a programar una consulta. Puedes llamarnos al 1-844-967-3536 o puedo recopilar tu información para que alguien se comunique contigo. ¿Qué funciona mejor para ti?',
    fees: 'Muchas de nuestras consultas son gratuitas, y a menudo trabajamos con honorarios de contingencia para casos de lesiones personales (no pagas a menos que ganemos). Para otros asuntos, ofrecemos tarifas competitivas y planes de pago. ¿Te gustaría discutir esto con un abogado?',
    locations:
      'Tenemos oficinas en Charlotte, NC y Atlanta, GA. Para asuntos de inmigración, ayudamos a clientes en todo el país. También ofrecemos consultas virtuales para tu conveniencia.',
    emergency:
      'Si esta es una emergencia legal, llámanos inmediatamente al 1-844-967-3536. Tenemos abogados disponibles para asuntos urgentes.',
    spanish: "Perfect! We speak Spanish. I'm now communicating in Spanish to better assist you.",
    after_hours:
      'Estoy disponible 24/7 para ayudar con preguntas generales. Para asuntos legales urgentes o para hablar con un abogado, llama al 1-844-967-3536.',
    complex_case:
      'Esto suena como una situación compleja que se beneficiaría de una consulta directa con un abogado. Puedo programarte para una consulta gratuita donde un abogado puede revisar tus circunstancias específicas.',
    document_help:
      'Puedo ayudarte a entender qué documentos podrías necesitar. Para revisión o preparación de documentos, recomendaría hablar con uno de nuestros abogados que pueden proporcionar orientación específica para tu situación.',
  },
};

export class EnhancedChatService extends EventEmitter {
  private openai: OpenAI | null = null;
  private orchestrator: AgentOrchestrator;
  private circuitBreaker: CircuitBreaker;
  private responseCache: Map<string, { response: EnhancedChatResponse; timestamp: number }>;
  private readonly CACHE_TTL = 300000; // 5 minutes
  private readonly MAX_RETRIES = 3;
  private readonly TIMEOUT = 30000; // 30 seconds

  constructor() {
    super();

    // Initialize OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        timeout: this.TIMEOUT,
      });
    }

    // Initialize agent orchestrator
    this.orchestrator = AgentOrchestrator.getInstance();

    // Initialize circuit breaker
    this.circuitBreaker = {
      isOpen: false,
      failures: 0,
      threshold: 5,
      timeout: 60000, // 1 minute
      lastFailureTime: 0,
    };

    // Initialize response cache
    this.responseCache = new Map();

    // Clean cache periodically
    setInterval(() => this.cleanCache(), this.CACHE_TTL);

    logger.info('Enhanced Chat Service initialized', {
      openaiAvailable: !!this.openai,
      orchestratorReady: true,
    });
  }

  /**
   * Process message with enhanced AI capabilities
   */
  async processMessage(
    content: string,
    context: EnhancedMessageContext
  ): Promise<EnhancedChatResponse> {
    const startTime = performance.now();

    try {
      // Check circuit breaker
      if (this.isCircuitBreakerOpen()) {
        return this.getFallbackResponse(content, context);
      }

      // Analyze intent first
      const intentAnalysis = await this.analyzeIntent(content, context);

      // Check for quick responses
      const quickResponse = this.getQuickResponse(content, context);
      if (quickResponse) {
        return {
          agent: 'quick-response',
          response: quickResponse,
          processingTime: performance.now() - startTime,
          confidence: 0.9,
          intentAnalysis,
          suggestions: this.generateSuggestions(intentAnalysis.primary, context.language),
        };
      }

      // Route to specialized agents first
      let agentResponse: AgentResponse | null = null;
      try {
        const agentContext: AgentContext = {
          userId: context.userId,
          sessionId: context.sessionId,
          language: context.language,
          history: context.history,
          metadata: {
            ...context.metadata,
            intentAnalysis,
            source: 'socket',
          },
        };

        agentResponse = await this.orchestrator.routeMessage(content, agentContext);

        if (agentResponse && agentResponse.response) {
          return this.enhanceAgentResponse(agentResponse, startTime, intentAnalysis, context);
        }
      } catch (agentError) {
        logger.warn('Agent orchestrator failed, falling back to OpenAI', { error: agentError });
      }

      // Fallback to OpenAI if agents fail or no specific route
      if (this.openai) {
        const openaiResponse = await this.getOpenAIResponse(content, context);
        return this.enhanceOpenAIResponse(openaiResponse, startTime, intentAnalysis, context);
      }

      // Final fallback
      return this.getFallbackResponse(content, context);
    } catch (error) {
      logger.error('Enhanced chat service error:', errorToLogMeta(error));
      this.recordFailure();
      return this.getErrorResponse(error, context);
    }
  }

  /**
   * Analyze message intent with enhanced NLP
   */
  private async analyzeIntent(
    content: string,
    _context: EnhancedMessageContext
  ): Promise<IntentAnalysis> {
    const lowerContent = content.toLowerCase();
    const entities: Array<{ type: string; value: string }> = [];

    // Extract entities
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g;

    const emails = content.match(emailRegex);
    const phones = content.match(phoneRegex);
    const dates = content.match(dateRegex);

    if (emails) entities.push(...emails.map(email => ({ type: 'email', value: email })));
    if (phones) entities.push(...phones.map(phone => ({ type: 'phone', value: phone })));
    if (dates) entities.push(...dates.map(date => ({ type: 'date', value: date })));

    // Intent classification with confidence scoring
    const intentPatterns = {
      consultation: {
        patterns: [
          'consultation',
          'consulta',
          'appointment',
          'cita',
          'schedule',
          'programar',
          'meet',
          'reunir',
        ],
        confidence: 0.8,
      },
      immigration: {
        patterns: [
          'visa',
          'green card',
          'tarjeta verde',
          'citizenship',
          'ciudadania',
          'deportation',
          'deportacion',
          'asylum',
          'asilo',
          'daca',
        ],
        confidence: 0.9,
      },
      personal_injury: {
        patterns: [
          'accident',
          'accidente',
          'injury',
          'lesion',
          'car crash',
          'slip',
          'fall',
          'caida',
          'medical malpractice',
          'negligencia',
        ],
        confidence: 0.85,
      },
      criminal_defense: {
        patterns: [
          'arrest',
          'arresto',
          'dui',
          'dwi',
          'criminal',
          'charges',
          'cargos',
          'court',
          'tribunal',
          'bail',
          'fianza',
        ],
        confidence: 0.85,
      },
      family_law: {
        patterns: [
          'divorce',
          'divorcio',
          'custody',
          'custodia',
          'child support',
          'manutencion',
          'domestic violence',
          'violencia domestica',
        ],
        confidence: 0.85,
      },
      workers_comp: {
        patterns: [
          'work injury',
          'lesion trabajo',
          'workers comp',
          'compensacion laboral',
          'workplace accident',
          'accidente laboral',
        ],
        confidence: 0.85,
      },
      emergency: {
        patterns: [
          'urgent',
          'urgente',
          'emergency',
          'emergencia',
          'help',
          'ayuda',
          'asap',
          'immediately',
          'inmediatamente',
        ],
        confidence: 0.95,
      },
      fees: {
        patterns: [
          'cost',
          'price',
          'fee',
          'precio',
          'costo',
          'payment',
          'pago',
          'how much',
          'cuanto cuesta',
        ],
        confidence: 0.8,
      },
    };

    let primaryIntent = 'general';
    let maxConfidence = 0;

    for (const [intent, config] of Object.entries(intentPatterns)) {
      const matches = config.patterns.filter(pattern => lowerContent.includes(pattern));
      if (matches.length > 0) {
        const confidence = config.confidence * (matches.length / config.patterns.length);
        if (confidence > maxConfidence) {
          maxConfidence = confidence;
          primaryIntent = intent;
        }
      }
    }

    return {
      primary: primaryIntent,
      confidence: Math.min(maxConfidence, 0.95),
      entities,
    };
  }

  /**
   * Get quick response for common patterns
   */
  private getQuickResponse(content: string, context: EnhancedMessageContext): string | null {
    const lowerContent = content.toLowerCase();
    const responses = QUICK_RESPONSES[context.language as 'en' | 'es'] || QUICK_RESPONSES.en;

    // Greeting patterns
    if (/^(hi|hello|hey|hola|buenos|buenas)/.test(lowerContent)) {
      return responses.greeting;
    }

    // Language switching
    if (
      context.language === 'en' &&
      /habla.*español|speak.*spanish|en español/.test(lowerContent)
    ) {
      return responses.spanish;
    }

    // Emergency patterns
    if (/(urgent|emergency|emergencia|urgente|help|ayuda)/.test(lowerContent)) {
      return responses.emergency;
    }

    // After hours check
    const hour = new Date().getHours();
    if ((hour < 8 || hour > 18) && /(available|open|abierto|disponible)/.test(lowerContent)) {
      return responses.after_hours;
    }

    return null;
  }

  /**
   * Get OpenAI response with enhanced context
   */
  private async getOpenAIResponse(
    content: string,
    context: EnhancedMessageContext
  ): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI not configured');
    }

    const systemPrompt =
      SOCKET_SYSTEM_PROMPTS[context.language as 'en' | 'es'] || SOCKET_SYSTEM_PROMPTS.en;

    // Build conversation history
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
    ];

    // Add recent conversation context
    if (context.conversationContext && context.conversationContext.length > 0) {
      const recentMessages = context.conversationContext.slice(-6); // Last 6 messages
      for (const msg of recentMessages) {
        messages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        });
      }
    }

    // Add current message
    messages.push({ role: 'user', content });

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    return (
      completion.choices[0]?.message?.content ||
      'I apologize, but I was unable to generate a response.'
    );
  }

  /**
   * Enhance agent response with additional metadata
   */
  private enhanceAgentResponse(
    agentResponse: AgentResponse,
    startTime: number,
    intentAnalysis: IntentAnalysis,
    context: EnhancedMessageContext
  ): EnhancedChatResponse {
    const processingTime = performance.now() - startTime;

    return {
      ...agentResponse,
      processingTime,
      intentAnalysis,
      confidence: this.calculateConfidence(agentResponse, intentAnalysis),
      suggestions:
        agentResponse.suggestions ||
        this.generateSuggestions(intentAnalysis.primary, context.language),
      followUpActions: this.generateFollowUpActions(agentResponse, context),
      contextAnalysis: this.analyzeConversationContext(context),
    };
  }

  /**
   * Enhance OpenAI response
   */
  private enhanceOpenAIResponse(
    response: string,
    startTime: number,
    intentAnalysis: IntentAnalysis,
    context: EnhancedMessageContext
  ): EnhancedChatResponse {
    const processingTime = performance.now() - startTime;

    // Add disclaimer if not present
    const disclaimer = LEGAL_DISCLAIMERS[context.language as 'en' | 'es'] || LEGAL_DISCLAIMERS.en;
    const responseWithDisclaimer =
      response.includes('not legal advice') || response.includes('no es asesoramiento legal')
        ? response
        : `${response}\n\n*${disclaimer}*`;

    return {
      agent: 'openai',
      response: responseWithDisclaimer,
      processingTime,
      model: 'gpt-3.5-turbo',
      intentAnalysis,
      confidence: 0.8,
      suggestions: this.generateSuggestions(intentAnalysis.primary, context.language),
      contextAnalysis: this.analyzeConversationContext(context),
    };
  }

  /**
   * Generate contextual suggestions
   */
  private generateSuggestions(intent: string, language: string): string[] {
    const suggestions = {
      en: {
        consultation: [
          'Schedule a free consultation',
          'Learn about our services',
          'Speak with an attorney',
        ],
        immigration: ['Check visa requirements', 'Green card process', 'Deportation defense'],
        personal_injury: ['Car accident claims', 'Medical malpractice', 'Workers compensation'],
        criminal_defense: ['DUI defense', 'Drug charges', 'Court representation'],
        family_law: ['Divorce process', 'Child custody', 'Domestic violence'],
        emergency: ['Call now: 1-844-967-3536', 'Emergency consultation', 'Immediate legal help'],
        general: ['Schedule consultation', 'Our practice areas', 'Contact information'],
      },
      es: {
        consultation: [
          'Programar consulta gratuita',
          'Conocer nuestros servicios',
          'Hablar con un abogado',
        ],
        immigration: ['Requisitos de visa', 'Proceso de tarjeta verde', 'Defensa de deportación'],
        personal_injury: ['Reclamos de accidentes', 'Negligencia médica', 'Compensación laboral'],
        criminal_defense: ['Defensa DUI', 'Cargos de drogas', 'Representación en corte'],
        family_law: ['Proceso de divorcio', 'Custodia de menores', 'Violencia doméstica'],
        emergency: [
          'Llama ahora: 1-844-967-3536',
          'Consulta de emergencia',
          'Ayuda legal inmediata',
        ],
        general: ['Programar consulta', 'Nuestras áreas de práctica', 'Información de contacto'],
      },
    };

    const langSuggestions = suggestions[language as 'en' | 'es'] || suggestions.en;
    const intentSuggestions = langSuggestions[intent as keyof typeof langSuggestions];
    return intentSuggestions || langSuggestions.general;
  }

  /**
   * Calculate response confidence
   */
  private calculateConfidence(
    agentResponse: AgentResponse,
    intentAnalysis: IntentAnalysis
  ): number {
    let confidence = 0.7; // Base confidence

    // Boost confidence for specialized agents
    if (agentResponse.agent !== 'orchestrator' && agentResponse.agent !== 'quick-response') {
      confidence += 0.1;
    }

    // Boost confidence for high-intent matches
    if (intentAnalysis.confidence > 0.8) {
      confidence += 0.1;
    }

    // Reduce confidence for generic responses
    if (agentResponse.response && agentResponse.response.length < 50) {
      confidence -= 0.1;
    }

    return Math.min(Math.max(confidence, 0.1), 0.95);
  }

  /**
   * Generate follow-up actions
   */
  private generateFollowUpActions(agentResponse: AgentResponse, context: EnhancedMessageContext) {
    const actions: Array<{ type: string; delay: number; content: string }> = [];

    // Add scheduling follow-up for consultation intents
    if (context.metadata.intentAnalysis?.primary === 'consultation') {
      actions.push({
        type: 'schedule_follow_up',
        delay: 300000, // 5 minutes
        content:
          context.language === 'es'
            ? '¿Te gustaría que programemos esa consulta ahora?'
            : 'Would you like me to schedule that consultation now?',
      });
    }

    // Add emergency escalation for urgent matters
    if (context.metadata.intentAnalysis?.primary === 'emergency') {
      actions.push({
        type: 'escalate_urgent',
        delay: 0,
        content:
          context.language === 'es'
            ? 'Esto parece urgente. Te estoy conectando con nuestro equipo inmediatamente.'
            : "This seems urgent. I'm connecting you with our team immediately.",
      });
    }

    return actions;
  }

  /**
   * Analyze conversation context
   */
  private analyzeConversationContext(context: EnhancedMessageContext) {
    const messageCount = context.conversationContext?.length || 0;

    return {
      conversationStage:
        messageCount < 2 ? 'initial' : messageCount < 5 ? 'discovery' : 'deep_engagement',
      userEmotionalState: this.detectEmotionalState(context),
      legalComplexity: this.assessLegalComplexity(context),
    };
  }

  /**
   * Detect emotional state from context
   */
  private detectEmotionalState(context: EnhancedMessageContext): string {
    if (!context.conversationContext) return 'neutral';

    const recentMessages = context.conversationContext.slice(-3);
    const content = recentMessages
      .map(m => m.content)
      .join(' ')
      .toLowerCase();

    if (
      /(urgent|emergency|help|worried|scared|afraid|emergencia|urgente|ayuda|preocupado|asustado)/.test(
        content
      )
    ) {
      return 'stressed';
    }

    if (/(thank|grateful|appreciate|gracias|agradecido|excelente)/.test(content)) {
      return 'positive';
    }

    if (/(confused|dont understand|no entiendo|confundido)/.test(content)) {
      return 'confused';
    }

    return 'neutral';
  }

  /**
   * Assess legal complexity
   */
  private assessLegalComplexity(context: EnhancedMessageContext): string {
    const intent = context.metadata.intentAnalysis?.primary;

    const complexIntents = ['criminal_defense', 'immigration', 'family_law'];
    const moderateIntents = ['personal_injury', 'workers_comp'];

    if (complexIntents.includes(intent || '')) return 'high';
    if (moderateIntents.includes(intent || '')) return 'moderate';
    return 'low';
  }

  /**
   * Get fallback response when AI services fail
   */
  private getFallbackResponse(
    content: string,
    context: EnhancedMessageContext
  ): EnhancedChatResponse {
    const response =
      context.language === 'es'
        ? 'Entiendo tu consulta. Un miembro de nuestro equipo estará contigo pronto. Para asistencia inmediata, llama al 1-844-967-3536.'
        : 'I understand your inquiry. A member of our team will be with you shortly. For immediate assistance, please call 1-844-967-3536.';

    return {
      agent: 'fallback',
      response,
      processingTime: 0,
      confidence: 0.5,
      actions: [
        {
          type: 'show-contact',
          data: { phone: '1-844-967-3536' },
        },
      ],
      suggestions: ['Call us now', 'Schedule consultation', 'Our services'],
    };
  }

  /**
   * Get error response
   */
  private getErrorResponse(error: unknown, context: EnhancedMessageContext): EnhancedChatResponse {
    logger.error('Chat service error:', errorToLogMeta(error));

    const response =
      context.language === 'es'
        ? 'Disculpa, tuve un problema técnico. Por favor, llama al 1-844-967-3536 para asistencia inmediata.'
        : 'I apologize, I encountered a technical issue. Please call 1-844-967-3536 for immediate assistance.';

    return {
      agent: 'error',
      response,
      processingTime: 0,
      confidence: 0.1,
      escalation: {
        type: 'technical',
        reason: 'AI service error',
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
      },
      actions: [
        {
          type: 'show-contact',
          data: { phone: '1-844-967-3536' },
        },
      ],
    };
  }

  /**
   * Circuit breaker management
   */
  private isCircuitBreakerOpen(): boolean {
    if (!this.circuitBreaker.isOpen) return false;

    const now = Date.now();
    if (now - this.circuitBreaker.lastFailureTime > this.circuitBreaker.timeout) {
      this.circuitBreaker.isOpen = false;
      this.circuitBreaker.failures = 0;
      logger.info('Circuit breaker reset');
    }

    return this.circuitBreaker.isOpen;
  }

  private recordFailure(): void {
    this.circuitBreaker.failures++;
    this.circuitBreaker.lastFailureTime = Date.now();

    if (this.circuitBreaker.failures >= this.circuitBreaker.threshold) {
      this.circuitBreaker.isOpen = true;
      logger.warn('Circuit breaker opened', { failures: this.circuitBreaker.failures });
    }
  }

  /**
   * Cache management
   */
  private cleanCache(): void {
    const now = Date.now();
    for (const [key, value] of this.responseCache.entries()) {
      if (now - value.timestamp > this.CACHE_TTL) {
        this.responseCache.delete(key);
      }
    }
  }

  /**
   * Health check
   */
  getHealth(): { status: string; services: Record<string, boolean> } {
    return {
      status: 'healthy',
      services: {
        openai: !!this.openai,
        orchestrator: true,
        circuitBreaker: !this.circuitBreaker.isOpen,
      },
    };
  }
}

// Export singleton instance
export const enhancedChatService = new EnhancedChatService();
