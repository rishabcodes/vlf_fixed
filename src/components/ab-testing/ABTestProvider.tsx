'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { logger } from '@/lib/safe-logger';

interface ABTestContextType {
  getVariant: (testId: string) => string | null;
  trackConversion: (
    testId: string,
    event: string,
    value?: number,
    metadata?: Record<string, unknown>
  ) => void;
  isLoading: boolean;
  userId: string | null;
  sessionId: string;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

interface ABTestProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export function ABTestProvider({ children, userId }: ABTestProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId] = useState(() => generateSessionId());
  const [userIdState, setUserIdState] = useState<string | null>(userId || null);
  const [variants, setVariants] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (userId) {
      setUserIdState(userId);
    } else {
      // Generate anonymous user ID
      const anonymousId = getOrCreateAnonymousId();
      setUserIdState(anonymousId);
    }
    setIsLoading(false);
  }, [userId]);

  const getVariant = useCallback(
    async (testId: string): Promise<string | null> => {
      if (!userIdState) return null;

      // Check if we already have a variant for this test
      if (variants.has(testId)) {
        return variants.get(testId)!;
      }

      try {
        const response = await fetch('/api/ab-testing/assign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testId,
            userId: userIdState,
            sessionId,
            userContext: {
              userAgent: navigator.userAgent,
              deviceType: getDeviceType(),
              timestamp: new Date().toISOString(),
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.variantId) {
            setVariants(prev => new Map(prev).set(testId, data.variantId));
            return data.variantId;
          }
        }
      } catch (error) {
        logger.error('Failed to get A/B test variant', { error, testId });
      }

      return null;
    },
    [userIdState, sessionId, variants]
  );

  const trackConversion = useCallback(
    async (testId: string, event: string, value?: number, metadata?: Record<string, unknown>) => {
      if (!userIdState) return;

      const variantId = variants.get(testId);
      if (!variantId) return;

      try {
        await fetch('/api/ab-testing/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testId,
            variantId,
            userId: userIdState,
            sessionId,
            event,
            value,
            metadata,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        logger.error('Failed to track A/B test conversion', { error, testId, event });
      }
    },
    [userIdState, sessionId, variants]
  );

  const contextValue: ABTestContextType = {
    getVariant: (testId: string) => variants.get(testId) || null,
    trackConversion,
    isLoading,
    userId: userIdState,
    sessionId,
  };

  // Pre-fetch variants for active tests on mount
  useEffect(() => {
    if (!userIdState || isLoading) return;

    const fetchActiveVariants = async () => {
      try {
        const response = await fetch('/api/ab-testing/active');
        if (response.ok) {
          const data = await response.json();
          const activeTests = data.tests || [];

          // Get variants for all active tests
          for (const test of activeTests) {
            await getVariant(test.id);
          }
        }
      } catch (error) {
        logger.error('Failed to fetch active A/B tests', { error });
      }
    };

    fetchActiveVariants();
  }, [userIdState, isLoading, getVariant]);

  return <ABTestContext.Provider value={contextValue}>{children}</ABTestContext.Provider>;
}

export function useABTest(testId: string) {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider');
  }

  const [variant, setVariant] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVariantAndContent = async () => {
      setIsLoading(true);

      const variantId = context.getVariant(testId);
      setVariant(variantId);

      if (variantId) {
        try {
          const response = await fetch(
            `/api/ab-testing/content?testId=${testId}&variantId=${variantId}`
          );
          if (response.ok) {
            const data = await response.json();
            setContent(data.content);
          }
        } catch (error) {
          logger.error('Failed to fetch variant content', { error, testId, variantId });
        }
      }

      setIsLoading(false);
    };

    getVariantAndContent();
  }, [testId, context]);

  const trackEvent = useCallback(
    (event: string, value?: number, metadata?: Record<string, unknown>) => {
      context.trackConversion(testId, event, value, metadata);
    },
    [testId, context]
  );

  return {
    variant,
    content,
    isLoading,
    trackEvent,
    isVariant: (variantId: string) => variant === variantId,
  };
}

// Helper functions
function generateSessionId(): string {
  if (typeof window === 'undefined') return 'session_ssr';
  return `session_${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9)}`;
}

function getOrCreateAnonymousId(): string {
  // Return a stable ID during SSR
  if (typeof window === 'undefined') return 'anon_ssr';

  const key = 'anonymous_user_id';
  try {
    let id = localStorage.getItem(key);

    if (!id) {
      // Use crypto.randomUUID for more stable ID generation
      id = `anon_${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(key, id);
    }

    return id;
  } catch (error) {
    // Handle cases where localStorage is blocked or unavailable
    return `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = navigator.userAgent;
  if (/mobile/i.test(userAgent)) return 'mobile';
  if (/tablet/i.test(userAgent)) return 'tablet';
  return 'desktop';
}

export function useABTestContent<T = Record<string, unknown>>(
  testId: string,
  defaultContent: T
): {
  content: T;
  variant: string | null;
  trackEvent: (event: string, value?: number, metadata?: Record<string, unknown>) => void;
} {
  const { variant, content, trackEvent } = useABTest(testId);

  const finalContent = content ? { ...defaultContent, ...content } : defaultContent;

  return {
    content: finalContent as T,
    variant,
    trackEvent,
  };
}

// HOC for A/B testing components
export function withABTest<P extends object>(
  testId: string,
  defaultContent: Record<string, unknown> = {}
) {
  return function ABTestHOC(WrappedComponent: React.ComponentType<P>) {
    const ABTestComponent = (props: P) => {
      const { content, variant, trackEvent } = useABTestContent(testId, defaultContent);

      return (
        <WrappedComponent
          {...props}
          abTestContent={content}
          abTestVariant={variant}
          abTrackEvent={trackEvent}
        />
      );
    };

    ABTestComponent.displayName = `withABTest(${WrappedComponent.displayName || WrappedComponent.name})`;
    return ABTestComponent;
  };
}
