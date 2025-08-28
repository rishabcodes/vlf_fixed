import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Can a Lawyer Help Me if I Get a DWI? - Vasquez Law Firm, PLLC',
  description:
    "Meet [Name] - Experienced [practice area] attorney at Vasquez Law Firm. [Years] years fighting for clients' rights. Free consultation.",
  openGraph: {
    title: 'Can a Lawyer Help Me if I Get a DWI? - Vasquez Law Firm, PLLC',
    description:
      ' Driving while intoxicated by drugs or alcohol is something that few people would admit to doing. However, studies suggest as many as one in four people have driven under the influence of alcohol or other substances. Some DWI arrests are the result of a poor decision while other times, faulty breath testing devices or other issues lead to an unjustified DWI arrest. If you were charged with driving while intoxicated (DWI), you may also be very nervous about the consequences you face for your actions. While this is natural, it is also important to know that the legal consequences for something like a DWI are rarely set in stone. The advocacy of a great attorney can help you fight the charges and possibly even get them dropped. What Can an Attorney Do in My Defense? Depending on the facts of the case, an attorney has several options available for fighting the charges. These include, but are not limited to: Questioning the validity of a breathalyzer result Questioning the validity of the roadside test (if the officer asked you to walk in a straight line, count backward from 100, etc.) Questioning the officer’s justification for pulling you over in the first place […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_538729846-min.jpg',
      },
    ],
  },
};

export default function CanALawyerHelpMeIfIGetADwiPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'can-a-lawyer-help-me-if-i-get-a-dwi',
    title: 'Can a Lawyer Help Me if I Get a DWI?',
    slug: 'can-a-lawyer-help-me-if-i-get-a-dwi',
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
