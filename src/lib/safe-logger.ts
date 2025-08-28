/**
 * Unified Safe Logger for VLF Website
 * Works in all environments: Node.js, Edge Runtime, and Browser
 * Consolidates all logging functionality into a single module
 */

// Type definitions for better type safety
export interface LogContext {
  [key: string]: unknown;
}

interface BaseLogger {
  info: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  debug: (message: string, ...args: unknown[]) => void;
  log: (message: string, ...args: unknown[]) => void;
}

// Rate limiting for excessive logs
interface RateLimitConfig {
  threshold: number;
  windowMs: number;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  threshold: 100,
  windowMs: 60000, // 1 minute
};

// Special rate limits for known spammy messages
const specialRateLimits: Record<string, RateLimitConfig> = {
  'orphaned node': { threshold: 10, windowMs: 300000 }, // 10 per 5 minutes
  'DOM manipulation error': { threshold: 10, windowMs: 300000 },
  'attempted to remove': { threshold: 10, windowMs: 300000 },
  'parentNode.removeChild': { threshold: 10, windowMs: 300000 },
};

function shouldRateLimit(level: string, message: string): boolean {
  const now = Date.now();
  const key = `${level}:${message.substring(0, 100)}`;

  // Check for special rate limits
  let rateLimit = DEFAULT_RATE_LIMIT;
  for (const [pattern, limit] of Object.entries(specialRateLimits)) {
    if (message.toLowerCase().includes(pattern.toLowerCase())) {
      rateLimit = limit;
      break;
    }
  }

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    // Start new window
    rateLimitMap.set(key, { count: 1, resetTime: now + rateLimit.windowMs });
    return false;
  }

  if (entry.count >= rateLimit.threshold) {
    return true; // Rate limit exceeded
  }

  entry.count++;
  return false;
}

// Check runtime environment
const isEdgeRuntime = (): boolean => {
  return (
    (typeof globalThis !== 'undefined' && 'EdgeRuntime' in globalThis) ||
    process.env.NEXT_RUNTIME === 'edge'
  );
};

const isBrowser = typeof window !== 'undefined';
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const isProduction = process.env.NODE_ENV === 'production';

// Helper to format timestamps
const getTimestamp = (): string => {
  return new Date().toISOString();
};

