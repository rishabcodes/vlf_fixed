'use client';

import { logger } from '@/lib/safe-logger';

interface WebVitalsMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  inp?: number; // Interaction to Next Paint
}

interface OptimizationStrategy {
  metric: keyof WebVitalsMetrics;
  threshold: number;
  actions: string[];
  priority: 'high' | 'medium' | 'low';
}

class WebVitalsOptimizer {
  private metrics: WebVitalsMetrics = {};
  private observers: PerformanceObserver[] = [];
  private strategies: OptimizationStrategy[] = [
    {
      metric: 'fcp',
      threshold: 1800,
      actions: [
        'Optimize critical CSS delivery',
        'Minimize main thread blocking time',
        'Remove unused JavaScript',
        'Optimize fonts with font-display: swap',
        'Use resource hints (preload, prefetch)',
      ],
      priority: 'high',
    },
    {
      metric: 'lcp',
      threshold: 2500,
      actions: [
        'Optimize largest contentful element',
        'Improve server response times',
        'Eliminate render-blocking resources',
        'Optimize images and use modern formats',
        'Use adaptive loading strategies',
      ],
      priority: 'high',
    },
    {
      metric: 'fid',
      threshold: 100,
      actions: [
        'Break up long tasks',
        'Optimize third-party code',
        'Use web workers for heavy computations',
        'Minimize JavaScript execution time',
        'Implement code splitting',
      ],
      priority: 'high',
    },
    {
      metric: 'cls',
      threshold: 0.1,
      actions: [
        'Set size attributes on images and videos',
        'Reserve space for ads and embeds',
        'Avoid inserting content above existing content',
        'Use transform animations instead of layout changes',
        'Preload web fonts',
      ],
      priority: 'high',
    },
    {
      metric: 'ttfb',
      threshold: 600,
      actions: [
        'Use CDN for static assets',
        'Optimize server performance',
        'Enable compression (gzip/brotli)',
        'Use edge caching',
        'Optimize database queries',
      ],
      priority: 'medium',
    },
  ];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    this.observeFCP();
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeTTFB();
    this.observeINP();
  }

  private observeFCP() {
    try {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            this.logMetric('FCP', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    } catch (error) {
      logger.warn('FCP observer failed', { error });
    }
  }

  private observeLCP() {
    try {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            this.metrics.lcp = lastEntry.startTime;
            this.logMetric('LCP', lastEntry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    } catch (error) {
      logger.warn('LCP observer failed', { error });
    }
  }

  private observeFID() {
    try {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-input') {
            const fid =
              (entry as PerformanceEventTiming & { processingStart: number }).processingStart -
              entry.startTime;
            this.metrics.fid = fid;
            this.logMetric('FID', fid);
          }
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    } catch (error) {
      logger.warn('FID observer failed', { error });
    }
  }

  private observeCLS() {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
          }
        }
        this.metrics.cls = clsValue;
        this.logMetric('CLS', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    } catch (error) {
      logger.warn('CLS observer failed', { error });
    }
  }

  private observeTTFB() {
    try {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const nav = entry as PerformanceNavigationTiming;
          const ttfb = nav.responseStart - nav.requestStart;
          this.metrics.ttfb = ttfb;
          this.logMetric('TTFB', ttfb);
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    } catch (error) {
      logger.warn('TTFB observer failed', { error });
    }
  }

  private observeINP() {
    try {
      // INP is newer and may not be supported in all browsers
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'interaction') {
            this.metrics.inp = entry.duration;
            this.logMetric('INP', entry.duration);
          }
        }
      });
      observer.observe({ entryTypes: ['event'] });
      this.observers.push(observer);
    } catch (error) {
      // INP not supported, ignore
    }
  }

  private logMetric(name: string, value: number) {
    const rating = this.getRating(name.toLowerCase() as keyof WebVitalsMetrics, value);
    logger.info(`Web Vitals - ${name}`, {
      value: Math.round(value),
      rating,
      timestamp: String(Date.now()),
    });
  }

  private getRating(
    metric: keyof WebVitalsMetrics,
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 600, poor: 1000 },
      inp: { good: 200, poor: 500 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  public getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  public getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];

    this.strategies.forEach(strategy => {
      const value = this.metrics[strategy.metric];
      if (value && value > strategy.threshold) {
        recommendations.push(...strategy.actions);
      }
    });

    return [...new Set(recommendations)]; // Remove duplicates
  }

  public getPerformanceScore(): number {
    const { fcp, lcp, fid, cls, ttfb } = this.metrics;
    let score = 100;

    // Weight the scores based on importance
    const weights = { fcp: 15, lcp: 25, fid: 25, cls: 25, ttfb: 10 };

    if (fcp) {
      const fcpScore = fcp <= 1800 ? 0 : fcp <= 3000 ? weights.fcp / 2 : weights.fcp;
      score -= fcpScore;
    }

    if (lcp) {
      const lcpScore = lcp <= 2500 ? 0 : lcp <= 4000 ? weights.lcp / 2 : weights.lcp;
      score -= lcpScore;
    }

    if (fid) {
      const fidScore = fid <= 100 ? 0 : fid <= 300 ? weights.fid / 2 : weights.fid;
      score -= fidScore;
    }

    if (cls) {
      const clsScore = cls <= 0.1 ? 0 : cls <= 0.25 ? weights.cls / 2 : weights.cls;
      score -= clsScore;
    }

    if (ttfb) {
      const ttfbScore = ttfb <= 600 ? 0 : ttfb <= 1000 ? weights.ttfb / 2 : weights.ttfb;
      score -= ttfbScore;
    }

    return Math.max(0, Math.round(score));
  }

  public generateReport(): string {
    const score = this.getPerformanceScore();
    const recommendations = this.getOptimizationRecommendations();
    const { fcp, lcp, fid, cls, ttfb } = this.metrics;

    return `
Web Vitals Performance Report
============================
Overall Score: ${score}/100

Core Web Vitals:
- First Contentful Paint (FCP): ${fcp ? `${Math.round(fcp)}ms` : 'N/A'} (${fcp ? this.getRating('fcp', fcp) : 'N/A'})
- Largest Contentful Paint (LCP): ${lcp ? `${Math.round(lcp)}ms` : 'N/A'} (${lcp ? this.getRating('lcp', lcp) : 'N/A'})
- First Input Delay (FID): ${fid ? `${Math.round(fid)}ms` : 'N/A'} (${fid ? this.getRating('fid', fid) : 'N/A'})
- Cumulative Layout Shift (CLS): ${cls ? cls.toFixed(3) : 'N/A'} (${cls ? this.getRating('cls', cls) : 'N/A'})

Additional Metrics:
- Time to First Byte (TTFB): ${ttfb ? `${Math.round(ttfb)}ms` : 'N/A'} (${ttfb ? this.getRating('ttfb', ttfb) : 'N/A'})

Optimization Recommendations:
${recommendations.length > 0 ? recommendations.map(rec => `- ${rec}`).join('\n') : '- No specific optimizations needed at this time'}
    `.trim();
  }

  public startContinuousMonitoring(interval: number = 30000): () => void {
    const intervalId = setInterval(() => {
      const score = this.getPerformanceScore();
      const recommendations = this.getOptimizationRecommendations();

      logger.info('Web Vitals Monitoring', {
        score,
        metrics: this.metrics,
        recommendationCount: recommendations.length,
      });

      // Alert if performance is degrading
      if (score < 70) {
        logger.warn('Performance Alert', {
          score,
          report: this.generateReport(),
        });
      }
    }, interval);

    return () => clearInterval(intervalId);
  }

  public cleanup() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        logger.warn('Failed to disconnect Web Vitals observer', { error });
      }
    });
    this.observers = [];
  }

  // Static method to implement specific optimizations
  public static implementOptimizations() {
    if (typeof window === 'undefined') return;

    // 1. Optimize images loading
    this.optimizeImageLoading();

    // 2. Implement font optimization
    this.optimizeFonts();

    // 3. Reduce layout shifts
    this.reduceLayoutShifts();

    // 4. Optimize third-party scripts
    this.optimizeThirdPartyScripts();

    // 5. Implement resource hints
    this.addResourceHints();
  }

  private static optimizeImageLoading() {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight;
      img.setAttribute('loading', isAboveFold ? 'eager' : 'lazy');
    });
  }

  private static optimizeFonts() {
    // Add font-display: swap to font faces if not already set
    const styleSheets = Array.from(document.styleSheets);
    styleSheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule instanceof CSSFontFaceRule) {
            // Set font-display using setProperty
            rule.style.setProperty('font-display', 'swap');
          }
        });
      } catch (e) {
        // Cross-origin stylesheet, ignore
      }
    });
  }

  private static reduceLayoutShifts() {
    // Set dimensions for images without them
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      img.addEventListener('load', () => {
        if (!img.hasAttribute('width')) {
          img.setAttribute('width', (img as HTMLImageElement).naturalWidth.toString());
        }
        if (!img.hasAttribute('height')) {
          img.setAttribute('height', (img as HTMLImageElement).naturalHeight.toString());
        }
      });
    });
  }

  private static optimizeThirdPartyScripts() {
    // Add async/defer to scripts that don't have them
    const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
    scripts.forEach(script => {
      if (!script.getAttribute('src')?.includes('essential')) {
        script.setAttribute('defer', '');
      }
    });
  }

  private static addResourceHints() {
    // Add DNS prefetch for external domains
    const externalLinks = document.querySelectorAll(
      'a[href^="http"]:not([href*="' + window.location.hostname + '"])'
    );
    const domains = new Set<string>();

    externalLinks.forEach(link => {
      try {
        const url = new URL(link.getAttribute('href') || '');
        domains.add(url.hostname);
      } catch (e) {
        // Invalid URL, ignore
      }
    });

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }
}

export default WebVitalsOptimizer;
