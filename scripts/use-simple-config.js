#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), 'next.config.js');
const originalConfigPath = path.join(process.cwd(), 'next.config.original.js');
const simpleConfigPath = path.join(process.cwd(), 'next.config.simple.js');

console.log('🔧 Setting up simple Next.js configuration...');

// Backup original config if it exists
if (fs.existsSync(configPath)) {
  fs.renameSync(configPath, originalConfigPath);
  console.log('✅ Backed up original next.config.js');
}

// Copy simple config
if (fs.existsSync(simpleConfigPath)) {
  fs.copyFileSync(simpleConfigPath, configPath);
  console.log('✅ Applied simple configuration');
} else {
  console.error('❌ next.config.simple.js not found!');
  process.exit(1);
}

console.log('✅ Configuration ready for build');
