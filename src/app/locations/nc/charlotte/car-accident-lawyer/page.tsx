import { Metadata } from 'next';

import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Best Car Accident Lawyer in Charlotte, NC | 60+ Years Experience | Free Consultation',
  description:
    'Top-rated car accident lawyer serving Charlotte and Mecklenburg County. 60+ years combined experience. Available 24/7. Free consultation. Se habla español. Call 1-844-YO-PELEO.',
  keywords:
    'Car Accident Lawyer Charlotte NC, auto accident attorney Charlotte, vehicle accident lawyer Charlotte, crash attorney Charlotte, Car Accident Lawyer near Concord, Car Accident Lawyer near Gastonia, Car Accident Lawyer near Rock Hill, Car Accident Lawyer near Matthews, Car Accident Lawyer near Huntersville',
  openGraph: {
    title: '#1 Car Accident Lawyer in Charlotte, North Carolina | Vasquez Law Firm',
    description:
      'Leading car accident lawyer in Charlotte. Serving all of Mecklenburg County with 60+ years experience. Free consultation. No fees unless we win (PI/WC cases).',
    url: `https://www.vasquezlawfirm.com/locations/nc/charlotte/car-accident-lawyer`,
    images: [
      {
        url: '/images/locations/charlotte-office.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Charlotte Office',
      },
    ],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/locations/nc/charlotte/car-accident-lawyer`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/locations/nc/charlotte/car-accident-lawyer`,
      'es-ES': `https://www.vasquezlawfirm.com/es/ubicaciones/nc/charlotte/car-accident-lawyer`,
    },
  },
};
export default function CharlotteCarAccidentLawyerPage() {
  return (
    <>
      <LocationPageTemplate
        location="Charlotte"
        content={
          <div className="space-y-12">
            {/* Hero Section */}
            <section>
              <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
                Charlotte's Top Car Accident Lawyer - 60+ Years Winning Cases
              </h1>
              <p className="text-xl text-gray-700">
                When you need the best car accident lawyer in Charlotte, Mecklenburg County, North
                Carolina, Vasquez Law Firm delivers results. With over 60 years of combined
                experience and thousands of successful cases, we're the law firm Charlotte
                residents trust most.
              </p>
            </section>
            {/* Local Expertise */}
            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Why Charlotte Chooses Vasquez Law Firm
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl mb-3 text-[#C9974D]">
                    Local Charlotte Expertise
                  </h3>
                  <ul className="space-y-2">
                    <li>✓ Deep knowledge of Mecklenburg County courts and judges</li>
                    <li>✓ Relationships with local law enforcement and prosecutors</li>
                    <li>✓ Understanding of Charlotte community values</li>
                    <li>✓ Convenient location serving all 8 Charlotte zip codes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-3 text-[#C9974D]">
                    Serving All Nearby Areas
                  </h3>
                  <ul className="space-y-2">
                    <li>✓ Concord</li>
                    <li>✓ Gastonia</li>
                    <li>✓ Rock Hill</li>
                    <li>✓ Matthews</li>
                    <li>✓ Huntersville</li>
                  </ul>
                </div>
              </div>
            </section>
            {/* Service Areas */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Car Accident Lawyer Services in Charlotte
              </h2>
              <p className="text-lg mb-4">
                Our Charlotte car accident lawyers handle all types of cases throughout Mecklenburg
                County:
              </p>
              <div className="bg-[#6B1F2E] text-white p-8 rounded-lg">
                <p className="text-lg mb-4">Serving all Charlotte zip codes:</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  <span className="text-[#C9974D]">28202</span>
                  <span className="text-[#C9974D]">28203</span>
                  <span className="text-[#C9974D]">28204</span>
                  <span className="text-[#C9974D]">28205</span>
                  <span className="text-[#C9974D]">28207</span>
                  <span className="text-[#C9974D]">28208</span>
                  <span className="text-[#C9974D]">28209</span>
                  <span className="text-[#C9974D]">28210</span>
                </div>
              </div>
            </section>
            {/* Local Stats */}
            <section className="bg-[#C9974D]/10 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Charlotte Success Stories</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">98%</div>
                  <div className="text-gray-700">Success Rate in Mecklenburg County</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">5,000+</div>
                  <div className="text-gray-700">Charlotte Clients Helped</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">24/7</div>
                  <div className="text-gray-700">Available for Charlotte Emergencies</div>
                </div>
              </div>
            </section>
            {/* Court Information */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Mecklenburg County Court Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold mb-2">Main Courthouse:</p>
                <p className="text-gray-700">832 E 4th St, Charlotte, NC 28202</p>
                <p className="mt-4 text-gray-600">
                  Our car accident lawyers regularly appear in Mecklenburg County courts and know
                  the local procedures inside and out.
                </p>
              </div>
            </section>
            {/* CTA Section */}
            <section className="bg-[#6B1F2E] text-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need a Car Accident Lawyer in Charlotte? Get Help Now!
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
        id="charlotte-car-accident-lawyer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: `Vasquez Law Firm - Charlotte Car Accident Lawyer`,
            description: `Leading car accident lawyer serving Charlotte and Mecklenburg County, North Carolina`,
            url: `https://www.vasquezlawfirm.com/locations/nc/charlotte/car-accident-lawyer`,
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Charlotte',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            areaServed: [
              {
                '@type': 'City',
                name: 'Charlotte',
              },
              {
                '@type': 'City',
                name: 'Concord',
              },
              {
                '@type': 'City',
                name: 'Gastonia',
              },
              {
                '@type': 'City',
                name: 'Rock Hill',
              },
              {
                '@type': 'City',
                name: 'Matthews',
              },
              {
                '@type': 'City',
                name: 'Huntersville',
              },
            ],
            priceRange: '$$',
          }),
        }}
      />
      {/* FAQ Schema for Local SEO */}
      <Script
        id="charlotte-car-accident-lawyer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `How much does a car accident lawyer cost in Charlotte, NC?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `At Vasquez Law Firm, we offer free consultations for all Charlotte residents. We provide transparent pricing and flexible payment plans.`,
                },
              },
              {
                '@type': 'Question',
                name: `What areas near Charlotte do you serve?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `We serve all of Mecklenburg County including Charlotte, Concord, Gastonia, Rock Hill, Matthews, Huntersville, and surrounding areas. With 60+ years of experience, we\'re the trusted choice throughout the region.`,
                },
              },
              {
                '@type': 'Question',
                name: `Do you speak Spanish in your Charlotte office?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Vasquez Law Firm offers fully bilingual services. Hablamos español y estamos aquí para ayudar a la comunidad hispana de Charlotte.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
