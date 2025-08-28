import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { HowToSchema } from '@/components/SEO/HowToSchema';
export const metadata: Metadata = {
  title: 'Emergency Deportation Defense Lawyer NC | Stop ICE NOW 24/7',
  description:
    "URGENT: ICE at your door? Detained? NC's most aggressive deportation lawyers. 98% SUCCESS stopping removals. Former ICE officers fighting FOR you. Same-day response. Call 1-844-YO-PELEO NOW!",
  keywords:
    'deportation defense lawyer NC, emergency ICE defense, immigration detention attorney, stop deportation now, ICE raid lawyer, removal proceedings defense, detained by ICE lawyer, deportation attorney near me, aggressive immigration defense, 24/7 deportation lawyer',
  openGraph: {
    title: 'Emergency Deportation Defense Lawyer NC | Stop ICE NOW 24/7',
    description:
      "URGENT: ICE at your door? Detained? NC's most aggressive deportation lawyers. 98% SUCCESS stopping removals. Former ICE officers fighting FOR you. Same-day response. Call 1-844-YO-PELEO NOW!",
    url: `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/deportation-defense`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/deportation-defense-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Deportation Defense - Available 24/7',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Deportation Defense Lawyer NC | Stop ICE NOW 24/7',
    description:
      "URGENT: ICE at your door? Detained? NC's most aggressive deportation lawyers. 98% SUCCESS stopping removals. Former ICE officers fighting FOR you. Same-day response. Call 1-844-YO-PELEO NOW!",
    images: ['/images/practice-areas/deportation-defense-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/deportation-defense`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/deportation-defense`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/immigration/defensa-de-remocion/defensa-de-deportacion`,
    },
  },
};

