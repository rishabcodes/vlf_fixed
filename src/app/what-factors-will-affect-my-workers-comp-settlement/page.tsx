import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'What Factors Will Affect My Worker’s Comp Settlement? | Vasquez Law Firm, PLLC',
  description:
    'Learn the key factors that influence your workers’ comp settlement, including injury severity, medical costs, lost wages, and insurance negotiations.',
  openGraph: {
    title: 'What Factors Will Affect My Worker’s Comp Settlement? | Vasquez Law Firm, PLLC',
    description:
      'Learn the key factors that influence your workers’ comp settlement, including injury severity, medical costs, lost wages, and insurance negotiations.',
    images: [
      {
        url: '../wp-content/uploads/2024/12/what-factors-will-affect-my-workers-comp-settlement-scaled.jpg',
      },
    ],
  },
};

export default function WhatFactorsWillAffectMyWorkersCompSettlementPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'what-factors-will-affect-my-workers-comp-settlement',
    title: 'What Factors Will Affect My Worker’s Comp Settlement? | Vasquez Law Firm, PLLC',
    slug: 'what-factors-will-affect-my-workers-comp-settlement',
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
