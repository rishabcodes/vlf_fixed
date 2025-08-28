import { NextRequest, NextResponse } from 'next/server';
import { voiceAnalyticsSystem } from '@/services/retell/voice-analytics';
import { logger } from '@/lib/safe-logger';

/**
 * GET /api/voice/analytics - Get comprehensive voice analytics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const startDate = searchParams.get('startDate') 
      ? new Date(searchParams.get('startDate')!)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
      
    const endDate = searchParams.get('endDate')
      ? new Date(searchParams.get('endDate')!)
      : new Date();
      
    const agentId = searchParams.get('agentId') || undefined;
    const practiceArea = searchParams.get('practiceArea') || undefined;

    const analytics = await voiceAnalyticsSystem.generateAnalytics({
      startDate,
      endDate,
      agentId,
      practiceArea,
    });

    const recommendations = await voiceAnalyticsSystem.generateOptimizationRecommendations(analytics);

    return NextResponse.json({
      success: true,
      analytics,
      recommendations,
    });
  } catch (error) {
    logger.error('Failed to generate voice analytics', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to generate analytics' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/voice/analytics/call - Analyze specific call
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.callId) {
      return NextResponse.json(
        { success: false, error: 'Call ID is required' },
        { status: 400 }
      );
    }

    const insights = await voiceAnalyticsSystem.analyzeCall(body.callId);

    return NextResponse.json({
      success: true,
      insights,
    });
  } catch (error) {
    logger.error('Failed to analyze call', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to analyze call' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';