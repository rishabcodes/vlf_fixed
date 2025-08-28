'use client';

import { usePathname } from 'next/navigation';
import { Metadata } from 'next';

interface HreflangEntry {
  hreflang: string;
  href: string;
}

interface PageTranslation {
  en: string;
  es: string;
}

interface HreflangGeneratorProps {
  currentLocale?: 'en' | 'es';
  customPath?: string;
  pageType?: 'home' | 'attorney' | 'practice-area' | 'location' | 'blog' | 'general';
}

export class HreflangGenerator {
  private static readonly BASE_URL = 'https://www.vasquezlawnc.com';

  // Define page translation mappings
  private static readonly PAGE_TRANSLATIONS: Record<string, PageTranslation> = {
    // Main pages
    '/': { en: '/', es: '/es' },
    '/about': { en: '/about', es: '/es/acerca-de' },
    '/contact': { en: '/contact', es: '/es/contacto' },
    '/attorneys': { en: '/attorneys', es: '/es/abogados' },
    '/practice-areas': { en: '/practice-areas', es: '/es/areas-de-practica' },
    '/testimonials': { en: '/testimonials', es: '/es/testimonios' },
    '/case-results': { en: '/case-results', es: '/es/resultados-casos' },
    '/scholarship': { en: '/scholarship', es: '/es/becas' },
    '/free-consultation': { en: '/free-consultation', es: '/es/consulta-gratuita' },
    '/payment': { en: '/payment', es: '/es/pago' },
    '/make-payment': { en: '/make-payment', es: '/es/hacer-pago' },
    '/privacy-policy': { en: '/privacy-policy', es: '/es/politica-privacidad' },
    '/terms-of-service': { en: '/terms-of-service', es: '/es/terminos-servicio' },
    '/sitemap': { en: '/sitemap', es: '/es/mapa-del-sitio' },
    '/blog': { en: '/blog', es: '/es/blog' },

    // Practice areas - main categories
    '/practice-areas/immigration': {
      en: '/practice-areas/immigration',
      es: '/es/areas-de-practica/inmigracion',
    },
    '/practice-areas/personal-injury': {
      en: '/practice-areas/personal-injury',
      es: '/es/areas-de-practica/lesiones-personales',
    },
    '/practice-areas/criminal-defense': {
      en: '/practice-areas/criminal-defense',
      es: '/es/areas-de-practica/defensa-criminal',
    },
    '/practice-areas/workers-compensation': {
      en: '/practice-areas/workers-compensation',
      es: '/es/areas-de-practica/compensacion-laboral',
    },
    '/practice-areas/family-law': {
      en: '/practice-areas/family-law',
      es: '/es/areas-de-practica/derecho-familia',
    },
    '/practice-areas/traffic-violations': {
      en: '/practice-areas/traffic-violations',
      es: '/es/areas-de-practica/infracciones-transito',
    },

    // Attorney pages
    '/attorneys/william-vasquez': {
      en: '/attorneys/william-vasquez',
      es: '/es/abogados/william-vasquez',
    },
    '/attorneys/adrianna-ingram': {
      en: '/attorneys/adrianna-ingram',
      es: '/es/abogados/adrianna-ingram',
    },
    '/attorneys/christopher-afanador': {
      en: '/attorneys/christopher-afanador',
      es: '/es/abogados/christopher-afanador',
    },
    '/attorneys/jillian-baucom': {
      en: '/attorneys/jillian-baucom',
      es: '/es/abogados/jillian-baucom',
    },
    '/attorneys/mark-kelsey': { en: '/attorneys/mark-kelsey', es: '/es/abogados/mark-kelsey' },
    '/attorneys/roselyn-v-torrellas': {
      en: '/attorneys/roselyn-v-torrellas',
      es: '/es/abogados/roselyn-torrellas',
    },
    '/attorneys/judith-parkes': {
      en: '/attorneys/judith-parkes',
      es: '/es/abogados/judith-parkes',
    },

    // Location pages - main offices
    '/locations/charlotte': { en: '/locations/charlotte', es: '/es/ubicaciones/charlotte' },
    '/locations/raleigh': { en: '/locations/raleigh', es: '/es/ubicaciones/raleigh' },
    '/locations/orlando': { en: '/locations/orlando', es: '/es/ubicaciones/orlando' },
    '/locations/smithfield': { en: '/locations/smithfield', es: '/es/ubicaciones/smithfield' },
    '/locations/durham': { en: '/locations/durham', es: '/es/ubicaciones/durham' },
    '/locations/winston-salem': {
      en: '/locations/winston-salem',
      es: '/es/ubicaciones/winston-salem',
    },

    // Contact location pages
    '/contact/charlotte-nc-office-location': {
      en: '/contact/charlotte-nc-office-location',
      es: '/es/contacto/ubicacion-oficina-charlotte-nc',
    },
    '/contact/raleigh-nc-office-location': {
      en: '/contact/raleigh-nc-office-location',
      es: '/es/contacto/ubicacion-oficina-raleigh-nc',
    },
    '/contact/orlando-fl-office-location': {
      en: '/contact/orlando-fl-office-location',
      es: '/es/contacto/ubicacion-oficina-orlando-fl',
    },
    '/contact/smithfield-office-location': {
      en: '/contact/smithfield-office-location',
      es: '/es/contacto/ubicacion-oficina-smithfield',
    },
  };

