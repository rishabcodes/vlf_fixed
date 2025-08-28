import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Smithfield, NC Immigration Lawyers - Vasquez Law Firm, PLLC',
  description:
    'Durham is a vibrant North Carolina city with diverse culture, rich history, and a flourishing community. It’s also known as the “City of Medicine,” with healthcare being a major industry including more than 300 medical and health-related companies and medical practices. It is a wonderful place to live for families, couples, and individuals. If you’re someone who is considering immigrating to the United States to become a legal resident of Durham, or somewhere else, or if you have been injured in an accident that wasn’t your fault, or if you have been accused with a crime, Vasquez Law Firm can help you. We are your top choice for representation! We are dedicated to helping clients reach their ideal resolution, no matter what situation they are in. We have extensive experience in personal injury, worker’s compensation, criminal defense, and family law. You can trust us to stand up for your rights! Call now to schedule a free consultation and allow us to apply our 60+ years of experience to your unique situation.',
  openGraph: {
    title: 'Smithfield, NC Immigration Lawyers - Vasquez Law Firm, PLLC',
    description:
      'Durham is a vibrant North Carolina city with diverse culture, rich history, and a flourishing community. It’s also known as the “City of Medicine,” with healthcare being a major industry including more than 300 medical and health-related companies and medical practices. It is a wonderful place to live for families, couples, and individuals. If you’re someone who is considering immigrating to the United States to become a legal resident of Durham, or somewhere else, or if you have been injured in an accident that wasn’t your fault, or if you have been accused with a crime, Vasquez Law Firm can help you. We are your top choice for representation! We are dedicated to helping clients reach their ideal resolution, no matter what situation they are in. We have extensive experience in personal injury, worker’s compensation, criminal defense, and family law. You can trust us to stand up for your rights! Call now to schedule a free consultation and allow us to apply our 60+ years of experience to your unique situation.',
    images: [{ url: '/images/og-default.jpg' }],
  },
};

export default function SmithfieldNcImmigrationLawyersPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'smithfield-nc-immigration-lawyers',
    title: 'Smithfield, NC Immigration Lawyers',
    slug: 'smithfield-nc-immigration-lawyers',
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
