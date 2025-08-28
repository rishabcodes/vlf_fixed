import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { analyticsEngine } from '@/lib/analytics/core/analytics-engine';

// GET /api/analytics/realtime - Get real-time metrics
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const metrics = await analyticsEngine.getRealTimeMetrics();

    return NextResponse.json({
      success: true,
      metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to get real-time analytics:', error);
    return NextResponse.json({ error: 'Failed to get real-time analytics' }, { status: 500 });
  }
}
