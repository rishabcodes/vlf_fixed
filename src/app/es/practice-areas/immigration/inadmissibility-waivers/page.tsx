import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title:
    'Inadmissibility Waivers Abogados NC & FL | I-601, I-601A, Criminal, Fraud Waivers | Vasquez Law Firm',
  description:
    'Expert inadmissibility waiver attorneys. I-601, I-601A, criminal, fraud, health waivers. Overcome immigration bars with extreme hardship cases. 85% approval rate. Call 1-844-YO-PELEO',
  keywords:
    'inadmissibility waiver lawyer, I-601 waiver attorney, I-601A waiver lawyer, criminal waiver attorney, fraud waiver lawyer, extreme hardship waiver, immigration waiver attorney',
  openGraph: {
    title: 'Inadmissibility Waivers Abogados | Overcome Inmigración Bars - Vasquez Law Firm',
    description:
      'Expert inadmissibility waiver attorneys with 85% approval rate. Overcome criminal, fraud, and other immigration bars.',
    images: [{ url: '/images/inadmissibility-waiver-lawyers.jpg' }],
  },
};

export default function InadmissibilityWaiversPage() {
  const services = [
    {
      title: 'I-601 Inadmissibility Waivers',
      description:
        'Comprehensive waiver applications for various grounds of inadmissibility including criminal, fraud, and health issues',
      icon: '📋',
      features: [
        'Criminal inadmissibility waiver applications',
        'Fraud and misrepresentation waivers',
        'Health-related inadmissibility waivers',
        'Extreme hardship documentation',
        'Supporting evidence compilation',
        'USCIS interview preparation and representation',
      ],
    },
    {
      title: 'I-601A Provisional Unlawful Presence Waivers',
      description:
        'Provisional waivers for unlawful presence bars, allowing families to remain together during processing',
      icon: '⏰',
      features: [
        'Provisional unlawful presence waiver applications',
        'Extreme hardship to US citizen/LPR spouse or parent',
        'Qualifying relationship documentation',
        'Medical and psychological hardship evidence',
        'Economic hardship documentation',
        'Country condition hardship evidence',
      ],
    },
    {
      title: 'Criminal Ground Waivers',
      description:
        'Specialized waiver applications for criminal convictions and immigration violations',
      icon: '⚖️',
      features: [
        'Crime involving moral turpitude (CIMT) waivers',
        'Controlled substance violation waivers',
        'Multiple criminal conviction waivers',
        'Aggravated felony waiver applications',
        'Rehabilitation evidence development',
        'Character witness testimony coordination',
      ],
    },
    {
      title: 'Fraud and Misrepresentation Waivers',
      description:
        'Waiver applications for fraud, willful misrepresentation, and document fraud findings',
      icon: '🚫',
      features: [
        'Material misrepresentation waiver applications',
        'Document fraud waiver assistance',
        'False claim to citizenship waivers',
        'Marriage fraud waiver applications',
        'Student visa fraud waivers',
        'Consular fraud finding appeals',
      ],
    },
    {
      title: 'Health-Related Inadmissibility Waivers',
      description:
        'Medical waiver applications for health conditions that make applicants inadmissible',
      icon: '🏥',
      features: [
        'Communicable disease waivers',
        'Mental health condition waivers',
        'Physical disorder waiver applications',
        'Vaccination requirement waivers',
        'Drug abuse/addiction waiver assistance',
        'Medical expert testimony coordination',
      ],
    },
    {
      title: 'Extreme Hardship Documentation',
      description:
        'Comprehensive extreme hardship case development for qualifying US citizen or LPR relatives',
      icon: '💔',
      features: [
        'Medical hardship documentation and evidence',
        'Economic hardship impact analysis',
        'Educational hardship for children',
        'Family separation impact documentation',
        'Country condition hardship research',
        'Expert witness testimony procurement',
      ],
    },
    {
      title: 'Public Charge Inadmissibility',
      description: 'Assistance with public charge inadmissibility findings and waiver applications',
      icon: '💰',
      features: [
        'Public charge determination appeals',
        'Affidavit of Support strengthening',
        'Asset and income documentation',
        'Public benefit usage explanation',
        'Future self-sufficiency evidence',
        'Alternative sponsor identification',
      ],
    },
    {
      title: 'Inmigración Violation Waivers',
      description: 'Waivers for various immigration law violations and unlawful presence',
      icon: '📄',
      features: [
        'Unlawful presence waiver applications',
        'Entry without inspection waivers',
        'Visa overstay waiver assistance',
        'Inmigración fraud waiver applications',
        'Smuggling violation waivers',
        'Reentry after removal waivers',
      ],
    },
    {
      title: 'Waiver Appeals & Litigation',
      description:
        'Appellate representation for denied waiver applications and federal court challenges',
      icon: '🏛️',
      features: [
        'Administrative Appeals Office (AAO) briefs',
        'Board of Inmigración Appeals (BIA) cases',
        'Federal district court litigation',
        'Mandamus actions for delayed processing',
        'Constitutional challenge litigation',
        'Class action waiver case participation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is an inadmissibility waiver and when do I need one?',
      answer:
        'An inadmissibility waiver forgives certain grounds that would otherwise prevent you from entering or remaining in the US. You need one if USCIS or a consular officer determines you are inadmissible due to criminal, health, fraud, or other issues.',
    },
    {
      question: 'What is the difference between I-601 and I-601A waivers?',
      answer:
        'I-601 waivers are filed after a finding of inadmissibility and can address multiple grounds. I-601A is a provisional waiver specifically for unlawful presence, filed before consular processing to avoid family separation.',
    },
    {
      question: 'What constitutes "extreme hardship" for waiver purposes?',
      answer:
        'Extreme hardship goes beyond normal consequences of visa denial. It includes serious medical conditions, severe economic hardship, educational disruption, family separation, and dangerous country conditions that would affect qualifying relatives.',
    },
    {
      question: 'Can I get a waiver for any criminal conviction?',
      answer:
        'Not all crimes are waivable. Certain aggravated felonies and some drug trafficking offenses cannot be waived. We analyze your specific convictions to determine waiver eligibility and develop the strongest possible case.',
    },
    {
      question: 'How long does the waiver process take?',
      answer:
        'Waiver processing times vary significantly, typically 12-24 months for I-601 waivers and 4-8 months for I-601A waivers. Complex cases requiring extensive documentation may take longer. We track all case timelines closely.',
    },
    {
      question: 'What happens if my waiver is denied?',
      answer:
        'Waiver denials can often be appealed or overcome with additional evidence. We analyze denial reasons and develop strategies including appeals to AAO, motions to reopen, federal court challenges, or refiling with new evidence.',
    },
  ];

  const content = {
    introduction: `Inmigración inadmissibility can derail your American dream, but experienced waiver attorneys can often overcome these obstacles. Our inadmissibility waiver lawyers have successfully obtained waivers for thousands of clients with an 85% approval rate, turning seemingly impossible cases into immigration success stories through expert legal strategy and compelling hardship documentation.`,

    processTitle: 'Our Inadmissibility Waiver Process',
    process: [
      {
        step: '1',
        title: 'Inadmissibility Analysis & Waiver Eligibility',
        description:
          'Comprehensive analysis of inadmissibility grounds and available waiver options',
      },
      {
        step: '2',
        title: 'Hardship Documentation & Evidence Gathering',
        description:
          'Strategic development of extreme hardship evidence and supporting documentation',
      },
      {
        step: '3',
        title: 'Waiver Application Preparation & Filing',
        description: 'Expert preparation of waiver applications with compelling legal arguments',
      },
      {
        step: '4',
        title: 'Response to Government Requests',
        description: 'Professional handling of RFEs and additional evidence requests',
      },
      {
        step: '5',
        title: 'Approval & Inmigración Continuation',
        description: 'Waiver approval processing and continuation of immigration case',
      },
    ],

    urgencyTitle: 'Found Inadmissible? Time is Critical!',
    urgencyMessage:
      'Inadmissibility findings can permanently bar immigration benefits. The sooner you file a waiver application, the better your chances of success and the faster you can resolve your case.',

    successStats: [
      { number: '2,500+', label: 'Waivers Approved' },
      { number: '85%', label: 'Approval Rate' },
      { number: '15+', label: 'Types of Waivers' },
      { number: '12-24', label: 'Months Average Processing' },
    ],

    whyChooseTitle: 'Why Choose Our Waiver Team?',
    whyChoosePoints: [
      '85% approval rate for inadmissibility waiver applications',
      'Expert extreme hardship documentation and presentation',
      'Former USCIS officers with insider knowledge of waiver standards',
      'Comprehensive evidence development and expert witness coordination',
      'Proven strategies for complex criminal and fraud cases',
      'Appellate experience with denied waiver applications',
      'Bilingual attorneys for diverse client needs',
      'Track record with the most challenging inadmissibility cases',
    ],

    inadmissibilityGrounds: {
      title: 'Common Grounds of Inadmissibility',
      grounds: [
        {
          category: 'Criminal Grounds',
          description: 'Criminal convictions that can bar immigration',
          examples: [
            'Crimes involving moral turpitude (CIMT)',
            'Controlled substance violations',
            'Multiple criminal convictions',
            'Aggravated felonies (limited waiver availability)',
            'Domestic violence offenses',
            'Human trafficking violations',
          ],
        },
        {
          category: 'Inmigración Violations',
          description: 'Violations of immigration law and procedures',
          examples: [
            'Unlawful presence (3/10 year bars)',
            'Entry without inspection',
            'Visa fraud or misrepresentation',
            'False claims to US citizenship',
            'Document fraud',
            'Smuggling violations',
          ],
        },
        {
          category: 'Health-Related Grounds',
          description: 'Medical conditions affecting admissibility',
          examples: [
            'Communicable diseases of public health significance',
            'Mental disorders with harmful behavior',
            'Drug abuse or addiction',
            'Lack of required vaccinations',
            'Physical disorders affecting ability to work',
            'Previous removal for health reasons',
          ],
        },
        {
          category: 'Economic Grounds',
          description: 'Financial factors affecting admissibility',
          examples: [
            'Public charge determination',
            'Lack of adequate financial support',
            'Previous receipt of public benefits',
            'Insufficient assets or income',
            'Inadequate Affidavit of Support',
            'Labor certification issues',
          ],
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="Inadmissibility Waivers Abogados"
      subtitle="Overcoming Inmigración Bars & Obstacles"
      description="Overcome inadmissibility findings with expert waiver attorneys. We successfully obtain I-601, I-601A, criminal, fraud, and health waivers with an 85% approval rate, turning immigration obstacles into opportunities."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Inadmissibility Grounds */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Common Grounds of Inadmissibility
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.inadmissibilityGrounds.grounds.map((ground, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-xl font-bold text-primary mb-3">{ground.category}</h3>
                  <p className="text-gray-300 mb-4">{ground.description}</p>
                  <h4 className="font-semibold text-white mb-2">Common Examples:</h4>
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

          {/* Waiver Types */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Types of Inadmissibility Waivers
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">📋 I-601 Waiver</h3>
                <p className="text-gray-300 mb-4">
                  General inadmissibility waiver for multiple grounds
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Filed after inadmissibility finding</li>
                  <li>• Covers criminal, fraud, health grounds</li>
                  <li>• Requires extreme hardship to qualifying relative</li>
                  <li>• Processed by USCIS</li>
                  <li>• 12-24 month processing time</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  ⏰ I-601A Provisional Waiver
                </h3>
                <p className="text-gray-300 mb-4">Provisional waiver for unlawful presence only</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Filed before consular processing</li>
                  <li>• Only for unlawful presence bars</li>
                  <li>• Prevents family separation</li>
                  <li>• Faster processing (4-8 months)</li>
                  <li>• Must have approved immigrant petition</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">🏥 Health Waivers</h3>
                <p className="text-gray-300 mb-4">
                  Specialized waivers for health-related inadmissibility
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Communicable disease waivers</li>
                  <li>• Mental health condition waivers</li>
                  <li>• Vaccination requirement waivers</li>
                  <li>• Drug abuse/addiction waivers</li>
                  <li>• Requires medical expert testimony</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Extreme Hardship Factors */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Extreme Hardship Documentation</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <p className="text-gray-300 mb-6">
                Extreme hardship must be demonstrated to qualifying US citizen or lawful permanent
                resident relatives (spouse, parent, or child). We develop comprehensive hardship
                cases using multiple factors:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-primary mb-3">🏥 Medical Hardship</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Serious medical conditions requiring treatment</li>
                    <li>• Unavailable or inadequate medical care abroad</li>
                    <li>• Mental health impact of separation</li>
                    <li>• Elderly parent care requirements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-3">💼 Economic Hardship</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Loss of employment or business</li>
                    <li>• Inability to sell property/assets</li>
                    <li>• Professional licensing issues</li>
                    <li>• Significantly lower income abroad</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-3">📚 Educational Hardship</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Children's educational disruption</li>
                    <li>• Language barriers in foreign schools</li>
                    <li>• Special educational needs</li>
                    <li>• University/career interruption</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-3">👨‍👩‍👧‍👦 Family Ties</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Deep family roots in the US</li>
                    <li>• Lack of family ties abroad</li>
                    <li>• Children born and raised in US</li>
                    <li>• Elderly parent dependency</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-3">🌍 Country Conditions</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Political instability or violence</li>
                    <li>• Poor economic conditions</li>
                    <li>• Religious or ethnic persecution</li>
                    <li>• Lack of infrastructure/services</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-3">🏠 Social & Cultural</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Cultural adaptation difficulties</li>
                    <li>• Loss of social support networks</li>
                    <li>• Religious practice limitations</li>
                    <li>• Integration challenges</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Waiver Strategy */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Our Winning Waiver Strategy</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-lg font-bold text-primary mb-3">🔍 Case Analysis</h3>
                <p className="text-gray-300 text-sm">
                  Thorough analysis of inadmissibility grounds and waiver eligibility
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-lg font-bold text-primary mb-3">📚 Evidence Development</h3>
                <p className="text-gray-300 text-sm">
                  Comprehensive hardship documentation with expert witnesses
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-lg font-bold text-primary mb-3">📝 Legal Arguments</h3>
                <p className="text-gray-300 text-sm">
                  Compelling legal briefs addressing statutory requirements
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-lg font-bold text-primary mb-3">🎯 Outcome Focus</h3>
                <p className="text-gray-300 text-sm">
                  Strategic approach maximizing approval chances
                </p>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
