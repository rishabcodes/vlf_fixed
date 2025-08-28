import { NextRequest, NextResponse } from 'next/server';
import { ContentScheduler } from '@/services/content-factory/content-scheduler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/safe-logger';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'ATTORNEY'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get date range from query params
    const searchParams = request.nextUrl.searchParams;
    const startParam = searchParams.get('start');
    const startDate = startParam ? new Date(startParam) : new Date();

    const endParam = searchParams.get('end');
    const endDate = endParam ? new Date(endParam) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    logger.info('Fetching content calendar', {
      userId: session.user.id,
      startDate,
      endDate,
    });

    // Get publishing calendar
    const scheduler = new ContentScheduler();
    const calendar = await scheduler.getPublishingCalendar(startDate, endDate);

    return NextResponse.json({
      success: true,
      calendar,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  } catch (error) {
    logger.error('Failed to fetch content calendar', { error });

    return NextResponse.json(
      {
        error: 'Failed to fetch calendar',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
