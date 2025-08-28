#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🐳 Starting Vasquez Law Firm in Docker development mode...');

// Ensure database is ready
const checkDatabase = () => {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      console.log('Checking database connection...');
      // Since we're using Neon, just check if we have the URL
      if (process.env.DATABASE_URL) {
        clearInterval(interval);
        console.log('✅ Database URL configured');
        resolve();
      }
    }, 2000);
  });
};

// Start the development server with all features
async function startServices() {
  await checkDatabase();

  // Start Next.js with WebSocket support
  const nextProcess = spawn('node', ['scripts/dev-server.js'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development',
      FORCE_COLOR: '1',
      // Use in-memory Redis mock
      MOCK_REDIS: 'true',
      // Enable all features for testing
      ENABLE_AI_CHAT: 'true',
      ENABLE_VOICE_AGENTS: 'true',
      ENABLE_CREWAI_AGENTS: 'true',
      ENABLE_COMPETITOR_MONITORING: 'true',
      ENABLE_CONTENT_FACTORY: 'true',
      ENABLE_REVIEW_HARVESTING: 'true',
    },
  });

  // Handle shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    nextProcess.kill('SIGTERM');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    nextProcess.kill('SIGTERM');
    process.exit(0);
  });
}

startServices().catch(console.error);
