import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adjustment of Status Attorney Raleigh NC | Green Card Lawyer Charlotte | I-485 Orlando FL',
  description: 'Top immigration attorneys for adjustment of status I-485 in Raleigh, Charlotte, Smithfield NC & Orlando FL. Same-day consultations. Get green card without leaving USA. Call 919-569-5882',
  keywords: 'adjustment of status attorney Raleigh, I-485 lawyer Charlotte NC, green card attorney Smithfield, immigration lawyer Orlando FL, adjustment of status near me, I-485 processing times 2025, marriage green card lawyer NC, work permit while waiting, advance parole travel document, best immigration attorney Raleigh Charlotte',
  openGraph: {
    title: 'Adjustment of Status I-485 Attorney | Raleigh, Charlotte, Orlando | Vasquez Law',
    description: 'Get your green card without leaving the USA. Top 0.01% immigration law firm. Se habla español.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function AdjustmentofStatusPage() {
  const services = [
    {
      title: 'Marriage-Based I-485',
      description: 'Green cards through US citizen/LPR spouse',
      icon: '💑',
      features: [
        'Same-day I-485 filing Raleigh office',
        'I-130/I-485 concurrent filing',
        'Work permit in 3-5 months',
        'Travel document processing',
        'Interview prep Wake County USCIS',
        'Bona fide marriage evidence',
      ],
    },
    {
      title: 'Family-Based Adjustment',
      description: 'Parents, children, siblings petitions',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Immediate relative fast track',
        'Priority date monitoring',
        'Age-out protection CSPA',
        'Derivative beneficiaries',
        'Charlotte USCIS field office',
        'Affidavit of support I-864',
      ],
    },
    {
      title: 'Employment I-485',
      description: 'Work-based green card applications',
      icon: '💼',
      features: [
        'EB-1, EB-2, EB-3 categories',
        'I-140 approved cases',
        'AC21 job portability',
        'H-1B to green card',
        'Supplement J filing',
        'RTP area tech companies',
      ],
    },
    {
      title: 'Work Permit & Travel',
      description: 'Benefits while I-485 pending',
      icon: '✈️',
      features: [
        'I-765 work authorization',
        'I-131 advance parole',
        'Combo card applications',
        'Expedite requests urgent cases',
        'SSN applications included',
        'Driver license assistance NC DMV',
      ],
    },
    {
      title: 'Interview Preparation',
      description: 'USCIS interview success strategies',
      icon: '🎯',
      features: [
        'Charlotte field office prep',
        'Raleigh USCIS interviews',
        'Document organization',
        'Mock interview sessions',
        'Interpreter services Spanish',
        'Same-day decision advocacy',
      ],
    },
    {
      title: 'Complex Cases',
      description: 'Overcoming adjustment barriers',
      icon: '🔧',
      features: [
        'Unlawful presence waivers',
        'Criminal inadmissibility',
        'Prior deportation cases',
        'Fraud waiver I-601',
        'Public charge overcome',
        'Appeals and motions',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does adjustment of status take in Raleigh, Charlotte, or Orlando USCIS offices?',
      answer: 'Processing times vary by category and field office. Marriage-based I-485: 8-14 months at Charlotte and Raleigh USCIS, 10-16 months Orlando. Family-based: 10-24 months depending on priority date. Employment-based: 8-18 months if current. Work permits arrive 3-5 months, travel documents 4-6 months. Charlotte office slightly faster than Raleigh for interviews.',
    },
    {
      question: 'Can I work and travel while my I-485 adjustment is pending?',
      answer: 'Yes! File I-765 for work authorization (EAD) and I-131 for advance parole travel document with your I-485. Most applicants receive combo card in 3-5 months allowing work and international travel. Warning: Don\'t travel without advance parole or you abandon your application. NC residents can work immediately with EAD at any employer.',
    },
    {
      question: 'What is the cost for adjustment of status in North Carolina or Florida?',
      answer: 'USCIS fees total $1,760-2,820: I-485 ($1,440), biometrics ($85), I-765 work permit (free with I-485), I-131 travel (free with I-485), medical exam ($200-400 at approved doctors in Raleigh, Charlotte, Orlando). Additional: translations, attorney assistance. Fee waivers available for qualifying applicants. Payment plans offered at Vasquez Law.',
    },
    {
      question: 'Do I need to leave the USA for adjustment of status?',
      answer: 'No! That\'s the advantage - you get your green card without leaving. Must have lawful entry (visa, parole) and maintain status for most categories. Immediate relatives of US citizens can adjust even with overstay. Compare to consular processing which requires leaving USA. Our Raleigh, Charlotte, and Orlando offices handle both processes.',
    },
    {
      question: 'What happens at the I-485 interview in Charlotte or Raleigh USCIS?',
      answer: 'Officer reviews application, verifies identity, asks about eligibility. Marriage cases: questions about relationship, living together, shared finances. Employment: job duties verification. Bring originals of all documents, recent paystubs, updated photos. Charlotte USCIS at 6130 Tyvola Centre Dr. Raleigh interviews at 5801 Executive Center Dr. Most receive decision same day.',
    },
    {
      question: 'Can I adjust status if I entered illegally or overstayed my visa?',
      answer: 'Depends on category. Immediate relatives of US citizens (spouse, unmarried children under 21, parents) can adjust despite overstay if entered legally. Illegal entry requires waiver or consular processing. Employment and other family categories cannot adjust with immigration violations. 245(i) protection for some with old petitions. Free consultation determines options.',
    },
  ];

  const content = {
    introduction: `Getting your green card through adjustment of status allows you to become a permanent resident without leaving the United States. Whether you're in Raleigh's Research Triangle, Charlotte's banking center, historic Smithfield, or sunny Orlando, our experienced immigration attorneys guide you through every step of the I-485 process. As North Carolina and Florida's premier immigration law firm in the top 0.01% nationwide, we've successfully handled thousands of adjustment cases at USCIS field offices in Charlotte, Raleigh, and Orlando. From work permits to interview preparation, we ensure your path to permanent residence is smooth and successful.`,

    processTitle: 'I-485 Adjustment Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Check',
        description: 'Confirm qualification for adjustment',
      },
      {
        step: '2',
        title: 'Document Preparation',
        description: 'Complete forms and evidence gathering',
      },
      {
        step: '3',
        title: 'USCIS Filing',
        description: 'Submit I-485 package with supporting docs',
      },
      {
        step: '4',
        title: 'Biometrics & EAD',
        description: 'Fingerprints and work permit issuance',
      },
      {
        step: '5',
        title: 'Interview & Approval',
        description: 'USCIS interview and green card receipt',
      },
    ],

    urgencyTitle: '📈 File Now - Processing Times Increasing',
    urgencyMessage: 'USCIS backlogs growing. Priority dates can retrogress. Work permit delays affecting applicants. Start today for fastest results.',

    whyChooseTitle: 'Why Choose Vasquez Law for Your Green Card',
    whyChoosePoints: [
      'Top 0.01% immigration law firm nationally',
      '10,000+ successful adjustments in NC and FL',
      'Same-day I-485 filing available',
      'Former USCIS officers on staff',
      'Charlotte & Raleigh USCIS expertise',
      'Bilingual team - Se habla español',
      'Payment plans and free consultations',
      'Offices in Raleigh, Charlotte, Smithfield NC & Orlando FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Current I-485 Processing Times by Office (2025)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Field Office</th>
                <th className="py-3 px-4">Family-Based</th>
                <th className="py-3 px-4">Employment-Based</th>
                <th className="py-3 px-4">Work Permit</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Charlotte, NC</td>
                <td className="py-3 px-4">11.5 months</td>
                <td className="py-3 px-4">9 months</td>
                <td className="py-3 px-4">3.5 months</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Raleigh-Durham, NC</td>
                <td className="py-3 px-4">13 months</td>
                <td className="py-3 px-4">10.5 months</td>
                <td className="py-3 px-4">4 months</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Orlando, FL</td>
                <td className="py-3 px-4">14.5 months</td>
                <td className="py-3 px-4">12 months</td>
                <td className="py-3 px-4">4.5 months</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">National Average</td>
                <td className="py-3 px-4">15.5 months</td>
                <td className="py-3 px-4">11 months</td>
                <td className="py-3 px-4">5 months</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Times from USCIS.gov - Check current processing times as they change monthly</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Required Documents for I-485 Adjustment</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">All Applicants Need</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Form I-485 with filing fee</li>
              <li>• Birth certificate with translation</li>
              <li>• Passport photos (2)</li>
              <li>• I-693 medical exam (sealed)</li>
              <li>• I-94 arrival record</li>
              <li>• Passport copies (all pages)</li>
              <li>• Police certificates if required</li>
              <li>• Court records for any arrests</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Category-Specific</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Marriage: certificate, joint accounts</li>
              <li>• Employment: I-140 approval, job letter</li>
              <li>• Family: I-130 approval or receipt</li>
              <li>• I-864 Affidavit of Support</li>
              <li>• Tax returns (3 years)</li>
              <li>• Paystubs (6 months)</li>
              <li>• Bank statements</li>
              <li>• Evidence of relationship/job</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">USCIS Field Office Locations</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Charlotte USCIS</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>📍 6130 Tyvola Centre Dr</li>
                <li>Charlotte, NC 28217</li>
                <li>📞 800-375-5283</li>
                <li>Serving: Western NC</li>
                <li>Parking: Free on-site</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Raleigh USCIS</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>📍 5801 Executive Center Dr</li>
                <li>Charlotte, NC 28212</li>
                <li>📞 800-375-5283</li>
                <li>Serving: Eastern NC</li>
                <li>Near I-77 & W.T. Harris</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Orlando USCIS</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>📍 5801 Lakehurst Dr</li>
                <li>Orlando, FL 32809</li>
                <li>📞 800-375-5283</li>
                <li>Serving: Central FL</li>
                <li>Near FL Mall</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common I-485 Denial Reasons & Solutions</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">Denial Reasons</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>❌ Unlawful presence/overstay</li>
                <li>❌ Criminal convictions</li>
                <li>❌ Public charge concerns</li>
                <li>❌ Fraud/misrepresentation</li>
                <li>❌ Failed medical exam</li>
                <li>❌ Incomplete application</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">Our Solutions</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ I-601/I-601A waivers</li>
                <li>✓ Criminal record analysis</li>
                <li>✓ I-864 joint sponsors</li>
                <li>✓ Fraud waiver preparation</li>
                <li>✓ Medical inadmissibility waivers</li>
                <li>✓ RFE response expertise</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Adjustment of Status I-485 Attorney NC & FL"
      subtitle="Get Your Green Card Without Leaving USA"
      description="Expert I-485 adjustment of status lawyers in Raleigh, Charlotte, Smithfield & Orlando. Work permits, travel documents, interview prep."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
