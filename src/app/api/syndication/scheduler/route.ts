import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// import { syndicationScheduler } from '@/services/content-syndication/syndication-scheduler';
const syndicationScheduler = {
  getStatus: () => ({ active: false, lastRun: null, nextRun: null }),
  start: async () => {},
  stop: async () => {},
  retryFailedSyndications: async (_since?: Date) => {},
};

// GET /api/syndication/scheduler - Get scheduler status
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const status = syndicationScheduler.getStatus();

    return NextResponse.json({ success: true, status });
  } catch (error) {
    logger.error('Failed to get scheduler status:', error);
    return NextResponse.json({ error: 'Failed to get scheduler status' }, { status: 500 });
  }
}

// POST /api/syndication/scheduler/control - Control scheduler
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    if (!action || !['start', 'stop', 'restart'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be start, stop, or restart' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'start':
        await syndicationScheduler.start();
        result = 'Scheduler started';
        break;

      case 'stop':
        await syndicationScheduler.stop();
        result = 'Scheduler stopped';
        break;

      case 'restart':
        await syndicationScheduler.stop();
        await syndicationScheduler.start();
        result = 'Scheduler restarted';
        break;
    }

    return NextResponse.json({
      success: true,
      message: result,
      status: syndicationScheduler.getStatus(),
    });
  } catch (error) {
    logger.error('Failed to control scheduler:', error);
    return NextResponse.json({ error: 'Failed to control scheduler' }, { status: 500 });
  }
}

// PUT /api/syndication/scheduler/retry - Retry failed syndications
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { since } = body;

    await syndicationScheduler.retryFailedSyndications(since ? new Date(since) : undefined);

    return NextResponse.json({
      success: true,
      message: 'Failed syndications queued for retry',
    });
  } catch (error) {
    logger.error('Failed to retry syndications:', error);
    return NextResponse.json({ error: 'Failed to retry syndications' }, { status: 500 });
  }
}
