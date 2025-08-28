import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asylum Attorney Charlotte NC | Protection from Persecution | Vasquez Law',
  description: 'Expert asylum lawyers protecting you from persecution. 1-year filing deadline. Free consultation for persecution based on race, religion, nationality, political opinion, or social group.',
  keywords: 'asylum attorney Charlotte NC, asylum lawyer, persecution protection, political asylum, religious persecution, LGBTQ asylum, immigration asylum, refugee protection',
};

export default function AsylumPage() {
  const services = [
    {
      title: 'Affirmative Asylum',
      description: 'File with USCIS before removal proceedings',
      icon: '🛡️',
      features: [
        'I-589 application preparation',
        'Personal statement drafting',
        'Country conditions research',
        'Supporting documentation',
        'USCIS interview preparation',
        'Legal brief development',
      ],
    },
    {
      title: 'Defensive Asylum',
      description: 'Defense in Immigration Court proceedings',
      icon: '⚖️',
      features: [
        'Removal proceedings defense',
        'Immigration judge hearings',
        'Trial preparation and testimony',
        'Expert witness coordination',
        'Appeals to BIA if needed',
        'Circuit court review options',
      ],
    },
    {
      title: 'Protected Grounds',
      description: 'Five bases for asylum protection',
      icon: '📋',
      features: [
        'Race-based persecution',
        'Religious persecution',
        'Nationality targeting',
        'Political opinion persecution',
        'Particular social group',
        'Mixed motive analysis',
      ],
    },
    {
      title: 'One-Year Deadline',
      description: 'Filing requirements and exceptions',
      icon: '⏰',
      features: [
        'Timely filing within one year',
        'Changed circumstances exception',
        'Extraordinary circumstances',
        'Reasonable delay analysis',
        'Minor applicant exceptions',
        'Mental health considerations',
      ],
    },
    {
      title: 'Evidence & Documentation',
      description: 'Building your persecution case',
      icon: '📁',
      features: [
        'Country condition reports',
        'Medical evaluations',
        'Psychological assessments',
        'Witness affidavits',
        'Government documents',
        'News and media evidence',
      ],
    },
    {
      title: 'Work Authorization',
      description: 'Employment during asylum process',
      icon: '💼',
      features: [
        '150-day EAD eligibility',
        'Form I-765 preparation',
        '180-day clock tracking',
        'Renewal applications',
        'Travel document options',
        'Family member work permits',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the asylum process take in 2025?',
      answer: 'Currently 5-6 years due to massive backlogs. USCIS has 1.4 million pending asylum applications. Immigration courts have 3.7 million cases. However, you get work authorization after 150 days and are protected from deportation while your case is pending. After approval, you can apply for a green card after one year.',
    },
    {
      question: 'What if I missed the one-year deadline to apply for asylum?',
      answer: 'You may qualify for an exception if you show changed circumstances affecting your eligibility (like conditions worsening in your country or changes in U.S. law) or extraordinary circumstances for the delay (serious illness, legal disability, ineffective assistance of counsel). You must still file within a reasonable time after the circumstances change.',
    },
    {
      question: 'Can I work while my asylum application is pending?',
      answer: 'Yes! You can apply for work authorization (EAD) 150 days after filing your asylum application. The EAD is typically approved 30 days later (180 days total). This work permit is renewable annually while your case is pending and allows you to work for any employer.',
    },
    {
      question: 'What are the 5 protected grounds for asylum?',
      answer: 'You must show persecution or fear of persecution based on: (1) Race - ethnic or racial identity, (2) Religion - beliefs, practices, or conversion, (3) Nationality - country of origin or ethnic group, (4) Political Opinion - actual or imputed political beliefs, (5) Particular Social Group - immutable characteristics like gender, sexual orientation, family ties, or past experiences.',
    },
    {
      question: 'Do I need to show physical harm to qualify for asylum?',
      answer: 'No, persecution includes physical violence but also severe discrimination, economic persecution, psychological harm, threats, harassment, and cumulative acts that rise to the level of persecution. The harm must be serious and by the government or groups the government cannot or will not control.',
    },
    {
      question: 'Can my family members be included in my asylum application?',
      answer: 'Yes! Your spouse and unmarried children under 21 can be included as derivatives on your I-589 application if they are in the U.S. If granted asylum, you can petition for them to join you (I-730) within 2 years. After getting a green card, you can petition for other family members.',
    },
  ];

  const content = {
    introduction: `Asylum provides critical protection for individuals fleeing persecution in their home countries. This humanitarian protection recognizes that people facing serious harm based on protected characteristics deserve safety in the United States. With proper legal representation, asylum leads to permanent residence and eventual citizenship. Despite long processing times, immediate work authorization and protection from removal make asylum a vital lifeline for those who cannot safely return home.`,

    processTitle: 'Asylum Application Process',
    process: [
      {
        step: '1',
        title: 'Initial Filing',
        description: 'Submit I-589 within one year of arrival',
      },
      {
        step: '2',
        title: 'Biometrics',
        description: 'Fingerprinting and background checks',
      },
      {
        step: '3',
        title: 'Interview/Hearing',
        description: 'USCIS interview or Immigration Court',
      },
      {
        step: '4',
        title: 'Decision',
        description: 'Grant, denial, or referral to court',
      },
      {
        step: '5',
        title: 'Green Card',
        description: 'Apply after one year of asylum status',
      },
    ],

    urgencyTitle: '🚨 ONE-YEAR FILING DEADLINE',
    urgencyMessage: 'You must file for asylum within ONE YEAR of arriving in the United States. Missing this deadline can permanently bar you from asylum. Exceptions are limited. Contact us immediately to preserve your rights.',

    whyChooseTitle: 'Why Choose Vasquez Law for Asylum',
    whyChoosePoints: [
      'Former immigration prosecutors on staff',
      'Deep knowledge of persecution law',
      'Country conditions expertise',
      'Trauma-informed client approach',
      'Medical and psychological evaluations network',
      'Multi-lingual team and interpreters',
      'Emergency same-day consultations',
      'Charlotte and statewide representation',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Asylum Eligibility Checklist</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">You Must Prove</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ You suffered past persecution OR</li>
              <li>✓ You have well-founded fear of future persecution</li>
              <li>✓ Persecution is based on protected ground</li>
              <li>✓ Government involvement or inability to protect</li>
              <li>✓ You are physically present in the U.S.</li>
              <li>✓ You filed within one year (or exception)</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Bars to Asylum</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✗ Filed after one year (without exception)</li>
              <li>✗ Can relocate safely within home country</li>
              <li>✗ Safe third country settlement</li>
              <li>✗ Persecuted others</li>
              <li>✗ Serious criminal convictions</li>
              <li>✗ Terrorism or security concerns</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">2025 Asylum Timeline</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Day 1: File I-589</h3>
                <p className="text-gray-300 text-sm">Protected from removal, asylum clock starts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Day 150: Apply for Work Permit</h3>
                <p className="text-gray-300 text-sm">File I-765 for employment authorization</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Day 180: Receive Work Permit</h3>
                <p className="text-gray-300 text-sm">Begin working legally in the U.S.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Year 3-6: Interview/Hearing</h3>
                <p className="text-gray-300 text-sm">USCIS interview or Immigration Court hearing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Approval + 1 Year: Green Card</h3>
                <p className="text-gray-300 text-sm">Apply for permanent residence</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Green Card + 5 Years: Citizenship</h3>
                <p className="text-gray-300 text-sm">Eligible to naturalize as U.S. citizen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">The Five Protected Grounds Explained</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#C9974D] mb-3">1. RACE</h3>
              <p className="text-gray-400 text-xs">Persecution based on ethnic or racial identity, skin color, or ethnic characteristics. Includes ethnic cleansing, racial violence, and systematic discrimination.</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#C9974D] mb-3">2. RELIGION</h3>
              <p className="text-gray-400 text-xs">Persecution for religious beliefs, practices, conversion, or lack of religion. Includes forced conversion, religious violence, and prohibition of worship.</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#C9974D] mb-3">3. NATIONALITY</h3>
              <p className="text-gray-400 text-xs">Persecution based on country of origin, citizenship, or ethnic/linguistic group. Includes stateless persons and ethnic minorities.</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#C9974D] mb-3">4. POLITICAL OPINION</h3>
              <p className="text-gray-400 text-xs">Persecution for actual or imputed political beliefs, party membership, activism, or neutrality. Includes journalists, protesters, and opposition members.</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg col-span-2 lg:col-span-1">
              <h3 className="text-lg font-bold text-[#C9974D] mb-3">5. PARTICULAR SOCIAL GROUP</h3>
              <p className="text-gray-400 text-xs">Persecution based on immutable characteristics or fundamental identity. Includes LGBTQ+, gender, family ties, social class, or past experiences.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Types of Persecution</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Government Persecution</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Imprisonment and detention</li>
              <li>• Torture and violence</li>
              <li>• Forced disappearance</li>
              <li>• Denial of employment</li>
              <li>• Property confiscation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Non-State Actors</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Gang violence and extortion</li>
              <li>• Terrorist groups</li>
              <li>• Family honor violence</li>
              <li>• Vigilante groups</li>
              <li>• Organized crime</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Gender-Based</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Domestic violence</li>
              <li>• Female genital mutilation</li>
              <li>• Forced marriage</li>
              <li>• LGBTQ+ targeting</li>
              <li>• Sexual violence</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Asylum Protection"
      subtitle="Safety from Persecution"
      description="Expert asylum representation for those fleeing persecution. Protection based on race, religion, nationality, political opinion, or social group membership."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
