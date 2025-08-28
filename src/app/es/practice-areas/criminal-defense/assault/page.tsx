import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Assault Charges Abogado NC | Battery Defense Abogado | Vasquez Law Firm',
  description:
    'Facing assault charges in NC? Experienced criminal defense for simple assault, aggravated assault, domestic violence. Protect your freedom and record. Free consultation.',
  keywords:
    'assault lawyer NC, battery attorney North Carolina, simple assault defense Raleigh, aggravated assault lawyer Charlotte, domestic violence attorney Durham, assault and battery defense, felony assault lawyer NC',
  openGraph: {
    title: 'Assault & Battery Defense Abogado NC | Protect Your Freedom',
    description:
      'Charged with assault? Expert defense attorneys for all assault charges in NC. From simple assault to aggravated felonies.',
    url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/assault',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/assault-defense-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Assault Defense Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assault & Battery Defense Abogado NC | Protect Your Freedom',
    description: 'Charged with assault? Expert defense attorneys for all assault charges in NC.',
    images: ['/images/practice-areas/assault-defense-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/assault',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/assault',
      'es-ES': 'https://www.vasquezlawfirm.com/es/areas-de-practica/defensa-criminal/asalto',
    },
  },
};

export default function AssaultPage() {
  const services = [
    {
      title: 'Simple Assault',
      description:
        'Misdemeanor assault charges can still result in jail time and a criminal record. We fight for dismissals and alternatives.',
      features: [
        'Bar fight defense',
        'Road rage incidents',
        'Mutual combat cases',
        'Self-defense claims',
        'No-contact violations',
        'Anger management alternatives',
      ],
    },
    {
      title: 'Aggravated Assault',
      description:
        'Felony assault charges mean prison time. We challenge evidence and negotiate to reduce charges and sentences.',
      features: [
        'Assault with deadly weapon',
        'Serious bodily injury cases',
        'Assault on government officials',
        'School personnel assault',
        'Healthcare worker assault',
        'Strangulation charges',
      ],
    },
    {
      title: 'Domestic Violence',
      description:
        'Domestic assault charges carry unique consequences. We protect your rights while navigating complex family dynamics.',
      features: [
        'Protective order defense',
        'False allegation cases',
        'Child custody impacts',
        'Gun rights protection',
        'Pretrial release advocacy',
        'Counseling alternatives',
      ],
    },
    {
      title: 'Self-Defense Cases',
      description:
        'You have the right to defend yourself. We prove your actions were justified and lawful.',
      features: [
        'Stand your ground defense',
        'Castle doctrine protection',
        'Proportional force analysis',
        'Witness testimony',
        'Video evidence review',
        'Expert testimony',
      ],
    },
    {
      title: 'Assault on a Female',
      description:
        'This specific NC charge carries enhanced penalties. We provide aggressive defense against these serious allegations.',
      features: [
        'Evidence challenges',
        'Witness credibility',
        'False accusation defense',
        'Plea negotiation',
        'Trial preparation',
        'Sentencing mitigation',
      ],
    },
    {
      title: 'Juvenile Assault',
      description:
        'Young people make mistakes. We work to protect their futures through juvenile court alternatives.',
      features: [
        'School discipline defense',
        'Diversion programs',
        'Teen court options',
        'Record sealing',
        'Family counseling',
        'Education continuation',
      ],
    },
  ];

  const faqs = [
    {
      question: "What's the difference between assault and battery in NC?",
      answer:
        'North Carolina combines assault and battery into one offense. Assault includes both attempting to cause harm (traditional assault) and actually causing harm (traditional battery).',
    },
    {
      question: 'Can assault charges be dropped?',
      answer:
        'Yes, but in NC, victims cannot directly drop charges - only the prosecutor can. We work with prosecutors to highlight weaknesses, self-defense claims, or alternative resolutions.',
    },
    {
      question: 'What is "assault on a female" in NC?',
      answer:
        "A specific charge when a male 18+ assaults a female. It's always a Class A1 misdemeanor with enhanced penalties, even for minor contact. We challenge these aggressively.",
    },
    {
      question: 'Will I go to jail for simple assault?',
      answer:
        'Simple assault can result in up to 60 days jail, but first offenders often receive probation. We fight for alternatives like anger management or community service.',
    },
    {
      question: 'How does assault affect gun rights?',
      answer:
        'Any assault conviction can impact gun rights, especially domestic violence convictions which trigger federal lifetime bans. We fight to protect your Second Amendment rights.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina Assault Defense Abogados"
        subtitle="Protecting Your Freedom, Record & Reputation"
        description="Assault charges can derail your life with jail time, criminal records, and lasting consequences. Our experienced defense attorneys fight to protect your rights and future."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Assault Charge Levels */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                North Carolina Assault Charge Classifications
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Class 2 Misdemeanor - Simple Assault
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <strong>Examples:</strong> Minor physical contact, threats, attempted battery
                    </div>
                    <div>
                      <strong>Penalty:</strong> Up to 60 days jail, $1,000 fine
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Class A1 Misdemeanor - Assault on Female/Child
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <strong>Examples:</strong> Male assaulting female, assault on child under 12
                    </div>
                    <div>
                      <strong>Penalty:</strong> Up to 150 days jail, discretionary fine
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-3">
                    Felony Assault - Serious Cases
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <strong>Examples:</strong> Deadly weapon, serious injury, strangulation
                    </div>
                    <div>
                      <strong>Penalty:</strong> 3-231 months prison depending on class
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Defense Strategies */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Common Assault Defense Strategies
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Legal Defenses</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Self-defense/defense of others</li>
                    <li>• Mutual combat consent</li>
                    <li>• False accusations</li>
                    <li>• Mistaken identity</li>
                    <li>• Lack of intent</li>
                    <li>• Constitutional violations</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Evidence Challenges</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Witness credibility issues</li>
                    <li>• Conflicting statements</li>
                    <li>• Video evidence analysis</li>
                    <li>• Medical record disputes</li>
                    <li>• Police procedure errors</li>
                    <li>• Insufficient evidence</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Self-Defense Law */}
            <section className="bg-green-900/20 border border-green-500/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                North Carolina Self-Defense Laws
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-green-400">Stand Your Ground:</strong> No duty to retreat
                  before using force if you reasonably believe it necessary to defend yourself.
                </p>
                <p>
                  <strong className="text-green-400">Castle Doctrine:</strong> Enhanced right to use
                  force, including deadly force, to protect your home, vehicle, or workplace.
                </p>
                <p>
                  <strong className="text-green-400">Proportional Force:</strong> Force used must be
                  reasonable and proportional to the threat faced.
                </p>
              </div>
            </section>

            {/* Consequences Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Consequences Beyond Criminal Penalties
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Employment Impact</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Background check failures</li>
                    <li>• Professional license loss</li>
                    <li>• Security clearance denial</li>
                    <li>• Career limitations</li>
                    <li>• Termination risk</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Personal Rights</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Gun ownership ban</li>
                    <li>• Voting restrictions</li>
                    <li>• Inmigración issues</li>
                    <li>• Child custody impact</li>
                    <li>• Housing discrimination</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Financial Costs</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Court fines & fees</li>
                    <li>• Restitution payments</li>
                    <li>• Lost wages</li>
                    <li>• Abogado fees</li>
                    <li>• Increased insurance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Protective Orders Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Protective Orders & No-Contact Orders
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <p className="text-gray-300 mb-4">
                  Assault charges often come with protective orders that can force you from your
                  home and prohibit contact with family.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      Restrictions May Include:
                    </h3>
                    <ul className="space-y-1 text-gray-300">
                      <li>• No contact with alleged victim</li>
                      <li>• Stay away from home/work</li>
                      <li>• No firearms possession</li>
                      <li>• Limited child contact</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">We Help By:</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Modifying order terms</li>
                      <li>• Arranging property retrieval</li>
                      <li>• Establishing child visitation</li>
                      <li>• Fighting false allegations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="assault-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Assault & Battery Defense Services - Vasquez Law Firm',
            description:
              'Experienced assault and battery defense attorneys in North Carolina. We handle all assault charges from simple assault to aggravated felonies.',
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Defensa Criminal - Assault & Battery',
          }),
        }}
      />
    </>
  );
}
