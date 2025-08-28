import { Metadata } from 'next';
import { HreflangUtils } from './hreflang-utils';

interface PageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
  customPath?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  pageType?: 'attorney' | 'practice-area' | 'location' | 'blog' | 'general';
}

interface BilingualMetadataOptions extends PageMetadataOptions {
  titleEs?: string;
  descriptionEs?: string;
}

/**
 * Generate comprehensive metadata with hreflang support for any page
 */
export function generateHreflangMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    pathname,
    customPath,
    keywords = [],
    ogImage = '/images/BANNER_TRANS.PNG',
    noIndex = false,
    pageType = 'general',
  } = options;

  // Generate hreflang and canonical URLs
  const canonical = HreflangUtils.generateCanonicalUrl(pathname, customPath);
  const alternates = HreflangUtils.generateAlternateLinks(pathname, customPath);
  const ogLocales = HreflangUtils.generateOpenGraphLocales(pathname);

  // Determine current locale from pathname
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),

    // Canonical and alternate URLs
    alternates: {
      canonical,
      languages: alternates,
    },

    // OpenGraph metadata with locale support
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Vasquez Law Firm',
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },

    // Robots directive
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Additional metadata
    other: {
      'geo.region': 'US-NC',
      'geo.placename': 'Smithfield, Charlotte, Raleigh, Orlando',
      'geo.position': '35.5085;-78.3394',
      ICBM: '35.5085, -78.3394',
      language: currentLocale,
      'page-type': pageType,
    },
  };

  return metadata;
}

/**
 * Generate metadata specifically for bilingual pages (pages that exist in both languages)
 */
export function generateBilingualMetadata(options: BilingualMetadataOptions): Metadata {
  const currentLocale = options.pathname.startsWith('/es') ? 'es' : 'en';

  // Use appropriate title and description based on current locale
  const title = currentLocale === 'es' && options.titleEs ? options.titleEs : options.title;
  const description =
    currentLocale === 'es' && options.descriptionEs ? options.descriptionEs : options.description;

  return generateHreflangMetadata({
    ...options,
    title,
    description,
  });
}

/**
 * Generate metadata for attorney pages with proper hreflang
 */
export function generateAttorneyMetadata(options: {
  name: string;
  nameEs?: string;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  slug: string;
  photo?: string;
  specialties?: string[];
}): Metadata {
  const pathname = `/attorneys/${options.slug}`;
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';

  const title = currentLocale === 'es' && options.titleEs ? options.titleEs : options.title;
  const description =
    currentLocale === 'es' && options.descriptionEs ? options.descriptionEs : options.description;

  return generateHreflangMetadata({
    title: `${options.name} | ${title} | Vasquez Law Firm`,
    description,
    pathname,
    ogImage: options.photo || '/images/attorneys/default-attorney.jpg',
    keywords: [
      options.name,
      'attorney',
      'lawyer',
      'legal representation',
      ...(options.specialties || []),
      'North Carolina',
      'Orlando',
      'Vasquez Law Firm',
    ],
    pageType: 'attorney',
  });
}

/**
 * Generate metadata for practice area pages with proper hreflang
 */
export function generatePracticeAreaMetadata(options: {
  area: string;
  areaEs?: string;
  subArea?: string;
  subAreaEs?: string;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  keywords?: string[];
}): Metadata {
  const pathSegments = ['/practice-areas', options.area];
  if (options.subArea) pathSegments.push(options.subArea);
  const pathname = pathSegments.join('/');

  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';
  const title = currentLocale === 'es' && options.titleEs ? options.titleEs : options.title;
  const description =
    currentLocale === 'es' && options.descriptionEs ? options.descriptionEs : options.description;

  return generateHreflangMetadata({
    title: `${title} | Vasquez Law Firm - YO PELEO POR TI™`,
    description,
    pathname,
    keywords: [
      options.area,
      options.subArea,
      'attorney',
      'lawyer',
      'legal services',
      'North Carolina',
      'Orlando',
      'Vasquez Law Firm',
      ...(options.keywords || []),
    ].filter(Boolean) as string[],
    pageType: 'practice-area',
  });
}

/**
 * Generate metadata for location pages with proper hreflang
 */
export function generateLocationMetadata(options: {
  city: string;
  cityEs?: string;
  state: string;
  stateEs?: string;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  address?: string;
  phone?: string;
  practiceAreas?: string[];
}): Metadata {
  const pathname = `/locations/${options.city.toLowerCase().replace(/\s+/g, '-')}`;
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';

  const title = currentLocale === 'es' && options.titleEs ? options.titleEs : options.title;
  const description =
    currentLocale === 'es' && options.descriptionEs ? options.descriptionEs : options.description;

  return generateHreflangMetadata({
    title: `${title} | Vasquez Law Firm`,
    description,
    pathname,
    keywords: [
      options.city,
      options.state,
      'attorney',
      'lawyer',
      'legal services',
      ...(options.practiceAreas || []),
      'Vasquez Law Firm',
    ],
    pageType: 'location',
    ogImage: `/images/locations/${options.city.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  });
}

/**
 * Generate metadata for blog posts with proper hreflang
 */
export function generateBlogMetadata(options: {
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  slug: string;
  author?: string;
  publishDate?: Date;
  tags?: string[];
  featuredImage?: string;
}): Metadata {
  const pathname = `/blog/${options.slug}`;
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';

  const title = currentLocale === 'es' && options.titleEs ? options.titleEs : options.title;
  const description =
    currentLocale === 'es' && options.descriptionEs ? options.descriptionEs : options.description;

  const metadata = generateHreflangMetadata({
    title: `${title} | Vasquez Law Firm Blog`,
    description,
    pathname,
    keywords: options.tags || [],
    ogImage: options.featuredImage || '/images/blog/default-blog-image.jpg',
    pageType: 'blog',
  });

  // Add article-specific OpenGraph data
  if (metadata.openGraph) {
    const articleGraph = metadata.openGraph as typeof metadata.openGraph & {
      type?: string;
      authors?: string[];
      publishedTime?: string;
      tags?: string[];
    };
    articleGraph.type = 'article';
    articleGraph.authors = options.author ? [options.author] : undefined;
    articleGraph.publishedTime = options.publishDate?.toISOString();
    articleGraph.tags = options.tags;
  }

  return metadata;
}

/**
 * Utility function to get hreflang links for manual insertion
 */
export function getHreflangLinks(pathname: string, customPath?: string) {
  return HreflangUtils.generateHreflangEntries(pathname, customPath);
}

/**
 * Check if the current page has bilingual support
 */
export function hasBilingualSupport(pathname: string): boolean {
  const entries = HreflangUtils.generateHreflangEntries(pathname);
  return (
    entries.some(entry => entry.hreflang.startsWith('es')) &&
    entries.some(entry => entry.hreflang.startsWith('en'))
  );
}
