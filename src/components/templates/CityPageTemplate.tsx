'use client';

import React from 'react';
import { Button } from '@/design-system/components/Button';

import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  Award,
  Users,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { generateEnhancedLocalBusinessSchema } from '@/lib/seo/comprehensive-schema';
import Script from 'next/script';

interface CityPageTemplateProps {
  city: {
    name: string;
    slug: string;
    county: string;
    population: number;
  };
  nearbyOffice: string;
  content: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    whyChooseUs: Array<{
      title: string;
      description: string;
    }>;
    practiceAreas: Array<{
      name: string;
      description: string;
      features: string[];
    }>;
    localContent: {
      courthouses: Array<{
        name: string;
        type: string;
        description: string;
      }>;
      statistics: {
        population: string;
        hispanicPopulation: string;
        averageSettlement: string;
        casesWon: string;
        clientsSatisfied: string;
      };
      testimonials: Array<{
        author: string;
        location: string;
        text: string;
        rating: number;
      }>;
    };
  };
}

// Practice area slug mapping
const practiceAreaSlugs: Record<string, string> = {
  'Immigration Law': 'immigration',
  'Personal Injury': 'personal-injury',
  'Workers Compensation': 'workers-compensation',
  'Criminal Defense': 'criminal-defense',
  'Family Law': 'family-law',
};

export function CityPageTemplate({ city, nearbyOffice, content }: CityPageTemplateProps) {
  const stats = [
    { icon: Users, value: '30K+', label: 'Clients Helped' },
    { icon: Award, value: '60+', label: 'Years Experience' },
    { icon: Shield, value: '98%', label: 'Success Rate' },
    { icon: Clock, value: '24/7', label: 'Available' },
  ];

  // Generate local business schema
  const localBusinessSchema = generateEnhancedLocalBusinessSchema({
    name: `Vasquez Law Firm - ${city.name}`,
    address: {
      street: getOfficeAddress(nearbyOffice)?.street || '',
      city: city.name,
      state: 'NC',
      zip: getOfficeAddress(nearbyOffice)?.zip || '',
    },
    phone: '+1-844-967-3536',
    geo: getOfficeCoordinates(nearbyOffice),
    hours: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '17:30',
      },
    ],
    amenities: ['Free Parking', 'Wheelchair Accessible', 'Free WiFi', 'Spanish Speaking Staff'],
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Payment Plans Available'],
  });

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
          </div>

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

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button
                    href="tel:1-844-967-3536"
                    size="lg"
                    className="bg-primary text-black hover:bg-primary-300"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: 1-844-YO-PELEO
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

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}

                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                    >
                      <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div
                className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                Legal Services for {city.name} Residents
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {content.practiceAreas.map((area, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all"
                  >
                    <h3
                className="text-2xl font-bold text-primary mb-4">{area.name}</h3>
                    <p className="text-gray-300 mb-6">{area.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {area.features.map((feature, idx) => (
                        <div key={idx}

                className="flex items-center text-sm text-gray-400">
                          <CheckCircle
                className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/practice-areas/${practiceAreaSlugs[area.name] || area.name.toLowerCase().replace(/['\s]+/g, '-')}`}

                className="inline-flex items-center text-primary hover:text-primary-300 mt-6 font-semibold"
                    >
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                Why {city.name} Chooses Vasquez Law Firm
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {content.whyChooseUs.map((item, index) => (
                  <div
                    key={index}

                className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3
                className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Local Information */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                Serving {city.name} & {city.county} County
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Statistics */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold text-primary mb-6">Local Statistics</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-gray-400 text-sm">City Population</dt>
                      <dd className="text-2xl font-bold text-white">
                        {content.localContent.statistics.population}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-400 text-sm">Hispanic Population</dt>
                      <dd className="text-2xl font-bold text-white">
                        {content.localContent.statistics.hispanicPopulation}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-400 text-sm">Average Settlement</dt>
                      <dd className="text-2xl font-bold text-primary">
                        {content.localContent.statistics.averageSettlement}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Courthouses */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold text-primary mb-6">Local Courts We Serve</h3>
                  <div className="space-y-4">
                    {content.localContent.courthouses.map((courthouse, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-white">{courthouse.name}</h4>
                        <p className="text-sm text-gray-400">{courthouse.type}</p>
                        <p className="text-sm text-gray-300 mt-1">{courthouse.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Office Info */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold text-primary mb-6">Nearest Office</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white">{nearbyOffice} Office</h4>
                      <p className="text-sm text-gray-300 mt-2">
                        <MapPin className="w-4 h-4 inline-block mr-1 text-primary" />
                        {getOfficeAddress(nearbyOffice)?.full || ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Travel Time from {city.name}</p>
                      <p className="text-lg font-semibold text-white">
                        {getEstimatedTravelTime(city.name, nearbyOffice)}
                      </p>
                    </div>
                    <a
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(getOfficeAddress(nearbyOffice)?.full || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-black bg-primary rounded-full hover:bg-primary-300 transition-all duration-300 transform hover:scale-105"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                What {city.name} Clients Say
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {content.localContent.testimonials.map((testimonial, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-300">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
                Get Help Today in {city.name}
              </h2>
              <p className="text-xl text-black/80 mb-8">
                Don't wait to get the legal help you need. Our {nearbyOffice} office serves all
                of {city.county} County.
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
                  Schedule Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Schema */}
        <Script
          id={`city-schema-${city.slug}` type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </div>
    </>
  );
}

// Helper functions
function getOfficeAddress(office: string) {
  const addresses: Record<string, { street: string; city: string; zip: string; full: string }> = {
    Charlotte: {
      street: '201 N. Tryon St #1250',
      city: 'Charlotte',
      zip: '28202',
      full: '201 N. Tryon St #1250, Charlotte, NC 28202',
    },
    Raleigh: {
      street: '333 Fayetteville Street, Suite 810',
      city: 'Raleigh',
      zip: '27601',
      full: '333 Fayetteville Street, Suite 810, Raleigh, NC 27601',
    },
    Smithfield: {
      street: '328 Brightleaf Blvd',
      city: 'Smithfield',
      zip: '27577',
      full: '328 Brightleaf Blvd, Smithfield, NC 27577',
    },
    Greensboro: {
      street: '100 N Elm St',
      city: 'Greensboro',
      zip: '27401',
      full: '100 N Elm St, Greensboro, NC 27401',
    },
  };

  return addresses[office] || addresses.Raleigh;
}

function getOfficeCoordinates(office: string) {
  const coordinates: Record<string, { lat: number; lng: number }> = {
    Charlotte: { lat: 35.2271, lng: -80.8431 },
    Raleigh: { lat: 35.7796, lng: -78.6382 },
    Smithfield: { lat: 35.5085, lng: -78.3394 },
    Greensboro: { lat: 36.0726, lng: -79.792 },
  };

  return coordinates[office] || coordinates.Raleigh;
}

function getEstimatedTravelTime(fromCity: string, toOffice: string) {
  // This would ideally use a real distance API
  // For now, return estimated times
  const times: Record<string, Record<string, string>> = {
    Charlotte: {
      Charlotte: '10-15 min',
      Huntersville: '20-25 min',
      Matthews: '15-20 min',
      Gastonia: '25-30 min',
      Monroe: '30-35 min',
    },
    Raleigh: {
      Raleigh: '10-15 min',
      Cary: '15-20 min',
      Durham: '25-30 min',
      'Chapel Hill': '35-40 min',
      'Wake Forest': '25-30 min',
    },
  };

  return times[toOffice]?.[fromCity] || '30-45 min';
