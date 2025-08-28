'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { securityLogger } from '@/lib/safe-logger';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export default function SessionProvider({ children }: Props) {
  useEffect(() => {
    // Monitor session errors
    const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const errorMessage = 'error' in event ? event.error?.message : (event as PromiseRejectionEvent).reason?.message;
      if (errorMessage?.includes('session')) {
        securityLogger.warn('[SessionProvider] Session error detected:', event);
        // Don't show error to user, just log it
          }
};

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  return (
    <NextAuthSessionProvider
      // Refetch session every 5 minutes
      refetchInterval={5 * 60}
      // Don't refetch on window focus to reduce load
      refetchOnWindowFocus={false}
      // Custom base path if needed
      basePath="/api/auth"
    >
      {children}
    </NextAuthSessionProvider>
  );
}