  // Pattern-based translations for dynamic pages
  private static readonly PATTERN_TRANSLATIONS = [
    {
      pattern: /^\/practice-areas\/immigration\/(.+)$/,
      transform: (match: RegExpMatchArray) => ({
        en: `/practice-areas/immigration/${match[1]}`,
        es: `/es/areas-de-practica/inmigracion/${match[1]}`,
      }),
    },
    {
      pattern: /^\/practice-areas\/personal-injury\/(.+)$/,
      transform: (match: RegExpMatchArray) => ({
        en: `/practice-areas/personal-injury/${match[1]}`,
        es: `/es/areas-de-practica/lesiones-personales/${match[1]}`,
      }),
    },
    {
      pattern: /^\/practice-areas\/criminal-defense\/(.+)$/,
      transform: (match: RegExpMatchArray) => ({
        en: `/practice-areas/criminal-defense/${match[1]}`,
        es: `/es/areas-de-practica/defensa-criminal/${match[1]}`,
      }),
    },
    {
      pattern: /^\/practice-areas\/workers-compensation\/(.+)$/,
      transform: (match: RegExpMatchArray) => ({
        en: `/practice-areas/workers-compensation/${match[1]}`,
        es: `/es/areas-de-practica/compensacion-laboral/${match[1]}`,
      }),
    },
    {
      pattern: /^\/practice-areas\/family-law\/(.+)$/,
      transform: (match: RegExpMatchArray) => ({
        en: `/practice-areas/family-law/${match[1]}`,
        es: `/es/areas-de-practica/derecho-familia/${match[1]}`,
      }),
    },
    {
      pattern: /^\/blog\/(.+)$/,
      transform: (match: RegExpMatchArray) => ({
        en: `/blog/${match[1]}`,
        es: `/es/blog/${match[1]}`,
      }),
    },
    {
      pattern: /^\/locations\/nc\/(.+)$/,
      transform: (match: RegExpMatchArray) => ({
        en: `/locations/nc/${match[1]}`,
        es: `/es/ubicaciones/nc/${match[1]}`,
      }),
    },
  ];

  /**
   * Get current path without locale prefix and translate Spanish segments to English
   */
  private static getCleanPath(pathname: string): string {
    // Remove query parameters and hash
    const pathWithoutQuery = pathname.split('?')[0]?.split('#')[0] || pathname;

    // If it's not a Spanish path, just clean it up
    if (!pathWithoutQuery.startsWith('/es')) {
      return pathWithoutQuery.replace(/\/+$/, '') || '/';
    }

    // Remove /es prefix
    const withoutEsPrefix =
      pathWithoutQuery.replace(/^\/es(?:\/|$)/, '/').replace(/\/+$/, '') || '/';

    // For Spanish paths, try to find the English equivalent by checking our translations
    for (const [englishPath, translation] of Object.entries(this.PAGE_TRANSLATIONS)) {
      if (translation.es === pathWithoutQuery) {
        return englishPath;
      }
    }

    // If no exact match found, try pattern-based reverse translation
    const spanishSegments = withoutEsPrefix.split('/').filter(Boolean);
    const englishSegments = spanishSegments.map(segment => {
      // Basic Spanish to English translation for common segments
      const segmentMap: Record<string, string> = {
        abogados: 'attorneys',
        'areas-de-practica': 'practice-areas',
        inmigracion: 'immigration',
        'lesiones-personales': 'personal-injury',
        'defensa-criminal': 'criminal-defense',
        'compensacion-laboral': 'workers-compensation',
        'derecho-familia': 'family-law',
        'infracciones-transito': 'traffic-violations',
        ubicaciones: 'locations',
        contacto: 'contact',
        'acerca-de': 'about',
        testimonios: 'testimonials',
        'resultados-casos': 'case-results',
        becas: 'scholarship',
        'consulta-gratuita': 'free-consultation',
        pago: 'payment',
        'hacer-pago': 'make-payment',
        'politica-privacidad': 'privacy-policy',
        'terminos-servicio': 'terms-of-service',
        'mapa-del-sitio': 'sitemap',
      };
      return segmentMap[segment] || segment;
    });

    return '/' + englishSegments.join('/');
  }

  /**
   * Detect current locale from pathname
   */
  private static detectLocale(pathname: string): 'en' | 'es' {
    return pathname.startsWith('/es') ? 'es' : 'en';
  }

  /**
   * Get translation for a given path
   */
  private static getPageTranslation(cleanPath: string): PageTranslation | null {
    // First check exact matches
    if (this.PAGE_TRANSLATIONS[cleanPath]) {
      return this.PAGE_TRANSLATIONS[cleanPath];
    }

    // Then check pattern matches
    for (const { pattern, transform } of this.PATTERN_TRANSLATIONS) {
      const match = cleanPath.match(pattern);
      if (match) {
        return transform(match);
      }
    }

    return null;
  }

