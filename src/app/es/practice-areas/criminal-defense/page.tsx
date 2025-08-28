import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Top Defensa Criminal Abogados in NC | Former Prosecutors | Vasquez Law Firm',
  description:
    'Aggressive criminal defense lawyers in North Carolina with 60+ years experience. Former prosecutors on your side. 24/7 availability. DWI, drugs, assault, federal crimes.',
  keywords:
    'criminal defense lawyer NC, criminal attorney North Carolina, DWI lawyer NC, drug crime attorney, assault defense lawyer, Raleigh criminal lawyer, Charlotte DWI attorney, Durham criminal defense, Greensboro drug lawyer, Winston Salem assault attorney',
  openGraph: {
    title: 'Top Defensa Criminal Abogados in NC | Former Prosecutors | Vasquez Law Firm',
    description:
      'Aggressive criminal defense lawyers in North Carolina with 60+ years experience. Former prosecutors on your side. 24/7 availability. DWI, drugs, assault, federal crimes.',
    url: `https://www.vasquezlawfirm.com/practice-areas/criminal-defense`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/criminal-defense-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa Criminal Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Defensa Criminal Abogados in NC | Former Prosecutors | Vasquez Law Firm',
    description:
      'Aggressive criminal defense lawyers in North Carolina with 60+ years experience. Former prosecutors on your side. 24/7 availability. DWI, drugs, assault, federal crimes.',
    images: ['/images/practice-areas/criminal-defense-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/criminal-defense`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/criminal-defense`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/criminal-defense`,
    },
  },
};

