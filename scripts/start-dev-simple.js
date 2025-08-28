#!/usr/bin/env node

/**
 * Simple development server
 * Starts Next.js without WebSocket complications
 */

const { spawn } = require('child_process');
const PORT = process.env.PORT || 3000;

console.log(`
  ▲ Vasquez Law Firm Development Server
  ─────────────────────────────────────
  
  Starting Next.js on port ${PORT}...
  
`);

// Start Next.js dev server
const nextDev = spawn('npx', ['next', 'dev', '-p', PORT], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

// Handle errors
nextDev.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\nShutting down...');
  nextDev.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  nextDev.kill('SIGTERM');
  process.exit(0);
});