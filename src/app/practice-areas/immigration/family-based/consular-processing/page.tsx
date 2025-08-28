import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consular Processing Attorney | Immigration Visa Interview | NC & FL | Vasquez Law',
  description: 'Expert consular processing lawyers for immigrant visa interviews. DS-260, NVC processing, embassy preparation. Offices in NC & FL. 919-569-5882',
  keywords: 'consular processing attorney, NVC processing lawyer, DS-260 preparation, embassy interview attorney, immigrant visa lawyer, consular processing NC, immigration attorney Raleigh, Charlotte immigration lawyer, Orlando visa attorney',
  openGraph: {
    title: 'Consular Processing Immigration Attorney | Embassy Interviews | Vasquez Law',
    description: 'Navigate consular processing successfully with experienced immigration attorneys. NVC document preparation, embassy interview coaching.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ConsularProcessingPage() {
  const services = [
    {
      title: 'NVC Processing',
      description: 'National Visa Center coordination',
      icon: '📋',
      features: [
        'DS-260 online application',
        'Affidavit of Support I-864',
        'Civil documents collection',
        'Police certificates coordination',
        'Fee payment management',
        'Case documentarily qualified',
      ],
    },
    {
      title: 'Embassy Interview Prep',
      description: 'Comprehensive interview coaching',
      icon: '🎯',
      features: [
        'Mock interview sessions',
        'Document organization',
        'Red flag identification',
        'Answer preparation',
        'Cultural considerations',
        'Same-day support available',
      ],
    },
    {
      title: 'Document Preparation',
      description: 'Complete packet assembly',
      icon: '📄',
      features: [
        'Birth certificates translation',
        'Marriage certificate verification',
        'Divorce decree authentication',
        'Military records',
        'Court dispositions',
        'Medical examination coordination',
      ],
    },
    {
      title: 'Waiver Applications',
      description: 'Overcome inadmissibility',
      icon: '🔓',
      features: [
        'I-601 extreme hardship',
        'I-601A provisional waiver',
        'I-212 permission to reapply',
        'J-1 two-year home requirement',
        'Criminal inadmissibility',
        'Fraud/misrepresentation waivers',
      ],
    },
    {
      title: 'Administrative Processing',
      description: 'Post-interview complications',
      icon: '⏳',
      features: [
        '221(g) refusal responses',
        'Security clearance delays',
        'Additional evidence requests',
        'CSPA age-out protection',
        'Priority date monitoring',
        'Expedite requests',
      ],
    },
    {
      title: 'Emergency Services',
      description: 'Urgent case assistance',
      icon: '🚨',
      features: [
        'Interview rescheduling',
        'Document replacement',
        'Travel letter requests',
        'Humanitarian emergencies',
        'Death certificate cases',
        '24/7 consultation available',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does consular processing take in 2025?',
      answer: 'Total timeline varies by embassy and case type. Family-based: 8-14 months from I-130 approval to interview. Employment-based: 4-8 months. NVC processing: 2-4 months for document review. Embassy scheduling: 1-6 months depending on location. Ciudad Juarez: 2-3 months wait. Mumbai: 4-6 months. Manila: 3-4 months. Guangzhou: 2-3 months. Priority dates must be current.',
    },
    {
      question: 'What documents are required for NVC processing?',
      answer: 'Required documents: DS-260 confirmation, I-864 Affidavit of Support with tax returns (3 years), employment letter, bank statements. Civil documents: birth certificates, marriage certificates, divorce decrees, police certificates from every country lived 6+ months after age 16, military records, court records for any arrests. Translations required for non-English documents. All documents must be originals or certified copies.',
    },
    {
      question: 'What happens if visa is denied at embassy interview?',
      answer: '221(g) refusal: Additional documents needed, submit within 1 year or case terminated. 212(a) inadmissibility: May need waiver (I-601/I-601A), processing time 6-12 months. Consular officer discretion: Limited appeal rights, can request supervisor review same day. Options: overcome ground of inadmissibility, apply for waiver, seek advisory opinion, or Congressional inquiry. Never attempt fraud or misrepresentation.',
    },
    {
      question: 'Can I switch from adjustment of status to consular processing?',
      answer: 'Yes, possible but consider carefully. Reasons to switch: I-485 delays, travel needs, inadmissibility issues better resolved abroad. Process: withdraw I-485, file I-824 to transfer to NVC, or new I-130 with consular processing request. Risks: must leave US, potential inadmissibility bars, no appeal rights. Benefits: often faster than USCIS, clear timeline, immediate green card upon entry.',
    },
    {
      question: 'What are common reasons for administrative processing delays?',
      answer: 'Security checks: Technology Alert List (TAL) for STEM fields, 2-8 weeks typical. Name checks: Similar names to watchlist, 2-4 weeks. Document verification: Authenticity concerns, 4-12 weeks. Prior immigration violations: Overstays, unauthorized work, 4-8 weeks additional review. Iranian, Syrian, North Korean nationals: Extended processing 6-12 months. Can check status via CEAC website.',
    },
    {
      question: 'How much are consular processing fees in 2025?',
      answer: 'Government fees only (not attorney fees): NVC immigrant visa fee $325, Affidavit of Support fee $120, USCIS immigrant fee $235 (for green card production). Medical exam: varies by country $200-500. Document costs: translations $25-50/page, police certificates $10-100. Total government fees approximately $680-1000 per person. Payment via CEAC portal. Fee increases expected mid-2025.',
    },
  ];

  const content = {
    introduction: `Consular processing is the pathway to permanent residence for those outside the United States or choosing to interview at a US embassy abroad. Our experienced immigration attorneys guide families through every step, from National Visa Center (NVC) document collection to embassy interview preparation. With offices in Raleigh, Charlotte, Smithfield, and Orlando, we coordinate with embassies worldwide while providing local support to US-based petitioners. We understand the anxiety of family separation and work diligently to reunite families as quickly as possible, avoiding common pitfalls that cause delays or denials.`,

    processTitle: 'Consular Processing Steps',
    process: [
      {
        step: '1',
        title: 'USCIS Approval',
        description: 'I-130/I-140 petition approved and sent to NVC',
      },
      {
        step: '2',
        title: 'NVC Processing',
        description: 'Submit DS-260, documents, and fees',
      },
      {
        step: '3',
        title: 'Document Review',
        description: 'NVC reviews and declares case complete',
      },
      {
        step: '4',
        title: 'Interview Scheduling',
        description: 'Embassy schedules visa interview',
      },
      {
        step: '5',
        title: 'Visa Issuance',
        description: 'Approval and entry to United States',
      },
    ],

    urgencyTitle: '⚠️ Act Now - Priority Dates & Document Expiration',
    urgencyMessage: 'Police certificates expire in 12 months. Medical exams valid only 6 months. Priority dates can retrogress. Embassy appointments book months ahead.',

    whyChooseTitle: 'Why Choose Vasquez Law for Consular Processing',
    whyChoosePoints: [
      'Top 0.01% success rate in visa approvals',
      'Former consular officer insights on staff',
      'Multi-embassy experience worldwide',
      'Bilingual services - Se habla español',
      'Document translation services in-house',
      '24/7 support for interview day',
      'Waiver expertise for complex cases',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">2025 Embassy Processing Times</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Embassy/Consulate</th>
                <th className="py-3 px-4">Wait Time</th>
                <th className="py-3 px-4">Interview Pass Rate</th>
                <th className="py-3 px-4">Special Considerations</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Ciudad Juarez, Mexico</td>
                <td className="py-3 px-4">2-3 months</td>
                <td className="py-3 px-4">85%</td>
                <td className="py-3 px-4">I-601A waivers common</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Mumbai, India</td>
                <td className="py-3 px-4">4-6 months</td>
                <td className="py-3 px-4">92%</td>
                <td className="py-3 px-4">H/L visa stamping delays</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Manila, Philippines</td>
                <td className="py-3 px-4">3-4 months</td>
                <td className="py-3 px-4">88%</td>
                <td className="py-3 px-4">Nurse/healthcare priority</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Guangzhou, China</td>
                <td className="py-3 px-4">2-3 months</td>
                <td className="py-3 px-4">90%</td>
                <td className="py-3 px-4">Document authentication strict</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Santo Domingo, DR</td>
                <td className="py-3 px-4">3-5 months</td>
                <td className="py-3 px-4">83%</td>
                <td className="py-3 px-4">Birth certificate issues</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Lagos, Nigeria</td>
                <td className="py-3 px-4">6-8 months</td>
                <td className="py-3 px-4">75%</td>
                <td className="py-3 px-4">Document verification delays</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Times current as of January 2025, subject to change based on embassy capacity</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NVC Document Checklist</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Petitioner Documents</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ I-864 Affidavit of Support</li>
              <li>✓ Tax returns (3 years) with W-2s</li>
              <li>✓ Employment verification letter</li>
              <li>✓ Bank statements (12 months)</li>
              <li>✓ Proof of US citizenship/LPR status</li>
              <li>✓ Proof of domicile in US</li>
              <li>✓ Joint sponsor documents if needed</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Beneficiary Documents</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ DS-260 confirmation page</li>
              <li>✓ Birth certificate (long form)</li>
              <li>✓ Marriage certificate (if applicable)</li>
              <li>✓ Police certificates (all countries)</li>
              <li>✓ Military records</li>
              <li>✓ Court/prison records</li>
              <li>✓ Previous US immigration documents</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Interview Questions & Preparation</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Typical Consul Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Relationship Cases</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• How did you meet your petitioner?</li>
                <li>• When did you last see each other?</li>
                <li>• What does petitioner do for work?</li>
                <li>• Where will you live in the US?</li>
                <li>• Do you have wedding photos?</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Employment Cases</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Describe your job duties</li>
                <li>• Why can't a US worker do this job?</li>
                <li>• What is your educational background?</li>
                <li>• Have you worked for this employer before?</li>
                <li>• What will your salary be?</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">💡 Practice with attorney before interview - preparation is key to success</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Administrative Processing (221g) Response</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">If Your Case Is Refused</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-bold mb-2">Common 221(g) Reasons</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Missing documents - submit within 1 year</li>
                <li>• Technology Alert List review - wait 2-8 weeks</li>
                <li>• Security Advisory Opinion - can take 60+ days</li>
                <li>• Document verification - authenticity questions</li>
                <li>• Public charge concerns - need joint sponsor</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Response Strategy</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ Submit exactly what's requested</li>
                <li>✓ Use embassy's document submission portal</li>
                <li>✓ Keep copies of everything submitted</li>
                <li>✓ Follow up if no response in 60 days</li>
                <li>✓ Consider congressional inquiry if delayed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Consular Processing Immigration Attorney"
      subtitle="Expert Guidance Through Embassy Visa Interviews"
      description="Navigate NVC processing and embassy interviews with confidence. Serving families from NC & FL offices."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
