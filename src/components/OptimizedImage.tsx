'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: string;
  blurDataURL?: string;
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  containerClassName?: string;
  enableLazyLoading?: boolean;
  enableBlur?: boolean;
  sizes?: string;
  aspectRatio?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallback = '/images/placeholder.svg',
  blurDataURL,
  quality = 85,
  priority = false,
  onLoad,
  onError,
  className,
  containerClassName,
  enableLazyLoading = true,
  enableBlur = true,
  sizes,
  aspectRatio,
  ...props
}: OptimizedImageProps) {
  const [isLoadedState, setIsLoadedState] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!enableLazyLoading || priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enableLazyLoading || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
          }
};
  }, [enableLazyLoading, priority, isInView]);

  // Generate optimized sizes attribute
  const getSizes = () => {
    if (sizes) return sizes;

    // Default responsive sizes
    return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
  };

  // Generate blur data URL for better loading experience
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;

    if (enableBlur) {
      // Generate a simple blur placeholder using btoa for browser compatibility
      const svgString = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)"/>
        </svg>`;

      // Use btoa for browser-safe base64 encoding
      return `data:image/svg+xml;base64,${btoa(svgString)}`;
    }

    return undefined;
  };

  const handleLoad = () => {
    setIsLoadedState(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imageStyle = aspectRatio ? { aspectRatio } : {};

  return (
    <div
      ref={imgRef}

                className={cn(
        'relative overflow-hidden',
        !isLoadedState && 'animate-pulse bg-gray-200',
        containerClassName
      )}

                style={imageStyle}
    >
      {isInView && (
        <Image
          src={hasError ? fallback : src}

                alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes={getSizes()} placeholder={enableBlur ? 'blur' : 'empty'}
          blurDataURL={getBlurDataURL()}
                onLoad={handleLoad}
                onError={handleError} className={cn(
            'transition-opacity duration-300',
            isLoadedState ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}

      {/* Loading skeleton */}
      {!isLoadedState && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// Hook for preloading images
export const useImagePreload = (src: string) => {
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
  }, [src]);
};

// Component for critical images that should be preloaded
export function CriticalImage(props: OptimizedImageProps) {
  return <OptimizedImage {...props} priority enableLazyLoading={false} />;
}
