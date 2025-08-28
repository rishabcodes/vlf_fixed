'use client';

import React from 'react';
import { Shield, Users, Globe, Award, Clock, Building } from 'lucide-react';

interface FirmHighlightsProps {
  language: 'en' | 'es';
}

export default function FirmHighlights({ language }: FirmHighlightsProps) {
  const content = {
    en: {
      title: 'Why Choose Vasquez Law Firm',
      subtitle: 'A Legacy of Fighting for Justice',
      highlights: [
        {
          icon: Shield,
          title: 'Military Discipline',
          description: 'U.S. Air Force veteran bringing tactical precision to legal battles',
        },
        {
          icon: Users,
          title: 'Bilingual Excellence',
          description: 'Fluent legal services in English and Spanish - Se Habla Español',
        },
        {
          icon: Globe,
          title: 'Immigration Expertise',
          description:
            'Helping families navigate complex immigration laws for 60+ years collective experience',
        },
        {
          icon: Award,
          title: 'Proven Results',
          description:
            "Thousands of successful cases in personal injury, workers' comp, and criminal defense",
        },
        {
          icon: Clock,
          title: '24/7 Availability',
          description: "Round-the-clock support because legal emergencies don't wait",
        },
        {
          icon: Building,
          title: '4 Convenient Locations',
          description: 'Charlotte, Raleigh, Smithfield, and Orlando offices to serve you',
        },
      ],
    },
    es: {
      title: 'Por Qué Elegir Vasquez Law Firm',
      subtitle: 'Un Legado de Lucha por la Justicia',
      highlights: [
        {
          icon: Shield,
          title: 'Disciplina Militar',
          description:
            'Veterano de la Fuerza Aérea de EE.UU. trayendo precisión táctica a batallas legales',
        },
        {
          icon: Users,
          title: 'Excelencia Bilingüe',
          description: 'Servicios legales fluidos en inglés y español',
        },
        {
          icon: Globe,
          title: 'Expertos en Inmigración',
          description:
            'Ayudando a familias a navegar leyes de inmigración complejas por 60+ años de experiencia colectiva',
        },
        {
          icon: Award,
          title: 'Resultados Comprobados',
          description:
            'Miles de casos exitosos en lesiones personales, compensación laboral y defensa criminal',
        },
        {
          icon: Clock,
          title: 'Disponible 24/7',
          description: 'Apoyo las 24 horas porque las emergencias legales no esperan',
        },
        {
          icon: Building,
          title: '4 Ubicaciones Convenientes',
          description: 'Oficinas en Charlotte, Raleigh, Smithfield y Orlando para servirle',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative py-24 bg-mesh-light overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="gradient-orb-burgundy w-80 h-80 top-10 left-0 animate-float-orb opacity-30" />
      <div className="gradient-orb-gold w-96 h-96 bottom-10 right-0 animate-float-orb-reverse opacity-25" />
      <div className="gradient-orb-mixed w-64 h-64 top-1/3 right-1/3 opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          className="text-center mb-16 animate-fadeIn"
        >
          <h2 className="text-4xl md:text-5xl font-bold heading-serif text-gray-900 mb-4">{t.title}</h2>
          <div className="divider-professional mx-auto"></div>
          <p className="text-xl text-gradient-gold font-semibold">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}

                className="card-professional group relative overflow-hidden hover:border-gold-400 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50 to-transparent opacity-0 group-hover:opacity-100 transition-professional" />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-gold-100 to-gold-50 group-hover:from-gold-200 group-hover:to-gold-100 transition-professional">
                    <Icon className="h-8 w-8 text-burgundy-700 animate-float" />
                  </div>

                  <h3 className="text-xl font-bold heading-serif text-gray-900 mb-2 group-hover:text-burgundy-700 transition-professional">{highlight.title}</h3>
                  <p className="text-gray-600 text-professional">{highlight.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy-700 to-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-gold-100/20 to-burgundy-100/20 blur-3xl animate-pulse" />
      </div>
    </section>
  );
}
