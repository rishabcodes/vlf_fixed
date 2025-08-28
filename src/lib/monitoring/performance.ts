import { performanceLogger } from '../safe-logger';

import { logger } from '@/lib/safe-logger';
interface PerformanceMark {
  name: string;
  startTime: number;
  metadata?: unknown;
}

class PerformanceMonitor {
  private marks: Map<string, PerformanceMark> = new Map();
  private observers: PerformanceObserver[] = [];

  // Start a performance measurement
  start(name: string, metadata?: unknown): void {
    this.marks.set(name, {
      name,
      startTime: performance.now(),
      metadata,
    });
  }

  // End a performance measurement and log it
  end(name: string): number | null {
    const mark = this.marks.get(name);
    if (!mark) {
      logger.warn(`Performance mark "${name}" not found`);
      return null;
    }

    const duration = performance.now() - mark.startTime;
    performanceLogger.measure(name, duration, mark.metadata);

    // Check for slow operations
    const threshold = this.getThreshold(name);
    if (duration > threshold) {
      performanceLogger.slowOperation(name, duration, threshold);
    }

    this.marks.delete(name);
    return duration;
  }

  // Get threshold for different operation types
  private getThreshold(operation: string): number {
    const thresholds: Record<string, number> = {
      'page-load': 3000,
      'api-call': 1000,
      'database-query': 100,
      render: 16,
      'user-interaction': 100,
    };

    // Find matching threshold
    for (const [key, value] of Object.entries(thresholds)) {
      if (operation.toLowerCase().includes(key)) {
        return value;
      }
    }

    return 1000; // Default threshold
  }

  // Measure React component render time
  measureRender(componentName: string, fn: () => void): void {
    const startTime = performance.now();
    fn();
    const duration = performance.now() - startTime;

    performanceLogger.measure(`render-${componentName}`, duration);
  }

  // Monitor Core Web Vitals
  observeWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Observe Largest Contentful Paint
    const lcpObserver = new PerformanceObserver(list => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          performanceLogger.measure('LCP', lastEntry.startTime);
        }
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(lcpObserver);

    // Observe First Input Delay
    const fidObserver = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const fidEntry = entry as PerformanceEventTiming & { processingStart: number };
        performanceLogger.measure('FID', fidEntry.processingStart - fidEntry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.push(fidObserver);

    // Observe Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value || 0;
        }
      }
      performanceLogger.measure('CLS', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(clsObserver);
  }

  // Monitor memory usage
  monitorMemory(): void {
    if (typeof window === 'undefined') return;

    setInterval(() => {
      const performanceWithMemory = performance as Performance & {
        memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number };
      };
      if (performanceWithMemory.memory) {
        const memory = performanceWithMemory.memory;
        performanceLogger.measure('memory-used', memory.usedJSHeapSize / 1048576, {
          totalJSHeapSize: memory.totalJSHeapSize / 1048576,
          jsHeapSizeLimit: memory.jsHeapSizeLimit / 1048576,
        });
      }
    }, 30000); // Every 30 seconds
  }

  // Clean up observers
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React performance profiler
export const Profiler = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const onRender = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: Set<PerformanceEventTiming>
  ) => {
    performanceLogger.measure(`react-${id}-${phase}`, actualDuration, {
      baseDuration,
      startTime,
      commitTime,
      interactionsCount: interactions.size,
    });
  };

  // Return the props for React.Profiler to be used in components
  return { id, onRender };
};

// API timing middleware
interface APIConfig {
  method?: string;
  url?: string;
  metadata?: {
    startTime?: number;
    [key: string]: any;
  };
}

export const apiTimingMiddleware = (config: APIConfig): APIConfig => {
  config.metadata = config.metadata || {};
  config.metadata.startTime = Date.now();
  return config;
};

interface APIResponse {
  config?: APIConfig;
  status?: number;
}

interface APIError {
  config?: APIConfig;
  response?: { status?: number };
  message?: string;
}

export const apiTimingInterceptor = {
  response: (response: APIResponse) => {
    if (response.config?.metadata?.startTime) {
      const duration = Date.now() - response.config.metadata.startTime;
      performanceLogger.measure('api-request', duration, {
        url: response.config.url,
        method: response.config.method,
        status: response.status,
      });
    }
    return response;
  },
  error: (error: APIError) => {
    if (error.config?.metadata?.startTime) {
      const duration = Date.now() - error.config.metadata.startTime;
      performanceLogger.measure('api-request-failed', duration, {
        url: error.config.url,
        method: error.config.method,
        error: error.message,
      });
    }
    return Promise.reject(error);
  },
};
