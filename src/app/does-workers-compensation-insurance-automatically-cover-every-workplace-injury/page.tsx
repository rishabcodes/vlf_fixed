import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Does Workers’ Compensation Insurance Automatically Cover Every Workplace Injury? - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title:
      'Does Workers’ Compensation Insurance Automatically Cover Every Workplace Injury? - Vasquez Law Firm, PLLC',
    description:
      'People usually spend at least eight hours a day, five days a week at work. With so much time on the clock, work injuries are bound to happen. While some of these injuries may be so minor that they do not justify taking any kind of legal action, others can be serious enough that they put someone out of work permanently. North Carolina requires most businesses to have workers’ compensation insurance, but that does not necessarily mean your employer has workers’ compensation insurance or, if it does, that the insurance will cover your injury. To learn what kind of injuries workers’ compensation is meant to cover, read on and then contact a North Carolina workers’ compensation insurance attorney for more information. Which Employers Need to Have Workers’ Compensation in North Carolina? North Carolina law requires businesses with three or more employees to have either workers’ compensation insurance or to qualify as a self-insured employer. However, certain employees are exempt from workers’ compensation coverage, including: “Casual” employees (people who can come and go from a job site at will) Most contract workers (although many contract workers could still be classified as employees in the case of a workplace injury) Domestic employees Agricultural […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1303104493-min.jpg',
      },
    ],
  },
};

export default function DoesWorkersCompensationInsuranceAutomaticallyCoverEveryWorkplaceInjuryPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'does-workers-compensation-insurance-automatically-cover-every-workplace-injury',
    title:
      'Does Workers’ Compensation Insurance Automatically Cover Every Workplace Injury? - Vasquez Law Firm, PLLC',
    slug: 'does-workers-compensation-insurance-automatically-cover-every-workplace-injury',
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
