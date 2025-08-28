import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Cómo Construí un Negocio de Seis Cifras en 12 Meses como Inmigrante de Primera Generación - Vasquez Law Firm, PLLC',
  description:
    'Descubre cómo construí un negocio de seis cifras en 12 meses como inmigrante de primera generación. Consejos y estrategias de expertos para lograr el éxito empresarial en un nuevo país.',
  openGraph: {
    title:
      'Cómo Construí un Negocio de Seis Cifras en 12 Meses como Inmigrante de Primera Generación - Vasquez Law Firm, PLLC',
    description:
      'Descubre cómo construí un negocio de seis cifras en 12 meses como inmigrante de primera generación. Consejos y estrategias de expertos para lograr el éxito empresarial en un nuevo país.',
    images: [{ url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/01/10-1.jpg' }],
  },
};

export default function ComoConstruiUnNegocioDeSeisCifrasEn12MesesComoInmigranteDePrimeraGeneracionPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'como-construi-un-negocio-de-seis-cifras-en-12-meses-como-inmigrante-de-primera-generacion',
    title:
      'Cómo Construí un Negocio de Seis Cifras en 12 Meses como Inmigrante de Primera Generación',
    slug: 'como-construi-un-negocio-de-seis-cifras-en-12-meses-como-inmigrante-de-primera-generacion',
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
