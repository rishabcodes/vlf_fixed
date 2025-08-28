import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'What Is a Conditional Green Card? - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'What Is a Conditional Green Card? - Vasquez Law Firm, PLLC',
    description:
      'When a person from another country immigrates to the United States, their goal will usually be to receive a Green Card, which will give them lawful permanent resident status. This will ensure that they can continue living in the country and earning an income, while also allowing them to travel freely and potentially even sponsor other family members for immigration. In some cases, a person may receive a conditional Green Card that will only be valid for a limited amount of time Conditional Green Cards are typically issued to foreign nationals who have been married to U.S. citizens for less than two years at the time they are granted lawful permanent resident status. Before a conditional Green Card expires, an immigrant and their spouse will need to take steps to receive a permanent Green Card. For those who need to address issues related to conditional or permanent Green Cards, an experienced immigration attorney can provide invaluable guidance and legal assistance. Why Are There Conditional Green Cards? The purpose of issuing conditional Green Cards is to help prevent immigration fraud. The U.S. government wants to ensure that people do not get married solely for immigration purposes and as a means to obtain lawful permanent resident […]',
    images: [
      { url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/immigrant-marriage.jpg' },
    ],
  },
};

export default function WhatIsAConditionalGreenCardPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'what-is-a-conditional-green-card',
    title: 'What Is a Conditional Green Card?',
    slug: 'what-is-a-conditional-green-card',
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
