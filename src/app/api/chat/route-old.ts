import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPrismaClient } from '@/lib/prisma';
import { ConversationChannel, ConversationStatus, MessageRole } from '@prisma/client';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { AgentOrchestrator } from '@/lib/agents/agent-orchestrator';
import { ghlChatSync } from '@/services/gohighlevel/chat-sync';
import { ghlService } from '@/services/gohighlevel';
import { withAIAgentTracing, withDatabaseTracing } from '@/lib/telemetry/api-middleware';
import { appointmentBookingHandler } from '@/lib/chat/appointment-booking-handler';

export const runtime = 'nodejs';
// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Legal disclaimer
const LEGAL_DISCLAIMER = {
  en: "I'm an AI assistant providing general legal information. This is not legal advice and does not create an attorney-client relationship. For specific legal matters, please consult with one of our attorneys.",
  es: 'Soy un asistente de IA que proporciona información legal general. Esto no es asesoramiento legal y no crea una relación abogado-cliente. Para asuntos legales específicos, consulte con uno de nuestros abogados.',
};

// System prompts
const SYSTEM_PROMPTS = {
  en: `You are an interactive AI assistant for Vasquez Law Firm, specializing in immigration, personal injury, workers' compensation, criminal defense, and family law.

IMPORTANT - Interactive Flow:
1. FIRST: If you don't have the user's name, politely ask: "Before we begin, may I have your name?"
2. SECOND: After getting their name, understand their legal issue
3. THIRD: Once you understand their issue, ask: "To better assist you, may I have your phone number so our team can follow up?"
4. Be conversational and natural - don't ask for everything at once

Your role is to:
1. Collect user information naturally (name, phone, legal issue)
2. Provide general legal information (NOT legal advice)
3. Help users understand their legal situation
4. Guide them to appropriate resources
5. Schedule consultations when appropriate

Key guidelines:
- Be warm, empathetic, and conversational
- Ask one question at a time
- Remember information shared in the conversation
- If discussing legal matters, clarify you provide information, not legal advice
- Encourage scheduling consultations for specific cases
- Mention consultations are often free
- Offices in Charlotte NC, Atlanta GA, nationwide for immigration

Practice areas:
- Immigration Law: Visas, green cards, citizenship, deportation defense, asylum
- Personal Injury: Car accidents, slip and fall, medical malpractice
- Workers' Compensation: Workplace injuries, disability claims
- Criminal Defense: DUI, drug charges, assault, theft
- Family Law: Divorce, custody, child support

Remember: Be interactive! Ask for their name first, then understand their needs, then get contact info.`,

  es: `Eres un asistente de IA útil para Vasquez Law Firm, un bufete de abogados especializado en inmigración, lesiones personales, compensación laboral, defensa criminal y derecho familiar.

Tu función es:
1. Proporcionar información legal general (NO asesoramiento legal)
2. Ayudar a los usuarios a entender su situación legal
3. Guiarlos a los recursos apropiados
4. Programar consultas cuando sea apropiado
5. Siempre incluir descargos de responsabilidad apropiados

Pautas clave:
- Sé profesional pero cálido y empático
- Siempre aclara que proporcionas información, no asesoramiento legal
- Anima a los usuarios a programar una consulta para casos específicos
- Sé culturalmente sensible e inclusivo
- Si preguntan sobre tarifas, menciona que las consultas a menudo son gratuitas
- Vasquez Law Firm tiene oficinas en Charlotte NC, Atlanta GA, y atiende a clientes en todo el país para asuntos de inmigración

Áreas de práctica:
- Ley de Inmigración: Visas, tarjetas verdes, ciudadanía, defensa de deportación, asilo
- Lesiones Personales: Accidentes automovilísticos, resbalones y caídas, negligencia médica
- Compensación Laboral: Lesiones en el lugar de trabajo, reclamos por discapacidad
- Defensa Criminal: DUI, cargos por drogas, asalto, robo
- Derecho Familiar: Divorcio, custodia, manutención infantil`,
};

