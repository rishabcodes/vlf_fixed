import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'License Suspension Attorney NC & FL | DMV Restoration | Vasquez Law',
  description: 'Fighting license suspensions and restoring driving privileges. DMV hearings, limited privileges, point reduction.',
  keywords: 'license suspension, DMV hearing, license restoration, limited driving privilege',
};

export default function LicenseSuspensionPage() {
  const services = [
    {
      title: 'DMV Hearings',
      description: 'Administrative hearing representation',
      icon: '⚖️',
      features: [
        'DWI refusal hearings',
        'Point suspension appeals',
        'Medical review hearings',
        'Commercial license hearings',
        'Habitual offender hearings',
        'Immediate restoration petitions',
      ],
    },
    {
      title: 'Limited Privileges',
      description: 'Securing restricted driving rights',
      icon: '🚗',
      features: [
        'Work driving privileges',
        'School transportation',
        'Medical appointments',
        'Court-ordered programs',
        'Household maintenance',
        'Emergency situations',
      ],
    },
    {
      title: 'Point Reduction',
      description: 'Removing points from driving record',
      icon: '📊',
      features: [
        'Prayer for judgment continued',
        'Defensive driving school',
        'Record expungement',
        'Out-of-state transfers',
        'Point calculation disputes',
        'Insurance point reduction',
      ],
    },
    {
      title: 'DWI Suspensions',
      description: 'Alcohol-related license issues',
      icon: '🚫',
      features: [
        '30-day civil revocation',
        'Conviction suspensions',
        'Refusal revocations',
        'Ignition interlock requirements',
        'Substance abuse assessments',
        'Multiple offense cases',
      ],
    },
    {
      title: 'Insurance Issues',
      description: 'Insurance-related suspensions',
      icon: '🛡️',
      features: [
        'SR-22 filing assistance',
        'Insurance lapse suspensions',
        'Accident without insurance',
        'False insurance cases',
        'High-risk insurance help',
        'DL-123 compliance',
      ],
    },
    {
      title: 'Full Restoration',
      description: 'Complete license reinstatement',
      icon: '✅',
      features: [
        'Compliance verification',
        'Fee payment assistance',
        'Testing requirements',
        'Interstate compact issues',
        'Federal disqualifications',
        'Lifetime revocation appeals',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Why was my license suspended?',
      answer: 'Common reasons: accumulating 12+ points in 3 years, DWI conviction, failure to appear in court, unpaid tickets, no insurance, failure to pay child support, or drug convictions. Check your compliance summary from DMV for specific reasons.',
    },
    {
      question: 'Can I drive at all with a suspended license?',
      answer: 'No! Driving while suspended is a Class 1 misdemeanor with mandatory jail time for repeat offenses. However, you may qualify for limited driving privileges for work, school, treatment, and household maintenance. We help petition for these privileges.',
    },
    {
      question: 'How long does license suspension last?',
      answer: 'Varies by violation: speeding over 75mph (30-60 days), DWI first offense (1 year), excessive points (60 days), no insurance (30 days to indefinite). Some suspensions continue until you complete requirements like paying fines or obtaining insurance.',
    },
    {
      question: 'What is a limited driving privilege?',
      answer: 'Court-ordered permission to drive for specific purposes during suspension: work (including commute), school, medical care, court-ordered treatment, community service, and household maintenance. Not available for all suspensions. Strict time and route restrictions apply.',
    },
    {
      question: 'How do I get my license back?',
      answer: 'Complete suspension period, pay restoration fee ($65 NC, $75 FL), clear all tickets/fines, obtain required insurance, complete any court-ordered programs. Some cases require retesting. We guide you through every requirement.',
    },
    {
      question: 'Can suspension from another state affect me?',
      answer: 'Yes! Most states share suspension information through the Interstate Compact. Unresolved out-of-state issues will prevent license restoration. We help clear multi-state problems.',
    },
  ];

  const content = {
    introduction: `License suspension devastates your ability to work, care for family, and live normally. Whether facing suspension for points, DWI, or unpaid tickets, immediate action can preserve your driving privileges or secure limited driving rights. Our attorneys fight suspensions, win DMV hearings, and restore licenses throughout North Carolina and Florida.`,

    processTitle: 'License Restoration Process',
    process: [
      {
        step: '1',
        title: 'Suspension Analysis',
        description: 'Identify all suspension reasons and requirements',
      },
      {
        step: '2',
        title: 'DMV Hearing',
        description: 'Challenge suspension at administrative hearing',
      },
      {
        step: '3',
        title: 'Limited Privilege',
        description: 'Petition court for restricted driving rights',
      },
      {
        step: '4',
        title: 'Compliance',
        description: 'Complete all requirements for restoration',
      },
      {
        step: '5',
        title: 'Full Restoration',
        description: 'Regain unrestricted driving privileges',
      },
    ],

    urgencyTitle: '⏰ 10-Day DMV Hearing Deadline',
    urgencyMessage: 'Many suspensions allow only 10 days to request a DMV hearing. Missing this deadline means automatic suspension. Call immediately.',

    whyChooseTitle: 'Why Choose Vasquez Law for License Issues',
    whyChoosePoints: [
      'DMV hearing success record',
      'Same-day limited privilege petitions',
      'Multi-state license problem resolution',
      'Insurance requirement assistance',
      'Payment plan arrangements for fines',
      'Bilingual DMV representation',
      'Emergency court filings',
      'Offices near DMV locations',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC Point System</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Violation</th>
                <th className="py-3 px-4 text-yellow-400">Points</th>
                <th className="py-3 px-4 text-red-400">Insurance Points</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Speeding 10 mph or less</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">1</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Speeding over 55 mph</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">2-4</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Reckless driving</td>
                <td className="py-3 px-4">4</td>
                <td className="py-3 px-4">4</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Following too closely</td>
                <td className="py-3 px-4">4</td>
                <td className="py-3 px-4">2</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Passing stopped school bus</td>
                <td className="py-3 px-4">5</td>
                <td className="py-3 px-4">4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 mt-4 text-sm">12 points in 3 years = suspension</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Suspension Timeline</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📅</span>
              <div>
                <h3 className="font-bold text-white">Day 1-10</h3>
                <p className="text-gray-300 text-sm">Request DMV hearing to contest suspension</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">⚖️</span>
              <div>
                <h3 className="font-bold text-white">Day 11-30</h3>
                <p className="text-gray-300 text-sm">Petition court for limited driving privilege</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-bold text-white">During Suspension</h3>
                <p className="text-gray-300 text-sm">Complete requirements (fines, insurance, programs)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-bold text-white">End of Period</h3>
                <p className="text-gray-300 text-sm">Pay restoration fee and regain full privileges</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="License Suspension Defense"
      subtitle="Protecting Your Driving Privileges"
      description="Fighting license suspensions and securing driving privileges. Our attorneys win DMV hearings and restore licenses quickly."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
