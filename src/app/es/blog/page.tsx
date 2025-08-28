import BlogPageClient from '@/app/blog/BlogPageClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Legal | Inmigración, Lesiones Personales y Defensa Criminal | Vasquez Law Firm',
  description:
    'Perspectivas legales expertas e información de Vasquez Law Firm. Manténgase actualizado sobre leyes de inmigración, lesiones personales, defensa criminal y más.',
  keywords:
    'blog legal, ley de inmigración, lesiones personales, defensa criminal, perspectivas legales, artículos de bufete de abogados',
  openGraph: {
    title: 'Blog Legal | Vasquez Law Firm',
    description: 'Perspectivas legales expertas e información de nuestros abogados experimentados.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/es/blog',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Legal de Vasquez Law Firm',
      },
    ],
  },
};

// Full static generation - no revalidation needed

export default function BlogPageSpanish() {
  return <BlogPageClient language="es" />;
}
