import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'How Long Does Divorce Take in North Carolina? Complete Timeline Guide 2024',
  description:
    "Learn about North Carolina's divorce timeline, including the mandatory 1-year separation period, filing process, and factors that affect how long your divorce will take.",
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/how-long-does-divorce-take-in-north-carolina-complete-timeline-guide',
  },
};

export default function HowLongDoesDivorceTakeInNorthCarolinaCompleteTimelineGuidePage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'how-long-does-divorce-take-in-north-carolina-complete-timeline-guide',
    title: 'How Long Does Divorce Take in North Carolina? Complete Timeline Guide',
    slug: 'how-long-does-divorce-take-in-north-carolina-complete-timeline-guide',
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
