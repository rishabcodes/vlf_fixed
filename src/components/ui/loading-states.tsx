'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { block } from 'million/react';

// Simple Skeleton component
function Skeleton({ variant = 'text', className }: { variant?: 'text' | 'circular'; className?: string }) {
  return (
    <div 
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        variant === 'circular' ? 'rounded-full' : 'rounded',
        className
      )}
    />
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Create the original LoadingSpinner component
function LoadingSpinnerComponent({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-primary',
          sizeClasses[size]
        )}
      />
    </div>
  );
}

// Create a block-optimized version
export const LoadingSpinner = block(LoadingSpinnerComponent);

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
}

// Create the original Skeleton component
function SkeletonComponent({
  className,
  variant = 'rectangular',
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-800';

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-md',
    circular: 'rounded-full',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], animationClasses[animation], className)}
    />
  );
}

// Create a block-optimized version
export const Skeleton = block(SkeletonComponent);

interface ContentLoaderProps {
  lines?: number;
  showAvatar?: boolean;
  className?: string;
}

// Create the original ContentLoader component
function ContentLoaderComponent({ lines = 3, showAvatar = false, className }: ContentLoaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {showAvatar && (
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" className="h-10 w-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      )}

      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-4/5' : 'w-full')}
        />
      ))}
    </div>
  );
}

// Create a block-optimized version
export const ContentLoader = block(ContentLoaderComponent);

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingOverlay({
  visible,
  message = 'Loading...',
  fullScreen = false,
  className,
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm',
        fullScreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10',
        className
      )}
    >
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        {message && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{message}</p>
        )}
      </div>
    </div>
  );
}

// Lazy loading wrapper with loading state
interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
}

export function LazyLoadWrapper({ children, fallback, minHeight = '200px' }: LazyLoadWrapperProps) {
  return (
    <React.Suspense
      fallback={
        fallback || (
          <div style={{ minHeight}} className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )
      }
    >
      {children}
    </React.Suspense>
  );
}
