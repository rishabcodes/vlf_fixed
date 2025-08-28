#!/usr/bin/env node

/**
 * Simple Development Server
 * Just runs Next.js without any complex features
 */

const { spawn } = require('child_process');

console.log('Starting Next.js development server...');
console.log('This may take a moment...');

// Use PORT environment variable or default to 3002
const port = process.env.PORT || '3003';
console.log(`Using port ${port}...`);

// Just run Next.js directly using npx
const nextProcess = spawn('npx', ['next', 'dev', '-p', port], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

nextProcess.on('error', (error) => {
  console.error('Failed to start development server:', error.message);
  process.exit(1);
});

nextProcess.on('close', (code) => {
  console.log(`Development server stopped with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\nStopping development server...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  nextProcess.kill('SIGTERM');
});