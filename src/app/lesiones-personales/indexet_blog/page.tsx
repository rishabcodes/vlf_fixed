import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Raleigh, NC Personal Injury Attorneys - Vasquez Law Firm, PLLC',
  description:
    'Injured due to negligence? Raleigh, NC personal injury attorneys fight for your rights and maximum compensation. Get a free consultation today.',
  openGraph: {
    title: 'Raleigh, NC Personal Injury Attorneys - Vasquez Law Firm, PLLC',
    description:
      'Injured due to negligence? Raleigh, NC personal injury attorneys fight for your rights and maximum compensation. Get a free consultation today.',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/04/mecklenburg-county-personal-injury-accident-lawyers.jpg',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function IndexetBlogPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'indexet_blog',
    title: 'Raleigh, NC Personal Injury Attorneys',
    slug: 'indexet_blog',
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
