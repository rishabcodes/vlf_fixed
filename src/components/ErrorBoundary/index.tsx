'use client';

import React, { Component, ReactNode } from 'react';
import { logger } from '@/lib/safe-logger';
// import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Check if it's a DOM-related error
    const isDOMError = error.message && (
      error.message.includes('removeChild') ||
      error.message.includes('appendChild') ||
      error.message.includes('Cannot read properties of null') ||
      error.message.includes('null is not an object')
    );

    if (isDOMError) {
      // Log DOM errors differently (less severe)
      logger.debug('DOM-related error caught:', error.message);
      // Don't show error UI for DOM errors - just recover
      this.setState({ hasError: false });
      return;
    }

    logger.error('ErrorBoundary caught an error:', error, errorInfo);

    // Temporarily disabled Sentry due to missing dependencies
    // TODO: Re-enable after fixing OpenTelemetry dependencies
    /*
    // Log to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
    */
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <div className="text-8xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8 max-w-md">
              We apologize for the inconvenience. Our team has been notified and is working to fix
              the issue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-6 py-3 bg-[#188bf6] text-white rounded-md font-semibold hover:bg-[#0e5ca8] transition-colors"
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-6 py-3 border-2 border-[#188bf6] text-[#188bf6] rounded-md font-semibold hover:bg-[#188bf6] hover:text-white transition-colors"
              >
                Go Home
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left max-w-2xl mx-auto">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                  Error details (development only)
                </summary>
                <pre className="mt-4 p-4 bg-gray-100 rounded-md text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
