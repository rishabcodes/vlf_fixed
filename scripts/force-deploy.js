#!/usr/bin/env node

/**
 * Force Deploy Script
 * Ensures Vercel deploys the latest commit
 */

const { execSync } = require('child_process');

console.log('🚀 Forcing deployment with latest commit...\n');

try {
  // Get latest commit hash
  const latestCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  console.log(`📌 Latest commit: ${latestCommit}`);

  // Show last few commits
  console.log('\n📜 Recent commits:');
  execSync('git log --oneline -5', { stdio: 'inherit' });

  console.log('\n🔄 Pushing to ensure everything is up to date...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('\n✅ All changes pushed successfully!');
  console.log('🚀 Vercel should now deploy the latest commit');
  console.log('\n💡 If deployment does not start automatically:');
  console.log('   1. Go to Vercel dashboard');
  console.log('   2. Click "Redeploy"');
  console.log('   3. Select "Use existing Build Cache" = NO');
  console.log('\n💪 BUILD UP NOT DOWN!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
