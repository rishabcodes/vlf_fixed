'use client';

import { useEffect } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';

export function ResourceDiagnostics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor all resource loading
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          
          // Check for failed resources
          if (resourceEntry.responseStatus === 0 || resourceEntry.responseStatus >= 400) {
            logger.warn('[Resource Load Failed]', {
              url: resourceEntry.name,
              status: resourceEntry.responseStatus,
              type: resourceEntry.initiatorType,
              duration: resourceEntry.duration,
            });
          }}
    });

    // Start observing resource timings
    try {
      observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      logger.error('[Resource Observer Error]', error);
    }

    // Monitor image loading errors specifically
    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement;
      logger.warn('[Image Load Failed]', {
        src: target.src,
        alt: target.alt,
        currentSrc: target.currentSrc,
      });
    };

    // Add global image error handler
    window.addEventListener('error', handleImageError, true);

    // Check for missing resources on page load
    const checkResources = () => {
      // Check all images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
          logger.warn('[Image Not Loaded]', {
            src: img.src,
            alt: img.alt,
          });
        }
      });

      // Check all scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        // Scripts don't have a reliable way to check if loaded
        // but we can log them for debugging
        const src = (script as HTMLScriptElement).src;
        if (src && (src.includes('wb_async') || src.includes('pageView'))) {
          logger.warn('[Suspicious Script Found]', src);
        }
      });

      // Check all stylesheets
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('/') && !href.includes(window.location.hostname)) {
          logger.info('[External Stylesheet]', href);
        }
      });
    };

    // Run check after page loads
    if (document.readyState === 'complete') {
      checkResources();
    } else {
      window.addEventListener('load', checkResources);
    }

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('error', handleImageError, true);
      window.removeEventListener('load', checkResources);
    };
  }, []);

  // Development-only diagnostic panel
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        padding: '8px 12px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        fontSize: '12px',
        borderRadius: '4px',
        zIndex: 9999,
        fontFamily: 'monospace',
      }}
    >
      Resource Diagnostics Active
    </div>
  );
}
}
