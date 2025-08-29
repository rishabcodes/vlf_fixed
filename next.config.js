// const { withSentryConfig } = require('@sentry/nextjs'); // Temporarily disabled
// const million = require('million/compiler'); // Temporarily disabled - not needed
const { join } = require('path');
const { cpSync, existsSync } = require('fs');

// Fix for revalidation issues during build
if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL) {
  // During build, ensure proper URL is set
  process.env.NEXT_PUBLIC_APP_URL =
    process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com';
}

// Copy Partytown files to public directory
const partytownDir = join(__dirname, 'node_modules', '@builder.io', 'partytown', 'lib');
const publicPartytownDir = join(__dirname, 'public', '~partytown');

try {
  if (existsSync(partytownDir)) {
    cpSync(partytownDir, publicPartytownDir, {
      recursive: true,
      force: true,
      filter: src => !src.includes('debug'),
    });
    console.log('✅ Partytown files copied to public directory');
  }
} catch (err) {
  console.error('❌ Failed to copy Partytown files:', err);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode for better development experience
  reactStrictMode: true,

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Build optimizations for large projects with limited memory
  // Turbopack configuration for faster dev builds
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },
  
  experimental: {
    // Optimize for speed with reduced memory usage
    workerThreads: true,
    cpus: 2, // Reduced from 4 to save memory
    serverMinification: true,
    serverSourceMaps: false,
    // Optimize package imports (removed framer-motion)
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'react-icons',
      'recharts',
      'react-hook-form',
      'clsx',
      'tailwind-merge',
    ],
  },


  // Increase build timeout for generating many pages
  staticPageGenerationTimeout: 600, // 10 minutes per page

  // Force static generation
  generateBuildId: async () => {
    // Use timestamp as build ID to force fresh builds
    return Date.now().toString();
  },

  // Output configuration - static export for Netlify
  output: process.env.NETLIFY ? 'export' : 'standalone',

  // Disable source maps in production to save memory
  productionBrowserSourceMaps: false,

  // Compress output
  compress: true,

  // TypeScript and ESLint configuration - production-ready
  typescript: {
    // Enable strict checking - builds will fail on TypeScript errors
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    // Enable ESLint but allow builds to continue with warnings
    ignoreDuringBuilds: false,
    dirs: ['src'], // Only lint source directories (exclude root-level scripts)
  },

  // Image optimization (updated for Next.js 15)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vasquezlawnc.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vasquezlawnc.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
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
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value:
              process.env.NODE_ENV === 'development'
                ? '' // Disabled in development for hot reload
                : "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com *.google.com *.gstatic.com *.googleapis.com *.vercel-insights.com *.vercel-analytics.com *.sentry.io *.ingest.sentry.io; style-src 'self' 'unsafe-inline' *.googleapis.com; img-src 'self' data: blob: *.google-analytics.com *.googletagmanager.com *.google.com *.gstatic.com *.googleapis.com *.sentry.io https:; font-src 'self' *.gstatic.com *.googleapis.com; connect-src 'self' *.google-analytics.com *.googletagmanager.com *.google.com *.googleapis.com *.vercel-insights.com *.vercel-analytics.com *.sentry.io *.ingest.sentry.io wss: https:; frame-src 'self' *.google.com *.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; report-uri https://o4509686791274496.ingest.us.sentry.io/api/4509686792323072/security/?sentry_key=cba8298406de5e2b11befb42392681da;",
          },
        ],
      },
    ];
  },

  // Redirects for Spanish routes and duplicate pages
  async redirects() {
    return [
      // Spanish practice areas
      {
        source: '/compensacion-laboral',
        destination: '/es/areas-de-practica/compensacion-laboral',
        permanent: true,
      },
      {
        source: '/defensa-criminal',
        destination: '/es/areas-de-practica/defensa-criminal',
        permanent: true,
      },
      {
        source: '/derecho-familia',
        destination: '/es/areas-de-practica/derecho-familia',
        permanent: true,
      },
      { source: '/inmigracion', destination: '/es/areas-de-practica/inmigracion', permanent: true },
      {
        source: '/lesiones-personales',
        destination: '/es/areas-de-practica/lesiones-personales',
        permanent: true,
      },

      // Payment pages
      { source: '/make-payment', destination: '/payment', permanent: true },
      { source: '/hacer-pago', destination: '/es/pago', permanent: true },
      { source: '/es/make-payment', destination: '/es/pago', permanent: true },
      { source: '/es/payment', destination: '/es/pago', permanent: true },

      // Appointment pages
      { source: '/es/appointments/:path*', destination: '/es/appointment/:path*', permanent: true },

      // Category pages
      {
        source: '/es/criminal-defense/:path*',
        destination: '/es/areas-de-practica/defensa-criminal/:path*',
        permanent: true,
      },
      {
        source: '/es/immigration/:path*',
        destination: '/es/areas-de-practica/inmigracion/:path*',
        permanent: true,
      },
      {
        source: '/es/family-law/:path*',
        destination: '/es/areas-de-practica/derecho-familia/:path*',
        permanent: true,
      },
      {
        source: '/es/personal-injury/:path*',
        destination: '/es/areas-de-practica/lesiones-personales/:path*',
        permanent: true,
      },
      {
        source: '/es/workers-compensation/:path*',
        destination: '/es/areas-de-practica/compensacion-laboral/:path*',
        permanent: true,
      },
    ];
  },

  // Rewrites for cleaner URLs
  async rewrites() {
    return [
      // Spanish API routes
      {
        source: '/es/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Webpack configuration
  webpack: (config, { isServer, webpack, dev }) => {
    // Fix for ES modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Add aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname + '/src',
    };

    // Handle thread-stream worker issue
    if (!isServer) {
      // On client-side, replace thread-stream with a mock
      config.resolve.alias['thread-stream'] = false;
      config.resolve.alias['pino'] = 'pino/browser';
      config.resolve.alias['winston'] = false;
      config.resolve.alias['@dabh/diagnostics'] = false;
    } else {
      // On server-side, mark pino and thread-stream as external
      config.externals = config.externals || [];
      if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = async (context, request, callback) => {
          if (
            request === 'pino' ||
            request === 'thread-stream' ||
            request === 'pino-pretty' ||
            request === 'winston' ||
            request === '@dabh/diagnostics'
          ) {
            return callback(null, `commonjs ${request}`);
          }
          return originalExternals(context, request, callback);
        };
      } else {
        config.externals = [
          ...config.externals,
          { pino: 'commonjs pino' },
          { 'thread-stream': 'commonjs thread-stream' },
          { 'pino-pretty': 'commonjs pino-pretty' },
          { winston: 'commonjs winston' },
          { '@dabh/diagnostics': 'commonjs @dabh/diagnostics' },
        ];
      }
    }

    // Exclude test files from production builds
    if (process.env.NODE_ENV === 'production') {
      // Use webpack's IgnorePlugin to completely ignore test files
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
        })
      );

      // Ignore testing utilities directory
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /\/testing\//,
        })
      );

      // Ignore setup files
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /setupTests(Node)?\.ts$/,
        })
      );

      // Ignore specific test-related modules
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /@testing-library/,
        })
      );
    }

    // Bundle analyzer (only in analyze mode)
    if (process.env.ANALYZE) {
      try {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
          })
        );
      } catch (e) {
        console.warn('webpack-bundle-analyzer not found, skipping bundle analysis');
      }
    }

    // Optimize code splitting
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Next.js internals
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[\\/]/.test(module.identifier());
              },
              name(module) {
                const hash = require('crypto').createHash('sha1');
                hash.update(module.identifier());
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Common components
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: 20,
              test(module) {
                return (
                  module.resource &&
                  !module.resource.includes('node_modules') &&
                  module.resource.includes('src/components')
                );
              },
            },
            // UI libraries
            ui: {
              name: 'ui',
              test: /[\\/]node_modules[\\/](@radix-ui|framer-motion|react-icons|lucide-react|@heroicons)[\\/]/,
              priority: 35,
              reuseExistingChunk: true,
            },
            // Form libraries
            forms: {
              name: 'forms',
              test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
              priority: 34,
              reuseExistingChunk: true,
            },
            // Analytics and monitoring
            monitoring: {
              name: 'monitoring',
              test: /[\\/]node_modules[\\/](@sentry|@vercel\/analytics|@vercel\/speed-insights)[\\/]/,
              priority: 33,
              reuseExistingChunk: true,
            },
            // Removed Three.js chunk (library not used)
            // Date utilities
            date: {
              name: 'date',
              test: /[\\/]node_modules[\\/](date-fns)[\\/]/,
              priority: 31,
              reuseExistingChunk: true,
            },
            // Default vendor chunk for remaining modules
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Module Federation removed - causing eager consumption errors in production

      // Optimized caching to prevent big string warnings
      config.cache = {
        type: dev ? 'memory' : 'filesystem', // Use memory cache in dev
        maxMemoryGenerations: 1, // Limit memory usage
        memoryCacheUnaffected: true,
        buildDependencies: {
          config: [__filename],
        },
        // Prevent big string serialization issues
        compression: false,
      };
    }

    return config;
  },

  // SWC minification is now default in Next.js 15

  // PERFORMANCE: Modularize imports commented out to reduce build complexity
  // modularizeImports: {
  //   '@heroicons/react/24/outline': {
  //     transform: '@heroicons/react/24/outline/{{member}}',
  //   },
  //   '@heroicons/react/24/solid': {
  //     transform: '@heroicons/react/24/solid/{{member}}',
  //   },
  //   'lucide-react': {
  //     transform: 'lucide-react/dist/esm/icons/{{member}}',
  //   },
  //   'react-icons/?(((\\\\w*)?/?)*)': {
  //     transform: 'react-icons/{{ matches.[1] }}/{{ member }}',
  //   },
  // },

  // Environment variables to expose to the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  },
};