// Pre-defined responses for common questions
const COMMON_RESPONSES = {
  en: {
    consultation:
      "I'd be happy to help you schedule a consultation with one of our attorneys. You can call us at 1-844-967-3536 or I can collect your information to have someone contact you. What works best for you?",
    fees: "Many of our consultations are free, and we often work on a contingency fee basis for personal injury cases, meaning you don't pay unless we win. For other matters, we offer competitive rates and payment plans. Would you like to discuss this with an attorney?",
    locations:
      'We have offices in Charlotte, NC and Atlanta, GA. For immigration matters, we can assist clients nationwide. We also offer virtual consultations for your convenience.',
    emergency:
      'If this is a legal emergency, please call us immediately at 1-844-967-3536. We have attorneys available to help with urgent matters.',
  },
  es: {
    consultation:
      'Me encantaría ayudarte a programar una consulta con uno de nuestros abogados. Puedes llamarnos al 1-844-967-3536 o puedo recopilar tu información para que alguien se comunique contigo. ¿Qué funciona mejor para ti?',
    fees: 'Muchas de nuestras consultas son gratuitas, y a menudo trabajamos con honorarios de contingencia para casos de lesiones personales, lo que significa que no pagas a menos que ganemos. Para otros asuntos, ofrecemos tarifas competitivas y planes de pago. ¿Te gustaría discutir esto con un abogado?',
    locations:
      'Tenemos oficinas en Charlotte, NC y Atlanta, GA. Para asuntos de inmigración, podemos ayudar a clientes en todo el país. También ofrecemos consultas virtuales para tu conveniencia.',
    emergency:
      'Si esta es una emergencia legal, llámanos inmediatamente al 1-844-967-3536. Tenemos abogados disponibles para ayudar con asuntos urgentes.',
  },
};

// Format AI response for better readability
function formatAIResponse(text: string): string {
  // Split into sentences (handling common abbreviations)
  const sentences = text
    .replace(/Mr\./g, 'Mr')
    .replace(/Mrs\./g, 'Mrs')
    .replace(/Dr\./g, 'Dr')
    .replace(/etc\./g, 'etc')
    .replace(/i\.e\./g, 'ie')
    .replace(/e\.g\./g, 'eg')
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  // Group sentences into paragraphs (2-3 sentences each)
  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];
  
  sentences.forEach((sentence, index) => {
    // Restore abbreviations
    sentence = sentence
      .replace(/\bMr\b/g, 'Mr.')
      .replace(/\bMrs\b/g, 'Mrs.')
      .replace(/\bDr\b/g, 'Dr.')
      .replace(/\betc\b/g, 'etc.')
      .replace(/\bie\b/g, 'i.e.')
      .replace(/\beg\b/g, 'e.g.');
    
    currentParagraph.push(sentence);
    
    // Create new paragraph after questions or every 2-3 sentences
    const isQuestion = sentence.endsWith('?');
    const hasEnoughSentences = currentParagraph.length >= 2;
    const isLastSentence = index === sentences.length - 1;
    
    if (isQuestion || (hasEnoughSentences && !isLastSentence) || isLastSentence) {
      paragraphs.push(currentParagraph.join(' '));
      currentParagraph = [];
    }
  });
  
  // Format lists with bullet points
  let formatted = paragraphs.join('\n\n');
  
  // Convert comma-separated lists to bullet points
  formatted = formatted.replace(
    /(?:including|such as|like|for example):?\s*([^.]+\,[^.]+)/gi,
    (match, list) => {
      const items = list.split(',').map((item: string) => `• ${item.trim()}`);
      return `including:\n${items.join('\n')}`;
    }
  );
  
  // Add line break after greeting phrases
  formatted = formatted.replace(
    /(Hello|Hi|Welcome|Good morning|Good afternoon|Good evening|Nice to meet you)[,.]?\s+/gi,
    '$1.\n\n'
  );
  
  return formatted;
}

