import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { HowToSchema } from '@/components/SEO/HowToSchema';
export const metadata: Metadata = {
  title: 'EMERGENCY Deportation Defense NC | Elite Inmigración Abogados Fighting ICE 24/7',
  description:
    "URGENT: NC's most aggressive deportation defense team. 98% SUCCESS RATE stopping removals. Former immigration officers on staff. Same-day emergency response. 30,000+ families saved. Call NOW: 1-844-YO-PELEO",
  keywords:
    'emergency deportation defense NC, ICE detention lawyer, immigration raid attorney, urgent removal defense, same-day immigration lawyer, 24/7 deportation attorney, aggressive immigration defense, elite immigration law firm NC, record-breaking immigration success, immediate ICE response lawyer, emergency bond hearings NC, fighting deportation orders',
  openGraph: {
    title: 'EMERGENCY Deportation Defense NC | Elite Inmigración Abogados Fighting ICE 24/7',
    description:
      "URGENT: NC's most aggressive deportation defense team. 98% SUCCESS RATE stopping removals. Former immigration officers on staff. Same-day emergency response. 30,000+ families saved. Call NOW: 1-844-YO-PELEO",
    url: `https://www.vasquezlawfirm.com/practice-areas/immigration`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/immigration-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Inmigración Defense Services - Available 24/7',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMERGENCY Deportation Defense NC | Elite Inmigración Abogados Fighting ICE 24/7',
    description:
      "URGENT: NC's most aggressive deportation defense team. 98% SUCCESS RATE stopping removals. Former immigration officers on staff. Same-day emergency response. 30,000+ families saved. Call NOW: 1-844-YO-PELEO",
    images: ['/images/practice-areas/immigration-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/immigration`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/immigration`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/immigration`,
    },
  },
  other: {
    'og:locale': 'en_US',
    'og:locale:alternate': 'es_ES',
    'article:author': 'Vasquez Law Firm, PLLC',
    'article:publisher': 'https://www.vasquezlawfirm.com',
    'twitter:site': '@VasquezLawNC',
    'twitter:creator': '@VasquezLawNC',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default function InmigraciónLawPage() {
  // Page configuration for internal linking
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'immigration',
    service: 'immigration',
  };
  const services = [
    {
      title: 'Family-Based Inmigración & Petitions',
      description:
        'Unite with your loved ones in the United States through our comprehensive family immigration services. We handle all types of family petitions with care and expertise.',
      features: [
        'Spouse and fiancé(e) visas (K-1, K-3)',
        'Parent and child petitions',
        'Sibling sponsorship',
        'Family preference categories',
        'Consular processing',
        'Waiver applications',
      ],
    },
    {
      title: 'Employment-Based Green Cards & Visas',
      description:
        'Navigate the complex employment immigration system with confidence. We help professionals, skilled workers, and businesses secure work authorization and permanent residency.',
      features: [
        'H-1B specialty occupations',
        'L-1 intracompany transfers',
        'O-1 extraordinary ability',
        'EB-1, EB-2, EB-3 green cards',
        'PERM labor certification',
        'National Interest Waivers',
      ],
    },
    {
      title: 'EMERGENCY Deportation & ICE Defense',
      description:
        "URGENT: Facing ICE detention or deportation? We're NC's most aggressive deportation defense team. Former immigration officers on YOUR side. 98% success rate stopping removals. Available 24/7 for emergency response.",
      features: [
        'IMMEDIATE emergency court filings',
        'Same-day bond hearings & release',
        'Aggressive cancellation of removal',
        'Emergency stays of deportation',
        'Federal court injunctions',
        'ICE raid response team 24/7',
      ],
    },
    {
      title: 'Citizenship & Naturalization',
      description:
        'Achieve your American dream by becoming a U.S. citizen. We guide you through every step of the naturalization process, from application to oath ceremony.',
      features: [
        'N-400 application preparation',
        'Citizenship test preparation',
        'English and civics tutoring referrals',
        'Disability waivers',
        'Expedited processing',
        'Certificate replacements',
      ],
    },
    {
      title: 'DACA, TPS & Humanitarian Relief',
      description:
        'Access critical protections and work authorization through humanitarian programs. We help eligible individuals secure and maintain their legal status.',
      features: [
        'DACA initial applications and renewals',
        'Temporary Protected Status (TPS)',
        'Advance parole documents',
        'U visas for crime victims',
        'T visas for trafficking victims',
        'VAWA self-petitions',
      ],
    },
    {
      title: 'Inmigración Appeals & Waivers',
      description:
        "Don't give up after a denial. Our attorneys have extensive experience challenging negative decisions and securing waivers for various grounds of inadmissibility.",
      features: [
        'I-601 and I-601A waivers',
        'Administrative appeals (AAO)',
        'Board of Inmigración Appeals',
        'Federal court litigation',
        'Motion to reopen/reconsider',
        'Hardship waiver applications',
      ],
    },
    {
      title: 'Adjustment of Status',
      description:
        'Transition from temporary visa holder to permanent resident without leaving the United States. We ensure your adjustment application is properly prepared and supported.',
      features: [
        'I-485 application filing',
        'Concurrent filing strategies',
        'Work and travel permits',
        'Medical examinations',
        'Interview preparation',
        'RFE responses',
      ],
    },
    {
      title: 'Asylum & Refugee Protection',
      description:
        "Seek safety and protection in the United States if you've faced persecution. Our compassionate team helps you present the strongest possible case for asylum.",
      features: [
        'I-589 asylum applications',
        'Credible fear interviews',
        'Affirmative and defensive asylum',
        'Country condition evidence',
        'Expert witness coordination',
        'Work authorization',
      ],
    },
    {
      title: 'Investment Visas (EB-5)',
      description:
        'Invest in your future and obtain permanent residency through the EB-5 investor program. We guide entrepreneurs and investors through this complex but rewarding pathway.',
      features: [
        'Regional center investments',
        'Direct investment options',
        'Source of funds documentation',
        'Business plan development',
        'I-526 and I-829 petitions',
        'Conditional residency removal',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How much does an immigration lawyer cost in North Carolina?',
      answer:
        'At Vasquez Law Firm, we offer free consultations and flexible payment options. We provide transparent, competitive pricing with payment plans available.',
    },
    {
      question: 'Do you handle immigration cases throughout NC?',
      answer:
        'Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.',
    },
    {
      question: 'How quickly can I speak with an immigration attorney?',
      answer:
        'We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.',
    },
    {
      question: 'What types of immigration cases do you handle?',
      answer:
        'We handle all immigration matters including green cards, visas, deportation defense, citizenship, asylum, DACA, and family petitions.',
    },
    {
      question: 'Do you speak Spanish?',
      answer:
        'Yes! Our entire team is bilingual. We provide full legal services in both English and Spanish to better serve our community.',
    },
  ];

  return (
    <>
      {/* Smart Breadcrumbs for better navigation and SEO */}
      <SmartBreadcrumbs
        customLabels={{
          immigration: 'Inmigración Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="EMERGENCY Inmigración Defense: NC's Elite Legal Warriors"
        subtitle="Fighting ICE, Winning Cases, Saving Families 24/7"
        description="URGENT HELP AVAILABLE NOW: North Carolina's most aggressive deportation defense team with a 98% SUCCESS RATE. Former immigration officers on our side. 30,000+ families saved from deportation. When ICE strikes, we fight back harder. Same-day emergency response. Call 1-844-YO-PELEO immediately."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Inline Internal Linking Section - Strategic placement after hero */}
            <InternalLinkingSection
              currentPage={currentPage}
              variant="inline"
              maxLinks={5}

                className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-primary/20"
            />

            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                EMERGENCY RESPONSE: Why We're NC's Most Feared Inmigración Defense Team
              </h2>
              <p className="text-lg mb-6">
                When ICE comes knocking, you need warriors, not lawyers. We're the elite force
                that immigration authorities fear most - former officers turned defenders with a 98%
                WIN RATE and immediate 24/7 response capabilities.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30 shadow-red-500/20 shadow-lg">
                  <h3 className="text-xl font-bold text-red-400 mb-3">
                    IMMEDIATE EMERGENCY RESPONSE
                  </h3>
                  <p className="text-gray-300">
                    ICE raid? Detention? Deportation order? We mobilize INSTANTLY. Same-day court
                    filings, emergency stays, and aggressive defense strategies deployed within
                    hours.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/30 shadow-primary/20 shadow-lg">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    RECORD-BREAKING 98% SUCCESS RATE
                  </h3>
                  <p className="text-gray-300">
                    30,000+ families saved from deportation. We don't just fight cases - we
                    DOMINATE them. Our aggressive tactics and insider knowledge devastate government
                    cases.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30 shadow-yellow-500/20 shadow-lg">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    FORMER IMMIGRATION OFFICERS
                  </h3>
                  <p className="text-gray-300">
                    We have their playbook. Ex-ICE and USCIS officers on OUR team expose every
                    weakness, predict every move, and turn their tactics against them.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-green-500/30 shadow-green-500/20 shadow-lg">
                  <h3 className="text-xl font-bold text-green-400 mb-3">24/7 BATTLE-READY TEAM</h3>
                  <p className="text-gray-300">
                    Inmigración emergencies don't wait for business hours. Neither do we.
                    Instant response, emergency hearings, and round-the-clock protection for your
                    family.
                  </p>
                </div>
              </div>
            </section>

            {/* Main Content Grid with Sidebar */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-12">
                {/* Process Section */}
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Our Inmigración Process</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-primary text-2xl font-bold mr-4">1.</span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
                        <p className="text-gray-300">
                          Meet with our attorneys to discuss your case and explore your immigration
                          options.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary text-2xl font-bold mr-4">2.</span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Case Strategy</h3>
                        <p className="text-gray-300">
                          We develop a personalized strategy tailored to your unique immigration
                          needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary text-2xl font-bold mr-4">3.</span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Document Preparation</h3>
                        <p className="text-gray-300">
                          Our team handles all paperwork and ensures accurate, complete submissions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary text-2xl font-bold mr-4">4.</span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Case Management</h3>
                        <p className="text-gray-300">
                          We guide you through every step, from filing to final approval.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* NC Coverage Section */}
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-primary">
                    Serving All 100 North Carolina Counties
                  </h2>
                  <p className="text-lg mb-8">
                    From the mountains to the coast, we provide expert immigration law
                    representation throughout North Carolina:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                      <h3 className="font-semibold text-primary mb-2">Triangle Area</h3>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Raleigh</li>
                        <li>• Durham</li>
                        <li>• Chapel Hill</li>
                        <li>• Cary</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                      <h3 className="font-semibold text-primary mb-2">Charlotte Metro</h3>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Charlotte</li>
                        <li>• Concord</li>
                        <li>• Gastonia</li>
                        <li>• Rock Hill</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                      <h3 className="font-semibold text-primary mb-2">Triad Area</h3>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Greensboro</li>
                        <li>• Winston-Salem</li>
                        <li>• High Point</li>
                        <li>• Burlington</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                      <h3 className="font-semibold text-primary mb-2">Eastern NC</h3>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Wilmington</li>
                        <li>• Jacksonville</li>
                        <li>• Greenville</li>
                        <li>• New Bern</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar with internal links */}
              <div className="lg:col-span-1">
                <InternalLinkingSection
                  currentPage={currentPage}
                  variant="sidebar"
                  maxLinks={7}

                className="sticky top-24"
                />
              </div>
            </div>

            {/* Related Links Section - Before footer for maximum engagement */}
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
        id="immigration-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'EMERGENCY Inmigración Defense - Vasquez Law Firm',
            description:
              "URGENT 24/7 deportation defense and immigration law services. NC's most aggressive team with 98% success rate. Former immigration officers. 30,000+ families saved.",
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC - Elite Inmigración Defense Team',
              url: 'https://www.vasquezlawfirm.com',
              award: '98% Success Rate in Deportation Defense',
              knowsAbout: [
                'Emergency Deportation Defense',
                'ICE Raid Response',
                'Inmigración Court',
                'Federal Inmigración Appeals',
              ],
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Emergency Inmigración Defense',
            offers: {
              '@type': 'Offer',
              name: 'FREE Emergency Consultation - Available 24/7',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              availabilityStarts: '2024-01-01T00:00:00',
              priceValidUntil: '2025-12-31T23:59:59',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '847',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* Local Business Structured Data */}
      <Script
        id="immigration-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Abogado',
            name: 'Vasquez Law Firm, PLLC',
            image: 'https://www.vasquezlawfirm.com/images/vasquez-law-firm-logo.png',
            url: 'https://www.vasquezlawfirm.com',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '333 Fayetteville Street, Suite 810',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27601',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00',
            },
            sameAs: [
              'https://www.facebook.com/vasquezlawfirm',
              'https://twitter.com/vasquezlawfirm',
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.youtube.com/vasquezlawfirm',
            ],
            priceRange: '$$',
          }),
        }}
      />

      {/* HowTo Schema for Inmigración Processes */}
      <HowToSchema practiceArea="immigration" pageType="immigration-practice" />
    </>
  );
}
