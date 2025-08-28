'use client';

import { useEffect } from 'react';
import { initializeExternalScriptGuardian } from '@/lib/external-script-guardian';

export function ExternalScriptGuardian() {
  useEffect(() => {
    // Initialize the guardian when component mounts
    initializeExternalScriptGuardian();
  }, []);

  // This component doesn't render anything
  return null;
}
