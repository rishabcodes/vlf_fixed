import { Metadata } from 'next';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  alternateLocales?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
}

export function generateMetaTags({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  author,
  publishedTime,
  modifiedTime,
  locale = 'en_US',
  alternateLocales = ['es_ES'],
  noIndex = false,
  noFollow = false,
}: MetaTagsProps): Metadata {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const defaultOgImage = `${baseUrl}/images/BANNER_TRANS.PNG`;

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | Vasquez Law Firm - YO PELEO POR TI™`,
    },
    description,
    keywords,
    authors: author ? [{ name: author }] : [{ name: 'Vasquez Law Firm' }],
    creator: 'Vasquez Law Firm',
    publisher: 'Vasquez Law Firm',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl || baseUrl,
      languages: alternateLocales.reduce(
        (acc, loc) => {
          const langCode = loc.split('_')[0];
          acc[loc] = `${baseUrl}/${langCode}`;
          return acc;
        },
        {} as Record<string, string>
      ),
    },
    openGraph: {
      title: title,
      description,
      url: canonicalUrl || baseUrl,
      siteName: 'Vasquez Law Firm',
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      alternateLocale: alternateLocales,
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && {
        authors: [author],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title.length > 60 ? `${title.substring(0, 57)}...` : title,
      description: description.length > 160 ? `${description.substring(0, 157)}...` : description,
      images: [ogImage || defaultOgImage],
      creator: '@vasquezlawfirm',
      site: '@vasquezlawfirm',
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
      ...(noIndex || noFollow ? { nocache: true } : {}),
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
      other: {
        bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      },
    },
  };

  return metadata;
}

// Helper function to generate dynamic OG images
export function generateOgImageUrl(params: {
  title: string;
  subtitle?: string;
  author?: string;
  logo?: boolean;
}) {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const searchParams = new URLSearchParams({
    title: params.title,
    ...(params.subtitle && { subtitle: params.subtitle }),
    ...(params.author && { author: params.author }),
    ...(params.logo && { logo: 'true' }),
  });

  return `${baseUrl}/api/og?${searchParams.toString()}`;
}

// Helper function for article-specific metadata
export function generateArticleMetaTags(
  props: MetaTagsProps & {
    section?: string;
    tags?: string[];
  }
) {
  return generateMetaTags({
    ...props,
    ogType: 'article',
    keywords: props.keywords || props.tags?.join(', '),
  });
}

// Helper function for location-specific metadata
export function generateLocationMetaTags({
  city,
  state,
  ...props
}: MetaTagsProps & {
  city: string;
  state: string;
}) {
  const locationTitle = `${props.title} | ${city}, ${state}`;
  const locationDescription = `${props.description} Serving ${city}, ${state} and surrounding areas.`;

  return generateMetaTags({
    ...props,
    title: locationTitle,
    description: locationDescription,
    keywords: `${props.keywords}, ${city} ${state}, ${city} attorney, ${city} lawyer`,
  });
}

// Helper function for attorney-specific metadata
export function generateAttorneyMetaTags({
  attorneyName,
  jobTitle,
  ...props
}: MetaTagsProps & {
  attorneyName: string;
  jobTitle: string;
}) {
  return generateMetaTags({
    ...props,
    title: `${attorneyName} - ${jobTitle} | Vasquez Law Firm`,
    ogType: 'profile',
    author: attorneyName,
  });
}
