import * as fs from 'fs';
import * as path from 'path';
import { getPrismaClient } from '@/lib/prisma';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: { lang: string; href: string }[];
}

class ComprehensiveSitemapGenerator {
  private baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vasquezlawnc.com';
  private entries = new Map<string, SitemapEntry>();
  private appDir = path.join(process.cwd(), 'src/app');

  // Directories to skip
  private skipDirs = new Set([
    'api',
    '_components',
    '_lib',
    '_utils',
    'components',
    'socket',
    'webhook',
    'webhooks',
    '.well-known',
    'node_modules',
    '.next',
    'coverage',
    'test',
    'tests',
    '__tests__',
    'spec',
  ]);

  async generateCompleteSitemap() {
    console.log('Starting comprehensive sitemap generation...\n');

    // 1. Discover all file-based routes
    console.log('1. Discovering file-based routes...');
    await this.discoverFileBasedRoutes();

    // 2. Add blog posts from file system
    console.log('\n2. Discovering blog posts...');
    await this.discoverBlogPosts();

    // 3. Add attorney pages
    console.log('\n3. Adding attorney pages...');
    await this.addAttorneyPages();

    // 4. Add location pages
    console.log('\n4. Discovering location pages...');
    await this.discoverLocationPages();

    // 5. Add practice area pages
    console.log('\n5. Adding practice area pages...');
    await this.addPracticeAreaPages();

    // 6. Add near-me pages
    console.log('\n6. Adding near-me pages...');
    await this.addNearMePages();

    // 7. Add blog posts from database
    console.log('\n7. Adding database blog posts...');
    await this.addDatabaseBlogPosts();

    // 8. Generate sitemap files
    console.log('\n8. Generating sitemap files...');
    await this.generateSitemapFiles();

    console.log('\n✅ Sitemap generation complete!');
    console.log(`Total unique URLs: ${this.entries.size}`);
  }

  private async discoverFileBasedRoutes(dir: string = this.appDir, basePath: string = '') {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
          // Skip certain directories
          if (
            this.skipDirs.has(item.name) ||
            item.name.startsWith('_') ||
            item.name.startsWith('.')
          ) {
            continue;
          }

          // Check if this directory has a page.tsx
          const pagePath = path.join(fullPath, 'page.tsx');
          if (fs.existsSync(pagePath)) {
            let urlPath = basePath + '/' + item.name;

            // Handle route groups (parentheses)
            urlPath = urlPath.replace(/\/\([^)]+\)/g, '');

            // Handle dynamic routes
            if (!urlPath.includes('[') && !urlPath.includes(']')) {
              this.addEntry(urlPath);
            }
          }

