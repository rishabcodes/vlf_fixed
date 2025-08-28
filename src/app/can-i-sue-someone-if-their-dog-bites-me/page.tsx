import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Can I Sue Someone if Their Dog Bites Me? - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title: 'Can I Sue Someone if Their Dog Bites Me? - Vasquez Law Firm, PLLC',
    description:
      'Although most dogs are beloved family pets that never harm anyone, dog bites remain a serious problem in North Carolina. Dog attacks can happen in the blink of an eye, making it difficult to react and know what to do once the attack is over. If you or someone you love has been seriously hurt by a dog, it is important to understand that you may be able to take legal action against the dog’s owner to recover damages for your suffering and medical expenses. Furthermore, taking quick action is often necessary to protect others from the dangerous dog in the future. Read more to learn about dog bites and dangerous dog laws in North Carolina. Dog Bite Injuries Dogs may be man’s best friend, but they are also animals that can act in unpredictable ways. In a matter of just a few seconds, a dog can cause serious injuries, especially to small children. Common dog bite injuries include, but are not limited to: Lacerations to hands, arms, face, and neck Disfiguring cosmetic damage, including scarring Nerve damage Torn ligaments Serious bleeding Infections Broken or fractured bones What is a Dangerous Dog? Every state defines “dangerous dog” a little differently, but in […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1265981812-min.jpg',
      },
    ],
  },
};

export default function CanISueSomeoneIfTheirDogBitesMePage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'can-i-sue-someone-if-their-dog-bites-me',
    title: 'Can I Sue Someone if Their Dog Bites Me?',
    slug: 'can-i-sue-someone-if-their-dog-bites-me',
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
