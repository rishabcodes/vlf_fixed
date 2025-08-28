import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'New Rules for Asylum and Parole May Affect Immigrants to the U.S. - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title:
      'New Rules for Asylum and Parole May Affect Immigrants to the U.S. - Vasquez Law Firm, PLLC',
    description:
      'Over the past several years, the United States has had to deal with a large number of people attempting to enter the country. In many cases, migrants have left their homes in countries that have experienced political unrest, violence, or other dangerous conditions and sought safety in the U.S. However, many immigrants have faced barriers preventing them from legally entering the United States, and immigration officials have taken action to quickly expel many people who entered the country without authorization. Fortunately, this may soon change as the administration of President Joe Biden begins to implement new rules and procedures governing asylum, parole, deportations, and more. Asylum Procedures Following the End of Title 42 Over the past several years, immigration officials have used a rule known as Title 42 to expel many immigrants from the United States without following the typical deportation procedures. This rule was put in place by the administration of President Donald Trump during the COVID-19 pandemic, and it was intended to protect public health. However, it has continued to be used even after the dangers of COVID-19 have become less of a concern. After several legal challenges, Title 42 will be lifted on May 11, 2023. Immigration officials have noted that […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_611066249-min.jpg',
      },
    ],
  },
};

export default function NewRulesForAsylumAndParoleMayAffectImmigrantsToTheUSPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'new-rules-for-asylum-and-parole-may-affect-immigrants-to-the-u-s',
    title:
      'New Rules for Asylum and Parole May Affect Immigrants to the U.S. - Vasquez Law Firm, PLLC',
    slug: 'new-rules-for-asylum-and-parole-may-affect-immigrants-to-the-u-s',
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
