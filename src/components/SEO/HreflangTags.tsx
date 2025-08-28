'use client';

import Head from 'next/head';

interface HreflangTagsProps {
  currentPath: string;
  currentLocale?: string;
  availableLocales?: Array<{
    locale: string;
    label: string;
  }>;
}

export function HreflangTags({
  currentPath,
  availableLocales = [
    { locale: 'en', label: 'English' },
    { locale: 'es', label: 'Español' },
  ],
}: HreflangTagsProps) {
  const baseUrl = 'https://www.vasquezlawnc.com';

  // Remove locale prefix from path if present
  const cleanPath = currentPath.replace(/^\/(en|es)/, '');

  return (
    <Head>
      {/* Generate hreflang tags for each locale */}
      {availableLocales.map(({ locale }) => {
        const localePath = locale === 'en' ? cleanPath : `/${locale}${cleanPath}`;
        const href = `${baseUrl}${localePath}`;

        return <link key={locale} rel="alternate" hrefLang={locale} href={href} />;
      })}

      {/* x-default hreflang for unmatched languages */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${cleanPath}`} />
    </Head>
  );
}

// Helper component for specific page types
export function LocationHreflangTags({ city, state }: { city: string; state: string }) {
  const locationSlug = `${city.toLowerCase().replace(/\s+/g, '-')}-${state.toLowerCase()}`;

  return (
    <HreflangTags
      currentPath={`/locations/${locationSlug}`}
      availableLocales={[
        { locale: 'en', label: 'English' },
        { locale: 'es', label: 'Español' },
      ]}
    />
  );
}

export function AttorneyHreflangTags({ slug }: { slug: string }) {
  return (
    <HreflangTags
      currentPath={`/attorneys/${slug}`}
      availableLocales={[
        { locale: 'en', label: 'English' },
        { locale: 'es', label: 'Español' },
      ]}
    />
  );
}

export function PracticeAreaHreflangTags({ area }: { area: string }) {
  return (
    <HreflangTags
      currentPath={`/practice-areas/${area}`}
      availableLocales={[
        { locale: 'en', label: 'English' },
        { locale: 'es', label: 'Español' },
      ]}
    />
  );
}
