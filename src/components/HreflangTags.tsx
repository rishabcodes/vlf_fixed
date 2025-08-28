import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface HreflangTagsProps {
  currentLanguage: 'en' | 'es';
  baseUrl?: string;
}

export const HreflangTags: React.FC<HreflangTagsProps> = ({
  currentLanguage,
  baseUrl = 'https://www.vasquezlawnc.com',
}) => {
  const pathname = usePathname();

  // Remove language prefix from pathname
  let cleanPath = pathname || '/';
  if (pathname?.startsWith('/es/')) {
    cleanPath = pathname.slice(3) || '/';
  } else if (pathname?.startsWith('/en/')) {
    cleanPath = pathname.slice(3) || '/';
  }

  // Generate URLs for each language
  const enUrl = `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
  const esUrl = `${baseUrl}/es${cleanPath === '/' ? '' : cleanPath}`;

  // Check if Spanish version exists (in production, this would be more sophisticated)
  const spanishPageExists = checkIfSpanishPageExists(cleanPath || '/');

  return (
    <Head>
      {/* Hreflang tags for language alternatives */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      {spanishPageExists && <link rel="alternate" hrefLang="es" href={esUrl} />}
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentLanguage === 'es' ? esUrl : enUrl} />

      {/* Language meta tag */}
      <meta httpEquiv="content-language" content={currentLanguage} />
      <meta property="og:locale" content={currentLanguage === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:locale:alternate" content={currentLanguage === 'es' ? 'en_US' : 'es_ES'} />
    </Head>
  );
};

// Helper function to check if Spanish page exists
function checkIfSpanishPageExists(path: string): boolean {
  // This is a simplified version. In production, you'd have a more comprehensive list
  // or check against the file system
  const existingSpanishPages = [
    '/',
    '/areas-de-practica',
    '/areas-de-practica/inmigracion',
    '/areas-de-practica/lesiones-personales',
    '/areas-de-practica/compensacion-laboral',
    '/areas-de-practica/defensa-criminal',
    '/areas-de-practica/derecho-familia',
    '/abogados',
    '/contacto',
    '/blog',
  ];

  return existingSpanishPages.includes(path);
}

export default HreflangTags;
