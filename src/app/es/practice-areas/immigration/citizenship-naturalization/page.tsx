import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Citizenship & Naturalization Abogados NC & FL | Become US Citizen | Vasquez Law Firm',
  description:
    'Expert citizenship and naturalization attorneys in NC & FL. N-400 applications, English/civics test prep, naturalization ceremony. 95% approval rate. Call 1-844-YO-PELEO',
  keywords:
    'citizenship lawyer, naturalization attorney, N-400 application, become US citizen, naturalization ceremony, civics test, English test, NC naturalization lawyer',
  openGraph: {
    title: 'Citizenship & Naturalization Abogados | Become US Citizen - Vasquez Law Firm',
    description:
      'Expert citizenship attorneys with 95% approval rate. Complete N-400 assistance and test preparation.',
    images: [{ url: '/images/citizenship-naturalization-lawyers.jpg' }],
  },
};

export default function CitizenshipNaturalizationPage() {
  const services = [
    {
      title: 'N-400 Application Preparation',
      description:
        'Complete Form N-400 preparation with expert guidance through every section and supporting document requirements',
      icon: '📝',
      features: [
        'Comprehensive eligibility assessment',
        'Form N-400 preparation and filing',
        'Supporting document gathering',
        'Travel history reconstruction',
        'Tax record analysis',
        'Criminal history evaluation',
      ],
    },
    {
      title: 'English & Civics Test Preparation',
      description:
        'Expert preparation for the naturalization test including English speaking, reading, writing, and civics components',
      icon: '📚',
      features: [
        'English speaking practice sessions',
        'Reading comprehension preparation',
        'Writing skills development',
        'Civics test study materials',
        'Mock interview sessions',
        'Test anxiety management',
      ],
    },
    {
      title: 'Naturalization Interview Preparation',
      description:
        'Comprehensive interview preparation to ensure confidence and success at your USCIS naturalization interview',
      icon: '🎯',
      features: [
        'Mock interview practice',
        'Question and answer preparation',
        'Document review and organization',
        'Interview anxiety management',
        'Cultural competency training',
        'Abogado accompaniment available',
      ],
    },
    {
      title: 'Complex Cases & Waivers',
      description:
        'Specialized assistance for challenging naturalization cases requiring waivers or overcoming eligibility issues',
      icon: '⚖️',
      features: [
        'Age/disability English waivers',
        'Military naturalization cases',
        'Criminal history analysis',
        'Travel violation waivers',
        'Tax compliance issues',
        'Good moral character evidence',
      ],
    },
    {
      title: 'Derivative Citizenship Claims',
      description:
        'Help obtain US citizenship through parents or grandparents for those who may already be citizens without knowing it',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Citizenship through parents analysis',
        'Certificate of Citizenship applications',
        'Genealogy research assistance',
        'Document authentication',
        'Consular record requests',
        'Passport application support',
      ],
    },
    {
      title: 'Expedited Naturalization',
      description:
        'Fast-track naturalization for military personnel, spouses, and other qualifying urgent cases',
      icon: '🚀',
      features: [
        'Military naturalization (N-426)',
        'Spouse of US citizen abroad',
        'Expedite requests for urgent travel',
        'Same-day ceremony scheduling',
        'Emergency passport processing',
        'Overseas naturalization assistance',
      ],
    },
    {
      title: 'Name Change Through Naturalization',
      description:
        'Legal name change process through naturalization ceremony for new American identity',
      icon: '🆔',
      features: [
        'Legal name change petitions',
        'Court hearing representation',
        'Document update assistance',
        'Social Security Administration coordination',
        'State ID/Driver license updates',
        'Professional licensing updates',
      ],
    },
    {
      title: 'Dual Citizenship Guidance',
      description:
        'Expert advice on maintaining or renouncing foreign citizenship while becoming a US citizen',
      icon: '🌍',
      features: [
        'Dual citizenship analysis',
        'Foreign law consultation',
        'Renunciation procedures',
        'Tax implications assessment',
        'Military service obligations',
        'Consular processing coordination',
      ],
    },
    {
      title: 'Post-Naturalization Services',
      description:
        'Complete assistance after naturalization including passport applications and family petitions',
      icon: '🇺🇸',
      features: [
        'US passport applications',
        'Family petition upgrades',
        'Voting registration assistance',
        'Certificate replacement',
        'Federal benefits applications',
        'Citizenship certificate corrections',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the naturalization process take?',
      answer:
        'The current processing time for N-400 applications is typically 8-14 months from filing to oath ceremony. However, complex cases or those requiring additional documentation may take longer.',
    },
    {
      question: 'What happens if I fail the English or civics test?',
      answer:
        'If you fail either test, you get a second chance. USCIS will retest you only on the portion you failed. We provide comprehensive test preparation to maximize your chances of passing on the first try.',
    },
    {
      question: 'Can I travel outside the US while my N-400 is pending?',
      answer:
        'Yes, you can travel as a permanent resident while your naturalization application is pending. However, extended trips may affect your continuous residence requirement.',
    },
    {
      question: 'What if I have a criminal record?',
      answer:
        "Not all criminal records prevent naturalization. We analyze your specific case to determine if you're eligible or if you need to wait longer before applying. Some offenses may be waivable.",
    },
    {
      question: 'Do I need to speak perfect English to become a citizen?',
      answer:
        'No, you need to demonstrate basic English ability. There are exceptions for age and disability. We provide test preparation to help you meet the requirements confidently.',
    },
    {
      question: 'Can I apply for citizenship through my spouse?',
      answer:
        "If you're married to a US citizen, you may be eligible to apply after 3 years of permanent residence (instead of 5) if you meet other requirements including living in marital union.",
    },
  ];

  const content = {
    introduction: `Becoming a United States citizen is one of the most important and rewarding achievements in life. Citizenship provides security, voting rights, the ability to petition for family members, and protection from deportation. Our experienced naturalization attorneys have helped thousands of clients successfully navigate the citizenship process with a 95% approval rate.`,

    processTitle: 'Our Naturalization Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Assessment',
        description:
          'Comprehensive review of your immigration history, residence, and eligibility requirements',
      },
      {
        step: '2',
        title: 'Application Preparation',
        description: 'Expert Form N-400 preparation with all supporting documents and evidence',
      },
      {
        step: '3',
        title: 'Test Preparation',
        description:
          'English and civics test preparation with practice materials and mock sessions',
      },
      {
        step: '4',
        title: 'Interview Preparation',
        description:
          'Comprehensive interview preparation including mock interviews and document review',
      },
      {
        step: '5',
        title: 'Oath Ceremony',
        description:
          'Assistance with oath ceremony scheduling and celebration of your new citizenship',
      },
    ],

    urgencyTitle: 'Ready to Become a US Citizen?',
    urgencyMessage:
      'The naturalization process takes 8-14 months. Start your journey to citizenship today with expert legal guidance.',

    successStats: [
      { number: '5,000+', label: 'Citizens Naturalized' },
      { number: '95%', label: 'Approval Rate' },
      { number: '8-14', label: 'Months Average Processing' },
      { number: '100%', label: 'Test Prep Success Rate' },
    ],

    whyChooseTitle: 'Why Choose Our Naturalization Team?',
    whyChoosePoints: [
      '95% approval rate for naturalization applications',
      'Comprehensive test preparation with 100% pass rate',
      'Bilingual attorneys and staff fluent in Spanish',
      'Experienced with complex cases and waivers',
      'Free initial consultation and case evaluation',
      'Payment plans available for all services',
      'Track record with USCIS offices nationwide',
      'Post-naturalization services including passport help',
    ],

    requirementsTitle: 'Naturalization Requirements',
    requirements: [
      {
        title: 'Age Requirement',
        description: 'Must be at least 18 years old when filing Form N-400',
        details: [
          '18+ years old at filing',
          'Legal capacity to take oath',
          'Adult naturalization process',
        ],
      },
      {
        title: 'Permanent Residence',
        description: 'Must be lawful permanent resident for required period',
        details: [
          '5 years for general applicants',
          '3 years if married to US citizen',
          'Military exceptions available',
        ],
      },
      {
        title: 'Physical Presence',
        description: 'Must meet physical presence requirements in the US',
        details: [
          '30 months out of 5 years (general)',
          '18 months out of 3 years (spouse)',
          'Travel breaks carefully calculated',
        ],
      },
      {
        title: 'English & Civics Knowledge',
        description: 'Must demonstrate English ability and civics knowledge',
        details: [
          'English speaking test',
          'English reading test',
          'English writing test',
          'US history and civics test',
        ],
      },
      {
        title: 'Good Moral Character',
        description: 'Must demonstrate good moral character during statutory period',
        details: [
          'Background check completion',
          'Tax compliance',
          'No serious criminal history',
          'Truthfulness in application',
        ],
      },
    ],
  };

  return (
    <ModernPracticeAreaTemplate
      title="Citizenship & Naturalization Abogados"
      subtitle="Your Path to US Citizenship Starts Here"
      description="Become a US citizen with expert legal guidance. Our naturalization attorneys have a 95% approval rate and provide comprehensive assistance from N-400 preparation to oath ceremony celebration."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Requirements Section */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Naturalization Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.requirements.map((req, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-xl font-bold text-primary mb-3">{req.title}</h3>
                  <p className="text-gray-300 mb-4">{req.description}</p>
                  <ul className="space-y-1">
                    {req.details.map((detail, dIndex) => (
                      <li key={dIndex}

                className="text-sm text-gray-400 flex items-start gap-2">
                        <span
                className="text-primary mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Test Information */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Naturalization Test Components</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">English Test</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                    <h4 className="font-bold text-primary mb-2">Speaking Test</h4>
                    <p className="text-gray-300 text-sm">
                      Evaluated during interview through normal conversation
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                    <h4 className="font-bold text-primary mb-2">Reading Test</h4>
                    <p className="text-gray-300 text-sm">
                      Read 1-3 sentences about civics or history topics
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                    <h4 className="font-bold text-primary mb-2">Writing Test</h4>
                    <p className="text-gray-300 text-sm">
                      Write 1-3 sentences about civics or history topics
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Civics Test</h3>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h4 className="font-bold text-primary mb-4">US History & Government</h4>
                  <p className="text-gray-300 mb-4">
                    Answer 6 out of 10 questions correctly from these topics:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• American Government (principles of democracy, rule of law)</li>
                    <li>• American History (colonial period, independence, 1800s, 1900s)</li>
                    <li>• Integrated Civics (geography, symbols, holidays)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Naturalization Timeline</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1-2</div>
                  <div className="text-sm text-gray-300">Months to prepare and file N-400</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8-14</div>
                  <div className="text-sm text-gray-300">Months total processing time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2-3</div>
                  <div className="text-sm text-gray-300">Weeks from interview to oath ceremony</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1</div>
                  <div className="text-sm text-gray-300">
                    Day to celebrate your new citizenship!
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fee Information */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Current USCIS Fees</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">N-400 Filing Fee</h3>
                <div className="text-3xl font-bold text-white mb-2">$760</div>
                <p className="text-gray-300 text-sm">USCIS processing fee</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">Biometrics Fee</h3>
                <div className="text-3xl font-bold text-white mb-2">$85</div>
                <p className="text-gray-300 text-sm">Fingerprinting and background check</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">Total Government Fees</h3>
                <div className="text-3xl font-bold text-white mb-2">$845</div>
                <p className="text-gray-300 text-sm">Due at time of filing</p>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-4 text-sm">
              *Fee reductions available for qualifying applicants based on income
            </p>
          </section>
        </div>
      }
    />
  );
}
