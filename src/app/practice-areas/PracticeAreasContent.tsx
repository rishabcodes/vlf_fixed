'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';

export default function PracticeAreasContent() {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Check URL params first
    const langParam = searchParams?.get('lang') as 'en' | 'es';
    if (langParam) {
      setLanguage(langParam);
    } else if (typeof navigator !== 'undefined') {
      // Check browser language (only on client)
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('es')) {
        setLanguage('es');
      }
    }
  }, [searchParams]);

  const practiceAreas = [
    {
      id: 'immigration',
      title: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      icon: '🌍',
      description: {
        en: 'Comprehensive immigration services including family-based petitions, employment visas, naturalization, and deportation defense.',
        es: 'Servicios integrales de inmigración incluyendo peticiones familiares, visas de empleo, naturalización y defensa contra deportación.',
      },
      services: {
        en: [
          'Family-Based Immigration',
          'Employment Visas',
          'Green Cards',
          'Citizenship/Naturalization',
          'Deportation Defense',
          'DACA/TPS',
        ],
        es: [
          'Inmigración Familiar',
          'Visas de Empleo',
          'Tarjetas Verdes',
          'Ciudadanía/Naturalización',
          'Defensa contra Deportación',
          'DACA/TPS',
        ],
      },
      aiFeature: {
        en: '🤖 AI tracks your USCIS case status 24/7',
        es: '🤖 IA rastrea su caso USCIS 24/7',
      },
    },
    {
      id: 'personal-injury',
      title: { en: 'Personal Injury', es: 'Lesiones Personales' },
      icon: '🏥',
      description: {
        en: 'Fighting for maximum compensation for accident victims. No fees unless we win your case.',
        es: 'Luchando por la máxima compensación para víctimas de accidentes. Sin honorarios a menos que ganemos su caso.',
      },
      services: {
        en: [
          'Car Accidents',
          'Truck Accidents',
          'Motorcycle Accidents',
          'Slip & Fall',
          'Medical Malpractice',
          'Wrongful Death',
        ],
        es: [
          'Accidentes de Auto',
          'Accidentes de Camión',
          'Accidentes de Motocicleta',
          'Resbalones y Caídas',
          'Negligencia Médica',
          'Muerte Injusta',
        ],
      },
      aiFeature: {
        en: '📊 AI predicts case value with 85% accuracy',
        es: '📊 IA predice valor del caso con 85% de precisión',
      },
    },
    {
      id: 'workers-compensation',
      title: { en: "Workers' Compensation", es: 'Compensación Laboral' },
      icon: '👷',
      description: {
        en: "Protecting injured workers' rights and securing the benefits you deserve.",
        es: 'Protegiendo los derechos de trabajadores lesionados y asegurando los beneficios que merece.',
      },
      services: {
        en: [
          'Workplace Injuries',
          'Occupational Diseases',
          'Disability Benefits',
          'Medical Treatment',
          'Lost Wages',
          'Appeals',
        ],
        es: [
          'Lesiones Laborales',
          'Enfermedades Ocupacionales',
          'Beneficios por Discapacidad',
          'Tratamiento Médico',
          'Salarios Perdidos',
          'Apelaciones',
        ],
      },
      aiFeature: {
        en: '🔍 AI reviews medical records instantly',
        es: '🔍 IA revisa registros médicos al instante',
      },
    },
    {
      id: 'criminal-defense',
      title: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      icon: '⚖️',
      description: {
        en: 'Aggressive defense strategies to protect your freedom and future.',
        es: 'Estrategias de defensa agresivas para proteger su libertad y futuro.',
      },
      services: {
        en: ['DWI/DUI', 'Drug Charges', 'Assault', 'Domestic Violence', 'Theft', 'Federal Crimes'],
        es: [
          'DWI/DUI',
          'Cargos de Drogas',
          'Asalto',
          'Violencia Doméstica',
          'Robo',
          'Crímenes Federales',
        ],
      },
      aiFeature: {
        en: '🎯 AI analyzes case precedents for best defense',
        es: '🎯 IA analiza precedentes para mejor defensa',
      },
    },
    {
      id: 'family-law',
      title: { en: 'Family Law', es: 'Derecho Familiar' },
      icon: '👨‍👩‍👧‍👦',
      description: {
        en: 'Compassionate representation for all family legal matters.',
        es: 'Representación compasiva para todos los asuntos legales familiares.',
      },
      services: {
        en: [
          'Divorce',
          'Child Custody',
          'Child Support',
          'Alimony',
          'Property Division',
          'Adoption',
        ],
        es: [
          'Divorcio',
          'Custodia de Menores',
          'Manutención Infantil',
          'Pensión Alimenticia',
          'División de Propiedad',
          'Adopción',
        ],
      },
      aiFeature: {
        en: '📄 AI generates custody agreements in minutes',
        es: '📄 IA genera acuerdos de custodia en minutos',
      },
    },
    {
      id: 'traffic-violations',
      title: { en: 'Traffic Violations', es: 'Infracciones de Tráfico' },
      icon: '🚗',
      description: {
        en: 'Protecting your driving record and minimizing penalties.',
        es: 'Protegiendo su récord de manejo y minimizando penalidades.',
      },
      services: {
        en: [
          'Speeding Tickets',
          'Reckless Driving',
          'License Suspension',
          'CDL Violations',
          'Hit and Run',
          'Insurance Issues',
        ],
        es: [
          'Multas por Exceso de Velocidad',
          'Conducción Imprudente',
          'Suspensión de Licencia',
          'Violaciones CDL',
          'Atropello y Fuga',
          'Problemas de Seguro',
        ],
      },
      aiFeature: {
        en: '🚦 AI calculates best plea options',
        es: '🚦 IA calcula mejores opciones de declaración',
      },
    },
  ];

  const content = {
    en: {
      title: 'Practice Areas',
      subtitle: 'Comprehensive Legal Services Enhanced by AI Technology',
      description:
        'Choose your legal need below to learn how our experienced attorneys and cutting-edge AI technology can help you achieve the best possible outcome.',
      whyChoose: 'Why Choose Vasquez Law Firm?',
      experience: '60+ Years Combined Experience',
      technology: 'Advanced AI Technology',
      bilingual: 'Fully Bilingual Services',
      available: '24/7 AI Assistance',
      learnMore: 'Learn More',
      getHelp: 'Get Instant Help',
      cta: {
        title: 'Ready to Get Started?',
        subtitle: 'Free consultation available in English and Spanish',
        button1: 'Call 1-844-YO-PELEO',
        button2: 'Start Live Chat',
      },
    },
    es: {
      title: 'Áreas de Práctica',
      subtitle: 'Servicios Legales Integrales Mejorados con Tecnología IA',
      description:
        'Elija su necesidad legal a continuación para aprender cómo nuestros abogados experimentados y tecnología IA de vanguardia pueden ayudarle a lograr el mejor resultado posible.',
      whyChoose: '¿Por qué Elegir Vasquez Law Firm?',
      experience: '60+ Años de Experiencia Combinada',
      technology: 'Tecnología IA Avanzada',
      bilingual: 'Servicios Completamente Bilingües',
      available: 'Asistencia IA 24/7',
      learnMore: 'Aprender Más',
      getHelp: 'Obtener Ayuda Instantánea',
      cta: {
        title: '¿Listo para Empezar?',
        subtitle: 'Consulta gratuita disponible en inglés y español',
        button1: 'Llamar 1-844-YO-PELEO',
        button2: 'Iniciar Chat en Vivo',
      },
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Language Toggle - Fixed Position */}
      <div
className="fixed right-4 top-20 z-40 flex gap-2 rounded-full bg-black/50 p-1 backdrop-blur-sm"
      >
        <button
          onClick={() => setLanguage('en')}

                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            language === 'en' ? 'bg-primary text-black' : 'text-white hover:text-primary'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('es')}

                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            language === 'es' ? 'bg-primary text-black' : 'text-white hover:text-primary'
          }`}
        >
          ES
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
className="mx-auto max-w-2xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{t.title}</h1>
            <p className="mt-6 text-lg leading-8 text-primary">{t.subtitle}</p>
            <p className="mt-6 text-lg leading-8 text-gray-300">{t.description}</p>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-20" />
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area, index) => (
              <div
                key={area.id}

                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-8">
                  <div
                className="text-5xl mb-4">{area.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{area.title[language]}</h3>
                  <p className="text-gray-300 mb-6">{area.description[language]}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">
                      {language === 'es' ? 'Servicios:' : 'Services:'}
                    </h4>
                    <ul className="space-y-2">
                      {area.services[language].map((service, i) => (
                        <li key={i}

                className="flex items-start text-sm text-gray-400">
                          <span
                className="text-primary mr-2">✓</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-primary/10 p-4 mb-6 border border-primary/20">
                    <p className="text-sm font-semibold text-primary">{area.aiFeature[language]}</p>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/practice-areas/${area.id}`}

                className="flex-1 text-center px-4 py-2 bg-primary text-black rounded-md hover:bg-primary-600 transition-colors font-medium"
                    >
                      {t.learnMore}
                    </Link>
                    <button className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-black transition-colors font-medium">
                      {t.getHelp}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 sm:py-24 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">{t.whyChoose}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏆',
                title: t.experience,
                description:
                  language === 'es'
                    ? 'Abogados experimentados con historial comprobado'
                    : 'Experienced attorneys with proven track record',
              },
              {
                icon: '🤖',
                title: t.technology,
                description:
                  language === 'es'
                    ? 'IA de vanguardia para mejores resultados'
                    : 'Cutting-edge AI for better outcomes',
              },
              {
                icon: '🌐',
                title: t.bilingual,
                description:
                  language === 'es'
                    ? 'Comunicación fluida en inglés y español'
                    : 'Fluent communication in English and Spanish',
              },
              {
                icon: '⏰',
                title: t.available,
                description:
                  language === 'es'
                    ? 'Respuestas instantáneas día y noche'
                    : 'Instant answers day and night',
              },
            ].map((feature, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div
                className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mt-4 text-lg text-gray-300">{t.cta.subtitle}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:18449673536"
                className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-black shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t.cta.button1}
              </a>
              <button className="rounded-md bg-white/10 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                {t.cta.button2}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </div>
  );
}
