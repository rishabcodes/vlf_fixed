import * as fs from 'fs';
import * as path from 'path';
import { XMLParser } from 'fast-xml-parser';

class SitemapValidator {
  private publicDir = path.join(process.cwd(), 'public');
  private baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vasquezlawnc.com';

  async validateAllSitemaps() {
    console.log('Starting sitemap validation...\n');

    const sitemapFiles = [
      'sitemap.xml',
      'sitemap-complete.xml',
      'sitemap-blog.xml',
      'sitemap-locations.xml',
      'sitemap-practice-areas.xml',
      'sitemap-attorneys.xml',
      'sitemap-near-me.xml',
      'sitemap-en.xml',
      'sitemap-es.xml',
    ];

    const results: any = {};
    let totalUrls = 0;

    for (const filename of sitemapFiles) {
      const filePath = path.join(this.publicDir, filename);

      if (!fs.existsSync(filePath)) {
        console.log(`❌ ${filename}: FILE NOT FOUND`);
        continue;
      }

      const result = await this.validateSitemap(filePath, filename);
      results[filename] = result;

      if (result.urls) {
        totalUrls += result.urls.length;
      }
    }

    // Print summary
    console.log('\n=== SITEMAP VALIDATION SUMMARY ===\n');
    console.log(`Total unique URLs across all sitemaps: ${totalUrls}`);

    // Check for duplicates across sitemaps
    const allUrls = new Set<string>();
    const duplicates = new Set<string>();

    for (const [filename, result] of Object.entries(results)) {
      if ((result as any).urls) {
        for (const url of (result as any).urls) {
          if (allUrls.has(url)) {
            duplicates.add(url);
          }
          allUrls.add(url);
        }
      }
    }

    console.log(`\nUnique URLs (after deduplication): ${allUrls.size}`);

    if (duplicates.size > 0) {
      console.log(`\n⚠️  Found ${duplicates.size} duplicate URLs across sitemaps`);
      if (duplicates.size <= 10) {
        duplicates.forEach(url => console.log(`  - ${url}`));
      }
    }

    // Check URL patterns
    console.log('\n=== URL PATTERN ANALYSIS ===\n');
    const patterns = this.analyzeUrlPatterns(allUrls);

    for (const [pattern, count] of patterns) {
      console.log(`${pattern}: ${count} URLs`);
    }

    // Check for missing pages
    console.log('\n=== POTENTIAL MISSING PAGES ===\n');
    this.checkForMissingPages(allUrls);
  }

