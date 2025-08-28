'use client';

import React, { useState } from 'react';

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Scale,
  Shield,
  Heart,
  Briefcase,
  CheckCircle,
  Star,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/design-system/Button';
import { Heading, Text } from '@/components/design-system/Typography';
import { TRADEMARK } from '@/lib/constants/trademark';

interface LocationData {
  cityName: string;
  officeName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  servingAreas: string[];
  practiceAreas: {
    immigration: string[];
    personalInjury: string[];
    workersComp: string[];
    criminalDefense: string[];
  };
  seoData?: {
    metaTitle: string;
    metaDescription: string;
  };
  heroImage?: string;
  mapEmbedUrl?: string;
}

interface ModernLocationTemplateProps {
  data: LocationData;
  language?: 'en' | 'es';
}

export default function ModernLocationTemplate({
  data,
  language = 'en',
}: ModernLocationTemplateProps) {
  const [activeTab, setActiveTab] = useState<
    'immigration' | 'personalInjury' | 'workersComp' | 'criminalDefense'
  >('immigration');

  const content = {
    en: {
      hero: {
        badge: `Serving ${data.cityName} & Surrounding Areas`,
        title: `${data.cityName} Immigration & Personal Injury Lawyers`,
        subtitle: TRADEMARK.YO_PELEO_POR_TI,
        description: `Expert legal representation for ${data.cityName} residents. Military discipline meets legal excellence to protect your rights and secure your future.`,
        cta1: 'Free Case Evaluation',
        cta2: 'Call Now: 1-844-YO-PELEO',
      },
      stats: [
        { value: '60+', label: 'Years Experience' },
        { value: '30K+', label: 'Cases Won' },
        { value: '98%', label: 'Success Rate' },
        { value: '24/7', label: 'Available' },
      ],
      practiceAreas: {
        title: 'Practice Areas',
        tabs: {
          immigration: 'Immigration Law',
          personalInjury: 'Personal Injury',
          workersComp: 'Workers Comp',
          criminalDefense: 'Criminal Defense',
        },
      },
      whyChoose: {
        title: `Why Choose Our ${data.cityName} Office?`,
        items: [
          {
            icon: Scale,
            title: 'Local Expertise',
            description: `Deep understanding of ${data.cityName} courts and legal procedures`,
          },
          {
            icon: Globe,
            title: 'Bilingual Services',
            description: 'Fluent Spanish-speaking attorneys and staff',
          },
          {
            icon: Heart,
            title: 'Community Focused',
            description: `Active in ${data.cityName}'s Hispanic and immigrant communities`,
          },
          {
            icon: Shield,
            title: 'Proven Results',
            description: 'Thousands of successful cases with 98% success rate',
          },
        ],
      },
      contact: {
        title: `Contact Our ${data.officeName}`,
        ready: 'Ready to Fight for Your Rights?',
        description: `Contact our ${data.cityName} office today for a free consultation.`,
        schedule: 'Schedule Consultation',
        callNow: 'Call Now',
      },
      serving: {
        title: `Serving All of Greater ${data.cityName}`,
        description: 'Our office proudly serves clients throughout the region, including:',
      },
    },
    es: {
      hero: {
        badge: `Sirviendo a ${data.cityName} y Áreas Circundantes`,
        title: `Abogados de Inmigración y Lesiones Personales en ${data.cityName}`,
        subtitle: TRADEMARK.YO_PELEO_POR_TI,
        description: `Representación legal experta para residentes de ${data.cityName}. Disciplina militar combinada con excelencia legal para proteger sus derechos y asegurar su futuro.`,
        cta1: 'Evaluación Gratuita',
        cta2: 'Llame Ahora: 1-844-YO-PELEO',
      },
      stats: [
        { value: '60+', label: 'Años de Experiencia' },
        { value: '30K+', label: 'Casos Ganados' },
        { value: '98%', label: 'Tasa de Éxito' },
        { value: '24/7', label: 'Disponible' },
      ],
      practiceAreas: {
        title: 'Áreas de Práctica',
        tabs: {
          immigration: 'Ley de Inmigración',
          personalInjury: 'Lesiones Personales',
          workersComp: 'Compensación Laboral',
          criminalDefense: 'Defensa Criminal',
        },
      },
      whyChoose: {
        title: `¿Por Qué Elegir Nuestra Oficina en ${data.cityName}?`,
        items: [
          {
            icon: Scale,
            title: 'Experiencia Local',
            description: `Profundo conocimiento de las cortes y procedimientos legales de ${data.cityName}`,
          },
          {
            icon: Globe,
            title: 'Servicios Bilingües',
            description: 'Abogados y personal que hablan español con fluidez',
          },
          {
            icon: Heart,
            title: 'Enfocados en la Comunidad',
            description: `Activos en las comunidades hispanas e inmigrantes de ${data.cityName}`,
          },
          {
            icon: Shield,
            title: 'Resultados Comprobados',
            description: 'Miles de casos exitosos con 98% de tasa de éxito',
          },
        ],
      },
      contact: {
        title: `Contacte Nuestra ${data.officeName}`,
        ready: '¿Listo para Luchar por Sus Derechos?',
        description: `Contacte nuestra oficina en ${data.cityName} hoy para una consulta gratuita.`,
        schedule: 'Programar Consulta',
        callNow: 'Llame Ahora',
      },
      serving: {
        title: `Sirviendo a Todo el Gran ${data.cityName}`,
        description:
          'Nuestra oficina orgullosamente sirve a clientes en toda la región, incluyendo:',
      },
    },
  };

  const t = content[language];

  const practiceAreaIcons = {
    immigration: Briefcase,
    personalInjury: Heart,
    workersComp: Shield,
    criminalDefense: Scale,
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
          <div className="absolute inset-0">
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}

                className="absolute h-1 w-1 rounded-full bg-primary/30"
             }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[80vh] items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div
