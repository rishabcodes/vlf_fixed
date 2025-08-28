import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { securityMonitor } from '@/services/security/security-monitor';
import { z } from 'zod';

// GET /api/security/monitoring - Get security monitoring status
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = _request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || '24h';
    const severity = searchParams.get('severity');

    const [status, threats, audit] = await Promise.all([
      securityMonitor.getMonitoringStatus(),
      securityMonitor.getThreats({
        timeframe,
        severity: severity as any,
      }),
      securityMonitor.performSecurityAudit(),
    ]);

    return NextResponse.json({
      success: true,
      monitoring: status,
      threats,
      audit,
    });
  } catch (error) {
    logger.error('Failed to get security monitoring data:', error);
    return NextResponse.json({ error: 'Failed to get monitoring data' }, { status: 500 });
  }
}

// POST /api/security/monitoring/start - Start security monitoring
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const schema = z.object({
      action: z.enum(['start', 'stop', 'restart']),
      detectorIds: z.array(z.string()).optional(),
    });

    const validatedData = schema.parse(body);

    switch (validatedData.action) {
      case 'start':
        await securityMonitor.startMonitoring(validatedData.detectorIds);
        break;
      case 'stop':
        await securityMonitor.stopMonitoring();
        break;
      case 'restart':
        await securityMonitor.stopMonitoring();
        await securityMonitor.startMonitoring(validatedData.detectorIds);
        break;
    }

    return NextResponse.json({
      success: true,
      message: `Security monitoring ${validatedData.action}ed successfully`,
    });
  } catch (error) {
    logger.error('Failed to control security monitoring:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to control monitoring' }, { status: 500 });
  }
}

// PUT /api/security/monitoring/respond - Respond to security threat
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const schema = z.object({
      threatId: z.string(),
      action: z.enum(['acknowledge', 'resolve', 'escalate', 'ignore']),
      notes: z.string().optional(),
    });

    const validatedData = schema.parse(body);

    await securityMonitor.respondToThreat(
      validatedData.threatId,
      validatedData.action,
      validatedData.notes
    );

    return NextResponse.json({
      success: true,
      message: 'Threat response recorded successfully',
    });
  } catch (error) {
    logger.error('Failed to respond to threat:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to respond to threat' }, { status: 500 });
  }
}
