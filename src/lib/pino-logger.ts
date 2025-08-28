import pino from 'pino';
import { trace, context } from '@opentelemetry/api';

const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

// Disable transport in development to avoid thread-stream issues
// Use simple console output instead
const transport = undefined;

const baseLogger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
  enabled: !isTest,
  transport,
  formatters: {
    level: label => {
      return { level: label.toUpperCase() };
    },
  },
  base: {
    service: 'vasquez-law-website',
    env: process.env.NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  mixin() {
    const activeSpan = trace.getActiveSpan();
    if (activeSpan) {
      const spanContext = activeSpan.spanContext();
      return {
        traceId: spanContext.traceId,
        spanId: spanContext.spanId,
        traceFlags: spanContext.traceFlags,
      };
    }
    return {};
  },
});

export const logger = baseLogger.child({ component: 'app' });
export const apiLogger = baseLogger.child({ component: 'api' });
export const dbLogger = baseLogger.child({ component: 'database' });
export const securityLogger = baseLogger.child({ component: 'security' });
export const performanceLogger = baseLogger.child({ component: 'performance' });
export const wsLogger = baseLogger.child({ component: 'websocket' });
export const aiLogger = baseLogger.child({ component: 'ai' });
export const paymentLogger = baseLogger.child({ component: 'payment' });
export const leadLogger = baseLogger.child({ component: 'lead' });

export interface LogContext {
  userId?: string;
  requestId?: string;
  sessionId?: string;
  leadId?: string;
  paymentId?: string;
  [key: string]: unknown;
}

export const createContextualLogger = (context: LogContext) => {
  return logger.child(context);
};

export const logApiRequest = (req: Request, res: Response, duration: number) => {
  apiLogger.info(
    {
      method: req.method,
      url: req.url,
      status: res.status,
      duration,
      userAgent: req.headers.get('user-agent'),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
    },
    'API request completed'
  );
};

export const logDatabaseQuery = (query: string, duration: number, params?: unknown[]) => {
  dbLogger.debug(
    {
      query,
      duration,
      params: isDevelopment ? params : undefined,
    },
    'Database query executed'
  );
};

export const logSecurityEvent = (event: string, details: Record<string, unknown>) => {
  securityLogger.warn(
    {
      event,
      ...details,
    },
    `Security event: ${event}`
  );
};

export const logPerformanceMetric = (metric: string, value: number, unit: string = 'ms') => {
  performanceLogger.info(
    {
      metric,
      value,
      unit,
    },
    `Performance metric: ${metric}`
  );
};

export const logError = (error: Error, context?: Record<string, unknown>) => {
  logger.error(
    {
      err: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      ...context,
    },
    error.message
  );
};

export const logBusinessEvent = (event: string, details: Record<string, unknown>) => {
  logger.info(
    {
      businessEvent: event,
      ...details,
    },
    `Business event: ${event}`
  );
};

export default logger;
