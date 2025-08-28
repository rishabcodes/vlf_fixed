import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Raleigh Family Law Attorneys  Charlotte ... | Vasquez Law Firm',
  description:
    'immigration lawyer Charlotte NC services in Charlotte NC. Call 1-844-YO-PELEO for a free consultation with experienced attorneys at Vasquez Law Firm.',
  keywords:
    'immigration lawyer Charlotte NC, immigration attorney near me, visa lawyer Charlotte, green card attorney, deportation defense lawyer, citizenship attorney Charlotte, DACA lawyer NC, asylum attorney, family immigration lawyer, work visa attorney Charlotte',
  openGraph: {
    title: 'Raleigh Family Law Attorneys  Charlotte ... | Vasquez Law Firm',
    description:
      'immigration lawyer Charlotte NC services in Charlotte NC. Call 1-844-YO-PELEO for a free consultation with experienced attorneys at Vasquez Law Firm.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Vasquez Law Firm',
  },
};

export default function FamilyLawPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'family-law',
    title: 'Raleigh Family Law Attorneys',
    slug: 'family-law',
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
      name: { en: 'Immigration Law', es: 'Ley de Immigration' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Personal Injury' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Criminal Defense' },
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
