import { Metadata } from 'next';

import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Best Car Accident Lawyer in Greensboro, NC | 60+ Years Experience | Free Consultation',
  description:
    'Top-rated car accident lawyer serving Greensboro and Guilford County. 60+ years combined experience. Available 24/7. Free consultation. Se habla español. Call 1-844-YO-PELEO.',
  keywords:
    'Car Accident Lawyer Greensboro NC, auto accident attorney Greensboro, vehicle accident lawyer Greensboro, crash attorney Greensboro, Car Accident Lawyer near High Point, Car Accident Lawyer near Burlington, Car Accident Lawyer near Jamestown, Car Accident Lawyer near Summerfield',
  openGraph: {
    title: '#1 Car Accident Lawyer in Greensboro, North Carolina | Vasquez Law Firm',
    description:
      'Leading car accident lawyer in Greensboro. Serving all of Guilford County with 60+ years experience. Free consultation. No fees unless we win (PI/WC cases).',
    url: `https://www.vasquezlawfirm.com/locations/nc/greensboro/car-accident-lawyer`,
    images: [
      {
        url: '/images/locations/greensboro-office.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Greensboro Office',
      },
    ],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/locations/nc/greensboro/car-accident-lawyer`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/locations/nc/greensboro/car-accident-lawyer`,
      'es-ES': `https://www.vasquezlawfirm.com/es/ubicaciones/nc/greensboro/car-accident-lawyer`,
    },
  },
};
export default function GreensboroCarAccidentLawyerPage() {
  return (
    <>
      <LocationPageTemplate
        location="Greensboro"
        content={
          <div className="space-y-12">
            {/* Hero Section */}
            <section>
              <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
                Greensboro's Top Car Accident Lawyer - 60+ Years Winning Cases
              </h1>
              <p className="text-xl text-gray-700">
                When you need the best car accident lawyer in Greensboro, Guilford County, North
                Carolina, Vasquez Law Firm delivers results. With over 60 years of combined
                experience and thousands of successful cases, we're the law firm Greensboro
                residents trust most.
              </p>
            </section>
            {/* Local Expertise */}
            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Why Greensboro Chooses Vasquez Law Firm
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl mb-3 text-[#C9974D]">
                    Local Greensboro Expertise
                  </h3>
                  <ul className="space-y-2">
                    <li>✓ Deep knowledge of Guilford County courts and judges</li>
                    <li>✓ Relationships with local law enforcement and prosecutors</li>
                    <li>✓ Understanding of Greensboro community values</li>
                    <li>✓ Convenient location serving all 8 Greensboro zip codes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-3 text-[#C9974D]">
                    Serving All Nearby Areas
                  </h3>
                  <ul className="space-y-2">
                    <li>✓ High Point</li>
                    <li>✓ Burlington</li>
                    <li>✓ Jamestown</li>
                    <li>✓ Summerfield</li>
                  </ul>
                </div>
              </div>
            </section>
            {/* Service Areas */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Car Accident Lawyer Services in Greensboro
              </h2>
              <p className="text-lg mb-4">
                Our Greensboro car accident lawyers handle all types of cases throughout Guilford
                County:
              </p>
              <div className="bg-[#6B1F2E] text-white p-8 rounded-lg">
                <p className="text-lg mb-4">Serving all Greensboro zip codes:</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  <span className="text-[#C9974D]">27401</span>
                  <span className="text-[#C9974D]">27403</span>
                  <span className="text-[#C9974D]">27405</span>
                  <span className="text-[#C9974D]">27406</span>
                  <span className="text-[#C9974D]">27407</span>
                  <span className="text-[#C9974D]">27408</span>
                  <span className="text-[#C9974D]">27409</span>
                  <span className="text-[#C9974D]">27410</span>
                </div>
              </div>
            </section>
            {/* Local Stats */}
            <section className="bg-[#C9974D]/10 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Greensboro Success Stories</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">98%</div>
                  <div className="text-gray-700">Success Rate in Guilford County</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">5,000+</div>
                  <div className="text-gray-700">Greensboro Clients Helped</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">24/7</div>
                  <div className="text-gray-700">Available for Greensboro Emergencies</div>
                </div>
              </div>
            </section>
            {/* Court Information */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Guilford County Court Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold mb-2">Main Courthouse:</p>
                <p className="text-gray-700">201 S Eugene St, Greensboro, NC 27401</p>
                <p className="mt-4 text-gray-600">
                  Our car accident lawyers regularly appear in Guilford County courts and know the
                  local procedures inside and out.
                </p>
              </div>
            </section>
            {/* CTA Section */}
            <section className="bg-[#6B1F2E] text-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need a Car Accident Lawyer in Greensboro? Get Help Now!
              </h2>
              <p className="text-xl mb-6">
                Free consultation • Se habla español • No fees unless we win (PI/WC)
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:18449673536"
                  className="bg-[#C9974D] text-white px-8 py-3 rounded-md hover:bg-[#D4A574] transition-colors font-semibold text-lg"
                >
                  Call 1-844-YO-PELEO
                </a>
                <button className="bg-white text-[#6B1F2E] px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg">
                  Start Live Chat
                </button>
              </div>
            </section>
          </div>
        }
      />
      {/* Local Business Schema */}
      <Script
        id="greensboro-car-accident-lawyer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: `Vasquez Law Firm - Greensboro Car Accident Lawyer`,
            description: `Leading car accident lawyer serving Greensboro and Guilford County, North Carolina`,
            url: `https://www.vasquezlawfirm.com/locations/nc/greensboro/car-accident-lawyer`,
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greensboro',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            areaServed: [
              {
                '@type': 'City',
                name: 'Greensboro',
              },
              {
                '@type': 'City',
                name: 'High Point',
              },
              {
                '@type': 'City',
                name: 'Burlington',
              },
              {
                '@type': 'City',
                name: 'Jamestown',
              },
              {
                '@type': 'City',
                name: 'Summerfield',
              },
            ],
            priceRange: '$$',
          }),
        }}
      />
      {/* FAQ Schema for Local SEO */}
      <Script
        id="greensboro-car-accident-lawyer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `How much does a car accident lawyer cost in Greensboro, NC?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `At Vasquez Law Firm, we offer free consultations for all Greensboro residents. We provide transparent pricing and flexible payment plans.`,
                },
              },
              {
                '@type': 'Question',
                name: `What areas near Greensboro do you serve?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `We serve all of Guilford County including Greensboro, High Point, Burlington, Jamestown, Summerfield, and surrounding areas. With 60+ years of experience, we\'re the trusted choice throughout the region.`,
                },
              },
              {
                '@type': 'Question',
                name: `Do you speak Spanish in your Greensboro office?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Vasquez Law Firm offers fully bilingual services. Hablamos español y estamos aquí para ayudar a la comunidad hispana de Greensboro.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
