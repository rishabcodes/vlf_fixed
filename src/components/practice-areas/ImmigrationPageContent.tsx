'use client';

import React from 'react';
import Link from 'next/link';

import { Users, Shield, Globe, FileText, Clock, CheckCircle } from 'lucide-react';

interface ImmigrationPageContentProps {
  language: 'en' | 'es';
}

export default function ImmigrationPageContent({ language }: ImmigrationPageContentProps) {
  const content = {
    en: {
      title: 'Immigration Law',
      subtitle: 'Expert Immigration Attorneys Fighting for Your American Dream',
      description:
        'Our experienced immigration lawyers are committed to providing high-quality legal representation for all your immigration needs.',
      whyChoose: 'Why Choose Us?',
      reasons: [
        'Over 35 years of combined experience',
        'Free consultations in Spanish',
        'Available 24/7 for emergencies',
        'Proven track record of successful cases',
        'Aggressive and compassionate representation',
      ],
      howWeHelp: 'How We Can Help',
      services: [
        'Free case evaluation',
        'Personalized legal strategies',
        'Clear and constant communication',
        'Court representation',
        'Aggressive negotiation',
      ],
      practiceAreas: 'Our Immigration Services',
      areas: [
        {
          icon: Users,
          title: 'Family-Based Immigration',
          description:
            'Helping families reunite through spouse visas, fiancé visas, and family petitions.',
        },
        {
          icon: Shield,
          title: 'Deportation Defense',
          description: 'Aggressive defense against removal proceedings and deportation.',
        },
        {
          icon: Globe,
          title: 'Citizenship & Naturalization',
          description: 'Guide you through the process of becoming a U.S. citizen.',
        },
        {
          icon: FileText,
          title: 'Green Cards',
          description: 'Assistance with green card applications and renewals.',
        },
        {
          icon: Clock,
          title: 'DACA & TPS',
          description: 'Help with DACA applications and Temporary Protected Status.',
        },
        {
          icon: CheckCircle,
          title: 'Business Immigration',
          description: 'Work visas, investor visas, and employment-based immigration.',
        },
      ],
      ctaTitle: 'Need Help with Immigration?',
      ctaDescription: 'Contact our experienced attorneys today for a free consultation',
      scheduleConsultation: 'Schedule Consultation',
      callNow: 'Call: 1-844-YO-PELEO',
    },
    es: {
      title: 'Ley de Inmigración',
      subtitle: 'Abogados Expertos en Inmigración Luchando por Su Sueño Americano',
      description:
        'Nuestros abogados experimentados en inmigración están comprometidos a proporcionar representación legal de alta calidad para todas sus necesidades de inmigración.',
      whyChoose: '¿Por Qué Elegirnos?',
      reasons: [
        'Más de 35 años de experiencia combinada',
        'Consultas gratuitas en español',
        'Disponibles 24/7 para emergencias',
        'Historial comprobado de casos exitosos',
        'Representación agresiva y compasiva',
      ],
      howWeHelp: 'Cómo Podemos Ayudarte',
      services: [
        'Evaluación gratuita de tu caso',
        'Estrategias legales personalizadas',
        'Comunicación clara y constante',
        'Representación en corte',
        'Negociación agresiva',
      ],
      practiceAreas: 'Nuestros Servicios de Inmigración',
      areas: [
        {
          icon: Users,
          title: 'Inmigración Familiar',
          description:
            'Ayudando a las familias a reunirse a través de visas de cónyuge, visas de prometido y peticiones familiares.',
        },
        {
          icon: Shield,
          title: 'Defensa contra Deportación',
          description: 'Defensa agresiva contra procedimientos de remoción y deportación.',
        },
        {
          icon: Globe,
          title: 'Ciudadanía y Naturalización',
          description:
            'Le guiamos a través del proceso de convertirse en ciudadano estadounidense.',
        },
        {
          icon: FileText,
          title: 'Tarjetas Verdes',
          description: 'Asistencia con solicitudes y renovaciones de tarjetas verdes.',
        },
        {
          icon: Clock,
          title: 'DACA y TPS',
          description: 'Ayuda con solicitudes de DACA y Estatus de Protección Temporal.',
        },
        {
          icon: CheckCircle,
          title: 'Inmigración de Negocios',
          description: 'Visas de trabajo, visas de inversionista e inmigración basada en empleo.',
        },
      ],
      ctaTitle: '¿Necesitas Ayuda con Inmigración?',
      ctaDescription: 'Contacta a nuestros abogados experimentados hoy para una consulta gratuita',
      scheduleConsultation: 'Agendar Consulta',
      callNow: 'Llamar: 1-844-YO-PELEO',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
           }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-[#C9974D] font-semibold mb-6">{t.subtitle}</p>
            <p className="text-xl max-w-3xl">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div
             }}
             }
            >
              <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">{t.whyChoose}</h2>
              <ul className="space-y-4">
                {t.reasons.map((reason, index) => (
                  <li key={index}

                className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#C9974D] mr-3 mt-0.5 flex-shrink-0" />
                    <span
                className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
             }}
             }
            >
              <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">{t.howWeHelp}</h2>
              <ul className="space-y-4">
                {t.services.map((service, index) => (
                  <li key={index}

                className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#C9974D] mr-3 mt-0.5 flex-shrink-0" />
                    <span
                className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#6B1F2E] mb-4">{t.practiceAreas}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.areas.map((area, index) => (
              <div
                key={index}

                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <area.icon className="w-8 h-8 text-[#C9974D] mr-3" />
                  <h3
                className="text-xl font-semibold text-[#6B1F2E]">{area.title}</h3>
                </div>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#C9974D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
           }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
            <p className="text-xl text-white/90 mb-8">{t.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={language === 'es' ? '/es/contacto' : '/contact'}

                className="bg-white text-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
              >
                {t.scheduleConsultation}
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="bg-[#6B1F2E] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#8B2635] transition-colors inline-flex items-center justify-center gap-2"
              >
                <span className="text-xl">📞</span>
                {t.callNow}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
