/** @type {import('next').NextConfig} */

// Memory-optimized configuration for AWS Amplify XLarge builds
const nextConfig = {
  // Disable source maps in production to save memory
  productionBrowserSourceMaps: false,
  
  // Reduce build parallelism
  experimental: {
    // Limit concurrent page generation
    workerThreads: false,
    cpus: 1,
    
    // Disable parallel route building
    parallelRoutes: false,
    
    // Memory optimization flags
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    
    // Reduce memory usage during build
    webpackBuildWorker: false,
    
    // Use incremental cache with limits
    incrementalCacheHandlerPath: undefined,
    
    // Disable build activity indicator to save resources
    webpackBuildActivity: false,
  },
  
  // Webpack configuration for memory optimization
  webpack: (config, { dev, isServer, webpack }) => {
    // Production optimizations
    if (!dev) {
      // Disable source maps
      config.devtool = false;
      
      // Single-threaded operations
      config.parallelism = 1;
      
      // Limit concurrent module builds
      config.optimization = {
        ...config.optimization,
        minimize: true,
        concatenateModules: false,
        usedExports: true,
        sideEffects: false,
        
        // Minimize with single thread
        minimizer: config.optimization.minimizer?.map(plugin => {
          if (plugin.constructor.name === 'TerserPlugin') {
            plugin.options.parallel = 1;
            plugin.options.terserOptions = {
              ...plugin.options.terserOptions,
              compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 1, // Reduce optimization passes
              },
              mangle: true,
              format: {
                comments: false,
              },
            };
          }
          if (plugin.constructor.name === 'CssMinimizerPlugin') {
            plugin.options.parallel = 1;
          }
          return plugin;
        }),
        
        // Reduce code splitting aggressiveness
        splitChunks: {
          chunks: 'all',
          minSize: 50000, // Increase minimum chunk size
          maxSize: 500000, // Limit maximum chunk size
          minChunks: 2,
          maxAsyncRequests: 3,
          maxInitialRequests: 3,
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              priority: 10,
              chunks: 'all',
            },
          },
        },
        
        // Reduce runtime chunk
        runtimeChunk: {
          name: 'runtime',
        },
      };
      
      // Memory management plugins
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      );
      
      // Limit worker pool size
      if (config.module?.rules) {
        config.module.rules.forEach(rule => {
          if (rule.use && Array.isArray(rule.use)) {
            rule.use.forEach(use => {
              if (use.loader === 'babel-loader' || use.loader === 'next-babel-loader') {
                use.options = {
                  ...use.options,
                  cacheDirectory: false, // Disable babel cache
                };
              }
            });
          }
        });
      }
      
      // Configure performance hints
      config.performance = {
        hints: false, // Disable performance warnings
      };
      
      // Memory limits for webpack
      config.stats = 'errors-only';
      
      // Disable webpack cache
      config.cache = false;
    }
    
    // Additional Node.js optimizations for server-side
    if (isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      };
      
      // Externalize large dependencies to reduce bundle size
      config.externals = [...(config.externals || [])];
      
      // Reduce memory usage for server bundles
      config.output = {
        ...config.output,
        chunkLoadTimeout: 120000, // 2 minute timeout
      };
    }
    
    // Common memory optimizations
    config.watchOptions = {
      ignored: /node_modules/,
      poll: false,
    };
    
    // Increase build timeouts
    config.output = {
      ...config.output,
      timeout: 120000, // 2 minutes
    };
    
    return config;
  },
  
  // TypeScript configuration for reduced memory usage
  typescript: {
    // Allow production builds with TypeScript errors
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.json',
  },
  
  // ESLint configuration
  eslint: {
    // Disable ESLint during production builds to save memory
    ignoreDuringBuilds: true,
  },
  
  // Image optimization settings
  images: {
    // Disable image optimization during build
    disableStaticImages: false,
    minimumCacheTTL: 31536000,
    formats: ['image/webp'],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96],
  },
  
  // Output configuration
  output: 'standalone',
  
  // Reduce build output verbosity
  silent: false,
  
  // Compress output
  compress: true,
  
  // Power off prefetching to reduce memory usage
  prefetch: false,
  
  // Limit static page generation
  staticPageGenerationTimeout: 180, // 3 minutes per page
  
  // SWC minification (more memory efficient than Terser)
  swcMinify: true,
  
  // Compiler options for optimization
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // React optimization
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Environment variables that should be available
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    NEXT_MANUAL_CLIENT_BASE_PATH: 'true',
  },
  
  // Generate build ID based on git commit for consistency
  generateBuildId: async () => {
    return process.env.BUILD_ID || 'amplify-build-' + Date.now();
  },
};

module.exports = nextConfig;