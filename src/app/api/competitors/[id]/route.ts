import { NextRequest, NextResponse } from 'next/server';
// import { competitorMonitoringSystem } from '@/lib/crewai/competitor-monitoring-system';
import { logger } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/competitors/[id] - Get competitor details
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const competitor = await prisma.competitor.findUnique({
      where: { id: params.id },
    });

    if (!competitor) {
      return NextResponse.json({ success: false, error: 'Competitor not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      competitor,
    });
  } catch (error) {
    logger.error('Failed to fetch competitor', { error, competitorId: params.id });
    return NextResponse.json(
      { success: false, error: 'Failed to fetch competitor' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/competitors/[id] - Update competitor
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();

    const competitor = await prisma.competitor.update({
      where: { id: params.id },
      data: {
        name: body.name,
        website: body.website,
        domain: body.domain || body.website,
        practiceAreas: body.practiceAreas,
        locations: body.locations,
        checkFrequency: body.checkFrequency,
        isActive: body.isActive,
        monitoringConfig: body.monitoringConfig || {},
        metadata: body.metadata || {},
      },
    });

    logger.info('Competitor updated', {
      competitorId: competitor.id,
      name: competitor.name,
    });

    return NextResponse.json({
      success: true,
      competitor,
    });
  } catch (error) {
    logger.error('Failed to update competitor', { error, competitorId: params.id });
    return NextResponse.json(
      { success: false, error: 'Failed to update competitor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/competitors/[id] - Delete competitor
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.competitor.delete({
      where: { id: params.id },
    });

    logger.info('Competitor deleted', { competitorId: params.id });

    return NextResponse.json({
      success: true,
      message: 'Competitor deleted successfully',
    });
  } catch (error) {
    logger.error('Failed to delete competitor', { error, competitorId: params.id });
    return NextResponse.json(
      { success: false, error: 'Failed to delete competitor' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
