import { NextRequest, NextResponse } from 'next/server';
import { getChatSocketServer } from '@/lib/socket/server';
import { logger, securityLogger } from '@/lib/safe-logger';
import { createErrorLogMeta, errorToLogMeta } from '@/lib/safe-logger';
import { z } from 'zod';
import type {
  AdminAuthResult,
  AdminAuthError,
  AdminActionRequest,
  AdminActionResult,
  AdminConfigRequest,
} from '@/types/api';

// Validation schemas
const AlertConfigSchema = z.object({
  metric: z.string(),
  threshold: z.number(),
  comparison: z.enum(['gt', 'lt', 'eq']),
  duration: z.number(),
  enabled: z.boolean(),
});

const RateLimitSchema = z.object({
  userId: z.string().optional(),
  socketId: z.string().optional(),
  maxMessages: z.number(),
  windowMs: z.number(),
});

// Admin authentication helper
async function verifyAdminAccess(request: NextRequest): Promise<AdminAuthResult | AdminAuthError> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing authorization header', status: 401 };
  }

  // For now, simple admin token check - replace with your auth system
  const token = authHeader.slice(7);

  // TODO: Implement proper JWT verification with admin role check
  if (token !== process.env.ADMIN_TOKEN) {
    securityLogger.accessDenied('admin_socket_api', 'unknown', 'invalid_token');
    return { error: 'Invalid admin token', status: 403 };
  }

  return {
    user: { id: 'admin', email: 'admin@example.com' },
    role: 'SUPER_ADMIN',
  };
}

