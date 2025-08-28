import { NextRequest, NextResponse } from 'next/server';
import { enhancedVoiceUXSystem } from '@/services/retell/enhanced-voice-ux';
import { logger } from '@/lib/safe-logger';

/**
 * POST /api/voice/conversation - Initialize enhanced conversation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const conversation = await enhancedVoiceUXSystem.initializeConversation({
      agentId: body.agentId,
      userId: body.userId,
      language: body.language,
      metadata: body.metadata,
    });

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (error) {
    logger.error('Failed to initialize conversation', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to initialize conversation' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/voice/conversation - Update conversation context
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    await enhancedVoiceUXSystem.handleConversationUpdate({
      sessionId: body.sessionId,
      callId: body.callId,
      transcript: body.transcript,
      currentSpeaker: body.currentSpeaker,
    });

    return NextResponse.json({
      success: true,
      message: 'Conversation updated',
    });
  } catch (error) {
    logger.error('Failed to update conversation', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to update conversation' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';