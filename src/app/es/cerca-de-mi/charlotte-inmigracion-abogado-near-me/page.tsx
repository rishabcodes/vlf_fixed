import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';

import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Inmigración Abogado Near Me Charlotte NC | 24/7 Available | Free Consultation',
  description:
    'Looking for an immigration lawyer near you in Charlotte? ⭐ 5-Star Rated • 60+ Years Experience • Se Habla Español • Same Day Appointments • Call 1-844-YO-PELEO',
  keywords:
    'immigration lawyer near me, immigration attorney near me charlotte, abogado de inmigracion cerca de mi, immigration lawyer charlotte nc near me, best immigration lawyer near me, spanish speaking immigration lawyer near me, emergency immigration lawyer near me, deportation lawyer near me charlotte, green card lawyer near me, citizenship attorney near me',
  openGraph: {
    title: 'Inmigración Abogado Near Me in Charlotte | Vasquez Law Firm',
    description:
      '24/7 Emergency Inmigración Help in Charlotte. Free Consultation. 30,000+ Cases Won. Se Habla Español.',
    url: 'https://www.vasquezlawnc.com/near-me/charlotte-immigration-lawyer-near-me',
    images: [
      {
        url: '/images/charlotte-office-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Charlotte Office - Inmigración Abogados Near You',
      },
    ],
  },
};

export default function CharlotteInmigraciónAbogadoNearMePage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'charlotte-immigration-lawyer-near-me',
    title: 'Charlotte Inmigración Abogado Near Me',
    slug: 'charlotte-immigration-lawyer-near-me',
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
      name: { en: 'Inmigración Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Lesiones Personales', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Defensa Criminal', es: 'Defensa Criminal' },
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
