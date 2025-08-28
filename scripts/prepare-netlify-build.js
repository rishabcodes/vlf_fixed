#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Netlify build...');
console.log('Node version:', process.version);
console.log('Working directory:', process.cwd());
console.log('Memory allocated:', process.env.NODE_OPTIONS || 'default');

// Ensure required directories exist
const dirs = ['out', '.next', 'public'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Check for pnpm
const { execSync } = require('child_process');
try {
  execSync('pnpm --version', { stdio: 'pipe' });
  console.log('✅ pnpm is available');
} catch (error) {
  console.log('⚠️ pnpm not found, installing...');
  try {
    execSync('npm install -g pnpm@8', { stdio: 'inherit' });
    console.log('✅ pnpm installed');
  } catch (installError) {
    console.error('❌ Failed to install pnpm');
  }
}

// Log environment
console.log('\n📋 Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('NETLIFY:', process.env.NETLIFY || 'not set');
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL || 'not set');

// Debug: Check sitemap.xml route
const sitemapPath = path.join(process.cwd(), 'src/app/sitemap.xml/route.ts');
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  console.log('\n📄 Checking sitemap.xml/route.ts:');
  console.log('Has force-static:', content.includes("export const dynamic = 'force-static'"));
  console.log('Has revalidate:', content.includes('export const revalidate = false'));
  console.log('First 200 chars:', content.substring(0, 200));
}

console.log('\n✅ Build preparation complete!');
