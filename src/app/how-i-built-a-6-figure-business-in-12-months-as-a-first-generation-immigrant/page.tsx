import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Expert Tips for first-generation immigrants - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title: 'Expert Tips for first-generation immigrants - Vasquez Law Firm, PLLC',
    description:
      'Starting a business from scratch is daunting for anyone, but as a first-generation immigrant, it comes with its own unique set of challenges. I faced language barriers, financial constraints, and the pressure of navigating a new culture and business environment. Yet, in just 12 months, I was able to build a six-figure business. This journey wasn’t easy, but it was definitely possible with the right mindset, strategy, and persistence. In this blog, I’ll share the steps I took to make it happen and the lessons I learned along the way. Embracing the Immigrant Mindset One of the first things I realized as a first-generation immigrant was the importance of mindset. Immigrants often carry a sense of resilience and determination that comes from overcoming adversity. This mindset became my greatest asset. I had to view challenges not as obstacles, but as opportunities to grow and innovate. Key Takeaway: The challenges that come with being an immigrant can become stepping stones if you approach them with the right mindset. Instead of seeing barriers, see them as avenues to learn and improve. Setting Clear Goals and Priorities A major mistake I see many first-generation entrepreneurs make is diving into business without clearly defined […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/01/How-I-Built-a-6-Figure-Business-in-12-Months-as-a-First-Generation-Immigrant.jpg',
      },
    ],
  },
};

export default function HowIBuiltA6FigureBusinessIn12MonthsAsAFirstGenerationImmigrantPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'how-i-built-a-6-figure-business-in-12-months-as-a-first-generation-immigrant',
    title: 'Expert Tips for first-generation immigrants',
    slug: 'how-i-built-a-6-figure-business-in-12-months-as-a-first-generation-immigrant',
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
