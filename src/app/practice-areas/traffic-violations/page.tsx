import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Best Traffic Ticket Lawyers in NC | Save Your License | Vasquez Law Firm',
  description:
    'Expert traffic violation attorneys in North Carolina. Keep your license, avoid points, lower insurance. Speeding, reckless driving, CDL violations. Fast & affordable.',
  keywords:
    'traffic lawyer NC, speeding ticket attorney North Carolina, traffic violation lawyer, CDL ticket attorney, license restoration NC, Raleigh traffic lawyer, Charlotte speeding ticket attorney, Durham traffic court, Greensboro CDL lawyer, Winston Salem license attorney',
  openGraph: {
    title: 'Best Traffic Ticket Lawyers in NC | Save Your License | Vasquez Law Firm',
    description:
      'Expert traffic violation attorneys in North Carolina. Keep your license, avoid points, lower insurance. Speeding, reckless driving, CDL violations. Fast & affordable.',
    url: `https://www.vasquezlawfirm.com/practice-areas/traffic-violations`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/traffic-violations-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Traffic Violations Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Traffic Ticket Lawyers in NC | Save Your License | Vasquez Law Firm',
    description:
      'Expert traffic violation attorneys in North Carolina. Keep your license, avoid points, lower insurance. Speeding, reckless driving, CDL violations. Fast & affordable.',
    images: ['/images/practice-areas/traffic-violations-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/traffic-violations`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/traffic-violations`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/traffic-violations`,
    },
  },
};

