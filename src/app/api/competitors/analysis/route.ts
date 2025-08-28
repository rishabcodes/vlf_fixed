import { NextRequest, NextResponse } from 'next/server';
import { competitorMonitoringSystem } from '@/lib/crewai/competitor-monitoring-system';
import { logger } from '@/lib/safe-logger';

/**
 * POST /api/competitors/analysis - Generate competitive analysis report
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { period = 'monthly', competitorIds = [] } = body;

    logger.info('Generating competitive analysis', { period, competitorIds });

    const analysis = await competitorMonitoringSystem.generateCompetitiveAnalysis(period);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    logger.error('Failed to generate competitive analysis', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to generate competitive analysis' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
