import { FileSystemPageDiscovery } from '@/lib/sitemap/page-discovery';
import fs from 'fs/promises';
import path from 'path';

async function generateCompleteSitemap() {
  console.log('Starting complete sitemap generation...');
  
  const discovery = new FileSystemPageDiscovery();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vasquezlawnc.com';
  
  try {
    // Discover all pages
    const pagePairs = await discovery.discoverAllPages();
    console.log(`Discovered ${pagePairs.size} unique page paths`);
    
    // Count total pages (EN + ES)
    let totalPages = 0;
    let enPages = 0;
    let esPages = 0;
    
    pagePairs.forEach(pair => {
      if (pair.en) {
        totalPages++;
        enPages++;
      }
      if (pair.es) {
        totalPages++;
        esPages++;
      }
    });
    
    console.log(`Total pages: ${totalPages} (EN: ${enPages}, ES: ${esPages})`);
    
    // Generate different sitemaps
    const sitemaps = [
      {
        name: 'sitemap-main.xml',
        filter: (path: string) => !path.includes('/blog') && !path.includes('/locations') && !path.includes('/near-me'),
      },
      {
        name: 'sitemap-blog.xml',
        filter: (path: string) => path.includes('/blog'),
      },
      {
        name: 'sitemap-locations.xml',
        filter: (path: string) => path.includes('/locations') || path.includes('/ubicaciones'),
      },
      {
        name: 'sitemap-near-me.xml',
        filter: (path: string) => path.includes('/near-me') || path.includes('/cerca-de-mi'),
      },
    ];
    
    // Generate sitemap index
    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    for (const sitemap of sitemaps) {
      const filteredPairs = new Map();
      
      pagePairs.forEach((pair, normalizedPath) => {
        if (pair.en && sitemap.filter(pair.en.path)) {
          if (!filteredPairs.has(normalizedPath)) {
            filteredPairs.set(normalizedPath, {});
          }
          filteredPairs.get(normalizedPath).en = pair.en;
        }
        if (pair.es && sitemap.filter(pair.es.path)) {
          if (!filteredPairs.has(normalizedPath)) {
            filteredPairs.set(normalizedPath, {});
          }
          filteredPairs.get(normalizedPath).es = pair.es;
        }
      });
      
      if (filteredPairs.size > 0) {
        const xml = await discovery.generateSitemapWithAlternates(filteredPairs, baseUrl);
        const outputPath = path.join(process.cwd(), 'public', sitemap.name);
        await fs.writeFile(outputPath, xml, 'utf-8');
        console.log(`Generated ${sitemap.name} with ${filteredPairs.size} page pairs`);
        
        sitemapIndex += `
  <sitemap>
    <loc>${baseUrl}/${sitemap.name}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
      }
    }
    
    sitemapIndex += `
</sitemapindex>`;
    
    // Write sitemap index
    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapIndex, 'utf-8');
    console.log('Generated sitemap index');
    
    // Generate complete sitemap with all pages
    const allPagesXml = await discovery.generateSitemapWithAlternates(pagePairs, baseUrl);
    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap-complete.xml'), allPagesXml, 'utf-8');
    console.log('Generated complete sitemap with all pages');
    
    // Generate language-specific sitemaps
    const enOnlyPairs = new Map();
    const esOnlyPairs = new Map();
    
    pagePairs.forEach((pair, normalizedPath) => {
      if (pair.en) {
        enOnlyPairs.set(normalizedPath, { en: pair.en });
      }
      if (pair.es) {
        esOnlyPairs.set(normalizedPath, { es: pair.es });
      }
    });
    
    const enXml = await discovery.generateSitemapWithAlternates(enOnlyPairs, baseUrl);
    const esXml = await discovery.generateSitemapWithAlternates(esOnlyPairs, baseUrl);
    
    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap-en.xml'), enXml, 'utf-8');
    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap-es.xml'), esXml, 'utf-8');
    
    console.log('Generated language-specific sitemaps');
    
    // Log statistics
    console.log('\n=== Sitemap Generation Complete ===');
    console.log(`Total unique paths: ${pagePairs.size}`);
    console.log(`Total pages (EN + ES): ${totalPages}`);
    console.log(`English pages: ${enPages}`);
    console.log(`Spanish pages: ${esPages}`);
    console.log(`Pages with both languages: ${Array.from(pagePairs.values()).filter(p => p.en && p.es).length}`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }

// Run the script
generateCompleteSitemap();
}
