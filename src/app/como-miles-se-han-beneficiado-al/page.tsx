import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Cómo Miles se Han Beneficiado al - Vasquez Law Firm, PLLC',
  description:
    'Descubre cómo miles se han beneficiado al entender la diferencia entre emigrar e inmigrar. ¡Toma una decisión informada sobre tu futuro hoy mismo!',
  openGraph: {
    title: 'Cómo Miles se Han Beneficiado al - Vasquez Law Firm, PLLC',
    description:
      'Descubre cómo miles se han beneficiado al entender la diferencia entre emigrar e inmigrar. ¡Toma una decisión informada sobre tu futuro hoy mismo!',
    images: [{ url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/02/12-1.jpg' }],
  },
};

export default function ComoMilesSeHanBeneficiadoAlPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'como-miles-se-han-beneficiado-al',
    title: 'El Impacto de Tomar una Decisión Informada',
    slug: 'como-miles-se-han-beneficiado-al',
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
