'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/safe-logger';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationDebugger() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Log navigation events
    logger.info('[NavigationDebugger] Route changed:', {
      pathname,
      searchParams: searchParams?.toString() || '',
      timestamp: new Date().toISOString(),
    });

    // Check for hydration mismatches
    if (typeof window !== 'undefined') {
      const serverRenderedPath = document
        .querySelector('meta[name="server-path"]')
        ?.getAttribute('content');
      if (serverRenderedPath && serverRenderedPath !== pathname) {
        logger.error('[NavigationDebugger] Hydration mismatch detected:', {
          serverPath: serverRenderedPath,
          clientPath: pathname,
        });
      }
    }

    // Monitor for navigation errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('navigation') || event.message.includes('route')) {
        logger.error('[NavigationDebugger] Navigation error:', {
          message: event.message,
          source: event.filename,
          line: event.lineno,
          column: event.colno,
          error: event.error,
        });
          }
};

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [pathname, searchParams]);

  // Add meta tag for server-rendered path
  if (typeof window === 'undefined') {
    return <meta name="server-path" content={pathname || '/'} />;
  }

  return null;
}
