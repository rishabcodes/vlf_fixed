import { componentLogger as logger } from '@/lib/safe-logger';

// Edge-compatible logger for middleware
// This logger doesn't use any Node.js APIs

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

function shouldLog(level: keyof typeof logLevels): boolean {
  return logLevels[level] <= logLevels[currentLevel as keyof typeof logLevels];
}

function formatLog(level: string, message: string, meta?: any): string {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
}

export const edgeLogger = {
  error: (message: string, meta?: any) => {
    if (shouldLog('error')) {
      logger.error(formatLog('error', message, meta));
    }
  },
  warn: (message: string, meta?: any) => {
    if (shouldLog('warn')) {
      logger.warn(formatLog('warn', message, meta));
    }
  },
  info: (message: string, meta?: any) => {
    if (shouldLog('info')) {
      logger.info(formatLog('info', message, meta));
    }
  },
  debug: (message: string, meta?: any) => {
    if (shouldLog('debug')) {
      logger.info(formatLog('debug', message, meta));
    }
  },
};

export default edgeLogger;
