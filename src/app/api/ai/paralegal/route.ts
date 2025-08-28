import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { safeStreamOperations } from '@/lib/stream-polyfill';

// Use Node.js runtime instead of edge for better compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const systemPrompt = `You are a professional virtual paralegal assistant for Vasquez Law Firm. 
You help potential clients understand their legal options and guide them to the right resources.

Key Information:
- Vasquez Law Firm specializes in Immigration, Personal Injury, Criminal Defense, and Workers' Compensation
- Founded by William Vasquez, a U.S. Air Force veteran
- "YO PELEO POR TI™" (I Fight For You) is our motto
- 4 office locations: Raleigh, Charlotte, Winston-Salem, and Orlando
- 60+ years of experience, 10,000+ cases won
- Bilingual services (English/Spanish)
- Free consultations available
- 24/7 availability for emergencies

Guidelines:
1. Be professional, empathetic, and helpful
2. Provide general legal information, not specific legal advice
3. Always recommend scheduling a free consultation for specific cases
4. If emergency (detained, court tomorrow, etc.), emphasize calling immediately: (855) 929-6299
5. Respond in the same language as the user (English or Spanish)
6. Be concise but thorough
7. Show understanding of their situation`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { messages } = await req.json();

    // Import AI SDK
    const { openai } = await import('@ai-sdk/openai');
    const { streamText } = await import('ai');

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    // Get the stream and headers
    const stream = result.toDataStream();

    // Return streaming response with proper headers
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    logger.error('Paralegal API error:', error);

    // Return a proper error response
    return NextResponse.json(
      {
        error: 'Error processing request',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
