import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Types Of Evidence In Your Auto Accident Injury Claim - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'Types Of Evidence In Your Auto Accident Injury Claim - Vasquez Law Firm, PLLC',
    description:
      'When you are injured in an auto accident, it can be difficult to keep a clear head and look to the future. Nonetheless, when you are trying to claim compensation for your injuries and damages to your property, there are certain efforts you want to make immediately following the crash and beyond. If you are able to collect as much documentation as possible, you have a better chance of being granted the proper damages to which you are entitled down the line.  The lawyers of Vasquez Law Firm have compiled a list of types of evidence that can be used to support your claim for compensation in the event that you get into an auto accident. If you are able, collect and keep track of this evidence as thoroughly as possible in order to maximize your claim.  Photos And Videos  Following an accident, you want to document the scene, assuming your injuries do not prevent you from doing so. If you are conscious and can do so without aggravating your injuries, take as many photos and videos as possible of the accident, including damage to your vehicle, skid marks on the road, the position of the cars, street signs, weather […]',
    images: [{ url: '../wp-content/uploads/2024/06/blog-vasquez-june2024.jpg.webp' }],
  },
};

export default function TypesOfEvidenceInYourAutoAccidentInjuryClaimPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'types-of-evidence-in-your-auto-accident-injury-claim',
    title: 'Types Of Evidence In Your Auto Accident Injury Claim',
    slug: 'types-of-evidence-in-your-auto-accident-injury-claim',
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
