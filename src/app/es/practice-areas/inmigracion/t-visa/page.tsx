import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title:
    'T Visa Abogados NC & FL | Human Trafficking Victim Inmigración Abogados | Vasquez Law Firm',
  description:
    'Compassionate T visa attorneys for human trafficking survivors. Confidential, trauma-informed legal representation. Work authorization, protection from removal. Call 1-844-YO-PELEO',
  keywords:
    'T visa lawyer, human trafficking attorney, trafficking victim lawyer, T visa immigration attorney, trafficking survivor legal help, victim of trafficking, trafficking protection',
  openGraph: {
    title: 'T Visa Abogados | Human Trafficking Victim Protection - Vasquez Law Firm',
    description:
      'Compassionate T visa attorneys providing confidential legal representation for trafficking survivors.',
    images: [{ url: '/images/t-visa-trafficking-attorneys.jpg' }],
  },
};

export default function TVisaPage() {
  const services = [
    {
      title: 'T Visa Application Assistance',
      description:
        'Complete T visa applications for survivors of human trafficking with trauma-informed legal representation',
      icon: '🛡️',
      features: [
        'Form I-914 application preparation and filing',
        'Victim eligibility assessment and documentation',
        'Trafficking evidence compilation and presentation',
        'Law enforcement cooperation coordination',
        'Supporting declaration and witness statements',
        'USCIS interview preparation and representation',
      ],
    },
    {
      title: 'Derivative T Visa Petitions',
      description: 'T visa protection for qualifying family members of trafficking victims',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Spouse and children derivative petitions',
        'Parent and sibling petitions (if under 21)',
        'Family member eligibility assessment',
        'Relationship documentation compilation',
        'Family unity preservation strategies',
        'Concurrent family petition filing',
      ],
    },
    {
      title: 'Labor Trafficking Protection',
      description:
        'Specialized representation for victims of forced labor, debt bondage, and workplace exploitation',
      icon: '⛏️',
      features: [
        'Forced labor trafficking case development',
        'Domestic servitude victim representation',
        'Agricultural worker trafficking cases',
        'Construction industry exploitation cases',
        'Debt bondage documentation and proof',
        'Workplace coercion evidence gathering',
      ],
    },
    {
      title: 'Sex Trafficking Victim Services',
      description: 'Compassionate legal assistance for survivors of commercial sexual exploitation',
      icon: '💝',
      features: [
        'Commercial sexual exploitation cases',
        'Forced prostitution victim representation',
        'Online trafficking victim assistance',
        'Minor sex trafficking specialized care',
        'Trauma-informed interview techniques',
        'Confidential evidence gathering processes',
      ],
    },
    {
      title: 'Law Enforcement Cooperation',
      description: 'Strategic coordination with federal and local law enforcement agencies',
      icon: '🤝',
      features: [
        'FBI and ICE coordination assistance',
        'Local police cooperation documentation',
        'Prosecution assistance and testimony prep',
        'Continued presence application support',
        'Law enforcement endorsement procurement',
        'Investigation cooperation strategy',
      ],
    },
    {
      title: 'T Visa to Green Card Transition',
      description:
        'Permanent residence applications for T visa holders after 3 years of continuous presence',
      icon: '🏠',
      features: [
        'I-485 adjustment of status applications',
        'Continuous presence documentation',
        'Good moral character evidence',
        'Extreme hardship demonstration',
        'Early filing eligibility assessment',
        'Family member adjustment assistance',
      ],
    },
    {
      title: 'Trauma-Informed Legal Services',
      description:
        'Specialized legal care designed for trafficking survivors with consideration for trauma responses',
      icon: '❤️',
      features: [
        'Trauma-informed consultation approaches',
        'Safe and confidential meeting environments',
        'Cultural competency and language services',
        'Flexible scheduling for client comfort',
        'Coordination with mental health professionals',
        'Crisis intervention legal support',
      ],
    },
    {
      title: 'Work Authorization & Benefits',
      description: 'Employment authorization and federal benefit access for T visa holders',
      icon: '💼',
      features: [
        'I-765 work authorization applications',
        'Federal benefits eligibility guidance',
        'Social services connection assistance',
        'Victim compensation program access',
        'Healthcare benefit enrollment support',
        'Educational assistance coordination',
      ],
    },
    {
      title: 'T Visa Denial Appeals & Motions',
      description: 'Appellate representation for denied T visa applications and complex cases',
      icon: '⚖️',
      features: [
        'Motion to reopen denied applications',
        'Motion to reconsider with new evidence',
        'Administrative Appeals Office (AAO) briefs',
        'Federal court litigation when appropriate',
        'Case strategy revision and refiling',
        'Alternative relief pathway exploration',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is a T visa and who qualifies for it?',
      answer:
        'A T visa is for victims of severe forms of human trafficking who are physically present in the US due to trafficking. You must cooperate with law enforcement (unless under 18 or unable due to trauma) and would suffer extreme hardship if removed.',
    },
    {
      question: 'How long does the T visa application process take?',
      answer:
        'T visa processing typically takes 12-18 months, though complex cases may take longer. We track all case progress and provide regular updates throughout the process.',
    },
    {
      question: 'Can my family members get T visas too?',
      answer:
        "Yes, certain family members can receive derivative T visas. If you're under 21: spouse, children, parents, and unmarried siblings under 18. If you're 21+: spouse and unmarried children under 21.",
    },
    {
      question: 'Do I need to testify against my traffickers?',
      answer:
        "You must cooperate with reasonable law enforcement requests, but this doesn't always mean testifying in court. Cooperation can include providing information, attending interviews, or other assistance as requested.",
    },
    {
      question: 'What benefits do T visa holders receive?',
      answer:
        'T visa holders receive work authorization, protection from removal, access to certain federal benefits, and after 3 years can apply for permanent residence (green card).',
    },
    {
      question: 'Is everything I tell my attorney confidential?',
      answer:
        'Yes, attorney-client privilege protects all communications. We maintain strict confidentiality and provide trauma-informed representation in a safe, judgment-free environment.',
    },
  ];

  const content = {
    introduction: `Human trafficking survivors deserve protection, not punishment. Our T visa attorneys provide compassionate, trauma-informed legal representation for trafficking victims seeking safety and legal status in the United States. With specialized experience in both labor and sex trafficking cases, we understand your trauma and fight for the protection and justice you deserve.`,

    processTitle: 'Our T Visa Process',
    process: [
      {
        step: '1',
        title: 'Confidential Consultation & Safety Assessment',
        description:
          'Trauma-informed evaluation in a safe environment with complete confidentiality',
      },
      {
        step: '2',
        title: 'Trafficking Evidence Development',
        description: 'Careful documentation of trafficking experience and supporting evidence',
      },
      {
        step: '3',
        title: 'Law Enforcement Coordination',
        description:
          'Strategic cooperation with agencies while protecting your safety and wellbeing',
      },
      {
        step: '4',
        title: 'T Visa Application Filing',
        description: 'Comprehensive I-914 preparation and filing with USCIS',
      },
      {
        step: '5',
        title: 'Status Approval & Protection',
        description: 'T visa approval processing and continued legal support',
      },
    ],

    urgencyTitle: '🚨 CONFIDENTIAL HELP FOR TRAFFICKING VICTIMS',
    urgencyMessage:
      'You are safe here. Our trauma-informed attorneys provide confidential legal assistance to trafficking survivors. Your safety and privacy are our absolute priority.',

    successStats: [
      { number: '200+', label: 'Trafficking Survivors Helped' },
      { number: '88%', label: 'T Visa Approval Rate' },
      { number: '4', label: 'Years Max T Visa Duration' },
      { number: '100%', label: 'Confidentiality Guaranteed' },
    ],

    whyChooseTitle: 'Why Choose Our T Visa Team?',
    whyChoosePoints: [
      '88% approval rate for T visa applications',
      'Specialized trauma-informed legal representation',
      'Extensive experience with trafficking survivor cases',
      'Strong relationships with law enforcement agencies',
      'Bilingual attorneys and culturally competent staff',
      'Complete confidentiality and safe environment guaranteed',
      'Comprehensive family protection services',
      'Long-term support through green card process',
    ],

    traffickingTypes: {
      title: 'Types of Human Trafficking We Handle',
      types: [
        {
          category: 'Labor Trafficking',
          description: 'Forced labor through force, fraud, or coercion',
          examples: [
            'Forced agricultural work',
            'Domestic servitude',
            'Construction site exploitation',
            'Factory and warehouse forced labor',
            'Restaurant and hospitality abuse',
            'Debt bondage situations',
          ],
        },
        {
          category: 'Sex Trafficking',
          description: 'Commercial sexual exploitation of adults and minors',
          examples: [
            'Forced prostitution',
            'Commercial sexual exploitation',
            'Escort service coercion',
            'Massage parlor exploitation',
            'Online trafficking',
            'Pornography production',
          ],
        },
        {
          category: 'Methods of Control',
          description: 'How traffickers maintain control over victims',
          examples: [
            'Physical violence and threats',
            'Debt manipulation',
            'Document confiscation',
            'Isolation from support systems',
            'Deportation threats',
            'Threats to family members',
          ],
        },
      ],
    },
  };

  return (
    <StandardizedPracticeAreaTemplate
      title="T Visa Abogados"
      subtitle="Protecting Human Trafficking Survivors"
      description="Compassionate T visa attorneys providing confidential, trauma-informed legal representation for trafficking survivors. We fight for your protection, safety, and legal status with specialized experience in both labor and sex trafficking cases."
      services={services}
      faqs={faqs}
      overview={{
        content: content.introduction,
      }}
      additionalContent={
        <div className="space-y-12">
          {/* Types of Trafficking */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Types of Human Trafficking</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.traffickingTypes.types.map((type, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-xl font-bold text-primary mb-3">{type.category}</h3>
                  <p className="text-gray-300 mb-4">{type.description}</p>
                  <h4 className="font-semibold text-white mb-2">Common Examples:</h4>
                  <ul className="space-y-1">
                    {type.examples.map((example, eIndex) => (
                      <li key={eIndex}

                className="text-sm text-gray-400 flex items-start gap-2">
                        <span
                className="text-primary mt-1">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* T Visa Eligibility */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              T Visa Eligibility Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">Primary Requirements</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Victim of severe forms of trafficking in persons</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Physically present in the US on account of trafficking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Cooperation with law enforcement (with exceptions)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Would suffer extreme hardship if removed</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">Special Protections</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">🛡️</span>
                    <span>Minors (under 18) have modified requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">❤️</span>
                    <span>Trauma may excuse inability to cooperate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">👨‍👩‍👧‍👦</span>
                    <span>Family members may qualify for derivative status</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">⏰</span>
                    <span>Past cooperation may satisfy requirements</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Family Protection */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Family Member Protection</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">If Applicant is Under 21</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-2xl">💑</span>
                    <span className="text-gray-300">Spouse</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-2xl">👶</span>
                    <span className="text-gray-300">Children</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-2xl">👨‍👩</span>
                    <span className="text-gray-300">Parents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-2xl">👫</span>
                    <span className="text-gray-300">Unmarried siblings under 18</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">If Applicant is 21 or Older</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-2xl">💑</span>
                    <span className="text-gray-300">Spouse</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-2xl">👶</span>
                    <span className="text-gray-300">Unmarried children under 21</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    <strong className="text-primary">Note:</strong> Family members receive the same
                    protections and benefits as the principal T visa holder.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Path to Green Card */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Path to Permanent Residence</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Green Card Eligibility Timeline
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <span className="text-gray-300">
                        Years of continuous physical presence (standard)
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        ⚡
                      </div>
                      <span className="text-gray-300">
                        Earlier filing if investigation/prosecution complete
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        👶
                      </div>
                      <span className="text-gray-300">Reduced time if victim was under 18</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Additional Requirements</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Good moral character demonstration</li>
                    <li>• Continued cooperation with law enforcement</li>
                    <li>• Extreme hardship if removed from US</li>
                    <li>• Admissibility requirements or waiver</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Crisis Resources */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Crisis Resources for Trafficking Survivors
            </h2>
            <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-400 mb-6">24/7 Crisis Support</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 text-xl">📞</span>
                    <div>
                      <div className="text-white font-bold">National Human Trafficking Hotline</div>
                      <div className="text-red-300">1-888-373-7888</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 text-xl">💬</span>
                    <div>
                      <div className="text-white font-bold">Crisis Text Line</div>
                      <div className="text-red-300">Text 233733</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 text-xl">🆘</span>
                    <div>
                      <div className="text-white font-bold">National Domestic Violence Hotline</div>
                      <div className="text-red-300">1-800-799-7233</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 text-xl">🔒</span>
                    <div>
                      <div className="text-white font-bold">Confidential Legal Help</div>
                      <div className="text-red-300">1-844-YO-PELEO</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-800/30 rounded-lg">
                <p className="text-red-200 text-sm italic">
                  All resources provide immediate crisis support and can connect you with local
                  services and legal assistance. Your safety is the priority - you deserve
                  protection and justice.
                </p>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
