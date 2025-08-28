import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TN Visa Attorney NC & FL | USMCA Professional Workers | Vasquez Law',
  description: 'TN visa for Canadian and Mexican professionals under USMCA. Fast processing, renewable status for qualified occupations.',
  keywords: 'TN visa attorney, NAFTA professional, USMCA visa, Canadian Mexican workers, TN status',
};

export default function TNVisaPage() {
  const services = [
    {
      title: 'TN-1 Canadian Citizens',
      description: 'Direct port of entry applications',
      icon: '🇨🇦',
      features: [
        'Port of entry processing',
        'No visa stamp required',
        'Same-day approval possible',
        'Premium processing available',
        'I-94 extension options',
        'Status changes from within U.S.',
      ],
    },
    {
      title: 'TN-2 Mexican Citizens',
      description: 'Consular visa processing required',
      icon: '🇲🇽',
      features: [
        'DS-160 visa application',
        'Consular interview required',
        'Labor condition application',
        'Border card considerations',
        'Visa stamp validity',
        'I-94 admission records',
      ],
    },
    {
      title: 'Qualifying Professions',
      description: '60+ USMCA occupations',
      icon: '📋',
      features: [
        'Engineers and architects',
        'Scientists and researchers',
        'Medical professionals',
        'Computer systems analysts',
        'Management consultants',
        'Accountants and economists',
      ],
    },
    {
      title: 'Documentation Strategy',
      description: 'Meeting specific requirements',
      icon: '📁',
      features: [
        'Degree evaluations',
        'License verification',
        'Job offer letters',
        'Employer support letters',
        'Professional credentials',
        'Experience documentation',
      ],
    },
    {
      title: 'Extensions & Changes',
      description: 'Maintaining TN status',
      icon: '🔄',
      features: [
        '3-year extensions',
        'Employer changes',
        'Concurrent employment',
        'Part-time TN status',
        'Green card transitions',
        'Family TD status',
      ],
    },
    {
      title: 'Compliance & Issues',
      description: 'Avoiding common problems',
      icon: '⚠️',
      features: [
        'Self-employment restrictions',
        'Permanent residence intent',
        'Management activities limits',
        'Border officer challenges',
        'RFE responses',
        'Status violation remedies',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What professions qualify for TN status?',
      answer: 'USMCA lists 60+ professions including engineers, scientists, teachers, medical professionals, computer systems analysts, management consultants, accountants, architects, and more. Each has specific degree/license requirements. Some require Bachelor\'s, others need licenses or certifications. Job duties must match USMCA description.',
    },
    {
      question: 'How long can I stay on TN visa?',
      answer: 'Initial period up to 3 years. Unlimited 3-year extensions possible - no maximum stay limit. Must maintain nonimmigrant intent but can pursue green card carefully. Canadians can renew at port of entry. Mexicans need visa renewals. Extensions filed with USCIS or at border.',
    },
    {
      question: 'Can TN visa holders get green cards?',
      answer: 'Yes, but carefully! TN requires nonimmigrant intent. Cannot apply immediately after TN entry. Best practice: maintain TN for period, then employer starts PERM/I-140, continue extending TN, file I-485 when priority date current. Risky to travel abroad after showing immigrant intent.',
    },
    {
      question: 'What\'s the difference between TN and H-1B?',
      answer: 'TN: No annual cap, faster processing, specific profession list, 3-year periods, must maintain nonimmigrant intent initially. H-1B: Annual lottery, any specialty occupation, 6-year maximum, allows dual intent from start, more expensive, leads to green card easier.',
    },
    {
      question: 'Can my family work on TD status?',
      answer: 'No, TD (spouse and children under 21) cannot work but can study. No EAD available for TD holders. Spouse might qualify for own TN if Canadian/Mexican and qualified profession. Consider other status for work authorization. Children can attend school K-12 and university.',
    },
    {
      question: 'What if I\'m denied at the border?',
      answer: 'Don\'t argue - withdraw application to avoid formal denial. Common issues: wrong profession category, insufficient documentation, immigrant intent, unauthorized employment. Reapply with better documentation. Consider I-129 filing with USCIS instead. Get legal help for complex cases.',
    },
  ];

  const content = {
    introduction: `The TN visa under USMCA (formerly NAFTA) provides Canadian and Mexican professionals quick access to U.S. employment opportunities. With no annual caps and straightforward requirements for qualified professions, TN status offers flexibility for cross-border talent. Our expertise helps professionals navigate the specific requirements, avoid common pitfalls, and maintain long-term status while building careers in the United States.`,

    processTitle: 'TN Visa Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Assessment',
        description: 'Confirm profession qualifies',
      },
      {
        step: '2',
        title: 'Document Preparation',
        description: 'Gather credentials and offer letter',
      },
      {
        step: '3',
        title: 'Application Method',
        description: 'Port of entry or USCIS filing',
      },
      {
        step: '4',
        title: 'Submission/Interview',
        description: 'Present case to officer',
      },
      {
        step: '5',
        title: 'Approval & Entry',
        description: 'Begin employment in U.S.',
      },
    ],

    urgencyTitle: '✈️ Same-Day Processing Available',
    urgencyMessage: 'Canadians can get TN status at airport/border immediately. Mexicans need consular appointments. Start date approaching fast.',

    whyChooseTitle: 'Why Choose Vasquez Law for TN',
    whyChoosePoints: [
      'Border and USCIS filing expertise',
      'Profession qualification analysis',
      'Difficult case strategies',
      'Green card transition planning',
      'Multi-state employer support',
      'RFE and denial responses',
      'Port of entry preparation',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common TN Professions & Requirements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Profession</th>
                <th className="py-3 px-4">Minimum Education</th>
                <th className="py-3 px-4">Additional Requirements</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Engineer</td>
                <td className="py-3 px-4">Bachelor's degree</td>
                <td className="py-3 px-4">State license if required by state</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Computer Systems Analyst</td>
                <td className="py-3 px-4">Bachelor's or Post-Secondary Diploma + 3 years</td>
                <td className="py-3 px-4">Experience can substitute</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Management Consultant</td>
                <td className="py-3 px-4">Bachelor's or 5 years experience</td>
                <td className="py-3 px-4">Experience in consulting field</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Scientific Technician</td>
                <td className="py-3 px-4">Theoretical knowledge</td>
                <td className="py-3 px-4">Work with professionals</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Medical Professional</td>
                <td className="py-3 px-4">MD or professional degree</td>
                <td className="py-3 px-4">State license required</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Accountant</td>
                <td className="py-3 px-4">Bachelor's degree</td>
                <td className="py-3 px-4">CPA for some positions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">TN Application Methods</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Port of Entry (Canadians)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Apply directly at border/airport</li>
              <li>✓ Same-day decision</li>
              <li>✓ No appointment needed</li>
              <li>✓ Lower government fees</li>
              <li>✓ Original documents required</li>
              <li>✓ CBP officer discretion</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">I-129 with USCIS</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Available to both Canadians and Mexicans</li>
              <li>✓ Premium processing available (15 days)</li>
              <li>✓ Change of status possible</li>
              <li>✓ Extensions without travel</li>
              <li>✓ More predictable outcome</li>
              <li>✓ Higher government fees</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">TN Status Do's and Don'ts</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">DO</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ Maintain valid passport always</li>
                <li>✓ Keep employment within TN profession</li>
                <li>✓ File extensions before expiration</li>
                <li>✓ Document maintenance of status</li>
                <li>✓ Report material changes to USCIS</li>
                <li>✓ Keep copies of all documents</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">DON'T</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✗ Work without proper authorization</li>
                <li>✗ Engage in self-employment</li>
                <li>✗ File green card immediately after entry</li>
                <li>✗ Work for non-petitioning employer</li>
                <li>✗ Overstay I-94 expiration</li>
                <li>✗ Misrepresent intentions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="TN USMCA Professional Visa"
      subtitle="Fast Track for Canadian & Mexican Professionals"
      description="Expert TN visa assistance for qualified professionals. Quick processing, renewable status, strategic planning."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
