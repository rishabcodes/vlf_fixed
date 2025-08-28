import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'What Are the Requirements for Adjustment of Status for Immigrants? - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title:
      'What Are the Requirements for Adjustment of Status for Immigrants? - Vasquez Law Firm, PLLC',
    description:
      'Immigrants who live in the United States include those who have lawful permanent resident status and those who have only received authorization to stay in the country temporarily. While permanent residents will be able to continue living in the U.S. without fear of deportation, other immigrants may be in the country on temporary work visas or visitor visas. These immigrants may wish to become permanent residents, and to do so, they may apply for adjustment of status. By understanding the requirements that must be met to become a lawful permanent resident, an immigrant can make sure they will be able to complete this process successfully. Who Is Eligible for Adjustment of Status? In order to adjust their status, an immigrant must be eligible to apply for a Green Card. There are several eligibility categories, including: Family-based Green Cards: Immediate relatives (spouses, parents, and unmarried children under 21 years old) of U.S. citizens can apply for adjustment of status immediately after their immigrant petition has been approved. Immediate relatives of Green Card holders or other family members of U.S. citizens may have to wait until a family preference visa becomes available based on their relationship with the petitioner. Employment-based Green Cards: Immigrants who receive sponsorship from an employer may be […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1575922960-1.jpg',
      },
    ],
  },
};

export default function WhatAreTheRequirementsForAdjustmentOfStatusForImmigrantsPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'what-are-the-requirements-for-adjustment-of-status-for-immigrants',
    title:
      'What Are the Requirements for Adjustment of Status for Immigrants? - Vasquez Law Firm, PLLC',
    slug: 'what-are-the-requirements-for-adjustment-of-status-for-immigrants',
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
