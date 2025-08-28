import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '42A Cancellation Attorney | Non-LPR Removal Defense | NC & FL | Vasquez Law',
  description: 'Expert 42A cancellation lawyers for non-permanent residents. 10-year presence, hardship to USC/LPR family. Immigration court defense. 919-569-5882',
  keywords: '42A cancellation attorney, non-LPR cancellation removal, 10 year cancellation, exceptional hardship lawyer, immigration court defense, removal proceedings attorney, deportation defense lawyer, Raleigh immigration attorney, Charlotte removal defense, Orlando cancellation lawyer',
  openGraph: {
    title: '42A Cancellation of Removal Attorney | Immigration Court | Vasquez Law',
    description: 'Stop deportation with 42A cancellation. Prove 10 years presence and exceptional hardship to qualifying relatives.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function FortyTwoACancellationPage() {
  const services = [
    {
      title: 'Eligibility Assessment',
      description: '10-year presence proof',
      icon: '📋',
      features: [
        '10 years continuous presence',
        'Good moral character review',
        'No disqualifying crimes',
        'USC/LPR spouse/parent/child',
        'Exceptional hardship analysis',
        'Documentary evidence gathering',
      ],
    },
    {
      title: 'Hardship Documentation',
      description: 'Proving exceptional hardship',
      icon: '📄',
      features: [
        'Medical hardship evidence',
        'Country conditions research',
        'Financial impact analysis',
        'Educational disruption',
        'Psychological evaluations',
        'Family separation impact',
      ],
    },
    {
      title: 'Court Representation',
      description: 'Immigration Judge hearings',
      icon: '⚖️',
      features: [
        'Master calendar hearings',
        'Individual hearing preparation',
        'Direct examination',
        'Cross-examination defense',
        'Legal brief drafting',
        'Evidence presentation',
      ],
    },
    {
      title: 'Evidence Package',
      description: 'Comprehensive documentation',
      icon: '📁',
      features: [
        'Entry and presence proof',
        'Tax return compilation',
        'Employment verification',
        'Community ties evidence',
        'Character reference letters',
        'School and medical records',
      ],
    },
    {
      title: 'Stop-Time Issues',
      description: 'Preserving eligibility',
      icon: '⏰',
      features: [
        'NTA service date analysis',
        'Criminal stop-time triggers',
        'Continuity calculations',
        'Brief departures review',
        'Admission issues',
        'Clock preservation strategies',
      ],
    },
    {
      title: 'Appeal Options',
      description: 'BIA and circuit court',
      icon: '🔄',
      features: [
        'Notice of appeal filing',
        'BIA brief preparation',
        'Circuit court petitions',
        'Stay of removal requests',
        'Motion to reopen',
        'Administrative closure',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the requirements for 42A cancellation of removal?',
      answer: 'Four main requirements: (1) Continuous physical presence in US for at least 10 years before NTA service date, (2) Good moral character during those 10 years, (3) No convictions for crimes listed in INA sections 212(a)(2), 237(a)(2), or 237(a)(3), (4) Removal would cause exceptional and extremely unusual hardship to USC or LPR spouse, parent, or child. Cannot be for yourself. Judge has discretion even if all requirements met.',
    },
    {
      question: 'What qualifies as exceptional and extremely unusual hardship?',
      answer: 'Much higher standard than extreme hardship. Factors: qualifying relative has serious medical condition requiring your care, no adequate medical care in your country, disabled child needs your assistance, elderly parent depends on you, family never lived in your country and doesn\'t speak language, dangerous country conditions for family, complete financial dependence. Normal hardship of separation not enough. Need multiple strong factors.',
    },
    {
      question: 'How does the stop-time rule affect 42A cancellation?',
      answer: 'Physical presence stops accruing when: (1) Served with Notice to Appear (NTA), (2) Commit certain crimes, (3) Leave US for over 90 days in single trip or 180 days total. Clock stops permanently - cannot restart. Must have full 10 years before any stop-time trigger. Brief departures under 90 days usually OK if maintained residence. Calculate carefully from entry date to NTA service.',
    },
    {
      question: 'What crimes disqualify me from 42A cancellation?',
      answer: 'Permanent bars: aggravated felony, controlled substance offense (except single marijuana possession under 30g), two or more crimes of moral turpitude (not from single scheme), firearms offense, domestic violence/stalking/child abuse, false claim to US citizenship. Also: crimes involving moral turpitude within 5 years of entry with possible sentence 1+ years, prostitution, serious criminal per Attorney General. Review complete criminal history.',
    },
    {
      question: 'How long does 42A cancellation take in Immigration Court?',
      answer: 'Charlotte Immigration Court: 2-3 years to individual hearing. Atlanta (covering NC): 18-24 months. Orlando: 2-3 years. Factors affecting timeline: court backlog, continuances, evidence gathering needs, attorney availability. Master calendar: 2-4 appearances typical. Individual hearing: 2-4 hours usually. Decision: oral at hearing or written later. If denied, appeal adds 12-18 months.',
    },
    {
      question: 'Can I work and travel while my 42A case is pending?',
      answer: 'Work authorization: Can apply for employment authorization document (EAD) while case pending if not detained. File I-765 with immigration court proceedings code (c)(8). Travel: Strongly discouraged - leaving US may trigger abandonment of application or affect continuous presence. Even with advance parole risky. Any departure over 90 days breaks continuity. Stay in US throughout proceedings.',
    },
  ];

  const content = {
    introduction: `Facing removal proceedings doesn't mean deportation is inevitable. For non-permanent residents who have built their lives in the United States over many years, 42A cancellation of removal offers a path to lawful permanent residence. This form of relief rewards those who have established deep roots in American communities and whose removal would cause exceptional hardship to their U.S. citizen or permanent resident family members. Our experienced removal defense attorneys in Raleigh, Charlotte, Smithfield, and Orlando have successfully represented hundreds of clients in immigration court, proving the exceptional hardship standard and securing green cards for deserving families.`,

    processTitle: '42A Cancellation Process',
    process: [
      {
        step: '1',
        title: 'Case Evaluation',
        description: 'Assess eligibility and hardship factors',
      },
      {
        step: '2',
        title: 'Evidence Collection',
        description: 'Gather 10 years of documentation',
      },
      {
        step: '3',
        title: 'Application Filing',
        description: 'Submit EOIR-42A to Immigration Court',
      },
      {
        step: '4',
        title: 'Individual Hearing',
        description: 'Present case to Immigration Judge',
      },
      {
        step: '5',
        title: 'Decision',
        description: 'Green card if approved',
      },
    ],

    urgencyTitle: '⚠️ Limited Annual Grants - Only 4,000 Per Year',
    urgencyMessage: 'Nationwide cap reached quickly. Strong cases filed early have better chances. Evidence deteriorates over time. Prepare thoroughly now.',

    whyChooseTitle: 'Why Choose Vasquez Law for 42A Cancellation',
    whyChoosePoints: [
      '90% success rate in cancellation cases',
      'Former immigration prosecutor on team',
      'Charlotte & Orlando Immigration Court expertise',
      'Hardship brief writing specialists',
      'Expert witness network',
      'Bilingual services - Se habla español',
      'Payment plans available',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Proving 10 Years Continuous Physical Presence</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Year Range</th>
                <th className="py-3 px-4">Best Evidence</th>
                <th className="py-3 px-4">Alternative Evidence</th>
                <th className="py-3 px-4">Weight</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Entry - Year 2</td>
                <td className="py-3 px-4">I-94, passport stamps</td>
                <td className="py-3 px-4">Affidavits, photos</td>
                <td className="py-3 px-4">Critical</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Years 3-5</td>
                <td className="py-3 px-4">Tax returns, W-2s</td>
                <td className="py-3 px-4">Bank statements, leases</td>
                <td className="py-3 px-4">High</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Years 6-8</td>
                <td className="py-3 px-4">School records, medical</td>
                <td className="py-3 px-4">Utility bills, insurance</td>
                <td className="py-3 px-4">High</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Years 9-10</td>
                <td className="py-3 px-4">Employment letters</td>
                <td className="py-3 px-4">Church letters, receipts</td>
                <td className="py-3 px-4">Moderate</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Recent</td>
                <td className="py-3 px-4">Current documents</td>
                <td className="py-3 px-4">Driver\'s license</td>
                <td className="py-3 px-4">Standard</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Need evidence throughout entire period - gaps raise questions</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Exceptional Hardship Factors</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Strong Hardship Evidence</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Qualifying relative has serious illness</li>
              <li>✓ Special needs child requiring your care</li>
              <li>✓ No family in home country</li>
              <li>✓ Dangerous country conditions</li>
              <li>✓ Child near high school graduation</li>
              <li>✓ Elderly parent dependent on you</li>
              <li>✓ Specialized medical care unavailable abroad</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Supporting Documentation</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Medical records and prognosis</li>
              <li>✓ Psychological evaluations</li>
              <li>✓ Country condition expert reports</li>
              <li>✓ School IEP/504 plans</li>
              <li>✓ Financial dependency proof</li>
              <li>✓ Insurance documentation</li>
              <li>✓ Doctor letters on continuity of care</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Stop-Time Rule Calculations</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Critical Dates That Stop Accrual</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">NTA Service Date</h4>
              <p className="text-gray-300 text-sm">The date you receive Notice to Appear stops time permanently. Not filing date, not hearing date - actual service date. If mailed, check certificate of service.</p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">Criminal Convictions</h4>
              <p className="text-gray-300 text-sm">Conviction date (not arrest) for: offense in inadmissibility/deportability grounds, crime of moral turpitude with 1+ year sentence possible.</p>
            </div>
            <div>
              <h4 className="text-red-400 font-bold mb-2">Extended Departures</h4>
              <p className="text-gray-300 text-sm">Single trip over 90 days or combined trips over 180 days. Calculate carefully - even 91 days breaks continuity permanently.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Immigration Court Success Strategies</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Winning Your Hearing</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Preparation Tips</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Organize evidence chronologically</li>
                <li>• Prepare qualifying relative testimony</li>
                <li>• Practice direct examination</li>
                <li>• Address weaknesses upfront</li>
                <li>• Bring originals to court</li>
                <li>• Arrive early, dress professionally</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Common Pitfalls</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Inconsistent testimony</li>
                <li>• Missing documents</li>
                <li>• Unprepared witnesses</li>
                <li>• Inadequate hardship showing</li>
                <li>• Criminal history surprises</li>
                <li>• Travel during proceedings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="42A Cancellation of Removal Attorney"
      subtitle="Stop Deportation and Get Your Green Card"
      description="Expert representation for non-permanent residents seeking cancellation of removal in Immigration Court."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
