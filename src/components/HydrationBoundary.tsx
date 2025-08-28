'use client';

import { ReactNode, useEffect, useState } from 'react';

interface HydrationBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

/**
 * Prevents hydration mismatches by only rendering children after hydration
 * This helps prevent "null is not an object (evaluating 'parentNode.removeChild')" errors
 */
export function HydrationBoundary({
  children,
  fallback = null,
  className,
}: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Always render a container to prevent layout shifts
  return <div className={className}>{isHydrated ? children : fallback}</div>;
}

/**
 * Higher-order component to wrap components that have hydration issues
 */
export function withHydrationBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function HydrationBoundaryWrapper(props: P) {
    return (
      <HydrationBoundary fallback={fallback}>
        <Component {...props} />
      </HydrationBoundary>
    );
  };
}
