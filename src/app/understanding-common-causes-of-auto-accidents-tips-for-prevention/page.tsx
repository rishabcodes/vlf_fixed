import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Understanding Common Causes Of Auto Accidents: Tips For Prevention - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title:
      'Understanding Common Causes Of Auto Accidents: Tips For Prevention - Vasquez Law Firm, PLLC',
    description:
      'Auto accidents are frequently responsible for the injury and death of many drivers and passengers around the world. It’s important to understand what commonly causes these accidents, as well as ways to prevent them from occurring altogether. This blog aims to shed light on the factors that contribute to auto accidents, as well as some tips for keeping yourself and others safe when you’re behind the wheel. Common Causes Of Auto Accidents  Distracted Driving Distracted driving is defined as unknownthing that takes a driver’s attention away from the road. It can lead to serious injury, but it can also be fatal. Between 2010 and 2019, distracted driving claimed at least 3,000 lives a year. There are three different types of distracted driving: manual, taking your hands off the wheel; visual, taking your eyes off the road; and cognitive, taking your mind off driving. One of the most prominent and frequent ways people drive distracted today involves all three of these types; texting. The NHTSA says that sending or reading a text takes your eyes off the road for 5 seconds. If you’re driving at 55 mph, that’s comparable to driving the length of a football field with your eyes closed. There are several other ways to participate […]',
    images: [{ url: '../wp-content/uploads/2024/06/blog-car-accidents.webp' }],
  },
};

export default function UnderstandingCommonCausesOfAutoAccidentsTipsForPreventionPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'understanding-common-causes-of-auto-accidents-tips-for-prevention',
    title:
      'Understanding Common Causes Of Auto Accidents: Tips For Prevention - Vasquez Law Firm, PLLC',
    slug: 'understanding-common-causes-of-auto-accidents-tips-for-prevention',
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
