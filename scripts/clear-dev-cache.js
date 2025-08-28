#!/usr/bin/env node

/**
 * Clear Development Cache
 * Removes build artifacts and caches for a fresh start
 */

const { rmSync, existsSync } = require('fs');
const path = require('path');

console.log('🧹 Clearing development caches...');

const pathsToClean = [
  '.next',
  'node_modules/.cache',
  'dist',
  'tsconfig.tsbuildinfo',
  'tsconfig.socket.tsbuildinfo',
];

pathsToClean.forEach(cleanPath => {
  const fullPath = path.join(process.cwd(), cleanPath);
  if (existsSync(fullPath)) {
    try {
      rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ Cleared: ${cleanPath}`);
    } catch (error) {
      console.log(`❌ Failed to clear ${cleanPath}:`, error.message);
    }
  } else {
    console.log(`⏭️  Skipped: ${cleanPath} (doesn't exist)`);
  }
});

console.log('\n🚀 Cache cleared! Your next dev server start should be faster.');
console.log('💡 Run "pnpm dev:fast" for optimized development experience.');