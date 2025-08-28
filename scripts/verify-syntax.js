#!/usr/bin/env node

/**
 * Verify Syntax Script
 * Quick check to ensure our syntax fixes are working
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Verifying syntax fixes...\n');

const filesToCheck = [
  'src/app/contact/page.tsx',
  'src/app/scholarship/ScholarshipPageClient.tsx',
  'src/app/es/nuestro-equipo/NuestroEquipoPageClient.tsx',
  'src/app/our-team/OurTeamPageClient.tsx',
];

let allGood = true;

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      // Run TypeScript compiler check on the file
      execSync(`npx tsc --noEmit --jsx react --esModuleInterop ${file}`, {
        stdio: 'pipe',
      });
      console.log(`✅ ${file} - Syntax OK`);
    } catch (error) {
      console.log(`❌ ${file} - Syntax Error`);
      console.log(error.stdout?.toString() || error.message);
      allGood = false;
    }
  } else {
    console.log(`⚠️  ${file} - File not found`);
  }
});

console.log('\n' + '─'.repeat(60));
if (allGood) {
  console.log('✅ All syntax fixes verified successfully!');
  console.log('🚀 Ready to build - BUILD UP NOT DOWN!');
} else {
  console.log('❌ Some files still have syntax errors');
  process.exit(1);
}
