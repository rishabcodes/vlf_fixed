#!/usr/bin/env node

/**
 * Vercel Cache Bust Script
 * Forces Vercel to use latest code
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔨 AGGRESSIVE CACHE BUSTING...\n');

// Step 1: Create a vercel.json to force settings
const vercelConfig = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  devCommand: 'npm run dev',
  installCommand: 'npm install',
  regions: ['pdx1'],
  functions: {
    'src/app/api/**/*.ts': {
      maxDuration: 60,
    },
  },
  github: {
    silent: false,
    autoJobCancelation: true,
  },
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log('✅ Created vercel.json');

// Step 2: Create a .vercelignore file
const vercelIgnore = `
.git
.next
node_modules
*.log
.env.local
`;

fs.writeFileSync('.vercelignore', vercelIgnore.trim());
console.log('✅ Created .vercelignore');

// Step 3: Update package.json build script
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.scripts['build'] =
  'echo "BUILD STARTED $(date)" && prisma generate && NODE_OPTIONS="--max-old-space-size=8192" next build';
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json build script');

// Step 4: Clear any potential cache files
const cacheFiles = ['.next', 'node_modules/.cache', '.turbo', '.vercel/cache'];

cacheFiles.forEach(file => {
  try {
    execSync(`rm -rf ${file}`, { stdio: 'ignore' });
  } catch (e) {
    // Ignore errors
  }
});

console.log('✅ Cleared local cache files');

// Step 5: Create a build timestamp file
const buildInfo = {
  timestamp: new Date().toISOString(),
  commit: execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim(),
  message: 'FORCE REBUILD - DO NOT USE CACHE',
};

fs.writeFileSync('BUILD_INFO.json', JSON.stringify(buildInfo, null, 2));
console.log('✅ Created BUILD_INFO.json');

console.log('\n🚀 Cache busting complete!');
console.log('📦 Committing changes to force fresh build...');
