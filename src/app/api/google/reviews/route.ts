import { NextRequest, NextResponse } from 'next/server';
import { reviewAggregator } from '@/services/reviews/review-aggregator';
import { logger } from '@/lib/safe-logger';

// Force dynamic rendering since we might need headers or search params
// GET /api/google/reviews - Get Google reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    // Refresh parameter available for future use
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _refresh = searchParams.get('refresh') === 'true';

    // Validate parameters
    if (page < 1 || limit < 1) {
      return NextResponse.json({ error: 'Invalid page or limit parameters' }, { status: 400 });
    }

    // Get Google reviews specifically
    const result = await reviewAggregator.getReviews(page, limit, 'google');

    return NextResponse.json({
      success: true,
      ...result,
      source: 'google',
      requestedAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to fetch Google reviews', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json({ error: 'Failed to fetch Google reviews' }, { status: 500 });
  }
}
