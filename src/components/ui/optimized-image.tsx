'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  lowQualitySrc?: string;
  showSkeleton?: boolean;
  aspectRatio?: string;
  critical?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  lowQualitySrc,
  showSkeleton = true,
  aspectRatio,
  critical = false,
  className,
  priority = false,
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src);

  // Use priority loading for critical images
  const shouldPrioritize = critical || priority;

  useEffect(() => {
    // Progressive image loading
    if (lowQualitySrc && currentSrc === lowQualitySrc) {
      const img = new window.Image();
      img.src = String(src);
      img.onload = () => {
        setCurrentSrc(src);
      };
    }
  }, [src, lowQualitySrc, currentSrc]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc) {
      setCurrentSrc(fallbackSrc);
        }
};

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
    >
      {/* Skeleton loader */}
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
      )}

      {/* Blur placeholder for smooth loading */}
      {lowQualitySrc && currentSrc === src && (
        <Image
          src={lowQualitySrc alt=""
          fill      className="absolute inset-0 blur-lg scale-110"
                aria-hidden="true"
        />
      )}

      {/* Main image */}
      <Image
        src={hasError ? fallbackSrc : currentSrc}

                alt={alt}
        loading={shouldPrioritize ? 'eager' : loading}
        priority={shouldPrioritize}
                onLoad={handleLoad}
                onError={handleError} className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        {...props}
      />
    </div>
  );
}

// Batch image preloader for critical images
export function preloadImages(imageSrcs: string[]) {
  if (typeof window === 'undefined') return;

  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Hook for intersection observer lazy loading
export function useImageLazyLoad(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isIntersecting };
}
}
