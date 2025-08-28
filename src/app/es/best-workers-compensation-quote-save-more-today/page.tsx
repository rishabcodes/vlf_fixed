import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Best Compensación Laboral Quote: Save More Today - Vasquez Law Firm, PLLC',
  description:
    'Find the best workers compensation quote with expert tips. Save money, get full coverage, and protect your employees without overpaying.',
  openGraph: {
    title: 'Best Compensación Laboral Quote: Save More Today - Vasquez Law Firm, PLLC',
    description:
      'Find the best workers compensation quote with expert tips. Save money, get full coverage, and protect your employees without overpaying.',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/03/How-to-Get-the-Best-Workers-Compensation-Quote-for-Maximum-Benefits.jpg',
      },
    ],
  },
};

export default function BestWorkersCompensationQuoteSaveMoreTodayPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'best-workers-compensation-quote-save-more-today',
    title: 'How to Get the Best Compensación Laboral Quote for Maximum Benefits',
    slug: 'best-workers-compensation-quote-save-more-today',
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
      name: { en: 'Inmigración Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Lesiones Personales', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Defensa Criminal', es: 'Defensa Criminal' },
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
