import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'I Was in an Accident with an Emergency Vehicle. Now What? - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'I Was in an Accident with an Emergency Vehicle. Now What? - Vasquez Law Firm, PLLC',
    description:
      'Navigating the rules of the road can be challenging, especially when encountering emergency vehicles like police cars, fire trucks, and ambulances. Understanding your obligations as a private motorist when you get into an accident with an emergency vehicle and whether these vehicles are exempt from traffic laws can help you handle these situations more effectively. If you live in North Carolina and were in an accident with an emergency vehicle, contact an attorney to ensure you understand your rights completely. What to Do If You Get into An Accident with an Emergency Vehicle Getting into an accident with an emergency vehicle can be a stressful and confusing experience. Some tips to recovering from such an accident include: Stay calm and safe – First and foremost, ensure everyone’s safety. If possible, move to a safe location and check for injuries. Call 911 immediately to report the accident and request medical assistance. Exchange information – Just like any other accident, exchange information with the driver of the emergency vehicle. This includes names, contact details, insurance information, and vehicle registration. Cooperate, but avoid discussing or admitting fault at the scene. Document the scene – Take pictures and videos of the accident scene, vehicle damages, and any relevant […]',
    images: [{ url: '../wp-content/uploads/2024/09/shutterstock-421915948-2-min.jpg' }],
  },
};

export default function IWasInAnAccidentWithAnEmergencyVehicleNowWhatPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'i-was-in-an-accident-with-an-emergency-vehicle-now-what',
    title: 'I Was in an Accident with an Emergency Vehicle. Now What?',
    slug: 'i-was-in-an-accident-with-an-emergency-vehicle-now-what',
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
