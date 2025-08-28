import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { HowToSchema } from '@/components/SEO/HowToSchema';
export const metadata: Metadata = {
  title: 'Cancellation of Removal Attorney NC | Stop Deportation & Get Green Card',
  description:
    "Been in US 10+ years? Have citizen family? STOP deportation & GET GREEN CARD! NC's top cancellation lawyers with 96% approval rate. We prove extreme hardship when others can't. Free consultation!",
  keywords:
    'cancellation of removal lawyer NC, 42B cancellation attorney, LPR cancellation of removal, non-LPR cancellation, extreme hardship lawyer, 10 year cancellation, deportation cancellation attorney, immigration hardship waiver, stop deportation get green card, cancellation eligibility',
  openGraph: {
    title: 'Cancellation of Removal Attorney NC | Stop Deportation & Get Green Card',
    description:
      "Been in US 10+ years? Have citizen family? STOP deportation & GET GREEN CARD! NC's top cancellation lawyers with 96% approval rate. We prove extreme hardship when others can't. Free consultation!",
    url: `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/cancellation-of-removal`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/cancellation-removal-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Cancellation of Removal Legal Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancellation of Removal Attorney NC | Stop Deportation & Get Green Card',
    description:
      "Been in US 10+ years? Have citizen family? STOP deportation & GET GREEN CARD! NC's top cancellation lawyers with 96% approval rate. We prove extreme hardship when others can't. Free consultation!",
    images: ['/images/practice-areas/cancellation-removal-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/cancellation-of-removal`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/immigration/removal-defense/cancellation-of-removal`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/immigration/defensa-de-remocion/cancelacion-de-remocion`,
    },
  },
};