export default function CriminalDefensePage() {
  const services = [
    {
      title: 'DWI/DUI Defense',
      description:
        'Aggressive defense against drunk driving charges. Our experienced attorneys use proven strategies to protect your license, freedom, and future.',
      features: [
        'Field sobriety test challenges',
        'Breathalyzer accuracy disputes',
        'License restoration hearings',
        'First-time offender programs',
        'Felony DWI defense',
        'Underage DWI cases',
      ],
    },
    {
      title: 'Drug Crime Defense',
      description:
        'Expert defense for all drug charges from simple possession to trafficking. We focus on dismissals, reduced charges, and alternative sentencing options.',
      features: [
        'Possession charges',
        'Distribution and trafficking',
        'Manufacturing charges',
        'Prescription drug crimes',
        'Federal drug conspiracies',
        'Drug court programs',
      ],
    },
    {
      title: 'Assault & Violent Crimes',
      description:
        'Strategic defense for assault, battery, and violent crime charges. We build strong defenses focusing on self-defense, witness credibility, and evidence challenges.',
      features: [
        'Simple and aggravated assault',
        'Assault with deadly weapon',
        'Battery charges',
        'Robbery and armed robbery',
        'Kidnapping allegations',
        'Self-defense claims',
      ],
    },
    {
      title: 'Domestic Violence',
      description:
        'Sensitive and strategic handling of domestic violence cases. We protect your rights, reputation, and relationships while navigating these complex charges.',
      features: [
        'Protective order violations',
        'Assault on a female',
        'Child abuse allegations',
        'Stalking and harassment',
        'False accusation defense',
        'Anger management alternatives',
      ],
    },
    {
      title: 'Federal Crimes',
      description:
        'Experienced federal criminal defense with former federal prosecutors on our team. We handle complex federal cases with sophisticated defense strategies.',
      features: [
        'Federal drug conspiracies',
        'Wire and mail fraud',
        'Tax evasion and fraud',
        'Federal gun charges',
        'RICO violations',
        'Inmigración crimes',
      ],
    },
    {
      title: 'White Collar Crimes',
      description:
        'Sophisticated defense for financial and business crimes. Our attorneys understand complex financial matters and build strong defenses to protect your career and freedom.',
      features: [
        'Embezzlement charges',
        'Securities fraud',
        'Money laundering',
        'Identity theft',
        'Computer crimes',
        'Professional license defense',
      ],
    },
    {
      title: 'Sex Crimes Defense',
      description:
        'Discreet and aggressive defense for sex crime allegations. We protect your reputation while fighting for your freedom and future.',
      features: [
        'Sexual assault defense',
        'Statutory rape charges',
        'Internet sex crimes',
        'Sex offender registration',
        'Indecent exposure',
        'Child pornography defense',
      ],
    },
    {
      title: 'Theft & Property Crimes',
      description:
        'Comprehensive defense for theft and property crime charges. We work to minimize consequences and protect your record.',
      features: [
        'Shoplifting and larceny',
        'Breaking and entering',
        'Burglary charges',
        'Auto theft',
        'Receiving stolen property',
        'Vandalism and damage',
      ],
    },
    {
      title: 'Juvenile Crimes',
      description:
        'Protecting young futures with compassionate juvenile defense. We focus on rehabilitation and keeping cases out of adult court.',
      features: [
        'School-related offenses',
        'Underage drinking/drugs',
        'Juvenile assault',
        'Status offenses',
        'Transfer hearings',
        'Expungement services',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How much does a criminal defense lawyer cost in North Carolina?',
      answer:
        'At Vasquez Law Firm, we offer free consultations and flexible payment options. We provide transparent, competitive pricing with payment plans available.',
    },
    {
      question: 'Do you handle criminal defense cases throughout NC?',
      answer:
        'Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.',
    },
    {
      question: 'How quickly can I speak with a criminal defense attorney?',
      answer:
        'We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.',
    },
    {
      question: "What should I do if I'm arrested?",
      answer:
        'Exercise your right to remain silent, ask for an attorney immediately, and call us at 1-844-YO-PELEO. Do not discuss your case with anyone except your lawyer.',
    },
    {
      question: 'Can you help with expungements?',
      answer:
        'Yes! We help clients clear their criminal records through expungements when eligible, giving you a fresh start for employment and housing opportunities.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="NC's Most Aggressive Defensa Criminal Team"
        subtitle="Your Freedom Matters - Former Prosecutors Fighting for You"
        description="Facing criminal charges in North Carolina? Your future is on the line. With 60+ years of combined experience and former prosecutors on our team, we know how to protect your freedom."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why Choose Vasquez Law Firm for Defensa Criminal?
              </h2>
              <p className="text-lg mb-6">
                When your freedom is at stake, you need attorneys who understand both sides of the
                courtroom. Our team includes former prosecutors and judges who know exactly how the
                state builds cases - and how to defeat them.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Former Prosecutors</h3>
                  <p className="text-gray-300">
                    Our attorneys have prosecuted thousands of cases. Now we use that insider
                    knowledge to defend you.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">24/7 Emergency Response</h3>
                  <p className="text-gray-300">
                    Arrested at 2 AM? We answer. Time is critical in criminal cases, and we're
                    always available.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Trial-Ready Defense</h3>
                  <p className="text-gray-300">
                    While we negotiate aggressively, we prepare every case for trial. Prosecutors
                    know we fight.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Inmigración-Safe Strategies
                  </h3>
                  <p className="text-gray-300">
                    Criminal charges can affect immigration status. We protect both your freedom and
                    your future in America.
                  </p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Defense Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Immediate Response</h3>
                    <p className="text-gray-300">
                      We respond to your call 24/7 and can meet you at jail, court, or our office
                      immediately.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Case Investigation</h3>
                    <p className="text-gray-300">
                      We investigate every detail, interview witnesses, and challenge evidence to
                      build your defense.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Strategic Defense</h3>
                    <p className="text-gray-300">
                      Using our prosecutorial experience, we identify weaknesses and develop winning
                      strategies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Aggressive Representation</h3>
                    <p className="text-gray-300">
                      Whether negotiating dismissals or fighting at trial, we never stop protecting
                      your rights.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Defending Clients Across All 100 NC Counties
              </h2>
              <p className="text-lg mb-8">
                From the mountains to the coast, we provide expert criminal defense representation
                throughout North Carolina. No matter where you're charged, we're there.
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
        }
      />

      {/* Structured Data */}
      <Script
        id="criminal-defense-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Defensa Criminal Law Services - Vasquez Law Firm',
            description:
              'Aggressive criminal defense legal services in North Carolina including DWI/DUI, drug crimes, assault, and federal crimes defense.',
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Defensa Criminal Law',
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
        id="criminal-defense-local-business"
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
    </>
  );
}
