import { componentLogger as logger } from '@/lib/safe-logger';

/**
 * Stream polyfill for handling ReadableStream compatibility issues
 * Only handles specific known issues without modifying prototypes
 */

// Create a safe wrapper for ReadableStream operations
export const safeStreamOperations = {
  // Safely enqueue data to a stream controller
  enqueue(controller: ReadableStreamDefaultController, chunk: unknown): void {
    try {
      // Check if the controller is in a valid state using public APIs
      if (controller.desiredSize !== null && controller.desiredSize >= 0) {
        controller.enqueue(chunk);
      }
    } catch (error) {
      // Silently ignore enqueue errors in production
      if (process.env.NODE_ENV === 'development') {
        logger.warn('Stream enqueue error:', error);
      }
    }
  },

  // Safely close a stream controller
  close(controller: ReadableStreamDefaultController): void {
    try {
      controller.close();
    } catch (error) {
      // Silently ignore close errors in production
      if (process.env.NODE_ENV === 'development') {
        logger.warn('Stream close error:', error);
      }
    }
  },

  // Safely error a stream controller
  error(controller: ReadableStreamDefaultController, error: unknown): void {
    try {
      controller.error(error);
    } catch (err) {
      // Silently ignore error method errors in production
      if (process.env.NODE_ENV === 'development') {
        logger.warn('Stream error method error:', err);
      }
    }
  },

  // Create a safe ReadableStream with error handling
  createSafeReadableStream<T>(underlyingSource: UnderlyingSource<T>): ReadableStream<T> {
    const wrappedSource: UnderlyingSource<T> = {
      ...underlyingSource,
      start: underlyingSource.start
        ? async controller => {
            try {
              await underlyingSource.start!(controller);
            } catch (error) {
              safeStreamOperations.error(controller, error);
            }
          }
        : undefined,
      pull: underlyingSource.pull
        ? async controller => {
            try {
              await underlyingSource.pull!(controller);
            } catch (error) {
              safeStreamOperations.error(controller, error);
            }
          }
        : undefined,
      cancel: underlyingSource.cancel
        ? async reason => {
            try {
              await underlyingSource.cancel!(reason);
            } catch (error) {
              logger.error('Stream cancel error:', error);
            }
          }
        : undefined,
    };

    return new ReadableStream<T>(wrappedSource);
  },
};

// Export a no-op for environments that don't support streams
export const ensureStreamSupport = () => {
  if (typeof window !== 'undefined' && !window.ReadableStream) {
    logger.warn('ReadableStream not supported in this environment');
    }
};
