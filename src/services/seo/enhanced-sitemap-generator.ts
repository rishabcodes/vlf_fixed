import { ncCities } from '@/lib/seo/local-seo-generator';

interface SitemapEntry {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
  images?: string[];
  alternates?: {
    hreflang: string;
    href: string;
  }[];
}

export class EnhancedSitemapGenerator {
  private static baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vasquezlawnc.com';

  static async generateCompleteSitemap(): Promise<string> {
    const entries: SitemapEntry[] = [
      // Homepage
      {
        url: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },

      // Main practice areas
      ...this.getPracticeAreaEntries(),

      // Location pages
      ...this.getLocationEntries(),

      // Location + Practice Area combination pages
      ...this.getLocationPracticeAreaEntries(),

      // Static pages
      ...this.getStaticPageEntries(),

      // Blog entries
      ...(await this.getBlogEntries()),
    ];

    return this.generateXML(entries);
  }

  private static getPracticeAreaEntries(): SitemapEntry[] {
    const practiceAreas = [
      { slug: 'immigration', priority: 0.95 },
      { slug: 'personal-injury', priority: 0.95 },
      { slug: 'criminal-defense', priority: 0.9 },
      { slug: 'workers-compensation', priority: 0.9 },
      { slug: 'family-law', priority: 0.85 },
      { slug: 'traffic-violations', priority: 0.85 },
    ];

    const subAreas: Record<string, string[]> = {
      immigration: [
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
      ],
      'personal-injury': [
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
      ],
      'criminal-defense': [
        'dui-dwi',
        'drug-crimes',
        'assault-battery',
        'theft-property-crimes',
        'domestic-violence',
        'traffic-offenses',
        'expungement',
      ],
      'workers-compensation': [
        'construction-site-injuries',
        'equipment-accidents',
        'repetitive-stress-carpal-tunnel',
        'lifting-injuries',
        'mental-health-claims',
        'third-party-injury-claims',
      ],
      'family-law': ['divorce', 'child-custody', 'alimony-spousal-support', 'property-division'],
    };

    const entries: SitemapEntry[] = [];

    // Main practice area pages
    practiceAreas.forEach(area => {
      entries.push({
        url: `/practice-areas/${area.slug}`,
        changefreq: 'weekly',
        priority: area.priority,
        lastmod: new Date().toISOString(),
      });

      // Sub-practice area pages
      const subs = subAreas[area.slug] || [];
      subs.forEach(sub => {
        entries.push({
          url: `/practice-areas/${area.slug}/${sub}`,
          changefreq: 'monthly',
          priority: area.priority - 0.1,
          lastmod: new Date().toISOString(),
        });
      });
    });

    return entries;
  }

  private static getLocationEntries(): SitemapEntry[] {
    const entries: SitemapEntry[] = [];

    // State pages
    entries.push({
      url: '/locations/nc',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    });

    // City pages
    Object.keys(ncCities).forEach(citySlug => {
      entries.push({
        url: `/locations/nc/${citySlug}`,
        changefreq: 'weekly',
        priority: 0.85,
        lastmod: new Date().toISOString(),
        alternates: [
          { hreflang: 'en', href: `${this.baseUrl}/locations/nc/${citySlug}` },
          { hreflang: 'es', href: `${this.baseUrl}/es/locations/nc/${citySlug}` },
        ],
      });
    });

    return entries;
  }

  private static getLocationPracticeAreaEntries(): SitemapEntry[] {
    const entries: SitemapEntry[] = [];
    const mainPracticeAreas = [
      'immigration-lawyer',
      'personal-injury-attorney',
      'criminal-defense-lawyer',
      'workers-compensation-attorney',
      'family-law-attorney',
      'traffic-violation-lawyer',
    ];

    Object.keys(ncCities).forEach(citySlug => {
      mainPracticeAreas.forEach(practice => {
        entries.push({
          url: `/locations/nc/${citySlug}/${practice}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      });
    });

    return entries;
  }

  private static getStaticPageEntries(): SitemapEntry[] {
    return [
      {
        url: '/about',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/attorneys',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/contact',
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/blog',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/testimonials',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/case-results',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/resources',
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/faq',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ];
  }

  private static async getBlogEntries(): Promise<SitemapEntry[]> {
    // This would fetch from your database
    // For now, returning empty array
    return [];
  }

  private static generateXML(entries: SitemapEntry[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
    xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    entries.forEach(entry => {
      xml += '  <url>\n';
      xml += `    <loc>${this.baseUrl}${entry.url}</loc>\n`;

      if (entry.lastmod) {
        xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      }

      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      xml += `    <priority>${entry.priority}</priority>\n`;

      // Add hreflang alternates
      if (entry.alternates) {
        entry.alternates.forEach(alt => {
          xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>\n`;
        });
      }

      // Add images if available
      if (entry.images) {
        entry.images.forEach(image => {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${this.baseUrl}${image}</image:loc>\n`;
          xml += '    </image:image>\n';
        });
      }

      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  static generateRobotsTxt(): string {
    return `# Vasquez Law Firm - North Carolina's Leading Law Firm
# YO PELEO POR TI™

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Crawl-delay: 0

# Priority for search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

User-agent: Slurp
Allow: /
Crawl-delay: 0

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 0

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: Bytespider
Disallow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-locations.xml
Sitemap: ${this.baseUrl}/sitemap-practice-areas.xml
Sitemap: ${this.baseUrl}/sitemap-blog.xml
Sitemap: ${this.baseUrl}/sitemap-news.xml

# Host
Host: ${this.baseUrl}`;
  }
}
