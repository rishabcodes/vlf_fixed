import { useEffect, useRef, DependencyList } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';

/**
 * Custom useEffect that ensures proper cleanup and prevents common issues
 * - Handles cleanup automatically
 * - Prevents setState on unmounted components
 * - Provides proper error handling
 */
export function useSafeEffect(
  effect: (isMounted: () => boolean) => void | (() => void),
  deps?: DependencyList
): void {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const cleanup = effect(() => mountedRef.current);

    return () => {
      mountedRef.current = false;
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
        }
};
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * useEffect that only runs on mount, with proper cleanup
 */
export function useEffectOnce(effect: () => void | (() => void)): void {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true;
      return effect();
    }
  }, [effect]); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * useEffect that properly handles async operations
 */
export function useAsyncEffect(
  effect: (isMounted: () => boolean) => Promise<void>,
  deps?: DependencyList
): void {
  useEffect(() => {
    let isMounted = true;

    const runEffect = async () => {
      try {
        await effect(() => isMounted);
      } catch (error) {
        if (isMounted) {
          logger.error('Async effect error:', error);
        }
        }
};

    runEffect();

    return () => {
      isMounted = false;
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
