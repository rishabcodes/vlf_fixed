import { logger } from '@/lib/safe-logger';
import React from 'react';

interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: ChunkInfo[];
  largestChunks: ChunkInfo[];
  recommendations: string[];
}

interface ChunkInfo {
  name: string;
  size: number;
  gzippedSize: number;
  modules: string[];
  isAsync: boolean;
  isEntry: boolean;
}

class BundleOptimizer {
  private analysis: BundleAnalysis = {
    totalSize: 0,
    gzippedSize: 0,
    chunks: [],
    largestChunks: [],
    recommendations: [],
  };

  public analyzeBundleSize(): BundleAnalysis {
    // In a real implementation, this would analyze the webpack bundle
    // For now, we'll provide optimization recommendations based on common patterns

    this.analysis.recommendations = [
      'Implement dynamic imports for large components',
      'Use React.lazy() for route-based code splitting',
      'Move large libraries to separate chunks',
      'Implement tree shaking for unused code',
      'Optimize images with next/image',
      'Use compression middleware',
      'Implement service worker caching',
      'Analyze and remove unused dependencies',
    ];

    return this.analysis;
  }

  public getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];

    // Large bundle suggestions
    if (this.analysis.totalSize > 1000000) {
      // 1MB
      suggestions.push('Bundle size is large (>1MB). Consider code splitting.');
    }

    // Chunk analysis
    if (this.analysis.largestChunks.length > 0) {
      suggestions.push('Large chunks detected. Consider splitting into smaller chunks.');
    }

    // General optimizations
    suggestions.push(
      'Implement dynamic imports for non-critical components',
      'Use webpack-bundle-analyzer for detailed analysis',
      'Consider lazy loading for below-the-fold content',
      'Implement proper caching strategies',
      'Use CDN for static assets',
      'Minimize CSS and JavaScript',
      'Use modern image formats (WebP, AVIF)',
      'Implement HTTP/2 push for critical resources'
    );

    return suggestions;
  }

  public generateOptimizedNextConfig(): string {
    return `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      '@heroicons/react',
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
    serverComponentsExternalPackages: [],
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    // Tree shaking
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;

    return config;
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
    `.trim();
  }

  public generateWebpackConfig(): string {
    return `
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // ... other config
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    usedExports: true,
    sideEffects: false,
    moduleIds: 'deterministic',
    runtimeChunk: {
      name: 'runtime',
    },
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  
  plugins: [
    ...(process.env.ANALYZE === 'true' ? [new BundleAnalyzerPlugin()] : []),
  ],
};
    `.trim();
  }

  public logAnalysis() {
    logger.info('Bundle Analysis', {
      totalSize: this.analysis.totalSize,
      gzippedSize: this.analysis.gzippedSize,
      chunkCount: this.analysis.chunks.length,
      recommendations: this.analysis.recommendations,
    });
  }
}

export default BundleOptimizer;

// Utility functions for optimization
export const optimizationUtils = {
  // Dynamic import wrapper
  lazyImport: <T extends React.ComponentType<any>>(importFn: () => Promise<{ default: T }>) => {
    return React.lazy(() => importFn());
  },

  // Preload component
  preloadComponent: (importFn: () => Promise<any>) => {
    const componentImport = importFn();
    return componentImport;
  },

  // Resource hints
  preloadResource: (href: string, as: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  // Prefetch resource
  prefetchResource: (href: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  // DNS prefetch
  dnsPrefetch: (domain: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  },
};
