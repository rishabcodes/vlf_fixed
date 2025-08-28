#!/usr/bin/env node

/**
 * Pre-flight Check Script
 * Ensures everything is ready for deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Running pre-flight checks...\n');

const checks = [];

// Check 1: Verify syntax fixes
console.log('1. Checking syntax fixes...');
const syntaxFiles = [
  'src/app/contact/page.tsx',
  'src/app/scholarship/ScholarshipPageClient.tsx',
  'src/app/es/nuestro-equipo/NuestroEquipoPageClient.tsx',
  'src/app/our-team/OurTeamPageClient.tsx',
];

syntaxFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('<>') && content.includes('</>')) {
      checks.push({ name: `${file} fragment fix`, status: '✅' });
    } else {
      checks.push({ name: `${file} fragment fix`, status: '❌' });
    }
  }
});

// Check 2: Next.js config
console.log('2. Checking Next.js configuration...');
const nextConfig = fs.readFileSync('next.config.js', 'utf8');
if (
  (nextConfig.includes('staticPageGenerationTimeout: 180') &&
    !nextConfig.includes('experimental: {')) ||
  nextConfig.indexOf('staticPageGenerationTimeout') > nextConfig.indexOf('experimental: {')
) {
  checks.push({ name: 'Next.js config', status: '✅' });
} else {
  checks.push({ name: 'Next.js config', status: '❌' });
}

// Check 3: Environment variables
console.log('3. Checking environment variables...');
if (fs.existsSync('.env') || fs.existsSync('.env.local')) {
  checks.push({ name: 'Environment variables', status: '✅' });
} else {
  checks.push({ name: 'Environment variables', status: '⚠️' });
}

// Check 4: Node modules
console.log('4. Checking dependencies...');
if (fs.existsSync('node_modules')) {
  checks.push({ name: 'Dependencies installed', status: '✅' });
} else {
  checks.push({ name: 'Dependencies installed', status: '❌' });
}

// Check 5: Prisma
console.log('5. Checking Prisma...');
if (fs.existsSync('node_modules/.prisma/client')) {
  checks.push({ name: 'Prisma client generated', status: '✅' });
} else {
  checks.push({ name: 'Prisma client generated', status: '⚠️' });
}

// Print results
console.log('\n' + '═'.repeat(60));
console.log('PRE-FLIGHT CHECK RESULTS:');
console.log('═'.repeat(60));

let allGood = true;
checks.forEach(check => {
  console.log(`${check.status} ${check.name}`);
  if (check.status === '❌') allGood = false;
});

console.log('═'.repeat(60));

if (allGood) {
  console.log('\n✅ All checks passed! Ready to build.');
  console.log('🚀 Run: npm run build:complete');
  console.log('💪 BUILD UP NOT DOWN!');
} else {
  console.log('\n❌ Some checks failed. Please fix issues before building.');
  process.exit(1);
}