className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-6 py-3 backdrop-blur-sm"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">{t.hero.badge}</span>
              </div>

              {/* Title */}
              <h1
className="mb-4 text-4xl sm:text-5xl md:text-6xl font-black text-white"
              >
                {t.hero.title}
              </h1>

              {/* Subtitle */}
              <p
className="mb-6 text-2xl sm:text-3xl font-bold text-primary"
              >
                {t.hero.subtitle}
              </p>

              {/* Description */}
              <p
className="mb-10 max-w-3xl mx-auto text-lg text-gray-300"
              >
                {t.hero.description}
              </p>

              {/* CTAs */}
              <div
className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button href="/contact" size="lg">
                  {t.hero.cta1}
                </Button>
                <Button href="tel:1-844-965-3536" variant="outline" size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  {t.hero.cta2}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/50 p-2">
            <div
className="h-3 w-1 rounded-full bg-primary"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-gradient-to-b from-black to-neutral-950">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {t.stats.map((stat, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div
                className="text-3xl sm:text-4xl md:text-5xl font-black text-primary">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm sm:text-base text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="relative py-20 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4">
          <div
className="text-center mb-12"
          >
            <Heading level={2}

                className="text-white mb-4">
              {t.practiceAreas.title}
            </Heading>
          </div>

          {/* Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(t.practiceAreas.tabs).map(([key, label]) => {
                const Icon = practiceAreaIcons[key as keyof typeof practiceAreaIcons];
                return (
                  <button
                    key={key}

                onClick={() =>
                      setActiveTab(
                        key as 'immigration' | 'personalInjury' | 'workersComp' | 'criminalDefense'
                      )}

                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                      activeTab === key
                        ? 'bg-primary text-black'
                        : 'bg-black/50 text-white hover:bg-black/70 border border-primary/20'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <>
            <div
              key={activeTab}

                className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {data.practiceAreas[activeTab]?.map((item: string, index: number) => (
                  <div
                    key={index}

                className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span
                className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="relative py-20 bg-black">
        <div className="mx-auto max-w-7xl px-4">
          <div
className="text-center mb-12"
          >
            <Heading level={2}

                className="text-white mb-4">
              {t.whyChoose.title}
            </Heading>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyChoose.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}

                className="relative group"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3
                className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Serving Areas Section */}
      <section className="relative py-20 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4">
          <div
className="text-center mb-12"
          >
            <Heading level={2}

                className="text-white mb-4">
              {t.serving.title}
            </Heading>
            <Text size="lg" className="text-gray-400">
              {t.serving.description}
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.servingAreas
              .reduce((cols: string[][], area, index) => {
                const colIndex = index % 3;
                if (!cols[colIndex]) cols[colIndex] = [];
                cols[colIndex].push(area);
                return cols;
              }, [])
              .map((col, colIndex) => (
                <div
                  key={colIndex}}
                 }
                 }
                >
                  <ul className="space-y-3">
                    {col.map((area, index) => (
                      <li key={index}

                className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span
                className="text-gray-300">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 bg-gradient-to-b from-neutral-950 to-black">
        <div className="mx-auto max-w-7xl px-4">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <Heading level={3}

                className="text-white mb-8">
                  {t.contact.title}
                </Heading>
                <div className="space-y-6">
                  <div
className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{data.officeName}</p>
                      <p className="text-gray-400">{data.address.street}</p>
                      <p className="text-gray-400">
                        {data.address.city}, {data.address.state} {data.address.zip}
                      </p>
                    </div>
                  </div>

                  <div
className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Phone</p>
                      <a
                        href={`tel:${data.phone}`}

                className="text-primary hover:text-primary-400 transition-colors"
                      >
                        {data.phone}
                      </a>
                    </div>
                  </div>

                  <div
className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <a
                        href={`mailto:${data.email}`}

                className="text-primary hover:text-primary-400 transition-colors"
                      >
                        {data.email}
                      </a>
                    </div>
                  </div>

                  <div
className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Office Hours</p>
                      <p className="text-gray-400">{data.hours.weekdays}</p>
                      <p className="text-gray-400">Saturday: {data.hours.saturday}</p>
                      <p className="text-gray-400">Sunday: {data.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col justify-center text-center lg:text-left">
                <Heading level={3}

                className="text-white mb-4">
                  {t.contact.ready}
                </Heading>
                <Text size="lg" className="text-gray-400 mb-8">
                  {t.contact.description}
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button href="/contact" size="lg">
                    {t.contact.schedule}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button href={`tel:${data.phone}`} variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    {t.contact.callNow}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {data.mapEmbedUrl && (
        <section className="relative py-20 bg-black">
          <div className="mx-auto max-w-7xl px-4">
            <div
className="relative h-96 rounded-2xl overflow-hidden border border-primary/20"
            >
              <iframe
                src={data.mapEmbedUrl}
                width="100%"
                height="100%"
               }
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </div>
  );
