import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'When Can Criminal Cases Affect a Person’s Inmigración Status? - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'When Can Criminal Cases Affect a Person’s Inmigración Status? - Vasquez Law Firm, PLLC',
    description:
      'Criminal convictions can lead to a person being deemed inadmissible to the United States. An immigrant who is inadmissible will usually be barred from initially entering the U.S., and those who are already in the United States may be unable to take steps to remain in the country by applying for a visa or an adjustment of status. There are several types of crimes that will result in inadmissibility if a person is convicted in the United States or another country. These include: Crimes involving moral turpitude – While there is no specific list of crimes that fall into this category, they will generally include acts that are inherently amoral, such as violent crimes, sex crimes, fraud, or theft. Drug crimes – Most violations of the laws of the United States or other countries involving the possession or distribution of controlled substances will lead to inadmissibility. Anyone who has been involved in drug trafficking, including those who aid and abet the illegal import of controlled substances into the U.S. or who have gained financial benefits from these activities, may be deemed inadmissible. Prostitution – Immigrants who came to the United States to engage in prostitution, imported people to the country for the purposes […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1005706576-min.jpg',
      },
    ],
  },
};

export default function WhenCanCriminalCasesAffectAPersonsInmigraciónStatusPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'when-can-criminal-cases-affect-a-persons-immigration-status',
    title: 'When Can Criminal Cases Affect a Person’s Inmigración Status?',
    slug: 'when-can-criminal-cases-affect-a-persons-immigration-status',
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
      name: { en: 'Inmigración Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Lesiones Personales', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Defensa Criminal', es: 'Defensa Criminal' },
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
