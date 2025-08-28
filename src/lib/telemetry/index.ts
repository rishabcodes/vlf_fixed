import { apiLogger, performanceLogger } from '@/lib/safe-logger';

/**
 * Telemetry System Index
 * Central exports for comprehensive performance monitoring
 */

// Re-export middleware
export * from './api-middleware';

// Placeholder for telemetry functions that were referenced
export const trackWebVitals = (metric: { name: string; value: number; id: string; delta: number }) => {
  performanceLogger.info('Web vitals tracked', { metric });
};

export const vlfTelemetry = {
  getTraceContext: () => {
    return {
      traceId: 'placeholder-trace-id',
      spanId: 'placeholder-span-id',
    };
  },
};

// SLI Tracker placeholder
export const sliTracker = {
  recordApiCall: (endpoint: string, duration: number, status: number) => {
    performanceLogger.info(
      'API call tracked',
      {
        endpoint,
        duration,
        status,
        p99: duration > 50,
      }
    );
  },
  recordDatabaseQuery: (query: string, duration: number) => {
    performanceLogger.info(
      'Database query tracked',
      {
        query,
        duration,
        p99: duration > 50,
      }
    );
  },
  recordBusinessProcess: (process: string, duration: number, success: boolean) => {
    performanceLogger.info(
      'Business process tracked',
      {
        process,
        duration,
        success,
        p99: duration > 50,
      }
    );
  },
};
