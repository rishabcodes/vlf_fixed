import { componentLogger as logger } from '@/lib/safe-logger';

/**
 * Edge-compatible logger for use in edge runtime routes
 * Uses console methods instead of pino for compatibility
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class EdgeLogger {
  private component: string;

  constructor(component: string) {
    this.component = component;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] [${this.component}] ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      logger.debug(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    // eslint-disable-next-line no-console
    logger.info(this.formatMessage('info', message, context));
  }

  warn(message: string, context?: LogContext): void {
    // eslint-disable-next-line no-console
    logger.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      ...(error instanceof Error
        ? {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack,
          }
        : {
            error: String(error),
          }),
    };
    // eslint-disable-next-line no-console
    logger.error(this.formatMessage('error', message, errorContext));
  }

  child(component: string): EdgeLogger {
    return new EdgeLogger(`${this.component}:${component}`);
  }
}

// Export pre-configured loggers for different components
export const edgeLogger = new EdgeLogger('edge');
export const apiEdgeLogger = new EdgeLogger('edge:api');
export const aiEdgeLogger = new EdgeLogger('edge:ai');

// Helper function to check if we're in edge runtime
export const isEdgeRuntime = (): boolean => {
  return (
    (typeof globalThis !== 'undefined' && 'EdgeRuntime' in globalThis) ||
    process.env.NEXT_RUNTIME === 'edge'
  );
};

// Unified logger interface that works in both edge and node runtime
export const createLogger = (component: string) => {
  if (isEdgeRuntime()) {
    return new EdgeLogger(component);
  }
  // In non-edge runtime, we could import pino dynamically
  // For now, just return edge logger everywhere for consistency
  return new EdgeLogger(component);
};

export default edgeLogger;
