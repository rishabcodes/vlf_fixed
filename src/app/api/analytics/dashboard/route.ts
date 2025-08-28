import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { analyticsEngine } from '@/lib/analytics/core/analytics-engine';
import { z } from 'zod';

const QuerySchema = z.object({
  timeRange: z.enum(['1h', '24h', '7d', '30d', '90d']).default('24h'),
  granularity: z.enum(['hour', 'day', 'week', 'month']).optional(),
});

// GET /api/analytics/dashboard - Get dashboard metrics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const timeRangeParam = searchParams.get('timeRange') || '24h';
    const granularityParam = searchParams.get('granularity');

    const { timeRange, granularity } = QuerySchema.parse({
      timeRange: timeRangeParam,
      granularity: granularityParam,
    });

    // Convert time range to actual dates
    const end = new Date();
    const start = new Date();
    
    switch (timeRange) {
      case '1h':
        start.setHours(start.getHours() - 1);
        break;
      case '24h':
        start.setDate(start.getDate() - 1);
        break;
      case '7d':
        start.setDate(start.getDate() - 7);
        break;
      case '30d':
        start.setDate(start.getDate() - 30);
        break;
      case '90d':
        start.setDate(start.getDate() - 90);
        break;
    }

    const timeRangeObj = {
      start,
      end,
      granularity: granularity || (timeRange === '1h' ? 'hour' : timeRange === '24h' ? 'hour' : 'day'),
    };

    const metrics = await analyticsEngine.getDashboardMetrics(timeRangeObj);

    return NextResponse.json({
      success: true,
      metrics,
      timeRange: {
        start: start.toISOString(),
        end: end.toISOString(),
        granularity: timeRangeObj.granularity,
      },
    });
  } catch (error) {
    logger.error('Failed to get dashboard analytics:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid query parameters', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}

// POST /api/analytics/dashboard - Export dashboard data
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const schema = z.object({
      timeRange: z.object({
        start: z.string().transform(str => new Date(str)),
        end: z.string().transform(str => new Date(str)),
        granularity: z.enum(['hour', 'day', 'week', 'month']),
      }),
      format: z.enum(['json', 'csv']).default('json'),
    });

    const { timeRange, format } = schema.parse(body);

    const exportData = await analyticsEngine.exportMetrics(timeRange, format);

    const headers: Record<string, string> = {
      'Content-Type': format === 'json' ? 'application/json' : 'text/csv',
      'Content-Disposition': `attachment; filename="analytics-${Date.now()}.${format}"`,
    };

    return new Response(exportData, { headers });
  } catch (error) {
    logger.error('Failed to export analytics:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid export parameters', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to export analytics' },
      { status: 500 }
    );
  }
}
