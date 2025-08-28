import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getPrismaClient } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';

export const runtime = 'nodejs';
// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// AILA-specific system prompt incorporating immigration law expertise
const AILA_SYSTEM_PROMPT = `You are an AI assistant trained with AILA (American Immigration Lawyers Association) best practices and immigration law expertise for Vasquez Law Firm.

Your specialized knowledge includes:
1. Removal Defense and Immigration Court Proceedings
2. Asylum and Refugee Law
3. Family-Based Immigration (I-130, I-485)
4. Employment-Based Immigration (PERM, EB categories)
5. VAWA and U-Visa protections
6. Citizenship and Naturalization
7. Waivers and Appeals (I-601, I-601A, BIA appeals)
8. DACA and TPS programs

Key capabilities:
- Analyze immigration documents and identify issues
- Provide step-by-step guidance on immigration processes
- Explain complex immigration laws in simple terms
- Identify red flags and potential complications
- Suggest appropriate legal strategies
- Calculate priority dates and visa bulletin interpretations

IMPORTANT: 
- Always include disclaimers about providing information, not legal advice
- Recommend consultation for case-specific analysis
- Stay current with latest USCIS, DOL, and DHS policies
- Be culturally sensitive and provide bilingual support

For document analysis:
- Identify document types (I-94, I-797, etc.)
- Check for completeness and potential issues
- Suggest missing documents
- Explain document purposes and requirements`;

const AILA_SYSTEM_PROMPT_ES = `Eres un asistente de IA entrenado con las mejores prácticas de AILA (Asociación Americana de Abogados de Inmigración) y experiencia en derecho migratorio para Vasquez Law Firm.

Tu conocimiento especializado incluye:
1. Defensa de Remoción y Procedimientos en Corte de Inmigración
2. Asilo y Ley de Refugiados
3. Inmigración Familiar (I-130, I-485)
4. Inmigración por Empleo (PERM, categorías EB)
5. Protecciones VAWA y Visa U
6. Ciudadanía y Naturalización
7. Perdones y Apelaciones (I-601, I-601A, apelaciones BIA)
8. Programas DACA y TPS

Capacidades clave:
- Analizar documentos de inmigración e identificar problemas
- Proporcionar orientación paso a paso sobre procesos migratorios
- Explicar leyes de inmigración complejas en términos simples
- Identificar señales de alerta y posibles complicaciones
- Sugerir estrategias legales apropiadas
- Calcular fechas de prioridad e interpretar boletines de visa

IMPORTANTE:
- Siempre incluir descargos sobre proporcionar información, no asesoría legal
- Recomendar consulta para análisis específico del caso
- Mantenerse actualizado con las últimas políticas de USCIS, DOL y DHS
- Ser culturalmente sensible y proporcionar apoyo bilingüe

Para análisis de documentos:
- Identificar tipos de documentos (I-94, I-797, etc.)
- Verificar integridad y posibles problemas
- Sugerir documentos faltantes
- Explicar propósitos y requisitos de documentos`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, locale = 'en', sessionId, userId, metadata } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Use AILA-specific system prompt based on locale
    const systemPrompt = locale === 'es' ? AILA_SYSTEM_PROMPT_ES : AILA_SYSTEM_PROMPT;

    // Check if this is a document analysis request
    const isDocumentAnalysis =
      metadata?.hasDocument ||
      message.toLowerCase().includes('document') ||
      message.toLowerCase().includes('documento');

    // Enhanced prompt for document analysis
    const enhancedMessage = isDocumentAnalysis
      ? `${message}\n\nPlease analyze this from an immigration law perspective and identify any issues or required actions.`
      : message;

    // Generate response using OpenAI with AILA expertise
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: enhancedMessage },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse =
      completion.choices[0]?.message?.content || 'I apologize, I could not generate a response.';

    // Log the interaction
    logger.info('AILA chat response generated', {
      sessionId,
      locale,
      messageLength: message.length,
      responseLength: aiResponse.length,
      isDocumentAnalysis,
    });

    // Store conversation in database if userId provided
    if (userId) {
      try {
        const prisma = getPrismaClient();
        await prisma.conversation.create({
          data: {
            userId,
            channel: 'chat',
            status: 'active',
            metadata: {
              locale,
              agent: 'AILA',
              ...metadata,
            },
            messages: {
              create: [
                {
                  content: message,
                  role: 'user',
                  metadata: { locale },
                },
                {
                  content: aiResponse,
                  role: 'assistant',
                  metadata: {
                    locale,
                    agent: 'AILA',
                    model: 'gpt-4-turbo-preview',
                  },
                },
              ],
            },
          },
        });
      } catch (dbError) {
        logger.error('Failed to store AILA conversation', { error: dbError });
      }
    }

    return NextResponse.json({
      response: aiResponse,
      metadata: {
        agent: 'AILA',
        locale,
        timestamp: new Date().toISOString(),
        capabilities: ['immigration-law', 'document-analysis', 'bilingual', 'case-strategy'],
      },
    });
  } catch (error) {
    logger.error('AILA chat API error', { error });
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
