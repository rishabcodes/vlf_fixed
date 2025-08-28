'use client';

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

import { logger } from '@/lib/safe-logger';
export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: unknown[];
}

// Thresholds based on Web Vitals standards
const thresholds = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return 'needs-improvement';

  if (value <= threshold.good) return 'good';
  if (value > threshold.poor) return 'poor';
  return 'needs-improvement';
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to your analytics endpoint
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      non_interaction: true,
    } as any);
  }

  // Send to our telemetry system for p99 tracking
  if (typeof window !== 'undefined') {
    // Log metrics for now - telemetry can be implemented later
    logger.info('[Web Vitals Telemetry]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    logger.info('[Web Vitals]', metric);
  }
}

export function reportWebVitals(onReport?: (metric: WebVitalsMetric) => void) {
  const handleReport = (metric: Metric) => {
    const enhancedMetric: WebVitalsMetric = {
      name: metric.name,
      value: metric.value,
      rating: getRating(metric.name, metric.value),
      delta: metric.delta,
      entries: metric.entries,
    };

    sendToAnalytics(enhancedMetric);

    if (onReport) {
      onReport(enhancedMetric);
      }
};

  onCLS(handleReport);
  onFCP(handleReport);
  onINP(handleReport);
  onLCP(handleReport);
  onTTFB(handleReport);
}

// Performance observer for custom metrics
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Observe long tasks
  try {
    const longTaskObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          logger.warn('[Performance] Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name,
          });
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long task observer not supported
  }

  // Observe layout shifts
  try {
    const layoutShiftObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
          sources?: unknown[];
        };
        if (layoutShift.hadRecentInput) continue;
        logger.info('[Performance] Layout shift:', {
          value: layoutShift.value,
          sources: layoutShift.sources,
        });
      }
    });
    layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // Layout shift observer not supported
  }
}
