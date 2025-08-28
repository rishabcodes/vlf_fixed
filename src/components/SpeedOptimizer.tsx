'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/safe-logger';
import Script from 'next/script';
import {
  initializeSpeedOptimizations,
  ResourceHints,
  registerServiceWorker,
  useNetworkStatus,
} from '@/lib/performance/speed-optimizer';

export function SpeedOptimizer() {
  const { isSlowNetwork, connectionType } = useNetworkStatus();

  useEffect(() => {
    // Initialize all speed optimizations
    initializeSpeedOptimizations();

    // Add critical resource hints
    const criticalOrigins = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://cdnjs.cloudflare.com',
    ];

    criticalOrigins.forEach(origin => {
      ResourceHints.addPreconnect(origin);
      ResourceHints.addDnsPrefetch(origin);
    });

    // Critical resources are loaded via Next.js font optimization

    // Prefetch likely next pages
    const likelyPages = ['/contact', '/practice-areas/immigration', '/locations', '/near-me'];

    // On fast networks, prefetch more aggressively
    if (!isSlowNetwork) {
      setTimeout(() => {
        likelyPages.forEach(page => {
          ResourceHints.prefetchRoute(page);
        });
      }, 2000); // Wait 2s after initial load
    }

    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        registerServiceWorker();
      });
    }

    // Monitor performance
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (!lastEntry) return;
        
        logger.info('LCP:', lastEntry.startTime);

        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime),
            non_interaction: true,
          });
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { processingStart?: number; startTime: number }) => {
          if (entry.processingStart) {
            logger.info('FID:', entry.processingStart - entry.startTime);
          }
        });
      });

      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { hadRecentInput?: boolean; value?: number }) => {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
            logger.info('CLS:', clsValue);
          }
        });
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Implement adaptive loading based on network
    if (isSlowNetwork) {
      document.documentElement.classList.add('reduced-motion');
      document.documentElement.style.setProperty('--animation-duration', '0s');
    }

    // Clean up function
    return () => {
      // Cleanup observers if needed
    };
  }, [isSlowNetwork]);

  return (
    <>
      {/* CSS is handled by Next.js build process */}

      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Progressive Web App */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#C9974D" />
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

      {/* Optimize Google Analytics loading */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date(document.querySelector('meta[name="render-time"]')?.getAttribute('content') || new Date().toISOString()));
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
                transport_type: 'beacon',
                custom_map: {
                  dimension1: 'network_type'
                }
              });
              gtag('set', { network_type: '${connectionType}' });
            `}
          </Script>
        </>
      )}

      {/* Structured data for rich snippets */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm, PLLC',
            alternateName: 'VLF',
            url: 'https://www.vasquezlawnc.com',
            logo: 'https://www.vasquezlawnc.com/images/LOGO_TRANS.PNG',
            sameAs: [
              'https://www.facebook.com/vasquezlawfirm',
              'https://twitter.com/vasquezlawnc',
              'https://www.linkedin.com/company/vasquez-law-firm',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-844-967-3536',
              contactType: 'emergency',
              areaServed: ['North Carolina', 'Florida'],
              availableLanguage: ['English', 'Spanish'],
              contactOption: 'TollFree',
              availableHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-24:00',
            },
          }),
        }}
      />
    </>
  );
}
