'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class StreamErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log streaming-related errors in development
    if (process.env.NODE_ENV === 'development') {
      if (
        error.message.includes('ReadableStream') ||
        error.message.includes('controller') ||
        error.message.includes('enqueue')
      ) {
        logger.warn('Stream error caught by boundary:', error);
      } else {
        logger.error('Uncaught error:', error, errorInfo);
      }}

  public override render() {
    if (this.state.hasError) {
      // Check if it's a streaming error
      const isStreamError =
        this.state.error?.message.includes('ReadableStream') ||
        this.state.error?.message.includes('controller');

      if (isStreamError) {
        // For streaming errors, just render children without the streaming functionality
        // Reset the error boundary
        this.setState({ hasError: false, error: null });
        return this.props.children;
      }

      // For other errors, show fallback
      return (
        this.props.fallback || (
          <div className="p-4 text-center">
            <p className="text-gray-600">Something went wrong. Please refresh the page.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useStreamErrorHandler() {
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.message?.includes('ReadableStream') ||
        event.error?.message?.includes('controller')
      ) {
        // Prevent the error from propagating
        event.preventDefault();
        event.stopPropagation();

        if (process.env.NODE_ENV === 'development') {
          logger.warn('Stream error intercepted:', event.error);
            }
};

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
}
}
}
