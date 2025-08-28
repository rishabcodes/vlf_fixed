import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Types of Damages in a Motorcycle Accident Injury Claim - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'Types of Damages in a Motorcycle Accident Injury Claim - Vasquez Law Firm, PLLC',
    description:
      'Motorcycle accidents can have a devastating effect on someone’s life due to the severity of their injuries. The medical expenses, loss of income, and emotional trauma caused by an accident can quickly add up, leaving the victim with substantial financial burdens. If the accident was caused by someone else’s negligence or intentional actions, the victim might be eligible to pursue a personal injury claim and seek compensation for their damages. In North Carolina, a victim can recover several types of damages in a motorcycle accident injury claim. These damages fall into two broad categories: compensatory and punitive damages. Compensatory Damages Compensatory damages are intended to repay the victim for the losses caused by the motorcycle accident. These damages can be categorized into various subsections, such as: Economic Damages – The economic impact of the accident is expressed in quantifiable financial losses, such as medical costs, lost wages, diminished career opportunities, and motorcycle repairs or replacement. Non-Economic Damages – Non-monetary damage, such as psychological pain, emotional anguish, and the inability to enjoy life at its fullest capacity, can all be the results of a motorcycle accident. Such non-economic losses are known as non-economic damages. Punitive Damages Punitive damages are designed to punish […]',
    images: [{ url: '../wp-content/uploads/2024/09/shutterstock_2074316275-min.jpg' }],
  },
};

export default function TypesOfDamagesInAMotorcycleAccidentInjuryClaimPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'types-of-damages-in-a-motorcycle-accident-injury-claim',
    title: 'Types of Damages in a Motorcycle Accident Injury Claim',
    slug: 'types-of-damages-in-a-motorcycle-accident-injury-claim',
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
