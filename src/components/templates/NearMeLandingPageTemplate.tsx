import React from 'react';
import Script from 'next/script';
import Link from 'next/link';
import {
  generateEnhancedLocalBusinessSchema,
  generateServiceSchema,
  generateEnhancedFAQSchema,
  generateEnhancedBreadcrumbSchema,
  generateReviewSchema,
} from '@/lib/seo/comprehensive-schema';

interface NearMeLandingPageProps {
  service: string; // e.g., "Immigration Lawyer"
  location: string; // e.g., "Charlotte"
  state: string; // e.g., "NC"
  content: {
    heroTitle: string;
    heroDescription: string;
    whyChooseUs: string[];
    services: Array<{
      title: string;
      description: string;
      link: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
    testimonials: Array<{
      author: string;
      rating: number;
      text: string;
      date: string;
    }>;
    nearbyAreas: string[];
    emergencyContact: string;
    officeAddress?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
}

export function NearMeLandingPageTemplate({
  service,
  location,
  state,
  content,
}: NearMeLandingPageProps) {
  // Generate all schemas
  const breadcrumbSchema = generateEnhancedBreadcrumbSchema([
    { name: 'Home', url: 'https://www.vasquezlawnc.com' },
    { name: 'Locations', url: 'https://www.vasquezlawnc.com/locations' },
    {
      name: `${location}, ${state}`,
      url: `https://www.vasquezlawnc.com/locations/${state.toLowerCase()}/${location.toLowerCase()}`,
    },
    {
      name: `${service} Near Me`,
      url: `https://www.vasquezlawnc.com/near-me/${location.toLowerCase()}-${service.toLowerCase().replace(/ /g, '-')}`,
    },
  ]);

  const localBusinessSchema = generateEnhancedLocalBusinessSchema({
    name: `Vasquez Law Firm - ${service} ${location}`,
    address: content.officeAddress || {
      street: 'Serving all of',
      city: location,
      state: state,
      zip: '',
    },
    phone: content.emergencyContact,
    amenities: [
      'Free Consultation',
      'Spanish Speaking Staff',
      '24/7 Emergency Service',
      'Virtual Consultations',
      'Payment Plans Available',
    ],
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Payment Plans'],
  });

  const serviceSchema = generateServiceSchema({
    name: `${service} Services in ${location}`,
    description: content.heroDescription,
    provider: 'Vasquez Law Firm, PLLC',
    areaServed: [location, ...content.nearbyAreas],
    availableLanguages: ['English', 'Spanish'],
    url: `https://www.vasquezlawnc.com/near-me/${location.toLowerCase()}-${service.toLowerCase().replace(/ /g, '-')}`,
    priceRange: '$$',
    hasOfferCatalog: content.services.map(s => ({
      name: s.title,
      description: s.description,
    })),
  });

  const faqSchema = generateEnhancedFAQSchema(
    content.faqs.map(faq => ({
      ...faq,
      category: `${service} in ${location}`,
    }))
  );

  const reviewSchema = generateReviewSchema(content.testimonials);

  const allSchemas = [
    breadcrumbSchema,
    localBusinessSchema,
    serviceSchema,
    faqSchema,
    reviewSchema,
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section with Local Intent */}
        <section className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{content.heroTitle}</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">{content.heroDescription}</p>

            {/* Immediate CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={`tel:${content.emergencyContact.replace(/\D/g, '')}`}

                className="bg-[#C9974D] hover:bg-[#D4A574] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center justify-center"
              >
                📞 Call Now: {content.emergencyContact}
              </a>
              <button className="bg-white text-[#6B1F2E] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                💬 Start Live Chat
              </button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">60+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">30K+</div>
                <div className="text-sm">Cases Won</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm">Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-sm">Google Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Local Focus */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B1F2E] mb-8 text-center">
              Why {location} Residents Choose Vasquez Law Firm
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.whyChooseUs.map((reason, index) => (
                <div key={index}

                className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-[#C9974D] text-2xl mb-3">✓</div>
                  <p
                className="text-gray-700">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B1F2E] mb-8 text-center">
              Our {service} Services in {location}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.services.map((service, index) => (
                <div
                  key={index}

                className="bg-white border-2 border-gray-200 hover:border-[#C9974D] rounded-lg p-6 transition-colors"
                >
                  <h3
                className="text-xl font-bold text-[#6B1F2E] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    href={service.link}

                className="text-[#C9974D] font-semibold hover:text-[#D4A574] inline-flex items-center"
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-[#6B1F2E] text-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What {location} Clients Say About Us
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.testimonials.map((testimonial, index) => (
                <div key={index}

                className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div
                className="text-[#C9974D]">{'★'.repeat(testimonial.rating)}</div>
                    <span className="ml-2 text-sm opacity-75">{testimonial.date}</span>
                  </div>
                  <p className="mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="font-semibold">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-4 speakable-content">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B1F2E] mb-8 text-center speakable-headline">
              Frequently Asked Questions About {service}s in {location}
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {content.faqs.map((faq, index) => (
                <div key={index}

                className="bg-white rounded-lg shadow-md p-6">
                  <h3
                className="text-xl font-semibold text-[#6B1F2E] mb-3 speakable-summary">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B1F2E] mb-8 text-center">
              Also Serving {service} Needs Near {location}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              {content.nearbyAreas.map((area, index) => (
                <Link
                  key={index}

                href={`/locations/${state.toLowerCase()}/${area.toLowerCase().replace(/ /g, '-')}`}

                className="bg-white hover:bg-[#6B1F2E] hover:text-white rounded-lg p-4 transition-colors shadow-md"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-[#C9974D] text-white text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a {service} Near You in {location}?
            </h2>
            <p className="text-xl mb-8">
              Don't wait - North Carolina law has strict deadlines. Get your FREE consultation
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${content.emergencyContact.replace(/\D/g, '')}`}

                className="bg-white text-[#C9974D] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center justify-center"
              >
                📞 Call {content.emergencyContact}
              </a>
              <button className="bg-[#6B1F2E] hover:bg-[#8B2635] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                📍 Get Directions
              </button>
            </div>
            <p className="mt-6 text-sm opacity-90">
              Available 24/7 • Free Consultation • Se Habla Español
            </p>
          </div>
        </section>
      </div>

      {/* Schema Markup */}
      <Script
        id="near-me-schemas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allSchemas),
        }}
      />
    </>
  );
}
