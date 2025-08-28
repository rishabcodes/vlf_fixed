'use client';

import React, { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';

interface OptimizedPageWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Generic loading component
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-400 text-lg">Loading...</p>
    </div>
  </div>
);

export function OptimizedPageWrapper({ 
  children, 
  fallback = <PageLoadingFallback /> 
}: OptimizedPageWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

// HOC for dynamic imports with loading states
export function withOptimizedLoading<P extends object>(
  Component: React.ComponentType<P>,
  customFallback?: ReactNode
) {
  return dynamic(() => Promise.resolve(Component), {
    ssr: true,
    loading: () => (customFallback || <PageLoadingFallback />) as React.ReactElement,
  });
}
