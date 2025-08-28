import { NextRequest, NextResponse } from 'next/server';
import { competitorMonitoringSystem } from '@/lib/crewai/competitor-monitoring-system';
import { logger } from '@/lib/safe-logger';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * POST /api/competitors/[id]/check - Manually trigger competitor activity check
 */
export async function POST(_request: NextRequest, { params }: RouteParams) {
  try {
    logger.info('Manual competitor check triggered', { competitorId: params.id });

    // Trigger immediate check
    await competitorMonitoringSystem.checkCompetitorActivity(params.id);

    return NextResponse.json({
      success: true,
      message: 'Competitor activity check initiated',
      competitorId: params.id,
    });
  } catch (error) {
    logger.error('Failed to check competitor activity', {
      error,
      competitorId: params.id,
    });

    return NextResponse.json(
      { success: false, error: 'Failed to check competitor activity' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