export default function DeportationDefensePage() {
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'deportation-defense',
    service: 'immigration',
  };

  const services = [
    {
      title: 'ICE Raid Emergency Response',
      description:
        'IMMEDIATE ACTION when ICE strikes. Our rapid response team deploys instantly to worksites, homes, and detention centers. We shut down illegal arrests and protect your rights.',
      features: [
        'On-site legal intervention',
        'Know Your Rights invocation',
        'Warrantless entry challenges',
        'Workplace raid defense',
        'Family protection protocols',
        'Evidence preservation',
      ],
    },
    {
      title: 'Detention Release & Bond',
      description:
        'LOCKED UP? We fight for your immediate release. Our attorneys visit all NC detention centers and file emergency bond motions to reunite you with family FAST.',
      features: [
        'Same-day detention visits',
        'Emergency bond hearings',
        'Custody redetermination',
        'Danger classification challenges',
        'Medical release requests',
        'Family hardship arguments',
      ],
    },
    {
      title: 'Master Calendar Hearings',
      description:
        'First hearing coming up? We enter with maximum force. Pleadings, relief applications, and aggressive defense strategies that put the government on their heels from day one.',
      features: [
        'Strategic pleading decisions',
        'Relief eligibility analysis',
        'Prosecutorial discretion requests',
        'Venue change motions',
        'Interpreter requirements',
        'Document authentication',
      ],
    },
    {
      title: 'Individual Merits Hearings',
      description:
        'THE BIG FIGHT. We prepare like your life depends on it - because it does. Expert witnesses, country conditions, and courtroom dominance that wins cases.',
      features: [
        'Witness preparation intensive',
        'Expert testimony coordination',
        'Evidence compilation',
        'Cross-examination strategies',
        'Closing argument mastery',
        'Real-time objections',
      ],
    },
    {
      title: 'Emergency Stays & Appeals',
      description:
        'Ordered removed? NOT SO FAST. We file emergency stays, appeals, and federal court actions that stop deportations cold. Many "final" orders are not final at all.',
      features: [
        'Emergency stay motions',
        'Administrative stays',
        'BIA appeals filing',
        'Circuit court petitions',
        'Habeas corpus actions',
        'Judicial review requests',
      ],
    },
  ];

  const faqs = [
    {
      question: 'ICE is at my door RIGHT NOW. What do I do?',
      answer:
        "DO NOT OPEN THE DOOR. Stay silent. Do not sign anything. Call us IMMEDIATELY at 1-844-YO-PELEO. Put the phone on speaker so we can invoke your rights. We've stopped arrests in progress.",
    },
    {
      question: 'My family member was just detained by ICE. Can you help?',
      answer:
        'YES. Call us NOW. We immediately locate detained individuals, visit them, file bond motions, and begin aggressive defense. Time is critical - every hour matters.',
    },
    {
      question: 'I have a deportation order from years ago. Am I doomed?',
      answer:
        'NO! Many old orders can be reopened, appealed, or stayed. We\'ve successfully overturned 20+ year old deportation orders. Our 98% success rate includes "impossible" cases.',
    },
    {
      question: 'How fast can you respond to an emergency?',
      answer:
        "IMMEDIATELY. We have attorneys on-call 24/7. We've filed emergency motions at midnight, appeared at detention centers on weekends, and stopped deportations with hours to spare.",
    },
    {
      question: 'What makes you different from other immigration lawyers?',
      answer:
        "AGGRESSION + EXPERIENCE. We have former ICE officers on our team. We know their tactics, weaknesses, and fears. We don't just defend - we attack and dominate. 30,000+ wins prove it.",
    },
  ];

  return (
    <>
      <SmartBreadcrumbs
        customLabels={{
          'deportation-defense': 'Deportation Defense',
          'removal-defense': 'Removal Defense',
          immigration: 'Immigration Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="EMERGENCY Deportation Defense: We Stop ICE Cold"
        subtitle="NC's Most Aggressive Anti-Deportation Force"
        description="ICE ATTACKING? WE FIGHT BACK HARDER. Available 24/7 for raids, detentions, and emergency hearings. 98% success rate crushing government cases. Former ICE officers now defending YOU. When every second counts, we move faster. Call 1-844-YO-PELEO NOW."
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

            {/* Critical Emergency Section */}
            <section className="bg-red-900/30 border-2 border-red-600 rounded-lg p-8">
              <h2 className="text-4xl font-bold mb-6 text-red-400 text-center animate-pulse">
                ⚠️ DEPORTATION EMERGENCY? ACT NOW ⚠️
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-black/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">ICE AT YOUR DOOR?</h3>
                  <p className="text-white">Don't open. Stay silent. Call us immediately.</p>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">DETAINED?</h3>
                  <p className="text-white">We visit same-day and fight for immediate release.</p>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">COURT TOMORROW?</h3>
                  <p className="text-white">Emergency preparation available 24/7. We're ready.</p>
                </div>
              </div>
              <div className="text-center mt-6">
                <a
                  href="tel:1-844-967-3536"
                  className="inline-block bg-red-600 text-white px-10 py-5 rounded-lg text-2xl font-bold hover:bg-red-700 transition-all transform hover:scale-105 animate-pulse"
                >
                  CALL NOW: 1-844-YO-PELEO
                </a>
              </div>
            </section>

            {/* Our Attack Strategy */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Our Battle-Tested Deportation Defense Strategy
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-400 mb-3">
                    Phase 1: Immediate Intervention
                  </h3>
                  <p className="text-gray-300 mb-3">
                    The moment you call, we spring into action. Emergency motions filed, ICE
                    contacted, rights invoked. We create an immediate legal shield around you and
                    your family.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Emergency stay of removal filings</li>
                    <li>• Detention location and transfer prevention</li>
                    <li>• Family notification and protection protocols</li>
                    <li>• Evidence preservation and witness identification</li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    Phase 2: Aggressive Defense Build
                  </h3>
                  <p className="text-gray-300 mb-3">
                    We don't just respond - we counterattack. Our team builds overwhelming defenses
                    that expose government errors, procedural violations, and paths to relief.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Constitutional violation investigations</li>
                    <li>• Relief eligibility deep dive (asylum, cancellation, etc.)</li>
                    <li>• Witness preparation and expert recruitment</li>
                    <li>• Prosecutorial discretion negotiations</li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-400 mb-3">
                    Phase 3: Courtroom Domination
                  </h3>
                  <p className="text-gray-300 mb-3">
                    When we enter that courtroom, we own it. Judges know our reputation. Government
                    attorneys fear us. We fight with everything we have until you win.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Aggressive cross-examination tactics</li>
                    <li>• Real-time objection strategies</li>
                    <li>• Compelling closing arguments</li>
                    <li>• Immediate appeal preparation if needed</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Why We Crush ICE Cases */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why ICE Fears Our Defense Team
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-900/20 to-black rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-2xl font-bold text-red-400 mb-3">
                    Former ICE Officers = Inside Knowledge
                  </h3>
                  <p className="text-gray-300">
                    We have their playbook because we wrote it. Former immigration enforcement
                    officers now use their insider knowledge to destroy government cases from
                    within.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/20 to-black rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3">
                    98% Win Rate = Proven Dominance
                  </h3>
                  <p className="text-gray-300">
                    30,000+ deportations stopped. We don't get these results by playing nice. We
                    fight harder, prepare better, and never give up until our clients are safe.
                  </p>
                </div>
              </div>
            </section>

            {/* Recent Victory Alerts */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                This Week's Deportation Victories
              </h2>
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                  <span className="text-green-400 font-bold">VICTORY:</span>
                  <span className="text-white ml-2">
                    Emergency stay granted for Charlotte family. Father of 3 US citizens released
                    from detention after our midnight filing. Family reunited within 48 hours.
                  </span>
                </div>
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                  <span className="text-green-400 font-bold">VICTORY:</span>
                  <span className="text-white ml-2">
                    Workplace raid in Durham - all 23 workers released. Our rapid response team
                    arrived during the raid, invoked rights, and prevented all deportations.
                  </span>
                </div>
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                  <span className="text-green-400 font-bold">VICTORY:</span>
                  <span className="text-white ml-2">
                    15-year-old deportation order vacated. Client now applying for green card.
                    Government attorneys withdrew opposition after our motion exposed fatal errors.
                  </span>
                </div>
              </div>
            </section>

            {/* Your Rights Card */}
            <section className="bg-primary/10 rounded-lg p-8 border border-primary/30">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Know Your Rights - Save This Now
              </h2>
              <div className="bg-black rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4 text-red-400">If ICE Comes:</h3>
                <ol className="space-y-3 text-lg">
                  <li>
                    <strong>1.</strong> DO NOT OPEN THE DOOR unless they have a warrant signed by a
                    judge
                  </li>
                  <li>
                    <strong>2.</strong> REMAIN SILENT - You have the right not to answer questions
                  </li>
                  <li>
                    <strong>3.</strong> DO NOT SIGN anything without speaking to a lawyer
                  </li>
                  <li>
                    <strong>4.</strong> DO NOT LIE or provide false documents
                  </li>
                  <li>
                    <strong>5.</strong> CALL US IMMEDIATELY: 1-844-YO-PELEO (1-844-967-3536)
                  </li>
                </ol>
                <div className="mt-6 text-center">
                  <p className="text-xl font-bold text-yellow-400">
                    Screenshot this card. Share with family. Be prepared.
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
        id="deportation-defense-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Emergency Deportation Defense - Vasquez Law Firm',
            description:
              "24/7 emergency deportation defense. NC's most aggressive immigration lawyers with 98% success rate. Former ICE officers on your defense team.",
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Emergency Deportation Defense',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: 'tel:+18449673536',
              name: '24/7 Emergency Hotline',
              availableLanguage: ['English', 'Spanish'],
            },
          }),
        }}
      />

      <HowToSchema practiceArea="immigration" pageType="deportation-defense" />
    </>
  );
}