  private async validateSitemap(filePath: string, filename: string): Promise<any> {
    console.log(`\nValidating ${filename}...`);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
      });

      const result = parser.parse(content);

      // Check if it's a sitemap index or URL set
      if (result.sitemapindex) {
        const sitemaps = Array.isArray(result.sitemapindex.sitemap)
          ? result.sitemapindex.sitemap
          : [result.sitemapindex.sitemap];

        console.log(`✅ Valid sitemap index with ${sitemaps.length} sitemaps`);

        for (const sitemap of sitemaps) {
          console.log(`  - ${sitemap.loc}`);
        }

        return { type: 'index', sitemaps: sitemaps.length };
      } else if (result.urlset) {
        const urls = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url];

        console.log(`✅ Valid URL set with ${urls.length} URLs`);

        // Analyze URL distribution
        const stats = {
          total: urls.length,
          withHreflang: 0,
          withLastmod: 0,
          priorities: new Map<number, number>(),
        };

        const urlList: string[] = [];

        for (const url of urls) {
          urlList.push(url.loc);

          if (url.lastmod) stats.withLastmod++;
          if (url['xhtml:link']) stats.withHreflang++;

          const priority = parseFloat(url.priority || '0.5');
          stats.priorities.set(priority, (stats.priorities.get(priority) || 0) + 1);
        }

        console.log(`  - URLs with lastmod: ${stats.withLastmod}/${stats.total}`);
        console.log(`  - URLs with hreflang: ${stats.withHreflang}/${stats.total}`);
        console.log(`  - Priority distribution:`);

        const sortedPriorities = Array.from(stats.priorities.entries()).sort((a, b) => b[0] - a[0]);
        sortedPriorities.forEach(([priority, count]) => {
          console.log(`    ${priority}: ${count} URLs`);
        });

        return { type: 'urlset', urls: urlList, stats };
      } else {
        console.log(`❌ Invalid XML structure`);
        return { type: 'error', message: 'Invalid XML structure' };
      }
    } catch (error) {
      console.log(`❌ Error parsing ${filename}: ${error}`);
      return { type: 'error', message: String(error) };
    }
  }

  private analyzeUrlPatterns(urls: Set<string>): Map<string, number> {
    const patterns = new Map<string, number>();

    urls.forEach(url => {
      const urlPath = url.replace(this.baseUrl, '');

      // Categorize URLs
      let category = 'Other';

      if (urlPath === '/' || urlPath === '/es') {
        category = 'Homepage';
      } else if (urlPath.includes('/blog/')) {
        category = 'Blog posts';
      } else if (urlPath.includes('/locations/') || urlPath.includes('/ubicaciones/')) {
        category = 'Location pages';
      } else if (urlPath.includes('/practice-areas/') || urlPath.includes('/areas-de-practica/')) {
        category = 'Practice area pages';
      } else if (urlPath.includes('/attorneys/') || urlPath.includes('/abogados/')) {
        category = 'Attorney pages';
      } else if (urlPath.includes('/near-me/') || urlPath.includes('/cerca-de-mi/')) {
        category = 'Near-me pages';
      } else if (urlPath.startsWith('/es/')) {
        category = 'Spanish pages (other)';
      } else {
        category = 'Static pages';
      }

      patterns.set(category, (patterns.get(category) || 0) + 1);
    });

    return new Map([...patterns.entries()].sort((a, b) => b[1] - a[1]));
  }

  private checkForMissingPages(urls: Set<string>) {
    const expectedPages = [
      '/',
      '/es',
      '/practice-areas',
      '/es/areas-de-practica',
      '/attorneys',
      '/es/abogados',
      '/contact',
      '/es/contacto',
      '/blog',
      '/es/blog',
      '/about',
      '/es/acerca-de',
      '/faq',
      '/es/preguntas-frecuentes',
      '/case-results',
      '/es/resultados-de-casos',
      '/testimonials',
      '/es/testimonios',
    ];

    const missing: string[] = [];

    for (const page of expectedPages) {
      const fullUrl = `${this.baseUrl}${page}`;
      if (!urls.has(fullUrl)) {
        missing.push(page);
      }
    }

    if (missing.length > 0) {
      console.log(`Found ${missing.length} potentially missing pages:`);
      missing.forEach(page => console.log(`  - ${page}`));
    } else {
      console.log('✅ All expected pages are present in sitemaps');
    }

    // Check for expected blog posts
    const blogUrls = Array.from(urls).filter(u => u.includes('/blog/'));
    const spanishBlogUrls = blogUrls.filter(u => u.includes('/es/blog/'));
    const englishBlogUrls = blogUrls.filter(u => !u.includes('/es/blog/'));

    console.log(`\nBlog post coverage:`);
    console.log(`  - English blog posts: ${englishBlogUrls.length}`);
    console.log(`  - Spanish blog posts: ${spanishBlogUrls.length}`);

    // Check location coverage
    const locationUrls = Array.from(urls).filter(
      u => u.includes('/locations/') || u.includes('/ubicaciones/')
    );
    const ncLocations = locationUrls.filter(u => u.includes('/nc/'));
    const flLocations = locationUrls.filter(u => u.includes('/fl/'));

    console.log(`\nLocation coverage:`);
    console.log(`  - NC locations: ${ncLocations.length}`);
    console.log(`  - FL locations: ${flLocations.length}`);
    console.log(`  - Total locations: ${locationUrls.length}`);
  }
}

// Run the validator
async function main() {
  const validator = new SitemapValidator();
  await validator.validateAllSitemaps();
}

main().catch(console.error);
