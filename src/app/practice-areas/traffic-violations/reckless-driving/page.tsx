import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reckless Driving Attorney NC & FL | Aggressive Defense | Vasquez Law',
  description: 'Reckless driving charges? Avoid jail, license loss, criminal record. Speed, racing, aggressive driving defense.',
  keywords: 'reckless driving, careless driving, aggressive driving, street racing attorney',
};

export default function RecklessDrivingPage() {
  const services = [
    {
      title: 'Speed-Related Reckless',
      description: 'Excessive speed and dangerous driving',
      icon: '🏎️',
      features: [
        'Speed over 80 mph',
        '20+ mph over limit',
        'Speed in construction zone',
        'Racing accusations',
        'Exhibition of speed',
        'Speed competition',
      ],
    },
    {
      title: 'Aggressive Driving',
      description: 'Road rage and dangerous behavior',
      icon: '😡',
      features: [
        'Tailgating/following closely',
        'Cutting off vehicles',
        'Brake checking',
        'Weaving through traffic',
        'Running red lights',
        'Road rage incidents',
      ],
    },
    {
      title: 'Street Racing',
      description: 'Illegal racing and speed contests',
      icon: '🏁',
      features: [
        'Prearranged racing',
        'Spontaneous racing',
        'Speed exhibitions',
        'Spectator charges',
        'Vehicle forfeiture defense',
        'Multiple defendant cases',
      ],
    },
    {
      title: 'Accident Cases',
      description: 'Reckless driving causing crashes',
      icon: '💥',
      features: [
        'Property damage accidents',
        'Personal injury crashes',
        'Multi-vehicle collisions',
        'Weather-related incidents',
        'Mechanical failure claims',
        'Emergency situation defense',
      ],
    },
    {
      title: 'License Impact',
      description: 'Protecting driving privileges',
      icon: '📄',
      features: [
        '4 DMV points',
        '4 insurance points',
        'License suspension risk',
        'CDL implications',
        'Out-of-state licenses',
        'Military licenses',
      ],
    },
    {
      title: 'Criminal Defense',
      description: 'Fighting misdemeanor charges',
      icon: '⚖️',
      features: [
        'Jail time avoidance',
        'Criminal record protection',
        'Probation alternatives',
        'Plea negotiations',
        'Trial defense',
        'Appeal options',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is considered reckless driving?',
      answer: 'Driving carelessly and heedlessly in willful or wanton disregard for safety. Common examples: speeding over 80 mph, 20+ mph over limit, weaving through traffic, racing, passing school bus, running red lights. Police have wide discretion.',
    },
    {
      question: 'What are the penalties for reckless driving?',
      answer: 'Class 2 misdemeanor in NC: up to 60 days jail, $1,000 fine, 4 DMV points, 4 insurance points. In FL: up to 90 days jail first offense, $500 fine, 4 points. Second offense within year: up to 6 months jail. Criminal record results.',
    },
    {
      question: 'Can I go to jail for reckless driving?',
      answer: 'Yes, especially for high speeds (100+ mph), accidents with injuries, or prior convictions. First-time offenders often avoid jail through plea negotiations, but judges increasingly impose jail for excessive speeds or dangerous behavior.',
    },
    {
      question: 'Will reckless driving affect my insurance?',
      answer: 'Severely. Reckless driving adds 4 insurance points (80% rate increase in NC). Many insurers drop coverage entirely. Stays on record 3 years for insurance. Some companies won\'t insure you at any price.',
    },
    {
      question: 'Can reckless driving be reduced?',
      answer: 'Often yes. We negotiate reductions to improper equipment, speeding, or unsafe movement - infractions instead of misdemeanors. Factors: driving record, speed, circumstances, and quick action. Never plead guilty without trying reduction.',
    },
    {
      question: 'What about out-of-state reckless driving?',
      answer: 'Most states report to your home state, affecting your license and insurance. Virginia reckless driving is especially serious (Class 1 misdemeanor, 12 months jail possible). Always fight out-of-state charges.',
    },
  ];

  const content = {
    introduction: `Reckless driving is a criminal misdemeanor - not just a traffic ticket. Conviction means potential jail time, massive insurance increases, criminal record, and license suspension. Whether charged with excessive speed, aggressive driving, or racing, immediate aggressive defense is critical. Our attorneys fight to reduce or dismiss charges, protecting your freedom, license, and future.`,

    processTitle: 'Reckless Driving Defense',
    process: [
      {
        step: '1',
        title: 'Case Evaluation',
        description: 'Review evidence, video, radar calibration',
      },
      {
        step: '2',
        title: 'Evidence Challenge',
        description: 'Contest speed measurement, observations',
      },
      {
        step: '3',
        title: 'Reduction Negotiation',
        description: 'Seek non-criminal disposition',
      },
      {
        step: '4',
        title: 'Court Defense',
        description: 'Aggressive trial representation',
      },
      {
        step: '5',
        title: 'Record Protection',
        description: 'Minimize long-term consequences',
      },
    ],

    urgencyTitle: '🚨 Criminal Charges = Permanent Record',
    urgencyMessage: 'Reckless driving creates a criminal record affecting employment, education, and housing. Quick action often secures better outcomes. Don\'t wait.',

    whyChooseTitle: 'Why Choose Vasquez Law for Reckless Driving',
    whyChoosePoints: [
      'Former prosecutors who know the system',
      'Speed measurement challenge expertise',
      'Reduction negotiation success',
      'Trial experience when needed',
      'DMV hearing representation',
      'Insurance impact minimization',
      '24/7 availability for arrests',
      'Courts throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Reckless Driving Triggers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3">Automatic Charges</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Speed over 80 mph</li>
              <li>• Racing/competition</li>
              <li>• Passing school bus</li>
              <li>• Wrong way driving</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Officer Discretion</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• 20+ over limit</li>
              <li>• Aggressive lane changes</li>
              <li>• Tailgating</li>
              <li>• Weather conditions</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3">Defenses Available</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Radar errors</li>
              <li>• Emergency necessity</li>
              <li>• Mechanical failure</li>
              <li>• Mistaken identity</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Reduction Options</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <p className="text-gray-300 mb-6">Common reductions our attorneys negotiate:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">From Reckless To:</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex justify-between">
                  <span>• Improper Equipment</span>
                  <span className="text-green-400">No points</span>
                </li>
                <li className="flex justify-between">
                  <span>• Unsafe Movement</span>
                  <span className="text-yellow-400">2 points</span>
                </li>
                <li className="flex justify-between">
                  <span>• Speeding 9 over</span>
                  <span className="text-yellow-400">2 points</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Benefits:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• No criminal record</li>
                <li>• Lower insurance impact</li>
                <li>• No jail exposure</li>
                <li>• Reduced fines</li>
                <li>• Keep CDL eligible</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Reckless Driving Defense"
      subtitle="Protecting You from Criminal Charges"
      description="Reckless driving is a criminal offense with serious consequences. Our aggressive defense protects your freedom, license, and record."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
