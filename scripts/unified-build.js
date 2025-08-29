#!/usr/bin/env node

/**
 * Unified build script
 * Restored after cleanup - minimal version
 */

const { spawn } = require('child_process');

console.log('Starting build process...');

// Get build type from arguments
const args = process.argv.slice(2);
const isStatic = args.includes('--static');
const isDeploy = args.includes('--deploy');
const isAnalyze = args.includes('--analyze');

// Set environment variables
process.env.NODE_ENV = 'production';

if (isAnalyze) {
  process.env.ANALYZE = 'true';
}

// Run the build
const buildCmd = spawn('next', ['build'], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

buildCmd.on('error', (err) => {
  console.error('Build failed:', err);
  process.exit(1);
});

buildCmd.on('exit', (code) => {
  if (code === 0) {
    console.log('Build completed successfully!');
  } else {
    console.error(`Build failed with code ${code}`);
  }
  process.exit(code);
});