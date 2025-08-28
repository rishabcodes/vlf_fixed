#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Ensuring all route files are configured for static export...');

// Find all route.ts files that generate XML
const routeFiles = [
  ...glob.sync('src/app/**/*sitemap*/route.ts', { cwd: process.cwd(), absolute: true }),
  ...glob.sync('src/app/**/rss.xml/route.ts', { cwd: process.cwd(), absolute: true }),
  ...glob.sync('src/app/**/hreflang-sitemap.xml/route.ts', { cwd: process.cwd(), absolute: true }),
  ...glob.sync('src/app/**/robots.ts', { cwd: process.cwd(), absolute: true }),
  ...glob.sync('src/app/**/robots.txt/route.ts', { cwd: process.cwd(), absolute: true }),
];

console.log(`Found ${routeFiles.length} route files to check`);

routeFiles.forEach(file => {
  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Check if file has export const dynamic = 'force-static'
  if (!content.includes("export const dynamic = 'force-static'")) {
    // Find the first import or export
    const insertMatch = content.match(/(import[^;]+;?\n|export[^;]+;?\n)/);
    if (insertMatch) {
      const insertPosition = insertMatch.index + insertMatch[0].length;
      content =
        content.slice(0, insertPosition) +
        "\nexport const dynamic = 'force-static';\n" +
        content.slice(insertPosition);
      modified = true;
    }
  }

  // Check if file has export const revalidate = false
  if (!content.includes('export const revalidate = false')) {
    // Find export const dynamic line
    const dynamicMatch = content.match(/export const dynamic = 'force-static';?\n/);
    if (dynamicMatch) {
      const insertPosition = dynamicMatch.index + dynamicMatch[0].length;
      content =
        content.slice(0, insertPosition) +
        'export const revalidate = false;\n' +
        content.slice(insertPosition);
      modified = true;
    }
  }

  // For sitemap files, ensure baseUrl is hardcoded
  if (file.includes('sitemap') || file.includes('rss.xml')) {
    // Remove any dynamic baseUrl logic
    if (content.includes('headers()')) {
      content = content.replace(
        /import\s*{\s*headers\s*}\s*from\s*['"]next\/headers['"];?\n?/g,
        ''
      );
      content = content.replace(/const headersList = await headers\(\);?\n/g, '');
      content = content.replace(
        /const host = headersList\.get\(['"]host['"]\)\s*\|\|\s*['"][^'"]+['"];?\n/g,
        ''
      );
      content = content.replace(
        /const protocol = process\.env\.NODE_ENV === ['"]production['"] \? ['"]https['"] : ['"]http['"];?\n/g,
        ''
      );
      content = content.replace(/const baseUrl = [`'"][^`'"]*[`'"];?\n/g, '');
      modified = true;
    }

    // Ensure static baseUrl exists
    if (
      !content.includes("const baseUrl = 'https://www.vasquezlawnc.com'") &&
      !content.includes('const baseUrl = "https://www.vasquezlawnc.com"')
    ) {
      const revalidateMatch = content.match(/export const revalidate = false;?\n/);
      if (revalidateMatch) {
        const insertPosition = revalidateMatch.index + revalidateMatch[0].length;
        content =
          content.slice(0, insertPosition) +
          "\nconst baseUrl = 'https://www.vasquezlawnc.com';\n" +
          content.slice(insertPosition);
        modified = true;
      }
    }
  }

  // Remove prisma imports for static build
  if (content.includes('import { prisma }')) {
    content = content.replace(
      /import { prisma } from ['"]@\/lib\/prisma['"];?\n?/g,
      "// import { prisma } from '@/lib/prisma';\n"
    );
    // Replace prisma calls with empty arrays
    content = content.replace(
      /const posts = await prisma\.blogPost\.findMany\([^}]+\}\);/g,
      'const posts = [];'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed ${path.relative(process.cwd(), file)}`);
  } else {
    console.log(`✓ Already correct: ${path.relative(process.cwd(), file)}`);
  }
});

// Final check on sitemap.xml
const sitemapPath = path.join(process.cwd(), 'src/app/sitemap.xml/route.ts');
if (fs.existsSync(sitemapPath)) {
  const finalContent = fs.readFileSync(sitemapPath, 'utf8');
  console.log('\n📄 Final check on sitemap.xml/route.ts:');
  console.log('Has force-static:', finalContent.includes("export const dynamic = 'force-static'"));
  console.log('Has revalidate:', finalContent.includes('export const revalidate = false'));
  console.log('First 200 chars:', finalContent.substring(0, 200));
}

console.log('\n✅ All route files configured for static export');
