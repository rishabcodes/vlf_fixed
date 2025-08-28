#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '../src/app/api');
const apiBackupDir = path.join(__dirname, '../api.backup');

const action = process.argv[2] || 'backup';

if (action === 'backup') {
  // Move API routes out of the way for static export
  if (fs.existsSync(apiDir)) {
    if (fs.existsSync(apiBackupDir)) {
      console.log('❌ Backup directory already exists. Please restore first.');
      process.exit(1);
    }

    fs.renameSync(apiDir, apiBackupDir);
    console.log('✅ API routes backed up to api.backup');
  } else {
    console.log('ℹ️  No API directory found');
  }
} else if (action === 'restore') {
  // Restore API routes after static export
  if (fs.existsSync(apiBackupDir)) {
    if (fs.existsSync(apiDir)) {
      console.log('❌ API directory already exists. Please remove it first.');
      process.exit(1);
    }

    fs.renameSync(apiBackupDir, apiDir);
    console.log('✅ API routes restored from backup');
  } else {
    console.log('❌ No backup directory found');
  }
} else {
  console.log('Usage: node handle-api-routes.js [backup|restore]');
  process.exit(1);
}
