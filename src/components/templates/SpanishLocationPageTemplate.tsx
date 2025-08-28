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

interface SpanishLocationPageTemplateProps {
  data?: LocationData;
  location?: string;
  content?: React.ReactNode;
}

export const SpanishLocationPageTemplate: React.FC<SpanishLocationPageTemplateProps> = ({
  data,
  location,
  content,
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
              Servicios Legales en {location}
            </Heading>
            {content}
          </div>
        </Section>
      </>
    );
  }

  // Provide default values if data is undefined
  const {
    city = 'Su Ciudad',
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
              Abogados de Inmigración y Defensa Criminal en {city}
            </Heading>
            <Text size="xl" color="white" className="mb-8 max-w-3xl mx-auto opacity-90">
              Sirviendo a {city}, {state} y el área circundante con representación legal
              experimentada. Hablamos español perfectamente.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/es/contacto"
                variant="primary"
                size="lg"
                style={{
                  backgroundColor: COLORS.gold[500],
                  color: COLORS.neutral[0],
                }}
                className="hover:opacity-90 transition-all transform hover:scale-105"
              >
                Consulta Gratuita
              </Button>
              <Button
                as="a"
                href={`tel:${BRAND.phoneNumeric}`}
                variant="secondary"
                size="lg"
                style={{
                  backgroundColor: COLORS.neutral[0],
                  color: COLORS.burgundy[700],
                }}
                className="hover:opacity-90 transition-all"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llame {BRAND.phone}
              </Button>
            </div>
            <Text size="sm" color="white" className="mt-6 opacity-80">
              Disponible 24/7 para emergencias • Hablamos español • Planes de pago disponibles
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
                Población Servida
              </Text>
            </div>
            <div>
              <Heading as="h3" size="3xl" weight="bold" color="white">
                {caseCount || '500+'}
              </Heading>
              <Text size="sm" color="white">
                Casos Locales Ganados
              </Text>
            </div>
            <div>
              <Heading as="h3" size="3xl" weight="bold" color="white">
                60+
              </Heading>
              <Text size="sm" color="white">
                Años de Experiencia
              </Text>
            </div>
            <div>
              <Heading as="h3" size="3xl" weight="bold" color="white">
                4.9★
              </Heading>
              <Text size="sm" color="white">
                Calificación de Clientes
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
            Servicios Legales para Residentes de {city}
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
                  Más Información →
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
                Por Qué Los Residentes de {city} Eligen Vasquez Law Firm
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
                      Conocimiento Local
                    </Heading>
                    <Text size="base" style={{ color: COLORS.neutral[700] }}>
                      Amplio conocimiento de las cortes, jueces y procedimientos legales de {state}
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
                      Servicios Bilingües
                    </Heading>
                    <Text size="base" style={{ color: COLORS.neutral[700] }}>
                      Servicios legales completos en inglés y español para la comunidad diversa de{' '}
                      {city}
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
                      Disponibilidad 24/7
                    </Heading>
                    <Text size="base" style={{ color: COLORS.neutral[700] }}>
                      Ayuda legal de emergencia cuando más la necesite
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
                      Representación Accesible
                    </Heading>
                    <Text size="base" style={{ color: COLORS.neutral[700] }}>
                      Planes de pago y precios transparentes para servir a todos los residentes de{' '}
                      {city}
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
                Información Legal de {state}
              </Heading>
              <Card className="p-6">
                <Heading
                  as="h4"
                  size="lg"
                  weight="bold"
                  className="mb-3"
                  style={{ color: COLORS.burgundy[700] }}
                >
                  Ubicaciones de Tribunales
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
                  Problemas Legales Comunes en {city}
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
            Lo Que Dicen Nuestros Clientes de {city}
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <div className="text-xl mb-3" style={{ color: COLORS.gold[500] }}>
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
            También Servimos Comunidades Cercanas
          </Heading>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyLocations.map((location, idx) => (
              <InteractiveLink
                key={idx}

                href={`/es/ubicaciones/${location.slug}`}

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
            Obtenga Ayuda Legal en {city} Hoy
          </Heading>
          <Text size="xl" color="white" className="mb-8 opacity-90">
            No enfrente sus desafíos legales solo. Nuestros abogados experimentados están listos
            para luchar por usted. Consulta gratuita • Hablamos español • Planes de pago disponibles
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              href="/es/contacto"
              variant="primary"
              size="lg"
              style={{
                backgroundColor: COLORS.gold[500],
                color: COLORS.neutral[0],
              }}
              className="hover:opacity-90 transition-all transform hover:scale-105"
            >
              Programe Consulta Gratuita
            </Button>
            <Button
              as="a"
              href={`tel:${BRAND.phoneNumeric}`}
              variant="secondary"
              size="lg"
              style={{
                backgroundColor: COLORS.neutral[0],
                color: COLORS.burgundy[700],
              }}
              className="hover:opacity-90 transition-all"
            >
              Llame Ahora: {BRAND.phone}
            </Button>
          </div>
          <Text size="sm" color="white" className="mt-8 opacity-80">
            Sirviendo a {city}, {state} y todas las áreas circundantes
          </Text>
        </div>
      </Section>
    </>
  );
};

export default SpanishLocationPageTemplate;
