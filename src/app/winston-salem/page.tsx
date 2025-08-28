import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Winston-Salem, NC - Vasquez Law Firm, PLLC',
  description:
    'Explore Winston-Salem, NC – a vibrant city rich in history, arts, and culture. Discover local attractions, dining, and outdoor adventures today!',
  openGraph: {
    title: 'Winston-Salem, NC - Vasquez Law Firm, PLLC',
    description:
      'Explore Winston-Salem, NC – a vibrant city rich in history, arts, and culture. Discover local attractions, dining, and outdoor adventures today!',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/04/wake-county-family-based-immigration-lawyers.jpg',
      },
    ],
  },
};

export default function WinstonSalemPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'winston-salem',
    title: 'Winston-Salem, NC',
    slug: 'winston-salem',
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
