import { NextRequest, NextResponse } from 'next/server';
import { enhancedVoiceUXSystem } from '@/services/retell/enhanced-voice-ux';
import { voiceAnalyticsSystem } from '@/services/retell/voice-analytics';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
// Authentication would be handled at the middleware level

/**
 * POST /api/voice/enhanced - Create enhanced voice agent
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const agent = await enhancedVoiceUXSystem.createEnhancedVoiceAgent({
      name: body.name,
      practiceArea: body.practiceArea,
      language: body.language || 'en',
      personality: body.personality || 'professional',
      uxConfig: body.uxConfig,
    });

    return NextResponse.json({
      success: true,
      agent,
    });
  } catch (error) {
    logger.error('Failed to create enhanced voice agent', errorToLogMeta(error));
    return NextResponse.json(
      { success: false, error: 'Failed to create voice agent' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/voice/enhanced - Get voice analytics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get('period') as 'daily' | 'weekly' | 'monthly') || 'weekly';
    const agentId = searchParams.get('agentId') || undefined;

    const report = await voiceAnalyticsSystem.generatePerformanceReport({
      period,
      agentId,
    });

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    logger.error('Failed to generate voice analytics', errorToLogMeta(error));
    return NextResponse.json(
      { success: false, error: 'Failed to generate analytics' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
