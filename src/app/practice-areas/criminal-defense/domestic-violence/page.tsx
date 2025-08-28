import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domestic Violence Defense Attorney NC & FL | DV Charges | Vasquez Law',
  description: 'Aggressive defense against domestic violence charges. Protective orders, assault allegations, false accusations. Your side matters.',
  keywords: 'domestic violence attorney, DV defense lawyer, protective order defense, domestic assault',
};

export default function DomesticViolenceAbusePage() {
  const services = [
    {
      title: 'Assault Charges',
      description: 'Defending against violence allegations',
      icon: '⚠️',
      features: [
        'Simple assault defense',
        'Aggravated assault charges',
        'Assault by strangulation',
        'Assault on female',
        'Injury documentation review',
        'Self-defense claims',
      ],
    },
    {
      title: 'Protective Orders',
      description: 'Fighting restraining orders',
      icon: '🛡️',
      features: [
        'Emergency order challenges',
        'DVPO hearings',
        'No-contact violations',
        'Modification requests',
        'False allegation defense',
        'Mutual order negotiations',
      ],
    },
    {
      title: 'False Accusations',
      description: 'Exposing fabricated claims',
      icon: '🔍',
      features: [
        'Custody battle motivations',
        'Text message evidence',
        'Social media investigation',
        'Witness interviews',
        'Timeline inconsistencies',
        'Medical record analysis',
      ],
    },
    {
      title: 'Weapons Charges',
      description: 'Firearm rights protection',
      icon: '🚫',
      features: [
        'Gun possession violations',
        'Federal firearm bans',
        'Concealed carry impacts',
        'Weapon enhancement charges',
        'Rights restoration',
        'Law enforcement exceptions',
      ],
    },
    {
      title: 'Bond & Release',
      description: 'Getting out and staying out',
      icon: '🔓',
      features: [
        '48-hour hold challenges',
        'Bond reduction motions',
        'Electronic monitoring',
        'Third-party custody',
        'Pretrial release conditions',
        'Violation defense',
      ],
    },
    {
      title: 'Trial Defense',
      description: 'Aggressive courtroom advocacy',
      icon: '⚖️',
      features: [
        'Jury selection strategy',
        'Cross-examination expertise',
        'Expert witness testimony',
        'Character witnesses',
        'Evidence suppression',
        'Plea negotiations',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What happens after a domestic violence arrest?',
      answer: 'NC has 48-hour hold for DV arrests - no bond until court appearance. FL allows bond sooner but with no-contact orders. First appearance sets conditions: no contact, no weapons, possible ankle monitor. Violations mean jail. We fight for least restrictive conditions.',
    },
    {
      question: 'Can domestic violence charges be dropped?',
      answer: 'Victim cannot "drop" charges - prosecutor decides. However, uncooperative victims make prosecution difficult. We work with victims who want dismissal, highlighting reconciliation, counseling, or false allegations. Some prosecutors have no-drop policies requiring alternative strategies.',
    },
    {
      question: 'Will I lose my gun rights?',
      answer: 'DV conviction triggers federal lifetime firearm ban, even misdemeanors. Protective orders also prohibit possession during pendency. Law enforcement and military careers at risk. We fight to avoid convictions that trigger bans or negotiate non-DV pleas.',
    },
    {
      question: 'What if it was self-defense?',
      answer: 'Self-defense is complete defense if you reasonably believed force necessary to protect yourself. We examine: who was aggressor, proportional response, retreat ability, prior violence history. Often both parties claim self-defense - evidence crucial.',
    },
    {
      question: 'How do false accusations happen?',
      answer: 'Common in custody battles, divorce proceedings, immigration cases. Motivations include: gaining custody advantage, securing housing, revenge, mental health issues. We investigate thoroughly: prior false claims, timing of allegations, inconsistent statements, lack of corroboration.',
    },
    {
      question: 'What are the immigration consequences?',
      answer: 'DV convictions are deportable offenses and crimes of moral turpitude. Even arrests affect naturalization. Protective orders can trigger removal. Non-citizens need specialized defense considering immigration consequences. Alternative pleas may avoid immigration disasters.',
    },
  ];

  const content = {
    introduction: `Domestic violence charges destroy families, careers, and reputations - often based on one-sided allegations. North Carolina and Florida take these cases seriously, with mandatory arrests, no-contact orders, and harsh penalties. False accusations in custody battles or divorces are common. Our aggressive defense ensures your side is heard, protecting your freedom, family, and future from life-altering consequences.`,

    processTitle: 'DV Defense Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: 'Bond hearing and release',
      },
      {
        step: '2',
        title: 'Evidence Collection',
        description: 'Gather exculpatory proof',
      },
      {
        step: '3',
        title: 'Protective Order Defense',
        description: 'Fight restraining orders',
      },
      {
        step: '4',
        title: 'Negotiation/Motions',
        description: 'Dismissal or reduction efforts',
      },
      {
        step: '5',
        title: 'Trial or Resolution',
        description: 'Aggressive defense or best plea',
      },
    ],

    urgencyTitle: '🚨 48-Hour Hold - Act Now',
    urgencyMessage: 'DV arrests mean mandatory holds and immediate consequences. Quick action protects your job, home, and children. Evidence disappears fast.',

    whyChooseTitle: 'Why Choose Vasquez Law for DV Defense',
    whyChoosePoints: [
      'Former prosecutors understand the system',
      'False accusation investigation experts',
      'Protective order hearing experience',
      'Self-defense case victories',
      'Immigration consequence awareness',
      'Custody battle understanding',
      'Aggressive trial attorneys',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">DV Charge Levels and Penalties</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Charge</th>
                <th className="py-3 px-4">NC Penalty</th>
                <th className="py-3 px-4">FL Penalty</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Simple Assault (DV)</td>
                <td className="py-3 px-4">Class A1 Misdemeanor - 150 days</td>
                <td className="py-3 px-4">1st Degree Misdemeanor - 1 year</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Assault on Female</td>
                <td className="py-3 px-4">Class A1 Misdemeanor - 150 days</td>
                <td className="py-3 px-4">N/A - Battery charges apply</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Strangulation</td>
                <td className="py-3 px-4">Class H Felony - 39 months</td>
                <td className="py-3 px-4">3rd Degree Felony - 5 years</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Violation of Order</td>
                <td className="py-3 px-4">Class A1 Misdemeanor</td>
                <td className="py-3 px-4">1st Degree Misdemeanor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common DV Defense Strategies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Factual Defenses</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Self-defense/defense of others</li>
              <li>• False allegations proof</li>
              <li>• Accidental contact</li>
              <li>• Lack of intent</li>
              <li>• Alibi/mistaken identity</li>
              <li>• Mutual combat</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Legal Defenses</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Insufficient evidence</li>
              <li>• Constitutional violations</li>
              <li>• Victim unavailability</li>
              <li>• Hearsay exclusions</li>
              <li>• Discovery violations</li>
              <li>• Statute of limitations</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Protective Order Consequences</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">A Protective Order Means:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• No contact with victim/children</li>
              <li>• Cannot return home</li>
              <li>• Surrender all firearms</li>
              <li>• Stay away from work/school</li>
              <li>• No third-party contact</li>
            </ul>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Public record visible to employers</li>
              <li>• Child custody impacts</li>
              <li>• Immigration consequences</li>
              <li>• Professional license issues</li>
              <li>• Housing difficulties</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Domestic Violence Defense"
      subtitle="Your Side of the Story Matters"
      description="Aggressive defense against domestic violence charges and protective orders. False accusations exposed. Freedom protected."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
