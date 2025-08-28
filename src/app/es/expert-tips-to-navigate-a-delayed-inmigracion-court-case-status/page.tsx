import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Expert Tips to Navigate a Delayed Inmigración Court Case Status - Vasquez Law Firm, PLLC',
  description:
    'Discover expert tips for managing delays in your immigration court case status. Stay informed and avoid setbacks to keep your immigration journey on track.',
  openGraph: {
    title:
      'Expert Tips to Navigate a Delayed Inmigración Court Case Status - Vasquez Law Firm, PLLC',
    description:
      'Discover expert tips for managing delays in your immigration court case status. Stay informed and avoid setbacks to keep your immigration journey on track.',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/01/Expert-Tips-to-Navigate-a-Delayed-Inmigración-Court-Case-Status.jpg',
      },
    ],
  },
};

export default function ExpertTipsToNavigateADelayedInmigraciónCourtCaseStatusPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'expert-tips-to-navigate-a-delayed-immigration-court-case-status',
    title:
      'Expert Tips to Navigate a Delayed Inmigración Court Case Status - Vasquez Law Firm, PLLC',
    slug: 'expert-tips-to-navigate-a-delayed-immigration-court-case-status',
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
