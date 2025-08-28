/**
 * Build Optimization Configuration for AWS/Cloud Deployments
 * 
 * This configuration addresses memory issues during build process
 * for large Next.js applications with 5000+ TypeScript files
 */

module.exports = {
  // Memory Management
  memory: {
    // Increase Node.js memory limit to 16GB for builds
    nodeOptions: '--max-old-space-size=16384',
    
    // Enable garbage collection optimizations
    gcOptions: '--expose-gc --optimize-for-size',
    
    // Limit concurrent operations
    maxWorkers: 2,  // Reduce from default 4 to save memory
    
    // Enable incremental compilation
    incremental: true,
  },

  // Build Optimizations
  build: {
    // Disable source maps in production to save memory
    productionSourceMaps: false,
    
    // Optimize bundle size
    bundleAnalyzer: {
      enabled: false,  // Disable in production builds
      openAnalyzer: false,
    },
    
    // Webpack optimizations
    webpack: {
      // Reduce memory usage during compilation
      cache: {
        type: 'filesystem',
        compression: 'gzip',
      },
      
      // Optimize chunk splitting
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Split large dependencies into separate chunks
            pdf: {
              test: /[\\/]node_modules[\\/](pdf-lib|pdf-parse|pdfjs-dist)[\\/]/,
              name: 'pdf-libs',
              priority: 10,
            },
            langchain: {
              test: /[\\/]node_modules[\\/](@langchain|langchain)[\\/]/,
              name: 'langchain',
              priority: 10,
            },
            googleapis: {
              test: /[\\/]node_modules[\\/]googleapis[\\/]/,
              name: 'googleapis',
              priority: 10,
            },
          },
        },
        // Minimize in production only
        minimize: process.env.NODE_ENV === 'production',
      },
    },
  },

  // Dependencies to exclude from build (load at runtime)
  externals: [
    // Heavy ML/AI libraries that can be loaded dynamically
    '@tensorflow/tfjs-node',
    'onnxruntime-node',
    
    // Large PDF processing libraries (use dynamic imports)
    'canvas',
    'puppeteer',
  ],

  // Files/directories to ignore during build
  ignore: [
    '**/test/**',
    '**/tests/**',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/mock/**',
    '**/extras/**',
    'scripts/test-*.js',
    'tools/**',
  ],

  // AWS-specific settings
  aws: {
    // Use AWS Lambda layers for heavy dependencies
    lambdaLayers: [
      'pdf-processing',
      'ml-inference',
    ],
    
    // Environment variables for AWS builds
    env: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_ENV: 'production',
      NEXT_TELEMETRY_DISABLED: '1',
    },
    
    // Build timeout (in seconds)
    timeout: 3600,  // 1 hour
    
    // Memory allocation for build container
    memory: 32768,  // 32GB if available
  },

  // Cleanup tasks
  cleanup: {
    // Remove these before build
    preBuild: [
      '.next',
      'node_modules/.cache',
      '.turbo',
      '.partytown',
    ],
    
    // Remove these after build to save space
    postBuild: [
      'node_modules/.pnpm',
      'node_modules/.cache',
      '**/*.map',
      'src/**/*.test.ts',
    ],
  },

  // Monitoring and alerts
  monitoring: {
    // Alert if memory usage exceeds threshold
    memoryThreshold: 0.85,  // 85% of allocated memory
    
    // Log memory usage every N seconds during build
    logInterval: 30,
    
    // Enable detailed logging
    verbose: true,
  },
};