import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    '7 Estrategias Comprobadas que los Abogados de Inmigración Usan para Ganar Casos Complejos - Vasquez Law Firm, PLLC',
  description:
    'Descubre cómo los abogados de inmigración expertos pueden simplificar tu proceso, evitar errores costosos y ayudarte a reunirte con tus seres queridos. ¡Obtén apoyo profesional hoy!',
  openGraph: {
    title:
      '7 Estrategias Comprobadas que los Abogados de Inmigración Usan para Ganar Casos Complejos - Vasquez Law Firm, PLLC',
    description:
      'Descubre cómo los abogados de inmigración expertos pueden simplificar tu proceso, evitar errores costosos y ayudarte a reunirte con tus seres queridos. ¡Obtén apoyo profesional hoy!',
    images: [{ url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/01/9.jpg' }],
  },
};

export default function EstrategiasComprobadasQueLosAbogadosDeInmigracionUsanParaGanarCasosComplejosPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: '7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos',
    title:
      '7 Estrategias Comprobadas que los Abogados de Inmigración Usan para Ganar Casos Complejos',
    slug: '7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos',
    excerpt: 'Blog post excerpt here - TODO: extract from content',
    content: `
      <div className="prose prose-lg max-w-none">
        <!-- TODO: Migrate content from original file -->
        <p>This content needs to be migrated from the original file.</p>
      </div>
    `,
    practiceArea: 'general', // TODO: Determine correct practice area
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 5,
    author: DEFAULT_BLOG_AUTHOR,
    tags: [], // TODO: Add relevant tags
  };

  const categories = [
    {
      id: 'immigration',
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
  ];

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={[]} // TODO: Add related posts
    />
  );
}