// Sentry configuration options (commented out while Sentry is disabled)
// const sentryWebpackPluginOptions = {
//   // Organization and project from your Sentry account
//   org: 'vasquez-law-firmpllc',
//   project: 'javascript-nextjs',
//
//   // Only upload source maps in production
//   silent: true,
//
//   // Disable source map upload
//   widenClientFileUpload: false,
//
//   // Transpile SDK for compatibility
//   transpileClientSDK: true,
//
//   // Routes to tunnel Sentry requests through to avoid ad blockers
//   tunnelRoute: '/monitoring',
//
//   // Hide source maps from the client
//   hideSourceMaps: true,
//
//   // Disable org/project lookup in CI
//   disableLogger: true,
//
//   // Don't upload source maps in production to avoid exposing them
//   ...(process.env.NODE_ENV === 'production' && {
//     disableServerWebpackPlugin: true,
//     disableClientWebpackPlugin: true,
//   }),
//
//   // Auto-instrument API routes and Server Components
//   automaticVercelMonitors: true,
//
//   // Skip source map upload if no auth token
//   dryRun: !process.env.SENTRY_AUTH_TOKEN,
//
//   // Disable source map upload completely if no token
//   disableServerWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
//   disableClientWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
// };

// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
// Wrap with Million.js compiler
// Temporarily disabled Million.js due to memory constraints on Vercel
// module.exports = million.next(nextConfig, {
//   auto: true, // Automatically optimize components
//   telemetry: false, // Disable telemetry
//   // Only optimize specific components for safety
//   ignore: [
//     // Ignore components with complex patterns
//     'node_modules/@radix-ui',
//     'node_modules/framer-motion',
//     'node_modules/@react-three',
//   ],
// });
module.exports = nextConfig;
