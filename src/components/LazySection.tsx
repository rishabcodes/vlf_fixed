'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  className?: string;
  animateIn?: boolean;
  onInView?: () => void;
}

export default function LazySection({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = <div className="h-96 animate-pulse bg-gray-100" />,
  className = '',
  animateIn = true,
  onInView,
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !isInView) {
          setIsInView(true);
          onInView?.();
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isInView, threshold, rootMargin, onInView]);

  return (
    <div ref={ref}

                className={className}>
      <>
        {!isInView ? (
          <div
            key="fallback"
          >
            {fallback}
          </div>
        ) : (
          <div
            key="content"
            className={animateIn ? 'animate-fadeIn' : ''}
          >
            {children}
          </div>
        )}
      </>
    </div>
  );
}

// Hook for manual lazy loading control
export function useLazyLoad(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isInView };
}

// Utility for lazy loading multiple sections

export function LazyContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <LazySection key={index} threshold={0.05} rootMargin="100px" animateIn={true}>
            {child}
          </LazySection>
        ))
      ) : (
        <LazySection threshold={0.05} rootMargin="100px" animateIn={true}>
          {children}
        </LazySection>
      )}
    </div>
  );
}
