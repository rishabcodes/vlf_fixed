import { useState, useEffect } from 'react';

import { logger } from '@/lib/safe-logger';
/**
 * Hook to handle hydration-safe rendering
 * Returns true only after the component has mounted on the client
 */
export function useHydrationSafe() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Hook to get a client-only value with a server-side fallback
 */
export function useClientValue<T>(getValue: () => T, serverFallback: T): T {
  const [value, setValue] = useState<T>(serverFallback);

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return value;
}

/**
 * Hook for browser-specific APIs with SSR safety
 */
export function useBrowserAPI<T>(
  getBrowserValue: () => T,
  fallback: T
): { value: T; isReady: boolean } {
  const [value, setValue] = useState<T>(fallback);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setValue(getBrowserValue());
    setIsReady(true);
  }, [getBrowserValue]);

  return { value, isReady };
}

/**
 * Hook for localStorage with SSR safety
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Always use initial value on server
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      logger.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      logger.error(`Error setting localStorage key "${key}":`, error);
      }
};

  return [storedValue, setValue];
}

/**
 * Hook for sessionStorage with SSR safety
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      logger.error(`Error reading sessionStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      logger.error(`Error setting sessionStorage key "${key}":`, error);
      }
};

  return [storedValue, setValue];
}

/**
 * Hook for window dimensions with SSR safety
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
