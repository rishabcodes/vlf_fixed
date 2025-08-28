import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title:
    'DACA Abogados NC & FL | Deferred Action Childhood Arrivals | Expert Dreamer Protection | Vasquez Law Firm',
  description:
    'Expert DACA attorneys for Dreamers. Initial applications, renewals, work permits, travel authorization. 98% approval rate. Time-sensitive deadlines. Call 1-844-YO-PELEO',
  keywords:
    'DACA lawyer, Deferred Action Childhood Arrivals, Dreamer attorney, DACA renewal, work permit, advance parole, immigration lawyer for dreamers, DACA application help',
  openGraph: {
    title: 'DACA Abogados | Expert Protection for Dreamers - Vasquez Law Firm',
    description:
      'Expert DACA attorneys with 98% approval rate. Complete assistance for Dreamers with applications, renewals, and work permits.',
    images: [{ url: '/images/daca-lawyers-dreamers.jpg' }],
  },
};

export default function DacaPage() {
  const services = [
    {
      title: 'Initial DACA Applications',
      description:
        'Complete assistance with first-time DACA applications and work authorization for eligible Dreamers',
      icon: '📝',
      features: [
        'Comprehensive eligibility assessment',
        'Form I-821D preparation and filing',
        'Supporting document gathering',
        'Personal statement development',
        'Evidence organization and presentation',
        'USCIS fee guidance and assistance',
      ],
    },
    {
      title: 'DACA Renewals (Critical Timing)',
      description:
        'Time-sensitive renewal applications to maintain protection and work authorization - deadlines are strict',
      icon: '🔄',
      features: [
        'Renewal timeline management (120-150 days before expiration)',
        'Updated documentation gathering',
        'Continuous residence verification',
        'Employment history documentation',
        'Travel record compilation',
        'Emergency late renewal assistance',
      ],
    },
    {
      title: 'Work Authorization (EAD)',
      description:
        'Employment Authorization Document applications and renewals for DACA recipients',
      icon: '💼',
      features: [
        'Form I-765 preparation and filing',
        'Employment documentation assistance',
        'Social Security number coordination',
        'Driver license eligibility guidance',
        'Professional licensing support',
        'Employer verification assistance',
      ],
    },
    {
      title: 'Advance Parole Travel Authorization',
      description:
        'Critical travel authorization for emergencies - traveling without approval terminates DACA',
      icon: '✈️',
      features: [
        'Form I-131 advance parole applications',
        'Emergency travel justification',
        'Educational travel authorization',
        'Employment-related travel permits',
        'Humanitarian travel documentation',
        'Re-entry procedure guidance',
      ],
    },
    {
      title: 'DACA Eligibility Assessment',
      description:
        'Comprehensive evaluation of DACA eligibility requirements and potential obstacles',
      icon: '🔍',
      features: [
        'Age requirement verification',
        'Arrival date documentation',
        'Continuous presence analysis',
        'Education/military service review',
        'Criminal background assessment',
        'Timeline reconstruction assistance',
      ],
    },
    {
      title: 'Family Derivative Benefits',
      description:
        "Guidance on benefits and protections available to DACA recipients' family members",
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Spouse work authorization options',
        'Children protection strategies',
        'Family unity planning',
        'Future petition preparation',
        'Adjustment of status pathways',
        'Family emergency protocols',
      ],
    },
    {
      title: 'DACA Termination Defense',
      description: 'Defense against DACA termination proceedings and protection of status',
      icon: '🛡️',
      features: [
        'Notice to Appear (NTA) defense',
        'Criminal charge mitigation',
        'Fraud allegation defense',
        'Administrative error corrections',
        'Due process protection',
        'Appeal and litigation support',
      ],
    },
    {
      title: 'Future Inmigración Planning',
      description:
        'Strategic planning for permanent residence and citizenship pathways for DACA recipients',
      icon: '🌟',
      features: [
        'Marriage-based petition guidance',
        'Employment-based options analysis',
        'Registry eligibility assessment',
        'Cancellation of removal preparation',
        'Asylum claim evaluation',
        'Long-term immigration strategy',
      ],
    },
    {
      title: 'DACA Litigation Support',
      description: 'Legal representation in DACA-related litigation and policy challenges',
      icon: '⚖️',
      features: [
        'Class action litigation participation',
        'Individual case appeals',
        'Federal court representation',
        'Injunction protection advocacy',
        'Policy change navigation',
        'Constitutional challenge support',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the current DACA eligibility requirements?',
      answer:
        'You must: be under 31 as of June 15, 2012; have arrived before age 16 and before June 15, 2007; continuously resided in the US since June 15, 2007; be in school, graduated, have a GED, or be an honorably discharged veteran; pass background checks.',
    },
    {
      question: 'How long does DACA protection last and when should I renew?',
      answer:
        'DACA protection lasts 2 years. You should file renewal applications 120-150 days before expiration. Missing the deadline means losing work authorization and deportation protection. We track all client deadlines automatically.',
    },
    {
      question: 'Can I travel outside the US with DACA status?',
      answer:
        'NEVER travel without advance parole approval - it automatically terminates your DACA. With advance parole, you can travel for educational, employment, or humanitarian reasons. We handle all advance parole applications.',
    },
    {
      question: 'What happens if my DACA application is denied?',
      answer:
        'Denials can often be appealed or refiled with additional evidence. Common denial reasons include incomplete applications, criminal issues, or timeline problems. We have extensive experience overturning DACA denials.',
    },
    {
      question: 'Can DACA recipients get green cards or become citizens?',
      answer:
        "DACA doesn't directly lead to permanent residence, but recipients may qualify through marriage to US citizens, certain employment categories, asylum, or other relief. We help plan long-term immigration strategies.",
    },
    {
      question: 'What if I have a criminal record - can I still get DACA?',
      answer:
        "Minor traffic violations usually don't disqualify you, but felonies and significant misdemeanors do. We carefully analyze criminal history and can often find solutions or waivers for borderline cases.",
    },
  ];

  const content = {
    introduction: `As a DACA recipient (Dreamer), you have protection from deportation and work authorization, but these benefits are time-sensitive and require careful legal management. Our DACA attorneys have helped thousands of Dreamers navigate initial applications, renewals, and complex immigration challenges with a 98% approval rate.`,

    processTitle: 'Our DACA Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Assessment & Documentation',
        description:
          'Comprehensive review of DACA requirements and gathering of supporting evidence',
      },
      {
        step: '2',
        title: 'Application Preparation & Filing',
        description: 'Expert preparation of I-821D forms with complete documentation package',
      },
      {
        step: '3',
        title: 'Biometrics & Background Check',
        description: 'Guidance through USCIS biometrics appointment and background check process',
      },
      {
        step: '4',
        title: 'Decision & Work Authorization',
        description: 'Processing of approval and immediate work authorization assistance',
      },
      {
        step: '5',
        title: 'Renewal Management & Future Planning',
        description: 'Ongoing renewal tracking and long-term immigration strategy development',
      },
    ],

    urgencyTitle: 'DACA Renewal Deadline Approaching?',
    urgencyMessage:
      "DACA renewals must be filed 120-150 days before expiration. Missing deadlines means losing work authorization and deportation protection. Don't wait - contact us immediately.",

    successStats: [
      { number: '8,000+', label: 'DACA Cases Approved' },
      { number: '98%', label: 'Approval Rate' },
      { number: '2', label: 'Years Protection Period' },
      { number: '150', label: 'Days Before Expiration to Renew' },
    ],

    whyChooseTitle: 'Why Choose Our DACA Team?',
    whyChoosePoints: [
      '98% approval rate for DACA applications and renewals',
      'Automatic deadline tracking for all renewals',
      'Former USCIS officers who processed DACA cases',
      'Bilingual attorneys fluent in Spanish',
      'Emergency late renewal assistance available',
      'Complete work authorization support',
      'Advance parole travel authorization expertise',
      'Long-term immigration planning for permanent residence',
    ],

    dacaRequirements: {
      title: 'DACA Eligibility Requirements',
      requirements: [
        {
          title: 'Age Requirement',
          description: 'Must have been under 31 years old as of June 15, 2012',
          details: [
            'Born on or after June 16, 1981',
            'At least 15 years old when applying (with exceptions)',
            'Age calculated as of June 15, 2012',
          ],
        },
        {
          title: 'Arrival & Residence',
          description: 'Came to US before 16th birthday and before June 15, 2007',
          details: [
            'Entered US before June 15, 2007',
            'Arrived before 16th birthday',
            'Continuously resided since June 15, 2007',
          ],
        },
        {
          title: 'Education/Military Service',
          description: 'Currently in school, graduated, have GED, or honorably discharged veteran',
          details: [
            'High school diploma or GED',
            'Currently enrolled in school',
            'Honorably discharged from military',
            'Working toward educational credential',
          ],
        },
        {
          title: 'Criminal Background',
          description: 'Must pass background check with no serious criminal history',
          details: [
            'No felony convictions',
            'No significant misdemeanors',
            'No more than 3 misdemeanors',
            'No threat to national security',
          ],
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="DACA Abogados - Protection for Dreamers"
      subtitle="Expert Legal Support for Deferred Action Recipients"
      description="Protect your future as a Dreamer. Our DACA attorneys provide comprehensive assistance with initial applications, renewals, work permits, and long-term immigration planning. 98% approval rate with automatic deadline tracking."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Renewal Deadline Alert */}
          <section className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
              ⏰ CRITICAL DACA RENEWAL DEADLINE ALERT
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Renewal Timeline:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• File renewal 120-150 days BEFORE expiration</li>
                  <li>• NEVER let DACA expire - you lose work authorization</li>
                  <li>• Late renewals may be rejected by USCIS</li>
                  <li>• Expired DACA = vulnerability to deportation</li>
                  <li>• We track all client deadlines automatically</li>
                </ul>
              </div>
              <div className="bg-yellow-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Emergency DACA Help</h3>
                <p className="text-white mb-4">
                  <strong>Renewal deadline approaching?</strong>
                  <br />
                  Call our DACA emergency line:
                </p>
                <a href="tel:1-844-967-3536" className="text-2xl font-bold text-yellow-400">
                  1-844-YO-PELEO
                </a>
                <p className="text-gray-300 text-sm mt-2">
                  Same-day consultations for urgent renewals
                </p>
              </div>
            </div>
          </section>

          {/* DACA Requirements */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">DACA Eligibility Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.dacaRequirements.requirements.map((req, index) => (
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

          {/* DACA Benefits */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">DACA Benefits & Protection</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">🛡️ Deportation Protection</h3>
                <p className="text-gray-300 mb-4">
                  Protection from removal proceedings for 2 years
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Deferred action from deportation</li>
                  <li>• Relief from immigration enforcement</li>
                  <li>• Renewable every 2 years</li>
                  <li>• No path to permanent residence</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">💼 Work Authorization</h3>
                <p className="text-gray-300 mb-4">
                  Legal employment authorization in the United States
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Employment Authorization Document (EAD)</li>
                  <li>• Social Security number eligibility</li>
                  <li>• Driver license in most states</li>
                  <li>• Professional licensing opportunities</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">✈️ Travel Authorization</h3>
                <p className="text-gray-300 mb-4">Limited travel abroad with advance parole</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Educational travel authorization</li>
                  <li>• Employment-related travel</li>
                  <li>• Humanitarian emergencies</li>
                  <li>• Must obtain advance parole first</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Renewal Timeline */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">DACA Renewal Timeline</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">150</div>
                  <div className="text-sm text-gray-300">
                    Days before expiration - start renewal process
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">120</div>
                  <div className="text-sm text-gray-300">
                    Days before expiration - latest recommended filing
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4-6</div>
                  <div className="text-sm text-gray-300">Months average processing time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2</div>
                  <div className="text-sm text-gray-300">Years of renewed protection</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
