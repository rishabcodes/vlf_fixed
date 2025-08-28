import { getPrismaClient } from '@/lib/prisma';
import { componentLogger } from '@/lib/safe-logger';
import * as fs from 'fs';
import * as path from 'path';

export class EnhancedSitemapGenerator {
  private static baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

  // Generate comprehensive XML sitemap with ALL pages
  static async generateCompleteSitemap(): Promise<string> {
    componentLogger.info('EnhancedSitemapGenerator.generateCompleteSitemap starting');

    const urlSet = new Set<{ loc: string; priority: number; changefreq: string; lastmod?: string }>();

    // 1. Add static pages with language pairs
    await this.addStaticPages(urlSet);

    // 2. Add attorney pages
    await this.addAttorneyPages(urlSet);

    // 3. Add practice area pages (all levels)
    await this.addPracticeAreaPages(urlSet);

    // 4. Add location pages (dynamically discovered)
    await this.addLocationPages(urlSet);

    // 5. Add blog posts from database
    await this.addBlogPosts(urlSet);

    // 6. Add resource pages
    await this.addResourcePages(urlSet);

    // 7. Add special/landing pages
    await this.addSpecialPages(urlSet);

    // Convert to XML
    const xml = this.generateXML(Array.from(urlSet));

    componentLogger.info('EnhancedSitemapGenerator.generateCompleteSitemap completed', {
      totalUrls: urlSet.size,
    });

    return xml;
  }

  private static async addStaticPages(urlSet: Set<any>) {
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/practice-areas', priority: 0.9, changefreq: 'weekly' },
      { url: '/attorneys', priority: 0.8, changefreq: 'monthly' },
      { url: '/about', priority: 0.7, changefreq: 'monthly' },
      { url: '/contact', priority: 0.8, changefreq: 'monthly' },
      { url: '/blog', priority: 0.9, changefreq: 'daily' },
      { url: '/testimonials', priority: 0.7, changefreq: 'weekly' },
      { url: '/case-results', priority: 0.8, changefreq: 'weekly' },
      { url: '/resources', priority: 0.7, changefreq: 'weekly' },
      { url: '/faq', priority: 0.8, changefreq: 'monthly' },
      { url: '/appointment', priority: 0.9, changefreq: 'daily' },
      { url: '/media', priority: 0.6, changefreq: 'monthly' },
      { url: '/accessibility', priority: 0.5, changefreq: 'yearly' },
      { url: '/cookie-policy', priority: 0.5, changefreq: 'yearly' },
      { url: '/legal-disclaimer', priority: 0.5, changefreq: 'yearly' },
      { url: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
      { url: '/terms', priority: 0.5, changefreq: 'yearly' },
      { url: '/secure-payment', priority: 0.7, changefreq: 'monthly' },
      { url: '/quick-contact', priority: 0.8, changefreq: 'daily' },
      { url: '/free-consultation', priority: 0.9, changefreq: 'daily' },
      { url: '/calculators', priority: 0.7, changefreq: 'monthly' },
      { url: '/ai-evaluation', priority: 0.8, changefreq: 'weekly' },
    ];

    // Add both EN and ES versions
    for (const page of staticPages) {
      // English
      urlSet.add({
        loc: `${this.baseUrl}${page.url}`,
        priority: page.priority,
        changefreq: page.changefreq,
      });

      // Spanish
      urlSet.add({
        loc: `${this.baseUrl}/es${page.url}`,
        priority: page.priority * 0.95,
        changefreq: page.changefreq,
      });
    }
  }

  private static async addAttorneyPages(urlSet: Set<any>) {
    const attorneyPages = [
      'william-vasquez',
      'adrianna-ingram',
      'christopher-afanador',
      'jillian-baucom',
      'mark-kelsey',
      'roselyn-v-torrellas',
      'judith-parkes',
    ];

    for (const attorney of attorneyPages) {
      // English
      urlSet.add({
        loc: `${this.baseUrl}/attorneys/${attorney}`,
        priority: 0.7,
        changefreq: 'monthly',
      });

      // Spanish
      urlSet.add({
        loc: `${this.baseUrl}/es/abogados/${attorney}`,
        priority: 0.65,
        changefreq: 'monthly',
      });
    }
  }