          // Recurse into subdirectories
          await this.discoverFileBasedRoutes(fullPath, basePath + '/' + item.name);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }

  private async discoverBlogPosts() {
    const blogDir = path.join(this.appDir, 'blog');
    const esBlogDir = path.join(this.appDir, 'es/blog');

    // English blog posts
    await this.scanBlogDirectory(blogDir, 'en');

    // Spanish blog posts
    await this.scanBlogDirectory(esBlogDir, 'es');
  }

  private async scanBlogDirectory(dir: string, lang: 'en' | 'es') {
    if (!fs.existsSync(dir)) return;

    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      let count = 0;

      for (const item of items) {
        if (
          item.isDirectory() &&
          !item.name.includes('category') &&
          !item.name.includes('categoria') &&
          !item.name.includes('[') &&
          item.name !== 'rss.xml'
        ) {
          // Check if it has a page.tsx OR if it's a blog post directory
          const pagePath = path.join(dir, item.name, 'page.tsx');
          const mdPath = path.join(dir, item.name, 'content.md');
          const jsonPath = path.join(dir, item.name, 'metadata.json');

          // If any of these files exist, it's likely a valid page/post
          if (
            fs.existsSync(pagePath) ||
            fs.existsSync(mdPath) ||
            fs.existsSync(jsonPath) ||
            // Also include directories that look like blog posts (e.g., legal-update-*, etc.)
            item.name.includes('legal-update') ||
            item.name.includes('immigration-update') ||
            item.name.includes('north-carolina') ||
            item.name.includes('actualizacion-legal') ||
            item.name.includes('guia-') ||
            item.name.includes('entendiendo-')
          ) {
            const urlPath = lang === 'es' ? `/es/blog/${item.name}` : `/blog/${item.name}`;

            this.addEntry(urlPath, {
              changefreq: 'weekly',
              priority: 0.7,
            });
            count++;
          }
        }
      }

      console.log(`  Found ${count} ${lang === 'es' ? 'Spanish' : 'English'} blog posts`);
    } catch (error) {
      console.error(`Error scanning blog directory ${dir}:`, error);
    }
  }

  private async addAttorneyPages() {
    const attorneys = [
      'william-vasquez',
      'adrianna-ingram',
      'christopher-afanador',
      'jillian-baucom',
      'mark-kelsey',
      'roselyn-v-torrellas',
      'judith-parkes',
    ];

    attorneys.forEach(attorney => {
      this.addEntry(`/attorneys/${attorney}`, {
        changefreq: 'monthly',
        priority: 0.7,
      });

      this.addEntry(`/es/abogados/${attorney}`, {
        changefreq: 'monthly',
        priority: 0.7,
      });
    });

    console.log(`  Added ${attorneys.length * 2} attorney pages (EN + ES)`);
  }

  private async discoverLocationPages() {
    const locationsDir = path.join(this.appDir, 'locations');
    const esLocationsDir = path.join(this.appDir, 'es/ubicaciones');

    let count = 0;

    // English locations
    if (fs.existsSync(locationsDir)) {
      count += await this.scanLocationDirectory(locationsDir, '/locations');
    }

    // Spanish locations
    if (fs.existsSync(esLocationsDir)) {
      count += await this.scanLocationDirectory(esLocationsDir, '/es/ubicaciones');
    }

    // Add Florida locations (often missing from file system)
    const flCities = [
      'orlando',
      'miami',
      'tampa',
      'jacksonville',
      'fort-lauderdale',
      'west-palm-beach',
      'hialeah',
      'tallahassee',
      'port-st-lucie',
      'cape-coral',
      'pembroke-pines',
      'hollywood',
      'gainesville',
      'coral-springs',
      'clearwater',
      'palm-bay',
      'lakeland',
      'pompano-beach',
      'boca-raton',
      'deltona',
      'plantation',
      'sunrise',
      'palm-coast',
      'deerfield-beach',
      'largo',
    ];

    // FL state pages
    this.addEntry('/locations/fl', { priority: 0.9, changefreq: 'weekly' });
    this.addEntry('/es/ubicaciones/fl', { priority: 0.9, changefreq: 'weekly' });

    // FL city pages
    flCities.forEach(city => {
      this.addEntry(`/locations/fl/${city}`, { priority: 0.85, changefreq: 'weekly' });
      this.addEntry(`/es/ubicaciones/fl/${city}`, { priority: 0.85, changefreq: 'weekly' });

      // Add practice area combinations for major FL cities
      if (['orlando', 'miami', 'tampa', 'jacksonville', 'fort-lauderdale'].includes(city)) {
        const practices = [
          'immigration-lawyer',
          'personal-injury-attorney',
          'criminal-defense-lawyer',
          'workers-compensation-lawyer',
          'family-law-attorney',
        ];

        practices.forEach(practice => {
          this.addEntry(`/locations/fl/${city}/${practice}`, {
            priority: 0.8,
            changefreq: 'weekly',
          });
          this.addEntry(`/es/ubicaciones/fl/${city}/${practice}`, {
            priority: 0.8,
            changefreq: 'weekly',
          });
        });
      }
    });

    console.log(`  Found ${count} location pages + added ${flCities.length * 2} FL city pages`);
  }

  private async scanLocationDirectory(dir: string, basePath: string): Promise<number> {
    let count = 0;

    const scanDir = (currentDir: string, currentPath: string) => {
      try {
        const items = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const item of items) {
          if (item.isDirectory() && !this.skipDirs.has(item.name)) {
            const fullPath = path.join(currentDir, item.name);
            const urlPath = currentPath + '/' + item.name;

            // Check if it has a page.tsx
            if (fs.existsSync(path.join(fullPath, 'page.tsx'))) {
              this.addEntry(urlPath, {
                changefreq: 'weekly',
                priority: 0.85,
              });
              count++;
            }

            // Recurse
            scanDir(fullPath, urlPath);
          }
        }
      } catch (error) {
        console.error(`Error scanning location directory ${currentDir}:`, error);
        }
};

    scanDir(dir, basePath);
    return count;
  }

  private async addPracticeAreaPages() {
    const practiceAreas = {
      immigration: {
        es: 'inmigracion',
        subs: [
          'green-cards',
          'citizenship-naturalization',
          'deportation-removal-defense',
          'asylum-refugee-legal-help',
          'family-based-relative',
          'employment-based-immigration',
          'adjustment-of-status',
          'daca-deferred-action-childhood-arrivals',
          'vawa-u-visa-crime-victims',
          't-visa',
          'detention-bond-hearings',
          'inadmissibility-waivers',
          'fiance-k-visas',
          'immediate-relative-visas',
          'family-preference-visas',
          'affirmative',
          'business',
          'removal-defense',
          'visa-process',
        ],
      },
      'personal-injury': {
        es: 'lesiones-personales',
        subs: [
          'car-auto-accidents',
          'truck-accidents',
          'motorcycle-accidents',
          'pedestrian-accidents',
          'bicycle-accidents',
          'drunk-driver-accidents',
          'wrongful-death',
          'medical-malpractice',
          'premises-liability',
          'nursing-home-abuse',
          'uninsured-motorist',
          'boating-accidents',
          'emergency-vehicle-accidents',
          'slip-and-fall',
          'pedestrian-hit-by-car',
          'drunk-driver-liability',
          'car-accidents',
        ],
      },
      'criminal-defense': {
        es: 'defensa-criminal',
        subs: [
          'dui-dwi',
          'drug-crimes',
          'assault-battery',
          'theft-property-crimes',
          'domestic-violence',
          'traffic-offenses',
          'expungement',
          'assault',
          'drug-charges',
          'dui',
          'federal-crimes',
          'theft',
          'probation-violation',
          'dwi-drunk-driving',
          'domestic-violence-abuse',
          'drug-crime-cases',
          'theft-larceny-shoplifting',
          'traffic-offenses-tickets',
          'expungement-expunction',
        ],
      },
      'workers-compensation': {
        es: 'compensacion-laboral',
        subs: [
          'construction-site-injuries',
          'equipment-accidents',
          'repetitive-stress-carpal-tunnel',
          'lifting-injuries',
          'mental-health-claims',
          'third-party-injury-claims',
        ],
      },
      'family-law': {
        es: 'derecho-familiar',
        subs: [
          'divorce',
          'child-custody',
          'alimony-spousal-support',
          'property-division',
          'child-support',
        ],
      },
      'traffic-violations': {
        es: 'violaciones-trafico',
        subs: [],
      },
    };

    let count = 0;

    Object.entries(practiceAreas).forEach(([area, config]) => {
      // Main practice area pages
      this.addEntry(`/practice-areas/${area}`, {
        changefreq: 'weekly',
        priority: 0.9,
      });

      this.addEntry(`/es/areas-de-practica/${config.es}`, {
        changefreq: 'weekly',
        priority: 0.9,
      });

      count += 2;

      // Sub-practice area pages
      config.subs.forEach(sub => {
        this.addEntry(`/practice-areas/${area}/${sub}`, {
          changefreq: 'weekly',
          priority: 0.85,
        });

        this.addEntry(`/es/areas-de-practica/${config.es}/${sub}`, {
          changefreq: 'weekly',
          priority: 0.85,
        });

        count += 2;
      });
    });

    console.log(`  Added ${count} practice area pages`);
  }

  private async addNearMePages() {
    const nearMePatterns = [
      'immigration-lawyer-near-me',
      'personal-injury-attorney-near-me',
      'criminal-defense-lawyer-near-me',
      'workers-compensation-lawyer-near-me',
      'car-accident-lawyer-near-me',
      'dui-lawyer-near-me',
      'divorce-lawyer-near-me',
      'spanish-speaking-lawyer-near-me',
    ];

    const majorCities = [
      // NC
      'charlotte',
      'raleigh',
      'durham',
      'greensboro',
      'winston-salem',
      'fayetteville',
      'cary',
      'wilmington',
      'high-point',
      'asheville',
      // FL
      'orlando',
      'miami',
      'tampa',
      'jacksonville',
      'fort-lauderdale',
    ];

    let count = 0;

    majorCities.forEach(city => {
      nearMePatterns.forEach(pattern => {
        this.addEntry(`/near-me/${city}-${pattern}`, {
          changefreq: 'weekly',
          priority: 0.75,
        });

        this.addEntry(`/es/cerca-de-mi/${city}-${pattern}`, {
          changefreq: 'weekly',
          priority: 0.75,
        });

        count += 2;
      });
    });

    console.log(`  Added ${count} near-me pages`);
  }

  private async addDatabaseBlogPosts() {
    try {
      const prisma = getPrismaClient();
      const posts = await prisma.blogPost.findMany({
        where: { status: 'published' },
        select: { slug: true, updatedAt: true, language: true },
      });

      posts.forEach(post => {
        const urlPath = post.language === 'es' ? `/es/blog/${post.slug}` : `/blog/${post.slug}`;

        this.addEntry(urlPath, {
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: post.updatedAt.toISOString(),
        });
      });

      console.log(`  Added ${posts.length} blog posts from database`);
    } catch (error) {
      console.error('  Error fetching database blog posts:', error);
    }
  }

  private addEntry(path: string, options: Partial<SitemapEntry> = {}) {
    // Normalize path
    if (!path.startsWith('/')) path = '/' + path;

    // Skip certain paths
    if (
      path.includes('test') ||
      path.includes('debug') ||
      path.includes('demo') ||
      path.includes('error') ||
      path.includes('not-found') ||
      path.includes('loading') ||
      path.includes('layout')
    ) {
      return;
    }

    const url = `${this.baseUrl}${path}`;

    // Determine defaults based on path
    const defaults = this.getDefaultsForPath(path);

    this.entries.set(url, {
      loc: url,
      changefreq: options.changefreq || defaults.changefreq,
      priority: options.priority || defaults.priority,
      lastmod: options.lastmod || new Date().toISOString(),
      alternates: this.getAlternates(path),
    });
  }

  private getDefaultsForPath(path: string): {
    changefreq: SitemapEntry['changefreq'];
    priority: number;
  } {
    if (path === '/' || path === '/es') {
      return { changefreq: 'daily', priority: 1.0 };
    }
    if (path.includes('/blog')) {
      return { changefreq: 'weekly', priority: 0.7 };
    }
    if (path.includes('/practice-areas') || path.includes('/areas-de-practica')) {
      return { changefreq: 'weekly', priority: 0.9 };
    }
    if (path.includes('/locations') || path.includes('/ubicaciones')) {
      return { changefreq: 'weekly', priority: 0.85 };
    }
    if (path.includes('/attorneys') || path.includes('/abogados')) {
      return { changefreq: 'monthly', priority: 0.7 };
    }
    if (path.includes('/contact') || path.includes('/contacto')) {
      return { changefreq: 'monthly', priority: 0.8 };
    }
    if (path.includes('/near-me') || path.includes('/cerca-de-mi')) {
      return { changefreq: 'weekly', priority: 0.75 };
    }

    return { changefreq: 'monthly', priority: 0.6 };
  }

  private getAlternates(path: string): SitemapEntry['alternates'] {
    const alternates: SitemapEntry['alternates'] = [];

    // Check if this is a Spanish page
    if (path.startsWith('/es/')) {
      const enPath = path.substring(3); // Remove /es prefix
      alternates.push(
        { lang: 'es', href: `${this.baseUrl}${path}` },
        { lang: 'en', href: `${this.baseUrl}${enPath}` }
      );
    }
    // Check if this page likely has a Spanish equivalent
    else if (!path.includes('/blog/') && !path.includes('[')) {
      const esPath = `/es${path}`;
      // Only add alternate if we think the Spanish version exists
      if (this.likelyHasSpanishVersion(path)) {
        alternates.push(
          { lang: 'en', href: `${this.baseUrl}${path}` },
          { lang: 'es', href: `${this.baseUrl}${esPath}` }
        );
      }
    }

    return alternates.length > 0 ? alternates : undefined;
  }

  private likelyHasSpanishVersion(path: string): boolean {
    // Pages that typically have Spanish versions
    const hasSpanish = [
      '/',
      '/practice-areas',
      '/attorneys',
      '/contact',
      '/about',
      '/blog',
      '/resources',
      '/faq',
      '/appointment',
      '/free-consultation',
      '/calculators',
      '/testimonials',
      '/case-results',
    ];

    // Check exact matches
    if (hasSpanish.includes(path)) return true;

    // Check patterns
    if (
      path.includes('/practice-areas/') ||
      path.includes('/locations/') ||
      path.includes('/attorneys/') ||
      path.includes('/near-me/')
    ) {
      return true;
    }

    return false;
  }

  private async generateSitemapFiles() {
    const publicDir = path.join(process.cwd(), 'public');

    // Group entries by type
    const allEntries = Array.from(this.entries.values());
    const blogEntries = allEntries.filter(e => e.loc.includes('/blog'));
    const locationEntries = allEntries.filter(
      e => e.loc.includes('/locations') || e.loc.includes('/ubicaciones')
    );
    const practiceAreaEntries = allEntries.filter(
      e => e.loc.includes('/practice-areas') || e.loc.includes('/areas-de-practica')
    );
    const attorneyEntries = allEntries.filter(
      e => e.loc.includes('/attorneys') || e.loc.includes('/abogados')
    );
    const nearMeEntries = allEntries.filter(
      e => e.loc.includes('/near-me') || e.loc.includes('/cerca-de-mi')
    );
    const enEntries = allEntries.filter(e => !e.loc.includes('/es/') && !e.loc.includes('/es'));
    const esEntries = allEntries.filter(e => e.loc.includes('/es/') || e.loc.endsWith('/es'));

    // Generate individual sitemaps
    await this.writeSitemap(path.join(publicDir, 'sitemap-complete.xml'), allEntries);
    await this.writeSitemap(path.join(publicDir, 'sitemap-blog.xml'), blogEntries);
    await this.writeSitemap(path.join(publicDir, 'sitemap-locations.xml'), locationEntries);
    await this.writeSitemap(
      path.join(publicDir, 'sitemap-practice-areas.xml'),
      practiceAreaEntries
    );
    await this.writeSitemap(path.join(publicDir, 'sitemap-attorneys.xml'), attorneyEntries);
    await this.writeSitemap(path.join(publicDir, 'sitemap-near-me.xml'), nearMeEntries);
    await this.writeSitemap(path.join(publicDir, 'sitemap-en.xml'), enEntries);
    await this.writeSitemap(path.join(publicDir, 'sitemap-es.xml'), esEntries);

    // Generate sitemap index
    await this.writeSitemapIndex(publicDir);

    console.log('\nGenerated sitemap files:');
    console.log(`  - sitemap.xml (index)`);
    console.log(`  - sitemap-complete.xml (${allEntries.length} URLs)`);
    console.log(`  - sitemap-blog.xml (${blogEntries.length} URLs)`);
    console.log(`  - sitemap-locations.xml (${locationEntries.length} URLs)`);
    console.log(`  - sitemap-practice-areas.xml (${practiceAreaEntries.length} URLs)`);
    console.log(`  - sitemap-attorneys.xml (${attorneyEntries.length} URLs)`);
    console.log(`  - sitemap-near-me.xml (${nearMeEntries.length} URLs)`);
    console.log(`  - sitemap-en.xml (${enEntries.length} URLs)`);
    console.log(`  - sitemap-es.xml (${esEntries.length} URLs)`);
  }

  private async writeSitemap(filePath: string, entries: SitemapEntry[]) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    for (const entry of entries) {
      xml += '  <url>\n';
      xml += `    <loc>${entry.loc}</loc>\n`;

      if (entry.lastmod) {
        xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      }

      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      xml += `    <priority>${entry.priority}</priority>\n`;

      // Add hreflang alternates
      if (entry.alternates) {
        entry.alternates.forEach(alt => {
          xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}"/>\n`;
        });
      }

      xml += '  </url>\n';
    }

    xml += '</urlset>';

    fs.writeFileSync(filePath, xml, 'utf-8');
  }

  private async writeSitemapIndex(publicDir: string) {
    const sitemaps = [
      'sitemap-complete.xml',
      'sitemap-locations.xml',
      'sitemap-practice-areas.xml',
      'sitemap-blog.xml',
      'sitemap-near-me.xml',
      'sitemap-attorneys.xml',
      'sitemap-en.xml',
      'sitemap-es.xml',
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const sitemap of sitemaps) {
      xml += '  <sitemap>\n';
      xml += `    <loc>${this.baseUrl}/${sitemap}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += '  </sitemap>\n';
    }

    xml += '</sitemapindex>';

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf-8');
  }
}

// Run the generator
async function main() {
  const generator = new ComprehensiveSitemapGenerator();
  await generator.generateCompleteSitemap();
}

main().catch(console.error);
