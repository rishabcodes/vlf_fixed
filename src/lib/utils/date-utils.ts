/**
 * Utilities for handling dates in a hydration-safe manner
 */

/**
 * Format a date string to locale string in a hydration-safe way
 * Returns ISO string on server, formats on client
 */
export function formatDateTime(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  if (typeof window === 'undefined') {
    // Server-side: return ISO string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString();
  }

  // Client-side: format with locale
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString(undefined, options);
}

/**
 * Format a date string to locale date in a hydration-safe way
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  if (typeof window === 'undefined') {
    // Server-side: return ISO date portion
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const isoString = dateObj.toISOString();
    return isoString.split('T')[0] || isoString;
  }

  // Client-side: format with locale
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(undefined, options);
}

/**
 * Format a time string in a hydration-safe way
 */
export function formatTime(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  if (typeof window === 'undefined') {
    // Server-side: return ISO time portion
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const isoString = dateObj.toISOString();
    const timePart = isoString.split('T')[1];
    if (timePart) {
      return timePart.split('.')[0] || timePart;
    }
    return isoString;
  }

  // Client-side: format with locale
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString(undefined, options);
}

/**
 * Get current timestamp in a hydration-safe way
 * Returns a fixed timestamp on server, dynamic on client
 */
export function getTimestamp(): number {
  if (typeof window === 'undefined') {
    // Server-side: return a fixed timestamp
    return 0;
  }

  // Client-side: return actual timestamp
  return Date.now();
}

/**
 * Generate a unique ID that's consistent between server and client
 */
export function generateId(prefix: string = 'id'): string {
  if (typeof window === 'undefined') {
    // Server-side: return a predictable ID
    return `${prefix}_server`;
  }

  // Client-side: return a unique ID
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if we're on the client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get a value only on client side, with a fallback for server
 */
export function clientOnly<T>(clientValue: () => T, serverFallback: T): T {
  if (typeof window === 'undefined') {
    return serverFallback;
  }
  return clientValue();
}

/**
 * Hook to use client-only values after hydration
 */
export function useClientOnly<T>(getValue: () => T, fallback: T): T {
  const [value, setValue] = React.useState<T>(fallback);

  React.useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return value;
}

// Re-export React for the hook
import * as React from 'react';
