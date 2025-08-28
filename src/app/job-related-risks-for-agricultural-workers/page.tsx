import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Job-Related Risks for Agricultural Workers - Vasquez Law Firm, PLLC',
  description:
    'Hurt at work? Get the [specific benefit] you deserve. We fight insurance companies. No upfront costs. Free case review.',
  openGraph: {
    title: 'Job-Related Risks for Agricultural Workers - Vasquez Law Firm, PLLC',
    description:
      'North Carolina is home to a vast agriculture industry with over 100,000 agricultural employees employed in the state annually. While it is a big job creator, the agricultural industry is also among the most dangerous in terms of job-related injuries, given the physical nature of work and the numerous potential occupational hazards. If you are an agricultural worker and were injured while doing your job, speak with a dedicated Wake County, NC work injury attorney to understand your options for receiving workers’ compensation for the damages you had to pay for. Common Causes of Injuries on Farms While every scenario involving a farm worker getting injured on the job varies, there are some common underlying causes for their injuries. Some of the most common include: Heat: Since farm workers generally work outside regardless of the season, they can be exposed to strong sunlight and high temperatures. As a result, farm workers can suffer from severe sunburns and other sun-related skin conditions, dehydration, and heat stroke. Chemicals: Certain chemicals such as herbicides or pesticides that are often used when working with crops can be harmful to someone who comes into contact with them, whether through inhalation, or contact with the skin, eyes, or mouth. Overexertion: Farm work […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock-2259921419-min.jpg',
      },
    ],
  },
};

export default function JobRelatedRisksForAgriculturalWorkersPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'job-related-risks-for-agricultural-workers',
    title: 'Job-Related Risks for Agricultural Workers',
    slug: 'job-related-risks-for-agricultural-workers',
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
