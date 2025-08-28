#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Preparing all pages for static export...');

// 1. Find all page.tsx files
const pageFiles = glob.sync('src/app/**/page.tsx', {
  cwd: process.cwd(),
  absolute: true,
  ignore: ['**/api/**', '**/node_modules/**'],
});

console.log(`Found ${pageFiles.length} page files to check`);

let fixedCount = 0;

pageFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Check if page uses dynamic functions
  const dynamicPatterns = [
    'useSearchParams',
    'searchParams',
    'cookies()',
    'headers()',
    'useRouter',
    'redirect',
    'notFound()',
  ];

  const hasDynamicCode = dynamicPatterns.some(pattern => content.includes(pattern));

  if (hasDynamicCode) {
    console.log(`\n⚠️  Dynamic code found in: ${path.relative(process.cwd(), file)}`);

    // Add generateStaticParams if missing
    if (!content.includes('generateStaticParams')) {
      // Check if it's a dynamic route
      const isDynamicRoute = file.includes('[') && file.includes(']');

      if (isDynamicRoute) {
        console.log('  → Adding generateStaticParams for dynamic route');

        // Extract parameter name
        const paramMatch = file.match(/\[([^\]]+)\]/);
        if (paramMatch) {
          const paramName = paramMatch[1];

          // Add generateStaticParams before the default export
          const exportMatch = content.match(/(export default (?:async )?function)/);
          if (exportMatch) {
            const staticParamsFunc = `
export async function generateStaticParams() {
  // TODO: Return all possible values for ${paramName}
  return [];
}

`;
            const insertPos = exportMatch.index;
            content = content.slice(0, insertPos) + staticParamsFunc + content.slice(insertPos);
            modified = true;
          }
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(file, content);
    fixedCount++;
    console.log(`  ✅ Fixed ${path.basename(file)}`);
  }
});

// 2. Check for problematic imports in components
const componentFiles = glob.sync('src/components/**/*.{ts,tsx}', {
  cwd: process.cwd(),
  absolute: true,
});

console.log(`\nChecking ${componentFiles.length} component files...`);

componentFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Check for Next.js dynamic imports
  if (content.includes('next/navigation') && content.includes('useRouter')) {
    console.log(`\n⚠️  Dynamic navigation in: ${path.relative(process.cwd(), file)}`);
    console.log('  → Consider using Link component instead of useRouter for static export');
  }
});

// 3. Create a report of all dynamic routes that need static params
const dynamicRoutes = pageFiles.filter(file => file.includes('[') && file.includes(']'));

if (dynamicRoutes.length > 0) {
  console.log('\n📋 Dynamic routes that need generateStaticParams:');

  const routeReport = dynamicRoutes.map(file => {
    const relativePath = path.relative(process.cwd(), file);
    const route = relativePath.replace('src/app', '').replace('/page.tsx', '').replace(/\\/g, '/');

    return { route, file: relativePath };
  });

  fs.writeFileSync(
    path.join(process.cwd(), 'static-build-report.json'),
    JSON.stringify({ dynamicRoutes: routeReport }, null, 2)
  );

  routeReport.forEach(({ route, file }) => {
    console.log(`  ${route} → ${file}`);
  });

  console.log('\n💡 Add generateStaticParams to each dynamic route above');
}

console.log(`\n✅ Checked all pages. Fixed ${fixedCount} files.`);
console.log('📄 See static-build-report.json for routes that need attention');