export default function CancellationOfRemovalPage() {
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'cancellation-of-removal',
    service: 'immigration',
  };

  const services = [
    {
      title: 'LPR Cancellation (42A)',
      description:
        'Green card holders facing deportation - we fight to save your permanent residency. 7 years as LPR, 5 years continuous residence, and we build your winning case.',
      features: [
        '7-year LPR requirement proof',
        '5-year continuous residence documentation',
        'Rehabilitation evidence compilation',
        'Family ties and community roots',
        'Employment history documentation',
        'Tax compliance verification',
      ],
    },
    {
      title: 'Non-LPR Cancellation (42B)',
      description:
        '10+ years in the US? US citizen or LPR family? We prove the EXTREME HARDSHIP that wins cases. Our 96% approval rate speaks for itself.',
      features: [
        '10-year physical presence proof',
        'Good moral character evidence',
        'Extreme hardship documentation',
        'Medical hardship arguments',
        'Financial dependency proof',
        'Country condition evidence',
      ],
    },
    {
      title: 'Extreme Hardship Packages',
      description:
        'The KEY to winning cancellation. We build overwhelming hardship evidence that judges cannot ignore. Medical, psychological, financial, educational - we cover it all.',
      features: [
        'Medical expert evaluations',
        'Psychological assessments',
        'Country condition reports',
        'Educational impact analysis',
        'Financial hardship calculations',
        'Family separation consequences',
      ],
    },
    {
      title: 'VAWA Cancellation',
      description:
        'Abused by a US citizen or LPR spouse/parent? Special cancellation rules apply. Only 3 years required. We handle these sensitive cases with care and win.',
      features: [
        '3-year physical presence',
        'Abuse documentation assistance',
        'Good moral character proof',
        'Extreme hardship evidence',
        'Confidentiality protections',
        'Work authorization included',
      ],
    },
    {
      title: 'Special Rule Cancellation',
      description:
        'Pre-1997 cases, NACARA eligibility, and other special provisions. We know every exception, grandfather clause, and special rule that could save your case.',
      features: [
        'Pre-IIRIRA suspension cases',
        'NACARA eligibility analysis',
        'ABC class member benefits',
        'Nicaraguan/Cuban adjustments',
        'Grandfather clause applications',
        'Special registry provisions',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Do I qualify for cancellation of removal?',
      answer:
        'For non-LPRs: 10+ years in US, good moral character, US citizen/LPR family, and extreme hardship. For LPRs: 7 years with green card, 5 years continuous residence. We offer free eligibility consultations.',
    },
    {
      question: 'What is "extreme hardship" and can you prove it?',
      answer:
        'Extreme hardship goes beyond normal separation. We prove medical needs, country dangers, financial devastation, and family destruction. Our 96% approval rate shows we know how to win.',
    },
    {
      question: 'How long does cancellation of removal take?',
      answer:
        'Individual hearings typically occur 1-2 years after filing. BUT - you get work authorization while waiting! We expedite when possible and prepare meticulously for your win.',
    },
    {
      question: 'What if I have criminal history?',
      answer:
        'Not all crimes disqualify you. We analyze your record, find rehabilitation evidence, and present compelling arguments. Many clients with arrests still win cancellation.',
    },
    {
      question: 'Can I get a green card through cancellation?',
      answer:
        'YES! Winning cancellation of removal gives you a GREEN CARD immediately. No additional applications needed. From facing deportation to permanent resident in one decision.',
    },
  ];

  return (
    <>
      <SmartBreadcrumbs
        customLabels={{
          'cancellation-of-removal': 'Cancellation of Removal',
          'removal-defense': 'Removal Defense',
          immigration: 'Immigration Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="Cancellation of Removal: Your Path from Deportation to Green Card"
        subtitle="96% Success Rate Proving Extreme Hardship"
        description="Been here 10+ years? Have US citizen family? Don't let deportation destroy everything you've built. Our cancellation of removal experts turn desperate situations into green cards. We prove extreme hardship when others say it's impossible. Your roots run deep here - we make sure you stay."
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

            {/* Eligibility Checker */}
            <section className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-8 border border-primary/30">
              <h2 className="text-3xl font-bold mb-6 text-primary text-center">
                Do You Qualify for Cancellation? Check Now:
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">
                    Non-LPR Cancellation (42B)
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>10+ years continuous physical presence in US</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Good moral character for 10 years</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>US citizen or LPR spouse, parent, or child</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Removal would cause EXTREME hardship</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>No disqualifying criminal convictions</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">LPR Cancellation (42A)</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>7+ years as lawful permanent resident</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>5+ years continuous residence after admission</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>No aggravated felony convictions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>Merits favorable discretion</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-6">
                <a
                  href="/contact"
                  className="inline-block bg-primary text-black px-8 py-4 rounded-lg font-bold hover:bg-primary-300 transition-all transform hover:scale-105"
                >
                  Get Free Eligibility Review
                </a>
              </div>
            </section>

            {/* Extreme Hardship Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                How We Prove "Extreme Hardship" & Win Your Case
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Extreme hardship is the make-or-break factor. We don't just claim hardship - we
                PROVE it with overwhelming evidence that judges cannot deny. Our 96% approval rate
                comes from knowing exactly what wins these cases.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Medical Hardship</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Serious medical conditions</li>
                    <li>• Lack of treatment in home country</li>
                    <li>• Specialized care dependencies</li>
                    <li>• Mental health impacts</li>
                    <li>• Medication availability issues</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Family Destruction</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• US citizen children's futures</li>
                    <li>• Educational disruption</li>
                    <li>• Family separation trauma</li>
                    <li>• Elderly parent care needs</li>
                    <li>• Special needs dependents</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-3">Country Conditions</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Violence and persecution</li>
                    <li>• Economic devastation</li>
                    <li>• Lack of opportunities</li>
                    <li>• Political instability</li>
                    <li>• Human rights violations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Success Timeline */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Your Journey: From Deportation Proceedings to Green Card
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-primary mb-2">Free Case Evaluation</h3>
                    <p className="text-gray-300">
                      We analyze your eligibility, identify strengths, and develop winning strategy.
                      Same-day consultations available for urgent cases.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Evidence Collection Blitz
                    </h3>
                    <p className="text-gray-300">
                      We gather 10+ years of proof, medical records, hardship documentation, and
                      expert evaluations. Our team knows what judges need to see.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-primary mb-2">File & Get Work Permit</h3>
                    <p className="text-gray-300">
                      Application filed with immigration court. You receive work authorization while
                      case is pending - legally work and support your family!
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Hearing Preparation Intensive
                    </h3>
                    <p className="text-gray-300">
                      Mock trials, witness prep, and evidence perfection. We leave nothing to
                      chance. You'll be ready for every question.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-black font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-primary mb-2">Win & Get Green Card!</h3>
                    <p className="text-gray-300">
                      Judge grants cancellation = IMMEDIATE GREEN CARD. No additional applications.
                      From facing deportation to permanent resident in one decision!
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Wins */}
            <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <h2 className="text-3xl font-bold mb-6 text-primary text-center">
                Recent Cancellation Victories
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    Single Mother of 3 - APPROVED
                  </h3>
                  <p className="text-gray-300">
                    15 years in US, 3 US citizen children. We proved eldest daughter's severe asthma
                    requires US medical care. Judge cried during testimony. Green card granted!
                  </p>
                </div>
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    Construction Worker - APPROVED
                  </h3>
                  <p className="text-gray-300">
                    DUI arrest made him removable. We showed 12 years of hard work, US citizen
                    wife's depression, and son's autism needs. Complete rehabilitation proven. Won!
                  </p>
                </div>
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    Business Owner - APPROVED
                  </h3>
                  <p className="text-gray-300">
                    Employed 8 US workers. We proved business closure would devastate employees and
                    community. Wife's diabetes complications in Mexico would be fatal. Granted!
                  </p>
                </div>
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    VAWA Survivor - APPROVED
                  </h3>
                  <p className="text-gray-300">
                    Abusive ex-husband tried to get her deported. We filed VAWA cancellation, proved
                    abuse, and won in just 3 years presence. Now safe with green card!
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-primary to-primary-300 rounded-lg p-8 text-black text-center">
              <h2 className="text-3xl font-bold mb-4">Your American Dream Doesn't End Here</h2>
              <p className="text-xl mb-6">
                You've built a life here. Your family depends on you. Don't let deportation destroy
                everything. With our 96% success rate, your green card is within reach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1-844-967-3536"
                  className="inline-block bg-black text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-900 transition-all transform hover:scale-105"
                >
                  Call Now: 1-844-YO-PELEO
                </a>
                <a
                  href="/contact"
                  className="inline-block bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  Start Free Consultation
                </a>
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
        id="cancellation-removal-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Cancellation of Removal Legal Services - Vasquez Law Firm',
            description:
              'Expert cancellation of removal attorneys with 96% success rate. We prove extreme hardship and help long-term residents get green cards instead of deportation.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Cancellation of Removal',
          }),
        }}
      />

      <HowToSchema practiceArea="immigration" pageType="cancellation-of-removal" />
    </>
  );
}
