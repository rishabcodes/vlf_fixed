#!/usr/bin/env node

import { readFileSync } from 'fs';
import path from 'path';
import { glob } from 'glob';

interface RouteCheck {
  path: string;
  hasDynamic: boolean;
  usesNextRequest: boolean;
  usesHeaders: boolean;
  usesCookies: boolean;
  usesSearchParams: boolean;
  dynamicFeatures: string[];
}

async function verifyDynamicFixes() {
  console.log('🔍 Verifying Dynamic Server Usage Fixes...\n');

  // Find all route.ts files in the API directory
  const routeFiles = await glob('src/app/api/**/route.ts', {
    cwd: process.cwd(),
  });

  const results: RouteCheck[] = [];
  let needsFixCount = 0;
  let properlyConfiguredCount = 0;

  for (const routePath of routeFiles) {
    try {
      const fullPath = path.join(process.cwd(), routePath);
      const content = readFileSync(fullPath, 'utf-8');

      const check: RouteCheck = {
        path: routePath,
        hasDynamic: content.includes('export const dynamic'),
        usesNextRequest: content.includes('NextRequest'),
        usesHeaders: content.includes('headers()') || content.includes('request.headers'),
        usesCookies: content.includes('cookies()') || content.includes('request.cookies'),
        usesSearchParams:
          content.includes('searchParams') || content.includes('nextUrl.searchParams'),
        dynamicFeatures: [],
      };

      // Collect dynamic features
      if (check.usesNextRequest) check.dynamicFeatures.push('NextRequest');
      if (check.usesHeaders) check.dynamicFeatures.push('headers');
      if (check.usesCookies) check.dynamicFeatures.push('cookies');
      if (check.usesSearchParams) check.dynamicFeatures.push('searchParams');

      // Check if it needs dynamic but doesn't have it
      const needsDynamic = check.dynamicFeatures.length > 0;

      if (needsDynamic && !check.hasDynamic) {
        console.log(`❌ Missing dynamic: ${routePath}`);
        console.log(`   Uses: ${check.dynamicFeatures.join(', ')}`);
        needsFixCount++;
      } else if (needsDynamic && check.hasDynamic) {
        console.log(`✅ Properly configured: ${routePath}`);
        properlyConfiguredCount++;
      } else if (!needsDynamic && check.hasDynamic) {
        console.log(`⚠️  Has dynamic but may not need it: ${routePath}`);
      }

      results.push(check);
    } catch (error) {
      console.error(`❌ Error checking ${routePath}:`, error);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Verification Summary:');
  console.log('='.repeat(60));
  console.log(`📁 Total routes checked: ${routeFiles.length}`);
  console.log(`✅ Properly configured: ${properlyConfiguredCount}`);
  console.log(`❌ Still needs fixing: ${needsFixCount}`);
  console.log(
    `⚠️  May have unnecessary dynamic: ${results.filter(r => r.hasDynamic && r.dynamicFeatures.length === 0).length}`
  );
  console.log('='.repeat(60));

  // List routes that still need fixing
  if (needsFixCount > 0) {
    console.log('\n🔧 Routes that still need fixing:');
    results
      .filter(r => r.dynamicFeatures.length > 0 && !r.hasDynamic)
      .forEach(r => {
        console.log(`  - ${r.path} (uses: ${r.dynamicFeatures.join(', ')})`);
      });
  }

  // Check for build warnings
  console.log('\n🏗️  To verify build warnings are gone, run:');
  console.log('   npm run build 2>&1 | grep -i "dynamic"');

  return needsFixCount === 0;
}

// Run the verification
console.log('Dynamic Server Usage Verification');
console.log('=================================\n');

verifyDynamicFixes()
  .then(success => {
    if (!success) {
      console.log('\n⚠️  Some routes still need fixing!');
      process.exit(1);
    } else {
      console.log('\n✅ All routes are properly configured!');
    }
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
