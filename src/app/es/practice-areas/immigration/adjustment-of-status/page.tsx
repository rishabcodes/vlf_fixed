import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title:
    'Adjustment of Status Abogados NC & FL | Green Card Applications | Expert Inmigración Help | Vasquez Law Firm',
  description:
    'Expert adjustment of status attorneys with 94% approval rate. Family-based, employment-based green cards. I-485 applications, waivers, interviews. Free consultation. Call 1-844-YO-PELEO',
  keywords:
    'adjustment of status lawyer, green card application, I-485 attorney, permanent residence lawyer, family immigration, employment green card, waiver attorney, immigration interview prep',
  openGraph: {
    title: 'Adjustment of Status Abogados | Green Card Experts - Vasquez Law Firm',
    description:
      'Expert adjustment of status attorneys with 94% approval rate. Complete green card assistance.',
    images: [{ url: '/images/adjustment-status-green-card-lawyers.jpg' }],
  },
};

export default function AdjustmentOfStatusPage() {
  const services = [
    {
      title: 'Family-Based Adjustment of Status',
      description:
        'Adjust status to permanent resident through marriage to US citizen or lawful permanent resident',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Marriage-based I-485 applications',
        'Immediate relative petitions (spouse, parents, children)',
        'Family preference category adjustments',
        'K-1 fiancé to permanent resident adjustments',
        'Evidence of bona fide marriage preparation',
        'Joint interview preparation and representation',
      ],
    },
    {
      title: 'Employment-Based Adjustment',
      description:
        'Permanent residence through employment opportunities and extraordinary ability petitions',
      icon: '💼',
      features: [
        'EB-1 extraordinary ability adjustments',
        'EB-2 advanced degree professional cases',
        'EB-3 skilled worker adjustments',
        'National Interest Waiver (NIW) cases',
        'PERM labor certification coordination',
        'Priority date tracking and optimization',
      ],
    },
    {
      title: 'I-485 Application Preparation',
      description:
        'Complete Form I-485 preparation with comprehensive documentation and evidence gathering',
      icon: '📋',
      features: [
        'Comprehensive I-485 form preparation',
        'Supporting document compilation',
        'Medical examination coordination',
        'Biometrics appointment scheduling',
        'Timeline management and tracking',
        'Application package optimization',
      ],
    },
    {
      title: 'Inadmissibility Waivers',
      description: 'Overcome inadmissibility grounds with strategic waiver applications',
      icon: '🛡️',
      features: [
        'I-601 inadmissibility waiver applications',
        'Criminal inadmissibility waivers',
        'Health-related waiver assistance',
        'Fraud/misrepresentation waivers',
        'Extreme hardship documentation',
        'Provisional unlawful presence waivers',
      ],
    },
    {
      title: 'Adjustment Interview Preparation',
      description: 'Comprehensive preparation for USCIS adjustment of status interviews',
      icon: '🎯',
      features: [
        'Mock interview practice sessions',
        'Document organization and review',
        'Question and answer preparation',
        'Cultural competency training',
        'Anxiety management techniques',
        'Abogado accompaniment to interviews',
      ],
    },
    {
      title: 'Derivative Beneficiary Cases',
      description: 'Adjustment of status for spouses and children of primary applicants',
      icon: '👶',
      features: [
        'Spouse derivative adjustments',
        'Child derivative benefit applications',
        'Age-out protection strategies',
        'Family unity maintenance',
        'Coordinated family processing',
        'Child Status Protection Act guidance',
      ],
    },
    {
      title: 'Concurrent Filing Strategy',
      description:
        'Strategic concurrent filing of petitions and adjustment applications for efficiency',
      icon: '⚡',
      features: [
        'I-130/I-485 concurrent filing',
        'I-140/I-485 concurrent applications',
        'Timeline optimization strategies',
        'Priority date utilization',
        'Work authorization expediting',
        'Travel document coordination',
      ],
    },
    {
      title: 'Work Authorization & Travel',
      description:
        'Employment authorization and travel document assistance during adjustment process',
      icon: '✈️',
      features: [
        'I-765 work authorization applications',
        'I-131 advance parole travel documents',
        'Renewal application management',
        'Emergency travel authorization',
        'Employer verification assistance',
        'Document replacement services',
      ],
    },
    {
      title: 'Adjustment Appeals & Motions',
      description: 'Expert representation for denied adjustment applications and appeals',
      icon: '⚖️',
      features: [
        'Motions to reopen/reconsider',
        'Administrative Appeals Office (AAO) appeals',
        'Federal court litigation',
        'Denial analysis and strategy',
        'Additional evidence submissions',
        'Policy violation arguments',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is adjustment of status and who is eligible?',
      answer:
        'Adjustment of status allows certain individuals already in the US to change from temporary status to permanent resident without leaving the country. Eligibility depends on having an approved petition, available visa number, and meeting admissibility requirements.',
    },
    {
      question: 'How long does the adjustment of status process take?',
      answer:
        'Processing times vary by category and USCIS office, typically ranging from 8-24 months. Family-based cases often process faster than employment-based cases. We track all case timelines and provide regular updates.',
    },
    {
      question: 'Can I work while my adjustment of status is pending?',
      answer:
        'Yes, you can apply for work authorization (EAD) with your I-485 application. The EAD typically takes 3-5 months to process and allows legal employment while your case is pending.',
    },
    {
      question: 'What happens if I travel while my case is pending?',
      answer:
        'Traveling without advance parole can abandon your adjustment application. You must obtain advance parole (I-131) before any international travel. We handle all travel document applications to protect your case.',
    },
    {
      question: 'Do I need an interview for adjustment of status?',
      answer:
        'Most adjustment cases require an interview, especially marriage-based cases. Employment-based cases may be waived. We provide comprehensive interview preparation including mock interviews and document coaching.',
    },
    {
      question: 'What if my adjustment of status is denied?',
      answer:
        'Denials can often be appealed or overcome with motions to reopen. We analyze denial reasons and develop strategies to address deficiencies, file appeals, or explore alternative options to achieve permanent residence.',
    },
  ];

  const content = {
    introduction: `Adjusting status from temporary to permanent resident is one of the most important steps in your immigration journey. Our adjustment of status attorneys have successfully helped thousands of clients obtain green cards with a 94% approval rate, handling everything from family-based to employment-based cases with precision and expertise.`,

    processTitle: 'Our Adjustment of Status Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Assessment & Strategy',
        description:
          'Comprehensive evaluation of eligibility and development of optimal filing strategy',
      },
      {
        step: '2',
        title: 'Petition & Application Preparation',
        description: 'Expert preparation of I-485 and supporting forms with complete documentation',
      },
      {
        step: '3',
        title: 'Filing & Case Management',
        description: 'Strategic filing and ongoing case management with timeline tracking',
      },
      {
        step: '4',
        title: 'Interview Preparation & Representation',
        description: 'Comprehensive interview preparation and skilled attorney representation',
      },
      {
        step: '5',
        title: 'Green Card Approval & Follow-up',
        description:
          'Final approval processing and assistance with next steps including citizenship',
      },
    ],

    urgencyTitle: 'Priority Date Current? Act Now!',
    urgencyMessage:
      'When your priority date becomes current, you have a limited window to file your adjustment application. Don\'t miss your opportunity for permanent residence.',

    successStats: [
      { number: '12,000+', label: 'Green Cards Obtained' },
      { number: '94%', label: 'Approval Rate' },
      { number: '8-24', label: 'Months Average Processing' },
      { number: '100%', label: 'Interview Preparation Success' },
    ],

    whyChooseTitle: 'Why Choose Our Adjustment Team?',
    whyChoosePoints: [
      '94% approval rate for adjustment of status applications',
      'Former USCIS officers with inside knowledge of procedures',
      'Comprehensive interview preparation with 100% success rate',
      'Expert waiver assistance for inadmissibility issues',
      'Bilingual attorneys and staff fluent in Spanish',
      'Priority date tracking and strategic timing advice',
      'Complete family immigration coordination',
      'Concurrent filing expertise for faster processing',
    ],

    adjustmentCategories: {
      title: 'Adjustment of Status Categories',
      categories: [
        {
          title: 'Immediate Relatives',
          description: 'Spouses, parents, and unmarried children under 21 of US citizens',
          processing: '8-12 months',
          benefits: ['No visa number wait', 'Fastest processing', 'Concurrent filing allowed'],
        },
        {
          title: 'Family Preference',
          description: 'Other family relationships with longer wait times',
          processing: '12-24 months',
          benefits: [
            'F1, F2, F3, F4 categories',
            'Priority date required',
            'Derivative benefits available',
          ],
        },
        {
          title: 'Employment-Based',
          description: 'Job-based permanent residence for skilled workers',
          processing: '10-18 months',
          benefits: [
            'EB-1, EB-2, EB-3 categories',
            'Labor certification may be required',
            'Premium processing available',
          ],
        },
        {
          title: 'Special Categories',
          description: 'Asylum, diversity visa, and other special programs',
          processing: '6-15 months',
          benefits: [
            'Refugee/asylee adjustments',
            'Diversity visa winners',
            'Special immigrant categories',
          ],
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="Adjustment of Status Abogados"
      subtitle="Your Path to Permanent Residence Starts Here"
      description="Obtain your green card with expert legal guidance. Our adjustment of status attorneys have a 94% approval rate and provide comprehensive assistance from petition filing to interview success."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Adjustment Categories */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Adjustment of Status Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.adjustmentCategories.categories.map((category, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-xl font-bold text-primary mb-3">{category.title}</h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-white">Processing Time: </span>
                    <span className="text-primary font-bold">{category.processing}</span>
                  </div>
                  <ul className="space-y-1">
                    {category.benefits.map((benefit, bIndex) => (
                      <li key={bIndex}

                className="text-sm text-gray-400 flex items-start gap-2">
                        <span
                className="text-primary mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Required Documents */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Required Documents for Adjustment
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">📋 Core Documents</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Form I-485 Application</li>
                  <li>• Approved I-130 or I-140 petition</li>
                  <li>• Birth certificate with translation</li>
                  <li>• Passport and entry documents</li>
                  <li>• Two passport-style photos</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🏥 Medical Evidence</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Form I-693 Medical Examination</li>
                  <li>• Vaccination records</li>
                  <li>• Civil surgeon certification</li>
                  <li>• TB screening results</li>
                  <li>• Blood test documentation</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">💰 Financial Evidence</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Form I-864 Affidavit of Support</li>
                  <li>• Tax returns (3 years)</li>
                  <li>• Employment verification letter</li>
                  <li>• Bank statements</li>
                  <li>• Asset documentation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Processing Timeline */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Adjustment Processing Timeline</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">1-2</div>
                  <div className="text-sm text-gray-300">Months to prepare application</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2-4</div>
                  <div className="text-sm text-gray-300">Weeks for receipt notice</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">3-5</div>
                  <div className="text-sm text-gray-300">Months for work authorization</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">8-24</div>
                  <div className="text-sm text-gray-300">Months for interview scheduling</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">1-3</div>
                  <div className="text-sm text-gray-300">Months from interview to decision</div>
                </div>
              </div>
            </div>
          </section>

          {/* Current Filing Fees */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Current USCIS Filing Fees</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-lg font-bold text-primary mb-2">I-485 Filing Fee</h3>
                <div className="text-2xl font-bold text-white mb-2">$1,440</div>
                <p className="text-gray-300 text-sm">Main application fee</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-lg font-bold text-primary mb-2">I-765 Work Auth</h3>
                <div className="text-2xl font-bold text-white mb-2">$410</div>
                <p className="text-gray-300 text-sm">Employment authorization</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-lg font-bold text-primary mb-2">I-131 Travel Doc</h3>
                <div className="text-2xl font-bold text-white mb-2">$630</div>
                <p className="text-gray-300 text-sm">Advance parole</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <h3 className="text-lg font-bold text-primary mb-2">Medical Exam</h3>
                <div className="text-2xl font-bold text-white mb-2">$200-500</div>
                <p className="text-gray-300 text-sm">Civil surgeon fee</p>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-4 text-sm">
              *Fees subject to change. Fee waivers available for qualifying applicants.
            </p>
          </section>
        </div>
      }
    />
  );
}
