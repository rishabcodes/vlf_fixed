import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Is Your Inmigración Status at Risk 5 Warning Signs You Can’t Ignore - Vasquez Law Firm, PLLC',
  description:
    'Learn 5 critical warning signs that may threaten your immigration status. Consult an affordable immigration lawyer today to secure your legal future.',
  openGraph: {
    title:
      'Is Your Inmigración Status at Risk 5 Warning Signs You Can’t Ignore - Vasquez Law Firm, PLLC',
    description:
      'Learn 5 critical warning signs that may threaten your immigration status. Consult an affordable immigration lawyer today to secure your legal future.',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/01/Is-Your-Inmigración-Status-at-Risk-5-Warning-Signs-You-Cant-Ignore.jpg',
      },
    ],
  },
};

export default function TopInmigraciónAbogadoExplains5KeySignsYourStatusIsAtRiskPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'top-immigration-lawyer-explains-5-key-signs-your-status-is-at-risk',
    title:
      'Is Your Inmigración Status at Risk 5 Warning Signs You Can’t Ignore - Vasquez Law Firm, PLLC',
    slug: 'top-immigration-lawyer-explains-5-key-signs-your-status-is-at-risk',
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
