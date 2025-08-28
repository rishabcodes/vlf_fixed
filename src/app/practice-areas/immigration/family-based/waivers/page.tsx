import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Waiver Attorney | I-601 I-601A I-212 | NC & FL | Vasquez Law',
  description: 'Expert waiver lawyers for immigration inadmissibility. I-601 extreme hardship, I-601A provisional, I-212 reentry. Offices in NC & FL. 919-569-5882',
  keywords: 'I-601 waiver attorney, I-601A provisional waiver lawyer, extreme hardship waiver, immigration waiver attorney, inadmissibility waiver, I-212 attorney, unlawful presence waiver, immigration lawyer Raleigh NC, Charlotte waiver attorney, Orlando I-601 lawyer',
  openGraph: {
    title: 'Immigration Waiver Attorney | I-601/I-601A Extreme Hardship | Vasquez Law',
    description: 'Overcome inadmissibility with experienced waiver attorneys. Unlawful presence, criminal issues, fraud waivers.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function WaiversI601I601APage() {
  const services = [
    {
      title: 'I-601 Extreme Hardship',
      description: 'Standard waiver application',
      icon: '📋',
      features: [
        'Unlawful presence bars',
        'Criminal inadmissibility',
        'Fraud/misrepresentation',
        'Medical hardship evidence',
        'Financial impact analysis',
        'Country conditions research',
      ],
    },
    {
      title: 'I-601A Provisional',
      description: 'Stateside waiver before travel',
      icon: '✈️',
      features: [
        'Unlawful presence only',
        'File before leaving US',
        'Avoid lengthy separation',
        'Consular processing prep',
        'Biometrics in US',
        '4-6 month processing',
      ],
    },
    {
      title: 'I-212 Permission',
      description: 'Reapply after deportation',
      icon: '🔄',
      features: [
        'Previous removal orders',
        'Expedited removal cases',
        '5/10/20 year bars',
        'Permanent bar waivers',
        'Criminal deportations',
        'Simultaneous filing possible',
      ],
    },
    {
      title: 'Criminal Waivers',
      description: 'CIMT and drug offenses',
      icon: '⚖️',
      features: [
        'Crimes of moral turpitude',
        'Multiple criminal convictions',
        'Drug offense waivers',
        'Prostitution waivers',
        'Rehabilitation evidence',
        'Post-conviction relief',
      ],
    },
    {
      title: 'J-1 Waivers',
      description: 'Two-year home requirement',
      icon: '🎓',
      features: [
        'No objection statements',
        'Interested government agency',
        'Persecution claims',
        'Exceptional hardship',
        'State DOS recommendations',
        'Skills list waivers',
      ],
    },
    {
      title: 'Healthcare Waivers',
      description: 'Medical inadmissibility',
      icon: '🏥',
      features: [
        'Vaccine requirement waivers',
        'Communicable diseases',
        'Mental health conditions',
        'Drug abuse/addiction',
        'Medical examination issues',
        'Public charge healthcare',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is extreme hardship for I-601/I-601A waivers?',
      answer: 'Extreme hardship must be to US citizen or LPR spouse/parent, not to applicant. Factors: medical conditions requiring US treatment, country conditions (violence, poverty), financial impact beyond normal, educational disruption for children, psychological impact with evaluations, family ties in US, lack of family abroad. Cumulative effect considered. Need documentation for each factor. Success rate higher with multiple qualifying relatives.',
    },
    {
      question: 'What\'s the difference between I-601 and I-601A waivers?',
      answer: 'I-601A: File before leaving US, only for unlawful presence (3/10 year bars), avoid family separation during processing, must have approved I-130, for consular processing only. I-601: File from inside or outside US, covers all inadmissibility grounds (criminal, fraud, unlawful presence), can file with adjustment of status, broader but takes longer. Both require extreme hardship to qualifying relative.',
    },
    {
      question: 'How long do immigration waivers take to process in 2025?',
      answer: 'I-601: 12-18 months standard, expedite available for emergencies. I-601A: 4-6 months, Nebraska Service Center faster. I-212: 6-12 months, often filed with I-601. J-1: 3-4 months for no objection, 6-12 months for hardship. USCIS processing varies by complexity. Can check status online. RFE adds 2-3 months. Appeal if denied: 18-24 months.',
    },
    {
      question: 'What crimes can be waived with I-601?',
      answer: 'Waivable: single crime of moral turpitude (CIMT) with exceptions, multiple CIMTs if rehabilitated, prostitution, single marijuana possession under 30g (sometimes), unlawful voting if thought citizen. Not waivable: drug trafficking, aggravated felonies (for LPRs), murder, torture, persecution. Need certified court records, police reports, rehabilitation evidence. Post-conviction relief may eliminate need for waiver.',
    },
    {
      question: 'Can I appeal if my waiver is denied?',
      answer: 'I-601/I-601A: No direct appeal to AAO, but can file motion to reopen/reconsider within 30 days, or refile with new evidence. If in removal proceedings, can renew before Immigration Judge. Federal court review possible but limited. I-212: Similar options. Success on refiling depends on addressing denial reasons. Many denials due to insufficient hardship evidence - need stronger documentation.',
    },
    {
      question: 'How much do waiver applications cost in 2025?',
      answer: 'USCIS fees: I-601 $1,050, I-601A $795, I-212 $1,050, biometrics $85. Additional costs: psychological evaluations $500-1,500, medical exams $200-500, country condition experts $1,000-3,000, translations $30-50/page. Total with all documents: $2,000-5,000 in fees alone. Fee waivers available for low income. Payment plans for attorney fees available.',
    },
  ];

  const content = {
    introduction: `Immigration waivers provide a lifeline for individuals facing inadmissibility to the United States. Whether you're barred due to unlawful presence, criminal convictions, prior deportations, or immigration violations, our experienced waiver attorneys can help you overcome these obstacles. With offices in Raleigh, Charlotte, Smithfield, and Orlando, we've successfully obtained hundreds of I-601, I-601A, and I-212 waivers by demonstrating extreme hardship and rehabilitation. Don't let past mistakes or immigration violations separate you from your family - we'll build a compelling waiver case that addresses all legal requirements while telling your unique story.`,

    processTitle: 'Waiver Application Process',
    process: [
      {
        step: '1',
        title: 'Inadmissibility Analysis',
        description: 'Identify specific grounds and waiver type',
      },
      {
        step: '2',
        title: 'Evidence Gathering',
        description: 'Collect hardship documentation',
      },
      {
        step: '3',
        title: 'Application Preparation',
        description: 'Draft waiver and supporting brief',
      },
      {
        step: '4',
        title: 'USCIS Filing',
        description: 'Submit with all evidence',
      },
      {
        step: '5',
        title: 'Decision',
        description: 'Approval or response to RFE',
      },
    ],

    urgencyTitle: '⚠️ Don\'t Delay - Bars Accumulate Daily',
    urgencyMessage: 'Unlawful presence accrues daily. Criminal statutes of limitation apply. Evidence becomes harder to obtain. Family separation continues.',

    whyChooseTitle: 'Why Choose Vasquez Law for Waivers',
    whyChoosePoints: [
      '95% waiver approval rate',
      'Former immigration prosecutor insights',
      'Psychological evaluation network',
      'Country condition experts on call',
      'Simultaneous filing expertise',
      'Bilingual services - Se habla español',
      'Emergency expedite requests',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Inadmissibility Grounds & Available Waivers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Ground of Inadmissibility</th>
                <th className="py-3 px-4">INA Section</th>
                <th className="py-3 px-4">Waiver Available</th>
                <th className="py-3 px-4">Requirements</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">3-year unlawful presence</td>
                <td className="py-3 px-4">212(a)(9)(B)(i)(I)</td>
                <td className="py-3 px-4">I-601/I-601A</td>
                <td className="py-3 px-4">Extreme hardship</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">10-year unlawful presence</td>
                <td className="py-3 px-4">212(a)(9)(B)(i)(II)</td>
                <td className="py-3 px-4">I-601/I-601A</td>
                <td className="py-3 px-4">Extreme hardship</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Permanent bar</td>
                <td className="py-3 px-4">212(a)(9)(C)</td>
                <td className="py-3 px-4">I-212 after 10 years</td>
                <td className="py-3 px-4">Permission to reapply</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Criminal convictions</td>
                <td className="py-3 px-4">212(a)(2)</td>
                <td className="py-3 px-4">I-601</td>
                <td className="py-3 px-4">Rehabilitation + hardship</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Fraud/misrepresentation</td>
                <td className="py-3 px-4">212(a)(6)(C)(i)</td>
                <td className="py-3 px-4">I-601</td>
                <td className="py-3 px-4">Extreme hardship</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">False claim to US citizenship</td>
                <td className="py-3 px-4">212(a)(6)(C)(ii)</td>
                <td className="py-3 px-4">No waiver</td>
                <td className="py-3 px-4">Limited exceptions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Extreme Hardship Factors</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Strong Hardship Evidence</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Medical conditions requiring US care</li>
              <li>✓ Disabled children needing services</li>
              <li>✓ Elderly parents requiring support</li>
              <li>✓ Country violence/persecution</li>
              <li>✓ No family in home country</li>
              <li>✓ US military service</li>
              <li>✓ Specialized employment in US</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Supporting Documentation</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Medical records and prognosis</li>
              <li>✓ Psychological evaluations</li>
              <li>✓ Country condition reports</li>
              <li>✓ Financial documentation</li>
              <li>✓ School records for children</li>
              <li>✓ Employment verification</li>
              <li>✓ Family support letters</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">I-601A Provisional Waiver Process</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Stateside Processing Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">1️⃣</div>
              <div>
                <h4 className="text-blue-400 font-bold">I-130 Approval</h4>
                <p className="text-gray-300 text-sm">Must have approved family petition first</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">2️⃣</div>
              <div>
                <h4 className="text-green-400 font-bold">I-601A Filing</h4>
                <p className="text-gray-300 text-sm">File while in US with extreme hardship evidence</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">3️⃣</div>
              <div>
                <h4 className="text-yellow-400 font-bold">Biometrics in US</h4>
                <p className="text-gray-300 text-sm">Fingerprints at USCIS office</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">4️⃣</div>
              <div>
                <h4 className="text-purple-400 font-bold">Approval & Travel</h4>
                <p className="text-gray-300 text-sm">Once approved, travel for consular interview</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Immigration Waiver Attorney"
      subtitle="Overcome Inadmissibility with I-601, I-601A, and I-212 Waivers"
      description="Expert waiver attorneys proving extreme hardship and rehabilitation. Serving families from NC & FL."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
