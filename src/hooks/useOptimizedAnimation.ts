'use client';

import { useEffect, useState } from 'react';
import { useDeviceCapabilities } from '@/lib/performance/device-detection';

interface OptimizedAnimationOptions {
  disableOnLowEnd?: boolean;
  respectReducedMotion?: boolean;
  delayUntilInView?: boolean;
}

export function useOptimizedAnimation(
  props: MotionProps,
  options: OptimizedAnimationOptions = {}
): MotionProps | Record<string, never> {
  const { disableOnLowEnd = true, respectReducedMotion = true } = options;
  const capabilities = useDeviceCapabilities();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (respectReducedMotion && prefersReducedMotion) {
      setShouldAnimate(false);
    } else if (disableOnLowEnd && !capabilities.canHandleAnimations) {
      setShouldAnimate(false);
    } else {
      setShouldAnimate(true);
    }
  }, [capabilities, disableOnLowEnd, respectReducedMotion]);

  return shouldAnimate ? props : {};
}
