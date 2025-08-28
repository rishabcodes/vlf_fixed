import { NextRequest, NextResponse } from 'next/server';
import { reviewAggregator } from '@/services/reviews/review-aggregator';
import { logger } from '@/lib/safe-logger';

// Force dynamic rendering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Parse query parameters
    const days = Math.min(parseInt(searchParams.get('days') || '30'), 365); // Max 1 year

    // Validate days parameter
    if (days < 1) {
      return NextResponse.json({ error: 'Invalid days parameter' }, { status: 400 });
    }

    // Get recent reviews
    const reviews = await reviewAggregator.getRecentReviews(days);

    // Get service status
    const serviceStatus = reviewAggregator.getServiceStatus();

    return NextResponse.json({
      reviews,
      count: reviews.length,
      days,
      serviceStatus,
      requestedAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to fetch recent reviews via API', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      {
        error: 'Failed to fetch recent reviews',
        serviceStatus: reviewAggregator.getServiceStatus(),
      },
      { status: 500 }
    );
  }
}
