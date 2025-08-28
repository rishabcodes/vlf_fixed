'use client';

import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export function PartytownSpeedInsights() {
  // Vercel Speed Insights can remain on the main thread as it's performance monitoring
  // But we'll optimize how it loads
  return <SpeedInsights />;
}

export function PartytownAnalytics() {
  // Vercel Analytics can be moved to Web Worker
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script id="vercel-analytics-init" strategy="worker" type="text/partytown">
        {`
          // Initialize Vercel Analytics in Web Worker
          window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
        `}
      </Script>
      <Analytics
        // Tell Analytics to use the worker-compatible mode
        mode="production"
      />
    </>
  );
}
