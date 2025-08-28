import { componentLogger as logger } from '@/lib/safe-logger';

// Client-safe logger that doesn't use filesystem APIs
const isDevelopment = process.env.NODE_ENV === 'development';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;

type LogLevel = keyof typeof logLevels;

class ClientLogger {
  private level: LogLevel = isDevelopment ? 'debug' : 'warn';

  private shouldLog(level: LogLevel): boolean {
    return logLevels[level] <= logLevels[this.level];
  }

  private formatMessage(level: LogLevel, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }

  error(message: string, meta?: unknown): void {
    if (this.shouldLog('error')) {
      logger.error(this.formatMessage('error', message, meta));
    }
  }

  warn(message: string, meta?: unknown): void {
    if (this.shouldLog('warn')) {
      logger.warn(this.formatMessage('warn', message, meta));
    }
  }

  info(message: string, meta?: unknown): void {
    if (this.shouldLog('info')) {
      logger.info(this.formatMessage('info', message, meta));
    }
  }

  debug(message: string, meta?: unknown): void {
    if (this.shouldLog('debug')) {
      logger.info(this.formatMessage('debug', message, meta));
    }
  }

  // Child logger for compatibility
  child(meta: unknown): ClientLogger {
    return this; // In client, we don't need separate child loggers
  }
}

// Export singleton instance
const logger = new ClientLogger();

export default logger;

// Also export specific logging utilities for compatibility
export const performanceLogger = {
  logRender: (componentName: string, duration: number, meta?: any) => {
    logger.debug(`Component render: ${componentName}`, { duration, ...(meta || {}) });
  },
  logMount: (componentName: string, meta?: unknown) => {
    logger.debug(`Component mount: ${componentName}`, meta);
  },
  logUnmount: (componentName: string, meta?: unknown) => {
    logger.debug(`Component unmount: ${componentName}`, meta);
  },
  logStateChange: (componentName: string, prevState: unknown, nextState: any) => {
    logger.debug(`State change: ${componentName}`, { prevState, nextState });
  },
  logPropChange: (componentName: string, propName: string, prevValue: unknown, nextValue: any) => {
    logger.debug(`Prop change: ${componentName}.${propName}`, { prevValue, nextValue });
  },
  logRerender: (componentName: string, reason: string, meta?: any) => {
    logger.debug(`Component rerender: ${componentName}`, { reason, ...(meta || {}) });
  },
  stateChange: (componentName: string, previousState: any, newState: any, trigger: string) => {
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
  propChange: (componentName: string, propName: string, oldValue: unknown, newValue: any) => {
    logger.debug(`Prop change: ${componentName}.${propName}`, { oldValue, newValue });
  },
  info: (message: string, meta?: unknown) => {
    logger.info(message, meta);
  },
  error: (message: string, meta?: unknown) => {
    logger.error(message, meta);
  },
};

export const apiLogger = {
  request: (endpoint: string, method: string, payload?: unknown, headers?: any): string => {
    const requestId = Math.random().toString(36).substring(7);
    logger.info(`API Request: ${method} ${endpoint}`, { requestId, payload, headers });
    return requestId;
  },
  response: (requestId: string, status: number, duration: number, data?: unknown) => {
    logger.info(`API Response`, { requestId, status, duration, data });
  },
  error: (requestId: string, error: any, retry?: number) => {
    logger.error(`API Error`, { requestId, error: error.message || error, retry });
  },
  info: (message: string, meta?: unknown) => {
    logger.info(message, meta);
  },
};

export const securityLogger = {
  logAccess: (userId: string, resource: string, action: string, allowed: boolean) => {
    logger.info(`Access attempt`, { userId, resource, action, allowed });
  },
  logSuspiciousActivity: (userId: string, activity: string, metadata?: any) => {
    logger.warn(`Suspicious activity`, { userId, activity, ...(metadata || {}) });
  },
  suspiciousActivity: (activity: string, metadata?: unknown) => {
    logger.warn(`Suspicious activity: ${activity}`, metadata);
  },
  accessDenied: (resource: string, userId?: string, reason?: string) => {
    logger.warn(`Access denied`, { resource, userId, reason });
  },
  accessGranted: (resource: string, userId?: string) => {
    logger.info(`Access granted`, { resource, userId });
  },
  authenticationFailure: (method: string, identifier?: string, reason?: string) => {
    logger.warn(`Authentication failure`, { method, identifier, reason });
  },
  authenticationSuccess: (method: string, userId: string) => {
    logger.info(`Authentication success`, { method, userId });
  },
};

export const userFlowLogger = {
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

// Additional exports for compatibility
export const componentLogger = performanceLogger;
export const requestLogger = apiLogger;