  /**
   * Check if a page exists in Spanish
   */
  private static hasSpanishVersion(cleanPath: string): boolean {
    const translation = this.getPageTranslation(cleanPath);
    return translation !== null;
  }

  /**
   * Generate hreflang entries for a given path
   */
  public static generateHreflangEntries(pathname?: string, customPath?: string): HreflangEntry[] {
    const currentPath = customPath || pathname || '/';
    const cleanPath = this.getCleanPath(currentPath);
    const currentLocale = this.detectLocale(currentPath);
    const entries: HreflangEntry[] = [];

    // Get translations
    const translation = this.getPageTranslation(cleanPath);

    if (translation) {
      // Page has both English and Spanish versions
      entries.push(
        { hreflang: 'en', href: `${this.BASE_URL}${translation.en}` },
        { hreflang: 'en-US', href: `${this.BASE_URL}${translation.en}` },
        { hreflang: 'es', href: `${this.BASE_URL}${translation.es}` },
        { hreflang: 'es-US', href: `${this.BASE_URL}${translation.es}` },
        { hreflang: 'es-MX', href: `${this.BASE_URL}${translation.es}` },
        { hreflang: 'x-default', href: `${this.BASE_URL}${translation.en}` }
      );
    } else {
      // Page exists only in current language
      const currentUrl = `${this.BASE_URL}${currentPath}`;

      if (currentLocale === 'en') {
        entries.push(
          { hreflang: 'en', href: currentUrl },
          { hreflang: 'en-US', href: currentUrl },
          { hreflang: 'x-default', href: currentUrl }
        );
      } else {
        entries.push(
          { hreflang: 'es', href: currentUrl },
          { hreflang: 'es-US', href: currentUrl },
          { hreflang: 'es-MX', href: currentUrl }
        );
      }
    }

    return entries;
  }

  /**
   * Generate canonical URL
   */
  public static generateCanonicalUrl(pathname?: string, customPath?: string): string {
    const currentPath = customPath || pathname || '/';
    return `${this.BASE_URL}${currentPath}`;
  }

  /**
   * Generate alternate links metadata for Next.js
   */
  public static generateAlternateLinks(
    pathname?: string,
    customPath?: string
  ): Record<string, string> {
    const entries = this.generateHreflangEntries(pathname, customPath);
    const alternates: Record<string, string> = {};

    entries.forEach(entry => {
      if (entry.hreflang !== 'x-default') {
        alternates[entry.hreflang] = entry.href;
      }
    });

    return alternates;
  }

  /**
   * Generate OpenGraph locale metadata
   */
  public static generateOpenGraphLocales(pathname?: string): {
    locale: string;
    alternateLocale: string[];
  } {
    const currentPath = pathname || '/';
    const currentLocale = this.detectLocale(currentPath);
    const cleanPath = this.getCleanPath(currentPath);
    const translation = this.getPageTranslation(cleanPath);

    const locale = currentLocale === 'es' ? 'es_US' : 'en_US';
    const alternateLocale: string[] = [];

    // Only add alternate locales if the page has translations
    if (translation) {
      if (currentLocale === 'es') {
        alternateLocale.push('en_US');
      } else {
        alternateLocale.push('es_US', 'es_MX');
      }
    }

    return { locale, alternateLocale };
  }
}

/**
 * React component for rendering hreflang tags
 */
export function HreflangTags({ customPath }: HreflangGeneratorProps) {
  const pathname = usePathname();
  const entries = HreflangGenerator.generateHreflangEntries(pathname || '/', customPath);

  // Return link elements for head
  return (
    <>
      {entries.map((entry, index) => (
        <link
          key={`${entry.hreflang}-${index}`}
          rel="alternate"
          hrefLang={entry.hreflang} href={entry.href}
        />
      ))}
    </>
  );
}

/**
 * Hook for generating metadata with hreflang
 */
export function useHreflangMetadata(pathname?: string, customPath?: string): Partial<Metadata> {
  const canonical = HreflangGenerator.generateCanonicalUrl(pathname, customPath);
  const alternates = HreflangGenerator.generateAlternateLinks(pathname, customPath);
  const ogLocales = HreflangGenerator.generateOpenGraphLocales(pathname);

  return {
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
    },
  };
}

/**
 * Specific components for different page types
 */
export function AttorneyHreflangTags({ slug }: { slug: string }) {
  return <HreflangTags customPath={`/attorneys/${slug}`} pageType="attorney" />;
}

export function PracticeAreaHreflangTags({ area, subArea }: { area: string; subArea?: string }) {
  const path = subArea ? `/practice-areas/${area}/${subArea}` : `/practice-areas/${area}`;
  return <HreflangTags customPath={path} pageType="practice-area" />;
}

export function LocationHreflangTags({ location }: { location: string }) {
  return <HreflangTags customPath={`/locations/${location}`} pageType="location" />;
}

export function BlogHreflangTags({ slug }: { slug: string }) {
  return <HreflangTags customPath={`/blog/${slug}`} pageType="blog" />;
}