  private static async addPracticeAreaPages(urlSet: Set<any>) {
    const practiceAreas = {
      immigration: {
        es: 'inmigracion',
        subs: [
          'green-cards', 'citizenship-naturalization', 'deportation-removal-defense',
          'asylum-refugee-legal-help', 'family-based-relative', 'employment-based-immigration',
          'adjustment-of-status', 'daca-deferred-action-childhood-arrivals',
          'vawa-u-visa-crime-victims', 't-visa', 'detention-bond-hearings',
          'inadmissibility-waivers', 'fiance-k-visas', 'immediate-relative-visas',
          'family-preference-visas', 'affirmative', 'business', 'removal-defense',
        ],
      },
      'personal-injury': {
        es: 'lesiones-personales',
        subs: [
          'car-auto-accidents', 'truck-accidents', 'motorcycle-accidents',
          'pedestrian-accidents', 'bicycle-accidents', 'drunk-driver-accidents',
          'wrongful-death', 'medical-malpractice', 'premises-liability',
          'nursing-home-abuse', 'uninsured-motorist', 'boating-accidents',
          'emergency-vehicle-accidents', 'slip-and-fall',
        ],
      },
      'criminal-defense': {
        es: 'defensa-criminal',
        subs: [
          'dui-dwi', 'drug-crimes', 'assault-battery', 'theft-property-crimes',
          'domestic-violence', 'traffic-offenses', 'expungement', 'assault',
          'drug-charges', 'dui', 'federal-crimes', 'theft',
        ],
      },
      'workers-compensation': {
        es: 'compensacion-laboral',
        subs: [
          'construction-site-injuries', 'equipment-accidents',
          'repetitive-stress-carpal-tunnel', 'lifting-injuries',
          'mental-health-claims', 'third-party-injury-claims',
        ],
      },
      'family-law': {
        es: 'derecho-familiar',
        subs: [
          'divorce', 'child-custody', 'alimony-spousal-support',
          'property-division', 'child-support',
        ],
      },
      'traffic-violations': {
        es: 'violaciones-trafico',
        subs: [],
      },
    };

    for (const [area, config] of Object.entries(practiceAreas)) {
      // Main practice area - English
      urlSet.add({
        loc: `${this.baseUrl}/practice-areas/${area}`,
        priority: 0.9,
        changefreq: 'weekly',
      });

      // Main practice area - Spanish
      urlSet.add({
        loc: `${this.baseUrl}/es/areas-de-practica/${config.es}`,
        priority: 0.85,
        changefreq: 'weekly',
      });

      // Sub-practice areas - English
      for (const sub of config.subs) {
        urlSet.add({
          loc: `${this.baseUrl}/practice-areas/${area}/${sub}`,
          priority: 0.85,
          changefreq: 'weekly',
        });

        // Sub-practice areas - Spanish (was missing!)
        urlSet.add({
          loc: `${this.baseUrl}/es/areas-de-practica/${config.es}/${sub}`,
          priority: 0.8,
          changefreq: 'weekly',
        });
      }
    }
  }

  private static findFilesRecursive(dir: string, pattern: RegExp, files: string[] = []): string[] {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          this.findFilesRecursive(fullPath, pattern, files);
        } else if (entry.isFile() && pattern.test(entry.name)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory might not exist
    }
    
