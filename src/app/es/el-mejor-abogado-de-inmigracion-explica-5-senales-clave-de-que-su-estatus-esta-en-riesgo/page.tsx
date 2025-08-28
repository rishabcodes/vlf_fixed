import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'El Mejor Abogado de Inmigración Explica 5 Señales Clave de Que Su Estatus Está en Riesgo - Vasquez Law Firm, PLLC',
  description:
    'Descubra 5 señales críticas que pueden amenazar su estatus migratorio. Consulte hoy con un abogado de inmigración asequible para asegurar su futuro legal.',
  openGraph: {
    title:
      'El Mejor Abogado de Inmigración Explica 5 Señales Clave de Que Su Estatus Está en Riesgo - Vasquez Law Firm, PLLC',
    description:
      'Descubra 5 señales críticas que pueden amenazar su estatus migratorio. Consulte hoy con un abogado de inmigración asequible para asegurar su futuro legal.',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/01/El-Mejor-Abogado-de-Inmigracion-2.jpg',
      },
    ],
  },
};

export default function ElMejorAbogadoDeInmigracionExplica5SenalesClaveDeQueSuEstatusEstaEnRiesgoPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'el-mejor-abogado-de-inmigracion-explica-5-senales-clave-de-que-su-estatus-esta-en-riesgo',
    title:
      'El Mejor Abogado de Inmigración Explica 5 Señales Clave de Que Su Estatus Está en Riesgo',
    slug: 'el-mejor-abogado-de-inmigracion-explica-5-senales-clave-de-que-su-estatus-esta-en-riesgo',
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
