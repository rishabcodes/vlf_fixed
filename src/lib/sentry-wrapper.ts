/**
 * Sentry wrapper to handle missing dependencies gracefully
 */

import { logger } from './safe-logger';

interface SentryStub {
  captureException: (error: Error, context?: any) => void;
  captureMessage: (message: string, level?: string) => void;
  setUser: (user: any) => void;
  setContext: (name: string, context: any) => void;
  withScope: (callback: (scope: any) => void) => void;
}

// Create a stub implementation
const sentryStub: SentryStub = {
  captureException: (error: Error, context?: any) => {
    logger.error('[Sentry Stub] Would capture exception', { error, context });
  },
  captureMessage: (message: string, level?: string) => {
    logger.info(`[Sentry Stub] Would capture message`, { level, message });
  },
  setUser: (user: any) => {
    logger.debug('[Sentry Stub] Would set user', { user });
  },
  setContext: (name: string, context: any) => {
    logger.debug('[Sentry Stub] Would set context', { name, context });
  },
  withScope: (callback: (scope: any) => void) => {
    // Create a mock scope
    const mockScope = {
      setTag: (key: string, value: string) => logger.debug('[Sentry Stub] Would set tag', { key, value }),
      setContext: (key: string, context: any) => logger.debug('[Sentry Stub] Would set context', { key, context }),
      setLevel: (level: string) => logger.debug('[Sentry Stub] Would set level', { level }),
    };
    callback(mockScope);
  },
};

// Export the stub implementation
// Note: This is a functional stub that logs errors for debugging
// Replace with actual Sentry import when @sentry/nextjs is installed
export const Sentry = sentryStub;