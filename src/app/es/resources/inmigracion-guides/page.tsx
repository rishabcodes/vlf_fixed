import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Inmigración Guides & Resources | Vasquez Law Firm',
  description:
    'Comprehensive immigration guides, forms, and resources. Green cards, citizenship, work visas, DACA, asylum, and deportation defense. Free guides in English and Spanish.',
  keywords:
    'immigration guides, immigration forms, USCIS forms, green card guide, citizenship guide, visa guide, immigration resources, free immigration help',
  openGraph: {
    title: 'Inmigración Guides & Resources | Vasquez Law Firm',
    description:
      'Free immigration guides and resources to help you navigate the immigration process.',
    images: ['/images/immigration-guides-hero.jpg'],
  },
};

export default function InmigraciónGuidesPage() {
  const post = {
    id: 'immigration-guides',
    title: 'Inmigración Guides & Resources',
    slug: 'immigration-guides',
    excerpt:
      'Access comprehensive immigration guides, forms, and resources to help you navigate your immigration journey.',
    content: `
      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">📚 Your Complete Inmigración Resource Center</h2>
          <p className="text-blue-800 mb-4">
            Navigate the complex immigration system with confidence. Our comprehensive guides, created by experienced immigration attorneys, 
            provide step-by-step instructions for every major immigration process.
          </p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="font-bold text-blue-900">✅ FREE RESOURCES</p>
            <p className="text-blue-800">All guides available in English and Spanish</p>
            <p className="text-blue-800 mt-2">Questions? Call: <a href="tel:1-844-965-3536" className="font-bold underline">1-844-YO-PELEO</a></p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Family-Based Inmigración Guides</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">🏠 Family Petition Guide (I-130)</h3>
            <p className="text-gray-700 mb-4">Complete guide to sponsoring family members for green cards. Includes eligibility requirements, document checklists, and timeline expectations.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
              <li>Immediate relatives vs. preference categories</li>
              <li>Required documents checklist</li>
              <li>Step-by-step filing instructions</li>
              <li>Common mistakes to avoid</li>
            </ul>
            <a href="/resources/family-petition-guide" className="text-blue-600 font-bold hover:underline">Download Guide →</a>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">💑 Marriage-Based Green Card Guide</h3>
            <p className="text-gray-700 mb-4">Everything you need to know about obtaining a green card through marriage to a U.S. citizen or permanent resident.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
              <li>Marriage green card timeline</li>
              <li>Interview preparation tips</li>
              <li>Evidence requirements</li>
              <li>Adjustment of status vs. consular processing</li>
            </ul>
            <a href="/resources/marriage-green-card-guide" className="text-blue-600 font-bold hover:underline">Download Guide →</a>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Employment-Based Inmigración Guides</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">💼 H-1B Visa Guide</h3>
            <p className="text-gray-700 mb-4">Comprehensive guide to H-1B specialty occupation visas, including lottery process, requirements, and maintaining status.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
              <li>H-1B lottery timeline</li>
              <li>Specialty occupation requirements</li>
              <li>Employer obligations</li>
              <li>Status maintenance tips</li>
            </ul>
            <a href="/resources/h1b-visa-guide" className="text-blue-600 font-bold hover:underline">Download Guide →</a>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">🌟 EB-2 NIW Guide</h3>
            <p className="text-gray-700 mb-4">Self-petition for permanent residence through the National Interest Waiver. No employer sponsorship required.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
              <li>NIW eligibility criteria</li>
              <li>Evidence preparation strategies</li>
              <li>Letter of recommendation tips</li>
              <li>Success case examples</li>
            </ul>
            <a href="/resources/eb2-niw-guide" className="text-blue-600 font-bold hover:underline">Download Guide →</a>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Humanitarian Protection Guides</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">🛡️ Asylum Application Guide</h3>
            <p className="text-gray-700 mb-4">Step-by-step guide to applying for asylum in the United States, including eligibility, evidence, and interview preparation.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
              <li>One-year filing deadline</li>
              <li>Persecution grounds</li>
              <li>Country conditions evidence</li>
              <li>Interview preparation</li>
            </ul>
            <a href="/resources/asylum-guide" className="text-blue-600 font-bold hover:underline">Download Guide →</a>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">💔 VAWA Self-Petition Guide</h3>
            <p className="text-gray-700 mb-4">Confidential guide for victims of domestic violence seeking immigration relief under the Violence Against Women Act.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
              <li>Eligibility requirements</li>
              <li>Evidence of abuse</li>
              <li>Safety planning</li>
              <li>Confidentiality protections</li>
            </ul>
            <a href="/resources/vawa-guide" className="text-blue-600 font-bold hover:underline">Download Guide →</a>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Citizenship & Naturalization</h2>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-green-900 mb-4">🇺🇸 Complete Citizenship Guide</h3>
          <p className="text-green-800 mb-4">Everything you need to become a U.S. citizen, from eligibility requirements to oath ceremony.</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded">
              <h4 className="font-bold mb-2">📋 Eligibility</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>5-year vs. 3-year rules</li>
                <li>Physical presence calculator</li>
                <li>Good moral character</li>
                <li>English & civics requirements</li>
              </ul>
            </div>
            
            <div className="bg-green-100 p-4 rounded">
              <h4 className="font-bold mb-2">📚 Test Preparation</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>100 civics questions</li>
                <li>English vocabulary lists</li>
                <li>Practice tests</li>
                <li>Interview tips</li>
              </ul>
            </div>
            
            <div className="bg-green-100 p-4 rounded">
              <h4 className="font-bold mb-2">🎯 Application Process</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>N-400 form guide</li>
                <li>Document checklist</li>
                <li>Biometrics appointment</li>
                <li>Oath ceremony info</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <a href="/resources/citizenship-complete-guide" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 inline-block">Download Complete Citizenship Package →</a>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">DACA & Dreamer Resources</h2>

        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-yellow-900 mb-4">🎓 DACA Renewal Guide</h3>
          <p className="text-yellow-800 mb-4">Step-by-step instructions for renewing your DACA status, including timeline recommendations and document requirements.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2">📅 Renewal Timeline</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>File 150 days before expiration</li>
                <li>Current processing times</li>
                <li>Emergency renewal options</li>
                <li>Travel considerations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">📝 Required Documents</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Form I-821D</li>
                <li>Form I-765</li>
                <li>Form I-765WS</li>
                <li>Supporting evidence</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-100 p-4 rounded mt-4">
            <p className="font-bold text-yellow-900">⚠️ Important Note:</p>
            <p className="text-sm">New DACA applications are not being accepted. This guide is for renewals only.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Deportation Defense Resources</h2>

        <div className="bg-red-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-red-900 mb-4">🚨 Know Your Rights</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-100 p-4 rounded">
              <h4 className="font-bold mb-2">During ICE Encounters</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Right to remain silent</li>
                <li>Right to an attorney</li>
                <li>Do not sign anything</li>
                <li>Emergency contact cards</li>
              </ul>
              <a href="/resources/know-your-rights-card" className="text-red-700 font-bold hover:underline mt-2 inline-block">Download Rights Card →</a>
            </div>
            
            <div className="bg-red-100 p-4 rounded">
              <h4 className="font-bold mb-2">In Inmigración Court</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Court procedure guide</li>
                <li>Relief options checklist</li>
                <li>Evidence preparation</li>
                <li>Finding an attorney</li>
              </ul>
              <a href="/resources/immigration-court-guide" className="text-red-700 font-bold hover:underline mt-2 inline-block">Download Court Guide →</a>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Forms & Applications</h2>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">📄 Common USCIS Forms</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-bold mb-2">Family-Based</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><a href="https://www.uscis.gov/i-130" className="text-blue-600 hover:underline">I-130 Petition</a></li>
                <li><a href="https://www.uscis.gov/i-485" className="text-blue-600 hover:underline">I-485 Adjustment</a></li>
                <li><a href="https://www.uscis.gov/i-751" className="text-blue-600 hover:underline">I-751 Remove Conditions</a></li>
                <li><a href="https://www.uscis.gov/i-864" className="text-blue-600 hover:underline">I-864 Affidavit of Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Employment-Based</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><a href="https://www.uscis.gov/i-140" className="text-blue-600 hover:underline">I-140 Employment Petition</a></li>
                <li><a href="https://www.uscis.gov/i-765" className="text-blue-600 hover:underline">I-765 Work Permit</a></li>
                <li><a href="https://www.uscis.gov/i-131" className="text-blue-600 hover:underline">I-131 Travel Document</a></li>
                <li><a href="https://www.uscis.gov/i-129" className="text-blue-600 hover:underline">I-129 Nonimmigrant Worker</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Other Common Forms</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><a href="https://www.uscis.gov/n-400" className="text-blue-600 hover:underline">N-400 Citizenship</a></li>
                <li><a href="https://www.uscis.gov/i-589" className="text-blue-600 hover:underline">I-589 Asylum</a></li>
                <li><a href="https://www.uscis.gov/i-90" className="text-blue-600 hover:underline">I-90 Replace Green Card</a></li>
                <li><a href="https://www.uscis.gov/i-539" className="text-blue-600 hover:underline">I-539 Extend Status</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-800 text-white p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Need Personal Guidance?</h2>
          <p className="text-lg mb-6 text-center">
            While these guides provide valuable information, every immigration case is unique. 
            Get personalized advice from our experienced immigration attorneys.
          </p>
          <div className="text-center">
            <p className="text-xl font-bold mb-2">FREE CONSULTATION</p>
            <p className="text-3xl font-bold mb-4">
              <a href="tel:1-844-965-3536" className="hover:underline">1-844-YO-PELEO</a>
            </p>
            <p>Available in English & Spanish • Payment Plans Available</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Important Notice</h3>
          <p className="text-sm text-gray-700">
            These guides are for informational purposes only and do not constitute legal advice. 
            Inmigración laws change frequently, and each case is unique. For specific legal advice 
            regarding your situation, please consult with a qualified immigration attorney. 
            Using these guides does not create an attorney-client relationship.
          </p>
        </div>
      </div>
    `,
    practiceArea: 'immigration' as const,
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 10,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['immigration guides', 'legal resources', 'forms', 'USCIS'],
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
      relatedPosts={[]}
    />
  );
}