async function handleChatPOST(request: NextRequest) {
  try {
    const { message, userId, language = 'en', sessionId, contactInfo } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if OpenAI API key is configured
    const hasOpenAI = !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here';
    const hasGHL = ghlService.isConfigured();
    
    const prisma = getPrismaClient();

    // Get the current user session
    const session = await getServerSession(authOptions);
    let actualUserId = userId;

    // If user is authenticated, use their session ID
    if (session?.user?.id) {
      actualUserId = session.user.id;
    } else if (!userId) {
      // Create or get anonymous user for non-authenticated chat
      // Use sessionId if provided to maintain consistency
      const identifier = sessionId || `session-${Date.now()}`;
      const anonymousEmail = `anonymous-${identifier}@chat.vasquezlaw.com`;
      let anonymousUser = await prisma.user.findUnique({
        where: { email: anonymousEmail },
      });

      if (!anonymousUser) {
        anonymousUser = await prisma.user.create({
          data: {
            email: anonymousEmail,
            name: 'Anonymous Chat User',
            role: 'CLIENT',
            language,
          },
        });
      }

      actualUserId = anonymousUser.id;
    }

    // Get or create conversation
    let conversation;

    // Try to find an active conversation for this user
    if (sessionId) {
      // If sessionId is provided, try to find the specific conversation
      // Note: sessionId IS the conversationId - they're the same thing
      conversation = await prisma.conversation.findUnique({
        where: {
          id: sessionId,
        },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            take: 40, // Limit to last 20 exchanges (40 messages total)
          },
        },
      });
      
      // Verify it belongs to the user (security check)
      if (conversation && conversation.userId !== actualUserId) {
        logger.warn('Session/user mismatch', { sessionId, actualUserId, conversationUserId: conversation.userId });
        conversation = null; // Reset to create new conversation
      }
    }

    if (!conversation) {
      // Find the most recent active conversation for this user
      conversation = await prisma.conversation.findFirst({
        where: {
          userId: actualUserId,
          status: ConversationStatus.active,
          channel: ConversationChannel.chat,
        },
        orderBy: { startedAt: 'desc' },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            take: 20,
          },
        },
      });
    }

    // Create new conversation if none exists
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: actualUserId,
          channel: ConversationChannel.chat,
          status: ConversationStatus.active,
          language,
          metadata: {
            source: 'website_chat',
            userAgent: request.headers.get('user-agent') || 'unknown',
          },
        },
        include: {
          messages: true,
        },
      });

      // Add system message for new conversations
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: MessageRole.system,
          content: SYSTEM_PROMPTS[language as 'en' | 'es'],
        },
      });
    }

    // Build message history for OpenAI
    const history = conversation.messages.map(msg => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));

    // Ensure system prompt is present
    if (!history.some(msg => msg.role === 'system')) {
      history.unshift({
        role: 'system',
        content: SYSTEM_PROMPTS[language as 'en' | 'es'],
      });
    }

    // Add user message to history
    history.push({ role: 'user', content: message });

    // Save user message to database
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: MessageRole.user,
        content: message,
        metadata: {
          language,
          timestamp: new Date().toISOString(),
        },
      },
    });

    // Sync user message to GHL
    await ghlChatSync.syncChatMessage({
      userId: actualUserId,
      sessionId: conversation.id,
      message,
      language: language as 'en' | 'es',
      isUserMessage: true,
      metadata: contactInfo,
    });

    // Check for common questions and provide quick responses
    const lowerMessage = message.toLowerCase();
    let quickResponse: string | null = null;

    if (
      lowerMessage.includes('consultation') ||
      lowerMessage.includes('consulta') ||
      lowerMessage.includes('appointment') ||
      lowerMessage.includes('cita')
    ) {
      quickResponse = COMMON_RESPONSES[language as 'en' | 'es'].consultation;
    } else if (
      lowerMessage.includes('fee') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('precio') ||
      lowerMessage.includes('costo')
    ) {
      quickResponse = COMMON_RESPONSES[language as 'en' | 'es'].fees;
    } else if (
      lowerMessage.includes('location') ||
      lowerMessage.includes('office') ||
      lowerMessage.includes('ubicación') ||
      lowerMessage.includes('oficina')
    ) {
      quickResponse = COMMON_RESPONSES[language as 'en' | 'es'].locations;
    } else if (
      lowerMessage.includes('emergency') ||
      lowerMessage.includes('urgent') ||
      lowerMessage.includes('emergencia') ||
      lowerMessage.includes('urgente')
    ) {
      quickResponse = COMMON_RESPONSES[language as 'en' | 'es'].emergency;
    }

    // Check for appointment booking intent
    const appointmentIntent = await appointmentBookingHandler.parseAppointmentIntent(
      message,
      language as 'en' | 'es'
    );

    // Store session data for appointment flow
    const metadata = conversation.metadata as { bookingFlow?: Record<string, unknown> } | null;
    const sessionData = {
      userId: actualUserId,
      sessionId: conversation.id,
      language,
      bookingFlow: metadata?.bookingFlow || {},
    };

    try {
      // DISABLED: Agent orchestrator and all fallbacks
      // Only use direct OpenAI implementation
      let agentResponse = null;

      let aiResponse: string;
      const metadata: Record<string, unknown> = {
        timestamp: new Date().toISOString(),
      };

      // If agent provided a response, use it
      if (agentResponse && agentResponse.agent !== 'orchestrator' && agentResponse.response) {
        aiResponse = agentResponse.response || '';
        metadata.agent = agentResponse.agent;
        metadata.actions = agentResponse.actions;
        metadata.suggestions = agentResponse.suggestions;

        // Handle agent handoffs
        if (agentResponse.handoff) {
          metadata.handoff = agentResponse.handoff;
        }
      } else {
        // Only use OpenAI - no fallbacks
        if (!hasOpenAI) {
          throw new Error('OpenAI API is not configured. Please check your API key.');
        }
        
        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
          messages: history as OpenAI.Chat.ChatCompletionMessageParam[],
          max_tokens: 500,
          temperature: 0.7
        });

        aiResponse =
          completion.choices[0]?.message?.content ||
          'I apologize, but I was unable to generate a response.';
        metadata.model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
      }

      // Format AI response for better readability
      const formattedResponse = formatAIResponse(aiResponse);
      
      // Add disclaimer only when discussing legal matters, not for greetings or info collection
      const disclaimer = LEGAL_DISCLAIMER[language as 'en' | 'es'];
      
      // Check if this is about legal content
      const isLegalDiscussion = 
        (message.toLowerCase().includes('law') ||
         message.toLowerCase().includes('legal') ||
         message.toLowerCase().includes('case') ||
         message.toLowerCase().includes('visa') ||
         message.toLowerCase().includes('immigration') ||
         message.toLowerCase().includes('injury') ||
         message.toLowerCase().includes('divorce') ||
         message.toLowerCase().includes('criminal') ||
         message.toLowerCase().includes('custody')) &&
        !message.toLowerCase().includes('hello') &&
        !message.toLowerCase().includes('hi') &&
        !message.toLowerCase().includes('name') &&
        !message.toLowerCase().includes('phone');
      
      // Only add disclaimer for actual legal discussions
      const responseWithDisclaimer =
        (formattedResponse.includes('not legal advice') || formattedResponse.includes('no es asesoramiento legal') || !isLegalDiscussion)
          ? formattedResponse
          : `${formattedResponse}\n\n*${disclaimer}*`;

      // Save assistant response to database
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: MessageRole.assistant,
          content: responseWithDisclaimer,
          metadata: {
            ...metadata,
            quickResponse: quickResponse || undefined,
          },
        },
      });

      // Sync assistant response to GHL
      await ghlChatSync.syncChatMessage({
        userId: actualUserId,
        sessionId: conversation.id,
        message: responseWithDisclaimer,
        language: language as 'en' | 'es',
        isUserMessage: false,
        metadata: { agent: metadata.agent },
      });

      // Update user's last active timestamp if authenticated
      if (session?.user?.id) {
        await prisma.user
          .update({
            where: { id: session.user.id },
            data: { lastActive: new Date() },
          })
          .catch(err => logger.error('Failed to update user last active:', err));
      }

      return NextResponse.json({
        response: responseWithDisclaimer,
        quickResponse: quickResponse || undefined,
        sessionId: conversation.id,
        userId: actualUserId,
        agent: metadata.agent,
        suggestions: metadata.suggestions,
        actions: metadata.actions,
        handoff: metadata.handoff,
      });
    } catch (error) {
      logger.error('Chat processing error:', errorToLogMeta(error));
      
      // Try to use simple chatbot as ultimate fallback
      let fallbackResponse: string;
      fallbackResponse = quickResponse || (language === 'es'
          ? 'Disculpa, tuve un problema al procesar tu mensaje. Por favor, intenta de nuevo o llámanos al 1-844-967-3536.'
          : 'I apologize, I had trouble processing your message. Please try again or call us at 1-844-967-3536.');

      // Save error message to conversation if it exists
      if (conversation) {
        await prisma.message
          .create({
            data: {
              conversationId: conversation.id,
              role: MessageRole.assistant,
              content: `${fallbackResponse}\n\n*${LEGAL_DISCLAIMER[language as 'en' | 'es']}*`,
              metadata: {
                error: true,
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
              },
            },
          })
          .catch(err => logger.error('Failed to save error message:', err));
      }

      // Return the fallback response
      return NextResponse.json({
        response: `${fallbackResponse}\n\n*${LEGAL_DISCLAIMER[language as 'en' | 'es']}*`,
        sessionId: conversation?.id,
        agent: 'simple-chatbot',
      });
    }
  } catch (error) {
    logger.error('Chat API error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Export POST handler with AI agent tracing
export const POST = withAIAgentTracing(handleChatPOST);

// GET endpoint to check health and optionally retrieve conversation history
async function handleChatGET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    // If no conversationId, return health check
    if (!conversationId) {
      return NextResponse.json({
        status: 'ok',
        apiKeyConfigured: !!process.env.OPENAI_API_KEY,
        message: 'Chat API is running',
      });
    }

    // Get session for authenticated requests
    const session = await getServerSession(authOptions);
    const prisma = getPrismaClient();

    // Retrieve conversation with messages
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            role: true,
            content: true,
            createdAt: true,
            metadata: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Check if user has access to this conversation
    if (
      session?.user?.id &&
      conversation.userId !== session.user.id &&
      session.user.role !== 'ADMIN'
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        status: conversation.status,
        language: conversation.language,
        startedAt: conversation.startedAt,
        endedAt: conversation.endedAt,
        messages: conversation.messages,
        user: conversation.user,
      },
    });
  } catch (error) {
    logger.error('Error retrieving conversation:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to retrieve conversation' }, { status: 500 });
  }
}

// Export GET handler with database tracing
export const GET = withDatabaseTracing(handleChatGET);

// DELETE endpoint to close/end a conversation
async function handleChatDELETE(request: NextRequest) {
  try {
    const { conversationId } = await request.json();

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const prisma = getPrismaClient();

    // Find the conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Check if user has permission to close this conversation
    if (
      session?.user?.id &&
      conversation.userId !== session.user.id &&
      session.user.role !== 'ADMIN'
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Close the conversation
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        status: ConversationStatus.closed,
        endedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Conversation closed successfully',
    });
  } catch (error) {
    logger.error('Error closing conversation:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to close conversation' }, { status: 500 });
  }
}

// Export DELETE handler with database tracing
export const DELETE = withDatabaseTracing(handleChatDELETE);
