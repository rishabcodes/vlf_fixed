import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Understanding the Different Kinds of Family Visas in North Carolina - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title:
      'Understanding the Different Kinds of Family Visas in North Carolina - Vasquez Law Firm, PLLC',
    description:
      'Family visas play a pivotal role in reuniting families and loved ones in North Carolina. Understanding the different types of family visas available is essential for those navigating the complex immigration system. For the critical legal assistance you need to navigate immigration law in North Carolina, experienced lawyers can assist you in achieving your legal objectives. The experienced bilingual legal professionals at Vasquez Law Firm, PLLC have successfully represented North Carolinians for almost a decade in various immigration law matters. For assistance in understanding your options regarding family visas, our trusted lawyers are ready to fight for your rights and interests. What to Know About Immediate Relative Visas Immediate relative visas are designed for close family members of U.S. citizens, allowing for a faster and more streamlined immigration process. Spouses, unmarried children under 21, and parents of U.S. citizens fall under this category. One of the key benefits of immediate relative visas is that there is no annual cap on the number of visas issued, making the process quicker and more predictable for eligible applicants. Family Preference Visas Meanwhile, family preference visas are available for more distant relatives of U.S. citizens and lawful permanent residents. This category includes unmarried sons and daughters over 21, married children […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock-1487364161-1.jpg',
      },
    ],
  },
};

export default function UnderstandingTheDifferentKindsOfFamilyVisasInNorthCarolinaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'understanding-the-different-kinds-of-family-visas-in-north-carolina',
    title:
      'Understanding the Different Kinds of Family Visas in North Carolina - Vasquez Law Firm, PLLC',
    slug: 'understanding-the-different-kinds-of-family-visas-in-north-carolina',
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
