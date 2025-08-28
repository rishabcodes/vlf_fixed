import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Home - Vasquez Law Firm, PLLC',
  description:
    'Find experienced Raleigh, NC immigration lawyers to help with visas, green cards, citizenship, and more. Get expert legal guidance for your immigration needs today.',
  openGraph: {
    title: 'Home - Vasquez Law Firm, PLLC',
    description:
      'Find experienced Raleigh, NC immigration lawyers to help with visas, green cards, citizenship, and more. Get expert legal guidance for your immigration needs today.',
    images: [{ url: '/images/og-default.jpg' }],
  },
};

export default function HomePage() {
  const post = {
    id: 'home',
    title: 'Honest, Reliable Representation at an Affordable Price.',
    slug: 'home',
    excerpt: 'Vasquez Law Firm provides compassionate, effective legal representation for immigration, personal injury, criminal defense, and family law matters throughout North Carolina and Florida.',
    content: `
      <div className="prose prose-lg max-w-none">
        <h2>Welcome to Vasquez Law Firm, PLLC</h2>
        
        <p>At Vasquez Law Firm, we understand that facing legal challenges can be overwhelming and stressful. That's why we're committed to providing honest, reliable representation at an affordable price. Our experienced attorneys serve clients throughout North Carolina and Florida, offering compassionate guidance and aggressive advocacy when you need it most.</p>

        <h3>Our Commitment to Excellence</h3>
        
        <p>Founded on principles of integrity, dedication, and client service, Vasquez Law Firm has built a reputation for delivering results. We believe that everyone deserves access to quality legal representation, regardless of their background or financial situation. Our multilingual team is here to ensure that language is never a barrier to justice.</p>

        <h3>Practice Areas We Serve</h3>
        
        <h4>Immigration Law</h4>
        <p>Navigate the complex U.S. immigration system with confidence. From family-based petitions to deportation defense, our immigration attorneys have helped countless families achieve their American dream. We handle:</p>
        <ul>
          <li>Green Cards and Permanent Residency</li>
          <li>Citizenship and Naturalization</li>
          <li>Visa Applications and Extensions</li>
          <li>DACA and Asylum Cases</li>
          <li>Deportation and Removal Defense</li>
        </ul>

        <h4>Personal Injury</h4>
        <p>If you've been injured due to someone else's negligence, you deserve compensation. Our personal injury lawyers fight tirelessly to ensure you receive fair compensation for medical bills, lost wages, and pain and suffering. We handle:</p>
        <ul>
          <li>Car and Truck Accidents</li>
          <li>Slip and Fall Injuries</li>
          <li>Workplace Accidents</li>
          <li>Medical Malpractice</li>
          <li>Wrongful Death Claims</li>
        </ul>

        <h4>Criminal Defense</h4>
        <p>Facing criminal charges can be life-changing. Our criminal defense attorneys provide aggressive representation to protect your rights and freedom. We defend clients against:</p>
        <ul>
          <li>DUI/DWI Charges</li>
          <li>Drug Offenses</li>
          <li>Assault and Battery</li>
          <li>Theft and Property Crimes</li>
          <li>Traffic Violations</li>
        </ul>

        <h4>Family Law</h4>
        <p>Family legal matters require sensitivity and expertise. Our family law attorneys guide you through difficult times with compassion and professionalism. We assist with:</p>
        <ul>
          <li>Divorce and Separation</li>
          <li>Child Custody and Support</li>
          <li>Property Division</li>
          <li>Alimony and Spousal Support</li>
          <li>Post-Divorce Modifications</li>
        </ul>

        <h3>Why Choose Vasquez Law Firm?</h3>
        
        <p><strong>Experienced Attorneys:</strong> Our legal team brings decades of combined experience and a track record of success in courtrooms throughout North Carolina and Florida.</p>
        
        <p><strong>Multilingual Service:</strong> We serve clients in English and Spanish, ensuring clear communication throughout your case.</p>
        
        <p><strong>Affordable Representation:</strong> We believe quality legal services should be accessible. We offer competitive rates and flexible payment plans.</p>
        
        <p><strong>24/7 Availability:</strong> Legal emergencies don't follow business hours. Our team is available round-the-clock to address urgent matters.</p>
        
        <p><strong>Personalized Attention:</strong> You're not just a case number. We take time to understand your unique situation and develop customized legal strategies.</p>

        <h3>Schedule Your Free Consultation</h3>
        
        <p>Don't face your legal challenges alone. Contact Vasquez Law Firm today for a free consultation. Our experienced attorneys will review your case, explain your options, and help you understand the path forward. With offices in Raleigh and Charlotte, North Carolina, and serving clients throughout Florida, we're here when you need us most.</p>
        
        <p>Call us at (888) 888-8888 or use our online form to schedule your consultation. Let us put our experience and dedication to work for you.</p>
      </div>
    `,
    practiceArea: 'general',
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 5,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['legal services', 'law firm', 'north carolina', 'florida', 'immigration', 'personal injury', 'criminal defense', 'family law'],
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
      relatedPosts={[]}
    />
  );
}
