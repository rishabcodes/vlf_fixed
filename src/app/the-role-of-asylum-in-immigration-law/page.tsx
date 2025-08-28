import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'The Role Of Asylum In Immigration Law - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'The Role Of Asylum In Immigration Law - Vasquez Law Firm, PLLC',
    description:
      'The Statue of Liberty proclaims: Give me your tired, your poor, your huddled masses yearning to breathe free. When there is turmoil in other nations, persecuted citizens of the world turn to the United States for salvation. The U.S. was founded on the basis of freedom, and here oppressed individuals can find the safety that would otherwise elude them.  People come to the U.S. to seek asylum as we are a country that values security and liberty–however, seeking asylum is also a complicated legal process that requires a lot of time, paperwork, and legal understanding. The lawyers of Vasquez Law Firm, PLLC, endeavor to help people accomplish their goals for immigrating to the U.S. so that they can establish better lives for themselves and their families.  Asylum seekers are among some of the most vulnerable people immigrating to the U.S., which is why Vasquez Law Firm has created this blog to outline the broad strokes of the process of seeking asylum so that you can better understand what’s in store for yourself or your loved ones.  Read on to find out more about asylum seekers in America and the circumstances in which one would qualify.  What Is Asylum? Asylum is […]',
    images: [
      { url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/08/blog-vasquez-7-24.webp' },
    ],
  },
};

export default function TheRoleOfAsylumInImmigrationLawPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'the-role-of-asylum-in-immigration-law',
    title: 'The Role Of Asylum In Immigration Law',
    slug: 'the-role-of-asylum-in-immigration-law',
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
