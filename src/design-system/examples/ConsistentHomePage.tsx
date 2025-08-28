'use client';

import React, { useState } from 'react';
import {
  MasterLayout,
  HeroTemplate,
  Section,
  Container,
  SectionHeader,
  Button,
  PracticeAreaCard,
  Heading,
  Text,
  Tagline,
  BRAND,
} from '@/design-system';

export default function ConsistentHomePage() {
  // Language state - setLanguage available for future language switching
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, _setLanguage] = useState<'en' | 'es'>('en');

  const practiceAreas = [
    {
      id: 'immigration',
      title: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      icon: '🌍',
      description: {
        en: 'Comprehensive immigration services for families and businesses.',
        es: 'Servicios integrales de inmigración para familias y empresas.',
      },
      services: {
        en: ['Family Petitions', 'Work Visas', 'Green Cards', 'Citizenship'],
        es: ['Peticiones Familiares', 'Visas de Trabajo', 'Tarjetas Verdes', 'Ciudadanía'],
      },
      aiFeature: {
        en: '🤖 AI tracks your case 24/7',
        es: '🤖 IA rastrea su caso 24/7',
      },
    },
    {
      id: 'personal-injury',
      title: { en: 'Personal Injury', es: 'Lesiones Personales' },
      icon: '🏥',
      description: {
        en: 'Fighting for maximum compensation for accident victims.',
        es: 'Luchando por la máxima compensación para víctimas.',
      },
      services: {
        en: ['Car Accidents', 'Slip & Fall', 'Medical Malpractice', 'Wrongful Death'],
        es: ['Accidentes de Auto', 'Resbalones', 'Negligencia Médica', 'Muerte Injusta'],
      },
      aiFeature: {
        en: '📊 AI predicts case value',
        es: '📊 IA predice valor del caso',
      },
    },
    {
      id: 'criminal-defense',
      title: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      icon: '⚖️',
      description: {
        en: 'Aggressive defense strategies to protect your freedom.',
        es: 'Estrategias agresivas para proteger su libertad.',
      },
      services: {
        en: ['DWI/DUI', 'Drug Charges', 'Assault', 'Federal Crimes'],
        es: ['DWI/DUI', 'Cargos de Drogas', 'Asalto', 'Crímenes Federales'],
      },
      aiFeature: {
        en: '🎯 AI analyzes precedents',
        es: '🎯 IA analiza precedentes',
      },
    },
  ];

  const content = {
    en: {
      trustTitle: 'Why Trust Vasquez Law Firm?',
      trustSubtitle: 'Three decades of excellence in legal representation',
      whyUs: [
        {
          icon: '🏆',
          title: 'Proven Results',
          desc: '30,000+ successful cases',
        },
        {
          icon: '🤝',
          title: 'Personal Attention',
          desc: 'You work directly with attorneys',
        },
        {
          icon: '🌐',
          title: 'Bilingual Services',
          desc: 'Full support in English & Spanish',
        },
        {
          icon: '🤖',
          title: 'AI-Enhanced',
          desc: '24/7 intelligent assistance',
        },
      ],
      ctaTitle: 'Ready to Fight for Your Rights?',
      ctaSubtitle: 'Get your free consultation today',
      ctaButton: 'Schedule Consultation',
    },
    es: {
      trustTitle: '¿Por Qué Confiar en Vasquez Law Firm?',
      trustSubtitle: 'Tres décadas de excelencia en representación legal',
      whyUs: [
        {
          icon: '🏆',
          title: 'Resultados Probados',
          desc: '30,000+ casos exitosos',
        },
        {
          icon: '🤝',
          title: 'Atención Personal',
          desc: 'Trabajas directamente con abogados',
        },
        {
          icon: '🌐',
          title: 'Servicios Bilingües',
          desc: 'Apoyo completo en inglés y español',
        },
        {
          icon: '🤖',
          title: 'Mejorado con IA',
          desc: 'Asistencia inteligente 24/7',
        },
      ],
      ctaTitle: '¿Listo para Luchar por Sus Derechos?',
      ctaSubtitle: 'Obtenga su consulta gratis hoy',
      ctaButton: 'Programar Consulta',
    },
  };

  const t = content[language];

  return (
    <MasterLayout variant="hero" showBreadcrumbs={false}>
      {/* Hero Section */}
      <HeroTemplate language={language} variant="split" />

      {/* Practice Areas */}
      <Section variant="alt" size="lg">
        <Container>
          <SectionHeader
            title={language === 'en' ? 'How We Can Help You' : 'Cómo Podemos Ayudarte'}
            subtitle={
              language === 'en'
                ? 'Expert legal representation in six key practice areas'
                : 'Representación legal experta en seis áreas de práctica clave'
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <PracticeAreaCard
                key={area.id}
                icon={area.icon}
                title={area.title[language]}
                description={area.description[language]}
                services={area.services[language]}
                aiFeature={area.aiFeature[language]} href={`/practice-areas/${area.id}`}
                language={language}
                index={index}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust Section */}
      <Section size="lg">
        <Container>
          <SectionHeader title={t.trustTitle} subtitle={t.trustSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyUs.map((item, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div
                className="text-5xl mb-4">{item.icon}</div>
                <Heading as="h3" size="xl" className="mb-2">
                  {item.title}
                </Heading>
                <Text color="muted">{item.desc}</Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="gradient" size="lg">
        <Container size="md">
          <div className="text-center">
            <Tagline size="lg">{BRAND.tagline}</Tagline>
            <Heading as="h2" size="4xl" className="mt-4 mb-4">
              {t.ctaTitle}
            </Heading>
            <Text size="lg" color="muted" className="mb-8">
              {t.ctaSubtitle}
            </Text>
            <Button href="/contact" size="xl" icon="📞">
              {t.ctaButton}
            </Button>
          </div>
        </Container>
      </Section>
    </MasterLayout>
  );
}
