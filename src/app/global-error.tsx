'use client';

import { useEffect } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to console in client
    logger.error('Global error boundary caught error', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });

    // Temporarily disabled Sentry due to missing dependencies
    // TODO: Re-enable after fixing OpenTelemetry dependencies
    /*
    // Report to Sentry
    Sentry.captureException(error, {
      tags: {
        component: 'global-error-boundary',
        digest: error.digest,
      },
      level: 'error',
      contexts: {
        react: {
          componentStack: error.stack || 'No stack trace available',
        },
      },
    });
    */
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-4 text-6xl font-bold text-red-600">500</h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Something went wrong!</h2>
            <p className="mb-8 text-gray-600">
              We apologize for the inconvenience. Our team has been notified and is working on a
              fix.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={reset}

                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Go Home
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              If the problem persists, please contact us at{' '}
              <a
                href="tel:1-844-YO-PELEO"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                1-844-YO-PELEO
              </a>
            </p>
          </div>
        </div>

        {/* Add error details in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mx-auto mt-8 max-w-4xl p-4">
            <details className="rounded-lg border border-red-200 bg-red-50 p-4">
              <summary className="cursor-pointer font-medium text-red-800">
                Error Details (Development Only)
              </summary>
              <pre className="mt-4 overflow-auto text-sm text-red-700">
                {error.stack || error.message}
              </pre>
              {error.digest && (
                <p className="mt-2 text-sm text-red-600">Error ID: {error.digest}</p>
              )}
            </details>
          </div>
        )}
      </body>
    </html>
  );
}
