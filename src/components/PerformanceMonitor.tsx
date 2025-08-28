'use client';

import React, { useEffect, useRef } from 'react';
import { logger } from '@/lib/safe-logger';
import EnhancedPerformanceMonitor from '@/lib/performance/enhanced-monitor';
import WebVitalsOptimizer from '@/lib/performance/web-vitals-optimizer';
import AccessibilityChecker from '@/lib/accessibility/a11y-checker';

export default function PerformanceMonitor() {
  const performanceMonitorRef = useRef<EnhancedPerformanceMonitor | null>(null);
  const webVitalsOptimizerRef = useRef<WebVitalsOptimizer | null>(null);
  const accessibilityCheckerRef = useRef<AccessibilityChecker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let performanceInterval: NodeJS.Timeout;
    let memoryInterval: NodeJS.Timeout;

    // Initialize Enhanced Performance Monitor
    performanceMonitorRef.current = new EnhancedPerformanceMonitor();
    const stopMonitoring = performanceMonitorRef.current.startRealTimeMonitoring();

    // Initialize Web Vitals Optimizer
    webVitalsOptimizerRef.current = new WebVitalsOptimizer();
    const stopWebVitalsMonitoring = webVitalsOptimizerRef.current.startContinuousMonitoring();

    // Apply automatic optimizations
    WebVitalsOptimizer.implementOptimizations();

    // Initialize Accessibility Checker (only in development)
    if (process.env.NODE_ENV === 'development') {
      accessibilityCheckerRef.current = new AccessibilityChecker();

      // Run accessibility check after page load
      const runA11yCheck = () => {
        if (accessibilityCheckerRef.current) {
          const report = accessibilityCheckerRef.current.checkDocument();
          accessibilityCheckerRef.current.logReport();

          if (report.summary.errors > 0) {
            logger.warn('Accessibility issues detected', {
              errors: report.summary.errors,
              warnings: report.summary.warnings,
              score: report.score,
            });
          }
        };

      // Run check after initial load and on route changes
      setTimeout(runA11yCheck, 2000);

      // Monitor for dynamic content changes
      const observer = new MutationObserver(() => {
        clearTimeout((window as Window & { a11yCheckTimeout?: NodeJS.Timeout }).a11yCheckTimeout);
        (window as Window & { a11yCheckTimeout?: NodeJS.Timeout }).a11yCheckTimeout = setTimeout(runA11yCheck, 1000);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    // Monitor Core Web Vitals and report issues
    const checkWebVitals = () => {
      if (webVitalsOptimizerRef.current) {
        const score = webVitalsOptimizerRef.current.getPerformanceScore();
        const recommendations = webVitalsOptimizerRef.current.getOptimizationRecommendations();

        if (score < 80) {
          logger.warn('Performance optimization needed', {
            score,
            recommendations: recommendations.slice(0, 3), // Top 3 recommendations
          });
        }
      }
    };

    // Check performance every 30 seconds
    performanceInterval = setInterval(checkWebVitals, 30000);

    // Monitor memory usage
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number; totalJSHeapSize: number } }).memory!;
        const memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

        if (memoryUsage > 80) {
          logger.warn('High memory usage detected', {
            usedHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024),
            totalHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024),
            heapLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
            usagePercentage: Math.round(memoryUsage),
          });
        }
      }
    };

    memoryInterval = setInterval(monitorMemory, 60000); // Check every minute

    // Monitor network conditions
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection?: { effectiveType: string; downlink: number; rtt: number; saveData: boolean; addEventListener: (event: string, handler: () => void) => void } }).connection!;

      const logNetworkInfo = () => {
        logger.info('Network conditions', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        });

        // Adapt loading strategy based on connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          logger.info('Slow connection detected, implementing optimizations');
          // Implement aggressive optimizations for slow connections
          document.documentElement.classList.add('slow-connection');
        }
      };

      logNetworkInfo();
      connection.addEventListener('change', logNetworkInfo);
    }

    // Cleanup function
    return () => {
      stopMonitoring();
      stopWebVitalsMonitoring();
      clearInterval(performanceInterval);
      clearInterval(memoryInterval);

      if (performanceMonitorRef.current) {
        performanceMonitorRef.current.cleanup();
      }

      if (webVitalsOptimizerRef.current) {
        webVitalsOptimizerRef.current.cleanup();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Report final metrics when component unmounts
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (performanceMonitorRef.current) {
        performanceMonitorRef.current.logMetrics();
      }

      if (webVitalsOptimizerRef.current) {
        const report = webVitalsOptimizerRef.current.generateReport();
        logger.info('Final Performance Report', { report });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}
