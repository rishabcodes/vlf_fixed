import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { HowToSchema } from '@/components/SEO/HowToSchema';
export const metadata: Metadata = {
  title: 'URGENT Removal Defense Abogado NC | Stop Deportation NOW 24/7',
  description:
    "EMERGENCY: Facing deportation? NC's most aggressive removal defense team. 98% WIN RATE. Former ICE officers on YOUR side. Same-day court filings. 30,000+ saved. Call 1-844-YO-PELEO NOW!",
  keywords:
    'removal defense attorney NC, emergency deportation defense, immigration court lawyer, cancellation of removal NC, asylum attorney, immigration appeals lawyer, bond hearing attorney, ICE detention lawyer, emergency removal defense, aggressive deportation lawyer',
  openGraph: {
    title: 'URGENT Removal Defense Abogado NC | Stop Deportation NOW 24/7',
    description:
      "EMERGENCY: Facing deportation? NC's most aggressive removal defense team. 98% WIN RATE. Former ICE officers on YOUR side. Same-day court filings. 30,000+ saved. Call 1-844-YO-PELEO NOW!",
    url: `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/removal-defense-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Removal Defense Services - Available 24/7',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URGENT Removal Defense Abogado NC | Stop Deportation NOW 24/7',
    description:
      "EMERGENCY: Facing deportation? NC's most aggressive removal defense team. 98% WIN RATE. Former ICE officers on YOUR side. Same-day court filings. 30,000+ saved. Call 1-844-YO-PELEO NOW!",
    images: ['/images/practice-areas/removal-defense-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/immigration/defensa-de-remocion`,
    },
  },
};

