import { componentLogger as logger } from '@/lib/safe-logger';

// Dynamic logger that uses Winston on server and console on client
// Enhanced with OpenTelemetry trace correlation
import type {
  Logger,
  APILogger,
  SecurityLogger,
  PerformanceLogger,
  WSLogger,
  DBLogger,
  ComponentLogger,
  LogMeta,
  WinstonLogInfo,
} from '../../types/logger';

let logger: Logger;
let apiLogger: APILogger;
let securityLogger: SecurityLogger;
let performanceLogger: PerformanceLogger;
let wsLogger: WSLogger;
let dbLogger: DBLogger;

// Import OpenTelemetry trace correlation (conditional for server-side only)
let getTraceContext: (() => { traceId: string; spanId: string } | null) | null = null;

if (typeof window === 'undefined') {
  try {
    // Dynamic import to avoid client-side bundling issues
    const telemetryModule = require('../telemetry/custom-spans');
    getTraceContext = () => telemetryModule.vlfTelemetry.getTraceContext();
  } catch (error) {
    // Telemetry not available, continue without trace correlation
    getTraceContext = null;
  }
}

// Check if we're in Edge runtime (middleware)
const isEdgeRuntime =
  typeof (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime !== 'undefined' ||
  (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime !== undefined;

// Create a simple console-based logger fallback
function createConsoleFallbackLogger(): Logger {
  return {
    debug: (message: string, meta?: LogMeta) => logger.debug(`[DEBUG] ${message}`, meta),
    info: (message: string, meta?: LogMeta) => logger.info(`[INFO] ${message}`, meta),
    warn: (message: string, meta?: LogMeta) => logger.warn(`[WARN] ${message}`, meta),
    error: (message: string, meta?: LogMeta) => logger.error(`[ERROR] ${message}`, meta),
    log: (level: string, message: string, meta?: LogMeta) => logger.info(`[${level.toUpperCase()}] ${message}`, meta),
  };
}

if (typeof window === 'undefined' && !isEdgeRuntime) {
  // Server-side (Node.js): Use Pino logger
  try {
    const { pinoLogger } = require('../pino-logger');
    logger = pinoLogger;
  } catch (error) {
    // Use console fallback
    logger = createConsoleFallbackLogger();
  }

  // API Logger
  apiLogger = {
    request: (
      endpoint: string,
      method: string,
      payload?: unknown,
      headers?: Record<string, unknown>
    ) => {
      const requestId = generateRequestId();
      logger.info(
        'API Request',
        addTraceContext({
          requestId,
          endpoint,
          method,
          payload: sanitizePayload(payload),
          headers: sanitizeHeaders(headers),
          timestamp: new Date().toISOString(),
          category: 'api_request',
        }) as LogMeta
      );
      return requestId;
    },

    response: (requestId: string, status: number, duration: number, data?: unknown) => {
      logger.info(
        'API Response',
        addTraceContext({
          requestId,
          status,
          duration,
          responseSize: data ? JSON.stringify(data).length : 0,
          timestamp: new Date().toISOString(),
          category: 'api_response',
        }) as LogMeta
      );
    },

    error: (requestId: string, error: unknown, retry?: number) => {
      const errorInfo =
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              code: (error as Error & { code?: string }).code,
            }
          : {
              message: String(error),
              type: typeof error,
            };

      logger.error(
        'API Error',
        addTraceContext({
          requestId,
          error: errorInfo,
          retry,
          timestamp: new Date().toISOString(),
          category: 'api_error',
        }) as LogMeta
      );
    },

    info: (message: string, meta?: unknown) => {
      logger.info(message, meta as LogMeta);
    },

    warn: (message: string, meta?: unknown) => {
      logger.warn(message, meta as LogMeta);
    },
  };

  // Security Logger
  securityLogger = {
    suspiciousActivity: (activity: string, metadata?: unknown) => {
      logger.warn('Suspicious activity detected', {
        activity,
        metadata,
        timestamp: new Date().toISOString(),
      });
    },

    accessDenied: (resource: string, userId?: string, reason?: string) => {
      logger.warn('Access denied', {
        resource,
        userId,
        reason,
        timestamp: new Date().toISOString(),
      });
    },

    accessGranted: (resource: string, userId?: string) => {
      logger.info('Access granted', {
        resource,
        userId,
        timestamp: new Date().toISOString(),
      });
    },

    authenticationFailure: (method: string, identifier?: string, reason?: string) => {
      logger.warn('Authentication failure', {
        method,
        identifier,
        reason,
        timestamp: new Date().toISOString(),
      });
    },

    authenticationSuccess: (method: string, userId: string) => {
      logger.info('Authentication success', {
        method,
        userId,
        timestamp: new Date().toISOString(),
      });
    },
  };

  // Performance Logger
  performanceLogger = {
    measure: (operation: string, duration: number, metadata?: unknown) => {
      logger.info('Performance measurement', {
        operation,
        duration,
        metadata,
        timestamp: new Date().toISOString(),
      });
    },

    slowOperation: (operation: string, duration: number, threshold: number) => {
      logger.warn('Slow operation detected', {
        operation,
        duration,
        threshold,
        timestamp: new Date().toISOString(),
      });
    },

    memoryUsage: () => {
      const usage = process.memoryUsage();
      logger.info('Memory usage', {
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB',
        rss: Math.round(usage.rss / 1024 / 1024) + ' MB',
        timestamp: new Date().toISOString(),
      });
    },

    // Additional methods for component tracking
    stateChange: (
      componentName: string,
      previousState: unknown,
      newState: unknown,
      trigger: string
    ) => {
      logger.debug(`State change: ${componentName}`, { previousState, newState, trigger });
    },
    mount: (componentName: string, props?: unknown) => {
      logger.debug(`Component mount: ${componentName}`, { props });
    },
    unmount: (componentName: string) => {
      logger.debug(`Component unmount: ${componentName}`);
    },
    rerender: (componentName: string, reason: string, changes?: unknown) => {
      logger.debug(`Component rerender: ${componentName}`, { reason, changes });
    },
    propChange: (componentName: string, propName: string, oldValue: unknown, newValue: unknown) => {
      logger.debug(`Prop change: ${componentName}.${propName}`, { oldValue, newValue });
    },
    info: (message: string, meta?: unknown) => {
      logger.info(message, meta as LogMeta);
    },
    error: (message: string, meta?: unknown) => {
      logger.error(message, meta as LogMeta);
    },
    warn: (message: string, meta?: unknown) => {
      logger.warn(message, meta as LogMeta);
    },
  };

  // WebSocket Logger
  wsLogger = {
    connection: (clientId: string, metadata?: unknown) => {
      logger.info('WebSocket connection established', {
        clientId,
        metadata,
        timestamp: new Date().toISOString(),
      });
    },

    disconnection: (clientId: string, reason: string, duration: number) => {
      logger.info('WebSocket disconnected', {
        clientId,
        reason,
        duration,
        timestamp: new Date().toISOString(),
      });
    },

    message: (clientId: string, type: string, direction: 'inbound' | 'outbound', size: number) => {
      logger.debug('WebSocket message', {
        clientId,
        type,
        direction,
        size,
        timestamp: new Date().toISOString(),
      });
    },

    error: (clientId: string, error: unknown) => {
      logger.error('WebSocket error', {
        clientId,
        error:
          error instanceof Error
            ? {
                message: error.message,
                code: (error as Error & { code?: string }).code,
              }
            : { message: String(error) },
        timestamp: new Date().toISOString(),
      });
    },

    info: (clientId: string, message: string) => {
      logger.info('WebSocket info', {
        clientId,
        message,
        timestamp: new Date().toISOString(),
      });
    },

    warn: (clientId: string, message: string) => {
      logger.warn('WebSocket warning', {
        clientId,
        message,
        timestamp: new Date().toISOString(),
      });
    },
  };

  // Database Logger
  dbLogger = {
    query: (query: string, params?: unknown[], duration?: number) => {
      logger.debug('Database query', {
        query: query.substring(0, 500),
        paramCount: params?.length || 0,
        duration,
        timestamp: new Date().toISOString(),
      });
    },

    error: (operation: string, error: unknown) => {
      logger.error('Database error', {
        operation,
        error:
          error instanceof Error
            ? {
                message: error.message,
                code: (error as Error & { code?: string }).code,
                stack: error.stack,
              }
            : { message: String(error) },
        timestamp: new Date().toISOString(),
      });
    },

    connection: (status: 'connected' | 'disconnected' | 'error', metadata?: unknown) => {
      const level = status === 'error' ? 'error' : 'info';
      logger[level]('Database connection status', {
        status,
        metadata,
        timestamp: new Date().toISOString(),
      });
    },

    migration: (name: string, status: 'start' | 'complete' | 'error', error?: unknown) => {
      const level = status === 'error' ? 'error' : 'info';
      logger[level]('Database migration', {
        name,
        status,
        error:
          error instanceof Error
            ? { message: error.message, stack: error.stack }
            : error
              ? { message: String(error) }
              : null,
        timestamp: new Date().toISOString(),
      });
    },

    transaction: (transactionId: string, status: 'start' | 'commit' | 'rollback') => {
      logger.info('Database transaction', {
        transactionId,
        status,
        timestamp: new Date().toISOString(),
      });
    },
  };
} else if (isEdgeRuntime) {
  // Edge runtime: Use edge-compatible logger
  const edgeLogger = require('./edge');
  logger = edgeLogger.default || edgeLogger.edgeLogger;

  // Create compatible API interfaces
  apiLogger = {
    request: (
      endpoint: string,
      method: string,
      payload?: unknown,
      headers?: Record<string, unknown>
    ) => {
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      logger.info(`API Request: ${method} ${endpoint}`, { requestId });
      return requestId;
    },
    response: (requestId: string, status: number, duration: number, data?: unknown) => {
      logger.info(`API Response: ${status} in ${duration}ms`, { requestId });
    },
    error: (requestId: string, error: unknown, retry?: number) => {
      logger.error(`API Error`, {
        requestId,
        error: error instanceof Error ? error.message : String(error),
      });
    },
    info: (message: string, meta?: unknown) => logger.info(message, meta as LogMeta),
    warn: (message: string, meta?: unknown) => logger.warn(message, meta as LogMeta),
  };

  securityLogger = {
    suspiciousActivity: (activity: string, metadata?: unknown) =>
      logger.warn(`Suspicious activity: ${activity}`, metadata as LogMeta),
    accessDenied: (resource: string, userId?: string, reason?: string) =>
      logger.warn(`Access denied: ${resource}`, { userId, reason }),
    accessGranted: (resource: string, userId?: string) =>
      logger.info(`Access granted: ${resource}`, { userId }),
    authenticationFailure: (method: string, identifier?: string, reason?: string) =>
      logger.warn(`Auth failure: ${method}`, { identifier, reason }),
    authenticationSuccess: (method: string, userId: string) =>
      logger.info(`Auth success: ${method}`, { userId }),
  };

  performanceLogger = {
    measure: (operation: string, duration: number, metadata?: unknown) =>
      logger.info(`Performance: ${operation} took ${duration}ms`, metadata as LogMeta),
    slowOperation: (operation: string, duration: number, threshold: number) =>
      logger.warn(`Slow operation: ${operation} took ${duration}ms (threshold: ${threshold}ms)`),
    memoryUsage: () => {},
    stateChange: () => {},
    mount: () => {},
    unmount: () => {},
    rerender: () => {},
    propChange: () => {},
    info: (message: string, meta?: unknown) => logger.info(message, meta as LogMeta),
    error: (message: string, meta?: unknown) => logger.error(message, meta as LogMeta),
    warn: (message: string, meta?: unknown) => logger.warn(message, meta as LogMeta),
  };

  // Stub out server-only loggers
  wsLogger = {
    connection: () => {},
    disconnection: () => {},
    message: () => {},
    error: () => {},
    info: () => {},
    warn: () => {},
  };

  dbLogger = {
    query: () => {},
    error: () => {},
    connection: () => {},
    migration: () => {},
    transaction: () => {},
  };
} else {
  // Client-side: Use the client logger module
  const clientLogger = require('./client');
  logger = clientLogger.default;
  apiLogger = clientLogger.apiLogger;
  securityLogger = clientLogger.securityLogger;
  performanceLogger = clientLogger.performanceLogger;

  // Stub out server-only loggers
  wsLogger = {
    connection: () => {},
    disconnection: () => {},
    message: () => {},
    error: () => {},
    info: () => {},
    warn: () => {},
  };

  dbLogger = {
    query: () => {},
    error: () => {},
    connection: () => {},
    migration: () => {},
    transaction: () => {},
  };
}

// Helper functions
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function addTraceContext(metadata: Record<string, unknown>): Record<string, unknown> {
  if (!getTraceContext || typeof window !== 'undefined') {
    return metadata;
  }

  try {
    const traceContext = getTraceContext();
    if (traceContext) {
      return {
        ...metadata,
        traceId: traceContext.traceId,
        spanId: traceContext.spanId,
        // Add full trace URL for easy access
        traceUrl: `https://trace.vasquezlaw.com/trace/${traceContext.traceId}`,
      };
    }
  } catch (error) {
    // Silently continue if trace context unavailable
  }

  return metadata;
}

function sanitizePayload(payload: unknown): unknown {
  if (!payload || typeof payload !== 'object') return payload;

  const sensitiveFields = ['password', 'token', 'apiKey', 'ssn', 'creditCard'];
  const sanitized = { ...(payload as Record<string, unknown>) } as Record<string, unknown>;

  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });

  return sanitized;
}

function sanitizeHeaders(headers: unknown): unknown {
  if (!headers || typeof headers !== 'object') return headers;

  const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
  const sanitized = { ...(headers as Record<string, unknown>) } as Record<string, unknown>;

  sensitiveHeaders.forEach(header => {
    if (sanitized[header]) {
      sanitized[header] = '[REDACTED]';
    }
  });

  return sanitized;
}

// Additional exports for compatibility
const componentLogger = performanceLogger;
const requestLogger = apiLogger;
const userFlowLogger = {
  startFlow: (flowName: string, userId?: string) => {
    logger.info(`User flow started: ${flowName}`, { userId });
  },
  endFlow: (flowName: string, userId?: string, success?: boolean) => {
    logger.info(`User flow ended: ${flowName}`, { userId, success });
  },
  flowStep: (flowName: string, step: string, userId?: string) => {
    logger.info(`User flow step: ${flowName} - ${step}`, { userId });
  },
};

export default logger;
export {
  logger,
  apiLogger,
  securityLogger,
  performanceLogger,
  wsLogger,
  dbLogger,
  componentLogger,
  requestLogger,
  userFlowLogger,
};
export { errorToLogMeta } from './utils';
