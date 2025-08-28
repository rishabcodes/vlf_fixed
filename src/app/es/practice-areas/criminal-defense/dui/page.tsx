import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'DUI Abogado NC | DWI Abogado | License & Freedom Defense | Vasquez Law Firm',
  description:
    'Arrested for DUI/DWI in NC? Experienced drunk driving defense attorneys. Protect your license, avoid jail, minimize penalties. Available 24/7. Free consultation.',
  keywords:
    'DUI lawyer NC, DWI attorney North Carolina, drunk driving defense Raleigh, DUI defense Charlotte, license restoration lawyer, breathalyzer defense attorney, field sobriety test lawyer, first offense DUI NC',
  openGraph: {
    title: 'DUI/DWI Defense Abogado NC | Protect Your License & Freedom',
    description:
      'Arrested for DUI in NC? Expert DWI defense attorneys fight to protect your license and freedom. Available 24/7.',
    url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/dui',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/dui-defense-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'DUI/DWI Defense Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DUI/DWI Defense Abogado NC | Protect Your License & Freedom',
    description:
      'Arrested for DUI in NC? Expert DWI defense attorneys fight to protect your license and freedom.',
    images: ['/images/practice-areas/dui-defense-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/dui',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/dui',
      'es-ES': 'https://www.vasquezlawfirm.com/es/areas-de-practica/defensa-criminal/dui',
    },
  },
};

