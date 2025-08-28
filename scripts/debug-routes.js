#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging route files...\n');

const routesToCheck = [
  'src/app/sitemap.xml/route.ts',
  'src/app/robots.ts',
  'src/app/blog/rss.xml/route.ts',
  'src/app/sitemap-blog.xml/route.ts',
];

routesToCheck.forEach(route => {
  const fullPath = path.join(process.cwd(), route);
  console.log(`\n📄 ${route}:`);

  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n').slice(0, 10);

    console.log('First 10 lines:');
    lines.forEach((line, i) => {
      console.log(`  ${i + 1}: ${line}`);
    });

    // Check for required exports
    const hasDynamic = content.includes("export const dynamic = 'force-static'");
    const hasRevalidate = content.includes('export const revalidate = false');
    const hasBaseUrl = content.includes('vasquezlawnc.com');

    console.log('\nChecks:');
    console.log(`  ✓ Has dynamic export: ${hasDynamic}`);
    console.log(`  ✓ Has revalidate export: ${hasRevalidate}`);
    console.log(`  ✓ Has static baseUrl: ${hasBaseUrl}`);
  } else {
    console.log('  ❌ File not found');
  }
});
