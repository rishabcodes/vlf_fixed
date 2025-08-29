'use client';

import React, { Component, ReactNode } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamically import with no SSR
const IsolatedRetellClient = dynamic(
  () => import('./IsolatedRetellClient').then(mod => ({ default: mod.IsolatedRetellClient })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    ),
  }
);

interface VoiceAssistantWrapperProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorCount: number;
}

// Local error boundary specifically for voice assistant
class VoiceErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError(error: any): Partial<ErrorBoundaryState> {
    logger.error('[VoiceErrorBoundary] Caught error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    logger.error('[VoiceErrorBoundary] Error details:', error, errorInfo);
    
    // Increment error count
    this.setState(prevState => ({
      errorCount: prevState.errorCount + 1
    }));
    
    // Call parent error handler
    this.props.onError();
    
    // Auto-reset after 2 seconds if less than 3 errors
    if (this.state.errorCount < 3) {
      setTimeout(() => {
        this.setState({ hasError: false });
      }, 2000);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.state.errorCount >= 3) {
        // Don't render anything after 3 failures
        return null;
      }
      
      // Show error message briefly
      return (
        <div className="fixed bottom-20 right-20 bg-red-500 text-white p-4 rounded-lg shadow-lg z-[100000]">
          Voice assistant temporarily unavailable. Retrying...
        </div>
      );
    }

    return this.props.children;
  }
}

export const VoiceAssistantWrapper: React.FC<VoiceAssistantWrapperProps> = (props) => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  
  const handleError = React.useCallback(() => {
    logger.error('[VoiceAssistantWrapper] Voice assistant encountered an error');
    
    // Disable for 5 seconds after error
    setIsEnabled(false);
    setTimeout(() => {
      setIsEnabled(true);
    }, 5000);
    
    // Close the modal
    props.onClose();
  }, [props]);

  if (!props.isActive || !isEnabled) {
    return null;
  }

  return (
    <VoiceErrorBoundary onError={handleError}>
      <IsolatedRetellClient {...props} />
    </VoiceErrorBoundary>
  );
};