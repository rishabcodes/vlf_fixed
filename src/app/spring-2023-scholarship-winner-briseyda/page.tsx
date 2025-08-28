import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Spring 2023 Scholarship Winner Briseyda - Vasquez Law Firm, PLLC',
  description:
    'Briseyda Bautista Gonzalez is the Spring 2023 DACA Dreamer Scholarship winner from Vasquez Law Firm, recognized for her educational aspirations and dedication.',
  openGraph: {
    title: 'Spring 2023 Scholarship Winner Briseyda - Vasquez Law Firm, PLLC',
    description:
      'Briseyda Bautista Gonzalez is the Spring 2023 DACA Dreamer Scholarship winner from Vasquez Law Firm, recognized for her educational aspirations and dedication.',
    images: [{ url: '/images/og-default.jpg' }],
  },
};

export default function Spring2023ScholarshipWinnerBriseydaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'spring-2023-scholarship-winner-briseyda',
    title: 'The Vasquez Law Firm DACA Dreamer Scholarship Winner',
    slug: 'spring-2023-scholarship-winner-briseyda',
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
