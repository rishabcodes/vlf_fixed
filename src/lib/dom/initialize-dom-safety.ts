import { logger } from '@/lib/safe-logger';

/**
 * Initialize global DOM safety measures
 * This should be called early in the application lifecycle
 */

export function initializeDOMSafety(): (() => void) | undefined {
  if (typeof window === 'undefined') return;

  // Global error handler for DOM errors
  const originalError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const errorMessage = error?.message || String(message);

    // Check for DOM-related errors
    const isDOMError =
      errorMessage.includes('null is not an object') ||
      errorMessage.includes('Cannot read properties of null') ||
      errorMessage.includes('Cannot read property') ||
      errorMessage.includes('parentNode') ||
      errorMessage.includes('removeChild') ||
      errorMessage.includes('appendChild') ||
      errorMessage.includes('insertBefore') ||
      errorMessage.includes('replaceChild');

    if (isDOMError) {
      // Silently handle DOM errors to prevent console spam
      // Only log in development if needed for debugging
      // logger.debug('DOM Error intercepted:', errorMessage);

      // Prevent the error from propagating
      return true;
    }

    // Call original error handler if it exists
    if (originalError) {
      return originalError.call(window, message, source, lineno, colno, error);
    }

    return false;
  };

  // Add unhandled rejection handler for Promise-based DOM errors
  window.addEventListener('unhandledrejection', event => {
    const reason = event.reason;
    if (reason instanceof Error) {
      const errorMessage = reason.message;

      if (
        errorMessage.includes('null is not an object') ||
        errorMessage.includes('Cannot read properties of null') ||
        errorMessage.includes('parentNode') ||
        errorMessage.includes('removeChild')
      ) {
        // Silently handle DOM Promise rejections
        // logger.debug('Unhandled DOM Promise rejection:', reason);
        event.preventDefault();
      }
    }
  });

  // Monitor DOM mutations for orphaned nodes
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Check for nodes being removed
        mutation.removedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Mark the element to prevent future operations
            element.setAttribute('data-dom-removed', 'true');
          }
        });
      });
    });

    // Observe the entire document
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  // Patch console.error to catch DOM errors in third-party libraries
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const firstArg = args[0];
    if (typeof firstArg === 'string') {
      const isDOMError =
        firstArg.includes('null is not an object') ||
        firstArg.includes('Cannot read properties of null') ||
        firstArg.includes('parentNode') ||
        firstArg.includes('removeChild');

      if (isDOMError) {
        // Silently suppress DOM errors in console
        return;
      }
    }

    // Call original console.error
    originalConsoleError.apply(console, args);
  };

  // Add safety checks to native DOM methods
  const safetyPatches = {
    removeChild: {
      original: Node.prototype.removeChild,
      patch: function (this: Node, child: Node) {
        if (!child || !child.parentNode || child.parentNode !== this) {
          // Silently prevent unsafe operation
          return child;
        }
        return safetyPatches.removeChild.original.call(this, child);
      },
    },
    appendChild: {
      original: Node.prototype.appendChild,
      patch: function (this: Node, child: Node) {
        if (!child || !this) {
          // Silently prevent unsafe operation
          return child;
        }
        return safetyPatches.appendChild.original.call(this, child);
      },
    },
    insertBefore: {
      original: Node.prototype.insertBefore,
      patch: function (this: Node, newNode: Node, referenceNode: Node | null) {
        if (!newNode || !this) {
          // Silently prevent unsafe operation
          return newNode;
        }
        return safetyPatches.insertBefore.original.call(this, newNode, referenceNode);
      },
    },
    // replaceChild: handled by DOMSafeWrapper.tsx to avoid conflicts
    remove: {
      original: Element.prototype.remove,
      patch: function (this: Element) {
        if (!this.parentNode) {
          // Silently prevent unsafe operation
          return;
        }
        // Check if element was already marked as removed
        if (this.hasAttribute('data-dom-removed')) {
          // Silently prevent unsafe operation
          return;
        }
        return safetyPatches.remove.original.call(this);
      },
    },
  };

  // Apply patches
  Node.prototype.removeChild = safetyPatches.removeChild.patch as typeof Node.prototype.removeChild;
  Node.prototype.appendChild = safetyPatches.appendChild.patch as typeof Node.prototype.appendChild;
  Node.prototype.insertBefore = safetyPatches.insertBefore.patch as typeof Node.prototype.insertBefore;
  // Node.prototype.replaceChild handled by DOMSafeWrapper.tsx
  Element.prototype.remove = safetyPatches.remove.patch;

  // Return cleanup function
  return () => {
    // Restore original methods
    Node.prototype.removeChild = safetyPatches.removeChild.original;
    Node.prototype.appendChild = safetyPatches.appendChild.original;
    Node.prototype.insertBefore = safetyPatches.insertBefore.original;
    // Node.prototype.replaceChild handled by DOMSafeWrapper.tsx
    Element.prototype.remove = safetyPatches.remove.original;

    // Restore console.error
    console.error = originalConsoleError;
  };
}

/**
 * Check if DOM safety is already initialized
 */
let isInitialized = false;

export function ensureDOMSafety(): (() => void) | undefined {
  if (!isInitialized && typeof window !== 'undefined') {
    isInitialized = true;
    return initializeDOMSafety();
  }
  return undefined;
}
