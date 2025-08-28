'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/design-system/components/Button';
import { Section, Card, Heading, Text } from './TemplateComponents';
import { COLORS, BRAND } from '@/design-system/constants';
import { Phone, MapPin, Clock, DollarSign } from 'lucide-react';
import { InteractiveLink } from '@/components/ui/InteractiveLink';

interface LocationData {
  city: string;
  state: string;
  population?: string;
  caseCount?: string;
  practiceAreas: Array<{
    title: string;
    icon: string;
    services: string[];
    link: string;
  }>;
  localInfo: {
    courts: Array<{ name: string; type: string }>;
    commonIssues: string[];
  };
  testimonials: Array<{
    name: string;
    location: string;
    rating: number;
    text: string;
  }>;
  nearbyLocations: Array<{ name: string; slug: string }>;
}

interface LocationPageTemplateProps {
  data?: LocationData;
  location?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
}

export const LocationPageTemplate: React.FC<LocationPageTemplateProps> = ({
  data,
  location,
  content,
  children: _children,
}) => {
  // Handle legacy props (location/content pattern)
  if (!data && location && content) {
    return (
      <>
        <Section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading
              as="h1"
              size="4xl"
              weight="bold"
              className="text-center mb-8"
              style={{ color: COLORS.burgundy[700] }}
            >
              {location} Legal Services
            </Heading>
            {content}
          </div>
        </Section>
      </>
    );
  }

  // Provide default values if data is undefined
  const {
    city = 'Your City',
    state = 'NC',
    population = '100,000+',
    caseCount = '500+',
    practiceAreas = [],
    localInfo = { courts: [], commonIssues: [] },
    testimonials = [],
    nearbyLocations = [],
  } = data || {};

  return (
    <>
      {/* Hero Section */}
      <Section
        variant="gradient"
        className="text-white py-20"
        style={{
          background: `linear-gradient(135deg, ${COLORS.burgundy[700]} 0%, ${COLORS.burgundy[600]} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heading as="h1" size="5xl" weight="bold" color="white" className="mb-4">
              {city} Immigration & Criminal Defense Lawyers
            </Heading>
            <Text size="xl" color="white" className="mb-8 max-w-3xl mx-auto opacity-90">
              Serving {city}, {state} and the surrounding area with experienced legal
              representation. Se habla español.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link href="/contact"
                variant="primary"
                size="lg"
                style={{
                  backgroundColor: COLORS.gold[500],
                  color: COLORS.neutral[0],} className="hover:opacity-90 transition-all transform hover:scale-105"
              >
                Get Free Consultation
              </Button>
              <Button
                as="a"
               } href={`tel:${BRAND.phoneNumeric}`}
                variant="secondary"
                size="lg"
                style={{
                  backgroundColor: COLORS.neutral[0],
                  color: COLORS.burgundy[700], className="hover:opacity-90 transition-all"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {BRAND.phone}
              </Button>
            </div>
            <Text size="sm" color="white" className="mt-6 opacity-80">
              Available 24/7 for emergencies • Hablamos español • Payment plans available
            </Text>
          </div>
        </div>
      </Section>

      {/* Statistics Bar */}
      <Section className="py-8" style={{ backgroundColor: COLORS.gold[500] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <Heading as="h3" size="3xl" weight="bold" color="white">
                {population || '100K+'}
              </Heading>
              <Text size="sm" color="white">
                Population Served
              </Text>
            </div>
            <div>
              <Heading as="h3" size="3xl" weight="bold" color="white">
                {caseCount || '500+'}
              </Heading>
              <Text size="sm" color="white">
                Local Cases Won
              </Text>
            </div>
            <div>
              <Heading as="h3" size="3xl" weight="bold" color="white">
                15+
              </Heading>
              <Text size="sm" color="white">
                Years Experience
              </Text>
            </div>
            <div>
              <Heading as="h3" size="3xl" weight="bold" color="white">
                4.9★
              </Heading>
              <Text size="sm" color="white">
                Client Rating
              </Text>
            </div>
          </div>
        </div>
      </Section>

      {/* Practice Areas Grid */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            as="h2"
            size="3xl"
            weight="bold"
            className="text-center mb-12"
            style={{ color: COLORS.burgundy[700] }}
          >
            Legal Services for {city} Residents
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <Card
                key={index}

                className="p-6"
                style={{ borderTopColor: COLORS.burgundy[700], borderTopWidth: '4px' }}
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <Heading
                  as="h3"
                  size="xl"
                  weight="bold"
                  className="mb-3"
                  style={{ color: COLORS.burgundy[700] }}
                >
                  {area.title}
                </Heading>
                <ul className="space-y-2 mb-4" style={{ color: COLORS.neutral[700] }}>
                  {(area.services || []).map((service, idx) => (
                    <li key={idx}>• {service}</li>
                  ))}
                </ul>
                <Link
                  href={area.link}

                className="font-semibold hover:underline"
                style={{ color: COLORS.gold[500] }}
                >
                  Learn More →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Local Content Section */}
      <Section className="py-16" style={{ backgroundColor: COLORS.neutral[50] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Heading
                as="h2"
                size="3xl"
                weight="bold"
                className="mb-6"
                style={{ color: COLORS.burgundy[700] }}
              >
                Why {city} Residents Choose Vasquez Law Firm
              </Heading>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin
                    className="w-6 h-6 mr-4 flex-shrink-0"
                    style={{ color: COLORS.gold[500] }}
                  />
                  <div>
                    <Heading
                      as="h4"
                      size="lg"
                      weight="bold"
                      style={{ color: COLORS.burgundy[700] }}
                    >
                      Local Knowledge
                    </Heading>
                    <Text size="base" style={{ color: COLORS.neutral[700] }}>
                      Deep understanding of {state} courts, judges, and legal procedures
                    </Text>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">🗣️</span>
                  <div>
                    <Heading
                      as="h4"
                      size="lg"
                      weight="bold"
                      style={{ color: COLORS.burgundy[700] }}
                    >
                      Bilingual Services
                    </Heading>
                    <Text size="base" style={{ color: COLORS.neutral[700] }}>
                      Full legal services in English and Spanish for {city}'s diverse community
                    </Text>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock
                    className="w-6 h-6 mr-4 flex-shrink-0"
                    style={{ color: COLORS.gold[500] }}
                  />
                  <div>
                    <Heading
                      as="h4"
                      size="lg"
                      weight="bold"
                      style={{ color: COLORS.burgundy[700] }}
                    >
                      24/7 Availability
                    </Heading>
                    <Text size="base" style={{ color: COLORS.neutral[700] }}>
                      Emergency legal help when you need it most
                    </Text>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign
                    className="w-6 h-6 mr-4 flex-shrink-0"
                    style={{ color: COLORS.gold[500] }}
                  />
                  <div>
                    <Heading
                      as="h4"
                      size="lg"
                      weight="bold"
                      style={{ color: COLORS.burgundy[700] }}
                    >
                      Affordable Representation
                    </Heading>
                    <Text size="base" style={{ color: COLORS.neutral[700] }}>
                      Payment plans and transparent pricing to serve all {city} residents
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Heading
                as="h3"
                size="2xl"
                weight="bold"
                className="mb-6"
                style={{ color: COLORS.burgundy[700] }}
              >
                {state} Legal Information
              </Heading>
              <Card className="p-6">
                <Heading
                  as="h4"
                  size="lg"
                  weight="bold"
                  className="mb-3"
                  style={{ color: COLORS.burgundy[700] }}
                >
                  Court Locations
                </Heading>
                <ul className="space-y-2 mb-4" style={{ color: COLORS.neutral[700] }}>
                  {localInfo.courts.map((court, idx) => (
                    <li key={idx}>
                      <strong>{court.type}:</strong> {court.name}
                    </li>
                  ))}
                </ul>

                <Heading
                  as="h4"
                  size="lg"
                  weight="bold"
                  className="mb-3 mt-6"
                  style={{ color: COLORS.burgundy[700] }}
                >
                  Common Legal Issues in {city}
                </Heading>
                <ul className="space-y-2" style={{ color: COLORS.neutral[700] }}>
                  {localInfo.commonIssues.map((issue, idx) => (
                    <li key={idx}>• {issue}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            as="h2"
            size="3xl"
            weight="bold"
            className="text-center mb-12"
            style={{ color: COLORS.burgundy[700] }}
          >
            What {city} Clients Say About Us
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}

                className="p-6">
                <div className="text-xl mb-3"}

                style={{ color: COLORS.gold[500] }}>
                  {'★'.repeat(testimonial.rating)}
                </div>
                <Text size="base" className="mb-4" style={{ color: COLORS.neutral[700] }}>
                  &ldquo;{testimonial.text}&rdquo;
                </Text>
                <Text size="sm" weight="semibold" style={{ color: COLORS.burgundy[700] }}>
                  - {testimonial.name}, {testimonial.location}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Nearby Cities */}
      <Section className="py-16" style={{ backgroundColor: COLORS.neutral[50] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            as="h3"
            size="2xl"
            weight="bold"
            className="text-center mb-8"
            style={{ color: COLORS.burgundy[700] }}
          >
            Also Serving Nearby Communities
          </Heading>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyLocations.map((location, idx) => (
              <InteractiveLink
                key={idx}

                href={`/locations/nc/${location.slug}`}

                className="px-4 py-2 bg-white border rounded-lg transition-all"
                style={{
                  borderColor: COLORS.neutral[200],
                }}
                hoverStyle={{
                  borderColor: COLORS.gold[500],
                  boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
                }}
              >
                {location.name}
              </InteractiveLink>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 text-white" style={{ backgroundColor: COLORS.burgundy[700] }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading as="h2" size="4xl" weight="bold" color="white" className="mb-6">
            Get Legal Help in {city} Today
          </Heading>
          <Text size="xl" color="white" className="mb-8 opacity-90">
            Don't face your legal challenges alone. Our experienced attorneys are ready to
            fight for you. Free consultation • Se habla español • Payment plans available
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link href="/contact"
              variant="primary"
              size="lg"
              style={{
                backgroundColor: COLORS.gold[500],
                color: COLORS.neutral[0],} className="hover:opacity-90 transition-all transform hover:scale-105"
            >
              Schedule Free Consultation
            </Button>
            <Button
              as="a"
             } href={`tel:${BRAND.phoneNumeric}`}
              variant="secondary"
              size="lg"
              style={{
                backgroundColor: COLORS.neutral[0],
                color: COLORS.burgundy[700],} className="hover:opacity-90 transition-all"
            >
              Call Now: {BRAND.phone}
            </Button>
          </div>
          <Text size="sm" color="white" className="mt-8 opacity-80">
            Serving {city}, {state} and all surrounding areas
          </Text>
        </div>
      </Section>
    </>
  );
};

export default LocationPageTemplate;
}
}
}
}