// Helper to format log messages with consistent structure
const formatMessage = (
  prefix: string,
  level: string,
  message: string,
  context?: LogContext
): string => {
  const timestamp = getTimestamp();
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${prefix}:${level}] ${message}${contextStr}`;
};

// Helper to sanitize sensitive data
const sanitizePayload = (payload: unknown): unknown => {
  if (!payload || typeof payload !== 'object') return payload;

  const sensitiveFields = ['password', 'token', 'apiKey', 'ssn', 'creditCard', 'secret'];
  const sanitized = { ...(payload as Record<string, unknown>) };

  sensitiveFields.forEach(field => {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  });

  return sanitized;
};

// Helper to sanitize headers
const sanitizeHeaders = (headers: unknown): unknown => {
  if (!headers || typeof headers !== 'object') return headers;

  const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key', 'api-key'];
  const sanitized = { ...(headers as Record<string, unknown>) };

  sensitiveHeaders.forEach(header => {
    const lowerHeader = header.toLowerCase();
    Object.keys(sanitized).forEach(key => {
      if (key.toLowerCase() === lowerHeader) {
        sanitized[key] = '[REDACTED]';
      }
    });
  });

  return sanitized;
};

// Enhanced logger factory with all features
const createLogger = (prefix: string) => {
  // Determine appropriate log level - SIMPLIFIED FOR PRODUCTION
  const shouldLog = (level: string): boolean => {
    if (isTest) return false;
    if (isProduction) {
      // In production, only log errors and critical warnings
      return level === 'error' || (level === 'warn' && process.env.LOG_LEVEL === 'warn');
    }
    if (isDevelopment) return true;

    const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };
    const currentLevel = process.env.LOG_LEVEL || 'info';
    const levelValue = logLevels[level as keyof typeof logLevels] ?? 2;
    const currentValue = logLevels[currentLevel as keyof typeof logLevels] ?? 2;

    return levelValue <= currentValue;
  };

  // Base logging methods with enhanced formatting and rate limiting
  const baseLogger: BaseLogger = {
    info: (message: string, ...args: unknown[]) => {
      if (shouldLog('info') && !shouldRateLimit('info', message)) {
        console.log(formatMessage(prefix, 'INFO', message), ...args);
      }
    },
    error: (message: string, ...args: unknown[]) => {
      if (shouldLog('error') && !shouldRateLimit('error', message)) {
        // Handle Error objects specially
        if (args[0] instanceof Error) {
          const error = args[0];
          console.error(
            formatMessage(prefix, 'ERROR', message, {
              name: error.name,
              message: error.message,
              stack: error.stack,
            })
          );
        } else {
          console.error(formatMessage(prefix, 'ERROR', message), ...args);
        }
      }
    },
    warn: (message: string, ...args: unknown[]) => {
      if (shouldLog('warn') && !shouldRateLimit('warn', message)) {
        console.warn(formatMessage(prefix, 'WARN', message), ...args);
      }
    },
    debug: (message: string, ...args: unknown[]) => {
      if (shouldLog('debug') && !shouldRateLimit('debug', message)) {
        console.debug(formatMessage(prefix, 'DEBUG', message), ...args);
      }
    },
    log: (message: string, ...args: unknown[]) => {
      if (!shouldRateLimit('log', message)) {
        console.log(`[${prefix}] ${message}`, ...args);
      }
    },
  };

  // Return full-featured logger
  return {
    ...baseLogger,

    // Performance monitoring
    measure: (label: string, duration: number, metadata?: unknown) => {
      baseLogger.info(`Performance: ${label}`, { duration: `${duration}ms`, metadata });
    },

    slowOperation: (operation: string, duration: number, threshold: number, metadata?: unknown) => {
      baseLogger.warn(`Slow operation: ${operation}`, {
        duration: `${duration}ms`,
        threshold: `${threshold}ms`,
        metadata,
      });
    },

    memoryUsage: () => {
      if (!isBrowser && process?.memoryUsage) {
        const usage = process.memoryUsage();
        baseLogger.info('Memory usage', {
          heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
          heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB',
          rss: Math.round(usage.rss / 1024 / 1024) + ' MB',
        });
      }
    },

    // WebSocket operations
    connection: (clientId: string, metadata?: unknown) => {
      baseLogger.info('WebSocket connection', { clientId, metadata });
    },

    disconnection: (clientId: string, reason: string, duration?: number) => {
      baseLogger.info('WebSocket disconnection', { clientId, reason, duration });
    },

    message: (clientId: string, type: string, direction: 'inbound' | 'outbound', size?: number) => {
      baseLogger.debug('WebSocket message', { clientId, type, direction, size });
    },

    // Security operations
    suspiciousActivity: (activity: string, metadata?: unknown) => {
      baseLogger.warn('Suspicious activity', { activity, metadata });
    },

    authenticationSuccess: (method: string, userId: string) => {
      baseLogger.info('Authentication success', { method, userId });
    },

    authenticationFailure: (method: string, identifier?: string, reason?: string) => {
      baseLogger.warn('Authentication failure', { method, identifier, reason });
    },

    accessGranted: (resource: string, userId?: string) => {
      baseLogger.info('Access granted', { resource, userId });
    },

    accessDenied: (resource: string, userId?: string, reason?: string) => {
      baseLogger.warn('Access denied', { resource, userId, reason });
    },

    // User flow tracking
    flowStep: (flowName: string, step: string, userId?: string) => {
      baseLogger.info('User flow step', { flowName, step, userId });
    },

    // Component lifecycle (React)
    mount: (component: string, props?: unknown) => {
      baseLogger.debug('Component mount', { component, props: sanitizePayload(props) });
    },

    unmount: (component: string) => {
      baseLogger.debug('Component unmount', { component });
    },

    stateChange: (component: string, state: string, value: unknown, reason?: string) => {
      baseLogger.debug('State change', { component, state, value: sanitizePayload(value), reason });
    },

    event: (component: string, event: string, data?: unknown) => {
      baseLogger.debug('Component event', { component, event, data: sanitizePayload(data) });
    },

    rerender: (component: string, reason: string, changes?: unknown) => {
      baseLogger.debug('Component rerender', { component, reason, changes });
    },

    propChange: (component: string, propName: string, oldValue: unknown, newValue: unknown) => {
      baseLogger.debug('Prop change', {
        component,
        propName,
        oldValue: sanitizePayload(oldValue),
        newValue: sanitizePayload(newValue),
      });
    },

    // Database operations
    query: (query: string, params?: unknown[], duration?: number) => {
      baseLogger.debug('Database query', {
        query: query.substring(0, 500),
        paramCount: params?.length || 0,
        duration: duration ? `${duration}ms` : undefined,
      });
    },

    transaction: (transactionId: string, status: string) => {
      baseLogger.info('Database transaction', { transactionId, status });
    },

    migration: (name: string, status: string, error?: unknown) => {
      const level = status === 'error' ? 'error' : 'info';
      baseLogger[level]('Database migration', { name, status, error });
    },

    // API operations
    request: (endpoint: string, method: string, payload?: unknown, headers?: unknown) => {
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      baseLogger.info('API request', {
        requestId,
        method,
        endpoint,
        payload: sanitizePayload(payload),
        headers: sanitizeHeaders(headers),
      });
      return requestId;
    },

    response: (requestId: string, status: number, duration: number, data?: unknown) => {
      baseLogger.info('API response', {
        requestId,
        status,
        duration: `${duration}ms`,
        dataSize: data ? JSON.stringify(data).length : 0,
      });
    },

    // Business events
    businessEvent: (event: string, details: Record<string, unknown>) => {
      baseLogger.info(`Business event: ${event}`, sanitizePayload(details));
    },

    // Create child logger with additional context
    child: (childPrefix: string) => createLogger(`${prefix}:${childPrefix}`),
  };
};

// Pre-configured loggers for different components
export const logger = createLogger('GENERAL');
export const apiLogger = createLogger('API');
export const securityLogger = createLogger('SECURITY');
export const performanceLogger = createLogger('PERFORMANCE');
export const wsLogger = createLogger('WEBSOCKET');
export const dbLogger = createLogger('DATABASE');
export const componentLogger = createLogger('COMPONENT');
export const userFlowLogger = createLogger('USER_FLOW');
export const paymentLogger = createLogger('PAYMENT');
export const requestLogger = apiLogger; // Alias for compatibility
export const aiLogger = createLogger('AI');
export const leadLogger = createLogger('LEAD');

// Extend LogContext with specific fields for helper functions
export interface ExtendedLogContext extends LogContext {
  userId?: string;
  requestId?: string;
  sessionId?: string;
  leadId?: string;
  paymentId?: string;
}

export const createContextualLogger = (context: LogContext) => {
  const contextStr = Object.entries(context)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ');
  return createLogger(`CONTEXT[${contextStr}]`);
};

export const logApiRequest = (req: Request, res: Response, duration: number) => {
  apiLogger.info('API request completed', {
    method: req.method,
    url: req.url,
    status: res.status,
    duration: `${duration}ms`,
    userAgent: req.headers.get('user-agent'),
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
  });
};

export const logDatabaseQuery = (query: string, duration: number, params?: unknown[]) => {
  dbLogger.query(query, params, duration);
};

export const logSecurityEvent = (event: string, details: Record<string, unknown>) => {
  securityLogger.warn(event, sanitizePayload(details));
};

export const logPerformanceMetric = (metric: string, value: number, unit: string = 'ms') => {
  performanceLogger.measure(metric, value, { unit });
};

export const logError = (error: Error, context?: Record<string, unknown>) => {
  logger.error('Application error', error, context);
};

export const logBusinessEvent = (event: string, details: Record<string, unknown>) => {
  logger.businessEvent(event, details);
};

// Error to log metadata helper
export const errorToLogMeta = (error: unknown): Record<string, unknown> => {
  if (error instanceof Error) {
    const errorObj: Record<string, unknown> = {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
    
    // Include any custom error properties
    const errorAsAny = error as any;
    Object.keys(errorAsAny).forEach(key => {
      if (!(key in errorObj) && key !== 'message' && key !== 'name' && key !== 'stack') {
        errorObj[key] = errorAsAny[key];
      }
    });
    
    return errorObj;
  }

  if (typeof error === 'object' && error !== null) {
    return error as Record<string, unknown>;
  }

  return {
    message: String(error),
    type: typeof error,
  };
};

// Export enhanced version for compatibility
export const createErrorLogMeta = (
  error: unknown,
  context?: Record<string, unknown>
): Record<string, unknown> => {
  const errorMeta = errorToLogMeta(error);
  return context ? { ...errorMeta, ...context } : errorMeta;
};

// Export default logger
export default logger;

// Cleanup old rate limit entries periodically - DISABLED IN PRODUCTION
if (typeof globalThis !== 'undefined' && !isTest && !isProduction) {
  // Only run cleanup in development to avoid memory leaks and CPU usage
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000); // Clean up every minute
}

// In production, clean up rate limit map on each check to prevent memory leaks
if (isProduction) {
  // Limit map size in production
  const MAX_RATE_LIMIT_ENTRIES = 100;
  const originalShouldRateLimit = shouldRateLimit;
  (globalThis as any).shouldRateLimit = function(level: string, message: string): boolean {
    // Clean up old entries if map is getting too large
    if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
      const now = Date.now();
      for (const [key, entry] of rateLimitMap.entries()) {
        if (now > entry.resetTime) {
          rateLimitMap.delete(key);
        }
      }
      // If still too large, clear oldest half
      if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
        const entries = Array.from(rateLimitMap.entries());
        entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
        entries.slice(0, Math.floor(entries.length / 2)).forEach(([key]) => {
          rateLimitMap.delete(key);
        });
      }
    }
    return originalShouldRateLimit(level, message);
  };
}
