import React, { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  isLoading: boolean;
  error?: Error | string | null;
  children: ReactNode;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  retry?: () => void;
}

/**
 * Component to handle loading and error states consistently
 */
export function LoadingState({
  isLoading,
  error,
  children,
  loadingComponent,
  errorComponent,
  retry,
}: LoadingStateProps) {
  if (isLoading) {
    return (
      <>
        {loadingComponent || (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin text-[#6B1F2E]" />
          </div>
        )}
      </>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : error;

    return (
      <>
        {errorComponent || (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-700 text-center mb-4">{errorMessage || 'An error occurred'}</p>
            {retry && (
              <button
                onClick={retry} className="px-4 py-2 bg-[#6B1F2E] text-white rounded-md hover:bg-[#8B2635] transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}

/**
 * Skeleton loader component for better UX
 */
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`} role="status"
      aria-label="Loading"
    />
  );
}

/**
 * Content placeholder components
 */
export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i}

                className="h-4 w-full" />
    ))}
  </div>
);

export const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-lg p-4 space-y-4">
    <Skeleton className="h-40 w-full" />
    <SkeletonText lines={2} />
  </div>
);

/**
 * Data fetching states hook
 */
export function useLoadingState<T>(initialData?: T) {
  const [data, setData] = React.useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const execute = React.useCallback(async (promise: Promise<T>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await promise;
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = React.useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
  }, [initialData]);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
    setData,
  };
}
