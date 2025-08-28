import { NextRequest, NextResponse } from 'next/server';
import { getChatSocketServer } from '@/lib/socket/server';
import { logger, securityLogger } from '@/lib/safe-logger';
import { createErrorLogMeta } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type {
  SocketHealthResponse,
  SocketHealthCheck,
  AdminSocketHealthResponse,
} from '@/types/api';

// Health check endpoint specifically for the Socket.IO server
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Get detailed health status from socket server
    const socketServer = getChatSocketServer();
    const healthStatus = socketServer.getHealthStatus();

    // Add response time to health check
    const responseTime = Date.now() - startTime;

    // Enhanced health check with additional system info
    const enhancedHealth: SocketHealthResponse = {
      ...healthStatus,
      responseTime,
      endpoint: 'socket-health',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        socket_server: healthStatus.status === 'healthy' ? 'pass' : 'fail',
        response_time: responseTime < 1000 ? 'pass' : 'warn',
        memory_usage: (() => {
          const system = healthStatus.details.system as Record<string, unknown>;
          const memory = system?.memory as { heapUsed?: number; heapTotal?: number };
          if (memory?.heapUsed && memory?.heapTotal) {
            return memory.heapUsed / memory.heapTotal < 0.9 ? 'pass' : 'warn';
          }
          return 'unknown';
        })(),
        circuit_breakers: healthStatus.details.circuitBreakers
          ? Object.values(
              healthStatus.details.circuitBreakers as Record<string, { status: string }>
            ).every(cb => cb.status === 'closed')
            ? 'pass'
            : 'warn'
          : 'unknown',
      } satisfies SocketHealthCheck,
    };

    // Log health check
    logger.info('Socket health check', {
      status: healthStatus.status,
      responseTime,
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || 'unknown',
    });

    // Return appropriate HTTP status based on health
    const httpStatus =
      healthStatus.status === 'healthy' ? 200 : healthStatus.status === 'degraded' ? 200 : 503;

    return NextResponse.json(enhancedHealth, { status: httpStatus });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    logger.error(
      'Socket health check failed',
      createErrorLogMeta(error, {
        responseTime,
        userAgent: request.headers.get('user-agent'),
        ip: request.ip || 'unknown',
      })
    );

    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        responseTime,
        endpoint: 'socket-health',
        timestamp: Date.now(),
      },
      { status: 503 }
    );
  }
}

// Admin-only detailed health endpoint
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user || (session.user as { role?: string }).role !== 'ADMIN') {
      securityLogger.accessDenied(
        'admin_health_check',
        session?.user?.id,
        'insufficient_permissions'
      );

      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Admin access required',
        },
        { status: 403 }
      );
    }

    const socketServer = getChatSocketServer();
    const responseTime = Date.now() - startTime;

    // Get comprehensive system information
    const dashboardData = socketServer.getDashboardData();
    const connectionsData = socketServer.getConnectionsData();
    const metricsHistory = socketServer.getMetricsHistory();
    const adminCommandHistory = socketServer.getAdminCommandHistory();
    const alertConfigs = Array.from(socketServer.getAlertConfigs().entries());

    const detailedHealth: AdminSocketHealthResponse = {
      ...dashboardData,
      status: (dashboardData.status as 'healthy' | 'degraded' | 'unhealthy') || 'healthy', // Ensure status is always present
      responseTime,
      endpoint: 'admin-socket-health',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {} as SocketHealthCheck, // Will be populated by spread operator
      requestedBy: session.user.id!,
      connections: {
        summary: dashboardData.connections,
        detailed: connectionsData,
      },
      metrics: {
        current: dashboardData.system,
        history: metricsHistory,
      },
      admin: {
        commandHistory: adminCommandHistory.slice(-50), // Last 50 commands
        alertConfigs,
      },
      performance: {
        errorRate: socketServer.getErrorRate(),
        uptime: socketServer.getUptime(),
        performanceMetrics: Object.fromEntries(socketServer.getPerformanceMetrics()),
      },
    };

    // Log admin health check
    logger.info('Admin socket health check', {
      adminId: session.user.id,
      responseTime,
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || 'unknown',
    });

    return NextResponse.json(detailedHealth, { status: 200 });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    logger.error(
      'Admin socket health check failed',
      createErrorLogMeta(error, {
        responseTime,
        userAgent: request.headers.get('user-agent'),
        ip: request.ip || 'unknown',
      })
    );

    return NextResponse.json(
      {
        status: 'error',
        error: 'Admin health check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        responseTime,
        endpoint: 'admin-socket-health',
        timestamp: Date.now(),
      },
      { status: 500 }
    );
  }
}
