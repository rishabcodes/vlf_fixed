/**
 * Async utility functions
 */

/**
 * Promise-based delay function
 * @param ms - Milliseconds to delay
 * @param signal - Optional AbortSignal for cancellation
 * @returns Promise that resolves after the specified delay
 */
export function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error('Delay was aborted'));
      return;
    }

    const timeoutId = setTimeout(() => {
      if (signal?.aborted) {
        reject(new Error('Delay was aborted'));
      } else {
        resolve();
      }
    }, ms);

    // Handle abort signal
    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new Error('Delay was aborted'));
    });
  });
}

/**
 * Promise-based timeout wrapper
 * @param promise - Promise to wrap with timeout
 * @param ms - Timeout in milliseconds
 * @param timeoutError - Optional custom timeout error
 * @returns Promise that rejects if timeout is reached
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  timeoutError?: Error
): Promise<T> {
  return Promise.race([
    promise,
    delay(ms).then(() => {
      throw timeoutError || new Error(`Operation timed out after ${ms}ms`);
    }),
  ]);
}

/**
 * Convert a callback-based function to a promise
 * @param fn - Function that accepts a callback as its last argument
 * @returns Promisified version of the function
 */
export function promisify<T extends (...args: unknown[]) => void>(
  fn: T
): (...args: Parameters<T>) => Promise<unknown> {
  return (...args: Parameters<T>) => {
    return new Promise((resolve, reject) => {
      // Remove the callback parameter type from args
      const argsWithoutCallback = args.slice(0, -1);
      
      fn(...argsWithoutCallback as Parameters<T>[number][], (err: Error | null, result?: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

/**
 * Retry a promise-based operation with exponential backoff
 * @param fn - Function that returns a promise
 * @param options - Retry options
 * @returns Promise that resolves when operation succeeds or max retries reached
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2,
    onRetry,
  } = options;

  let lastError: Error;
  let currentDelay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        if (onRetry) {
          onRetry(lastError, attempt + 1);
        }
        
        await delay(currentDelay);
        currentDelay = Math.min(currentDelay * backoffFactor, maxDelay);
      }
    }
  }

  throw lastError!;
}

/**
 * Execute promises in sequence with optional delay between each
 * @param promises - Array of promise-returning functions
 * @param delayMs - Optional delay between each execution
 * @returns Array of results in order
 */
export async function sequence<T>(
  promises: Array<() => Promise<T>>,
  delayMs?: number
): Promise<T[]> {
  const results: T[] = [];
  
  for (const promiseFn of promises) {
    results.push(await promiseFn());
    if (delayMs && promiseFn !== promises[promises.length - 1]) {
      await delay(delayMs);
    }
  }
  
  return results;
}

/**
 * Convert an async iterator to an array
 * @param iterator - Async iterator to convert
 * @param limit - Optional limit on number of items to collect
 * @returns Array of items from the iterator
 */
export async function asyncIteratorToArray<T>(
  iterator: AsyncIterator<T>,
  limit?: number
): Promise<T[]> {
  const results: T[] = [];
  let count = 0;
  
  for await (const item of { [Symbol.asyncIterator]: () => iterator }) {
    results.push(item);
    count++;
    if (limit && count >= limit) {
      break;
    }
  }
  
  return results;
}
