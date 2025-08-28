import { Metadata } from 'next';
import { logger } from '@/lib/safe-logger';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
  nofollow?: boolean;
  locale?: string;
  alternateUrls?: { [key: string]: string };
}

interface LocalSEOConfig {
  businessName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string;
  email?: string;
  website: string;
  latitude?: number;
  longitude?: number;
  hours?: BusinessHours[];
  services?: string[];
  areas?: string[];
}

interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

class EnhancedSEO {
  private baseUrl: string;
  private siteName: string;
  private defaultImage: string;

  constructor(baseUrl: string, siteName: string, defaultImage: string) {
    this.baseUrl = baseUrl;
    this.siteName = siteName;
    this.defaultImage = defaultImage;
  }

  public generateMetadata(config: SEOConfig): Metadata {
    const {
      title,
      description,
      keywords = [],
      canonical,
      ogImage,
      ogType = 'website',
      noindex = false,
      nofollow = false,
      locale = 'en_US',
      alternateUrls = {},
    } = config;

    const fullTitle = title ? `${title} | ${this.siteName}` : this.siteName;
    const canonicalUrl = canonical || this.baseUrl;
    const imageUrl = ogImage || this.defaultImage;

    return {
      title: fullTitle,
      description,
      keywords: keywords.join(', '),
      robots: {
        index: !noindex,
        follow: !nofollow,
        googleBot: {
          index: !noindex,
          follow: !nofollow,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title: fullTitle,
        description,
        url: canonicalUrl,
        siteName: this.siteName,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title || this.siteName,
          },
        ],
        locale,
        type: (ogType || 'website') as
          | 'article'
          | 'website'
          | 'profile'
          | 'book'
          | 'music.song'
          | 'music.album'
          | 'music.playlist'
          | 'music.radio_station'
          | 'video.movie'
          | 'video.episode'
          | 'video.tv_show'
          | 'video.other',
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: canonicalUrl,
        languages: alternateUrls,
      },
    };
  }

  public generateLocalBusinessSchema(config: LocalSEOConfig): object {
    const {
      businessName,
      address,
      phone,
      email,
      website,
      latitude,
      longitude,
      hours = [],
      services = [],
      areas = [],
    } = config;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: businessName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.street,
        addressLocality: address.city,
        addressRegion: address.state,
        postalCode: address.zipCode,
        addressCountry: address.country,
      },
      telephone: phone,
      url: website,
      ...(email && { email }),
      ...(latitude &&
        longitude && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude,
            longitude,
          },
        }),
      ...(hours.length > 0 && {
        openingHours: hours.map(hour => `${hour.day} ${hour.open}-${hour.close}`),
      }),
      ...(services.length > 0 && {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: services.map(service => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service,
            },
          })),
        },
      }),
      ...(areas.length > 0 && {
        areaServed: areas.map(area => ({
          '@type': 'Place',
          name: area,
        })),
      }),
    };

    return schema;
  }

  public generateLawFirmSchema(config: {
    name: string;
    description: string;
    url: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    attorneys?: Array<{ name: string; role: string; url?: string }>;
    areasOfPractice?: string[];
  }): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: config.name,
      description: config.description,
      url: config.url,
      telephone: config.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.address.street,
        addressLocality: config.address.city,
        addressRegion: config.address.state,
        postalCode: config.address.zipCode,
        addressCountry: config.address.country,
      },
      attorney:
        config.attorneys?.map(attorney => ({
          '@type': 'Person',
          name: attorney.name,
          jobTitle: attorney.role,
          ...(attorney.url && { url: attorney.url }),
        })) || [],
      ...(config.areasOfPractice && { practiceArea: config.areasOfPractice }),
    };
  }

  public generateArticleSchema(config: {
    headline: string;
    description: string;
    author: { name: string; url?: string };
    datePublished: string;
    dateModified?: string;
    image?: string;
    url: string;
    keywords?: string[];
  }): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: config.headline,
      description: config.description,
      image: config.image,
      datePublished: config.datePublished,
      dateModified: config.dateModified,
      author: {
        '@type': 'Person',
        name: config.author.name,
        url: config.author.url,
      },
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        logo: {
          '@type': 'ImageObject',
          url: this.defaultImage,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': config.url,
      },
    };
  }

  public generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  public generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url,
      })),
    };
  }

  public generateSitemapXML(
    urls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: number }>
  ): string {
    const urlElements = urls
      .map(
        url => `
    <url>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
      ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    </url>
    `
      )
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`;
  }

  public generateRobotsTxt(config: {
    userAgent?: string;
    disallow?: string[];
    allow?: string[];
    sitemap?: string;
  }): string {
    const { userAgent = '*', disallow = [], allow = [], sitemap } = config;

    let robotsTxt = `User-agent: ${userAgent}\n`;

    allow.forEach(path => {
      robotsTxt += `Allow: ${path}\n`;
    });

    disallow.forEach(path => {
      robotsTxt += `Disallow: ${path}\n`;
    });

    if (sitemap) {
      robotsTxt += `\nSitemap: ${sitemap}`;
    }

    return robotsTxt;
  }

  public analyzeSEO(config: SEOConfig): { score: number; issues: string[]; suggestions: string[] } {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Title analysis
    if (!config.title) {
      issues.push('Missing title tag');
      score -= 20;
    } else if (config.title.length > 60) {
      issues.push('Title too long (>60 characters)');
      score -= 10;
    } else if (config.title.length < 30) {
      suggestions.push('Consider making title more descriptive (30-60 characters)');
    }

    // Description analysis
    if (!config.description) {
      issues.push('Missing meta description');
      score -= 15;
    } else if (config.description.length > 160) {
      issues.push('Meta description too long (>160 characters)');
      score -= 10;
    } else if (config.description.length < 120) {
      suggestions.push('Consider expanding meta description (120-160 characters)');
    }

    // Keywords analysis
    if (!config.keywords || config.keywords.length === 0) {
      suggestions.push('Add relevant keywords');
    } else if (config.keywords.length > 10) {
      suggestions.push('Consider reducing number of keywords (5-10 recommended)');
    }

    // Images
    if (!config.ogImage) {
      issues.push('Missing Open Graph image');
      score -= 5;
    }

    // Canonical URL
    if (!config.canonical) {
      issues.push('Missing canonical URL');
      score -= 5;
    }

    return { score: Math.max(0, score), issues, suggestions };
  }

  public logSEOAnalysis(config: SEOConfig) {
    const analysis = this.analyzeSEO(config);
    logger.info('SEO Analysis', {
      score: analysis.score,
      issues: analysis.issues,
      suggestions: analysis.suggestions,
    });
  }
}

export default EnhancedSEO;

// Utility functions
export const seoUtils = {
  // Generate meta tags for dynamic content
  generateDynamicMeta: (template: string, data: Record<string, unknown>): string => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => String(data[key] || match));
  },

  // Validate structured data
  validateStructuredData: (data: unknown): boolean => {
    try {
      JSON.stringify(data);
      return true;
    } catch {
      return false;
    }
  },

  // Generate slug from title
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  // Extract keywords from content
  extractKeywords: (content: string, limit: number = 10): string[] => {
    const words = content
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);

    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([word]) => word);
  },
};
