import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'How Can Drug Charges Impact Immigration Status? - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'How Can Drug Charges Impact Immigration Status? - Vasquez Law Firm, PLLC',
    description:
      'Every year, thousands of people are deported from the United States because of drug charges. This policy can be harmful to families because it often separates people from their nuclear family, leaving children without a parent in many cases. These consequences can affect people whether they are undocumented immigrants or have a green card or visa. Unfortunately, federal immigration law is sometimes disproportionately strict compared with current state laws. This article will review how drug charges can lead to deportation. If this is an issue that might affect you personally, speak with a dedicated Johnston County, NC immigration lawyer to understand more. What Happens When You Are Deported? When someone who is not a citizen of the United States is convicted of drug charges, it almost immediately opens up the potential for deportation. This is true for misdemeanors as well as felony charges. Drug convictions can also mean that someone might be refused to enter or reenter the United States. This would affect people who have a green card or visa, or who want to return after being away for a short period. They might be eligible for a waiver of inadmissibility of relief from legal proceedings based on several factors, including: Rehabilitation Family ties Humanitarian […]',
    images: [
      { url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240726144700.jpg' },
    ],
  },
};

export default function HowCanDrugChargesImpactImmigrationStatusPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'how-can-drug-charges-impact-immigration-status',
    title: 'How Can Drug Charges Impact Immigration Status?',
    slug: 'how-can-drug-charges-impact-immigration-status',
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
