'use client';

import { useEffect } from 'react';
import { ensureDOMSafety } from '@/lib/dom/initialize-dom-safety';

export function DOMSafetyInitializer() {
  useEffect(() => {
    // Initialize DOM safety measures as early as possible
    const cleanup = ensureDOMSafety();
    
    // Return cleanup function
    return () => {
      if (cleanup) {
        cleanup();
          }
};
  }, []);

  // This component doesn't render anything
  return null;
}