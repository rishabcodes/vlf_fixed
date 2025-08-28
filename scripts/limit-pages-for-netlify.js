#!/usr/bin/env node

/**
 * Temporarily limit pages for successful Netlify deployment
 * This allows us to get the site live, then optimize for full build
 */

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// Temporarily rename large directories to skip them in build
const largeDirectories = [
  'cerca-de-mi',
  'near-me', 
  'practice-areas',
  'es/areas-de-practica',
  // Keep core pages for functionality test
];

console.log('🔧 Temporarily limiting pages for Netlify build...');

largeDirectories.forEach(dir => {
  const fullPath = path.join(appDir, dir);
  const backupPath = `${fullPath}.backup-for-netlify`;
  
  if (fs.existsSync(fullPath) && !fs.existsSync(backupPath)) {
    fs.renameSync(fullPath, backupPath);
    console.log(`✅ Moved ${dir} to ${dir}.backup-for-netlify`);
  }
});

console.log('✅ Page limiting complete. Core pages only will be built.');
console.log('📝 To restore: run restore-pages-after-netlify.js');