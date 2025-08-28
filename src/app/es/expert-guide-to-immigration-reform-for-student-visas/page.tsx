import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Everything You Need to Know About Inmigración Reform for Student Visas - Vasquez Law Firm, PLLC',
  description:
    'Learn about the latest immigration reforms for student visas and how they can affect your future in the U.S. Get expert insights and tips to navigate the changes.',
  openGraph: {
    title:
      'Everything You Need to Know About Inmigración Reform for Student Visas - Vasquez Law Firm, PLLC',
    description:
      'Learn about the latest immigration reforms for student visas and how they can affect your future in the U.S. Get expert insights and tips to navigate the changes.',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2025/01/Everything-You-Need-to-Know-About-Inmigración-Reform-for-Student-Visas.jpg',
      },
    ],
  },
};

export default function ExpertGuideToInmigraciónReformForStudentVisasPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'expert-guide-to-immigration-reform-for-student-visas',
    title:
      'Everything You Need to Know About Inmigración Reform for Student Visas - Vasquez Law Firm, PLLC',
    slug: 'expert-guide-to-immigration-reform-for-student-visas',
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
