import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Common Legal Mistakes to Avoid After a Car Accident - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'Common Legal Mistakes to Avoid After a Car Accident - Vasquez Law Firm, PLLC',
    description:
      'In the aftermath of a car accident, it’s easy to make decisions that could negatively impact your legal rights. You are very likely in a state of shock, and you might not know how best to help yourself. Many people don’t realize that the actions they take immediately after an accident can affect their ability to recover compensation for their injuries later on! The lawyers of Vasquez Law Firm understand the playbook for acquiring personal injury compensation. Understanding the common legal mistakes to avoid after a car accident can help ensure that you protect your rights and increase your chances of a successful personal injury claim.  In this blog, we’ll discuss some of the most common legal mistakes people make after a car accident and how to avoid them. 1. Failing to Seek Medical Attention One of the most common legal mistakes to avoid after a car accident is not seeking medical attention right away. Even if you feel fine or believe your injuries are minor, it’s essential to get a medical evaluation as soon as possible. Many injuries, such as whiplash or internal damage, may not show symptoms immediately but can worsen over time. Failing to seek medical care […]',
    images: [{ url: '../wp-content/uploads/2024/09/vasquez-blog-sept2024.webp' }],
  },
};

export default function CommonLegalMistakesToAvoidAfterACarAccidentPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'common-legal-mistakes-to-avoid-after-a-car-accident',
    title: 'Common Legal Mistakes to Avoid After a Car Accident',
    slug: 'common-legal-mistakes-to-avoid-after-a-car-accident',
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
