import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'When Is Consular Processing Required for Immigrants to the U.S.? - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title:
      'When Is Consular Processing Required for Immigrants to the U.S.? - Vasquez Law Firm, PLLC',
    description:
      'For people who wish to immigrate to the United States, there are several paths that can be taken. One common method is through a process known as consular processing. This refers to the process by which immigrants obtain their immigrant visas at a U.S. embassy or consulate in their home country before entering the United States. An experienced immigration attorney can provide guidance to people who are applying for visas and Green Cards, helping them complete the application process and ensuring that they will be prepared for consular processing and receive authorization to come to the U.S. Who Needs to Go Through Consular Processing? Consular processing is typically required for two main categories of immigrants: Family-based immigrants: A family member of a U.S. citizen or a lawful permanent resident (Green Card holder) may be eligible for an immigrant visa through family sponsorship. In cases where the immigrant is currently living in a country other than the United States, consular processing will be necessary. Employment-based immigrants: Immigrants who are planning to come to the United States after receiving sponsorship from an employer may apply for different types of visas. If they are located outside the U.S., they can complete consular processing and receive authorization to enter […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock-1812113506-1-2.jpg',
      },
    ],
  },
};

export default function WhenIsConsularProcessingRequiredForImmigrantsToTheUS2Page() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'when-is-consular-processing-required-for-immigrants-to-the-u-s-2',
    title:
      'When Is Consular Processing Required for Immigrants to the U.S.? - Vasquez Law Firm, PLLC',
    slug: 'when-is-consular-processing-required-for-immigrants-to-the-u-s-2',
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
