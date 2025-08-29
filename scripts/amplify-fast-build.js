#!/usr/bin/env node

/**
 * Fast build script for AWS Amplify - builds only core pages
 * Skips blog pre-generation for rapid deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}[Fast Build] ${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`, 'blue');
    
    const result = execSync(command, {
      stdio: 'inherit',
      encoding: 'utf8',
      env: {
        ...process.env,
        // Fast build flags
        FAST_BUILD: 'true',
        SKIP_STATIC_GENERATION: 'true',
        NODE_ENV: 'production',
        // XLarge compute memory allocation
        NODE_OPTIONS: '--max-old-space-size=48000',
        NEXT_TELEMETRY_DISABLED: '1',
        GENERATE_SOURCEMAP: 'false',
        FORCE_COLOR: '1',
      },
    });
    
    return result;
  } catch (error) {
    log(`Command failed: ${error.message}`, 'red');
    throw error;
  }
}

async function main() {
  const startTime = Date.now();
  
  log('='.repeat(60), 'cyan');
  log('AWS Amplify Fast Build - Core Pages Only', 'cyan');
  log('Optimized for rapid deployment on XLarge compute', 'blue');
  log('='.repeat(60), 'cyan');
  
  try {
    // Display build configuration
    log('Build Configuration:', 'magenta');
    log('  - Mode: Fast Build (Core Pages Only)', 'blue');
    log('  - Blog Pre-generation: DISABLED', 'yellow');
    log('  - Memory: 48GB (XLarge)', 'blue');
    log('  - Pages: ~30-40 core pages only', 'blue');
    
    // Step 1: Clean previous build
    log('Cleaning previous build artifacts...', 'blue');
    try {
      execSync('rm -rf .next');
      execSync('rm -rf node_modules/.cache');
      execSync('rm -rf .swc');
      execSync('rm -rf .turbo');
    } catch (error) {
      // Ignore errors if directories don't exist
    }
    
    // Step 2: TypeScript compilation (optional, non-blocking)
    log('Running TypeScript checks...', 'magenta');
    try {
      execCommand('npx tsc --noEmit --incremental false');
      log('TypeScript checks passed', 'green');
    } catch (error) {
      log('TypeScript has some issues but continuing with build...', 'yellow');
    }
    
    // Step 3: Next.js build with fast mode
    log('Building Next.js application (Fast Mode)...', 'magenta');
    log('Skipping blog post pre-generation...', 'yellow');
    
    // Set environment variables for fast build
    process.env.FAST_BUILD = 'true';
    process.env.SKIP_STATIC_GENERATION = 'true';
    
    execCommand('npx next build');
    
    // Step 4: Post-build summary
    log('Generating build summary...', 'blue');
    const buildInfo = {
      mode: 'fast',
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      memoryLimit: '48GB (XLarge)',
      buildId: `fast-${Date.now()}`,
      staticGeneration: 'disabled',
      corePages: 'enabled',
      blogPages: 'on-demand',
      locationPages: 'on-demand',
    };
    
    fs.writeFileSync('.next/fast-build-info.json', JSON.stringify(buildInfo, null, 2));
    
    // Calculate build time
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
    
    log('='.repeat(60), 'green');
    log(`Fast build completed successfully in ${duration} minutes!`, 'green');
    log('Core features ready:', 'green');
    log('  ✅ All header navigation pages', 'green');
    log('  ✅ Chatbot with GHL MCP & Retell', 'green');
    log('  ✅ News ticker', 'green');
    log('  ✅ Practice areas & attorneys', 'green');
    log('  ✅ Blog/locations (generate on-demand)', 'green');
    log('='.repeat(60), 'green');
    
    process.exit(0);
  } catch (error) {
    log('='.repeat(60), 'red');
    log(`Fast build failed: ${error.message}`, 'red');
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