#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import { glob } from 'glob';
import { XMLParser } from 'fast-xml-parser';

async function getUrlsFromSitemap(sitemapPath: string): Promise<string[]> {
  try {
    const content = await fs.readFile(sitemapPath, 'utf-8');
    const parser = new XMLParser();
    const result = parser.parse(content);

    const urls: string[] = [];
    if (result.urlset && result.urlset.url) {
      const urlArray = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url];
      for (const url of urlArray) {
        if (url.loc) {
          const pathname = new URL(url.loc).pathname;
          urls.push(pathname);
        }
      }
    }
    return urls;
  } catch (error) {
    console.error(`Error reading sitemap ${sitemapPath}:`, error);
    return [];
  }
}

async function main() {
  console.log('🔍 Finding pages missing from sitemaps...\n');

  // Get all actual pages
  const pageFiles = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/api/**'],
  });

  const actualPages = pageFiles.map(file => {
    let urlPath = file.replace('src/app', '').replace('/page.tsx', '');
    if (urlPath === '') urlPath = '/';
    return urlPath;
  });

  // Get URLs from sitemaps
  const sitemapFiles = await glob('public/sitemap-*.xml');
  let sitemapUrls: string[] = [];

  for (const sitemapFile of sitemapFiles) {
    const urls = await getUrlsFromSitemap(sitemapFile);
    sitemapUrls = sitemapUrls.concat(urls);
  }

  // Convert to sets for comparison
  const actualSet = new Set(actualPages);
  const sitemapSet = new Set(sitemapUrls);

  // Find missing pages
  const missingFromSitemap = actualPages.filter(page => !sitemapSet.has(page));
  const inSitemapButNotFiles = sitemapUrls.filter(url => !actualSet.has(url));

  console.log('📊 Summary:');
  console.log(`   Total actual pages: ${actualPages.length}`);
  console.log(`   Total sitemap URLs: ${sitemapUrls.length}`);
  console.log(`   Missing from sitemap: ${missingFromSitemap.length}`);
  console.log(`   In sitemap but not files: ${inSitemapButNotFiles.length}\n`);

  // Group missing pages by type
  const testPages = missingFromSitemap.filter(p => p.includes('test'));
  const adminPages = missingFromSitemap.filter(p => p.includes('admin'));
  const otherPages = missingFromSitemap.filter(p => !p.includes('test') && !p.includes('admin'));

  if (testPages.length > 0) {
    console.log(`\n🧪 Test pages not in sitemap (${testPages.length}):`);
    testPages.slice(0, 10).forEach(p => console.log(`   ${p}`));
    if (testPages.length > 10) console.log(`   ... and ${testPages.length - 10} more`);
  }

  if (adminPages.length > 0) {
    console.log(`\n🔐 Admin pages not in sitemap (${adminPages.length}):`);
    adminPages.forEach(p => console.log(`   ${p}`));
  }

  if (otherPages.length > 0) {
    console.log(`\n📄 Other pages not in sitemap (${otherPages.length}):`);
    otherPages.slice(0, 20).forEach(p => console.log(`   ${p}`));
    if (otherPages.length > 20) console.log(`   ... and ${otherPages.length - 20} more`);
  }

  // Check what types of Spanish pages we're missing
  const spanishPages = actualPages.filter(p => p.startsWith('/es'));
  const englishPages = actualPages.filter(p => !p.startsWith('/es'));

  console.log('\n🌐 Language breakdown of actual files:');
  console.log(`   English pages: ${englishPages.length}`);
  console.log(`   Spanish pages: ${spanishPages.length}`);

  // Save detailed report
  const report = {
    summary: {
      totalActualPages: actualPages.length,
      totalSitemapUrls: sitemapUrls.length,
      missingFromSitemap: missingFromSitemap.length,
      englishPages: englishPages.length,
      spanishPages: spanishPages.length,
    },
    missingFromSitemap: missingFromSitemap.sort(),
  };

  await fs.writeFile('missing-from-sitemap-report.json', JSON.stringify(report, null, 2));
  console.log('\n📝 Detailed report saved to: missing-from-sitemap-report.json');
}

main().catch(console.error);
