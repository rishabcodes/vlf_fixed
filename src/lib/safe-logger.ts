// Safe Logger - COMPLETE with ALL exports needed (FINAL VERSION)
const isDevelopment = process.env.NODE_ENV === 'development';

const createLogger = (prefix: string = '') => {
  const log = (level: string, message: string, meta?: any) => {
    // Always log errors, optionally log other levels in development
    if (level === 'ERROR' || level === 'WARN' || isDevelopment) {
      const prefixStr = prefix ? `[${prefix}] ` : '';
      const timestamp = new Date().toISOString();
      
      const logMessage = `[${timestamp}] [${level}] ${prefixStr}${message}`;
      
      switch(level) {
        case 'ERROR':
          console.error(logMessage, meta || '');
          break;
        case 'WARN':
          console.warn(logMessage, meta || '');
          break;
        case 'DEBUG':
          if (isDevelopment) console.debug(logMessage, meta || '');
          break;
        default:
          if (isDevelopment) console.log(logMessage, meta || '');
      }
    }
  };

  return {
    info: (message: string, meta?: any) => log('INFO', message, meta),
    error: (message: string, meta?: any) => log('ERROR', message, meta),
    warn: (message: string, meta?: any) => log('WARN', message, meta),
    debug: (message: string, meta?: any) => log('DEBUG', message, meta),
    log: (message: string, meta?: any) => log('LOG', message, meta),
    verbose: (message: string, meta?: any) => log('VERBOSE', message, meta),
    silly: (message: string, meta?: any) => log('SILLY', message, meta),
  };
};

// Main logger instance
export const logger = createLogger();

// ALL specialized logger instances that are being imported
export const apiLogger = createLogger('API');
export const componentLogger = createLogger('Component');
export const securityLogger = createLogger('Security');
export const dbLogger = createLogger('Database');
export const authLogger = createLogger('Auth');
export const emailLogger = createLogger('Email');
export const jobLogger = createLogger('Job');
export const analyticsLogger = createLogger('Analytics');
export const wsLogger = createLogger('WebSocket');
export const userFlowLogger = createLogger('UserFlow');
export const queueLogger = createLogger('Queue');
export const paymentLogger = createLogger('Payment');
export const voiceLogger = createLogger('Voice');
export const retellLogger = createLogger('Retell');
export const ghlLogger = createLogger('GHL');
export const smsLogger = createLogger('SMS');
export const chatLogger = createLogger('Chat');
export const aiLogger = createLogger('AI');
export const cacheLogger = createLogger('Cache');
export const routeLogger = createLogger('Route');
export const errorLogger = createLogger('Error');
export const performanceLogger = createLogger('Performance');
export const webhookLogger = createLogger('Webhook');
export const integrationLogger = createLogger('Integration');

// Error conversion utilities
export const errorToLogMeta = (error: unknown) => {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  }
  return { error: String(error) };
};

// Alias for createErrorLogMeta
export const createErrorLogMeta = errorToLogMeta;

// Legacy support for different import patterns
export const safeLogger = logger;
export const SafeLogger = logger;

// Default export
export default logger;
