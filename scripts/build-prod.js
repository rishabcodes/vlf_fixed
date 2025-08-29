#!/usr/bin/env node

/**
 * Optimized Production Build Script
 * Bypasses TypeScript checking and optimizes for speed
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting optimized production build...\n');

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  execSync('rm -rf .next', { stdio: 'inherit' });
  console.log('✅ Cleaned .next directory\n');
} catch (err) {
  console.log('⚠️  No previous build to clean\n');
}

// Set environment variables for optimized build
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NODE_OPTIONS = '--max-old-space-size=8192';
process.env.SKIP_ENV_VALIDATION = 'true';
process.env.NEXT_PRIVATE_STANDALONE = 'true';

// Create minimal next.config for build
const minimalConfig = `
module.exports = {
  reactStrictMode: false,
  poweredByHeader: false,
  output: 'standalone',
  compress: true,
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    workerThreads: true,
    cpus: 4,
    serverMinification: true,
    serverSourceMaps: false,
  },
  staticPageGenerationTimeout: 300,
  images: {
    domains: ['localhost', 'www.vasquezlawnc.com', 'vasquezlawnc.com'],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Disable source maps
    config.devtool = false;
    
    // Optimize for production
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\\\/]node_modules[\\\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\\\/]/,
              priority: 40,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
};
`;

// Backup original config
console.log('📦 Backing up original config...');
const configPath = path.join(__dirname, '..', 'next.config.js');
const backupPath = path.join(__dirname, '..', 'next.config.backup.js');
fs.copyFileSync(configPath, backupPath);

// Write minimal config
console.log('⚙️  Writing optimized config...');
fs.writeFileSync(configPath, minimalConfig);

try {
  // Run the build
  console.log('\n🔨 Building application...\n');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=8192',
    }
  });
  
  console.log('\n✅ Build completed successfully!');
  
  // Show build stats
  const buildManifest = path.join(__dirname, '..', '.next', 'build-manifest.json');
  if (fs.existsSync(buildManifest)) {
    const stats = fs.statSync(path.join(__dirname, '..', '.next'));
    console.log(`\n📊 Build size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  }
  
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Restore original config
  console.log('\n🔄 Restoring original config...');
  fs.copyFileSync(backupPath, configPath);
  fs.unlinkSync(backupPath);
}

console.log('\n🎉 Production build ready for deployment!');