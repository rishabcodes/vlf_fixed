import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: '6 Reasons Why You Should Hire a Personal Injury Attorney - Vasquez Law Firm, PLLC',
  description:
    "Meet [Name] - Experienced [practice area] attorney at Vasquez Law Firm. [Years] years fighting for clients' rights. Free consultation.",
  openGraph: {
    title: '6 Reasons Why You Should Hire a Personal Injury Attorney - Vasquez Law Firm, PLLC',
    description:
      'If you are injured in an accident caused by someone else’s negligence, you may qualify to obtain compensation. You may think you can handle your personal injury case successfully on your own and that there are no benefits to working with an experienced lawyer. However, you should know that, while you do not have to hire an attorney, people with effective legal representation typically receive significantly higher settlements. The skilled lawyers at Vasquez Law Firm, PLLC will work diligently to help you maximize your payout. Personal injury attorneys help recover maximum compensation by using the following strategies. Investigating Accidents To get compensation, you will need evidence proving another party’s negligence to qualify for a personal injury claim. It often takes an in-depth investigation to find the right kinds of supporting evidence. Most people have never conducted a thorough investigation and do not know how to identify important evidence. Your legal team from Vasquez Law Firm, PLLC has investigated numerous accidents, so we will undertake this task for you. Assigning Fault Accurately More than one party shares the blame for causing many accidents. It is very important that you are not found to be at fault in NC accidents because of the state’s negligence laws. […]',
    images: [
      { url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240821160759.jpg' },
    ],
  },
};

export default function ReasonsWhyYouShouldHireAPersonalInjuryAttorneyPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: '6-reasons-why-you-should-hire-a-personal-injury-lawyer',
    title: '6 Reasons Why You Should Hire a Personal Injury Attorney',
    slug: '6-reasons-why-you-should-hire-a-personal-injury-lawyer',
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
      name: { en: 'Immigration Law', es: 'Ley de Immigration' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Personal Injury' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Criminal Defense' },
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
