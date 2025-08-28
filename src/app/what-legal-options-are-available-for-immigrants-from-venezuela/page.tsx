import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'What Legal Options Are Available for Immigrants From Venezuela? - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title:
      'What Legal Options Are Available for Immigrants From Venezuela? - Vasquez Law Firm, PLLC',
    description:
      'Venezuela has been facing a severe political and economic crisis in recent years, leading many Venezuelans to seek refuge in other countries, including the United States. For immigrants from Venezuela who are currently in the U.S., it is important to understand the legal options available to them. Immigrants may need to determine their options for defending against deportation, as well as the steps they can take to maintain a legal status in the United States and receive work authorization. An attorney with experience in immigration law can provide guidance to Venezuelans, helping them understand how they can address the legal issues that may affect their immigration status. The End of Deferred Enforced Departure (DED) Deferred Enforced Departure (DED) is a temporary status granted by executive action that allows immigrants from certain designated countries to remain in the United States temporarily without fear of deportation. In 2021, President Donald Trump issued a memo granting DED to certain Venezuelan immigrants. However, this DED status expired on July 20, 2022. The Resumption of Deportations Even after the expiration of DED, the United States did not perform deportations for Venezuelan immigrants due to diplomatic tensions between Venezuela and the U.S. Because deportation flights to Venezuela were unavailable, many Venezuelan immigrants […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/02/Untitled-2023-11-16T140341.659.jpg',
      },
    ],
  },
};

export default function WhatLegalOptionsAreAvailableForImmigrantsFromVenezuelaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'what-legal-options-are-available-for-immigrants-from-venezuela',
    title:
      'What Legal Options Are Available for Immigrants From Venezuela? - Vasquez Law Firm, PLLC',
    slug: 'what-legal-options-are-available-for-immigrants-from-venezuela',
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
