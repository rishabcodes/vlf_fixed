'use client';

import { useEffect, useRef, useCallback } from 'react';
import { logger } from '@/lib/safe-logger';
import * as safeDom from '@/lib/dom/safe-dom';

/**
 * Custom hook for safe DOM operations in React components
 * Prevents "null is not an object" errors and handles hydration issues
 */
export function useSafeDOM() {
  const isMountedRef = useRef(false);
  const isHydratedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    isHydratedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeRemoveChild = useCallback((parent: Node | null, child: Node | null) => {
    if (!isMountedRef.current || !isHydratedRef.current) return false;
    return safeDom.safeRemoveChild(parent, child);
  }, []);

  const safeRemove = useCallback((element: Element | null) => {
    if (!isMountedRef.current || !isHydratedRef.current) return false;
    return safeDom.safeRemove(element);
  }, []);

  const safeAppendChild = useCallback((parent: Node | null, child: Node | null) => {
    if (!isMountedRef.current || !isHydratedRef.current) return false;
    return safeDom.safeAppendChild(parent, child);
  }, []);

  const safeInsertBefore = useCallback(
    (parent: Node | null, newNode: Node | null, referenceNode: Node | null) => {
      if (!isMountedRef.current || !isHydratedRef.current) return false;
      return safeDom.safeInsertBefore(parent, newNode, referenceNode);
    },
    []
  );

  const safeReplaceChild = useCallback(
    (parent: Node | null, newChild: Node | null, oldChild: Node | null) => {
      if (!isMountedRef.current || !isHydratedRef.current) return false;
      return safeDom.safeReplaceChild(parent, newChild, oldChild);
    },
    []
  );

  const safeSetInnerHTML = useCallback((element: Element | null, html: string) => {
    if (!isMountedRef.current || !isHydratedRef.current) return false;
    return safeDom.safeSetInnerHTML(element, html);
  }, []);

  const safeQuerySelector = useCallback(
    <T extends Element>(selector: string, parent: ParentNode = document): T | null => {
      if (!isMountedRef.current || !isHydratedRef.current) return null;
      return safeDom.safeQuerySelector<T>(selector, parent);
    },
    []
  );

  const safeQuerySelectorAll = useCallback(
    <T extends Element>(selector: string, parent: ParentNode = document): NodeListOf<T> | [] => {
      if (!isMountedRef.current || !isHydratedRef.current) {
        return [] as unknown as NodeListOf<T>;
      }
      return safeDom.safeQuerySelectorAll<T>(selector, parent);
    },
    []
  );

  const waitForElement = useCallback((selector: string, timeout?: number) => {
    if (!isMountedRef.current || !isHydratedRef.current) {
      return Promise.reject(new Error('Component not mounted or hydrated'));
    }
    return safeDom.waitForElement(selector, timeout);
  }, []);

  const batchDOMOperations = useCallback((operations: (() => void)[]) => {
    if (!isMountedRef.current || !isHydratedRef.current) return;
    safeDom.batchDOMOperations(operations);
  }, []);

  const isInDOM = useCallback((element: Node | null) => {
    return safeDom.isInDOM(element);
  }, []);

  const safeCreateElement = useCallback(
    <K extends keyof HTMLElementTagNameMap>(
      tagName: K,
      options?: ElementCreationOptions
    ): HTMLElementTagNameMap[K] | null => {
      if (!isMountedRef.current || !isHydratedRef.current) return null;
      return safeDom.safeCreateElement(tagName, options);
    },
    []
  );

  const safeCloneNode = useCallback(<T extends Node>(node: T | null, deep?: boolean): T | null => {
    if (!isMountedRef.current || !isHydratedRef.current) return null;
    return safeDom.safeCloneNode(node, deep);
  }, []);

  return {
    safeRemoveChild,
    safeRemove,
    safeAppendChild,
    safeInsertBefore,
    safeReplaceChild,
    safeSetInnerHTML,
    safeQuerySelector,
    safeQuerySelectorAll,
    waitForElement,
    batchDOMOperations,
    isInDOM,
    safeCreateElement,
    safeCloneNode,
    isMounted: isMountedRef.current,
    isHydrated: isHydratedRef.current,
  };
}

/**
 * Hook to safely manipulate DOM after hydration
 */
export function useSafeDOMEffect(
  effect: () => void | (() => void),
  deps: React.DependencyList = []
) {
  const isHydrated = useRef(false);

  useEffect(() => {
    // Mark as hydrated after first render
    isHydrated.current = true;
  }, []);

  useEffect(() => {
    // Only run effect after hydration
    if (!isHydrated.current) return;

    const cleanup = effect();
    return cleanup;
  }, [effect, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Hook to detect hydration mismatch
 */
export function useHydrationMismatch() {
  const [hasMismatch, setHasMismatch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleError = (event: ErrorEvent) => {
      const message = event.error?.message || event.message || '';

      if (
        message.includes('Hydration failed') ||
        message.includes('Text content does not match') ||
        message.includes('Did not expect server HTML')
      ) {
        setHasMismatch(true);
        logger.error('Hydration mismatch detected:', message);
        }
};

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return hasMismatch;
}

// Import useState at the top of the file
import { useState } from 'react';
