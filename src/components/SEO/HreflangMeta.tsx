import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface HreflangMetaProps {
  currentLanguage?: 'en' | 'es';
}

export const HreflangMeta: React.FC<HreflangMetaProps> = ({ currentLanguage }) => {
  const pathname = usePathname();
  const baseUrl = 'https://www.vasquezlawnc.com';

  // Determine current language from pathname if not provided
  const lang = currentLanguage || (pathname?.startsWith('/es') ? 'es' : 'en');

  // Generate alternate URLs
  const getAlternateUrl = (targetLang: 'en' | 'es') => {
    let cleanPath = pathname || '/';

    // Remove existing language prefix
    if (pathname?.startsWith('/es/')) {
      cleanPath = pathname.slice(3) || '/';
    } else if (pathname?.startsWith('/en/')) {
      cleanPath = pathname.slice(3) || '/';
    }

    // Add language prefix for Spanish
    if (targetLang === 'es') {
      return `${baseUrl}/es${cleanPath === '/' ? '' : cleanPath}`;
    }

    // English URLs don\'t have prefix
    return `${baseUrl}${cleanPath}`;
  };

  const currentUrl = `${baseUrl}${pathname}`;
  const enUrl = getAlternateUrl('en');
  const esUrl = getAlternateUrl('es');

  return (
    <Head>
      {/* Current page language */}
      <link rel="alternate" hrefLang={lang} href={currentUrl} />

      {/* English version */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="en-US" href={enUrl} />

      {/* Spanish version */}
      <link rel="alternate" hrefLang="es" href={esUrl} />
      <link rel="alternate" hrefLang="es-ES" href={esUrl} />
      <link rel="alternate" hrefLang="es-MX" href={esUrl} />

      {/* x-default for language selection page or fallback */}
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Open Graph locale tags */}
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'es' ? 'en_US' : 'es_ES'} />
    </Head>
  );
};
