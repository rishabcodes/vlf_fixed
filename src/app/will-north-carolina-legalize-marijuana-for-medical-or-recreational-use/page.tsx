import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Will North Carolina Legalize Marijuana for Medical or Recreational Use - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title:
      'Will North Carolina Legalize Marijuana for Medical or Recreational Use - Vasquez Law Firm, PLLC',
    description:
      'Marijuana has been used for centuries by people around the world. Even though it has been found to be less harmful than legal substances such as alcohol and tobacco, and it also has a variety of medical benefits, it has been classified as an illegal controlled substance. Because of this, many people have been charged with drug crimes related to the possession or distribution of marijuana. However, attitudes surrounding marijuana use have been changing, and in many parts of the United States, it has been legalized for medical and recreational purposes. In the future, North Carolina could follow the example of other states and approve the drug for legal use in the state. New Marijuana Laws Introduced by North Carolina Lawmakers Several bills have recently been introduced in the North Carolina state legislature that could legalize marijuana possession and use by adults. House Bill 626 would allow people over the age of 21 to possess up to two ounces of marijuana, 15 grams of concentrated cannabis, products containing up to 2,000 milligrams of THC, or six cannabis plants. It would also allow for the sale and on-site consumption of marijuana at licensed businesses, and it would provide automatic expungement of criminal records for those who were […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1161207328-min.jpg',
      },
    ],
  },
};

export default function WillNorthCarolinaLegalizeMarijuanaForMedicalOrRecreationalUsePage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'will-north-carolina-legalize-marijuana-for-medical-or-recreational-use',
    title:
      'Will North Carolina Legalize Marijuana for Medical or Recreational Use - Vasquez Law Firm, PLLC',
    slug: 'will-north-carolina-legalize-marijuana-for-medical-or-recreational-use',
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