// GET: Socket server status and metrics
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const socketServer = getChatSocketServer();
    const url = new URL(request.url);
    const detailed = url.searchParams.get('detailed') === 'true';
    const metrics = url.searchParams.get('metrics') === 'true';

    if (detailed) {
      // Detailed health with all metrics
      const status = socketServer.getHealthStatus();
      const metricsData = socketServer.getMetricsData();
      return NextResponse.json({ ...status, metrics: metricsData });
    } else if (metrics) {
      // Just metrics data
      const metricsData = socketServer.getMetricsData();
      return NextResponse.json(metricsData);
    } else {
      // Basic status
      const status = socketServer.getHealthStatus();
      return NextResponse.json(status);
    }
  } catch (error) {
    logger.error(
      'Admin socket status check failed',
      createErrorLogMeta(error, {
        userAgent: request.headers.get('user-agent'),
        ip: request.ip || 'unknown',
      })
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get socket status',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST: Execute admin commands
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = (await request.json()) as AdminActionRequest;
    const { action, data } = body;

    const socketServer = getChatSocketServer();
    const result: AdminActionResult = { success: true };

    switch (action) {
      case 'execute_command':
        // Admin commands should be executed via socket connection, not REST API
        // const command = AdminCommandSchema.parse(data);
        // Commands need to be sent via socket.emit('admin:command', command)
        result.success = false;
        result.message = 'Admin commands must be executed via WebSocket connection';
        break;

      case 'configure_alert':
        const alertConfig = AlertConfigSchema.parse(data);
        socketServer.configureCustomAlert(alertConfig);
        result.message = `Alert configured for metric: ${alertConfig.metric}`;
        break;

      case 'set_rate_limit':
        const rateLimitConfig = RateLimitSchema.parse(data);
        socketServer.setCustomRateLimit(
          { userId: rateLimitConfig.userId, socketId: rateLimitConfig.socketId },
          rateLimitConfig.maxMessages,
          rateLimitConfig.windowMs
        );
        result.message = 'Rate limit configured successfully';
        break;

      case 'reset_circuit_breaker':
        const service = (data as { service: string })?.service as
          | 'database'
          | 'aiService'
          | 'retell';
        if (!['database', 'aiService', 'retell'].includes(service)) {
          throw new Error('Invalid service for circuit breaker reset');
        }
        socketServer.resetCircuitBreaker(service);
        result.message = `Circuit breaker reset for ${service}`;
        break;

      case 'set_maintenance_mode':
        const { enabled, message } = data as { enabled: boolean; message?: string };
        socketServer.setMaintenanceMode(enabled, message);
        result.message = `Maintenance mode ${enabled ? 'enabled' : 'disabled'}`;
        break;

      case 'force_disconnect_user':
        const { userId, reason } = data as { userId?: string; reason?: string };
        if (!userId) {
          throw new Error('userId is required');
        }
        await socketServer.forceDisconnectUser(userId, reason || 'Disconnected by admin');
        result.message = `User ${userId} disconnected`;
        break;

      case 'force_disconnect_socket':
        const { socketId, reason: socketReason } = data as { socketId?: string; reason?: string };
        if (!socketId) {
          throw new Error('socketId is required');
        }
        await socketServer.forceDisconnectSocket(socketId, socketReason || 'Disconnected by admin');
        result.message = `Socket ${socketId} disconnected`;
        break;

      case 'get_connections':
        result.data = socketServer.getConnectionsData();
        break;

      case 'get_metrics_history':
        result.data = socketServer.getMetricsHistory();
        break;

      case 'get_command_history':
        result.data = socketServer.getAdminCommandHistory();
        break;

      case 'get_alert_configs':
        result.data = Array.from(socketServer.getAlertConfigs().entries());
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Unknown action',
            availableActions: [
              'execute_command',
              'configure_alert',
              'set_rate_limit',
              'reset_circuit_breaker',
              'set_maintenance_mode',
              'force_disconnect_user',
              'force_disconnect_socket',
              'get_connections',
              'get_metrics_history',
              'get_command_history',
              'get_alert_configs',
            ],
          },
          { status: 400 }
        );
    }

    // Log admin action
    logger.info('Admin action executed', {
      adminId: auth.user.id,
      action,
      data: data,
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || 'unknown',
    });

    return NextResponse.json(result);
  } catch (error) {
    logger.error(
      'Admin action failed',
      createErrorLogMeta(error, {
        userAgent: request.headers.get('user-agent'),
        ip: request.ip || 'unknown',
      })
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Admin action failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT: Update configuration
export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = (await request.json()) as AdminConfigRequest;
    const { config } = body;

    const socketServer = getChatSocketServer();

    // Handle different configuration updates
    if (config.alerts) {
      for (const alertConfig of config.alerts) {
        const validatedAlert = AlertConfigSchema.parse(alertConfig);
        socketServer.configureCustomAlert(validatedAlert);
      }
    }

    if (config.maintenance) {
      socketServer.setMaintenanceMode(config.maintenance.enabled, config.maintenance.message);
    }

    if (config.rateLimits) {
      for (const rateLimit of config.rateLimits) {
        const validatedRateLimit = RateLimitSchema.parse(rateLimit);
        socketServer.setCustomRateLimit(
          { userId: validatedRateLimit.userId, socketId: validatedRateLimit.socketId },
          validatedRateLimit.maxMessages,
          validatedRateLimit.windowMs
        );
      }
    }

    // Log configuration update
    logger.info('Admin configuration updated', {
      adminId: auth.user.id,
      config: config,
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || 'unknown',
    });

    return NextResponse.json({
      success: true,
      message: 'Configuration updated successfully',
      timestamp: Date.now(),
    });
  } catch (error) {
    logger.error(
      'Admin configuration update failed',
      createErrorLogMeta(error, {
        userAgent: request.headers.get('user-agent'),
        ip: request.ip || 'unknown',
      })
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Configuration update failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE: Emergency actions
export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Only SUPER_ADMIN can perform emergency actions
    if (auth.role !== 'SUPER_ADMIN') {
      securityLogger.accessDenied(
        'admin_emergency_action',
        auth.user.id,
        'insufficient_permissions'
      );
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { action } = body;

    const socketServer = getChatSocketServer();

    switch (action) {
      case 'emergency_shutdown':
        // Emergency shutdown
        logger.warn('Emergency shutdown initiated', {
          adminId: auth.user.id,
          userAgent: request.headers.get('user-agent'),
          ip: request.ip || 'unknown',
        });

        // Start shutdown in background
        setTimeout(async () => {
          try {
            await socketServer.shutdown();
          } catch (error) {
            logger.error('Emergency shutdown failed', errorToLogMeta(error));
          }
        }, 1000);

        return NextResponse.json({
          success: true,
          message: 'Emergency shutdown initiated',
          timestamp: Date.now(),
        });

      case 'disconnect_all_users':
        // This functionality requires WebSocket connection to filter admin connections
        // Cannot access private isAdminConnection method from REST API
        const disconnectMessage = 'Disconnect all users must be executed via WebSocket connection';

        logger.warn('Disconnect all users attempted via REST API', {
          adminId: auth.user.id,
          userAgent: request.headers.get('user-agent'),
          ip: request.ip || 'unknown',
        });

        return NextResponse.json({
          success: false,
          message: disconnectMessage,
          timestamp: Date.now(),
        });

      case 'reset_all_circuit_breakers':
        // Reset all circuit breakers
        socketServer.resetCircuitBreaker('database');
        socketServer.resetCircuitBreaker('aiService');
        socketServer.resetCircuitBreaker('retell');

        logger.warn('All circuit breakers reset', {
          adminId: auth.user.id,
          userAgent: request.headers.get('user-agent'),
          ip: request.ip || 'unknown',
        });

        return NextResponse.json({
          success: true,
          message: 'All circuit breakers reset',
          timestamp: Date.now(),
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Unknown emergency action',
            availableActions: [
              'emergency_shutdown',
              'disconnect_all_users',
              'reset_all_circuit_breakers',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error(
      'Emergency action failed',
      createErrorLogMeta(error, {
        userAgent: request.headers.get('user-agent'),
        ip: request.ip || 'unknown',
      })
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Emergency action failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
