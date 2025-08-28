'use client';

import React from 'react';
import { Button } from '@/design-system/components/Button';

import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  Globe,
  Users,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import {
  generateEnhancedLocalBusinessSchema,
  generateEnhancedBreadcrumbSchema,
} from '@/lib/seo/comprehensive-schema';
import Script from 'next/script';

interface NeighborhoodPageTemplateProps {
  neighborhood: {
    name: string;
    slug: string;
    city: string;
    citySlug: string;
    zipCodes: string[];
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    localFeatures: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    practiceAreas: Array<{
      name: string;
      description: string;
      localNote: string;
    }>;
    localKnowledge: {
      landmarks: string[];
      demographics: {
        population: string;
        medianIncome: string;
        diversity: string;
      };
      commonIssues: string[];
      nearbyServices: Array<{
        name: string;
        distance: string;
        type: string;
      }>;
    };
    testimonials: Array<{
      author: string;
      location: string;
      text: string;
      rating: number;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

const IconMap = {
  MapPin,
  Clock,
  Users,
  Globe,
  Shield,
  CheckCircle,
};

// Practice area slug mapping
const practiceAreaSlugs: Record<string, string> = {
  'Immigration Law': 'immigration',
  'Personal Injury': 'personal-injury',
  'Workers Compensation': 'workers-compensation',
  'Criminal Defense': 'criminal-defense',
  'Family Law': 'family-law',
};

export function NeighborhoodPageTemplate({ neighborhood, content }: NeighborhoodPageTemplateProps) {
  // Generate breadcrumb schema
  const breadcrumbSchema = generateEnhancedBreadcrumbSchema([
    { name: 'Home', url: 'https://www.vasquezlawnc.com' },
    { name: 'Locations', url: 'https://www.vasquezlawnc.com/locations' },
    {
      name: neighborhood.city,
      url: `https://www.vasquezlawnc.com/locations/nc/${neighborhood.citySlug}`,
    },
    {
      name: 'Neighborhoods',
      url: `https://www.vasquezlawnc.com/locations/nc/${neighborhood.citySlug}/neighborhoods`,
    },
    {
      name: neighborhood.name,
      url: `https://www.vasquezlawnc.com/locations/nc/${neighborhood.citySlug}/neighborhoods/${neighborhood.slug}`,
    },
  ]);

  // Generate local business schema
  const localBusinessSchema = generateEnhancedLocalBusinessSchema({
    name: `Vasquez Law Firm - Serving ${neighborhood.name}`,
    address: {
      street: `Serving ${neighborhood.name} area`,
      city: neighborhood.city,
      state: 'NC',
      zip: neighborhood.zipCodes[0] || '',
    },
    phone: '+1-844-967-3536',
    amenities: [
      'Free Parking',
      'Wheelchair Accessible',
      'Spanish Speaking Staff',
      '24/7 Availability',
    ],
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Payment Plans'],
  });

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div
               }}
              >
                <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">
                  {content.heroTitle}
                </h1>
                <p className="text-xl md:text-2xl mb-4 font-semibold text-primary">
                  {content.heroSubtitle}
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                  {content.heroDescription}
                </p>

                {/* ZIP Codes */}
                <div className="mb-8">
                  <p className="text-sm text-gray-400 mb-2">Proudly Serving ZIP Codes:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {neighborhood.zipCodes.map(zip => (
                      <span
                        key={zip}

                className="px-3 py-1 bg-white/10 rounded-full text-white text-sm"
                      >
                        {zip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href="tel:1-844-967-3536"
                    size="lg"
                    className="bg-primary text-black hover:bg-primary-300"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call: 1-844-YO-PELEO
                  </Button>
                  <Button
                    href="/contact"
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Features */}
        <section className="py-16 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                Why {neighborhood.name} Residents Choose Us
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.localFeatures.map((feature, index) => {
                  const Icon = IconMap[feature.icon as keyof typeof IconMap] || MapPin;
                  return (
                    <div
                      key={index}

                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center"
                    >
                      <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3
                className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas for Neighborhood */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                Legal Services for {neighborhood.name}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {content.practiceAreas.map((area, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all"
                  >
                    <h3
                className="text-2xl font-bold text-primary mb-4">{area.name}</h3>
                    <p className="text-gray-300 mb-4">{area.description}</p>
                    <p className="text-sm text-gray-400 italic">{area.localNote}</p>
                    <Link
                      href={`/practice-areas/${practiceAreaSlugs[area.name] || area.name.toLowerCase().replace(/['\s]+/g, '-')}`}

                className="inline-flex items-center text-primary hover:text-primary-300 mt-4 font-semibold"
                    >
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Local Knowledge Section */}
        <section className="py-16 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                We Know {neighborhood.name}
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Landmarks */}
                <div
className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-primary mb-4">Local Landmarks</h3>
                  <ul className="space-y-2">
                    {content.localKnowledge.landmarks.map((landmark, index) => (
                      <li key={index}

                className="flex items-start text-gray-300">
                        <MapPin
                className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        {landmark}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Demographics */}
                <div
className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-primary mb-4">Community Info</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-gray-400 text-sm">Population</dt>
                      <dd className="text-white font-semibold">
                        {content.localKnowledge.demographics.population}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-400 text-sm">Median Income</dt>
                      <dd className="text-white font-semibold">
                        {content.localKnowledge.demographics.medianIncome}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-400 text-sm">Community</dt>
                      <dd className="text-white font-semibold">
                        {content.localKnowledge.demographics.diversity}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Nearby Services */}
                <div
className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-primary mb-4">Nearby Courts</h3>
                  <div className="space-y-3">
                    {content.localKnowledge.nearbyServices.map((service, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-white">{service.name}</h4>
                        <p className="text-sm text-gray-400">
                          {service.type} • {service.distance}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Common Legal Issues */}
              <div
className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-xl font-bold text-primary mb-4">
                  Common Legal Issues in {neighborhood.name}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.localKnowledge.commonIssues.map((issue, index) => (
                    <div key={index}

                className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span
                className="text-gray-300">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {neighborhood.name} Success Stories
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {content.testimonials.map((testimonial, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}

                className="text-primary text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="text-sm">
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {neighborhood.name} FAQs
              </h2>

              <div className="space-y-6">
                {content.faqs.map((faq, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                  >
                    <h3
                className="text-xl font-semibold text-primary mb-3">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-300">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
                {neighborhood.name} Residents: Get Help Today
              </h2>
              <p className="text-xl text-black/80 mb-8">
                Don't wait to get the legal help you need. We're here for our{' '}
                {neighborhood.name} neighbors 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="tel:1-844-967-3536"
                  size="lg"
                  className="bg-black text-primary hover:bg-gray-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 1-844-YO-PELEO
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-primary"
                >
                  Schedule Consultation
                </Button>
              </div>
              <p className="mt-8 text-sm text-black/60">
                Serving all {neighborhood.name} ZIP codes: {neighborhood.zipCodes.join(', ')}
              </p>
            </div>
          </div>
        </section>

        {/* Nearby Neighborhoods */}
        <section className="py-12 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h3 className="text-xl font-bold text-white mb-6">
                Also Serving Nearby {neighborhood.city} Neighborhoods
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href={`/locations/nc/${neighborhood.citySlug}`}

                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 text-white transition-all"
                >
                  All {neighborhood.city}
                </Link>
                {/* Add links to other neighborhoods here */}
              </div>
            </div>
          </div>
        </section>

        {/* Schemas */}
        <Script
          id={`neighborhood-schema-${neighborhood.slug}` type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [breadcrumbSchema, localBusinessSchema],
            }),
          }}
        />
      </div>
    </>
  );
