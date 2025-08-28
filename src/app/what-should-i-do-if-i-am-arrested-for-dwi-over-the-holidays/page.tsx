import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'What Should I Do if I Am Arrested for DWI Over the Holidays? - Vasquez Law Firm, PLLC',
  description:
    'Facing [specific charge]? Experienced defense attorneys protecting your rights. 24/7 availability. Free consultation.',
  openGraph: {
    title: 'What Should I Do if I Am Arrested for DWI Over the Holidays? - Vasquez Law Firm, PLLC',
    description:
      'The holiday season is a time of joy and celebration, but it can also be a time when people make poor decisions. Drunk driving is one such decision that can have serious consequences. If you are arrested and charged with driving while impaired (DWI) during the holidays, it is important to know what steps to take to protect your rights. An experienced attorney can provide legal representation when addressing DWI charges, helping you determine how to defend against a conviction and minimize the ways your life will be affected. When you are pulled over on suspicion of drunk driving, you should: 1. Stay Calm and Cooperate During a DWI traffic stop, it is crucial to remain calm and cooperate with police officers. Avoid any confrontations or arguments, as these actions will only escalate the situation further. You can provide your identification documents when requested and answer basic questions about your identity. This can help you avoid any misunderstandings. 2. Understand Your Rights You have the right to remain silent, and you are not required to give a police officer any information that could potentially be incriminating. You can exercise this right by informing an officer that you decline to answer any questions about whether […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/02/arrested-for-dwi-over-holidays.jpg',
      },
    ],
  },
};

export default function WhatShouldIDoIfIAmArrestedForDwiOverTheHolidaysPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'what-should-i-do-if-i-am-arrested-for-dwi-over-the-holidays',
    title: 'What Should I Do if I Am Arrested for DWI Over the Holidays?',
    slug: 'what-should-i-do-if-i-am-arrested-for-dwi-over-the-holidays',
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
