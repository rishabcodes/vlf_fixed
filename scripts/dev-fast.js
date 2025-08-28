#!/usr/bin/env node

/**
 * Fast Development Server
 * Optimized for quick startup and minimal overhead
 */

const { spawn } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

console.log('🚀 Starting fast development server...');
console.log('⚡ Performance optimizations enabled');

// Set development environment variables
const env = {
  ...process.env,
  NODE_ENV: 'development',
  // Skip heavy operations
  NEXT_TELEMETRY_DISABLED: '1', // Disable telemetry
  NEXT_PRIVATE_SKIP_SIZE_LIMIT: '1', // Skip size limit checks
  // Development optimizations
  NEXT_PRIVATE_OPTIMIZE_IMAGES: '0', // Disable image optimization
  NEXT_PRIVATE_OPTIMIZE_CSS: '0', // Disable CSS optimization
  NEXT_PRIVATE_OPTIMIZE_FONTS: '0', // Disable font optimization
  // Use development config
  NEXT_CONFIG_PATH: path.join(__dirname, '..', 'next.config.dev.js'),
};

// Check if development config exists
const devConfigPath = path.join(__dirname, '..', 'next.config.dev.js');
if (!existsSync(devConfigPath)) {
  console.error('❌ Development config not found at:', devConfigPath);
  process.exit(1);
}

console.log('📝 Using development-optimized configuration');
console.log('🔧 TypeScript checking relaxed for faster startup');

// Start Next.js with optimized settings
const nextProcess = spawn('npx', [
  'next', 
  'dev', 
  '--config', 
  devConfigPath
], {
  stdio: 'inherit',
  shell: true,
  env,
});

nextProcess.on('error', (error) => {
  console.error('❌ Failed to start development server:', error.message);
  process.exit(1);
});

nextProcess.on('close', (code) => {
  console.log(`🛑 Development server stopped with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping development server...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  nextProcess.kill('SIGTERM');
});

// Print performance tips
console.log('\n💡 Performance Tips:');
console.log('   - First startup may be slower due to cache building');
console.log('   - Subsequent starts should be much faster');
console.log('   - Hot reload is optimized for changed files only');
console.log('   - Use Ctrl+C to stop the server\n');