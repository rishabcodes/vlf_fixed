#!/usr/bin/env node

/**
 * Production-ready startup script
 * Starts the Next.js server with proper error handling
 */

const { spawn } = require('child_process');
const path = require('path');

// Production configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

console.log(`
  ▲ Vasquez Law Firm Production Server
  ─────────────────────────────────────
  
  Environment: ${process.env.NODE_ENV || 'production'}
  Port:        ${PORT}
  Host:        ${HOST}
  
  ─────────────────────────────────────
`);

// Start Next.js production server
const nextServer = spawn('npm', ['run', 'start'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT,
    HOST,
    NODE_ENV: 'production'
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\nShutting down gracefully...');
  nextServer.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\nReceived SIGTERM, shutting down...');
  nextServer.kill('SIGTERM');
  process.exit(0);
});

nextServer.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

nextServer.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Server exited with code ${code}`);
    process.exit(code);
  }
});