    return files;
  }

  private static async addLocationPages(urlSet: Set<any>) {
    // Dynamically discover all location pages
    const locationsDir = path.join(process.cwd(), 'src/app/locations');
    const locationFiles = this.findFilesRecursive(locationsDir, /page\.tsx$/);

    // Process each location file
    for (const file of locationFiles) {
      // Extract the URL path from the file path
      const relativePath = file.replace(path.join(process.cwd(), 'src/app/locations'), '');
      const urlPath = relativePath
        .replace(/\/page\.tsx$/, '')
        .replace(/\\/g, '/');

      if (urlPath) {
        urlSet.add({
          loc: `${this.baseUrl}/locations${urlPath}`,
          priority: 0.85,
          changefreq: 'weekly',
        });

        // Add Spanish version for city pages
        if (!urlPath.includes('/') || urlPath.split('/').length <= 3) {
          const spanishPath = urlPath.replace('/nc/', '/');
          urlSet.add({
            loc: `${this.baseUrl}/es/ubicaciones${spanishPath}`,
            priority: 0.8,
            changefreq: 'weekly',
          });
        }
      }
    }

    // Add Florida cities (currently missing)
    const flCities = [
      'orlando', 'miami', 'tampa', 'jacksonville', 'fort-lauderdale',
      'west-palm-beach', 'hialeah', 'tallahassee', 'port-st-lucie',
      'cape-coral', 'pembroke-pines', 'hollywood', 'gainesville',
      'coral-springs', 'clearwater', 'palm-bay', 'lakeland',
      'pompano-beach', 'boca-raton', 'deltona', 'plantation',
      'sunrise', 'palm-coast', 'deerfield-beach', 'largo',
    ];

    // FL state page
    urlSet.add({
      loc: `${this.baseUrl}/locations/fl`,
      priority: 0.9,
      changefreq: 'weekly',
    });

    // FL city pages
    for (const city of flCities) {
      urlSet.add({
        loc: `${this.baseUrl}/locations/fl/${city}`,
        priority: 0.85,
        changefreq: 'weekly',
      });

      // Spanish
      urlSet.add({
        loc: `${this.baseUrl}/es/ubicaciones/fl/${city}`,
        priority: 0.8,
        changefreq: 'weekly',
      });

      // Add practice area combinations for major FL cities
      if (['orlando', 'miami', 'tampa', 'jacksonville', 'fort-lauderdale'].includes(city)) {
        const practiceAreaSlugs = [
          'immigration-lawyer',
          'personal-injury-attorney',
          'criminal-defense-lawyer',
          'workers-compensation-lawyer',
          'family-law-attorney',
        ];

        for (const practice of practiceAreaSlugs) {
          urlSet.add({
            loc: `${this.baseUrl}/locations/fl/${city}/${practice}`,
            priority: 0.8,
            changefreq: 'weekly',
          });

          // Spanish version
          urlSet.add({
            loc: `${this.baseUrl}/es/ubicaciones/fl/${city}/${practice}`,
            priority: 0.75,
            changefreq: 'weekly',
          });
        }
      }
    }

    // Add near-me pages
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
      'charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem',
      'fayetteville', 'cary', 'wilmington', 'high-point', 'asheville',
      // FL
      'orlando', 'miami', 'tampa', 'jacksonville', 'fort-lauderdale',
    ];

    for (const city of majorCities) {
      for (const pattern of nearMePatterns) {
        // English
        urlSet.add({
          loc: `${this.baseUrl}/near-me/${city}-${pattern}`,
          priority: 0.75,
          changefreq: 'weekly',
        });

        // Spanish (was missing!)
        urlSet.add({
          loc: `${this.baseUrl}/es/cerca-de-mi/${city}-${pattern}`,
          priority: 0.7,
          changefreq: 'weekly',
        });
      }
    }
  }

  private static async addBlogPosts(urlSet: Set<any>) {
    try {
      const blogPosts = await getPrismaClient().blogPost.findMany({
        where: { status: 'published' },
        select: { slug: true, updatedAt: true, language: true },
      });

      for (const post of blogPosts) {
        if (post.language === 'es') {
          urlSet.add({
            loc: `${this.baseUrl}/es/blog/${post.slug}`,
            lastmod: post.updatedAt.toISOString(),
            priority: 0.65,
            changefreq: 'monthly',
          });
        } else {
          urlSet.add({
            loc: `${this.baseUrl}/blog/${post.slug}`,
            lastmod: post.updatedAt.toISOString(),
            priority: 0.7,
            changefreq: 'monthly',
          });
        }
      }

      // Add blog category pages
      const categories = [
        'immigration', 'personal-injury', 'criminal-defense',
        'workers-compensation', 'family-law', 'traffic-violations',
      ];

      for (const category of categories) {
        urlSet.add({
          loc: `${this.baseUrl}/blog/category/${category}`,
          priority: 0.8,
          changefreq: 'weekly',
        });

        urlSet.add({
          loc: `${this.baseUrl}/es/blog/categoria/${category}`,
          priority: 0.75,
          changefreq: 'weekly',
        });
      }
    } catch (error) {
      componentLogger.error('Error fetching blog posts for sitemap', error);
    }
  }

  private static async addResourcePages(urlSet: Set<any>) {
    const resourcePages = [
      '/resources/immigration-forms',
      '/resources/legal-guides',
      '/resources/court-information',
      '/resources/legal-dictionary',
      '/resources/faq',
      '/resources/videos',
      '/resources/downloadable-forms',
      '/calculators/personal-injury-settlement',
      '/calculators/immigration-timeline',
      '/calculators/workers-comp-benefits',
    ];

    for (const page of resourcePages) {
      urlSet.add({
        loc: `${this.baseUrl}${page}`,
        priority: 0.6,
        changefreq: 'monthly',
      });

      urlSet.add({
        loc: `${this.baseUrl}/es${page}`,
        priority: 0.55,
        changefreq: 'monthly',
      });
    }
  }

  private static async addSpecialPages(urlSet: Set<any>) {
    const specialPages = [
      '/smithfield-nc-workers-comp-lawyers',
      '/6-reasons-why-you-should-hire-a-personal-injury-lawyer',
      '/can-i-sue-someone-if-their-dog-bites-me',
      '/understanding-common-causes-of-auto-accidents-tips-for-prevention',
      '/what-are-the-requirements-for-adjustment-of-status-for-immigrants',
      '/expert-tips-to-navigate-a-delayed-immigration-court-case-status',
      '/i-was-in-an-accident-with-an-emergency-vehicle-now-what',
      '/can-a-lawyer-help-me-if-i-get-a-dwi',
      '/common-legal-mistakes-to-avoid-after-a-car-accident',
    ];

    for (const page of specialPages) {
      urlSet.add({
        loc: `${this.baseUrl}${page}`,
        priority: 0.7,
        changefreq: 'monthly',
      });

      // Spanish versions (was missing!)
      urlSet.add({
        loc: `${this.baseUrl}/es${page}`,
        priority: 0.65,
        changefreq: 'monthly',
      });
    }
  }

  private static generateXML(urls: Array<{ loc: string; priority: number; changefreq: string; lastmod?: string }>): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    for (const url of urls) {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      if (url.lastmod) {
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;

      // Add hreflang tags for language alternatives
      if (url.loc.includes('/es/') || url.loc.includes('/es-')) {
        const enUrl = url.loc.replace('/es/', '/').replace('/es-', '/');
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="es" href="${url.loc}"/>\n`;
      } else if (!url.loc.includes('/blog/') && !url.loc.includes('/attorneys/')) {
        const esUrl = url.loc.replace(this.baseUrl, `${this.baseUrl}/es`);
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${url.loc}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url.loc}"/>\n`;
      }

      xml += '  </url>\n';
    }

    xml += '</urlset>';
    return xml;
  }
}
