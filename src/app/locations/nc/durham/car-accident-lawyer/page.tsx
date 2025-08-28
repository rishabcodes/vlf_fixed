import { Metadata } from 'next';

import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Best Car Accident Lawyer in Durham, NC | 60+ Years Experience | Free Consultation',
  description:
    'Top-rated car accident lawyer serving Durham and Durham County. 60+ years combined experience. Available 24/7. Free consultation. Se habla español. Call 1-844-YO-PELEO.',
  keywords:
    'Car Accident Lawyer Durham NC, auto accident attorney Durham, vehicle accident lawyer Durham, crash attorney Durham, Car Accident Lawyer near Chapel Hill, Car Accident Lawyer near Morrisville, Car Accident Lawyer near Research Triangle Park, Car Accident Lawyer near Hillsborough',
  openGraph: {
    title: '#1 Car Accident Lawyer in Durham, North Carolina | Vasquez Law Firm',
    description:
      'Leading car accident lawyer in Durham. Serving all of Durham County with 60+ years experience. Free consultation. No fees unless we win (PI/WC cases).',
    url: `https://www.vasquezlawfirm.com/locations/nc/durham/car-accident-lawyer`,
    images: [
      {
        url: '/images/locations/durham-office.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Durham Office',
      },
    ],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/locations/nc/durham/car-accident-lawyer`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/locations/nc/durham/car-accident-lawyer`,
      'es-ES': `https://www.vasquezlawfirm.com/es/ubicaciones/nc/durham/car-accident-lawyer`,
    },
  },
};
export default function DurhamCarAccidentLawyerPage() {
  return (
    <>
      <LocationPageTemplate
        location="Durham"
        content={
          <div className="space-y-12">
            {/* Hero Section */}
            <section>
              <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
                Durham's Top Car Accident Lawyer - 60+ Years Winning Cases
              </h1>
              <p className="text-xl text-gray-700">
                When you need the best car accident lawyer in Durham, Durham County, North Carolina,
                Vasquez Law Firm delivers results. With over 60 years of combined experience and
                thousands of successful cases, we're the law firm Durham residents trust most.
              </p>
            </section>
            {/* Local Expertise */}
            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Why Durham Chooses Vasquez Law Firm
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl mb-3 text-[#C9974D]">
                    Local Durham Expertise
                  </h3>
                  <ul className="space-y-2">
                    <li>✓ Deep knowledge of Durham County courts and judges</li>
                    <li>✓ Relationships with local law enforcement and prosecutors</li>
                    <li>✓ Understanding of Durham community values</li>
                    <li>✓ Convenient location serving all 8 Durham zip codes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-3 text-[#C9974D]">
                    Serving All Nearby Areas
                  </h3>
                  <ul className="space-y-2">
                    <li>✓ Chapel Hill</li>
                    <li>✓ Morrisville</li>
                    <li>✓ Research Triangle Park</li>
                    <li>✓ Hillsborough</li>
                  </ul>
                </div>
              </div>
            </section>
            {/* Service Areas */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Car Accident Lawyer Services in Durham
              </h2>
              <p className="text-lg mb-4">
                Our Durham car accident lawyers handle all types of cases throughout Durham County:
              </p>
              <div className="bg-[#6B1F2E] text-white p-8 rounded-lg">
                <p className="text-lg mb-4">Serving all Durham zip codes:</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  <span className="text-[#C9974D]">27701</span>
                  <span className="text-[#C9974D]">27703</span>
                  <span className="text-[#C9974D]">27704</span>
                  <span className="text-[#C9974D]">27705</span>
                  <span className="text-[#C9974D]">27707</span>
                  <span className="text-[#C9974D]">27709</span>
                  <span className="text-[#C9974D]">27712</span>
                  <span className="text-[#C9974D]">27713</span>
                </div>
              </div>
            </section>
            {/* Local Stats */}
            <section className="bg-[#C9974D]/10 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Durham Success Stories</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">98%</div>
                  <div className="text-gray-700">Success Rate in Durham County</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">5,000+</div>
                  <div className="text-gray-700">Durham Clients Helped</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">24/7</div>
                  <div className="text-gray-700">Available for Durham Emergencies</div>
                </div>
              </div>
            </section>
            {/* Court Information */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Durham County Court Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold mb-2">Main Courthouse:</p>
                <p className="text-gray-700">510 S Dillard St, Durham, NC 27701</p>
                <p className="mt-4 text-gray-600">
                  Our car accident lawyers regularly appear in Durham County courts and know the
                  local procedures inside and out.
                </p>
              </div>
            </section>
            {/* CTA Section */}
            <section className="bg-[#6B1F2E] text-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need a Car Accident Lawyer in Durham? Get Help Now!
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
        id="durham-car-accident-lawyer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: `Vasquez Law Firm - Durham Car Accident Lawyer`,
            description: `Leading car accident lawyer serving Durham and Durham County, North Carolina`,
            url: `https://www.vasquezlawfirm.com/locations/nc/durham/car-accident-lawyer`,
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Durham',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            areaServed: [
              {
                '@type': 'City',
                name: 'Durham',
              },
              {
                '@type': 'City',
                name: 'Chapel Hill',
              },
              {
                '@type': 'City',
                name: 'Morrisville',
              },
              {
                '@type': 'City',
                name: 'Research Triangle Park',
              },
              {
                '@type': 'City',
                name: 'Hillsborough',
              },
            ],
            priceRange: '$$',
          }),
        }}
      />
      {/* FAQ Schema for Local SEO */}
      <Script
        id="durham-car-accident-lawyer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `How much does a car accident lawyer cost in Durham, NC?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `At Vasquez Law Firm, we offer free consultations for all Durham residents. We provide transparent pricing and flexible payment plans.`,
                },
              },
              {
                '@type': 'Question',
                name: `What areas near Durham do you serve?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `We serve all of Durham County including Durham, Chapel Hill, Morrisville, Research Triangle Park, Hillsborough, and surrounding areas. With 60+ years of experience, we\'re the trusted choice throughout the region.`,
                },
              },
              {
                '@type': 'Question',
                name: `Do you speak Spanish in your Durham office?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Vasquez Law Firm offers fully bilingual services. Hablamos español y estamos aquí para ayudar a la comunidad hispana de Durham.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
