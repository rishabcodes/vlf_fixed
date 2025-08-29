#!/usr/bin/env node

/**
 * Ultra-Fast build script for AWS Amplify XLarge Compute
 * Target: <1 minute build time on 72GB RAM, 16 vCPU
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// ANSI colors
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
  console.log(`${colors[color]}[ULTRA-FAST] ${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      stdio: 'inherit',
      encoding: 'utf8',
      env: {
        ...process.env,
        // Ultra-fast build flags
        ULTRA_FAST_BUILD: 'true',
        FAST_BUILD: 'true',
        SKIP_STATIC_GENERATION: 'true',
        NODE_ENV: 'production',
        // Maximum memory for XLarge
        NODE_OPTIONS: '--max-old-space-size=65536',
        NEXT_TELEMETRY_DISABLED: '1',
        GENERATE_SOURCEMAP: 'false',
        // Skip all validation
        SKIP_LINTING: 'true',
        SKIP_TYPE_CHECK: 'true',
        // Force colors
        FORCE_COLOR: '1',
      },
      ...options
    });
    return result;
  } catch (error) {
    log(`Command failed: ${error.message}`, 'red');
    throw error;
  }
}

async function runParallel(commands) {
  const promises = commands.map(({ cmd, name }) => {
    return new Promise((resolve, reject) => {
      log(`Starting: ${name}`, 'blue');
      const child = spawn(cmd, {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      });
      
      child.on('exit', (code) => {
        if (code === 0) {
          log(`Completed: ${name}`, 'green');
          resolve();
        } else {
          reject(new Error(`${name} failed with code ${code}`));
        }
      });
      
      child.on('error', reject);
    });
  });
  
  return Promise.all(promises);
}

async function main() {
  const startTime = Date.now();
  
  log('='.repeat(60), 'cyan');
  log('ULTRA-FAST BUILD FOR AWS AMPLIFY XLARGE', 'cyan');
  log('Target: <1 minute on 72GB RAM, 16 vCPU', 'yellow');
  log('='.repeat(60), 'cyan');
  
  try {
    // Display system info
    log('System Configuration:', 'magenta');
    log(`  - CPUs: ${os.cpus().length}`, 'blue');
    log(`  - Memory: ${Math.round(os.totalmem() / 1024 / 1024 / 1024)}GB`, 'blue');
    log(`  - Platform: ${os.platform()}`, 'blue');
    
    // Step 1: Parallel preparation (5 seconds)
    log('Phase 1: Parallel Preparation...', 'magenta');
    await runParallel([
      { cmd: 'rm -rf .next', name: 'Clean .next' },
      { cmd: 'rm -rf node_modules/.cache', name: 'Clean cache' },
      { cmd: 'rm -rf .swc', name: 'Clean SWC' },
    ]);
    
    // Step 2: Set up environment for ultra-fast build
    log('Phase 2: Configuring environment...', 'magenta');
    
    // Step 3: Build with maximum parallelization (40 seconds)
    log('Phase 3: Building with 16 parallel workers...', 'magenta');
    
    // Set up environment for maximum speed
    process.env.NEXT_PRIVATE_WORKER_THREADS = '16';
    process.env.NEXT_PRIVATE_CPU_COUNT = '16';
    process.env.ULTRA_FAST_BUILD = 'true';
    process.env.FAST_BUILD = 'true';
    process.env.SKIP_STATIC_GENERATION = 'true';
    
    // Run standard Next.js build with env vars controlling behavior
    execCommand('npx next build', {
      env: {
        ...process.env,
        NODE_OPTIONS: '--max-old-space-size=65536',
        NEXT_TELEMETRY_DISABLED: '1',
        ULTRA_FAST_BUILD: 'true',
        SKIP_STATIC_GENERATION: 'true',
      }
    });
    
    // Step 4: Post-build optimization (5 seconds)
    log('Phase 4: Optimizing output...', 'magenta');
    
    // Create build manifest
    const buildInfo = {
      mode: 'ultra-fast',
      timestamp: new Date().toISOString(),
      duration: ((Date.now() - startTime) / 1000).toFixed(2) + 's',
      cpus: os.cpus().length,
      memory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + 'GB',
      buildId: `ultra-${Date.now()}`,
    };
    
    fs.writeFileSync('.next/ultra-build-info.json', JSON.stringify(buildInfo, null, 2));
    
    // Calculate final time
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    log('='.repeat(60), 'green');
    log(`✅ ULTRA-FAST BUILD COMPLETED IN ${duration} SECONDS!`, 'green');
    log('Optimizations Applied:', 'green');
    log('  ✅ 16 parallel workers', 'green');
    log('  ✅ No TypeScript checking', 'green');
    log('  ✅ No ESLint checking', 'green');
    log('  ✅ No static generation', 'green');
    log('  ✅ SWC minification', 'green');
    log('  ✅ Maximum memory allocation', 'green');
    log('='.repeat(60), 'green');
    
    process.exit(0);
  } catch (error) {
    log('='.repeat(60), 'red');
    log(`❌ BUILD FAILED: ${error.message}`, 'red');
    log('='.repeat(60), 'red');
    
    if (error.stack) {
      console.error(error.stack);
    }
    
    process.exit(1);
  }
}

// Handle signals
process.on('SIGINT', () => {
  log('Build interrupted', 'yellow');
  process.exit(130);
});

process.on('SIGTERM', () => {
  log('Build terminated', 'yellow');
  process.exit(143);
});

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});