import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assault & Battery Defense Attorney NC & FL | Vasquez Law Firm',
  description: 'Aggressive assault and battery defense. Simple assault, aggravated battery, self-defense claims. Protecting your freedom.',
  keywords: 'assault attorney, battery lawyer, assault and battery defense, aggravated assault lawyer',
};

export default function AssaultBatteryPage() {
  const services = [
    {
      title: 'Simple Assault',
      description: 'Misdemeanor assault charges',
      icon: '⚡',
      features: [
        'Threatening behavior',
        'Attempted physical harm',
        'Minor physical contact',
        'Verbal threats',
        'Class 2 misdemeanor',
        'Up to 60 days jail',
      ],
    },
    {
      title: 'Aggravated Assault',
      description: 'Felony assault with enhancements',
      icon: '⚠️',
      features: [
        'Deadly weapon involved',
        'Serious bodily injury',
        'Assault on officer',
        'Assault on elderly',
        'Assault on disabled',
        'Felony penalties',
      ],
    },
    {
      title: 'Battery Charges',
      description: 'Unlawful physical contact',
      icon: '👊',
      features: [
        'Unwanted touching',
        'Physical striking',
        'Pushing or shoving',
        'Throwing objects',
        'Spitting on someone',
        'Any offensive contact',
      ],
    },
    {
      title: 'Self-Defense Claims',
      description: 'Justification defenses',
      icon: '🛡️',
      features: [
        'Reasonable force used',
        'Imminent threat faced',
        'Defense of others',
        'Defense of property',
        'Stand your ground',
        'Castle doctrine',
      ],
    },
    {
      title: 'Domestic Assault',
      description: 'Family member victims',
      icon: '🏠',
      features: [
        'Spouse/partner assault',
        'Child abuse allegations',
        'Elder abuse claims',
        'Protective orders',
        'No-contact violations',
        'Enhanced penalties',
      ],
    },
    {
      title: 'School/Bar Fights',
      description: 'Common assault scenarios',
      icon: '🥊',
      features: [
        'Campus altercations',
        'Bar fight charges',
        'Sports-related fights',
        'Road rage incidents',
        'Workplace violence',
        'Mutual combat defense',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What\'s the difference between assault and battery?',
      answer: 'Assault is the threat or attempt to cause harm that creates fear of imminent injury. Battery is actual physical contact or harm. In NC, they\'re often charged together. FL combines them into one charge. Assault doesn\'t require touching; battery does.',
    },
    {
      question: 'What are the penalties for assault in NC and FL?',
      answer: 'NC: Simple assault is Class 2 misdemeanor (60 days jail). Assault on female/child/officer is Class A1 misdemeanor (150 days). Aggravated assault is felony (years in prison). FL: Simple assault/battery is misdemeanor (up to 1 year). Aggravated assault/battery is felony (up to 15 years).',
    },
    {
      question: 'Can I claim self-defense?',
      answer: 'Yes, if you reasonably believed force was necessary to protect yourself from imminent harm. Force used must be proportional to threat. NC and FL have "stand your ground" laws - no duty to retreat. Castle doctrine protects home defense. We build strong self-defense cases.',
    },
    {
      question: 'Will assault charges affect my job?',
      answer: 'Yes, assault convictions appear on background checks and can prevent employment, especially in healthcare, education, security, or jobs requiring licenses. Immigration consequences for non-citizens. Gun rights lost for domestic violence convictions. We fight to protect your future.',
    },
    {
      question: 'Can assault charges be dropped?',
      answer: 'Prosecutor decides whether to pursue charges, not the victim. However, uncooperative victims make prosecution difficult. We negotiate dismissals, reductions to lesser charges, deferred prosecution, or anger management diversions. First offenders have best options.',
    },
    {
      question: 'What should I do after assault arrest?',
      answer: 'Remain silent - don\'t explain or apologize. Don\'t contact the alleged victim. Document injuries and get medical treatment. Gather witness information. Save texts/videos. Hire an attorney immediately. Don\'t post on social media. Follow all bond conditions.',
    },
  ];

  const content = {
    introduction: `Assault and battery charges can result from split-second decisions or misunderstandings, yet carry serious consequences including jail time, criminal records, and collateral damage to your life. Whether you\'re facing simple assault from a bar fight or aggravated battery with weapon allegations, our experienced defense attorneys fight aggressively to protect your freedom, reputation, and future opportunities.`,

    processTitle: 'Assault Defense Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: 'Bond hearing and release',
      },
      {
        step: '2',
        title: 'Investigation',
        description: 'Witness interviews and evidence',
      },
      {
        step: '3',
        title: 'Defense Strategy',
        description: 'Self-defense or mitigation',
      },
      {
        step: '4',
        title: 'Negotiations',
        description: 'Dismissal or reduction efforts',
      },
      {
        step: '5',
        title: 'Trial or Plea',
        description: 'Best possible outcome',
      },
    ],

    urgencyTitle: '⚡ Act Fast - Evidence Disappears',
    urgencyMessage: 'Video footage gets deleted. Witnesses forget details. Injuries heal. Quick action preserves your defense.',

    whyChooseTitle: 'Why Choose Vasquez Law for Assault Defense',
    whyChoosePoints: [
      'Former prosecutors know the system',
      'Self-defense expertise',
      'Aggressive trial attorneys',
      'Dismissal and reduction success',
      'Immigration consequence awareness',
      'Domestic violence experience',
      'Available 24/7 for emergencies',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Assault & Battery Charge Levels</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Charge</th>
                <th className="py-3 px-4">NC Classification</th>
                <th className="py-3 px-4">FL Classification</th>
                <th className="py-3 px-4">Maximum Penalty</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Simple Assault</td>
                <td className="py-3 px-4">Class 2 Misdemeanor</td>
                <td className="py-3 px-4">2nd Degree Misdemeanor</td>
                <td className="py-3 px-4">60 days (NC) / 60 days (FL)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Simple Battery</td>
                <td className="py-3 px-4">Class 2 Misdemeanor</td>
                <td className="py-3 px-4">1st Degree Misdemeanor</td>
                <td className="py-3 px-4">60 days (NC) / 1 year (FL)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Assault on Female</td>
                <td className="py-3 px-4">Class A1 Misdemeanor</td>
                <td className="py-3 px-4">N/A</td>
                <td className="py-3 px-4">150 days (NC only)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Aggravated Assault</td>
                <td className="py-3 px-4">Class F Felony</td>
                <td className="py-3 px-4">3rd Degree Felony</td>
                <td className="py-3 px-4">41 months (NC) / 5 years (FL)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Aggravated Battery</td>
                <td className="py-3 px-4">Class E Felony</td>
                <td className="py-3 px-4">2nd Degree Felony</td>
                <td className="py-3 px-4">88 months (NC) / 15 years (FL)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Assault Defenses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Legal Defenses</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Self-defense/defense of others</li>
              <li>• Lack of intent</li>
              <li>• Consent (mutual combat)</li>
              <li>• False accusations</li>
              <li>• Mistaken identity</li>
              <li>• Alibi defense</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Procedural Defenses</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Insufficient evidence</li>
              <li>• Witness credibility issues</li>
              <li>• Police misconduct</li>
              <li>• Violation of rights</li>
              <li>• Improper charges</li>
              <li>• Statute of limitations</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Factors That Increase Penalties</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">Victim-Based Enhancements</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Law enforcement officer</li>
                <li>• Emergency personnel</li>
                <li>• School employee</li>
                <li>• Elderly person (65+)</li>
                <li>• Disabled individual</li>
                <li>• Pregnant woman</li>
                <li>• Child under 12</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">Circumstance Enhancements</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Use of deadly weapon</li>
                <li>• Serious bodily injury</li>
                <li>• Strangulation involved</li>
                <li>• During commission of felony</li>
                <li>• Gang-related activity</li>
                <li>• Hate crime motivation</li>
                <li>• Prior assault convictions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Assault & Battery Defense"
      subtitle="Protecting Your Freedom and Future"
      description="Aggressive defense against assault and battery charges. Self-defense expertise. Former prosecutors on your side."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
