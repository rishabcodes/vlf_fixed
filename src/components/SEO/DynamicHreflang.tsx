'use client';

import { usePathname } from 'next/navigation';
import { logger } from '@/lib/safe-logger';
import { useEffect } from 'react';
import { HreflangGenerator } from './HreflangGenerator';

interface DynamicHreflangProps {
  customPath?: string;
  pageType?: 'home' | 'attorney' | 'practice-area' | 'location' | 'blog' | 'general';
}

/**
 * Dynamic component that automatically adds hreflang tags to the page head
 * This component should be included in layouts or pages that need hreflang support
 */
export function DynamicHreflang({ customPath }: DynamicHreflangProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Handle null pathname
    const safePathname = pathname || '/';

    // Remove any existing hreflang tags added by this component
    const existingTags = document.querySelectorAll(
      'link[rel="alternate"][data-dynamic-hreflang="true"]'
    );
    existingTags.forEach(tag => {
      // Use safe removal to prevent null reference errors
      try {
        if (tag && tag.parentNode && document.contains(tag)) {
          tag.remove();
        }
      } catch (error) {
        logger.warn('Failed to remove hreflang tag:', error);
      }
    });

    // Generate new hreflang entries
    const entries = HreflangGenerator.generateHreflangEntries(safePathname, customPath);

    // Add new hreflang tags to the document head
    entries.forEach(entry => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = entry.hreflang;
      link.href = entry.href;
      link.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(link);
    });

    // Add canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = HreflangGenerator.generateCanonicalUrl(safePathname, customPath);

    // Update OpenGraph locale meta tags
    const ogLocales = HreflangGenerator.generateOpenGraphLocales(safePathname);

    // Update or create og:locale
    let ogLocaleTag = document.querySelector('meta[property="og:locale"]') as HTMLMetaElement;
    if (!ogLocaleTag) {
      ogLocaleTag = document.createElement('meta');
      ogLocaleTag.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocaleTag);
    }
    ogLocaleTag.content = ogLocales.locale;

    // Remove existing og:locale:alternate tags
    const existingOgAlternates = document.querySelectorAll('meta[property="og:locale:alternate"]');
    existingOgAlternates.forEach(tag => {
      // Use safe removal to prevent null reference errors
      try {
        if (tag && tag.parentNode && document.contains(tag)) {
          tag.remove();
        }
      } catch (error) {
        logger.warn('Failed to remove og:locale:alternate tag:', error);
      }
    });

    // Add new og:locale:alternate tags
    ogLocales.alternateLocale.forEach(locale => {
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('property', 'og:locale:alternate');
      metaTag.content = locale;
      document.head.appendChild(metaTag);
    });

    // Cleanup function to remove tags when component unmounts
    return () => {
      const tagsToRemove = document.querySelectorAll(
        'link[rel="alternate"][data-dynamic-hreflang="true"]'
      );
      tagsToRemove.forEach(tag => {
        // Use safe removal to prevent null reference errors
        try {
          if (tag && tag.parentNode && document.contains(tag)) {
            tag.remove();
          }
        } catch (error) {
          logger.warn('Failed to remove hreflang tag during cleanup:', error);
        }
      });
    };
  }, [pathname, customPath]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Static server-side component for generating hreflang metadata
 * Use this in metadata generation functions
 */
export function generatePageHreflangMetadata(pathname: string, customPath?: string) {
  const entries = HreflangGenerator.generateHreflangEntries(pathname, customPath);
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
    other: {
      // Add hreflang links as additional metadata
      ...entries.reduce(
        (acc, entry, index) => {
          acc[`hreflang-${entry.hreflang}-${index}`] = entry.href;
          return acc;
        },
        {} as Record<string, string>
      ),
    },
  };
}

/**
 * Helper component for specific page types with predefined paths
 */
export function AttorneyPageHreflang({ slug }: { slug: string }) {
  return <DynamicHreflang customPath={`/attorneys/${slug}`} pageType="attorney" />;
}

export function PracticeAreaPageHreflang({ area, subArea }: { area: string; subArea?: string }) {
  const path = subArea ? `/practice-areas/${area}/${subArea}` : `/practice-areas/${area}`;
  return <DynamicHreflang customPath={path} pageType="practice-area" />;
}

export function LocationPageHreflang({ location }: { location: string }) {
  return <DynamicHreflang customPath={`/locations/${location}`} pageType="location" />;
}

export function BlogPageHreflang({ slug }: { slug: string }) {
  return <DynamicHreflang customPath={`/blog/${slug}`} pageType="blog" />;
}

/**
 * Utility function to check if a page has Spanish translation
 */
export function hasSpanishVersion(pathname: string): boolean {
  const entries = HreflangGenerator.generateHreflangEntries(pathname);
  return entries.some(entry => entry.hreflang.startsWith('es'));
}

/**
 * Utility function to get the Spanish URL for a given English page
 */
export function getSpanishUrl(englishPath: string): string | null {
  const entries = HreflangGenerator.generateHreflangEntries(englishPath);
  const spanishEntry = entries.find(entry => entry.hreflang === 'es');
  return spanishEntry ? spanishEntry.href : null;
}

/**
 * Utility function to get the English URL for a given Spanish page
 */
export function getEnglishUrl(spanishPath: string): string | null {
  const entries = HreflangGenerator.generateHreflangEntries(spanishPath);
  const englishEntry = entries.find(entry => entry.hreflang === 'en');
  return englishEntry ? englishEntry.href : null;
}
