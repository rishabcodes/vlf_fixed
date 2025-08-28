const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Track all pages and their content hashes
const pageMap = new Map();
const duplicates = [];
const similarPages = [];

// Directories to scan
const directories = [
  '/Users/williamvasquez/Documents/VLF Website/src/app',
];

// Pages to ignore
const ignorePaths = [
  'api/',
  '_components/',
  '_utils/',
  'layout.tsx',
  'error.tsx',
  'loading.tsx',
  'not-found.tsx',
  'global-error.tsx'
];

function shouldIgnore(filePath) {
  return ignorePaths.some(ignore => filePath.includes(ignore));
}

function getContentHash(content) {
  // Remove whitespace and normalize for comparison
  const normalized = content
    .replace(/\s+/g, ' ')
    .replace(/['"`]/g, '')
    .trim();
  
  return crypto
    .createHash('md5')
    .update(normalized)
    .digest('hex');
}

function extractPageTitle(content) {
  // Try to extract title from metadata or h1
  const metaTitleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const titleMatch = content.match(/title\s*=\s*['"`]([^'"`]+)['"`]/);
  
  return metaTitleMatch?.[1] || h1Match?.[1] || titleMatch?.[1] || 'Unknown';
}

function findSimilarContent(content1, content2) {
  // Simple similarity check - could be enhanced
  const words1 = content1.toLowerCase().split(/\s+/);
  const words2 = content2.toLowerCase().split(/\s+/);
  
  const commonWords = words1.filter(word => words2.includes(word));
  const similarity = commonWords.length / Math.max(words1.length, words2.length);
  
  return similarity > 0.8; // 80% similarity threshold
}

function scanDirectory(dir, baseDir = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const relativePath = path.join(baseDir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath, relativePath);
    } else if (file === 'page.tsx' || file === 'page.jsx') {
      if (shouldIgnore(relativePath)) return;
      
      const content = fs.readFileSync(filePath, 'utf8');
      const hash = getContentHash(content);
      const title = extractPageTitle(content);
      const pagePath = path.dirname(relativePath);
      
      const pageInfo = {
        path: filePath,
        relativePath: pagePath,
        title,
        hash,
        content: content.substring(0, 500) // First 500 chars for comparison
      };
      
      // Check for exact duplicates
      const existing = Array.from(pageMap.values()).find(p => p.hash === hash);
      if (existing) {
        duplicates.push({
          original: existing,
          duplicate: pageInfo
        });
      } else {
        // Check for similar pages
        pageMap.forEach((existingPage, key) => {
          if (findSimilarContent(content, existingPage.content)) {
            similarPages.push({
              page1: existingPage,
              page2: pageInfo
            });
          }
        });
        
        pageMap.set(pagePath, pageInfo);
      }
    }
  });
}

function generateReport() {
  console.log('🔍 Duplicate Page Analysis Report\n');
  console.log('=' .repeat(80));
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total pages scanned: ${pageMap.size + duplicates.length}`);
  console.log(`   Exact duplicates found: ${duplicates.length}`);
  console.log(`   Similar pages found: ${similarPages.length}`);
  
  if (duplicates.length > 0) {
    console.log(`\n❌ Exact Duplicates Found:`);
    console.log('-'.repeat(80));
    
    duplicates.forEach(({ original, duplicate }, index) => {
      console.log(`\n${index + 1}. Duplicate detected:`);
      console.log(`   Original: ${original.relativePath} (${original.title})`);
      console.log(`   Duplicate: ${duplicate.relativePath} (${duplicate.title})`);
      console.log(`   Action: Consider removing ${duplicate.path}`);
    });
  }
  
  if (similarPages.length > 0) {
    console.log(`\n⚠️  Similar Pages (>80% similarity):`);
    console.log('-'.repeat(80));
    
    similarPages.forEach(({ page1, page2 }, index) => {
      console.log(`\n${index + 1}. Similar content detected:`);
      console.log(`   Page 1: ${page1.relativePath} (${page1.title})`);
      console.log(`   Page 2: ${page2.relativePath} (${page2.title})`);
      console.log(`   Action: Review for potential consolidation`);
    });
  }
  
  // Check for specific duplicate patterns
  console.log(`\n🔎 Common Duplicate Patterns:`);
  console.log('-'.repeat(80));
  
  const paymentPages = Array.from(pageMap.keys()).filter(key => 
    key.includes('payment') || key.includes('pago') || key.includes('pay')
  );
  
  if (paymentPages.length > 2) {
    console.log(`\n• Multiple payment pages detected (${paymentPages.length}):`);
    paymentPages.forEach(page => console.log(`  - ${page}`));
    console.log(`  Action: Consolidate into single payment page with language support`);
  }
  
  const contactPages = Array.from(pageMap.keys()).filter(key => 
    key.includes('contact') || key.includes('contacto')
  );
  
  if (contactPages.length > 2) {
    console.log(`\n• Multiple contact pages detected (${contactPages.length}):`);
    contactPages.forEach(page => console.log(`  - ${page}`));
  }
  
  // Generate removal script
  if (duplicates.length > 0) {
    console.log(`\n📝 Removal Script:`);
    console.log('-'.repeat(80));
    console.log('#!/bin/bash');
    console.log('# Script to remove duplicate pages');
    console.log('# Review each removal before executing!\n');
    
    duplicates.forEach(({ duplicate }) => {
      const dirToRemove = path.dirname(duplicate.path);
      console.log(`# Remove: ${duplicate.relativePath}`);
      console.log(`# rm -rf "${dirToRemove}"`);
    });
    
    console.log('\n# To execute removals, uncomment the rm commands above');
  }
}

// Main execution
console.log('🚀 Starting duplicate page analysis...\n');

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Scanning ${dir}...`);
    scanDirectory(dir);
  }
});

generateReport();

// Save detailed report
const reportPath = path.join(process.cwd(), 'DUPLICATE_PAGES_REPORT.md');
const reportContent = `# Duplicate Pages Report

Generated: ${new Date().toISOString()}

## Summary
- Total pages scanned: ${pageMap.size + duplicates.length}
- Exact duplicates: ${duplicates.length}
- Similar pages: ${similarPages.length}

## Exact Duplicates
${duplicates.map(({ original, duplicate }) => `
### ${duplicate.relativePath}
- **Original**: ${original.relativePath}
- **Title**: ${duplicate.title}
- **Path**: ${duplicate.path}
- **Action**: Remove duplicate
`).join('\n')}

## Similar Pages (>80% similarity)
${similarPages.map(({ page1, page2 }) => `
### ${page1.relativePath} ↔ ${page2.relativePath}
- **Page 1 Title**: ${page1.title}
- **Page 2 Title**: ${page2.title}
- **Action**: Review for consolidation
`).join('\n')}

## Recommendations
1. Remove exact duplicates
2. Consolidate similar pages
3. Use language routing instead of duplicate pages
4. Implement shared components for common functionality
`;

fs.writeFileSync(reportPath, reportContent);
console.log(`\n✅ Detailed report saved to: ${reportPath}`);