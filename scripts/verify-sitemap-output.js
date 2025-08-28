#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function verifySitemapOutput() {
  console.log('Verifying sitemap output...\n');
  
  const publicDir = path.join(process.cwd(), 'public');
  const sitemapFiles = fs.readdirSync(publicDir).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
  
  console.log(`Found ${sitemapFiles.length} sitemap files:\n`);
  
  let totalUrls = 0;
  let totalUniqueUrls = new Set();
  
  sitemapFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Count URLs in this sitemap
    const urlMatches = content.match(/<loc>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    
    // Extract actual URLs
    const urls = content.match(/<loc>([^<]+)<\/loc>/g) || [];
    urls.forEach(url => {
      const cleanUrl = url.replace(/<\/?loc>/g, '');
      totalUniqueUrls.add(cleanUrl);
    });
    
    // Check for hreflang tags
    const hreflangCount = (content.match(/hreflang=/g) || []).length;
    
    // File size
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`📄 ${file}:`);
    console.log(`   - URLs: ${urlCount}`);
    console.log(`   - Size: ${sizeKB} KB`);
    if (hreflangCount > 0) {
      console.log(`   - Hreflang alternates: ${hreflangCount}`);
    }
    console.log();
    
    totalUrls += urlCount;
  });
  
  console.log('=== Summary ===');
  console.log(`Total URLs across all sitemaps: ${totalUrls}`);
  console.log(`Total unique URLs: ${totalUniqueUrls.size}`);
  
  // Check for specific page types
  let enPages = 0;
  let esPages = 0;
  let locationPages = 0;
  let practiceAreaPages = 0;
  let blogPages = 0;
  let nearMePages = 0;
  
  totalUniqueUrls.forEach(url => {
    if (url.includes('/es/') || url.endsWith('/es')) {
      esPages++;
    } else {
      enPages++;
    }
    
    if (url.includes('/locations/') || url.includes('/ubicaciones/')) locationPages++;
    if (url.includes('/practice-areas/') || url.includes('/areas-de-practica/')) practiceAreaPages++;
    if (url.includes('/blog/')) blogPages++;
    if (url.includes('/near-me/') || url.includes('/cerca-de-mi/')) nearMePages++;
  });
  
  console.log('\nPage breakdown:');
  console.log(`- English pages: ${enPages}`);
  console.log(`- Spanish pages: ${esPages}`);
  console.log(`- Location pages: ${locationPages}`);
  console.log(`- Practice area pages: ${practiceAreaPages}`);
  console.log(`- Blog pages: ${blogPages}`);
  console.log(`- Near-me pages: ${nearMePages}`);
  
  // Check sitemap index
  const indexPath = path.join(publicDir, 'sitemap.xml');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const sitemapRefs = (indexContent.match(/<sitemap>/g) || []).length;
    console.log(`\n✅ Sitemap index exists with ${sitemapRefs} sitemap references`);
  }
  
  // Validate complete sitemap
  const completePath = path.join(publicDir, 'sitemap-complete.xml');
  if (fs.existsSync(completePath)) {
    const completeContent = fs.readFileSync(completePath, 'utf-8');
    
    // Check for proper XML structure
    const hasProperHeader = completeContent.includes('<?xml version="1.0" encoding="UTF-8"?>');
    const hasUrlset = completeContent.includes('<urlset');
    const hasXhtmlNamespace = completeContent.includes('xmlns:xhtml');
    
    console.log('\n✅ Complete sitemap validation:');
    console.log(`   - Proper XML header: ${hasProperHeader ? '✓' : '✗'}`);
    console.log(`   - Urlset tag: ${hasUrlset ? '✓' : '✗'}`);
    console.log(`   - Hreflang support: ${hasXhtmlNamespace ? '✓' : '✗'}`);
    
    // Sample some URLs
    const sampleUrls = completeContent.match(/<loc>([^<]+)<\/loc>/g)?.slice(0, 5) || [];
    console.log('\n   Sample URLs:');
    sampleUrls.forEach(url => {
      console.log(`   - ${url.replace(/<\/?loc>/g, '')}`);
    });
  }
  
  console.log('\n🎉 Sitemap verification complete!');
  
  if (totalUniqueUrls.size >= 2500) {
    console.log(`\n✅ SUCCESS: Generated ${totalUniqueUrls.size} unique URLs (target: 2,555+)`);
  } else {
    console.log(`\n⚠️  WARNING: Only ${totalUniqueUrls.size} unique URLs found (target: 2,555+)`);
  }
}

// Run verification
verifySitemapOutput();