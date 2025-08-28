import { logger } from '@/lib/safe-logger';

// Database availability check
export const isDatabaseAvailable = async (): Promise<boolean> => {
  if (process.env.NODE_ENV === 'development') {
    // In development, check if DATABASE_URL points to localhost
    const dbUrl = process.env.DATABASE_URL || '';
    if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
      logger.warn('⚠️  Using localhost database URL - some features may not work');
      return false;
    }
  }
  return true;
};

export const withDatabaseCheck = <T>(handler: () => Promise<T>, fallback: T): Promise<T> => {
  return isDatabaseAvailable()
    .then(isAvailable => {
      if (!isAvailable) {
        logger.warn('Database not available, using fallback');
        return fallback;
      }
      return handler();
    })
    .catch(error => {
      logger.error('Database check failed:', error);
      return fallback;
    });
};
