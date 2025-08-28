import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'U Visa Attorney NC & FL | Crime Victim Immigration Relief | Vasquez Law',
  description: 'U visa for crime victims who help law enforcement. Path to green card. No legal status required. 10,000 visas annually.',
  keywords: 'U visa attorney, crime victim visa, U nonimmigrant status, victim immigration relief',
};

export default function UVisaCrimeVictimsPage() {
  const services = [
    {
      title: 'U Visa Eligibility',
      description: 'Qualifying crimes and requirements',
      icon: '🔒',
      features: [
        'Victim of qualifying crime',
        'Substantial physical/mental abuse',
        'Information about crime',
        'Helpful to law enforcement',
        'Crime occurred in U.S.',
        'Admissibility or waiver',
      ],
    },
    {
      title: 'Qualifying Crimes',
      description: '30+ covered criminal activities',
      icon: '⚖️',
      features: [
        'Domestic violence',
        'Sexual assault',
        'Human trafficking',
        'Kidnapping',
        'Extortion/blackmail',
        'Witness tampering',
      ],
    },
    {
      title: 'Law Enforcement Certification',
      description: 'I-918B certification process',
      icon: '👮',
      features: [
        'Police certification requests',
        'Prosecutor cooperation',
        'Judge certifications',
        'Federal agency support',
        'Certification advocacy',
        'Alternative certifiers',
      ],
    },
    {
      title: 'Family Derivatives',
      description: 'Including family members',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Spouse inclusion',
        'Children under 21',
        'Parents if under 21',
        'Siblings if under 18',
        'Subsequent derivatives',
        'Aging out protection',
      ],
    },
    {
      title: 'Waiver Applications',
      description: 'Overcoming inadmissibility',
      icon: '📝',
      features: [
        'Criminal history waivers',
        'Immigration violations',
        'Unlawful presence',
        'Public charge issues',
        'Fraud/misrepresentation',
        'National interest standard',
      ],
    },
    {
      title: 'Path to Green Card',
      description: 'Adjustment after 3 years',
      icon: '🌐',
      features: [
        'Continuous presence',
        'Good moral character',
        'Not unreasonable to refuse',
        'Public interest justification',
        'I-485 adjustment filing',
        'Travel and work permits',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the U visa process take?',
      answer: 'Currently 5-6 years due to 10,000 annual cap and backlog. However, you get deferred action immediately upon filing, protecting from deportation. After approval, 4-year U status, then eligible for green card after 3 years. Work permits available during wait.',
    },
    {
      question: 'What if police won\'t certify my U visa?',
      answer: 'Try alternative certifiers: prosecutors, judges, child/adult protective services, Equal Employment Opportunity Commission, Department of Labor. Some agencies have certification policies. We advocate with law enforcement and explore all certification options. State laws may mandate certification.',
    },
    {
      question: 'Can I get U visa with criminal record?',
      answer: 'Yes, waivers available for most crimes if in national/public interest. Being crime victim doesn\'t erase past, but strong equities help. We show rehabilitation, family ties, community benefit. Serious crimes harder but not impossible with compelling factors.',
    },
    {
      question: 'What crimes qualify for U visa?',
      answer: 'Federal list includes: rape, torture, trafficking, incest, domestic violence, sexual assault, abusive sexual contact, prostitution, sexual exploitation, female genital mutilation, hostage, peonage, involuntary servitude, slave trade, kidnapping, abduction, unlawful criminal restraint, false imprisonment, blackmail, extortion, manslaughter, murder, felonious assault, witness tampering, obstruction, perjury, fraud, stalking.',
    },
    {
      question: 'Do I need to testify in court?',
      answer: 'Not necessarily. "Helpful" means providing information, not requiring testimony. Many victims never testify. Cooperation can be reporting crime, providing statements, identifying suspects, or being available if needed. Prosecution outcome doesn\'t matter for U visa.',
    },
    {
      question: 'Can family members work with U visa?',
      answer: 'Yes! Principal applicant gets work authorization with approved waitlist placement (bona fide determination). Derivatives get work permits after principal\'s approval. All can work legally during 4-year U status and while adjusting to green card.',
    },
  ];

  const content = {
    introduction: `The U visa provides critical protection for crime victims who assist law enforcement, regardless of immigration status. This humanitarian program recognizes that victims shouldn\'t fear deportation when reporting crimes. With a path to permanent residence, the U visa empowers victims to seek justice while building stable lives in America. Despite long waits, immediate protection and eventual green cards make this vital relief for qualifying victims.`,

    processTitle: 'U Visa Application Process',
    process: [
      {
        step: '1',
        title: 'Crime Documentation',
        description: 'Gather police reports and evidence',
      },
      {
        step: '2',
        title: 'Certification Request',
        description: 'Obtain law enforcement certification',
      },
      {
        step: '3',
        title: 'I-918 Filing',
        description: 'Submit complete application to USCIS',
      },
      {
        step: '4',
        title: 'Bona Fide Wait',
        description: 'Receive deferred action and work permit',
      },
      {
        step: '5',
        title: 'Approval & Green Card',
        description: 'U status then adjustment after 3 years',
      },
    ],

    urgencyTitle: '🚨 6-Year Certification Deadline',
    urgencyMessage: 'Law enforcement certifications expire after 6 months. Crime must be reported promptly. Evidence and witnesses disappear over time.',

    whyChooseTitle: 'Why Choose Vasquez Law for U Visa',
    whyChoosePoints: [
      'Victim-centered trauma-informed approach',
      'Law enforcement relationship building',
      'Complex waiver expertise',
      'Derivative family protection',
      'Multilingual victim advocacy',
      'Certification request success',
      'No upfront fees for qualifying victims',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">U Visa Requirements Checklist</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">You Must Have</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Been victim of qualifying crime</li>
              <li>✓ Suffered substantial abuse</li>
              <li>✓ Information about the crime</li>
              <li>✓ Been/will be helpful to law enforcement</li>
              <li>✓ Crime occurred in U.S. or violated U.S. law</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">You Don\'t Need</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Legal immigration status</li>
              <li>✓ Crime to be prosecuted</li>
              <li>✓ Conviction of perpetrator</li>
              <li>✓ To be primary victim</li>
              <li>✓ Physical injuries only</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">U Visa Timeline (2025)</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Filing (Day 1)</h3>
                <p className="text-gray-300 text-sm">Protected from deportation immediately</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Bona Fide (14-18 months)</h3>
                <p className="text-gray-300 text-sm">Deferred action and work authorization</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">U Visa Approval (5-6 years)</h3>
                <p className="text-gray-300 text-sm">4-year U nonimmigrant status</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Green Card Eligible (After 3 years in U status)</h3>
                <p className="text-gray-300 text-sm">Apply for permanent residence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Qualifying Criminal Activities</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Violent Crimes</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Murder</li>
                <li>• Manslaughter</li>
                <li>• Felonious assault</li>
                <li>• Torture</li>
                <li>• Kidnapping</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Sexual Crimes</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Rape</li>
                <li>• Incest</li>
                <li>• Sexual assault</li>
                <li>• Prostitution</li>
                <li>• Sexual exploitation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Other Crimes</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Domestic violence</li>
                <li>• Stalking</li>
                <li>• Blackmail/Extortion</li>
                <li>• False imprisonment</li>
                <li>• Witness tampering</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="U Visa for Crime Victims"
      subtitle="Protection and Path to Permanence"
      description="Immigration relief for crime victims who assist law enforcement. Work authorization and green card eligibility."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
