import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { gmbManager } from '@/services/gmb-optimization/gmb-manager';

// GET /api/gmb/automation - Get automation status
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      status: 'active', // This would be tracked in the manager
      lastRun: new Date().toISOString(),
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    logger.error('Failed to get automation status:', error);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}

// POST /api/gmb/automation - Control automation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    if (!['start', 'stop', 'restart'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be start, stop, or restart' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'start':
        await gmbManager.startAutomation();
        break;
      case 'stop':
        await gmbManager.stopAutomation();
        break;
      case 'restart':
        await gmbManager.stopAutomation();
        await gmbManager.startAutomation();
        break;
    }

    return NextResponse.json({
      success: true,
      message: `GMB automation ${action}ed successfully`,
    });
  } catch (error) {
    logger.error('Failed to control automation:', error);
    return NextResponse.json({ error: 'Failed to control automation' }, { status: 500 });
  }
}
