import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Fiancé K-1 Visa Abogados NC & FL | K-1/K-2/K-3 Inmigración Abogados | Vasquez Law Firm',
  description:
    'Expert fiancé K-1 visa attorneys. Complete K-1, K-2, K-3 visa assistance. Bring your foreign fiancé to the US. 95% approval rate. Marriage-based immigration. Call 1-844-YO-PELEO',
  keywords:
    'K-1 visa lawyer, fiancé visa attorney, K-2 visa lawyer, K-3 visa attorney, foreign fiancé visa, marriage immigration lawyer, I-129F petition attorney',
  openGraph: {
    title: 'Fiancé K-1 Visa Abogados | Expert K-Visa Inmigración - Vasquez Law Firm',
    description:
      'Expert fiancé K-1 visa attorneys with 95% approval rate. Complete assistance bringing your fiancé to America.',
    images: [{ url: '/images/k1-fiance-visa-lawyers.jpg' }],
  },
};

export default function FianceKVisaPage() {
  const services = [
    {
      title: 'K-1 Fiancé Visa Petitions',
      description:
        'Complete I-129F petition assistance to bring your foreign fiancé to the United States for marriage',
      icon: '💕',
      features: [
        'I-129F petition preparation and filing',
        'Relationship evidence compilation',
        'Intent to marry documentation',
        'Meeting requirement verification',
        'USCIS interview preparation',
        'Petition denial appeal assistance',
      ],
    },
    {
      title: 'K-2 Children of Fiancés',
      description: 'Visa assistance for unmarried children under 21 of K-1 fiancé visa holders',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'K-2 derivative visa applications',
        'Child eligibility verification',
        'Age-out protection strategies',
        'Family unity preservation',
        'Consular processing coordination',
        'Adjustment of status assistance',
      ],
    },
    {
      title: 'K-3 Spouse Visas',
      description:
        'Alternative visa option for spouses of US citizens waiting for immigrant visa processing',
      icon: '💑',
      features: [
        'K-3 spouse visa applications',
        'I-130 and I-129F concurrent filing',
        'Interim relief for waiting spouses',
        'Work authorization applications',
        'Travel document assistance',
        'Adjustment to permanent residence',
      ],
    },
    {
      title: 'Consular Processing Support',
      description:
        'Complete consular processing assistance for K-visa applicants at US embassies abroad',
      icon: '🏛️',
      features: [
        'Embassy interview preparation',
        'Document collection and authentication',
        'Medical examination coordination',
        'Police certificate assistance',
        'Administrative processing follow-up',
        'Visa issuance and travel planning',
      ],
    },
    {
      title: 'Adjustment of Status After Marriage',
      description: 'Convert K-1 status to permanent residence after marriage within 90 days',
      icon: '💚',
      features: [
        'I-485 adjustment applications',
        'Marriage certificate processing',
        'Joint interview preparation',
        'Work authorization (I-765)',
        'Travel documents (I-131)',
        'Removal of conditions (I-751)',
      ],
    },
    {
      title: 'Relationship Evidence Development',
      description:
        'Strategic compilation of evidence to prove genuine relationship and intent to marry',
      icon: '📸',
      features: [
        'Relationship timeline documentation',
        'Communication records organization',
        'Visit evidence compilation',
        'Financial support documentation',
        'Family and friend affidavits',
        'Cultural context explanations',
      ],
    },
    {
      title: 'Meeting Requirement Assistance',
      description: 'Help establish and document the required in-person meeting within 2 years',
      icon: '✈️',
      features: [
        'Meeting planning and documentation',
        'Travel record compilation',
        'Photo and video evidence',
        'Cultural or religious exemptions',
        'Extreme hardship waiver applications',
        'Alternative evidence strategies',
      ],
    },
    {
      title: 'K-Visa Denials & Appeals',
      description: 'Expert representation for denied K-visa petitions and appeal strategies',
      icon: '⚖️',
      features: [
        'Denial analysis and review',
        'Motion to reopen/reconsider',
        'Administrative Appeals Office (AAO)',
        'Federal court litigation',
        'Refiling strategies with new evidence',
        'Alternative immigration pathways',
      ],
    },
    {
      title: 'International Marriage Planning',
      description: 'Comprehensive immigration planning for international couples and families',
      icon: '🌍',
      features: [
        'Inmigración pathway analysis',
        'Timeline optimization strategies',
        'Multiple country coordination',
        'Family reunification planning',
        'Citizenship acceleration guidance',
        'Long-term immigration goals',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the K-1 fiancé visa process take?',
      answer:
        'The K-1 process typically takes 12-18 months total. USCIS processing of the I-129F petition takes 8-12 months, followed by consular processing which takes 2-4 months. We track all timelines and provide regular updates.',
    },
    {
      question: 'What is the meeting requirement for K-1 visas?',
      answer:
        'You must have met your fiancé in person at least once within the 2 years before filing the I-129F petition. Certain cultural or religious exemptions may apply, or extreme hardship waivers may be available in rare cases.',
    },
    {
      question: 'How long do we have to get married after K-1 visa approval?',
      answer:
        "You must marry within 90 days of your fiancé's entry to the US on the K-1 visa. This deadline cannot be extended, and failure to marry within 90 days requires your fiancé to leave the US.",
    },
    {
      question: 'Can my fiancé work while on a K-1 visa?',
      answer:
        "K-1 visa holders can apply for work authorization, but it's usually better to wait and file for adjustment of status after marriage, which includes work authorization that processes faster.",
    },
    {
      question: 'What happens if our K-1 petition is denied?',
      answer:
        'We can appeal the denial, file a motion to reopen with new evidence, or explore alternative pathways. Many denials can be overcome with proper legal representation and additional evidence.',
    },
    {
      question: 'Can we get married outside the US instead of using K-1?',
      answer:
        'Yes, you can marry abroad and file for a spouse visa (CR-1/IR-1), but this process takes longer (12-24 months) though results in immediate permanent residence. We help you choose the best option for your situation.',
    },
  ];

  const content = {
    introduction: `Bringing your foreign fiancé to the United States to marry requires navigating complex immigration procedures and strict deadlines. Our K-visa attorneys have successfully reunited thousands of couples through the K-1 fiancé visa process with a 95% approval rate, providing expert guidance from petition filing through adjustment to permanent residence.`,

    processTitle: 'Our K-1 Fiancé Visa Process',
    process: [
      {
        step: '1',
        title: 'Initial Consultation & Case Assessment',
        description: 'Evaluate eligibility, relationship evidence, and optimal timing strategy',
      },
      {
        step: '2',
        title: 'I-129F Petition Preparation & Filing',
        description: 'Expert preparation of fiancé petition with compelling evidence package',
      },
      {
        step: '3',
        title: 'USCIS Processing & Response Management',
        description: 'Monitor case progress and respond to any USCIS requests for evidence',
      },
      {
        step: '4',
        title: 'Consular Processing & Interview Prep',
        description: 'Complete embassy processing and comprehensive interview preparation',
      },
      {
        step: '5',
        title: 'Entry & Adjustment to Permanent Residence',
        description: 'Marriage planning and adjustment of status after K-1 entry',
      },
    ],

    urgencyTitle: '90-Day Marriage Deadline Approaching?',
    urgencyMessage:
      'K-1 visa holders must marry within 90 days of US entry. Missing this deadline requires leaving the US. We help couples meet all deadlines and transition to permanent residence.',

    successStats: [
      { number: '3,500+', label: 'K-Visa Couples Reunited' },
      { number: '95%', label: 'Approval Rate' },
      { number: '90', label: 'Days to Marry After Entry' },
      { number: '12-18', label: 'Months Total Process' },
    ],

    whyChooseTitle: 'Why Choose Our K-Visa Team?',
    whyChoosePoints: [
      '95% approval rate for K-1 fiancé visa petitions',
      'Expert relationship evidence development and presentation',
      'Comprehensive consular processing support worldwide',
      'Proven strategies for complex cases and denials',
      'Bilingual attorneys for international couples',
      'Complete adjustment of status assistance after marriage',
      'Cultural sensitivity and international experience',
      'Fast-track processing for urgent cases',
    ],

    kVisaTypes: {
      title: 'Types of K-Visas',
      types: [
        {
          visa: 'K-1',
          title: 'Fiancé Visa',
          description: 'For foreign fiancés of US citizens to enter the US for marriage',
          requirements: [
            'Engaged to US citizen',
            'Met in person within 2 years',
            'Intent to marry within 90 days',
            'Both legally free to marry',
          ],
          duration: '90 days to marry',
          workAuth: 'Available with separate application',
        },
        {
          visa: 'K-2',
          title: "Fiancé's Children",
          description: 'For unmarried children under 21 of K-1 visa holders',
          requirements: [
            'Child of K-1 beneficiary',
            'Unmarried and under 21',
            'Named on original I-129F',
            'Eligible for derivative status',
          ],
          duration: 'Same as K-1 parent',
          workAuth: 'Available with separate application',
        },
        {
          visa: 'K-3',
          title: 'Spouse Visa',
          description: 'For spouses of US citizens waiting for immigrant visa processing',
          requirements: [
            'Married to US citizen',
            'I-130 petition filed',
            'Temporary relief needed',
            'Immigrant visa processing pending',
          ],
          duration: '2 years (renewable)',
          workAuth: 'Included with K-3 status',
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="Fiancé K-1 Visa Abogados"
      subtitle="Bringing Your Love to America"
      description="Reunite with your foreign fiancé through expert K-1 visa assistance. Our immigration attorneys have a 95% approval rate helping couples navigate the complex fiancé visa process from petition to permanent residence."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* K-Visa Types */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Types of K-Visas</h2>
            <div className="space-y-6">
              {content.kVisaTypes.types.map((visa, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                className="text-2xl font-bold text-primary">{visa.visa}</div>
                        <h3 className="text-xl font-bold text-white">{visa.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-4">{visa.description}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-white">Duration: </span>
                          <span className="text-primary text-sm">{visa.duration}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white">
                            Work Authorization:{' '}
                          </span>
                          <span className="text-primary text-sm">{visa.workAuth}</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-white mb-3">Requirements:</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {visa.requirements.map((req, rIndex) => (
                          <div
                            key={rIndex}

                className="text-sm text-gray-400 flex items-start gap-2"
                          >
                            <span
                className="text-primary mt-1">•</span>
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Meeting Requirement */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">K-1 Meeting Requirement</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Meeting Documentation:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Passport stamps showing travel dates</li>
                    <li>• Flight tickets and boarding passes</li>
                    <li>• Hotel receipts and accommodation records</li>
                    <li>• Photos together with date stamps</li>
                    <li>• Videos of your time together</li>
                    <li>• Witness affidavits from people you met</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Exemptions & Waivers:</h3>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-primary/10">
                      <h4 className="font-bold text-primary mb-2">Cultural/Religious Exemption</h4>
                      <p className="text-gray-300 text-sm">
                        When meeting would violate strict cultural or religious customs
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-primary/10">
                      <h4 className="font-bold text-primary mb-2">Extreme Hardship Waiver</h4>
                      <p className="text-gray-300 text-sm">
                        When meeting would result in extreme hardship to the US citizen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* K-1 Timeline */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">K-1 Fiancé Visa Timeline</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">1-2</div>
                  <div className="text-sm text-gray-300">Months to prepare I-129F petition</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">8-12</div>
                  <div className="text-sm text-gray-300">Months USCIS processing time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2-4</div>
                  <div className="text-sm text-gray-300">Months consular processing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">90</div>
                  <div className="text-sm text-gray-300">Days to marry after US entry</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">8-12</div>
                  <div className="text-sm text-gray-300">Months to get green card</div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Challenges */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Common K-1 Visa Challenges</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  🚫 Relationship Authenticity
                </h3>
                <p className="text-gray-300 mb-4">
                  USCIS scrutinizes relationships for genuineness
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Age differences</li>
                  <li>• Quick engagements</li>
                  <li>• Language barriers</li>
                  <li>• Previous visa denials</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">📋 Documentation Issues</h3>
                <p className="text-gray-300 mb-4">Complex documentation requirements</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Foreign document translation</li>
                  <li>• Meeting requirement proof</li>
                  <li>• Financial support evidence</li>
                  <li>• Criminal background checks</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">⏰ Timing Pressures</h3>
                <p className="text-gray-300 mb-4">Strict deadlines throughout the process</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• 90-day marriage deadline</li>
                  <li>• Medical exam validity</li>
                  <li>• Document expiration dates</li>
                  <li>• Consular appointment scheduling</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
