/**
 * Check if code is running in browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Safe window access utilities
 * Use getter functions to avoid hydration mismatches
 */
export const safeWindow = {
  get innerWidth() {
    return isBrowser ? window.innerWidth : 1024;
  },
  get innerHeight() {
    return isBrowser ? window.innerHeight : 768;
  },
  get location() {
    return isBrowser ? window.location : { href: '', pathname: '', search: '', hash: '' };
  },
  get localStorage() {
    return isBrowser
      ? window.localStorage
      : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
          clear: () => {},
        };
  },
  get sessionStorage() {
    return isBrowser
      ? window.sessionStorage
      : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
          clear: () => {},
        };
  },
};

/**
 * Execute function only in browser environment
 */
export function onClient<T>(callback: () => T): T | undefined {
  if (isBrowser) {
    return callback();
  }
  return undefined;
}

/**
 * Add event listener safely
 */
export function addWindowListener(
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) {
  if (isBrowser) {
    window.addEventListener(event, handler, options);
    return () => window.removeEventListener(event, handler, options);
  }
  return () => {};
}
