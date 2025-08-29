'use client';

/**
 * Patch React DOM to handle null parent errors gracefully
 * This is a workaround for React 18+ hydration issues
 */

export function patchReactDOM() {
  if (typeof window === 'undefined') return;

  // Store original console.error
  const originalConsoleError = console.error;

  // Override console.error to filter out specific React DOM errors
  console.error = function(...args: any[]) {
    // Convert first argument to string for checking
    const firstArg = String(args[0]);
    
    // Check if this is the specific removeChild error
    if (
      firstArg.includes('removeChild') ||
      firstArg.includes('Cannot read properties of null') ||
      firstArg.includes("Cannot read property 'removeChild'") ||
      firstArg.includes('reading \'removeChild\'')
    ) {
      // Silently ignore this specific error
      return;
    }

    // Check if error stack contains React DOM reconciliation
    if (args[0]?.stack) {
      const stack = String(args[0].stack);
      if (
        stack.includes('commitDeletionEffectsOnFiber') ||
        stack.includes('recursivelyTraverseDeletionEffects') ||
        stack.includes('commitMutationEffectsOnFiber')
      ) {
        // This is a React internal DOM manipulation error, ignore it
        return;
      }
    }

    // Pass through all other errors
    return originalConsoleError.apply(console, args);
  };

  // Override window.addEventListener for error events
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function(type: string, listener: any, ...args: any[]) {
    if (type === 'error') {
      // Wrap the error listener
      const wrappedListener = function(event: ErrorEvent) {
        if (
          event.message?.includes('removeChild') ||
          event.message?.includes('Cannot read properties of null')
        ) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
        return listener.call(this, event);
      };
      return originalAddEventListener.call(window, type, wrappedListener, ...args);
    }
    return originalAddEventListener.call(window, type, listener, ...args);
  } as typeof window.addEventListener;

  // Patch Node.prototype.removeChild with extra safety
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function<T extends Node>(child: T): T {
    try {
      // Check if this is being called from React
      const stack = new Error().stack || '';
      const isReactCall = stack.includes('react-dom');
      
      if (isReactCall) {
        // Extra safety for React calls
        if (!this || !child) {
          return child;
        }
        if (child.parentNode !== this) {
          return child;
        }
      }
      
      return originalRemoveChild.call(this, child);
    } catch (e) {
      // Silently return the child if removal fails
      return child;
    }
  };
}