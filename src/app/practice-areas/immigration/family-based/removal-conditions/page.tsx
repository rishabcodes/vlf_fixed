import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I-751 Removal of Conditions Attorney | Green Card | NC & FL | Vasquez Law',
  description: 'Expert I-751 lawyers removing conditions on 2-year green cards. Divorce waivers, joint filing, RFE responses. Offices in NC & FL. 919-569-5882',
  keywords: 'I-751 attorney, removal of conditions lawyer, conditional green card, divorce waiver I-751, 2 year green card renewal, conditional resident attorney, I-751 RFE response, immigration lawyer Raleigh NC, Charlotte I-751 attorney, Orlando conditional residence',
  openGraph: {
    title: 'I-751 Removal of Conditions Attorney | 2-Year Green Card | Vasquez Law',
    description: 'Remove conditions on your green card with experienced immigration attorneys. Joint petitions, divorce waivers, abuse waivers.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RemovalofConditionsI751Page() {
  const services = [
    {
      title: 'Joint Filing',
      description: 'File with spouse together',
      icon: '💑',
      features: [
        'Evidence collection strategy',
        'Relationship documentation',
        'Financial commingling proof',
        'Interview preparation',
        'RFE response expertise',
        '90-day filing window',
      ],
    },
    {
      title: 'Divorce Waiver',
      description: 'File alone after divorce',
      icon: '📝',
      features: [
        'Good faith marriage proof',
        'Divorce decree review',
        'Evidence from marriage period',
        'Affidavit preparation',
        'Interview coaching',
        'Early filing possible',
      ],
    },
    {
      title: 'Abuse Waiver',
      description: 'VAWA-based filing',
      icon: '🛡️',
      features: [
        'Confidential filing',
        'Protection order documentation',
        'Police report compilation',
        'Medical record review',
        'Psychological evaluations',
        'Safety planning included',
      ],
    },
    {
      title: 'Extreme Hardship',
      description: 'Removal would cause hardship',
      icon: '⚠️',
      features: [
        'Country conditions evidence',
        'Medical hardship documentation',
        'Financial impact analysis',
        'Family separation factors',
        'Educational disruption',
        'Expert affidavits',
      ],
    },
    {
      title: 'Late Filing',
      description: 'Missed 90-day window',
      icon: '⏰',
      features: [
        'Good cause statements',
        'Maintaining status proof',
        'NTA defense preparation',
        'Emergency filing',
        'Removal proceedings defense',
        'Status preservation',
      ],
    },
    {
      title: 'RFE Response',
      description: 'Evidence requests',
      icon: '📋',
      features: [
        '87-day response deadline',
        'Additional evidence gathering',
        'Affidavit drafting',
        'Document authentication',
        'Legal arguments',
        'Status maintenance',
      ],
    },
  ];

  const faqs = [
    {
      question: 'When should I file Form I-751 to remove conditions?',
      answer: 'File during the 90-day window before your 2-year green card expires. Check expiration date on card, count back 90 days. Can file earlier with divorce waiver or abuse waiver - no need to wait for 90-day window. Late filing possible with good cause but risky - may trigger removal proceedings. USCIS extends status 48 months upon receipt. Never travel internationally without receipt notice.',
    },
    {
      question: 'What evidence is needed for joint I-751 filing?',
      answer: 'Strong evidence: joint tax returns, joint bank accounts, joint lease/mortgage, insurance policies listing both, birth certificates of children, photos together over time. Good evidence: joint credit cards, utility bills, travel records, affidavits from friends/family. Weak evidence: cards/letters, social media, receipts. Need evidence spanning entire marriage period. Quality over quantity - organize chronologically.',
    },
    {
      question: 'Can I file I-751 if divorced or divorcing?',
      answer: 'Yes, file with divorce waiver. No need to wait for 90-day window. Must prove marriage was entered in good faith, not for immigration benefits. Submit: divorce decree (or pending proof), evidence from marriage period showing bona fides, explanation of relationship breakdown, affidavits from marriage period. Interview likely. Success rate high with proper documentation.',
    },
    {
      question: 'How long does I-751 processing take in 2025?',
      answer: 'Current processing: 24-36 months average. Charlotte office: 28-32 months. Raleigh: 26-30 months. Orlando: 24-28 months. Receipt extends status 48 months. Can work, travel, renew driver\'s license with receipt. Biometrics: 3-6 months after filing. Interview: Only 15-20% get interviewed, usually divorce/waiver cases. Check online status with receipt number.',
    },
    {
      question: 'What happens if I-751 is denied?',
      answer: 'Denial triggers removal proceedings (deportation court). Receive Notice to Appear (NTA) for immigration court. Can renew I-751 application before Immigration Judge with new evidence. Options: appeal to BIA, file motion to reopen/reconsider, federal court review. Never ignore NTA - must appear or get removal order. Most denials due to insufficient evidence or abandonment of application.',
    },
    {
      question: 'Do I need an interview for I-751?',
      answer: 'Most joint filings waived (80-85%). Interviews required for: divorce waivers, abuse waivers, RFE issued, suspected fraud, criminal issues, previous marriage-based petition. Interview locations: local USCIS office. Both spouses must attend if joint filing. Bring original documents, prepare for relationship questions. Can request combo interview with N-400 naturalization.',
    },
  ];

  const content = {
    introduction: `Conditional permanent residents must file Form I-751 to remove conditions and obtain a 10-year green card. This critical step affects your ability to remain in the United States permanently. Our experienced immigration attorneys handle all types of I-751 cases, from straightforward joint filings to complex divorce waivers and abuse-based petitions. With offices in Raleigh, Charlotte, Smithfield, and Orlando, we understand the evidence requirements and interview preparation needed for success. Don't risk denial and removal proceedings - we ensure your petition demonstrates the bona fides of your marriage or qualifies for a waiver.`,

    processTitle: 'I-751 Filing Process',
    process: [
      {
        step: '1',
        title: 'Case Assessment',
        description: 'Determine filing basis and evidence',
      },
      {
        step: '2',
        title: 'Evidence Collection',
        description: 'Gather 2 years of documentation',
      },
      {
        step: '3',
        title: 'I-751 Filing',
        description: 'Submit within 90-day window',
      },
      {
        step: '4',
        title: 'Biometrics',
        description: 'Fingerprints and photo',
      },
      {
        step: '5',
        title: 'Approval/Interview',
        description: '10-year card issued',
      },
    ],

    urgencyTitle: '⏰ Critical Deadline - 90 Day Filing Window',
    urgencyMessage: 'Missing deadline triggers removal proceedings. Late filing requires good cause. Evidence gathering takes weeks. Travel restricted without receipt.',

    whyChooseTitle: 'Why Choose Vasquez Law for I-751',
    whyChoosePoints: [
      '98% approval rate on I-751 cases',
      'Divorce waiver expertise',
      'RFE response specialists',
      'Interview preparation included',
      'Emergency late filing experience',
      'Bilingual services - Se habla español',
      'Payment plans available',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">I-751 Filing Deadlines & Extensions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Card Expiration</th>
                <th className="py-3 px-4">File Starting</th>
                <th className="py-3 px-4">Latest Filing</th>
                <th className="py-3 px-4">Extension Period</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">March 15, 2025</td>
                <td className="py-3 px-4">December 15, 2024</td>
                <td className="py-3 px-4">March 14, 2025</td>
                <td className="py-3 px-4">48 months</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">June 30, 2025</td>
                <td className="py-3 px-4">April 1, 2025</td>
                <td className="py-3 px-4">June 29, 2025</td>
                <td className="py-3 px-4">48 months</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">December 1, 2025</td>
                <td className="py-3 px-4">September 2, 2025</td>
                <td className="py-3 px-4">November 30, 2025</td>
                <td className="py-3 px-4">48 months</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*File as early as possible within 90-day window to avoid issues</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Evidence Requirements by Filing Type</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Joint Filing Evidence</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Joint tax returns (2 years)</li>
              <li>✓ Joint bank account statements</li>
              <li>✓ Lease/mortgage in both names</li>
              <li>✓ Insurance policies together</li>
              <li>✓ Birth certificates of children</li>
              <li>✓ Photos throughout relationship</li>
              <li>✓ Affidavits from friends/family</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Divorce Waiver Evidence</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Final divorce decree</li>
              <li>✓ Evidence from marriage period</li>
              <li>✓ Wedding ceremony proof</li>
              <li>✓ Explanation of breakdown</li>
              <li>✓ Counseling records</li>
              <li>✓ Property settlement</li>
              <li>✓ Good faith affidavits</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">RFE Response Strategy</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Common RFE Requests & Responses</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Insufficient Evidence of Relationship</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Submit additional joint documents</li>
                <li>• Provide detailed relationship timeline</li>
                <li>• Include more affidavits with specific details</li>
                <li>• Add photos with dates and descriptions</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Good Faith Marriage Concerns</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Explain living arrangements if separate</li>
                <li>• Address age/cultural differences</li>
                <li>• Provide courtship evidence</li>
                <li>• Submit communication records</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ 87 days to respond - missing deadline = denial</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Special Situations</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Complex Cases Requiring Special Attention</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Military Spouse</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Deployment affects evidence</li>
                <li>• PCS orders as proof</li>
                <li>• Base housing documentation</li>
                <li>• Expedite available</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Spouse Deceased</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• File as widow(er)</li>
                <li>• Death certificate required</li>
                <li>• No time limit to file</li>
                <li>• Interview usually waived</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="I-751 Removal of Conditions Attorney"
      subtitle="Convert Your 2-Year Card to Permanent Residence"
      description="Expert I-751 filing for conditional residents. Joint petitions, divorce waivers, RFE responses."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
