import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: "Best Workers' Comp Lawyers in North Carolina | Get Benefits Fast | Vasquez Law",
  description:
    "Expert NC workers' compensation attorneys with 60+ years experience. Get your benefits approved fast. Free consultation. We handle denied claims. Se habla español.",
  keywords:
    'workers comp lawyer NC, workers compensation attorney North Carolina, workplace injury lawyer, denied workers comp claims, work accident attorney NC, Raleigh workers comp lawyer, Charlotte workplace injury attorney, Durham workers compensation, Greensboro work accident lawyer, Winston Salem comp attorney',
  openGraph: {
    title: "Best Workers' Comp Lawyers in North Carolina | Get Benefits Fast | Vasquez Law",
    description:
      "Expert NC workers' compensation attorneys with 60+ years experience. Get your benefits approved fast. Free consultation. We handle denied claims. Se habla español.",
    url: `https://www.vasquezlawfirm.com/practice-areas/workers-compensation`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/workers-compensation-hero.jpg',
        width: 1200,
        height: 630,
        alt: "Workers' Compensation Services in North Carolina",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best Workers' Comp Lawyers in North Carolina | Get Benefits Fast | Vasquez Law",
    description:
      "Expert NC workers' compensation attorneys with 60+ years experience. Get your benefits approved fast. Free consultation. We handle denied claims. Se habla español.",
    images: ['/images/practice-areas/workers-compensation-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/workers-compensation`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/workers-compensation`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/workers-compensation`,
    },
  },
};

