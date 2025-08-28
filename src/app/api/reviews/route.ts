import { NextRequest, NextResponse } from 'next/server';
import { reviewAggregator } from '@/services/reviews/review-aggregator';
import { logger } from '@/lib/safe-logger';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50); // Max 50 per page
    const source = searchParams.get('source') as 'google' | undefined;
    const refresh = searchParams.get('refresh') === 'true';

    // Validate page and limit
    if (page < 1 || limit < 1) {
      return NextResponse.json({ error: 'Invalid page or limit parameters' }, { status: 400 });
    }

    // Force refresh if requested
    if (refresh) {
      logger.info('Forcing review refresh via API');
      await reviewAggregator.refreshReviews();
    }

    // Get reviews with pagination
    const result = await reviewAggregator.getReviews(page, limit, source);

    // Add service status
    const serviceStatus = reviewAggregator.getServiceStatus();

    return NextResponse.json({
      ...result,
      serviceStatus,
      requestedAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to fetch reviews via API', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
        serviceStatus: reviewAggregator.getServiceStatus(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action === 'refresh') {
      logger.info('Refreshing reviews via API POST request');
      const result = await reviewAggregator.refreshReviews();

      return NextResponse.json({
        message: 'Reviews refreshed successfully',
        summary: result.summary,
        lastUpdated: result.lastUpdated,
        serviceStatus: reviewAggregator.getServiceStatus(),
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    logger.error('Failed to process review API POST request', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
