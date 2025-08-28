import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Does the Violence Against Women Act Protect Against Deportation? - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling immigration. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title:
      'Does the Violence Against Women Act Protect Against Deportation? - Vasquez Law Firm, PLLC',
    description:
      'The Violence Against Women Act (VAWA) is a federal law that was enacted in 1994 to protect victims of domestic violence, sexual assault, and stalking. It provides various forms of support and assistance to survivors of domestic abuse, including access to immigration relief for abuse victims who are married to U.S. citizens or lawful permanent residents. By receiving protection against deportation, immigrant victims can leave abusive situations and seek safety for themselves and their families. For those who need help with these issues, an immigration attorney can be an invaluable resource, offering support and legal assistance with petitions for visas and Green Cards. Overview of VAWA Immigration Protections Under VAWA, immigrant victims of domestic violence can self-petition for lawful permanent residency without the knowledge or consent of their abuser. This law allows victims of abuse (including women, men, and children) to seek safety and independence from their abusive family members without fear of deportation. A person may be eligible for a VAWA self-petition if they meet the following criteria: The immigrant must have a qualifying relationship with a U.S. citizen or lawful permanent resident who has been accused of engaging in acts of abuse. The immigrant may be the abuser’s spouse or child. A parent may qualify under VAWA if […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/Untitled-2023-10-17T105430.440.jpg',
      },
    ],
  },
};

export default function DoesTheViolenceAgainstWomenActProtectAgainstDeportationPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'does-the-violence-against-women-act-protect-against-deportation',
    title:
      'Does the Violence Against Women Act Protect Against Deportation? - Vasquez Law Firm, PLLC',
    slug: 'does-the-violence-against-women-act-protect-against-deportation',
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
