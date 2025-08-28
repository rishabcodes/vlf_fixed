'use client';

import React from 'react';
import Link from 'next/link';

import Script from 'next/script';

interface PracticeAreasPageContentProps {
  language: 'en' | 'es';
}

export default function PracticeAreasPageContent({ language }: PracticeAreasPageContentProps) {
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
      href: language === 'es' ? '/es/areas-de-practica/inmigracion' : '/practice-areas/immigration',
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
      href:
        language === 'es'
          ? '/es/areas-de-practica/lesiones-personales'
          : '/practice-areas/personal-injury',
    },
    {
      id: 'workers-compensation',
      title: { en: "Workers' Compensation", es: 'Compensación Laboral' },
      icon: '👷',
      description: {
        en: "Protecting injured workers\' rights and securing the benefits you deserve.",
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
      href:
        language === 'es'
          ? '/es/areas-de-practica/compensacion-laboral'
          : '/practice-areas/workers-compensation',
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
      href:
        language === 'es'
          ? '/es/areas-de-practica/defensa-criminal'
          : '/practice-areas/criminal-defense',
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
      href:
        language === 'es' ? '/es/areas-de-practica/derecho-familia' : '/practice-areas/family-law',
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
      href:
        language === 'es'
          ? '/es/areas-de-practica/infracciones-transito'
          : '/practice-areas/traffic-violations',
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
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center"
            suppressHydrationWarning
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-[#C9974D] font-semibold mb-6">{t.subtitle}</p>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <div
                key={area.id}
                suppressHydrationWarning
                className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all border border-gray-200"
              >
                <div className="p-8">
                  <div
                    className="text-5xl mb-4"
                    suppressHydrationWarning
                  >{area.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{area.title[language]}</h3>
                  <p className="text-gray-600 mb-6">{area.description[language]}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {language === 'es' ? 'Servicios:' : 'Services:'}
                    </h4>
                    <ul className="space-y-2">
                      {area.services[language].map((service, i) => (
                        <li key={i}
                          suppressHydrationWarning
                          className="flex items-start text-sm text-gray-600">
                          <span
                            className="text-[#C9974D] mr-2"
                            suppressHydrationWarning
                          >✓</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#C9974D]/10 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-[#6B1F2E]">
                      {area.aiFeature[language]}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={area.href}
                      suppressHydrationWarning
                      className="flex-1 text-center px-4 py-2 bg-[#6B1F2E] text-white rounded-md hover:bg-[#8B2635] transition-colors font-medium"
                    >
                      {t.learnMore}
                    </Link>
                    <button className="flex-1 px-4 py-2 border-2 border-[#C9974D] text-[#C9974D] rounded-md hover:bg-[#C9974D] hover:text-white transition-colors font-medium">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.whyChoose}</h2>
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
                suppressHydrationWarning
                className="text-center bg-white p-6 rounded-lg shadow-lg"
              >
                <div
                  className="text-5xl mb-4"
                  suppressHydrationWarning
                >{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#C9974D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'es' ? '¿Necesitas Ayuda Legal?' : 'Need Legal Help?'}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {language === 'es'
              ? 'Contacta a nuestros abogados experimentados hoy para una consulta gratuita'
              : 'Contact our experienced attorneys today for a free consultation'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={language === 'es' ? '/es/contacto' : '/contact'}
              suppressHydrationWarning
              className="bg-white text-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              {language === 'es' ? 'Agendar Consulta' : 'Schedule Consultation'}
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-[#6B1F2E] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#8B2635] transition-colors inline-flex items-center justify-center gap-2"
            >
              <span className="text-xl">📞</span>
              1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Script
        id="practice-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Legal Services',
            provider: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawnc.com',
              telephone: '+1-844-967-3536',
              priceRange: '$$',
            },
            areaServed: [
              {
                '@type': 'State',
                name: 'North Carolina',
              },
              {
                '@type': 'State',
                name: 'Florida',
              },
            ],
            url:
              language === 'es'
                ? 'https://www.vasquezlawnc.com/es/areas-de-practica'
                : 'https://www.vasquezlawnc.com/practice-areas',
            description:
              language === 'es'
                ? 'Servicios legales integrales en Carolina del Norte y Florida. Consulta gratuita. Se habla español.'
                : 'Comprehensive legal services in North Carolina and Florida. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
