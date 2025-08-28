import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'What Are the Eligibility Requirements for Fiancé Visas? - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'What Are the Eligibility Requirements for Fiancé Visas? - Vasquez Law Firm, PLLC',
    description:
      'For many immigrants, the United States represents a place of opportunity and the ability to be together with their loved ones. The visa system in the U.S. provides a number of ways that people from other countries can receive authorization to enter the country and live here permanently. One such visa is the fiancé visa, or K-1 nonimmigrant visa, which may be available for a foreign citizen who wishes to marry a U.S. citizen. If you are thinking about applying for a fiancé visa, it is important to understand all the eligibility requirements that will apply to both the immigrant fiancé and the U.S. citizen sponsor. Eligible Relationship Status The first requirement for eligibility for a fiancé visa is that the couple must be legally able to get married after the foreign citizen enters the United States. This means that both partners must meet all legal requirements for marriage in the state where the marriage will take place. That is, they must meet the applicable age requirements, and they must not be currently married. If they had been married in the past, they will need to show that the marriage has been legally terminated, which may be done by providing a […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1577155054.jpg',
      },
    ],
  },
};

export default function WhatAreTheEligibilityRequirementsForFianceVisasPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'what-are-the-eligibility-requirements-for-fiance-visas',
    title: 'What Are the Eligibility Requirements for Fiancé Visas?',
    slug: 'what-are-the-eligibility-requirements-for-fiance-visas',
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
