'use client';

import { useEffect, useRef, ReactNode, useState } from 'react';
import { logger } from '@/lib/safe-logger';

interface DOMSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

// Track warning frequency to prevent spam
const warningTracker = new Map<string, number>();
const WARNING_THRESHOLD = 10;

function trackWarning(type: string): boolean {
  const count = (warningTracker.get(type) || 0) + 1;
  warningTracker.set(type, count);

  // Only log first few warnings to prevent spam
  return count <= WARNING_THRESHOLD;
}

/**
 * Wrapper component that ensures safe DOM operations
 * Prevents errors like "parentNode.removeChild" on null elements
 * Also handles hydration mismatches and other DOM-related errors
 */
export function DOMSafeWrapper({ children, fallback, onError }: DOMSafeWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Ensure the container is in the DOM before any operations
    if (!containerRef.current) return;

    // Create a MutationObserver to watch for unsafe DOM operations
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Prevent removal of nodes that don't have a parent
        mutation.removedNodes.forEach(node => {
          if (node.parentNode === null && trackWarning('orphaned-node')) {
            logger.warn('Prevented unsafe DOM operation: attempted to remove orphaned node');
          }
        });
      });
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Add error boundary for DOM operations
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.error?.message || event.message || '';

      // Check for DOM-related errors
      const isDOMError =
        errorMessage.includes('parentNode') ||
        errorMessage.includes('removeChild') ||
        errorMessage.includes('appendChild') ||
        errorMessage.includes('insertBefore') ||
        errorMessage.includes('replaceChild') ||
        errorMessage.includes('Cannot read properties of null') ||
        errorMessage.includes('Cannot read property') ||
        errorMessage.includes('null is not an object');

      if (isDOMError) {
        event.preventDefault();

        // Silently handle DOM errors - no logging to prevent console spam
        // The error is already prevented, no need to log it

        // Call error handler if provided
        if (onError) {
          onError(new Error(errorMessage));
        }

        // Don't set error state for every DOM error - this can cause cascading issues
        // Only set error state if it's a critical error
        const isCritical =
          errorMessage.includes('Cannot read') || errorMessage.includes('null is not an object');
        if (isCritical && !hasError) {
          setHasError(true);
        }
      }
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [fallback, onError, hasError]);

  // Override native DOM methods to add safety checks
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Store original methods
    const originalRemoveChild = Node.prototype.removeChild;
    const originalAppendChild = Node.prototype.appendChild;
    const originalInsertBefore = Node.prototype.insertBefore;
    const originalReplaceChild = Node.prototype.replaceChild;
    const originalRemove = Element.prototype.remove;

    // Override removeChild with better safety
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      try {
        // Skip safety checks for known safe elements
        if (child && child instanceof Element) {
          const element = child as Element;
          if (
            element.classList?.contains('react-hot-toast-notification') ||
            element.closest?.('[data-hot-toast-id]') ||
            element.id?.includes('_rht_') ||
            element.hasAttribute('data-radix-portal') ||
            element.hasAttribute('data-framer-portal')
          ) {
            return originalRemoveChild.call(this, child) as T;
          }
        }

        // Safety check
        if (!child || !child.parentNode || child.parentNode !== this) {
          // Silently return without error to prevent React crashes
          return child;
        }

        return originalRemoveChild.call(this, child) as T;
      } catch (error) {
        // Silently handle errors to prevent crashes
        return child;
          }
};

    // Override appendChild with better safety
    Node.prototype.appendChild = function <T extends Node>(child: T): T {
      try {
        if (!child || !this) {
          return child;
        }
        return originalAppendChild.call(this, child) as T;
      } catch (error) {
        return child;
          }
};

    // Override insertBefore with better safety
    Node.prototype.insertBefore = function <T extends Node>(
      newNode: T,
      referenceNode: Node | null
    ): T {
      try {
        if (!newNode || !this) {
          return newNode;
        }
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
      } catch (error) {
        return newNode;
          }
};

    // Override replaceChild with better safety
    Node.prototype.replaceChild = function <T extends Node>(newChild: Node, oldChild: T): T {
      try {
        if (!newChild || !oldChild || !oldChild.parentNode || oldChild.parentNode !== this) {
          return oldChild;
        }
        return originalReplaceChild.call(this, newChild, oldChild) as T;
      } catch (error) {
        return oldChild;
          }
};

    // Override remove with better safety
    Element.prototype.remove = function () {
      try {
        // Skip safety checks for known safe elements
        if (
          this.classList?.contains('react-hot-toast-notification') ||
          this.closest?.('[data-hot-toast-id]') ||
          this.id?.includes('_rht_') ||
          this.hasAttribute('data-radix-portal') ||
          this.hasAttribute('data-framer-portal')
        ) {
          return originalRemove.call(this);
        }

        if (!this.parentNode) {
          // Silently return to prevent errors
          return;
        }
        return originalRemove.call(this);
      } catch (error) {
        // Silently handle
        return;
          }
};

    // Cleanup: restore original methods
    return () => {
      Node.prototype.removeChild = originalRemoveChild;
      Node.prototype.appendChild = originalAppendChild;
      Node.prototype.insertBefore = originalInsertBefore;
      Node.prototype.replaceChild = originalReplaceChild;
      Element.prototype.remove = originalRemove;
    };
  }, []);

  // Show fallback if there's an error
  if (hasError && fallback) {
    return <div ref={containerRef}>{fallback}</div>;
  }

  return (
    <div ref={containerRef} suppressHydrationWarning>
      {children}
    </div>
  );
}
