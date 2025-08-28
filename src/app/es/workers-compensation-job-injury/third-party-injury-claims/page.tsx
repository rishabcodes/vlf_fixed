import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Raleigh, NC Third-Party Work Injury Claims Abogados - Vasquez Law Firm, PLLC',
  description:
    "Meet [Name] - Experienced [practice area] attorney at Vasquez Law Firm. [Years] years fighting for clients' rights. Free consultation.",
  openGraph: {
    title: 'Raleigh, NC Third-Party Work Injury Claims Abogados - Vasquez Law Firm, PLLC',
    description:
      'Abogados in Wake County Helping With Lesiones Personales Lawsuits for Workplace Accidents According to information from the Bureau of Labor Statistics, more than 73,000 North Carolina private-industry workers suffer non-fatal workplace injuries and illnesses each year. This number does not include the thousands of other injuries suffered by public-sector—or government—workers annually. In an average year, well over 40,000 cases required the workers in question to miss work, be transferred to a different job, or be placed on restricted duty. At Vasquez Law Firm, PLLC, we know the effects that a workplace injury can have on your life. In most such cases, you are likely to be eligible for workers’ compensation benefits under the North Carolina Workers’ Compensation Act. However, workers’ comp benefits are not always sufficient to restore your life to where it once was. If a party other than your employer is responsible for the injuries that you have suffered—even in part—it may be in your best interest to pursue a third-party personal injury claim in addition to your claim with the state’s work comp system. A personal injury lawsuit might also be necessary if you are not eligible for workers’ compensation benefits. Skilled Counsel for North Carolina Workplace […]',
    images: [
      { url: '../../wp-content/uploads/2024/04/charlotte-nc-third-party-lawsuit-attorneys.jpg' },
    ],
  },
};

export default function ThirdPartyInjuryClaimsPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'third-party-injury-claims',
    title: 'Raleigh, NC Third-Party Work Injury Claims Abogados',
    slug: 'third-party-injury-claims',
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
