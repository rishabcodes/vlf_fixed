import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title:
    'Family Preference Visas Abogados NC & FL | F1, F2A, F2B, F3, F4 Inmigración | Vasquez Law Firm',
  description:
    'Expert family preference visa attorneys. F1, F2A, F2B, F3, F4 family immigration cases. Priority date tracking, visa bulletin monitoring. Reunite families. Call 1-844-YO-PELEO',
  keywords:
    'family preference visa lawyer, F1 visa attorney, F2A visa lawyer, F2B visa attorney, F3 visa lawyer, F4 visa attorney, family immigration lawyer, priority date tracking, visa bulletin monitoring',
  openGraph: {
    title: 'Family Preference Visas Abogados | F1, F2A, F2B, F3, F4 Experts - Vasquez Law Firm',
    description:
      'Expert family preference visa attorneys helping families reunite through the preference system.',
    images: [{ url: '/images/family-preference-visa-lawyers.jpg' }],
  },
};

export default function FamilyPreferenceVisasPage() {
  const services = [
    {
      title: 'F1 Visas - Unmarried Adult Children',
      description: 'F1 visa petitions for unmarried sons and daughters (21+) of US citizens',
      icon: '👨‍👩‍👧',
      features: [
        'I-130 petition preparation for unmarried adult children',
        'Age-out protection strategies under CSPA',
        'Priority date establishment and tracking',
        'Consular processing coordination',
        'Adjustment of status applications',
        'Derivative beneficiary assistance for grandchildren',
      ],
    },
    {
      title: 'F2A Visas - LPR Spouses & Minor Children',
      description:
        'F2A visa petitions for spouses and unmarried children under 21 of lawful permanent residents',
      icon: '💑',
      features: [
        'Spouse of permanent resident petitions',
        'Minor children of permanent resident cases',
        'Faster processing than other F2 categories',
        'Marriage evidence compilation',
        'Child age-out protection',
        'Current priority date monitoring',
      ],
    },
    {
      title: 'F2B Visas - LPR Adult Children',
      description:
        'F2B visa petitions for unmarried adult children (21+) of lawful permanent residents',
      icon: '👨‍👦',
      features: [
        'Adult children of permanent resident petitions',
        'Child Status Protection Act (CSPA) analysis',
        'Priority date retention strategies',
        'Long-term case management',
        'Visa bulletin tracking and updates',
        'Adjustment vs. consular processing options',
      ],
    },
    {
      title: 'F3 Visas - Married Children of Citizens',
      description: 'F3 visa petitions for married sons and daughters of US citizens',
      icon: '👰‍♀️',
      features: [
        'Married children of US citizen petitions',
        'Spouse and children derivative benefits',
        'Family unity preservation strategies',
        'Multi-generational family immigration',
        'Long waiting period management',
        'Alternative pathway exploration',
      ],
    },
    {
      title: 'F4 Visas - Siblings of Citizens',
      description: 'F4 visa petitions for brothers and sisters of US citizens',
      icon: '👫',
      features: [
        'Sibling petitions for US citizens 21+',
        'Comprehensive family documentation',
        'Birth certificate authentication',
        'Extended family immigration planning',
        'Priority date advancement tracking',
        'Derivative spouse and children benefits',
      ],
    },
    {
      title: 'Priority Date Tracking & Management',
      description:
        'Comprehensive priority date monitoring and visa bulletin analysis for all family preference categories',
      icon: '📅',
      features: [
        'Monthly visa bulletin analysis',
        'Priority date movement tracking',
        'Filing window notifications',
        'Current vs. final action date guidance',
        'Retrogression impact assessment',
        'Strategic timing recommendations',
      ],
    },
    {
      title: 'Consular Processing Assistance',
      description:
        'Complete consular processing support for family preference visa applicants abroad',
      icon: '🏛️',
      features: [
        'National Visa Center (NVC) processing',
        'DS-260 application assistance',
        'Document collection and preparation',
        'Consular interview preparation',
        'Embassy appointment scheduling',
        'Administrative processing follow-up',
      ],
    },
    {
      title: 'Child Status Protection Act (CSPA)',
      description:
        'CSPA protection analysis and age-out prevention for children in family preference cases',
      icon: '🛡️',
      features: [
        'CSPA age calculation and protection',
        'Child age-out prevention strategies',
        'Automatic conversion to appropriate category',
        'Priority date retention rights',
        'Seeking to acquire benefit timing',
        'Alternative relief options',
      ],
    },
    {
      title: 'Family Reunification Strategy',
      description:
        'Comprehensive family immigration planning to reunite extended families efficiently',
      icon: '🏠',
      features: [
        'Multi-case family immigration planning',
        'Optimal petition filing sequence',
        'Citizenship acceleration strategies',
        'Category conversion opportunities',
        'Immediate relative pathway development',
        'Long-term reunification goals',
      ],
    },
  ];

  const faqs = [
    {
      question:
        'What is the difference between immediate relatives and family preference categories?',
      answer:
        'Immediate relatives (spouses, unmarried children under 21, and parents of US citizens) have no numerical limits and shorter wait times. Family preference categories have annual limits and longer waiting periods, requiring priority date monitoring.',
    },
    {
      question: 'How long do family preference visas take to process?',
      answer:
        'Processing times vary significantly by category and country. F2A cases may take 2-3 years, while F4 cases can take 10-20+ years depending on the country of birth. We provide current wait time estimates based on visa bulletin data.',
    },
    {
      question: 'What happens if my child turns 21 while waiting for a family preference visa?',
      answer:
        'The Child Status Protection Act (CSPA) may protect your child from "aging out." We calculate CSPA age and explore protection options, including automatic conversion to appropriate categories or priority date retention.',
    },
    {
      question: 'Can I upgrade my family preference petition to immediate relative?',
      answer:
        'Yes, if circumstances change (e.g., petitioner becomes US citizen, child marries/unmarries), you may be able to upgrade to a faster category. We monitor these opportunities and advise on optimal timing.',
    },
    {
      question: 'What is a priority date and why is it important?',
      answer:
        'The priority date is when your I-130 petition was filed, determining your place in line. When your priority date becomes "current" according to the visa bulletin, you can proceed with the final visa processing steps.',
    },
    {
      question: 'Can family preference beneficiaries work in the US while waiting?',
      answer:
        'Generally no, unless they have separate work authorization or qualify for adjustment of status. However, we explore all available options for temporary relief and work authorization during the waiting period.',
    },
  ];

  const content = {
    introduction: `Family preference visas provide a pathway for US citizens and permanent residents to petition for certain family members, though with numerical limitations and waiting periods. Our family immigration attorneys have successfully reunited thousands of families through the preference system, expertly managing complex priority date issues and long-term case strategies.`,

    processTitle: 'Our Family Preference Visa Process',
    process: [
      {
        step: '1',
        title: 'Category Assessment & Strategy Development',
        description:
          'Determine the correct preference category and develop long-term immigration strategy',
      },
      {
        step: '2',
        title: 'I-130 Petition Preparation & Filing',
        description: 'Expert preparation and filing of family-based immigrant petition',
      },
      {
        step: '3',
        title: 'Priority Date Tracking & Management',
        description: 'Ongoing monitoring of priority date movement and visa bulletin updates',
      },
      {
        step: '4',
        title: 'National Visa Center Processing',
        description: 'Complete NVC processing including document collection and fee payment',
      },
      {
        step: '5',
        title: 'Final Processing & Visa Issuance',
        description: 'Consular processing or adjustment of status to obtain permanent residence',
      },
    ],

    urgencyTitle: 'Priority Date Current? Time to Act!',
    urgencyMessage:
      'When your priority date becomes current, you have a limited window to complete processing. Missing deadlines can result in losing your place in line and starting over.',

    successStats: [
      { number: '5,000+', label: 'Family Preference Cases' },
      { number: '96%', label: 'Approval Rate' },
      { number: '15+', label: 'Years Average Wait (F4)' },
      { number: '100%', label: 'Priority Date Tracking' },
    ],

    whyChooseTitle: 'Why Choose Our Family Preference Team?',
    whyChoosePoints: [
      '96% approval rate for family preference petitions',
      'Comprehensive priority date tracking and management',
      'Expert CSPA protection and age-out prevention',
      'Long-term case management throughout waiting periods',
      'Bilingual attorneys and staff for family communication',
      'Strategic family reunification planning',
      'Current with all visa bulletin and policy changes',
      'Multi-generational family immigration experience',
    ],

    preferenceCategories: {
      title: 'Family Preference Categories & Current Wait Times',
      categories: [
        {
          category: 'F1',
          title: 'Unmarried Sons & Daughters of US Citizens',
          description: 'Unmarried children 21+ of US citizens',
          currentWait: '7-8 years',
          annualLimit: '23,400',
          includes: ['Unmarried adult children', 'Their minor children (derivatives)'],
        },
        {
          category: 'F2A',
          title: 'Spouses & Minor Children of LPRs',
          description: 'Spouses and unmarried children under 21 of permanent residents',
          currentWait: '2-3 years',
          annualLimit: '87,900',
          includes: ['Spouses of LPRs', 'Unmarried children under 21'],
        },
        {
          category: 'F2B',
          title: 'Adult Children of LPRs',
          description: 'Unmarried adult children of permanent residents',
          currentWait: '5-7 years',
          annualLimit: '26,300',
          includes: ['Unmarried children 21+', 'Their minor children (derivatives)'],
        },
        {
          category: 'F3',
          title: 'Married Children of US Citizens',
          description: 'Married sons and daughters of US citizens',
          currentWait: '12-15 years',
          annualLimit: '23,400',
          includes: ['Married children', 'Their spouses', 'Their minor children'],
        },
        {
          category: 'F4',
          title: 'Siblings of US Citizens',
          description: 'Brothers and sisters of US citizens (21+)',
          currentWait: '15-22 years',
          annualLimit: '65,000',
          includes: ['Siblings', 'Their spouses', 'Their minor children'],
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="Family Preference Visas Abogados"
      subtitle="Reuniting Families Through the Preference System"
      description="Navigate complex family preference visa categories with expert legal guidance. We help families reunite through F1, F2A, F2B, F3, and F4 visa petitions with comprehensive priority date tracking and case management."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Family Preference Categories */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Family Preference Categories & Wait Times
            </h2>
            <div className="space-y-6">
              {content.preferenceCategories.categories.map((cat, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <div className="grid md:grid-cols-4 gap-4 items-center mb-4">
                    <div>
                      <div
                className="text-2xl font-bold text-primary mb-1">{cat.category}</div>
                      <div className="text-sm text-gray-400">Category</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white mb-1">{cat.currentWait}</div>
                      <div className="text-sm text-gray-400">Current Wait</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white mb-1">{cat.annualLimit}</div>
                      <div className="text-sm text-gray-400">Annual Limit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-primary font-medium">Who Qualifies</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{cat.title}</h3>
                  <p className="text-gray-300 mb-4">{cat.description}</p>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Includes:</h4>
                    <ul className="text-gray-300 text-sm">
                      {cat.includes.map((include, iIndex) => (
                        <li key={iIndex}

                className="flex items-start gap-2">
                          <span
                className="text-primary mt-1">•</span>
                          {include}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Priority Date Monitoring */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Priority Date Monitoring System
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">📅 Monthly Tracking</h3>
                <p className="text-gray-300 mb-4">We monitor every monthly visa bulletin release</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Current priority date updates</li>
                  <li>• Final action date changes</li>
                  <li>• Country-specific variations</li>
                  <li>• Retrogression alerts</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">🔔 Client Notifications</h3>
                <p className="text-gray-300 mb-4">
                  Automatic alerts when your priority date becomes current
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Email and SMS notifications</li>
                  <li>• Filing window alerts</li>
                  <li>• Document preparation reminders</li>
                  <li>• Deadline tracking</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">📊 Trend Analysis</h3>
                <p className="text-gray-300 mb-4">
                  Historical data analysis for wait time predictions
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Movement pattern analysis</li>
                  <li>• Wait time projections</li>
                  <li>• Category comparison</li>
                  <li>• Strategic timing advice</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Child Status Protection Act */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Child Status Protection Act (CSPA)
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">CSPA Protection Benefits:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Protects children from &ldquo;aging out&rdquo; at 21</li>
                    <li>• Allows age calculation reduction</li>
                    <li>• Enables automatic category conversion</li>
                    <li>• Preserves priority dates in many cases</li>
                    <li>• Provides derivative protection options</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">CSPA Age Calculation:</h3>
                  <div className="bg-white/5 rounded-lg p-4 border border-primary/10">
                    <p className="text-primary font-bold mb-2">
                      CSPA Age = Actual Age on Priority Date Current
                    </p>
                    <p className="text-primary font-bold mb-4">
                      MINUS Pending Time of I-130 Petition
                    </p>
                    <p className="text-gray-300 text-sm">
                      If CSPA age is under 21, child maintains eligibility. We calculate this
                      precisely for every case.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visa Bulletin Information */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Understanding the Visa Bulletin
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">📋 Final Action Dates</h3>
                <p className="text-gray-300 mb-4">
                  When you can receive your immigrant visa or green card
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Used for consular processing</li>
                  <li>• Final step completion</li>
                  <li>• Visa number assignment</li>
                  <li>• Green card issuance</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">📥 Dates for Filing</h3>
                <p className="text-gray-300 mb-4">
                  When you can file for adjustment of status (if eligible)
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Earlier filing opportunity</li>
                  <li>• Adjustment of status only</li>
                  <li>• Work authorization eligible</li>
                  <li>• Travel document eligible</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