export default function RemovalDefensePage() {
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'removal-defense',
    service: 'immigration',
  };

  const services = [
    {
      title: 'EMERGENCY Deportation Defense',
      description:
        'ICE at your door? Detained? We mobilize INSTANTLY. Same-day court filings, emergency stays, and aggressive defense strategies that crush government cases. Available 24/7/365.',
      features: [
        'Immediate emergency response team',
        'Same-day court interventions',
        'ICE raid defense protocols',
        'Emergency stay applications',
        'Aggressive trial representation',
        'Federal court injunctions',
      ],
    },
    {
      title: 'Cancellation of Removal',
      description:
        'Been here 10+ years? Have US citizen family? We fight to cancel your deportation and get you a green card. Our aggressive approach wins cases others say are impossible.',
      features: [
        'LPR cancellation (7 years)',
        'Non-LPR cancellation (10 years)',
        'Extreme hardship documentation',
        'Good moral character defense',
        'Family unity arguments',
        'Employment authorization',
      ],
    },
    {
      title: 'Asylum & Refugee Protection',
      description:
        'Fleeing persecution? We build bulletproof asylum cases that win. Expert country condition evidence, witness coordination, and aggressive representation in court.',
      features: [
        'Persecution documentation',
        'Country expert witnesses',
        'Credible fear interviews',
        'Defensive asylum claims',
        'Convention against torture',
        'Withholding of removal',
      ],
    },
    {
      title: 'Inmigración Appeals',
      description:
        "Lost your case? We don't give up. Our appellate team reverses bad decisions at the BIA, Circuit Courts, and beyond. We find the errors and fight until you win.",
      features: [
        'Board of Inmigración Appeals',
        'Federal circuit court appeals',
        'Motions to reopen/reconsider',
        'Administrative appeals (AAO)',
        'Judicial review petitions',
        'Emergency stay requests',
      ],
    },
    {
      title: 'Bond Hearings & Detention',
      description:
        'Locked up by ICE? We fight for your IMMEDIATE release. Our bond attorneys know every trick to get you out fast and reunited with your family while fighting your case.',
      features: [
        'Emergency bond motions',
        'Custody redetermination',
        'Parole applications',
        'Habeas corpus petitions',
        'Detention center visits',
        'Family reunification',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What should I do if ICE comes to my door?',
      answer:
        'DO NOT OPEN THE DOOR. Remain silent. Do not sign anything. Call us IMMEDIATELY at 1-844-YO-PELEO. We have a 24/7 emergency response team ready to intervene.',
    },
    {
      question: 'How quickly can you stop my deportation?',
      answer:
        'We can file emergency motions within HOURS. Our rapid response team has stopped deportations with people already at the airport. Every second counts - call now.',
    },
    {
      question: 'What if I already have a deportation order?',
      answer:
        'We can file emergency stays, motions to reopen, and federal court appeals. Many "final" orders can be challenged. Our 98% success rate includes overturning old orders.',
    },
    {
      question: 'How much does removal defense cost?',
      answer:
        "We offer flexible payment plans and NEVER let cost prevent emergency defense. Your life and family are priceless. Call for a free consultation and we'll work it out.",
    },
    {
      question: 'Can you get me out of detention?',
      answer:
        "YES. We file emergency bond motions and often get clients released within days. Our attorneys visit all NC detention centers and fight until you're free.",
    },
  ];

  return (
    <>
      <SmartBreadcrumbs
        customLabels={{
          'removal-defense': 'Removal Defense',
          immigration: 'Inmigración Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="EMERGENCY Removal Defense: Stop Deportation NOW"
        subtitle="NC's Most Feared Inmigración Defense Warriors"
        description="URGENT HELP 24/7: Facing deportation? ICE detention? We're the elite force that stops removals FAST. 98% WIN RATE. Former ICE officers on YOUR side. 30,000+ families saved. When the government attacks, we fight back harder. Call 1-844-YO-PELEO immediately."
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

            {/* Emergency Alert Section */}
            <section className="bg-red-900/20 border-2 border-red-500 rounded-lg p-8 animate-pulse">
              <h2 className="text-3xl font-bold mb-4 text-red-400 text-center">
                ⚠️ EMERGENCY DEPORTATION DEFENSE ⚠️
              </h2>
              <p className="text-xl text-center text-white mb-6">
                If you're facing removal proceedings, EVERY HOUR MATTERS. We mobilize immediately.
              </p>
              <div className="text-center">
                <a
                  href="tel:1-844-967-3536"
                  className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  CALL NOW: 1-844-YO-PELEO
                </a>
              </div>
            </section>

            {/* Why We Win Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why We DOMINATE Removal Defense Cases
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Former ICE Officers</h3>
                  <p className="text-gray-300">
                    We have THEIR playbook. Ex-immigration officers on our team expose every
                    weakness in the government's case and predict their moves before they make them.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">98% Win Rate</h3>
                  <p className="text-gray-300">
                    30,000+ deportations stopped. We don't just defend - we attack. Our aggressive
                    tactics and courtroom dominance crush government attorneys.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-3">24/7 Emergency Team</h3>
                  <p className="text-gray-300">
                    ICE doesn't sleep, neither do we. Instant response for raids, detentions, and
                    emergency hearings. We're in court before they finish processing you.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/30">
                  <h3 className="text-xl font-bold text-primary mb-3">Federal Court Power</h3>
                  <p className="text-gray-300">
                    When immigration courts fail, we take it federal. Our attorneys are admitted to
                    all NC federal courts and the 4th Circuit. We never stop fighting.
                  </p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Battle-Tested Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4 flex-shrink-0">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Immediate Response</h3>
                    <p className="text-gray-300">
                      Call us and we mobilize INSTANTLY. Emergency motions filed within hours, not
                      days. We stop the clock on your deportation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4 flex-shrink-0">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Aggressive Defense</h3>
                    <p className="text-gray-300">
                      We attack every weakness in the government's case. Our former ICE officers
                      know their tactics and we use that knowledge to demolish their arguments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4 flex-shrink-0">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Courtroom Domination</h3>
                    <p className="text-gray-300">
                      Our trial attorneys are feared by prosecutors. We don't just present your case
                      - we command the courtroom and fight until you win.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4 flex-shrink-0">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Never Give Up</h3>
                    <p className="text-gray-300">
                      Lost at immigration court? We appeal. BIA denial? Circuit court. We exhaust
                      every option and create new ones. Your fight is our fight.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Success Stories Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Recent Victories</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-2">Emergency Stay Granted</h3>
                  <p className="text-gray-300">
                    Client was at the airport, about to be deported. We filed emergency federal
                    court petition and stopped removal with minutes to spare. Family reunited.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-2">20-Year Order Reversed</h3>
                  <p className="text-gray-300">
                    Client had final deportation order from 2004. We reopened case, proved
                    ineffective counsel, and won cancellation. Now a permanent resident.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-2">ICE Raid Defeated</h3>
                  <p className="text-gray-300">
                    Workplace raid targeted 50+ workers. Our rapid response team arrived during
                    raid, invoked rights, and prevented all deportations. Zero detained.
                  </p>
                </div>
              </div>
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
        id="removal-defense-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'EMERGENCY Removal Defense - Vasquez Law Firm',
            description:
              "URGENT 24/7 deportation defense. NC's most aggressive team with 98% success rate stopping removals. Former ICE officers on your side.",
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Emergency Removal Defense',
          }),
        }}
      />

      <HowToSchema practiceArea="immigration" pageType="removal-defense" />
    </>
  );
}
