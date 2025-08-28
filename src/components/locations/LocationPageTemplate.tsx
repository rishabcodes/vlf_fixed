'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LocalPageData } from '@/lib/seo/local-seo-generator';

interface LocationPageProps {
  data: LocalPageData;
  schemas: {
    localBusiness: Record<string, unknown>;
    breadcrumbs: Record<string, unknown>;
    faqs: Record<string, unknown>;
    reviews: Array<Record<string, unknown>>;
  };
}

export function LocationPageTemplate({ data, schemas }: LocationPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqs) }}
      />
      {schemas.reviews.map((review, index) => (
        <script
          key={index}

                type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(review) }}
        />
      ))}

      <div className="min-h-screen bg-white">
        {/* Hero Section with Local Focus */}
        <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[url('/images/nc-map-pattern.svg')] bg-repeat"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {data.city} Immigration Lawyer & Personal Injury Attorney
              </h1>
              <p className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto">
                Top-Rated Legal Representation in {data.county} County, NC •{' '}
                {data.localStats.casesHandled} Cases Won • Available 24/7
              </p>
              <p className="text-lg mb-8 font-semibold">
                &ldquo;YO PELEO POR TI™&rdquo; - Serving {data.city} for {data.localStats.yearsServing} Years
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1-844-967-3536"
                  className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105 text-xl"
                >
                  Call Now: 1-844-YO-PELEO
                </a>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Free Case Evaluation
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">✓ Free Consultation</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">✓ Se Habla Español</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  ✓ Payment Plans Available
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  ✓ {data.localStats.responseTime} Response
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators Bar */}
        <section className="bg-[#C9974D] text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">{data.population}</p>
                <p className="text-sm">Population Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{data.localStats.casesHandled}</p>
                <p className="text-sm">Cases Won in {data.county} County</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{data.localStats.yearsServing}</p>
                <p className="text-sm">Years Serving {data.city}</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{data.localStats.clientRating}★</p>
                <p className="text-sm">Client Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm">Emergency Availability</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions for Local Searches */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-8">
              How Can We Help You in {data.city}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.practiceAreaFocus.map((area, index) => (
                <Link
                  key={index}

                href={`/practice-areas/${area.toLowerCase().replace(/\s+/g, '-')}`}

                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {area === 'Immigration Law' && '🌎'}
                    {area === 'Personal Injury' && '🚗'}
                    {area === 'Criminal Defense' && '⚖️'}
                    {area === 'Workers Compensation' && '👷'}
                    {area === 'Family Law' && '👨‍👩‍👧‍👦'}
                    {area === 'Traffic Violations' && '🚦'}
                  </div>
                  <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">{area}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Expert {area.toLowerCase()} representation in {data.county} County courts
                  </p>
                  <span className="text-[#C9974D] font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tabbed Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'courts', 'practice-areas', 'testimonials'].map(tab => (
                  <button
                    key={tab}

                onClick={() => setActiveTab(tab)}

                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-[#C9974D] text-[#6B1F2E]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
                      Why Choose Vasquez Law Firm in {data.city}?
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="text-2xl mr-4">📍</span>
                        <div>
                          <h4 className="font-bold text-[#6B1F2E]">Local Expertise</h4>
                          <p className="text-gray-700">
                            Deep knowledge of {data.county} County courts, judges, and legal
                            procedures. Our attorneys regularly practice in{' '}
                            {data.courtInfo.superior} and {data.courtInfo.district}.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-4">🗣️</span>
                        <div>
                          <h4 className="font-bold text-[#6B1F2E]">Bilingual Services</h4>
                          <p className="text-gray-700">
                            Full legal services in English and Spanish for {data.city}'s diverse
                            community. All documents translated, interpreters available for all
                            meetings.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-4">⚡</span>
                        <div>
                          <h4 className="font-bold text-[#6B1F2E]">Rapid Response</h4>
                          <p className="text-gray-700">
                            {data.localStats.responseTime} average response time for {data.city}{' '}
                            clients. 24/7 emergency legal help for arrests, accidents, and urgent
                            immigration matters.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-4">💰</span>
                        <div>
                          <h4 className="font-bold text-[#6B1F2E]">Affordable & Transparent</h4>
                          <p className="text-gray-700">
                            Clear flat fees, payment plans available. No hidden costs. Free
                            consultations for all {data.city} residents.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#6B1F2E] mb-6">
                      Serving {data.city} & Surrounding Areas
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-bold text-[#6B1F2E] mb-3">We Also Serve:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {data.nearbyCity.map((city, index) => (
                          <Link
                            key={index}

                href={`/locations/nc/${city.toLowerCase().replace(/\s+/g, '-')}`}

                className="text-[#C9974D] hover:underline"
                          >
                            • {city}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 bg-[#6B1F2E] text-white rounded-lg p-6">
                      <h4 className="font-bold text-xl mb-3">Emergency Legal Help</h4>
                      <p className="mb-4">
                        Arrested? In an accident? Facing deportation? We're available 24/7 for{' '}
                        {data.city} residents.
                      </p>
                      <a
                        href="tel:1-844-967-3536"
                        className="inline-block bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold px-6 py-3 rounded-lg transition-all"
                      >
                        Call Now: 1-844-YO-PELEO
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courts' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
                    {data.county} County Court Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">
                        Local Courts We Practice In
                      </h3>
                      <ul className="space-y-3">
                        <li>
                          <strong>Superior Court:</strong> {data.courtInfo.superior}
                        </li>
                        <li>
                          <strong>District Court:</strong> {data.courtInfo.district}
                        </li>
                        {data.courtInfo.federal && (
                          <li>
                            <strong>Federal Court:</strong> {data.courtInfo.federal}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">
                        Common Legal Issues in {data.city}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Immigration cases and ICE enforcement</li>
                        <li>• DWI/DUI arrests and traffic violations</li>
                        <li>• Personal injury from I-40/I-85 accidents</li>
                        <li>• Workers' compensation claims</li>
                        <li>• Family law and custody disputes</li>
                        <li>• Criminal charges and arrests</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'practice-areas' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
                    Legal Services Tailored for {data.city} Residents
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.practiceAreaFocus.map((area, index) => (
                      <div
                        key={index}

                className="bg-white border-l-4 border-[#C9974D] shadow-lg p-6"
                      >
                        <h3
                className="text-xl font-bold text-[#6B1F2E] mb-3">{area}</h3>
                        <p className="text-gray-700 mb-4">{getAreaDescription(area, data.city)}</p>
                        <Link
                          href={`/practice-areas/${area.toLowerCase().replace(/\s+/g, '-')}`}

                className="text-[#C9974D] font-semibold hover:underline"
                        >
                          Learn More About {area} →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-8">
                    What {data.city} Clients Say About Us
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {getLocalTestimonials(data.city).map((testimonial, index) => (
                      <div key={index}

                className="bg-white rounded-lg shadow-lg p-6">
                        <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                        <p
                className="text-gray-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                        <p className="font-semibold text-[#6B1F2E]">- {testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.case}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Local SEO Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#6B1F2E] mb-8">
              Leading {data.city} Law Firm for Immigration & Personal Injury
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                When you need a lawyer in {data.city}, North Carolina, Vasquez Law Firm stands ready
                to fight for you. With over {data.localStats.yearsServing} years serving{' '}
                {data.county} County, we've built a reputation as the go-to law firm for
                immigration, personal injury, workers' compensation, and criminal defense cases.
              </p>
              <p>
                Our {data.city} legal team understands the unique challenges facing our community.
                Whether you're dealing with immigration issues, recovering from an accident, or
                facing criminal charges, we provide aggressive representation with a personal touch.
                We've successfully handled {data.localStats.casesHandled} cases for {data.city} area
                residents.
              </p>
              <h3 className="text-2xl font-bold text-[#6B1F2E] mt-8 mb-4">
                Why We're {data.city}'s Top Choice for Legal Representation
              </h3>
              <ul>
                <li>
                  <strong>Local Experience:</strong> Regular practice in {data.courtInfo.superior}{' '}
                  and {data.courtInfo.district}
                </li>
                <li>
                  <strong>Bilingual Service:</strong> Full legal services in English and Spanish
                </li>
                <li>
                  <strong>24/7 Availability:</strong> Emergency legal help when you need it most
                </li>
                <li>
                  <strong>Proven Results:</strong> {data.localStats.casesHandled} successful cases
                  in {data.county} County
                </li>
                <li>
                  <strong>Community Trust:</strong> {data.localStats.clientRating} star rating from
                  local clients
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#6B1F2E] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Get the Legal Help You Deserve in {data.city}
            </h2>
            <p className="text-xl mb-8">
              Don't wait to get the representation you need. Our {data.city} attorneys are ready to
              fight for your rights. Free consultation • Se habla español • Payment plans available
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-967-3536"
                className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105 text-xl"
              >
                Call Now: 1-844-YO-PELEO
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
              >
                Schedule Free Consultation
              </Link>
            </div>
            <p className="mt-8 text-sm">
              Serving {data.city}, {data.nearbyCity.join(', ')}, and all of {data.county} County
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function getAreaDescription(area: string, city: string): string {
  const descriptions: Record<string, string> = {
    'Immigration Law': `Comprehensive immigration services for ${city} residents including green cards, citizenship, work visas, and deportation defense. Our bilingual team guides you through every step.`,
    'Personal Injury': `Injured in ${city}? We fight insurance companies to get you maximum compensation for car accidents, slip and falls, and other injuries. No fees unless we win.`,
    'Criminal Defense': `Facing criminal charges in ${city}? Our experienced defense attorneys protect your rights and freedom. Available 24/7 for arrests and emergencies.`,
    'Workers Compensation': `Hurt at work in ${city}? We ensure you get the medical care and compensation you deserve. Don't let employers deny your rightful benefits.`,
    'Family Law': `Compassionate family law representation for ${city} residents. Divorce, custody, support, and protection orders handled with care and expertise.`,
    'Traffic Violations': `Don't just pay that ticket! Our ${city} traffic attorneys can reduce or dismiss charges, saving your license and insurance rates.`,
  };
  return (
    descriptions[area] || `Expert ${area.toLowerCase()} services for ${city} and surrounding areas.`
  );
}

function getLocalTestimonials(city: string) {
  return [
    {
      author: `Maria G., ${city}`,
      text: `Mr. Vasquez helped me get my green card after years of waiting. He explained everything in Spanish and made the process so much easier. I highly recommend him to anyone in ${city}!`,
      case: 'Immigration Case',
    },
    {
      author: `James T., ${city}`,
      text: `Got arrested for DWI. Vasquez Law Firm got my charges reduced and saved my license. They really know the local courts. Worth every penny!`,
      case: 'Criminal Defense',
    },
    {
      author: `Sarah L., ${city}`,
      text: `After my car accident, they handled everything with the insurance company. Got me a settlement I never expected. Thank you so much!`,
      case: 'Personal Injury',
    },
  ];
}
