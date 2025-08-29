'use client';

import React from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamically import the Retell client to avoid SSR issues
const RetellGlassmorphicClient = dynamic(
  () => import('./RetellGlassmorphicClient').then(mod => ({ default: mod.RetellGlassmorphicClient })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    ),
  }
);

interface SafeRetellClientProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
}

// Error boundary component
class RetellErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    logger.error('RetellErrorBoundary caught error:', error);
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any) {
    logger.error('Voice Assistant Error:', error, errorInfo);
    this.props.onError();
  }

  override render() {
    if (this.state.hasError) {
      return null; // Don't render anything if there's an error
    }

    return this.props.children;
  }
}

export const SafeRetellClient: React.FC<SafeRetellClientProps> = (props) => {
  const handleError = () => {
    logger.error('Voice assistant encountered an error');
    props.onClose();
  };

  if (!props.isActive) {
    return null;
  }

  return (
    <RetellErrorBoundary onError={handleError}>
      <RetellGlassmorphicClient {...props} />
    </RetellErrorBoundary>
  );
};