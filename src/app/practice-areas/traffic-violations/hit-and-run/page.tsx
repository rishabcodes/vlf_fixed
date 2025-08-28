import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hit and Run Defense Attorney NC & FL | Leaving Scene | Vasquez Law Firm',
  description: 'Charged with hit and run? Aggressive defense for leaving scene of accident. Felony and misdemeanor charges. 24/7 help.',
  keywords: 'hit and run attorney, leaving scene accident, felony hit run, property damage',
};

export default function HitandRunPage() {
  const services = [
    {
      title: 'Property Damage Hit & Run',
      description: 'Misdemeanor charges for leaving accident scene',
      icon: '🚗',
      features: [
        'Parking lot accidents',
        'Unattended vehicle hits',
        'Minor property damage',
        'Failure to leave information',
        'No injury accidents',
        'Insurance claim issues',
      ],
    },
    {
      title: 'Injury Hit & Run',
      description: 'Felony charges involving personal injury',
      icon: '🚑',
      features: [
        'Personal injury accidents',
        'Serious bodily injury',
        'Pedestrian accidents',
        'Bicycle collisions',
        'Multiple victim cases',
        'DWI-related hit and run',
      ],
    },
    {
      title: 'Fatal Hit & Run',
      description: 'Death resulting from leaving accident scene',
      icon: '⚠️',
      features: [
        'Vehicular homicide charges',
        'Felony death by vehicle',
        'Manslaughter charges',
        'Federal charges possible',
        'Multi-jurisdictional cases',
        'Life sentence exposure',
      ],
    },
    {
      title: 'Unknown Damage Cases',
      description: 'Unaware of causing accident or damage',
      icon: '❓',
      features: [
        'No knowledge defense',
        'Minor contact cases',
        'Debris strike claims',
        'Weather-related accidents',
        'Mechanical failure',
        'Medical emergency defense',
      ],
    },
    {
      title: 'License Consequences',
      description: 'DMV penalties and license issues',
      icon: '📄',
      features: [
        'License revocation',
        'Point accumulation',
        'DMV hearings',
        'Hardship licenses',
        'Interstate compact issues',
        'CDL implications',
      ],
    },
    {
      title: 'Evidence Challenges',
      description: "Fighting prosecution\'s case',
      icon: '🔍',
      features: [
        'Witness identification issues',
        'Video evidence analysis',
        'Vehicle damage disputes',
        'Timeline challenges',
        'False accusations',
        'Mistaken identity',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the penalties for hit and run in NC and FL?',
      answer: 'Property damage only: Misdemeanor with up to 120 days jail in NC, 60 days in FL. Injury cases: Felony with 4-25 months prison in NC, up to 5 years in FL. Fatal cases: Class D felony in NC (up to 204 months), first-degree felony in FL (up to 30 years).',
    },
    {
      question: 'What if I didn\'t know I hit something?',
      answer: 'Lack of knowledge is a valid defense. If you genuinely didn\'t know you caused damage or hit someone, you can\'t be convicted. We\'ll investigate road conditions, vehicle damage, and witness accounts to prove you had no knowledge.',
    },
    {
      question: 'Should I turn myself in for hit and run?',
      answer: 'Contact an attorney first! While cooperation can help, anything you say can be used against you. We can arrange surrender, negotiate with prosecutors, and protect your rights while showing cooperation.',
    },
    {
      question: 'Can I avoid jail time for hit and run?',
      answer: 'Possibly. First-time property damage cases often avoid jail through probation, restitution, and community service. Injury cases are more serious but alternatives exist. Quick action and making victim whole improves outcomes.',
    },
    {
      question: 'What if I left because I was scared or panicked?',
      answer: 'Panic is understandable but not a legal defense. However, returning to scene quickly or reporting promptly shows good faith. Mental health issues, PTSD, or legitimate fear for safety may mitigate penalties.',
    },
    {
      question: 'Will hit and run affect my immigration status?',
      answer: 'Yes, hit and run can be a deportable offense or bar naturalization. Felony hit and run is an aggravated felony for immigration. Even misdemeanors cause problems. Immigration consequences must be considered in any plea.',
    },
  ];

  const content = {
    introduction: `Hit and run charges are serious, carrying potential jail time, license loss, and lasting consequences. Whether you panicked after an accident, didn\'t realize you caused damage, or face false accusations, immediate legal action is critical. Our attorneys protect your freedom, license, and future while working to resolve cases with minimal consequences.`,

    processTitle: 'Hit & Run Defense Strategy',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: '24/7 availability for immediate guidance',
      },
      {
        step: '2',
        title: 'Evidence Preservation',
        description: 'Secure video, witness statements, vehicle inspection',
      },
      {
        step: '3',
        title: 'Victim Resolution',
        description: 'Negotiate restitution and civil settlement',
      },
      {
        step: '4',
        title: 'Prosecutor Negotiation',
        description: 'Reduce charges or secure dismissal',
      },
      {
        step: '5',
        title: 'Court Defense',
        description: 'Aggressive trial defense if needed',
      },
    ],

    urgencyTitle: '🚨 Act Fast - Every Hour Matters',
    urgencyMessage: 'Quick action can mean the difference between dismissal and conviction. Contacting victims, preserving evidence, and showing cooperation immediately improves outcomes dramatically.',

    whyChooseTitle: 'Why Choose Vasquez Law for Hit & Run Defense',
    whyChoosePoints: [
      '24/7 emergency response for hit and run charges',
      'Former prosecutors who know how cases are built',
      'Aggressive investigation of false accusations',
      'Victim negotiation to reduce charges',
      'DMV hearing representation',
      'Immigration consequence analysis',
      'Bilingual defense team',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Hit & Run Charge Levels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3">Class 1 Misdemeanor</h3>
            <p className="text-white font-semibold mb-2">Property Damage Only</p>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Up to 120 days jail</li>
              <li>• License revocation</li>
              <li>• Insurance increases</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Class H Felony</h3>
            <p className="text-white font-semibold mb-2">Personal Injury</p>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• 4-25 months prison</li>
              <li>• Permanent record</li>
              <li>• Victim restitution</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3">Class D Felony</h3>
            <p className="text-white font-semibold mb-2">Fatal Accident</p>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• 38-204 months prison</li>
              <li>• Lifetime consequences</li>
              <li>• Civil wrongful death</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">What To Do If Accused</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-4">✅ DO:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Contact attorney immediately</li>
                <li>• Document your vehicle\'s condition</li>
                <li>• Preserve any dashcam footage</li>
                <li>• Note your route and timeline</li>
                <li>• Gather witness information</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-4">❌ DON\'T:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Talk to police without attorney</li>
                <li>• Admit fault or make statements</li>
                <li>• Repair vehicle immediately</li>
                <li>• Post on social media</li>
                <li>• Contact alleged victim directly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Hit & Run Defense"
      subtitle="Protecting Your Freedom and Future"
      description="Facing hit and run charges? Our experienced defense attorneys fight to protect your freedom, license, and reputation. Available 24/7 for emergency consultation."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
