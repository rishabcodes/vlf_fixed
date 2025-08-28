import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Who Pays if Workers Die From Workplace Accidents? - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'Who Pays if Workers Die From Workplace Accidents? - Vasquez Law Firm, PLLC',
    description:
      'A tragic accident claimed the life of an amphibious excavator operator in the Cape Fear River in August. The North Carolina Department of Labor’s Occupational Safety and Health Division is investigating this accident because it happened on federally-owned property. As the investigation into this death is ongoing, the cause of the accident has not yet been established. If a fatal workplace incident takes the life of your family member, are you eligible to receive compensation through a workers’ comp claim? Who is responsible for paying you? The compassionate lawyers at Vasquez Law Firm, PLLC can answer those questions during your free consultation, so call us today. What Does North Carolina’s Workers’ Comp Cover? Most employers in North Carolina are required by law to purchase workers’ compensation insurance. These policies pay specific benefits to workers who become ill or injured on the job, including: Medical expenses A portion of lost wages Temporary or permanent disability benefits If an employee dies because of a work-related injury or illness, eligible survivors can receive workers’ comp death benefits. When workers or their families accept workers’ comp benefits, they usually enter a tacit agreement not to pursue personal injury or wrongful death claims against the employer. However, depending on the circumstances, you […]',
    images: [
      { url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240917171743.jpg' },
    ],
  },
};

export default function WhoPaysIfWorkersDieFromWorkplaceAccidentsPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'who-pays-if-workers-die-from-workplace-accidents',
    title: 'Who Pays if Workers Die From Workplace Accidents?',
    slug: 'who-pays-if-workers-die-from-workplace-accidents',
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