export default function TrafficViolationsPage() {
  const services = [
    {
      title: 'Speeding Ticket Defense',
      description:
        'Fight speeding tickets to avoid points, increased insurance rates, and license suspension. We know how to challenge radar evidence and procedural errors.',
      features: [
        'Radar/laser challenges',
        'Speed trap defenses',
        'Equipment calibration issues',
        'Officer training verification',
        'Reduction negotiations',
        'Prayer for judgment continued',
      ],
    },
    {
      title: 'Reckless Driving Defense',
      description:
        'Reckless driving is a serious misdemeanor in NC. We work to reduce or dismiss charges that could result in jail time and permanent criminal records.',
      features: [
        'Speed-related reckless charges',
        'Aggressive driving defense',
        'Racing and competition charges',
        'Endangerment allegations',
        'Misdemeanor reduction',
        'License preservation',
      ],
    },
    {
      title: 'License Suspension/Restoration',
      description:
        'Lost your license? We help restore driving privileges through hearings, limited driving privileges, and challenging the basis for suspension.',
      features: [
        'DMV hearing representation',
        'Limited driving privileges',
        'Point system navigation',
        'Multiple offense strategies',
        'Out-of-state license issues',
        'Hardship license applications',
      ],
    },
    {
      title: 'CDL Violation Defense',
      description:
        "Commercial drivers can't afford tickets. We protect CDL holders from career-ending violations with specialized defense strategies.",
      features: [
        'DOT violation defense',
        'Logbook violations',
        'Weight limit issues',
        'Equipment violations',
        'CDL disqualification prevention',
        'Interstate commerce violations',
      ],
    },
    {
      title: 'Moving Violations',
      description:
        'From running red lights to improper lane changes, we defend against all moving violations to protect your record and insurance rates.',
      features: [
        'Red light violations',
        'Stop sign violations',
        'Improper lane change',
        'Following too closely',
        'Failure to yield',
        'Illegal passing',
      ],
    },
    {
      title: 'Insurance Point Prevention',
      description:
        'Even "minor" tickets can spike your insurance rates for years. We fight to keep points off your record and money in your pocket.',
      features: [
        'Point reduction strategies',
        'Insurance rate protection',
        'Safe driver status preservation',
        'Multiple ticket defense',
        'Out-of-state ticket handling',
        'Driver improvement programs',
      ],
    },
    {
      title: 'Hit & Run Defense',
      description:
        'Leaving the scene charges carry severe penalties. We provide aggressive defense to protect your freedom and driving privileges.',
      features: [
        'Property damage cases',
        'Personal injury incidents',
        'Failure to report accidents',
        'Witness identification issues',
        'Evidence challenges',
        'Felony charge reduction',
      ],
    },
    {
      title: 'DWI-Related Traffic Offenses',
      description:
        'Traffic violations connected to DWI charges require special attention. We coordinate defense strategies to minimize overall consequences.',
      features: [
        'Open container violations',
        'Driving after consuming',
        'License revocation issues',
        'Ignition interlock violations',
        'Limited privilege violations',
        'Underage alcohol offenses',
      ],
    },
    {
      title: 'Equipment & Registration',
      description:
        'Fix-it tickets and registration issues can escalate quickly. We help resolve these matters efficiently to avoid larger problems.',
      features: [
        'Expired registration',
        'No insurance charges',
        'Equipment violations',
        'Window tint citations',
        'Exhaust system violations',
        'Safety inspection issues',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Should I just pay my traffic ticket?',
      answer:
        'No! Paying a ticket is an admission of guilt that adds points to your license and increases insurance rates. Always consult an attorney first - we often get tickets reduced or dismissed.',
    },
    {
      question: 'How much does a traffic lawyer cost?',
      answer:
        'Our traffic ticket defense starts at very affordable rates, often less than the increased insurance costs from the ticket. We offer flat fees with no hidden costs.',
    },
    {
      question: 'Do I have to go to court?',
      answer:
        "In most cases, we can appear in court for you, saving you time and travel. You won't need to miss work or drive long distances.",
    },
    {
      question: 'Can you help with out-of-state licenses?',
      answer:
        'Yes! We regularly help out-of-state drivers with NC tickets. Most states share violation information, so NC tickets can affect your home state license.',
    },
    {
      question: 'What about CDL tickets?',
      answer:
        'CDL holders face stricter rules and harsher penalties. We specialize in protecting commercial driving privileges and understand DOT regulations.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina's Top Traffic Ticket Defense Firm"
        subtitle="Save Your License - Protect Your Insurance - Avoid Points"
        description="Don't let traffic tickets derail your life. With 60+ years of experience and offices across NC, we make fighting tickets easy and affordable."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Fight Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why Fight Your Traffic Ticket?
              </h2>
              <p className="text-lg mb-6">
                That &quot;simple&quot; speeding ticket can cost thousands in increased insurance
                rates, risk your license, and even affect employment. Don't just pay it - fight
                it with experienced attorneys who know how to win.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Save Your License</h3>
                  <p className="text-gray-300">
                    Multiple tickets can lead to suspension. We protect your driving privileges with
                    proven defense strategies.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Lower Insurance Rates</h3>
                  <p className="text-gray-300">
                    Even one ticket can increase rates by 30%+. We fight to keep points off your
                    record.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Convenient Representation</h3>
                  <p className="text-gray-300">
                    We appear in court for you. No missed work, no long drives, no hassle.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Affordable Flat Fees</h3>
                  <p className="text-gray-300">
                    Clear, upfront pricing that's often less than your insurance increase would
                    be.
                  </p>
                </div>
              </div>
            </section>

            {/* NC Points System */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Understanding NC's Point System
              </h2>
              <p className="text-lg mb-6">
                North Carolina uses both DMV points (affecting your license) and insurance points
                (affecting your rates). Here's what common violations cost:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">License Points</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Speeding 10 mph or less: 2 points</li>
                    <li>• Speeding 11-15 mph over: 3 points</li>
                    <li>• Speeding over 55 mph: 3 points</li>
                    <li>• Reckless driving: 4 points</li>
                    <li>• Following too closely: 4 points</li>
                    <li>• Running red light: 3 points</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-400">
                    12 points in 3 years = license suspension
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Insurance Points</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Speeding 10 mph or less: 1 point (30% increase)</li>
                    <li>• Speeding 11-15 mph over: 2 points (45% increase)</li>
                    <li>• Speeding over 55 mph: 2 points (45% increase)</li>
                    <li>• Reckless driving: 4 points (80% increase)</li>
                    <li>• At-fault accident: 3 points (60% increase)</li>
                    <li>• DWI: 12 points (340% increase)</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-400">Points stay on insurance for 3 years</p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Traffic Defense Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Ticket Review</h3>
                    <p className="text-gray-300">
                      Send us your ticket for a free evaluation. We'll explain your options and
                      likely outcomes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Flat Fee Quote</h3>
                    <p className="text-gray-300">
                      Get transparent, affordable pricing with no hidden fees or surprises.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">We Handle Everything</h3>
                    <p className="text-gray-300">
                      We appear in court, negotiate with prosecutors, and fight for the best
                      possible outcome.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Results Notification</h3>
                    <p className="text-gray-300">
                      We notify you immediately of the outcome and handle any necessary follow-up.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Coverage Area */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                We Handle Tickets in All NC Counties
              </h2>
              <p className="text-lg mb-8">
                Got a ticket anywhere in North Carolina? We've got you covered. Our attorneys
                regularly appear in traffic courts across all 100 counties.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Major Cities</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Raleigh</li>
                    <li>• Charlotte</li>
                    <li>• Durham</li>
                    <li>• Greensboro</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Highway Tickets</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• I-40</li>
                    <li>• I-85</li>
                    <li>• I-95</li>
                    <li>• I-77</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Rural Counties</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Small towns</li>
                    <li>• Speed traps</li>
                    <li>• County roads</li>
                    <li>• School zones</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Special Areas</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Military bases</li>
                    <li>• College campuses</li>
                    <li>• Work zones</li>
                    <li>• Federal property</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="traffic-violations-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Traffic Violations Law Services - Vasquez Law Firm',
            description:
              'Expert traffic ticket defense services in North Carolina including speeding tickets, reckless driving, license restoration, and CDL violations.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Traffic Law',
            offers: {
              '@type': 'Offer',
              name: 'Free Ticket Review',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      {/* Local Business Structured Data */}
      <Script
        id="traffic-violations-local-business"
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
