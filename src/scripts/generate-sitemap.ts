import { FileSystemPageDiscovery } from '../lib/sitemap/page-discovery';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '../lib/prisma';

async function generateComprehensiveSitemap() {
  console.log('🚀 Starting comprehensive sitemap generation...');
  
  const discovery = new FileSystemPageDiscovery();
  const pages = await discovery.discoverAllPages();
  
  // Generate statistics
  let totalPages = 0;
  let enPages = 0;
  let esPages = 0;
  const parityIssues: string[] = [];
  
  for (const [path, pair] of pages) {
    if (pair.en) {
      totalPages++;
      enPages++;
    }
    if (pair.es) {
      totalPages++;
      esPages++;
    }
    
    // Check parity
    if ((pair.en && !pair.es) || (!pair.en && pair.es)) {
      parityIssues.push(path);
    }
  }
  
  // Add dynamic content
  try {
    const blogPosts = await prisma.blogPost.count({ where: { publishedAt: { not: null } } });
    // const caseResults = await prisma.caseResult.count(); // Model doesn't exist
    
    console.log(`\n📊 Sitemap Statistics:`);
    console.log(`- Total static pages: ${totalPages}`);
    console.log(`- English pages: ${enPages}`);
    console.log(`- Spanish pages: ${esPages}`);
    console.log(`- Blog posts: ${blogPosts}`);
    console.log(`- Case results: 0`); // Model doesn't exist
    console.log(`- Parity issues: ${parityIssues.length}`);
    
    if (parityIssues.length > 0) {
      console.log('\n⚠️  Pages missing translations:');
      parityIssues.forEach(page => console.log(`  - ${page}`));
    }
  } catch (error) {
    console.error('Failed to fetch dynamic content counts:', error);
  }
  
  // Generate sitemap report
  const report = {
    generated: new Date().toISOString(),
    statistics: {
      totalPages,
      englishPages: enPages,
      spanishPages: esPages,
      parityIssues: parityIssues.length,
    },
    pages: Array.from(pages.entries()).map(([path, pair]) => ({
      path,
      hasEnglish: !!pair.en,
      hasSpanish: !!pair.es,
      type: pair.en?.type || pair.es?.type || 'unknown',
    })),
  };
  
  // Save report
  const reportPath = path.join(process.cwd(), 'sitemap-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ Sitemap report saved to: ${reportPath}`);
  
  // Generate warnings for missing critical pages
  const criticalPages = [
    '/', '/contact', '/about', '/practice-areas', '/attorneys', '/blog',
    '/es', '/es/contacto', '/es/nosotros', '/es/areas-de-practica', '/es/abogados', '/es/blog',
  ];
  
  const missingCritical = criticalPages.filter(page => {
    const normalizedPath = page === '/es' ? '/' : page.replace('/es/', '/');
    return !pages.has(normalizedPath);
  });
  
  if (missingCritical.length > 0) {
    console.log('\n🚨 CRITICAL: Missing essential pages:');
    missingCritical.forEach(page => console.log(`  - ${page}`));
  }
  
  console.log('\n✨ Sitemap generation complete!');
}

// Run if called directly
if (require.main === module) {
  generateComprehensiveSitemap()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Failed to generate sitemap:', error);
      process.exit(1);
    });
}

export { generateComprehensiveSitemap };