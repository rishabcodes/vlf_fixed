import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Legal Forms & Documents | Vasquez Law Firm',
  description:
    'Download free legal forms and documents for immigration, personal injury, workers compensation, and criminal defense cases. Court forms, templates, and checklists.',
  keywords:
    'legal forms, court forms, immigration forms, personal injury forms, legal documents, free legal forms, court documents, legal templates',
  openGraph: {
    title: 'Legal Forms & Documents | Vasquez Law Firm',
    description:
      'Access free legal forms and documents for your case. Available in English and Spanish.',
    images: ['/images/legal-forms-hero.jpg'],
  },
};

export default function LegalFormsPage() {
  const post = {
    id: 'legal-forms',
    title: 'Legal Forms & Documents',
    slug: 'legal-forms',
    excerpt:
      'Download essential legal forms, court documents, and templates for immigration, personal injury, workers compensation, and criminal defense cases.',
    content: `
      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">📄 Legal Forms Resource Center</h2>
          <p className="text-blue-800 mb-4">
            Access essential legal forms and documents for your case. All forms are provided free of charge 
            and are available in both English and Spanish. Remember to consult with an attorney before 
            submitting any legal documents.
          </p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="font-bold text-blue-900">⚖️ LEGAL GUIDANCE RECOMMENDED</p>
            <p className="text-blue-800">Forms are complex. Let us help you complete them correctly.</p>
            <p className="text-blue-800 mt-2">Free Consultation: <a href="tel:1-844-965-3536" className="font-bold underline">1-844-YO-PELEO</a></p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Immigration Forms & Documents</h2>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-green-900 mb-4">🌐 USCIS Official Forms</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-bold mb-3">Family-Based Immigration</h4>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>I-130 Petition for Alien Relative</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-130.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-485 Adjustment of Status</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-485.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-864 Affidavit of Support</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-864.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-751 Remove Conditions</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-751.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-bold mb-3">Employment & Benefits</h4>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>I-765 Work Authorization</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-765.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-131 Travel Document</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-131.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-140 Employment Petition</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-140.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-129 Nonimmigrant Worker</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-129.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-bold mb-3">Citizenship & Naturalization</h4>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>N-400 Application for Naturalization</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/n-400.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>N-600 Certificate of Citizenship</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/n-600.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>N-565 Replace Citizenship Document</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/n-565.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-bold mb-3">Humanitarian Protection</h4>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>I-589 Asylum Application</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-589.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-918 U Visa Application</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-918.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-360 VAWA Self-Petition</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-360.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>I-914 T Visa Application</span>
                  <a href="https://www.uscis.gov/sites/default/files/document/forms/i-914.pdf" className="text-blue-600 hover:underline text-sm">Download PDF</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Personal Injury Forms & Documents</h2>

        <div className="bg-orange-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-orange-900 mb-4">🚗 Accident & Injury Documentation</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-bold mb-3">Accident Report Forms</h4>
              <ul className="space-y-2">
                <li>• Auto Accident Information Form <a href="/forms/auto-accident-form" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Witness Statement Template <a href="/forms/witness-statement" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Property Damage Checklist <a href="/forms/property-damage-checklist" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Medical Treatment Log <a href="/forms/medical-treatment-log" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-bold mb-3">Insurance & Claims</h4>
              <ul className="space-y-2">
                <li>• Insurance Claim Checklist <a href="/forms/insurance-claim-checklist" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Medical Records Request <a href="/forms/medical-records-request" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Lost Wages Documentation <a href="/forms/lost-wages-form" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Pain Journal Template <a href="/forms/pain-journal" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-100 p-4 rounded mt-4">
            <p className="font-bold">📸 Document Everything:</p>
            <p className="text-sm">Take photos of injuries, property damage, and the accident scene. Keep all medical bills, receipts, and correspondence.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Workers' Compensation Forms</h2>

        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">🏗️ Workplace Injury Documentation</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold mb-3">North Carolina Forms</h4>
              <ul className="space-y-2">
                <li>• Form 18 - Notice of Accident <a href="https://www.ic.nc.gov/forms.html" className="text-blue-600 hover:underline text-sm ml-2">Official Site</a></li>
                <li>• Form 19 - Employer's Report <a href="https://www.ic.nc.gov/forms.html" className="text-blue-600 hover:underline text-sm ml-2">Official Site</a></li>
                <li>• Form 33 - Request for Hearing <a href="https://www.ic.nc.gov/forms.html" className="text-blue-600 hover:underline text-sm ml-2">Official Site</a></li>
                <li>• Workplace Injury Checklist <a href="/forms/workplace-injury-checklist" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold mb-3">Florida Forms</h4>
              <ul className="space-y-2">
                <li>• DWC-1 First Report of Injury <a href="https://www.myfloridacfo.com/division/wc/forms.htm" className="text-blue-600 hover:underline text-sm ml-2">Official Site</a></li>
                <li>• Petition for Benefits <a href="https://www.myfloridacfo.com/division/wc/forms.htm" className="text-blue-600 hover:underline text-sm ml-2">Official Site</a></li>
                <li>• Medical Treatment Request <a href="https://www.myfloridacfo.com/division/wc/forms.htm" className="text-blue-600 hover:underline text-sm ml-2">Official Site</a></li>
                <li>• Return to Work Documentation <a href="/forms/return-to-work" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Criminal Defense Forms & Resources</h2>

        <div className="bg-red-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-red-900 mb-4">⚖️ Court Documents & Resources</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-bold mb-3">Pre-Trial Documents</h4>
              <ul className="space-y-2">
                <li>• Character Reference Letter Template <a href="/forms/character-reference" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Court Appearance Checklist <a href="/forms/court-appearance-checklist" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Evidence Collection Guide <a href="/forms/evidence-guide" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Witness List Template <a href="/forms/witness-list" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-bold mb-3">Rights & Information</h4>
              <ul className="space-y-2">
                <li>• Know Your Rights Card <a href="/forms/know-your-rights" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Miranda Rights Explanation <a href="/forms/miranda-rights" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Bail Information Sheet <a href="/forms/bail-information" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
                <li>• Expungement Eligibility <a href="/forms/expungement-eligibility" className="text-blue-600 hover:underline text-sm ml-2">Download</a></li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">General Legal Documents</h2>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📋 Commonly Needed Forms</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold mb-3">Affidavits & Declarations</h4>
              <ul className="space-y-1 text-sm">
                <li>• General Affidavit <a href="/forms/general-affidavit" className="text-blue-600 hover:underline ml-2">Download</a></li>
                <li>• Sworn Declaration <a href="/forms/sworn-declaration" className="text-blue-600 hover:underline ml-2">Download</a></li>
                <li>• Witness Affidavit <a href="/forms/witness-affidavit" className="text-blue-600 hover:underline ml-2">Download</a></li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold mb-3">Power of Attorney</h4>
              <ul className="space-y-1 text-sm">
                <li>• General POA <a href="/forms/general-poa" className="text-blue-600 hover:underline ml-2">Download</a></li>
                <li>• Medical POA <a href="/forms/medical-poa" className="text-blue-600 hover:underline ml-2">Download</a></li>
                <li>• Limited POA <a href="/forms/limited-poa" className="text-blue-600 hover:underline ml-2">Download</a></li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold mb-3">Financial Documents</h4>
              <ul className="space-y-1 text-sm">
                <li>• Fee Agreement Template <a href="/forms/fee-agreement" className="text-blue-600 hover:underline ml-2">Download</a></li>
                <li>• Payment Plan Agreement <a href="/forms/payment-plan" className="text-blue-600 hover:underline ml-2">Download</a></li>
                <li>• Financial Affidavit <a href="/forms/financial-affidavit" className="text-blue-600 hover:underline ml-2">Download</a></li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Document Preparation Tips</h2>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">✍️ How to Complete Legal Forms Correctly</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2">DO:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Read all instructions carefully</li>
                <li>Use black or blue ink only</li>
                <li>Print clearly in capital letters</li>
                <li>Answer all questions completely</li>
                <li>Keep copies of everything</li>
                <li>Sign and date where required</li>
                <li>Attach all required documents</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">DON'T:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Leave blanks (write "N/A" if not applicable)</li>
                <li>Use correction fluid or tape</li>
                <li>Provide false information</li>
                <li>Guess at answers you don't know</li>
                <li>Submit incomplete forms</li>
                <li>Forget to make copies</li>
                <li>Miss filing deadlines</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-yellow-900 mb-4">⚠️ Important Warnings</h3>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Accuracy is Critical:</strong> Providing false information on legal forms is a crime</li>
            <li><strong>Deadlines Matter:</strong> Missing deadlines can result in case dismissal or denial</li>
            <li><strong>Translation Requirements:</strong> All foreign documents must be translated by certified translators</li>
            <li><strong>Original Documents:</strong> Some forms require original signatures - copies may not be accepted</li>
            <li><strong>Filing Fees:</strong> Many forms require non-refundable government filing fees</li>
          </ul>
        </div>

        <div className="bg-green-800 text-white p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Need Help Completing These Forms?</h2>
          <p className="text-lg mb-6 text-center">
            Legal forms can be confusing and mistakes can be costly. Our experienced attorneys 
            can help you complete and file your forms correctly the first time.
          </p>
          <div className="text-center">
            <p className="text-xl font-bold mb-2">FREE FORM REVIEW</p>
            <p className="text-3xl font-bold mb-4">
              <a href="tel:1-844-965-3536" className="hover:underline">1-844-YO-PELEO</a>
            </p>
            <p>Se Habla Español • Payment Plans Available</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Legal Disclaimer</h3>
          <p className="text-sm text-gray-700">
            These forms are provided as a public service and for informational purposes only. 
            They do not constitute legal advice and may not be suitable for your specific situation. 
            Laws vary by state and change frequently. We strongly recommend consulting with an 
            attorney before completing or submitting any legal forms. The use of these forms 
            does not create an attorney-client relationship with Vasquez Law Firm, PLLC.
          </p>
        </div>
      </div>
    `,
    practiceArea: 'general' as const,
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 8,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['legal forms', 'court documents', 'legal resources', 'free forms'],
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
