import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Asylum & Refugee Abogados NC | URGENT Protection from Persecution | Vasquez Law Firm',
  description:
    'URGENT: Expert asylum and refugee attorneys. 1-year deadline for asylum applications. Protection from persecution, torture, violence. Former immigration judges on staff. Call 1-844-YO-PELEO',
  keywords:
    'asylum lawyer, refugee attorney, persecution protection, asylum application, withholding removal, torture protection, political asylum, religious persecution, LGBTQ asylum',
  openGraph: {
    title: 'URGENT Asylum & Refugee Protection Abogados | Expert Defense - Vasquez Law Firm',
    description:
      'Expert asylum attorneys with former immigration judges. Urgent protection from persecution.',
    images: [{ url: '/images/asylum-refugee-protection.jpg' }],
  },
};

export default function AsylumRefugeePage() {
  const services = [
    {
      title: 'Asylum Applications (I-589)',
      description:
        'Complete asylum application preparation for those fearing persecution in their home country due to protected grounds',
      icon: '🛡️',
      features: [
        'Detailed persecution analysis and documentation',
        'Country condition research and expert testimony',
        'Comprehensive I-589 application preparation',
        'Supporting evidence gathering and organization',
        'Witness statement preparation and coaching',
        'Medical and psychological evaluation coordination',
      ],
    },
    {
      title: 'Political Persecution Cases',
      description:
        'Expert representation for those facing persecution due to political opinion, activism, or government opposition',
      icon: '🗳️',
      features: [
        'Political opinion persecution documentation',
        'Government persecution evidence gathering',
        'Opposition party membership cases',
        'Political activist protection claims',
        'Journalist and media persecution cases',
        'Human rights defender asylum claims',
      ],
    },
    {
      title: 'Religious Persecution Protection',
      description:
        'Specialized defense for those facing persecution due to religious beliefs, practices, or conversion',
      icon: '⛪',
      features: [
        'Religious persecution documentation',
        'Forced conversion protection',
        'Religious minority persecution cases',
        'Faith-based violence documentation',
        'Religious freedom violation claims',
        'Interfaith marriage persecution cases',
      ],
    },
    {
      title: 'Gender-Based Violence Asylum',
      description:
        'Specialized representation for women and LGBTQ+ individuals facing gender-based persecution and violence',
      icon: '👩‍⚖️',
      features: [
        'Domestic violence asylum claims',
        'Female genital mutilation (FGM) cases',
        'Honor violence protection',
        'Forced marriage asylum claims',
        'Sexual violence persecution cases',
        'Gender-based social group claims',
      ],
    },
    {
      title: 'LGBTQ+ Asylum Cases',
      description:
        'Expert advocacy for LGBTQ+ individuals facing persecution due to sexual orientation or gender identity',
      icon: '🏳️‍🌈',
      features: [
        'Sexual orientation persecution cases',
        'Gender identity persecution claims',
        'Conversion therapy violence documentation',
        'LGBTQ+ criminalization asylum',
        'Family rejection persecution cases',
        'Transgender violence protection claims',
      ],
    },
    {
      title: 'Torture Protection (CAT)',
      description:
        'Convention Against Torture protection for those who would face torture if returned to their home country',
      icon: '🚫',
      features: [
        'Torture risk assessment and documentation',
        'Medical evidence of past torture',
        'Country condition torture documentation',
        'Government torture pattern evidence',
        'Psychological torture evaluation',
        'CAT withholding applications',
      ],
    },
    {
      title: 'One-Year Deadline Exceptions',
      description:
        'Strategic legal arguments to overcome the one-year filing deadline for asylum applications',
      icon: '⏰',
      features: [
        'Changed circumstances analysis',
        'Extraordinary circumstances documentation',
        'Legal status maintenance evidence',
        'Reasonable delay explanations',
        'Medical condition exceptions',
        'Abogado negligence claims',
      ],
    },
    {
      title: 'Refugee Status Assistance',
      description: 'Complete support for refugee status applications and resettlement processes',
      icon: '🌍',
      features: [
        'UNHCR referral coordination',
        'Embassy interview preparation',
        'Refugee status documentation',
        'Resettlement program assistance',
        'Family reunification support',
        'Cultural orientation and integration',
      ],
    },
    {
      title: 'Asylum Appeals & Litigation',
      description:
        'Expert appellate representation for denied asylum cases at BIA and federal court levels',
      icon: '⚖️',
      features: [
        'Board of Inmigración Appeals (BIA) briefs',
        'Federal Circuit Court appeals',
        'Motions to reopen with new evidence',
        'Habeas corpus petitions',
        'Stay of removal applications',
        'Class action litigation participation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is the one-year deadline for asylum applications?',
      answer:
        'You must file your asylum application within one year of your arrival in the US, unless you qualify for an exception. Exceptions include changed circumstances in your country, extraordinary circumstances that prevented filing, or maintaining legal status.',
    },
    {
      question: 'What types of persecution qualify for asylum?',
      answer:
        'Persecution must be based on race, religion, nationality, political opinion, or membership in a particular social group. The persecution must be by the government or groups the government is unwilling or unable to control.',
    },
    {
      question: 'Can I include my family members in my asylum application?',
      answer:
        'Yes, you can include your spouse and unmarried children under 21 as derivatives on your asylum application if they are in the US. If they are abroad, you can petition for them after you receive asylum.',
    },
    {
      question: 'What is the difference between asylum and refugee status?',
      answer:
        'Asylum is for people already in the US seeking protection, while refugee status is for people outside the US seeking admission. Both provide protection from persecution but have different application processes.',
    },
    {
      question: 'How long does the asylum process take?',
      answer:
        'Asylum cases can take 1-4 years depending on court backlogs and case complexity. Affirmative asylum cases with USCIS typically take 6-12 months, while defensive cases in immigration court take much longer.',
    },
    {
      question: 'Can I work while my asylum case is pending?',
      answer:
        'You can apply for work authorization 150 days after filing a complete asylum application, and it can be granted 30 days after that (total of 180 days). You must maintain your asylum case to keep work authorization.',
    },
  ];

  const content = {
    introduction: `If you are in the United States and fear returning to your home country due to persecution, torture, or violence, asylum protection may be available to you. Our experienced asylum attorneys have successfully protected thousands of individuals and families from persecution, with former immigration judges and asylum officers on our team who understand exactly how to build winning cases.`,

    processTitle: 'Our Asylum Protection Process',
    process: [
      {
        step: '1',
        title: 'Emergency Consultation & Case Assessment',
        description:
          'Immediate evaluation of your persecution claims and eligibility for protection',
      },
      {
        step: '2',
        title: 'Evidence Gathering & Documentation',
        description: 'Comprehensive documentation of persecution with country condition research',
      },
      {
        step: '3',
        title: 'I-589 Application Preparation',
        description: 'Expert preparation of asylum application with detailed personal statement',
      },
      {
        step: '4',
        title: 'Interview or Hearing Preparation',
        description: 'Intensive preparation for USCIS interview or immigration court hearing',
      },
      {
        step: '5',
        title: 'Representation & Advocacy',
        description: 'Expert representation before immigration judges and asylum officers',
      },
    ],

    urgencyTitle: 'URGENT: One-Year Asylum Deadline Approaching?',
    urgencyMessage:

    successStats: [
      { number: '3,000+', label: 'Asylum Cases Won' },
      { number: '87%', label: 'Success Rate in Asylum Cases' },
      { number: '1', label: 'Year Deadline to File' },
      { number: '24/7', label: 'Emergency Consultation' },
    ],

    whyChooseTitle: 'Why Choose Our Asylum Defense Team?',
    whyChoosePoints: [
      'Former immigration judges who decided asylum cases',
      'Former asylum officers who know USCIS procedures',
      'Specialized in complex persecution documentation',
      'Expert country condition research and testimony',
      'Multilingual staff fluent in 15+ languages',
      'Trauma-informed representation for survivors',
      'Proven track record with 87% success rate',
      'Emergency consultations available 24/7',
    ],

    persecutionGrounds: {
      title: 'Protected Grounds for Asylum',
      grounds: [
        {
          title: 'Race',
          description: 'Persecution based on racial, ethnic, or tribal identity',
          examples: [
            'Ethnic cleansing',
            'Racial violence',
            'Tribal conflicts',
            'Minority persecution',
          ],
        },
        {
          title: 'Religion',
          description: 'Persecution for religious beliefs, practices, or conversion',
          examples: [
            'Religious minority persecution',
            'Forced conversion',
            'Faith-based violence',
            'Religious freedom restrictions',
          ],
        },
        {
          title: 'Nationality',
          description: 'Persecution based on citizenship or national origin',
          examples: [
            'Border conflicts',
            'National minority persecution',
            'Stateless persons',
            'Citizenship denial',
          ],
        },
        {
          title: 'Political Opinion',
          description: 'Persecution for political beliefs or activism',
          examples: [
            'Opposition party members',
            'Political activists',
            'Government critics',
            'Human rights defenders',
          ],
        },
        {
          title: 'Particular Social Group',
          description: 'Persecution of defined social groups',
          examples: [
            'LGBTQ+ individuals',
            'Women facing domestic violence',
            'Gang resistance',
            'Professional groups',
          ],
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="Asylum & Refugee Protection Abogados"
      subtitle="Expert Defense Against Persecution & Torture"
      description="Facing persecution in your home country? Our asylum attorneys include former immigration judges and asylum officers who know exactly how to build winning protection cases. One-year deadline applies - contact us immediately."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Deadline Alert */}
          <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-red-400 mb-6 flex items-center gap-3">
              ⏰ CRITICAL ASYLUM DEADLINE WARNING
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">ONE YEAR DEADLINE:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• You must file asylum within 1 year of arrival in the US</li>
                  <li>• Limited exceptions for changed/extraordinary circumstances</li>
                  <li>• Missing deadline can permanently bar asylum eligibility</li>
                  <li>• Some exceptions available for maintaining legal status</li>
                  <li>• Emergency consultations available to assess your case</li>
                </ul>
              </div>
              <div className="bg-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">Emergency Asylum Help</h3>
                <p className="text-white mb-4">
                  <strong>Don't risk missing the deadline!</strong>
                  <br />
                  Call our emergency asylum hotline now:
                </p>
                <a href="tel:1-844-967-3536" className="text-2xl font-bold text-red-400">
                  1-844-YO-PELEO
                </a>
                <p className="text-gray-300 text-sm mt-2">Available 24/7 for asylum emergencies</p>
              </div>
            </div>
          </section>

          {/* Protected Grounds */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Protected Grounds for Asylum</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.persecutionGrounds.grounds.map((ground, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-xl font-bold text-primary mb-3">{ground.title}</h3>
                  <p className="text-gray-300 mb-4">{ground.description}</p>
                  <h4 className="font-semibold text-white mb-2">Examples:</h4>
                  <ul className="space-y-1">
                    {ground.examples.map((example, eIndex) => (
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

          {/* Types of Protection */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Types of Protection Available</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">🛡️ Asylum</h3>
                <p className="text-gray-300 mb-4">
                  For those already in the US fearing persecution
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Must apply within 1 year of arrival</li>
                  <li>• Can include spouse and children</li>
                  <li>• Path to permanent residence</li>
                  <li>• Work authorization available</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">🌍 Refugee Status</h3>
                <p className="text-gray-300 mb-4">For those outside the US seeking admission</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Must be referred by UNHCR or embassy</li>
                  <li>• Processed overseas before entry</li>
                  <li>• Immediate work authorization</li>
                  <li>• Path to permanent residence</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">🚫 Withholding/CAT</h3>
                <p className="text-gray-300 mb-4">
                  Protection from torture or life-threatening return
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Higher standard than asylum</li>
                  <li>• No time limit to apply</li>
                  <li>• Protection from removal only</li>
                  <li>• Work authorization available</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Country Information */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Common Countries of Persecution
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <p className="text-gray-300 mb-6">
                We have extensive experience representing asylum seekers from countries with
                documented human rights violations:
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  'Venezuela',
                  'Guatemala',
                  'Honduras',
                  'El Salvador',
                  'Nicaragua',
                  'Cuba',
                  'Haiti',
                  'China',
                  'Russia',
                  'Iran',
                  'Syria',
                  'Afghanistan',
                  'Myanmar',
                  'Ethiopia',
                  'Eritrea',
                  'Somalia',
                ].map((country, index) => (
                  <div key={index}

                className="text-center p-3 bg-white/5 rounded-lg">
                    <span
                className="text-primary font-medium">{country}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-6 text-center">
                Have persecution claims from other countries? We can help regardless of your country
                of origin.
              </p>
            </div>
          </section>
        </div>
      }
    />
  );
}
