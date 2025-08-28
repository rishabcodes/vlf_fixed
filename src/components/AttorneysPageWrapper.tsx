'use client';

import AttorneysPageContent from './AttorneysPageContent';
import { useEffect } from 'react';

export interface AttorneysPageWrapperProps {
  language: 'en' | 'es';
}

export default function AttorneysPageWrapper({ language }: AttorneysPageWrapperProps) {
  // Apply client-side polyfill as well
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof ReadableStreamDefaultController !== 'undefined') {
      // Apply the polyfill on mount to ensure it's available
      const controller = ReadableStreamDefaultController.prototype as any;
      if (!controller._polyfillApplied) {
        controller._polyfillApplied = true;
        // The polyfill is already applied globally, this is just a safety check
      }
    }
  }, []);

  return <AttorneysPageContent language={language} />;
}
