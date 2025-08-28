'use client';

import React from 'react';
import Link from 'next/link';

import { Car, Building, Stethoscope, AlertTriangle, DollarSign, CheckCircle } from 'lucide-react';

interface PersonalInjuryPageContentProps {
  language: 'en' | 'es';
}

export default function PersonalInjuryPageContent({ language }: PersonalInjuryPageContentProps) {
  const content = {
    en: {
      title: 'Personal Injury Law',
      subtitle: 'Fighting for Maximum Compensation for Accident Victims',
      description:
        'Our experienced personal injury lawyers are committed to fighting for the compensation you deserve. No fees unless we win your case.',
      whyChoose: 'Why Choose Us?',
      reasons: [
        'Over 35 years of combined experience',
        'Free consultations in Spanish',
        'Available 24/7 for emergencies',
        'Proven track record of successful cases',
        'No fees unless we win your case',
      ],
      howWeHelp: 'How We Can Help',
      services: [
        'Free case evaluation',
        'Investigation and evidence gathering',
        'Medical expert consultations',
        'Insurance claim negotiations',
        'Court representation if needed',
      ],
      practiceAreas: 'Types of Personal Injury Cases',
      areas: [
        {
          icon: Car,
          title: 'Car Accidents',
          description:
            'Helping victims of auto accidents get fair compensation for medical bills, lost wages, and pain.',
        },
        {
          icon: Building,
          title: 'Slip & Fall',
          description: 'Premises liability cases for injuries on unsafe property conditions.',
        },
        {
          icon: Stethoscope,
          title: 'Medical Malpractice',
          description: 'Holding healthcare providers accountable for medical negligence.',
        },
        {
          icon: AlertTriangle,
          title: 'Workplace Injuries',
          description: 'Protecting injured workers and securing proper compensation.',
        },
        {
          icon: DollarSign,
          title: 'Wrongful Death',
          description: 'Supporting families who have lost loved ones due to negligence.',
        },
        {
          icon: CheckCircle,
          title: 'Product Liability',
          description: 'Cases involving defective products that cause injury.',
        },
      ],
      ctaTitle: 'Need Help with Personal Injury?',
      ctaDescription: 'Contact our experienced attorneys today for a free consultation',
      scheduleConsultation: 'Schedule Consultation',
      callNow: 'Call: 1-844-YO-PELEO',
    },
    es: {
      title: 'Ley de Lesiones Personales',
      subtitle: 'Luchando por la Máxima Compensación para Víctimas de Accidentes',
      description:
        'Nuestros abogados experimentados en lesiones personales están comprometidos a luchar por la compensación que merece. Sin honorarios a menos que ganemos su caso.',
      whyChoose: '¿Por Qué Elegirnos?',
      reasons: [
        'Más de 35 años de experiencia combinada',
        'Consultas gratuitas en español',
        'Disponibles 24/7 para emergencias',
        'Historial comprobado de casos exitosos',
        'Sin honorarios a menos que ganemos su caso',
      ],
      howWeHelp: 'Cómo Podemos Ayudarte',
      services: [
        'Evaluación gratuita de tu caso',
        'Investigación y recopilación de evidencia',
        'Consultas con expertos médicos',
        'Negociaciones de reclamos de seguro',
        'Representación en corte si es necesario',
      ],
      practiceAreas: 'Tipos de Casos de Lesiones Personales',
      areas: [
        {
          icon: Car,
          title: 'Accidentes de Auto',
          description:
            'Ayudando a víctimas de accidentes automovilísticos a obtener compensación justa por gastos médicos, salarios perdidos y dolor.',
        },
        {
          icon: Building,
          title: 'Resbalones y Caídas',
          description:
            'Casos de responsabilidad de locales por lesiones en condiciones inseguras de propiedad.',
        },
        {
          icon: Stethoscope,
          title: 'Negligencia Médica',
          description: 'Responsabilizando a proveedores de atención médica por negligencia médica.',
        },
        {
          icon: AlertTriangle,
          title: 'Lesiones Laborales',
          description: 'Protegiendo a trabajadores lesionados y asegurando compensación adecuada.',
        },
        {
          icon: DollarSign,
          title: 'Muerte Injusta',
          description: 'Apoyando a familias que han perdido seres queridos debido a negligencia.',
        },
        {
          icon: CheckCircle,
          title: 'Responsabilidad de Productos',
          description: 'Casos que involucran productos defectuosos que causan lesiones.',
        },
      ],
      ctaTitle: '¿Necesitas Ayuda con Lesiones Personales?',
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
