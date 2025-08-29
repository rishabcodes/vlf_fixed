'use client';

import { useEffect } from 'react';
import { ensureDOMSafety } from '@/lib/dom/initialize-dom-safety';
import { patchReactDOM } from '@/lib/dom/react-dom-patch';

export function DOMSafetyInitializer() {
  useEffect(() => {
    // Initialize React DOM patches first
    patchReactDOM();
    
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