import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theft Defense Attorney NC & FL | Shoplifting & Larceny Lawyer | Vasquez Law',
  description: 'Aggressive defense against theft, shoplifting, larceny, embezzlement charges. Protect your record and future. Former prosecutors.',
  keywords: 'theft attorney, shoplifting lawyer, larceny defense, embezzlement attorney, retail theft',
};

export default function TheftLarcenyShopliftingPage() {
  const services = [
    {
      title: 'Shoplifting/Retail Theft',
      description: 'Store theft and concealment charges',
      icon: '🛍️',
      features: [
        'Concealment of merchandise',
        'Price tag switching',
        'Return fraud',
        'Self-checkout errors',
        'Employee theft',
        'Civil demand letters',
      ],
    },
    {
      title: 'Larceny Charges',
      description: 'Taking property of another',
      icon: '💰',
      features: [
        'Misdemeanor larceny',
        'Felony larceny (higher value threshold)',
        'Larceny by employee',
        'Larceny from person',
        'Motor vehicle parts',
        'Construction site theft',
      ],
    },
    {
      title: 'Embezzlement',
      description: 'Misappropriation by trusted person',
      icon: '💼',
      features: [
        'Employee embezzlement',
        'Fiduciary breach',
        'Corporate fraud',
        'Accounting manipulation',
        'Trust fund misuse',
        'Federal charges possible',
      ],
    },
    {
      title: 'Identity Theft',
      description: 'Using another\'s information',
      icon: '🆔',
      features: [
        'Credit card fraud',
        'Check fraud',
        'Online account takeover',
        'Document forgery',
        'Social security fraud',
        'Financial identity theft',
      ],
    },
    {
      title: 'Burglary/B&E',
      description: 'Unlawful entry with intent',
      icon: '🏠',
      features: [
        'Residential burglary',
        'Commercial burglary',
        'Breaking and entering',
        'Criminal trespass',
        'Possession of burglary tools',
        'First vs second degree',
      ],
    },
    {
      title: 'Receiving Stolen Property',
      description: 'Possession of stolen goods',
      icon: '📦',
      features: [
        'Knowledge requirements',
        'Pawn shop cases',
        'Online marketplace sales',
        'Vehicle theft rings',
        'Interstate transportation',
        'Federal jurisdiction',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the penalties for shoplifting in NC and FL?',
      answer: 'NC: Lower value thresholds are Class 1 misdemeanor (short jail terms). Higher values are Class H felony (substantial prison time). FL: Very low values are 2nd degree misdemeanor (minimal jail). Moderate values are 1st degree misdemeanor (up to one year). Higher values are 3rd degree felony (significant prison time). Both states have civil demand laws allowing stores to seek damages.',
    },
    {
      question: 'Can shoplifting charges be dropped or reduced?',
      answer: 'Yes, especially for first offenders. Options include: deferred prosecution programs, community service agreements, reduction to trespassing, civil compromise with store, pretrial diversion. Clean record and restitution payment help. Retailers often cooperate with dismissal if compensated.',
    },
    {
      question: 'What\'s the difference between theft, larceny, and robbery?',
      answer: 'Larceny/theft: taking property without permission (no force/fear). Robbery: theft using force, threat, or intimidation - much more serious felony. Burglary: entering structure intending to commit crime inside. Embezzlement: theft by person in position of trust. Charges depend on method, not just taking.',
    },
    {
      question: 'Will theft conviction affect my employment?',
      answer: 'Yes, severely. Theft crimes are "crimes of moral turpitude" showing dishonesty. Automatic disqualification for finance, retail, healthcare, government jobs. Professional licenses at risk. Immigration consequences for non-citizens. Background checks reveal convictions forever unless expunged.',
    },
    {
      question: 'What if I accidentally forgot to pay?',
      answer: 'Intent is required for conviction - accidental conduct isn\'t theft. Common defenses: distraction, medical condition, honest mistake, confusing self-checkout, children placing items. However, concealment (hiding items) shows intent. Video evidence and conduct after discovery crucial.',
    },
    {
      question: 'Can stores detain me for suspected shoplifting?',
      answer: 'Yes, "shopkeeper\'s privilege" allows reasonable detention to investigate suspected theft. Must have reasonable suspicion, use reasonable force, detain reasonable time. False imprisonment claims possible if exceeded. Never admit guilt - stores must prove case. Request attorney immediately.',
    },
  ];

  const content = {
    introduction: `Theft charges can destroy careers, reputations, and futures over momentary lapses in judgment or misunderstandings. From teenage shoplifting mistakes to complex embezzlement allegations, these charges carry consequences far beyond criminal penalties. Our experienced defense attorneys understand what\'s at stake and fight aggressively to protect your record, employment prospects, and freedom from these damaging accusations.`,

    processTitle: 'Theft Defense Strategy',
    process: [
      {
        step: '1',
        title: 'Immediate Action',
        description: 'Bond, evidence preservation',
      },
      {
        step: '2',
        title: 'Investigation',
        description: 'Video review, witness interviews',
      },
      {
        step: '3',
        title: 'Negotiations',
        description: 'Prosecutor and retailer discussions',
      },
      {
        step: '4',
        title: 'Diversion Programs',
        description: 'First offender options',
      },
      {
        step: '5',
        title: 'Trial or Resolution',
        description: 'Best possible outcome',
      },
    ],

    urgencyTitle: '🚨 Act Before Charges Filed',
    urgencyMessage: 'Early intervention can prevent charges. Store videos deleted after 30-60 days. Civil demand letters have deadlines.',

    whyChooseTitle: 'Why Choose Vasquez Law for Theft Defense',
    whyChoosePoints: [
      'Former prosecutors understand the system',
      'Retail theft diversion programs',
      'Civil demand negotiation',
      'First offender program expertise',
      'Expungement possibilities',
      'Immigration consequence awareness',
      'Aggressive trial defense',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Theft Charge Classifications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Value Category</th>
                <th className="py-3 px-4">NC Classification</th>
                <th className="py-3 px-4">FL Classification</th>
                <th className="py-3 px-4">Severity Level</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Very Low Value</td>
                <td className="py-3 px-4">Class 3 Misdemeanor</td>
                <td className="py-3 px-4">2nd Degree Misdemeanor</td>
                <td className="py-3 px-4">Minor Penalties</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Low-Moderate Value</td>
                <td className="py-3 px-4">Class 1 Misdemeanor</td>
                <td className="py-3 px-4">1st Degree Misdemeanor</td>
                <td className="py-3 px-4">Moderate Penalties</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Moderate-High Value</td>
                <td className="py-3 px-4">Class 1 Misdemeanor</td>
                <td className="py-3 px-4">3rd Degree Felony</td>
                <td className="py-3 px-4">Significant Penalties</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">High Value</td>
                <td className="py-3 px-4">Class H Felony</td>
                <td className="py-3 px-4">3rd Degree Felony</td>
                <td className="py-3 px-4">Substantial Prison Time</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Very High Value</td>
                <td className="py-3 px-4">Class C Felony</td>
                <td className="py-3 px-4">1st Degree Felony</td>
                <td className="py-3 px-4">Major Prison Terms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Theft Defenses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Intent Defenses</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Lack of intent to steal</li>
              <li>• Mistake of fact</li>
              <li>• Claim of right/ownership</li>
              <li>• Borrowing not theft</li>
              <li>• Intoxication (limited)</li>
              <li>• Mental incapacity</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Evidentiary Defenses</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Insufficient evidence</li>
              <li>• Mistaken identity</li>
              <li>• Illegal search/seizure</li>
              <li>• Chain of custody issues</li>
              <li>• Value disputes</li>
              <li>• Witness credibility</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Diversion Programs & First Offender Options</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Available Programs</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-400 font-bold mb-2">North Carolina</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Deferred prosecution</li>
                <li>• First offender programs</li>
                <li>• Conditional discharge</li>
                <li>• Community service</li>
                <li>• Shoplifting classes</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Florida</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Pretrial intervention (PTI)</li>
                <li>• Misdemeanor diversion</li>
                <li>• Civil citation programs</li>
                <li>• Teen court (juveniles)</li>
                <li>• Restitution agreements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Theft, Larceny & Shoplifting Defense"
      subtitle="Protecting Your Record and Reputation"
      description="Experienced defense against all theft charges. First offender programs, trial defense, and record protection."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}