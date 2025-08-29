#!/usr/bin/env node

/**
 * Simple development server script
 * Restored after cleanup - minimal version
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Next.js development server...');

// Set environment variables
process.env.NODE_ENV = 'development';
process.env.NEXT_TELEMETRY_DISABLED = '1';

// Start Next.js dev server
const nextDev = spawn('next', ['dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development',
    NEXT_TELEMETRY_DISABLED: '1'
  }
});

nextDev.on('error', (err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});

nextDev.on('exit', (code) => {
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  nextDev.kill('SIGINT');
  process.exit();
});

process.on('SIGTERM', () => {
  nextDev.kill('SIGTERM');
  process.exit();
});