export default function DUIPage() {
  const services = [
    {
      title: 'First Offense DUI/DWI',
      description:
        'Even first-time offenses carry serious consequences. We fight to minimize penalties and protect your record.',
      features: [
        'License protection strategies',
        'Jail time avoidance',
        'Limited driving privileges',
        'Substance assessment coordination',
        'Insurance impact minimization',
        'Record protection',
      ],
    },
    {
      title: 'Multiple DUI Offenses',
      description:
        'Repeat offenses mean harsher penalties. Our aggressive defense strategies protect you from maximum consequences.',
      features: [
        'Felony DWI defense',
        'Habitual offender cases',
        'Mandatory minimum challenges',
        'Alternative sentencing options',
        'Ignition interlock advocacy',
        'License restoration',
      ],
    },
    {
      title: 'Breathalyzer & Blood Test Defense',
      description:
        'We challenge the science behind your arrest, from equipment calibration to testing procedures.',
      features: [
        'Breathalyzer accuracy challenges',
        'Blood test chain of custody',
        'Rising BAC defense',
        'Medical condition defenses',
        'Equipment maintenance records',
        'Officer certification issues',
      ],
    },
    {
      title: 'Field Sobriety Test Challenges',
      description:
        'These subjective tests are often unreliable. We expose flaws in administration and interpretation.',
      features: [
        'HGN test challenges',
        'Walk-and-turn errors',
        'One-leg stand issues',
        'Medical condition impacts',
        'Environmental factors',
        'Video evidence review',
      ],
    },
    {
      title: 'License Restoration',
      description:
        'Lost your license? We navigate DMV hearings and fight for limited driving privileges.',
      features: [
        'DMV hearing representation',
        'Limited privilege petitions',
        'Work/school driving rights',
        'Ignition interlock compliance',
        'License reinstatement',
        'Insurance requirement help',
      ],
    },
    {
      title: 'Underage DUI Defense',
      description:
        "Zero tolerance means zero room for error. We protect young drivers' futures from one mistake.",
      features: [
        'University disciplinary defense',
        'License saving strategies',
        'Education program alternatives',
        'Record sealing options',
        'Parent communication',
        'Future protection focus',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Will I lose my license after a DUI arrest?',
      answer:
        'You have only 10 days to request a DMV hearing to fight license suspension. We can help you obtain limited driving privileges for work, school, and household duties while your case is pending.',
    },
    {
      question: 'Can I refuse a breathalyzer test in NC?',
      answer:
        'You can refuse roadside tests, but refusing the official breathalyzer after arrest triggers automatic license revocation for one year. However, refusal may limit evidence against you.',
    },
    {
      question: 'What are the penalties for first-offense DUI in NC?',
      answer:
        'Penalties range from Level 5 (minimum 24 hours jail, $200 fine) to Level 1 (30 days to 2 years jail, $4,000 fine). Factors include BAC level, accidents, and prior record.',
    },
    {
      question: 'How much does a DUI lawyer cost?',
      answer:
        'Our fees depend on case complexity, but consider this: a DUI conviction costs $10,000+ in fines, insurance increases, and lost wages. Our defense is an investment in your future.',
    },
    {
      question: 'Can a DUI be dismissed or reduced?',
      answer:
        'Yes. We often negotiate reductions to reckless driving or get cases dismissed based on illegal stops, faulty tests, or procedural errors. Every case has potential defenses.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina DUI/DWI Defense Abogados"
        subtitle="Protecting Your License, Freedom & Future Since 1993"
        description="A DUI arrest doesn't have to ruin your life. Our experienced defense attorneys know how to challenge evidence, protect your license, and minimize consequences. Available 24/7 for emergencies."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Urgency Banner */}
            <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-red-400 mb-4">
                ⚠️ TIME IS CRITICAL - ACT NOW!
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                You have only 10 days from arrest to request a DMV hearing to save your license!
              </p>
              <p className="text-xl font-bold text-primary">
                Call Now: 1-844-YO-PELEO (1-844-967-3536)
              </p>
            </section>

            {/* DUI Penalties Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                North Carolina DUI Sentencing Levels
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Level 5 (Least Serious)</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <strong>Jail:</strong> 24 hours - 60 days
                      <br />
                      <strong>Fine:</strong> Up to $200
                    </div>
                    <div>
                      <strong>License:</strong> 1 year revocation
                      <br />
                      <strong>Assessment:</strong> Required
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Level 1 (Most Serious)</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <strong>Jail:</strong> 30 days - 24 months
                      <br />
                      <strong>Fine:</strong> Up to $4,000
                    </div>
                    <div>
                      <strong>License:</strong> Permanent revocation possible
                      <br />
                      <strong>Vehicle:</strong> May be seized
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Defense Strategies Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">How We Defend Your DUI Case</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-primary text-2xl font-bold mr-4">1.</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Challenge the Stop</h3>
                      <p className="text-gray-300">
                        Police need reasonable suspicion. We scrutinize dashcam footage to find
                        illegal stops.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary text-2xl font-bold mr-4">2.</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Attack the Evidence</h3>
                      <p className="text-gray-300">
                        Breathalyzers malfunction. Blood tests get contaminated. We find the flaws.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary text-2xl font-bold mr-4">3.</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Question Field Tests</h3>
                      <p className="text-gray-300">
                        Medical conditions, injuries, and nerves affect performance. We provide
                        context.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-primary text-2xl font-bold mr-4">4.</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Negotiate Reductions</h3>
                      <p className="text-gray-300">
                        Prosecutors want convictions. We leverage weaknesses for better plea deals.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary text-2xl font-bold mr-4">5.</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Trial Preparation</h3>
                      <p className="text-gray-300">
                        When negotiations fail, we\'re ready. Juries appreciate reasonable doubt.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary text-2xl font-bold mr-4">6.</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Protect Your Future</h3>
                      <p className="text-gray-300">
                        Beyond court, we help with DMV, employment, and getting your life back.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Consequences Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Hidden Costs of DUI Conviction
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Financial Impact</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• $10,000+ total costs</li>
                    <li>• 400% insurance increase</li>
                    <li>• Lost wages from jail</li>
                    <li>• Abogado fees</li>
                    <li>• Court costs & fines</li>
                    <li>• Ignition interlock fees</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Personal Impact</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Criminal record</li>
                    <li>• Job loss risk</li>
                    <li>• Professional license issues</li>
                    <li>• Inmigración consequences</li>
                    <li>• Security clearance loss</li>
                    <li>• Social stigma</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Driving Impact</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• License revocation</li>
                    <li>• Limited privileges only</li>
                    <li>• Ignition interlock device</li>
                    <li>• SR-22 insurance</li>
                    <li>• DMV hearings</li>
                    <li>• Reinstatement fees</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="dui-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'DUI/DWI Defense Services - Vasquez Law Firm',
            description:
              'Experienced DUI and DWI defense attorneys in North Carolina. We protect your license, freedom, and future.',
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Defensa Criminal - DUI/DWI',
          }),
        }}
      />
    </>
  );
}