export default function WorkersCompensationPage() {
  const services = [
    {
      title: "Workers' Comp Claim Filing",
      description:
        "We handle your entire workers' compensation claim from start to finish, ensuring all deadlines are met and paperwork is properly filed for maximum benefits.",
      features: [
        'Initial claim preparation',
        'Form 18 and Form 19 filing',
        'Employer notification',
        'Insurance company communication',
        'Deadline compliance',
        'Documentation gathering',
      ],
    },
    {
      title: 'Denied Claim Appeals',
      description:
        "Don't accept a denial. Our experienced attorneys know how to overturn wrongful denials and get you the benefits you deserve.",
      features: [
        'Denial reason analysis',
        'Appeal strategy development',
        'Industrial Commission hearings',
        'Evidence presentation',
        'Expert witness coordination',
        'Settlement negotiation',
      ],
    },
    {
      title: 'Disability Benefits',
      description:
        'Secure the disability benefits you need while unable to work. We fight for temporary and permanent disability compensation.',
      features: [
        'Temporary total disability',
        'Temporary partial disability',
        'Permanent partial disability',
        'Permanent total disability',
        'Disability rating disputes',
        'Vocational rehabilitation',
      ],
    },
    {
      title: 'Medical Treatment Authorization',
      description:
        'Get the medical care you need without delays. We force insurance companies to authorize necessary treatments and surgeries.',
      features: [
        'Treatment authorization',
        'Second opinion rights',
        'Specialist referrals',
        'Surgery approvals',
        'Physical therapy access',
        'Prescription coverage',
      ],
    },
    {
      title: 'Lost Wage Recovery',
      description:
        'Recover two-thirds of your average weekly wage while you heal. We ensure accurate calculations and timely payments.',
      features: [
        'Average weekly wage calculation',
        'Retroactive pay claims',
        'Ongoing benefit monitoring',
        'Cost of living adjustments',
        'Overtime inclusion',
        'Bonus consideration',
      ],
    },
    {
      title: 'Construction Site Injuries',
      description:
        'Construction workers face serious hazards daily. We specialize in securing maximum benefits for construction accident victims.',
      features: [
        'Fall from height claims',
        'Equipment accident cases',
        'Electrocution injuries',
        'Trench collapse claims',
        'Scaffolding accidents',
        'Third-party liability',
      ],
    },
    {
      title: 'Repetitive Stress Injuries',
      description:
        'Repetitive motions cause real injuries. We prove the connection between your work duties and conditions like carpal tunnel.',
      features: [
        'Carpal tunnel syndrome',
        'Tendinitis claims',
        'Back strain injuries',
        'Shoulder impingement',
        'Trigger finger',
        'Occupational arthritis',
      ],
    },
    {
      title: 'Occupational Disease Claims',
      description:
        'Work-related illnesses deserve compensation too. We handle claims for diseases caused by workplace exposure and conditions.',
      features: [
        'Asbestos exposure',
        'Chemical poisoning',
        'Hearing loss claims',
        'Respiratory diseases',
        'Skin conditions',
        'Infectious diseases',
      ],
    },
    {
      title: 'Death Benefits',
      description:
        'When workplace accidents claim lives, we help families secure death benefits and ensure financial stability during difficult times.',
      features: [
        'Dependency benefits',
        'Burial expenses',
        'Ongoing family support',
        'Minor children benefits',
        'Spouse compensation',
        'Estate coordination',
      ],
    },
  ];

  const faqs = [
    {
      question: "How much does a workers' comp lawyer cost?",
      answer:
        'We work on contingency - you pay nothing upfront. Our fee comes from your settlement or award, typically 25% or less as regulated by NC law.',
    },
    {
      question: 'Can I see my own doctor for a work injury?',
      answer:
        "Initially, you must see the employer's approved doctors. However, you may have rights to change doctors or get second opinions. We can help navigate this.",
    },
    {
      question: "What if my workers' comp claim was denied?",
      answer:
        "Don't give up! Many denials are wrongful. We have extensive experience overturning denials through appeals and hearings. Call us immediately.",
    },
    {
      question: "How long do I have to file a workers' comp claim in NC?",
      answer:
        'You must report injuries within 30 days and file Form 18 within 2 years. However, acting quickly is crucial for preserving evidence and witness testimony.',
    },
    {
      question: "Can I be fired for filing a workers' comp claim?",
      answer:
        "It's illegal for employers to retaliate against you for filing a legitimate workers' comp claim. If this happens, you may have additional legal remedies.",
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina's Trusted Workers' Compensation Attorneys"
        subtitle="Get Your Benefits Approved Fast - We Know How to Win"
        description="Injured at work? Don't let insurance companies deny your rightful benefits. With 60+ years fighting for injured workers, we get results when others can't."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why Choose Vasquez Law Firm for Workers' Comp?
              </h2>
              <p className="text-lg mb-6">
                Insurance companies have teams of lawyers protecting their profits. You need
                experienced fighters on your side. We level the playing field and get you the
                benefits you deserve.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Denied Claims Reversed</h3>
                  <p className="text-gray-300">
                    We've overturned thousands of wrongful denials. Don't accept
                    &quot;no&quot; as the final answer.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Maximum Benefits</h3>
                  <p className="text-gray-300">
                    We ensure accurate wage calculations and fight for every benefit you're
                    entitled to receive.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Medical Care Access</h3>
                  <p className="text-gray-300">
                    We force insurance companies to approve necessary treatments, surgeries, and
                    medications.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">No Upfront Costs</h3>
                  <p className="text-gray-300">
                    You pay nothing unless we win. Our fees are capped by law and come from your
                    settlement.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Injuries Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Common Workplace Injuries We Handle
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Back & Spine</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Herniated discs</li>
                    <li>• Spinal fractures</li>
                    <li>• Chronic back pain</li>
                    <li>• Sciatica</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Upper Body</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Rotator cuff tears</li>
                    <li>• Carpal tunnel</li>
                    <li>• Neck injuries</li>
                    <li>• Arm fractures</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Serious Injuries</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Brain injuries</li>
                    <li>• Amputations</li>
                    <li>• Burns</li>
                    <li>• Vision loss</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Our Workers' Comp Process
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Case Review</h3>
                    <p className="text-gray-300">
                      We evaluate your claim, explain your rights, and develop a winning strategy -
                      all at no cost.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Claim Filing & Management</h3>
                    <p className="text-gray-300">
                      We handle all paperwork, deadlines, and communications with employers and
                      insurers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Benefits Maximization</h3>
                    <p className="text-gray-300">
                      We fight for full wage replacement, complete medical coverage, and disability
                      ratings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Appeals & Hearings</h3>
                    <p className="text-gray-300">
                      If needed, we represent you at Industrial Commission hearings to secure your
                      benefits.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Industries Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Industries We Serve</h2>
              <p className="text-lg mb-8">
                Every worker deserves protection. We represent injured workers across all industries
                throughout North Carolina:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Construction</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Manufacturing</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Healthcare</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Transportation</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Retail</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Hospitality</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Agriculture</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Government</h3>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="workers-compensation-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: "Workers' Compensation Law Services - Vasquez Law Firm",
            description:
              "Expert workers' compensation legal services in North Carolina including claim filing, denied claim appeals, disability benefits, and workplace injury representation.",
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Workers Compensation Law',
            offers: {
              '@type': 'Offer',
              name: 'Free Consultation',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      {/* Local Business Structured Data */}
      <Script
        id="workers-compensation-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
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
    </>
  );
}
