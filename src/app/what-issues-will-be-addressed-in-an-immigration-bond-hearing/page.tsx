import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'What Issues Will Be Addressed in an Immigration Bond Hearing? - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'What Issues Will Be Addressed in an Immigration Bond Hearing? - Vasquez Law Firm, PLLC',
    description:
      'Resettling in another country can be difficult for anyone, and immigrants to the United States may face a number of challenges and legal complications. In some cases, immigrants may be detained by immigration officials during deportation proceedings. Being held in detention can cause significant difficulties for immigrants and their family members. Fortunately, immigrants may be able to be released from detention during their deportation case by paying an immigration bond. When an immigration bond is requested, a bond hearing will be held. It is important for immigrants to understand what to expect during these hearings and what issues may arise. Understanding Immigration Bonds Immigration bonds function similarly to bail bonds in criminal cases. The bond is a sum of money paid by the individual or a third party, and it will allow an immigrant to be temporarily released from detention while they await a final decision in their case. This amount is meant to ensure that the person will appear at all future hearings and meet any other requirements put in place by an immigration judge. The bond will be returned at the conclusion of the case, as long as the immigrant has complied with all conditions set by the immigration judge. Considerations in Immigration Bond Hearings During […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_535572565-min.jpg',
      },
    ],
  },
};

export default function WhatIssuesWillBeAddressedInAnImmigrationBondHearingPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'what-issues-will-be-addressed-in-an-immigration-bond-hearing',
    title: 'What Issues Will Be Addressed in an Immigration Bond Hearing?',
    slug: 'what-issues-will-be-addressed-in-an-immigration-bond-hearing',
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
