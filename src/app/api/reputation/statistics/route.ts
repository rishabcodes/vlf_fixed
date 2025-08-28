import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { reviewHarvester } from '@/services/reputation-management/review-harvester';
import { reputationMonitor } from '@/services/reputation-management/reputation-monitor';

// GET /api/reputation/statistics - Get reputation statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const platformId = searchParams.get('platformId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const params: any = {};
    if (platformId) params.platformId = platformId;
    if (startDate) params.startDate = new Date(startDate);
    if (endDate) params.endDate = new Date(endDate);

    const [statistics, report] = await Promise.all([
      reviewHarvester.getStatistics(params),
      reputationMonitor.generateReputationReport(),
    ]);

    return NextResponse.json({ 
      success: true, 
      statistics,
      report,
    });
  } catch (error) {
    logger.error('Failed to get reputation statistics:', error);
    return NextResponse.json(
      { error: 'Failed to get statistics' },
      { status: 500 }
    );
  }
}
