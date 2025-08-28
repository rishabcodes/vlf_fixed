import type { LogMeta } from '../../types/logger';

/**
 * Safely converts an unknown error to a LogMeta object
 * @param error - The error to convert (unknown type)
 * @returns A LogMeta object with error details
 */
export function errorToLogMeta(error: unknown): LogMeta {
  if (error instanceof Error) {
    const errorObj = error as Error & Record<string, unknown>;
    const { message, name, stack, ...customProps } = errorObj;

    // Filter out properties that might conflict with LogMeta
    const logMetaReservedKeys = new Set([
      'traceId',
      'spanId',
      'timestamp',
      'requestId',
      'component',
      'category',
      'error',
    ]);

    const filteredCustomProps = Object.fromEntries(
      Object.entries(customProps).filter(([key]) => !logMetaReservedKeys.has(key))
    );

    return {
      error: {
        message,
        name,
        stack,
        // Include custom error properties that don't conflict
        ...filteredCustomProps,
      },
    };
  }

  if (typeof error === 'string') {
    return {
      error: {
        message: error,
        type: 'string',
      },
    };
  }

  if (error && typeof error === 'object') {
    return {
      error: {
        message: String(error),
        type: 'object',
        details: error,
      },
    };
  }

  // Fallback for any other type
  return {
    error: {
      message: String(error),
      type: typeof error,
      value: error,
    },
  };
}

/**
 * Creates a LogMeta object with error and additional metadata
 * @param error - The error to include
 * @param additionalMeta - Additional metadata to merge
 * @returns A LogMeta object
 */
export function createErrorLogMeta(error: unknown, additionalMeta?: LogMeta): LogMeta {
  return {
    ...additionalMeta,
    ...errorToLogMeta(error),
  };
}
