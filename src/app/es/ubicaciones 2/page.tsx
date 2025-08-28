import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Ubicaciones - Bufete de Abogados Vasquez | Servicios Legales en NC y FL',
  description:
    'Visite nuestras 4 convenientes ubicaciones en Carolina del Norte y Florida. Smithfield, Raleigh, Charlotte y Orlando con personal bilingüe listo para servirle.',
  keywords:
    'Ubicaciones Bufete de Abogados Vasquez, oficinas legales NC, oficinas legales FL, oficinas abogado de inmigración, ubicaciones abogado de lesiones personales, bufete bilingüe',
  openGraph: {
    title: 'Ubicaciones - Bufete de Abogados Vasquez | Servicios Legales en NC y FL',
    description:
      '4 ubicaciones convenientes en NC y FL. Estacionamiento gratuito, accesible para sillas de ruedas, personal bilingüe. Programe su consulta hoy.',
    images: [{ url: '/images/locations-hero.jpg' }],
  },
};

export const runtime = 'nodejs';

export default function UbicacionesPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'ubicaciones',
    title: 'Ubicaciones',
    slug: 'ubicaciones',
    excerpt: 'Blog post excerpt here - TODO: extract from content',
    content: `
      <div class="prose prose-lg max-w-none">
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
