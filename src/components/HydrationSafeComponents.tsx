'use client';

import dynamic from 'next/dynamic';

// Wrap components that cause hydration issues
export const SafeDynamicHreflang = dynamic(
  () => import('./SEO/DynamicHreflang').then(mod => mod.DynamicHreflang),
  {
    ssr: false,
    loading: () => null,
  }
);

export const SafeSpeedOptimizer = dynamic(
  () => import('./SpeedOptimizer').then(mod => mod.SpeedOptimizer),
  {
    ssr: false,
    loading: () => null,
  }
);

export const SafePerformanceMonitor = dynamic(() => import('./PerformanceMonitor'), {
  ssr: false,
  loading: () => null,
});

export const SafeNavigationDebugger = dynamic(
  () => import('./NavigationDebugger').then(mod => mod.NavigationDebugger),
  {
    ssr: false,
    loading: () => null,
  }
);

export const SafePartytownPerformanceMonitor = dynamic(
  () => import('./PartytownPerformanceMonitor').then(mod => mod.PartytownPerformanceMonitor),
  {
    ssr: false,
    loading: () => null,
  }
);
