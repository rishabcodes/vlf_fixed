'use client';

import { useEffect } from 'react';
import { performanceLogger } from '@/lib/safe-logger';

export function QwikPerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Wait for page load to complete
      const measurePerformance = () => {
        const perfData = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;

        if (perfData) {
          const metrics = {
            // JavaScript execution time
            jsParseTime: perfData.domInteractive - perfData.responseEnd,
            // DOM construction time
            domConstructionTime: perfData.domComplete - perfData.domInteractive,
            // Time to Interactive
            tti: perfData.loadEventEnd - perfData.fetchStart,
            // First Contentful Paint
            fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
            // Total transfer size
            transferSize: perfData.transferSize || 0,
            // Decoded body size (actual JavaScript size)
            decodedBodySize: perfData.decodedBodySize || 0,
          };

          // Calculate JavaScript bundle sizes
          const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
          const jsResources = resources.filter(r => r.name.includes('.js'));
          const qwikResources = jsResources.filter(r => r.name.includes('qwik'));
          const reactResources = jsResources.filter(r => !r.name.includes('qwik'));

          const jsMetrics = {
            totalJsSize: jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
            qwikJsSize: qwikResources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
            reactJsSize: reactResources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
            jsResourceCount: jsResources.length,
            qwikResourceCount: qwikResources.length,
            reactResourceCount: reactResources.length,
          };

          performanceLogger.info('Qwik Performance Metrics', {
            pageLoadMetrics: metrics,
            jsBundleAnalysis: jsMetrics,
            jsReductionPercent: ((1 - jsMetrics.qwikJsSize / jsMetrics.totalJsSize) * 100).toFixed(2)
          });

          // Send metrics to analytics if needed
          if (window.gtag) {
            window.gtag('event', 'qwik_performance', {
              event_category: 'Performance',
              event_label: 'Qwik Integration',
              value: Math.round(jsMetrics.totalJsSize / 1024), // KB
              custom_map: {
                qwik_js_size: jsMetrics.qwikJsSize,
                react_js_size: jsMetrics.reactJsSize,
                js_reduction_percent: (
                  (1 - jsMetrics.qwikJsSize / jsMetrics.totalJsSize) *
                  100
                ).toFixed(2),
              },
            });
          }
        }
      };

      // Run after page load
      if (document.readyState === 'complete') {
        setTimeout(measurePerformance, 100);
      } else {
        window.addEventListener('load', () => setTimeout(measurePerformance, 100));
      }
    }
  }, []);

  return null;
}
