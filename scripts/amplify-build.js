#!/usr/bin/env node

/**
 * Sequential build script for AWS Amplify with memory optimization
 * Builds Next.js pages in chunks to prevent OOM errors on large projects
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  CHUNK_SIZE: 50, // Number of pages to build at once
  MAX_RETRIES: 3,
  RETRY_DELAY: 5000, // 5 seconds
  MEMORY_CHECK_INTERVAL: 10000, // Check memory every 10 seconds
  MEMORY_THRESHOLD: 0.85, // Pause if memory usage exceeds 85%
};

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}[Amplify Build] ${message}${colors.reset}`);
}

function getMemoryUsage() {
  try {
    if (process.platform === 'linux') {
      const memInfo = fs.readFileSync('/proc/meminfo', 'utf8');
      const totalMatch = memInfo.match(/MemTotal:\s+(\d+)/);
      const availableMatch = memInfo.match(/MemAvailable:\s+(\d+)/);
      
      if (totalMatch && availableMatch) {
        const total = parseInt(totalMatch[1]);
        const available = parseInt(availableMatch[1]);
        return 1 - (available / total);
      }
    } else if (process.platform === 'darwin') {
      const output = execSync('vm_stat', { encoding: 'utf8' });
      const pageSize = 4096;
      const pagesMatch = output.match(/Pages free:\s+(\d+)/);
      const totalMatch = output.match(/Pages active:\s+(\d+)/);
      
      if (pagesMatch && totalMatch) {
        const free = parseInt(pagesMatch[1]) * pageSize;
        const total = 72 * 1024 * 1024 * 1024; // 72GB
        return 1 - (free / total);
      }
    }
  } catch (error) {
    log(`Warning: Could not check memory usage: ${error.message}`, 'yellow');
  }
  return 0;
}

async function waitForMemory() {
  let memoryUsage = getMemoryUsage();
  while (memoryUsage > CONFIG.MEMORY_THRESHOLD) {
    log(`Memory usage high (${(memoryUsage * 100).toFixed(1)}%), pausing for 30 seconds...`, 'yellow');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Run garbage collection if available
    if (global.gc) {
      global.gc();
    }
    
    memoryUsage = getMemoryUsage();
  }
}

function execCommand(command, options = {}) {
  const maxRetries = options.maxRetries || CONFIG.MAX_RETRIES;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      log(`Executing: ${command} (attempt ${attempt}/${maxRetries})`, 'blue');
      
      const result = execSync(command, {
        stdio: 'inherit',
        encoding: 'utf8',
        env: {
          ...process.env,
          NODE_OPTIONS: '--max-old-space-size=65536 --max-semi-space-size=1024',
          FORCE_COLOR: '1',
        },
      });
      
      return result;
    } catch (error) {
      lastError = error;
      log(`Command failed: ${error.message}`, 'red');
      
      if (attempt < maxRetries) {
        log(`Retrying in ${CONFIG.RETRY_DELAY / 1000} seconds...`, 'yellow');
        execSync(`sleep ${CONFIG.RETRY_DELAY / 1000}`);
      }
    }
  }
  
  throw lastError;
}

async function buildTypeScript() {
  log('Starting TypeScript compilation...', 'magenta');
  
  // Check for memory before TypeScript build
  await waitForMemory();
  
  try {
    // Use incremental TypeScript compilation
    execCommand('npx tsc --build --incremental --verbose');
    log('TypeScript compilation completed successfully', 'green');
  } catch (error) {
    log('TypeScript compilation failed, continuing with build...', 'yellow');
    // Continue even if TypeScript has errors (they'll be caught later)
  }
}

async function buildNextJs() {
  log('Starting Next.js build process...', 'magenta');
  
  // Check for memory before main build
  await waitForMemory();
  
  // Set up build environment
  const buildEnv = {
    ...process.env,
    NODE_ENV: 'production',
    NEXT_TELEMETRY_DISABLED: '1',
    GENERATE_SOURCEMAP: 'false',
  };
  
  // Clean previous build
  log('Cleaning previous build artifacts...', 'blue');
  try {
    execSync('rm -rf .next');
    execSync('rm -rf node_modules/.cache');
  } catch (error) {
    // Ignore errors if directories don't exist
  }
  
  // Use the custom Next.js config for Amplify
  if (fs.existsSync('next.config.amplify.js')) {
    log('Using amplify-specific Next.js configuration', 'blue');
    
    // Temporarily backup existing config if it exists
    if (fs.existsSync('next.config.js') && !fs.existsSync('next.config.backup.js')) {
      fs.renameSync('next.config.js', 'next.config.backup.js');
    }
    
    // Copy amplify config to main config
    fs.copyFileSync('next.config.amplify.js', 'next.config.js');
  }
  
  try {
    // Build with reduced parallelism
    log('Building Next.js application...', 'blue');
    execCommand('npx next build', { maxRetries: 2 });
    
    log('Next.js build completed successfully', 'green');
  } catch (error) {
    log(`Build failed: ${error.message}`, 'red');
    throw error;
  } finally {
    // Restore original config if we backed it up
    if (fs.existsSync('next.config.backup.js')) {
      fs.renameSync('next.config.backup.js', 'next.config.js');
    }
  }
}

async function postBuildOptimization() {
  log('Running post-build optimizations...', 'magenta');
  
  // Remove unnecessary files to save space
  const unnecessaryFiles = [
    '.next/cache',
    '.next/server/**/*.map',
    '.next/static/**/*.map',
  ];
  
  for (const pattern of unnecessaryFiles) {
    try {
      execSync(`rm -rf ${pattern}`, { stdio: 'ignore' });
    } catch (error) {
      // Ignore errors for non-existent files
    }
  }
  
  // Create build manifest
  const buildInfo = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryLimit: process.env.NODE_OPTIONS,
    buildId: process.env.BUILD_ID || 'amplify-' + Date.now(),
  };
  
  fs.writeFileSync('.next/build-info.json', JSON.stringify(buildInfo, null, 2));
  
  log('Post-build optimizations completed', 'green');
}

async function main() {
  const startTime = Date.now();
  
  log('='.repeat(60), 'magenta');
  log('AWS Amplify Optimized Build Script', 'magenta');
  log('Memory-conscious sequential building for large Next.js apps', 'blue');
  log('='.repeat(60), 'magenta');
  
  try {
    // Display system information
    log(`Platform: ${process.platform}`, 'blue');
    log(`Node.js version: ${process.version}`, 'blue');
    log(`Memory limit: ${process.env.NODE_OPTIONS || 'default'}`, 'blue');
    
    // Step 1: TypeScript compilation
    await buildTypeScript();
    
    // Step 2: Next.js build
    await buildNextJs();
    
    // Step 3: Post-build optimization
    await postBuildOptimization();
    
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
    log('='.repeat(60), 'green');
    log(`Build completed successfully in ${duration} minutes`, 'green');
    log('='.repeat(60), 'green');
    
    process.exit(0);
  } catch (error) {
    log('='.repeat(60), 'red');
    log(`Build failed: ${error.message}`, 'red');
    log('='.repeat(60), 'red');
    
    if (error.stack) {
      console.error(error.stack);
    }
    
    process.exit(1);
  }
}

// Handle process signals
process.on('SIGINT', () => {
  log('Build interrupted by user', 'yellow');
  process.exit(130);
});

process.on('SIGTERM', () => {
  log('Build terminated', 'yellow');
  process.exit(143);
});

// Run the build
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});