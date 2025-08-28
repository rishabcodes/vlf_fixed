// Server-side hreflang utilities for metadata generation

interface HreflangEntry {
  hreflang: string;
  href: string;
}

interface PageTranslation {
  en: string;
  es: string;
}

export class HreflangUtils {
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
  };

  // Attorney slugs that have bilingual support
  private static readonly BILINGUAL_ATTORNEYS = ['william-vasquez'];

  // Locations that have bilingual support
  private static readonly BILINGUAL_LOCATIONS = [
    'smithfield',
    'charlotte',
    'raleigh',
    'orlando',
    'miami',
    'jacksonville',
    'durham',
    'greensboro',
    'winston-salem',
    'cary',
    'fayetteville',
    'tampa',
    'hialeah',
    'pembroke-pines',
    'fort-lauderdale',
    'tallahassee',
    'gainesville',
    'lakeland',
    'palm-bay',
    'port-st-lucie',
    'cape-coral',
    'clearwater',
    'spring-hill',
  ];

  /**
   * Generate canonical URL for a given pathname
   */
  static generateCanonicalUrl(pathname: string, customPath?: string): string {
    // Use custom path if provided
    if (customPath) {
      return `${this.BASE_URL}${customPath}`;
    }

    // Remove trailing slashes except for home page
    const cleanPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
    return `${this.BASE_URL}${cleanPath}`;
  }

  /**
   * Generate alternate language links for a given pathname
   */
  static generateAlternateLinks(pathname: string, customPath?: string): Record<string, string> {
    const entries = this.generateHreflangEntries(pathname, customPath);
    const alternates: Record<string, string> = {};

    entries.forEach(entry => {
      const langCode = entry.hreflang.split('-')[0]; // Extract 'en' or 'es' from 'en-US' or 'es-MX'
      if (langCode) {
        alternates[langCode] = entry.href;
      }
    });

    return alternates;
  }

  /**
   * Generate OpenGraph locale information
   */
  static generateOpenGraphLocales(pathname: string): { locale: string; alternateLocale: string[] } {
    const isSpanish = pathname.startsWith('/es');

    return {
      locale: isSpanish ? 'es_MX' : 'en_US',
      alternateLocale: isSpanish ? ['en_US'] : ['es_MX'],
    };
  }

  /**
   * Generate hreflang entries for a given pathname
   */
  static generateHreflangEntries(pathname: string, customPath?: string): HreflangEntry[] {
    const entries: HreflangEntry[] = [];

    // Check if it's a known translated page
    const translation = this.PAGE_TRANSLATIONS[pathname];
    if (translation) {
      entries.push(
        { hreflang: 'en-US', href: `${this.BASE_URL}${translation.en}` },
        { hreflang: 'es-MX', href: `${this.BASE_URL}${translation.es}` },
        { hreflang: 'x-default', href: `${this.BASE_URL}${translation.en}` }
      );
      return entries;
    }

    // Check if it's an attorney page
    if (pathname.startsWith('/attorneys/') || pathname.startsWith('/es/abogados/')) {
      const attorneySlug = pathname.split('/').pop() || '';

      if (this.BILINGUAL_ATTORNEYS.includes(attorneySlug)) {
        entries.push(
          { hreflang: 'en-US', href: `${this.BASE_URL}/attorneys/${attorneySlug}` },
          { hreflang: 'es-MX', href: `${this.BASE_URL}/es/abogados/${attorneySlug}` },
          { hreflang: 'x-default', href: `${this.BASE_URL}/attorneys/${attorneySlug}` }
        );
        return entries;
      }
    }

    // Check if it's a location page
    if (pathname.includes('/locations/')) {
      const parts = pathname.split('/');
      const stateOrCity = parts[parts.length - 1];

      if (stateOrCity && this.BILINGUAL_LOCATIONS.includes(stateOrCity)) {
        if (parts.length === 3) {
          // City page
          entries.push(
            { hreflang: 'en-US', href: `${this.BASE_URL}/locations/${stateOrCity}` },
            { hreflang: 'es-MX', href: `${this.BASE_URL}/es/ubicaciones/${stateOrCity}` },
            { hreflang: 'x-default', href: `${this.BASE_URL}/locations/${stateOrCity}` }
          );
        } else if (parts.length === 4) {
          // State/City page
          const state = parts[2];
          entries.push(
            { hreflang: 'en-US', href: `${this.BASE_URL}/locations/${state}/${stateOrCity}` },
            { hreflang: 'es-MX', href: `${this.BASE_URL}/es/ubicaciones/${state}/${stateOrCity}` },
            { hreflang: 'x-default', href: `${this.BASE_URL}/locations/${state}/${stateOrCity}` }
          );
        }
        return entries;
      }
    }

    // If no translation exists, return current page only
    const currentLocale = pathname.startsWith('/es') ? 'es-MX' : 'en-US';
    entries.push({
      hreflang: currentLocale,
      href: `${this.BASE_URL}${pathname}`,
    });

    // Add x-default for English pages
    if (currentLocale === 'en-US') {
      entries.push({
        hreflang: 'x-default',
        href: `${this.BASE_URL}${pathname}`,
      });
    }

    return entries;
  }
}
