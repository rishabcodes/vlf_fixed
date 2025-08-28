import { Metadata } from 'next';
import { getPrismaClient } from '@/lib/prisma';
import { componentLogger } from '@/lib/safe-logger';

// Schema types would be imported here when needed

export interface SchemaOrgData {
  '@context': string;
  '@type': string | string[];
  name?: string;
  description?: string;
  url?: string;
  image?: string | string[];
  sameAs?: string[];
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
  [key: string]: unknown;
}

export class SEOOptimizationService {
  // Generate optimized metadata for pages
  static async generateMetadata(params: {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    language?: 'en' | 'es';
  }): Promise<Metadata> {
    const {
      title,
      description,
      keywords,
      image,
      url,
      type = 'website',
      publishedTime,
      modifiedTime,
      author,
      language = 'en',
    } = params;

    const siteName = 'Vasquez Law Firm, PLLC';
    const twitterHandle = '@VasquezLawNC';

    return {
      title: `${title} | ${siteName}`,
      description,
      keywords: keywords?.join(', '),
      authors: author ? [{ name: author }] : [{ name: siteName }],
      openGraph: {
        title,
        description,
        url,
        siteName,
        images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
        locale: language === 'es' ? 'es_US' : 'en_US',
        type,
        ...(publishedTime && { publishedTime }),
        ...(modifiedTime && { modifiedTime }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        site: twitterHandle,
        creator: twitterHandle,
        images: image ? [image] : [],
      },
      alternates: {
        languages: {
          'en-US': url.replace('/es/', '/en/'),
          'es-US': url.replace('/en/', '/es/'),
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION,
        yandex: process.env.YANDEX_VERIFICATION,
        yahoo: process.env.YAHOO_VERIFICATION,
      },
    };
  }

  // Generate Schema.org structured data
  static generateSchema(type: string, data: Record<string, unknown>): SchemaOrgData {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    switch (type) {
      case 'LawFirm':
        return {
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          '@id': `${baseUrl}/#organization`,
          name: 'Vasquez Law Firm, PLLC',
          alternateName: 'VLF',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo.png`,
            width: 600,
            height: 200,
          },
          image: `${baseUrl}/images/office.jpg`,
          description:
            "Full-service law firm specializing in Immigration, Personal Injury, Workers' Compensation, Criminal Defense, Family Law, and Traffic Violations. Serving North Carolina and Florida with AI-enhanced legal services.",
          slogan: 'YO PELEO POR TI™',
          foundingDate: '1989',
          priceRange: '$$$',
          telephone: '+1-844-967-3536',
          email: 'leads@vasquezlawfirm.com',
          address: {
            '@type': 'PostalAddress' as const,
            streetAddress: '123 Main St, Suite 100',
            addressLocality: 'Raleigh',
            addressRegion: 'NC',
            postalCode: '27601',
            addressCountry: 'US',
          },
          geo: [
            {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382,
            },
          ],
          areaServed: [
            {
              '@type': 'State',
              name: 'North Carolina',
            },
            {
              '@type': 'State',
              name: 'Florida',
            },
          ],
          serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382,
            },
            geoRadius: '200',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Legal Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Immigration Law',
                  description:
                    'Comprehensive immigration services including visas, green cards, citizenship, and deportation defense.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Personal Injury',
                  description:
                    'Representation for car accidents, slip and falls, and other personal injury cases.',
                },
              },
              // Add more services
            ],
          },
          sameAs: [
            'https://www.facebook.com/vasquezlawfirm',
            'https://twitter.com/vasquezlawnc',
            'https://www.linkedin.com/company/vasquez-law-firm',
            'https://www.youtube.com/vasquezlawfirm',
          ],
          review: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '523',
          },
        };

      case 'Attorney':
        return {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          '@id': `${baseUrl}/attorneys/${data.slug as string}#person`,
          name: data.name as string,
          image: data.image as string,
          jobTitle: data.title as string,
          worksFor: {
            '@id': `${baseUrl}/#organization`,
          },
          description: data.bio as string,
          alumniOf: (data.education as Array<{ name: string }>)?.map(edu => ({
            '@type': 'EducationalOrganization',
            name: edu.name,
          })),
          knowsLanguage: data.languages,
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Attorney',
            occupationalCategory: '23-1011.00',
          },
        };

      case 'BlogPosting':
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${baseUrl}/blog/${data.slug as string}#article`,
          headline: data.title as string,
          alternativeHeadline: data.metaDescription as string,
          image: data.featuredImage as string,
          author: {
            '@type': 'Person',
            name: (data.author as string) || 'Vasquez Law Team',
            url: `${baseUrl}/attorneys`,
          },
          publisher: {
            '@id': `${baseUrl}/#organization`,
          },
          datePublished: data.publishedAt,
          dateModified: data.updatedAt as string,
          description: data.excerpt as string,
          articleBody: data.content as string,
          keywords: (data.keywords as string[]).join(', '),
          wordCount: (data.content as string).split(' ').length,
          inLanguage: data.language === 'es' ? 'es-US' : 'en-US',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${data.slug as string}`,
          },
          ...((data.faqSection as Array<{ question: string; answer: string }>) && {
            hasPart: {
              '@type': 'FAQPage',
              mainEntity: (data.faqSection as Array<{ question: string; answer: string }>).map(
                faq => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })
              ),
            },
          }),
        };

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (data.questions as Array<{ question: string; answer: string }>).map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
              author: {
                '@id': `${baseUrl}/#organization`,
              },
            },
          })),
        };

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/locations/${data.city}#location`,
          name: `Vasquez Law Firm - ${data.city}`,
          parentOrganization: {
            '@id': `${baseUrl}/#organization`,
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.address as string,
            addressLocality: data.city as string,
            addressRegion: data.state as string,
            postalCode: data.zip as string,
            addressCountry: 'US',
          },
          telephone: data.phone,
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '18:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '10:00',
              closes: '14:00',
            },
          ],
        };

      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: (data.items as Array<{ name: string; url: string }>).map(
            (item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: `${baseUrl}${item.url}`,
            })
          ),
        };

      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
        };
    }
  }

  // Generate XML sitemap with all 1,318 pages
  static async generateSitemap(): Promise<string> {
    componentLogger.info('SEOOptimizationService.generateSitemap', {});

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    // Static pages with EN/ES pairs
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

    // Attorney pages
    const attorneyPages = [
      'william-vasquez',
      'adrianna-ingram',
      'christopher-afanador',
      'jillian-baucom',
      'mark-kelsey',
      'roselyn-v-torrellas',
      'judith-parkes',
    ];

    // Main practice area pages
    const practiceAreas = [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'traffic-violations',
    ];

    // Sub-practice area pages
    const subPracticeAreas: Record<string, string[]> = {
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
        'affirmative',
        'business',
        'removal-defense',
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
        'slip-and-fall',
      ],
      'criminal-defense': [
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
      ],
      'workers-compensation': [
        'construction-site-injuries',
        'equipment-accidents',
        'repetitive-stress-carpal-tunnel',
        'lifting-injuries',
        'mental-health-claims',
        'third-party-injury-claims',
      ],
      'family-law': [
        'divorce',
        'child-custody',
        'alimony-spousal-support',
        'property-division',
        'child-support',
      ],
      'traffic-violations': [],
    };

    // NC Cities list
    const ncCities = [
      'raleigh', 'charlotte', 'durham', 'greensboro', 'winston-salem', 'fayetteville',
      'cary', 'wilmington', 'high-point', 'asheville', 'gastonia', 'concord',
      'apex', 'huntersville', 'chapel-hill', 'rocky-mount', 'burlington', 'kannapolis',
      'hickory', 'mooresville', 'monroe', 'sanford', 'new-bern', 'havelock',
      'carrboro', 'shelby', 'matthews', 'mint-hill', 'wake-forest', 'indian-trail',
      'cornelius', 'garner', 'clayton', 'smithfield', 'wilson', 'greenville',
      'holly-springs', 'fuquay-varina', 'kernersville', 'hendersonville', 'salisbury',
      'morrisville', 'goldsboro', 'knightdale', 'zebulon', 'benson', 'spring-lake',
      'davidson', 'louisburg', 'youngsville', 'henderson', 'oxford', 'hillsborough',
      'newton', 'lenoir', 'lexington', 'thomasville', 'harrisburg', 'belmont',
      'mount-holly', 'pineville', 'stallings', 'pinehurst', 'southern-pines',
      'aberdeen', 'laurinburg', 'lumberton', 'jacksonville', 'elizabeth-city',
      'kinston', 'statesville', 'albemarle', 'waynesville', 'boone', 'morganton',
    ];

    // Location + Practice Area combinations for major cities
    const majorCities = ['charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem',
                        'fayetteville', 'cary', 'wilmington', 'high-point', 'asheville',
                        'gastonia', 'concord', 'apex', 'huntersville', 'chapel-hill'];
    
    const practiceAreaSlugs = [
      'immigration-lawyer',
      'personal-injury-attorney',
      'criminal-defense-lawyer',
      'workers-compensation-lawyer',
      'family-law-attorney',
      'traffic-violation-lawyer',
      'car-accident-lawyer',
      'criminal-defense-attorney',
      'workers-compensation-attorney',
    ];

    // Near-me pages patterns
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

    // Blog posts
    const blogPosts = await getPrismaClient().blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true, language: true },
    });

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // Add static pages with language alternatives
    for (const page of staticPages) {
      // English version
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${page.url}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}"/>\n`;
      xml += '  </url>\n';

      // Spanish version
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/es${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority * 0.95}</priority>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${page.url}"/>\n`;
      xml += '  </url>\n';
    }

    // Add attorney pages
    for (const attorney of attorneyPages) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/attorneys/${attorney}</loc>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';

      // Spanish version
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/es/abogados/${attorney}</loc>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.65</priority>\n';
      xml += '  </url>\n';
    }

    // Add practice area pages and sub-pages
    for (const area of practiceAreas) {
      // Main practice area page
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/practice-areas/${area}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.9</priority>\n';
      xml += '  </url>\n';

      // Spanish version
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/es/areas-de-practica/${area}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.85</priority>\n';
      xml += '  </url>\n';

      // Sub-practice area pages
      const subAreas = subPracticeAreas[area] || [];
      for (const subArea of subAreas) {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/practice-areas/${area}/${subArea}</loc>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.85</priority>\n';
        xml += '  </url>\n';
      }
    }

    // Add location pages
    // Main NC page
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/locations/nc</loc>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.9</priority>\n';
    xml += '  </url>\n';

    // NC city pages
    for (const city of ncCities) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/locations/nc/${city}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.85</priority>\n';
      xml += '  </url>\n';

      // Spanish version - ubicaciones
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/es/ubicaciones/${city}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    }

    // Location + Practice Area combination pages for major cities
    for (const city of majorCities) {
      for (const practice of practiceAreaSlugs) {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/locations/nc/${city}/${practice}</loc>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';
      }
    }

    // Near-me pages
    for (const city of majorCities) {
      for (const pattern of nearMePatterns) {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/near-me/${city}-${pattern}</loc>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.75</priority>\n';
        xml += '  </url>\n';
      }
    }

    // Add blog posts
    for (const post of blogPosts) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';

      // If Spanish blog post
      if (post.language === 'es') {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/es/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n`;
        xml += '    <changefreq>monthly</changefreq>\n';
        xml += '    <priority>0.65</priority>\n';
        xml += '  </url>\n';
      }
    }

    // Add special landing pages
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
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    componentLogger.info('SEOOptimizationService.generateSitemap completed', {
      totalUrls: xml.match(/<url>/g)?.length || 0,
    });

    return xml;
  }

  // Generate robots.txt
  static generateRobotsTxt(): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    return `# Vasquez Law Firm Robots.txt
# AI-Enhanced Legal Services

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$
Disallow: /*?*

# Allow search engines to access everything else
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-blog.xml
Sitemap: ${baseUrl}/sitemap-news.xml`;
  }

  // Analyze page for SEO issues
  static async analyzePage(url: string): Promise<{
    score: number;
    issues: string[];
    suggestions: string[];
  }> {
    componentLogger.info('SEOOptimizationService.analyzePage', { url });

    // This would typically fetch and analyze the page
    // For now, returning mock data
    // const issues: string[] = [];
    // const suggestions: string[] = [];
    // const score = 100;
    return {
      score: 95,
      issues: ['Meta description could be longer', 'Missing alt text on 2 images'],
      suggestions: ['Add FAQ schema for better rich snippets', 'Implement breadcrumbs'],
    };
  }

  // Generate hreflang tags for multilingual support
  static generateHreflangTags(currentPath: string, _language: 'en' | 'es'): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    const tags: string[] = [];

    // English version
    tags.push(`<link rel="alternate" hreflang="en" href="${baseUrl}/en${currentPath}" />`);

    // Spanish version
    tags.push(`<link rel="alternate" hreflang="es" href="${baseUrl}/es${currentPath}" />`);

    // Default
    tags.push(`<link rel="alternate" hreflang="x-default" href="${baseUrl}${currentPath}" />`);

    return tags.join('\n');
  }

  // Generate hreflang sitemap
  async generateHreflangSitemap(): Promise<string> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    // Define pages that have translations
    const pages = [
      '/',
      '/practice-areas',
      '/practice-areas/immigration',
      '/practice-areas/personal-injury',
      '/practice-areas/workers-compensation',
      '/practice-areas/criminal-defense',
      '/practice-areas/family-law',
      '/practice-areas/traffic-violations',
      '/attorneys',
      '/about',
      '/contact',
      '/blog',
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    for (const page of pages) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${page === '/' ? '' : page}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page}" />\n`;
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    return xml;
  }
}
