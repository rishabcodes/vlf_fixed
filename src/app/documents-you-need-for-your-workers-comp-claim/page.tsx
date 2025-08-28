import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC',
  description:
    'Hurt at work? Get the [specific benefit] you deserve. We fight insurance companies. No upfront costs. Free case review.',
  openGraph: {
    title: 'Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC',
    description:
      'Workplace injuries happen in any and all career fields. Whether you are a construction worker or a secretary in an office, you might suffer an injury while on the job. No matter what field in which you are injured, you will be entitled to workers’ compensation– however, making a claim is not always as easy as it seems or should be. If you are injured at your workplace, you need to be prepared and organized in order to claim the full amount which you are owed in order to treat your injuries and make a full recovery!  At Vasquez Law Firm, PLLC, we have worked diligently over the years to ensure that workers’ rights are protected and our clients are able to overcome frustrating barriers to accessing the full amount of compensation that they are owed. We understand that preparation through accurate documentation is key when it comes to legal procedures.  We have compiled this blog to help those who are going through the process of claiming workers’ comp know the documents they should have on hand, particularly if they are concerned that their employer or insurance company might try to cheat them out of their full damages. Read on […]',
    images: [{ url: '../wp-content/uploads/2024/09/blog-vasquez-aug2024.webp' }],
  },
};

export default function DocumentsYouNeedForYourWorkersCompClaimPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'documents-you-need-for-your-workers-comp-claim',
    title: 'Documents You Need For Your Workers’ Comp Claim',
    slug: 'documents-you-need-for-your-workers-comp-claim',
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
