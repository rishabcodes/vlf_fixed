import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { HowToSchema } from '@/components/SEO/HowToSchema';
import Link from 'next/link';
// Lucide icons removed - using emoji icons instead
import { BondHearingsClient } from './BondHearingsClient';

export const metadata: Metadata = {
  title: 'Immigration Bond Hearings NC | Get Released from ICE Detention FAST',
  description:
    "Locked up by ICE? NC's most aggressive bond attorneys fight for your IMMEDIATE release. We win bonds others say are impossible. Available 24/7. Former ICE officers on YOUR side. Call 1-844-YO-PELEO NOW!",
  keywords:
    'immigration bond hearing attorney NC, ICE detention lawyer, bond motion attorney, immigration bond reduction, emergency bond hearing, detention release lawyer, ICE custody attorney, immigration bail bonds, bond redetermination NC, habeas corpus immigration',
  openGraph: {
    title: 'Immigration Bond Hearings NC | Get Released from ICE Detention FAST',
    description:
      "Locked up by ICE? NC's most aggressive bond attorneys fight for your IMMEDIATE release. We win bonds others say are impossible. Available 24/7. Former ICE officers on YOUR side.",
    url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/bond-hearings',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/bond-hearings-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Immigration Bond Hearing Services - Get Released Fast',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immigration Bond Hearings NC | Get Released from ICE Detention FAST',
    description:
      "Locked up by ICE? NC's most aggressive bond attorneys fight for your IMMEDIATE release. We win bonds others say are impossible. Available 24/7.",
    images: ['/images/practice-areas/bond-hearings-hero.jpg'],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/bond-hearings',
    languages: {
      'en-US':
        'https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/bond-hearings',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/inmigracion/defensa-de-remocion/audiencias-de-fianza',
    },
  },
};

