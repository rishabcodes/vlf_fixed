'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/safe-logger';

export function PartytownPerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Measure main thread blocking time before and after Partytown
    const measureMainThreadBlocking = () => {
      let lastTime = performance.now();
      let blockingTime = 0;

      const checkBlocking = () => {
        const currentTime = performance.now();
        const delta = currentTime - lastTime;

        // If delta > 50ms, the main thread was blocked
        if (delta > 50) {
          blockingTime += delta - 50;
          logger.warn('Main thread blocked for', delta, 'ms');
        }

        lastTime = currentTime;
        requestAnimationFrame(checkBlocking);
      };

      requestAnimationFrame(checkBlocking);

      // Report total blocking time every 10 seconds
      setInterval(() => {
        if (blockingTime > 0) {
          logger.info('Total main thread blocking time in last 10s:', blockingTime, 'ms');

          // Send to analytics
          if (window.gtag) {
            window.gtag('event', 'performance', {
              event_category: 'Partytown',
              event_label: 'main_thread_blocking',
              value: Math.round(blockingTime),
              non_interaction: true,
            });
          }
        }
        blockingTime = 0;
      }, 10000);
    };

    // Measure third-party script impact
    const measureThirdPartyImpact = () => {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;

          // Check if it's a third-party script
          const url = resourceEntry.name;
          if (
            url.includes('googletagmanager.com') ||
            url.includes('google-analytics.com') ||
            url.includes('vercel-insights.com')
          ) {
            logger.info('Third-party script loaded:', {
              url: resourceEntry.name,
              duration: resourceEntry.duration,
              transferSize: resourceEntry.transferSize,
              workerThread: url.includes('~partytown'),
            });
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });
    };

    // Start monitoring
    measureMainThreadBlocking();
    measureThirdPartyImpact();

    // Log Partytown status
    const partytownStatus = (window as any).partytown ? 'active' : 'inactive';
    logger.info('Partytown status:', partytownStatus);

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        custom_parameter: {
          partytown_enabled: partytownStatus === 'active',
        },
      });
    }
  }, []);

  return null;
}
