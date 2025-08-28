import { NextRequest, NextResponse } from 'next/server';
import { competitorMonitoringSystem } from '@/lib/crewai/competitor-monitoring-system';
import { logger } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
// Authentication would be handled at the middleware level

/**
 * GET /api/competitors - List all competitors
 */
export async function GET(_request: NextRequest) {
  try {
    const competitors = await prisma.competitor.findMany({
      orderBy: { name: 'asc' },
      include: {
        analyses: {
          take: 1,
          orderBy: { analyzedAt: 'desc' },
          select: {
            analyzedAt: true,
            blogPosts: true,
          },
        },
        _count: {
          select: { analyses: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      competitors,
    });
  } catch (error) {
    logger.error('Failed to fetch competitors', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to fetch competitors' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/competitors - Register new competitor
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.website) {
      return NextResponse.json(
        { success: false, error: 'Name and website are required' },
        { status: 400 }
      );
    }

    // Register with monitoring system
    await competitorMonitoringSystem.registerCompetitor(body);

    // Store in database
    const competitor = await prisma.competitor.create({
      data: {
        name: body.name,
        website: body.website,
        domain: body.domain || new URL(body.website).hostname,
        practiceAreas: body.practiceAreas || [],
        locations: body.locations || [],
        checkFrequency: body.checkFrequency || 'weekly',
        isActive: body.isActive !== false,
        monitoringConfig: body.monitoringConfig || {
          enabled: true,
          frequency: 'daily',
          priority: 'medium',
          trackContent: true,
          trackRankings: true,
          trackSocial: true,
          trackAds: true,
          trackReviews: true,
        },
        metadata: body.metadata || {
          socialMedia: body.socialMedia || {},
        },
      },
    });

    logger.info('Competitor registered', {
      competitorId: competitor.id,
      name: competitor.name,
    });

    return NextResponse.json({
      success: true,
      competitor,
    });
  } catch (error) {
    logger.error('Failed to register competitor', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to register competitor' },
      { status: 500 }
    );
  }
}

// Apply authentication middleware
export const runtime = 'nodejs';