export default function BondHearingsPage() {
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'bond-hearings',
    service: 'immigration',
  };

  const services = [
    {
      title: 'Emergency Bond Motions',
      description:
        'We file emergency motions within HOURS of your call. Our rapid response team knows every trick to get judges to grant bonds quickly. Your freedom is our mission.',
      features: [
        'Same-day filing capabilities',
        'Emergency judge access',
        'Weekend and holiday filings',
        'Expedited hearing requests',
        'Immediate family notifications',
        'Detention facility coordination',
      ],
      icon: '⏰',
    },
    {
      title: 'Bond Redetermination Hearings',
      description:
        'Denied bond or set too high? We fight for reconsideration with new evidence and aggressive arguments that force judges to release you at affordable amounts.',
      features: [
        'Changed circumstances arguments',
        'New evidence presentation',
        'Community ties documentation',
        'Flight risk mitigation',
        'Danger assessment challenges',
        'Bond reduction strategies',
      ],
      icon: '⚖️',
    },
    {
      title: 'Habeas Corpus Petitions',
      description:
        'When immigration courts fail, we take it federal. Our habeas corpus petitions challenge illegal detention and force the government to justify keeping you locked up.',
      features: [
        'Federal court filings',
        'Constitutional challenges',
        'Prolonged detention claims',
        'Due process violations',
        'Mandatory detention challenges',
        'Emergency federal relief',
      ],
      icon: '🛡️',
    },
    {
      title: 'Parole & Humanitarian Release',
      description:
        "Medical issues? Family emergencies? We secure humanitarian parole and other release options when traditional bonds aren't available.",
      features: [
        'Medical parole applications',
        'Humanitarian parole requests',
        'Family unity arguments',
        'Alternatives to detention',
        'Electronic monitoring advocacy',
        'Supervised release programs',
      ],
      icon: '🏠',
    },
    {
      title: 'Bond Payment Assistance',
      description:
        'We help families navigate the complex bond payment process and connect you with bond companies to ensure quick release once bond is granted.',
      features: [
        'Bond company referrals',
        'Payment plan arrangements',
        'Property bond guidance',
        'Cash bond processing',
        'Bond condition compliance',
        'Post-release check-ins',
      ],
      icon: '💵',
    },
    {
      title: 'Detention Appeals',
      description:
        "Fighting mandatory detention or special circumstances? Our appellate team challenges detention decisions at every level until you're free.",
      features: [
        'BIA bond appeals',
        'Circuit court challenges',
        'Detention review petitions',
        'Joseph hearing requests',
        'Matter of Adeniji arguments',
        'Statutory interpretation fights',
      ],
      icon: '📄',
    },
  ];

  const faqs = [
    {
      question: 'How quickly can you get me a bond hearing?',
      answer:
        'We can file for a bond hearing within HOURS of your call. Emergency hearings can often be scheduled within 1-3 days. Our 24/7 team starts working immediately to secure your release.',
    },
    {
      question: 'What if the judge already denied my bond?',
      answer:
        'We can file for bond redetermination based on changed circumstances, new evidence, or legal errors. Many clients who were initially denied get released after we take over their case.',
    },
    {
      question: 'How much do immigration bonds typically cost?',
      answer:
        'Immigration bond amounts vary widely based on individual circumstances. We fight for the LOWEST possible amount and help connect families with bond companies that offer flexible payment options.',
    },
    {
      question: 'Can you visit me in detention?',
      answer:
        "YES! Our attorneys regularly visit all NC detention facilities. We'll meet with you to prepare your strongest case and keep your family updated throughout the process.",
    },
    {
      question: 'What if I have a criminal record?',
      answer:
        'We specialize in difficult cases. Our former ICE officers know how to present criminal history in the best light and argue for release despite past issues. Every case is winnable.',
    },
  ];

  return (
    <>
      <SmartBreadcrumbs
        customLabels={{
          'bond-hearings': 'Bond Hearings',
          'removal-defense': 'Removal Defense',
          immigration: 'Immigration Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="Immigration Bond Hearings: Freedom Within Reach"
        subtitle="NC's Most Aggressive ICE Detention Release Team"
        description="LOCKED UP BY ICE? We fight for your IMMEDIATE release with emergency bond motions and aggressive courtroom tactics. Former ICE officers on YOUR side know exactly how to win your freedom. Available 24/7 - your family needs you home NOW. Call 1-844-YO-PELEO."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            <InternalLinkingSection
              currentPage={currentPage}
              variant="inline"
              maxLinks={5}

                className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-primary/20"
            />

            {/* Emergency CTA Section */}
            <section className="bg-red-900/20 border-2 border-red-500 rounded-lg p-8 animate-pulse">
              <h2 className="text-3xl font-bold mb-4 text-red-400 text-center">
                ⚠️ DETAINED BY ICE? TIME IS CRITICAL ⚠️
              </h2>
              <p className="text-xl text-center text-white mb-6">
                Every day in detention is a day too many. We mobilize IMMEDIATELY to fight for your
                release.
              </p>
              <BondHearingsClient />
            </section>

            {/* Key Benefits Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why We Win "Impossible" Bond Cases
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-3">Former ICE Officers</h3>
                  <p className="text-gray-300">
                    We know EXACTLY what ICE attorneys will argue because we used to work with them.
                    This insider knowledge helps us destroy their detention arguments.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">24/7 Emergency Response</h3>
                  <p className="text-gray-300">
                    ICE doesn't wait for business hours to detain people. Neither do we. Our
                    emergency team files motions nights, weekends, and holidays.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Aggressive Tactics</h3>
                  <p className="text-gray-300">
                    We don't ask nicely for bonds - we DEMAND them. Our courtroom presence and
                    preparation overwhelm government attorneys and impress judges.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Multi-Level Strategy</h3>
                  <p className="text-gray-300">
                    Immigration court says no? We go federal. Still no? Appeals court. We never stop
                    fighting until you're home with your family.
                  </p>
                </div>
              </div>
            </section>

            {/* Process Timeline */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Your Path to Freedom</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4 flex-shrink-0">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Immediate Action (0-24 hours)</h3>
                    <p className="text-gray-300">
                      Call us and we spring into action. Emergency consultation, detention facility
                      contact, and immediate motion preparation begin within hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4 flex-shrink-0">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Motion Filing (24-48 hours)</h3>
                    <p className="text-gray-300">
                      Emergency bond motion filed with immigration court. We push for the earliest
                      possible hearing date and prepare overwhelming evidence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4 flex-shrink-0">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Bond Hearing (2-7 days)</h3>
                    <p className="text-gray-300">
                      We dominate the courtroom with prepared witnesses, evidence packages, and
                      aggressive advocacy that judges can't ignore.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4 flex-shrink-0">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Release Process (Same day)</h3>
                    <p className="text-gray-300">
                      Bond granted? We coordinate immediate payment and release. Most clients are
                      home with family within hours of winning their hearing.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Success Metrics */}
            <section className="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Bond Hearing Success</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary">89%</div>
                  <div className="text-gray-300">Bonds Granted</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">24/7</div>
                  <div className="text-gray-300">Availability</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">85%</div>
                  <div className="text-gray-300">Bond Reduction Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">3 Days</div>
                  <div className="text-gray-300">Avg. to Hearing</div>
                </div>
              </div>
            </section>

            {/* Detention Facilities Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                We Visit All NC Detention Facilities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Stewart Detention Center',
                  'Irwin County Detention Center',
                  'Folkston ICE Processing Center',
                  'LaSalle Detention Facility',
                  'Atlanta City Detention Center',
                  'Local County Jails with ICE Contracts',
                ].map((facility, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20"
                  >
                    <p
                className="font-semibold text-primary">{facility}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-gray-300">
                No matter where ICE is holding you, our attorneys will visit, prepare your case, and
                fight for your release.
              </p>
            </section>

            <InternalLinkingSection
              currentPage={currentPage}
              variant="related"
              maxLinks={6}

                className="mt-12 pt-12 border-t border-gray-800"
            />
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="bond-hearings-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Immigration Bond Hearings - Vasquez Law Firm',
            description:
              "Emergency immigration bond hearing representation. Get released from ICE detention fast with NC's most aggressive bond attorneys.",
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Immigration Bond Hearings',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl:
                'https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/bond-hearings',
              servicePhone: '+1-844-967-3536',
              availableLanguage: ['English', 'Spanish'],
            },
          }),
        }}
      />

      <HowToSchema practiceArea="immigration" pageType="bond-hearings" />
    </>
  );
}
