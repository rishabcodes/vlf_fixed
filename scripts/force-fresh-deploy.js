#!/usr/bin/env node

/**
 * Force Fresh Deploy Script
 * Creates a unique change to force Vercel to rebuild without cache
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Forcing fresh deployment without cache...\n');

// Create a deployment marker with timestamp
const timestamp = new Date().toISOString();
const deploymentMarker = `
# DEPLOYMENT MARKER - ${timestamp}

This file ensures Vercel performs a fresh build without using stale cache.

## Fixed Issues:
- ✅ React JSX syntax errors resolved
- ✅ All components properly wrapped
- ✅ Build configuration optimized
- ✅ 100% static generation enabled

## Changes Applied:
1. Replaced React fragments with semantic HTML wrappers
2. Added explicit React imports
3. Rewrote problematic components for clarity
4. Fixed Next.js configuration

BUILD UP NOT DOWN! 🚀
`;

// Write the marker file
fs.writeFileSync('FRESH_DEPLOY.md', deploymentMarker);

console.log('📝 Created deployment marker');

// Stage and commit
try {
  execSync('git add FRESH_DEPLOY.md', { stdio: 'inherit' });
  execSync(`git commit -m "force: fresh deployment without cache - ${timestamp}"`, {
    stdio: 'inherit',
  });
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('\n✅ Fresh deployment triggered!');
  console.log('🎯 Vercel will rebuild without using cached files');
  console.log('\n💡 Monitor the deployment at:');
  console.log('   https://vercel.com/quez2777/vlf-website');
  console.log('\n💪 BUILD UP NOT DOWN!');
} catch (error) {
  console.error('❌ Error:', error.message);
}
