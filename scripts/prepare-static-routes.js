#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Preparing routes for static export...');

// Temporarily comment out prisma imports in sitemap-blog.xml route
const blogSitemapPath = path.join(process.cwd(), 'src/app/sitemap-blog.xml/route.ts');
if (fs.existsSync(blogSitemapPath)) {
  let content = fs.readFileSync(blogSitemapPath, 'utf8');

  // Comment out prisma import and usage
  content = content.replace(
    /import { prisma } from '@\/lib\/prisma';/g,
    "// import { prisma } from '@/lib/prisma';"
  );
  content = content.replace(
    /const posts = await prisma\.blogPost\.findMany\([^}]+\}\);/g,
    'const posts = [];'
  );

  fs.writeFileSync(blogSitemapPath, content);
  console.log('✅ Prepared sitemap-blog.xml for static export');
}

// Do the same for RSS feed
const rssFeedPath = path.join(process.cwd(), 'src/app/blog/rss.xml/route.ts');
if (fs.existsSync(rssFeedPath)) {
  let content = fs.readFileSync(rssFeedPath, 'utf8');

  // Comment out prisma import
  content = content.replace(
    /import { prisma } from '@\/lib\/prisma';/g,
    "// import { prisma } from '@/lib/prisma';"
  );

  fs.writeFileSync(rssFeedPath, content);
  console.log('✅ Prepared RSS feed for static export');
}

console.log('✅ Routes prepared for static export');
