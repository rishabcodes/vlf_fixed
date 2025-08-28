import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CDL Violation Defense Attorney | Commercial License | Vasquez Law Firm',
  description: 'CDL traffic ticket defense. Protect your commercial driver license and livelihood. DOT violations, overweight, logbook. NC and FL.',
  keywords: 'CDL violations, commercial driver license, DOT violations, truck driver attorney',
};

export default function CDLViolationsPage() {
  const services = [
    {
      title: 'Moving Violations',
      description: 'CDL-threatening traffic violations',
      icon: '🚚',
      features: [
        'Speeding (15+ mph serious)',
        'Following too closely',
        'Improper lane changes',
        'Reckless driving',
        'Railroad crossing violations',
        'Texting while driving',
      ],
    },
    {
      title: 'DOT Compliance',
      description: 'Federal Motor Carrier Safety violations',
      icon: '📋',
      features: [
        'Hours of service violations',
        'Logbook falsification',
        'Medical card issues',
        'Vehicle inspection failures',
        'Overweight/oversize loads',
        'Hazmat violations',
      ],
    },
    {
      title: 'DUI/DWI Defense',
      description: 'Alcohol and drug-related CDL cases',
      icon: '🚫',
      features: [
        '0.04% BAC violations',
        'Personal vehicle DUI impact',
        'Drug test failures',
        'Refusing chemical tests',
        'Controlled substance violations',
        'Prescription medication issues',
      ],
    },
    {
      title: 'Serious Violations',
      description: 'Career-ending violation defense',
      icon: '⚠️',
      features: [
        'Fatal accident cases',
        'Leaving scene/hit and run',
        'Using CMV in felony',
        'Multiple violations',
        'License fraud',
        'Negligent operation',
      ],
    },
    {
      title: 'CSA Score Protection',
      description: 'Compliance, Safety, Accountability scores',
      icon: '📈',
      features: [
        'DataQ challenges',
        'Score improvement strategies',
        'Carrier interventions',
        'Safety rating protection',
        'Audit preparation',
        'Violation removal',
      ],
    },
    {
      title: 'License Reinstatement',
      description: 'Getting back on the road',
      icon: '🔄',
      features: [
        'Disqualification appeals',
        'Hardship licenses',
        'Interstate reinstatement',
        'Entry-level driver training',
        'Medical recertification',
        'Employer reporting issues',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What violations can disqualify my CDL?',
      answer: 'Major offenses cause 1-year disqualification: DUI (0.04% BAC), leaving scene, using CMV in felony, refusing tests. Two serious violations in 3 years = 60 days. Three = 120 days. Railroad violations, texting while driving are serious violations.',
    },
    {
      question: 'Can a ticket in my personal vehicle affect my CDL?',
      answer: 'Yes! DUI in any vehicle disqualifies your CDL for 1 year. Serious violations in personal vehicles count toward CDL disqualification. Your driving record follows you everywhere - protect it always.',
    },
    {
      question: 'Should I just pay the CDL ticket?',
      answer: 'Never! Paying admits guilt and can end your career. Even "minor" violations affect CSA scores, insurance, and employment. Always fight CDL tickets - your livelihood depends on it.',
    },
    {
      question: 'How do violations affect my CSA score?',
      answer: 'Violations stay on CSA for 3 years, weighted by time (recent = worse) and severity. High scores trigger interventions, audits, and make you unemployable. We fight to keep violations off your record.',
    },
    {
      question: 'What if I\'m an owner-operator?',
      answer: 'Stakes are even higher - violations affect your operating authority, insurance rates, and contracts. One serious violation can bankrupt your business. Aggressive defense is essential.',
    },
    {
      question: 'Can I get a CDL after disqualification?',
      answer: 'Depends on the violation. First-time major offenses: 1-year wait. Second lifetime disqualification (with exceptions). Some violations allow reinstatement after completing requirements. We guide you through the process.',
    },
  ];

  const content = {
    introduction: `Your CDL is your livelihood. One violation can end your driving career, destroy your income, and devastate your family. With stricter enforcement, CSA scores, and electronic logging, drivers face more threats than ever. Our CDL defense attorneys understand the stakes and fight aggressively to protect your commercial license, driving record, and career.`,

    processTitle: 'CDL Defense Process',
    process: [
      {
        step: '1',
        title: 'Immediate Review',
        description: 'Analyze violation impact on CDL and employment',
      },
      {
        step: '2',
        title: 'Evidence Gathering',
        description: 'Obtain dashcam, ELD data, inspection reports',
      },
      {
        step: '3',
        title: 'Challenge Violations',
        description: 'DataQ challenges, court hearings, negotiations',
      },
      {
        step: '4',
        title: 'Protect Record',
        description: 'Keep violations off DAC and CSA reports',
      },
      {
        step: '5',
        title: 'Maintain CDL',
        description: 'Preserve driving privileges and employment',
      },
    ],

    urgencyTitle: '🚚 Act Now - Your Career Is at Risk',
    urgencyMessage: 'CDL violations have immediate consequences. Employers check DAC reports daily. Don\'t lose your job - call immediately for defense.',

    whyChooseTitle: 'Why Choose Vasquez Law for CDL Defense',
    whyChoosePoints: [
      'Exclusive focus on protecting commercial drivers',
      'Understanding of FMCSA regulations',
      'DataQ challenge experience',
      'Relationships with prosecutors statewide',
      'CSA score improvement strategies',
      'Former DOT enforcement knowledge',
      'Protecting driver employment',
      'Offices near major trucking corridors',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">CDL Disqualification Periods</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Violation Type</th>
                <th className="py-3 px-4 text-yellow-400">First Offense</th>
                <th className="py-3 px-4 text-red-400">Second Offense</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">DUI/DWI (0.04% BAC)</td>
                <td className="py-3 px-4">1 year</td>
                <td className="py-3 px-4">Lifetime</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Leaving Scene</td>
                <td className="py-3 px-4">1 year</td>
                <td className="py-3 px-4">Lifetime</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Using CMV in Felony</td>
                <td className="py-3 px-4">1 year</td>
                <td className="py-3 px-4">Lifetime</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Hazmat + DUI</td>
                <td className="py-3 px-4">3 years</td>
                <td className="py-3 px-4">Lifetime</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">2 Serious Violations</td>
                <td className="py-3 px-4">60 days</td>
                <td className="py-3 px-4">-</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">3 Serious Violations</td>
                <td className="py-3 px-4">120 days</td>
                <td className="py-3 px-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Serious Traffic Violations for CDL</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Serious Violations</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Speeding 15+ mph over limit</li>
              <li>• Reckless driving</li>
              <li>• Improper lane change</li>
              <li>• Following too closely</li>
              <li>• No CDL in possession</li>
              <li>• Texting while driving</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Major Disqualifying</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• DUI/DWI (0.04% BAC)</li>
              <li>• Refusing chemical test</li>
              <li>• Leaving accident scene</li>
              <li>• Using CMV in felony</li>
              <li>• Negligent driving with fatality</li>
              <li>• Railroad crossing violations</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="CDL Violation Defense"
      subtitle="Protecting Commercial Driver Careers"
      description="Your CDL is your career. Our experienced attorneys fight CDL violations, DOT citations, and protect your commercial driving privileges."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
