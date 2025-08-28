import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'DACA Dreamer Scholarship | Vasquez Law Firm - I FIGHT FOR YOU™',
  description:
    '$1,000 per semester for DACA recipients pursuing higher education. Financial support for dreamers. Deadline: November 27, 2024.',
  keywords:
    'DACA scholarship, dreamer scholarship, DACA financial aid, DACA higher education, Vasquez Law Firm scholarship',
  openGraph: {
    title: 'Vasquez Law Firm DACA Dreamer Scholarship',
    description: '$1,000 per semester for DACA recipients. Empowering dreams through education.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/scholarships',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/scholarship-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DACA Dreamer Scholarship',
      },
    ],
  },
};

export default function ScholarshipsPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'scholarships',
    title: 'Scholarships',
    slug: 'scholarships',
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
