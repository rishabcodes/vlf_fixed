import { NextResponse } from 'next/server';
import { reviewAggregator } from '@/services/reviews/review-aggregator';

export async function GET() {
  try {
    const serviceStatus = reviewAggregator.getServiceStatus();

    return NextResponse.json({
      status: 'ok',
      services: serviceStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
