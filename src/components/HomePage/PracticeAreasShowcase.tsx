'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface PracticeAreasShowcaseProps {
  language: 'en' | 'es';
}

const PracticeAreasShowcase = React.memo(({ language }: PracticeAreasShowcaseProps) => {
  const [activeArea, setActiveArea] = useState(0);

  const areas = useMemo(() => [
    {
      id: 'immigration',
      icon: '🌍',
      color: '#C9974D',
      title: language === 'en' ? 'Immigration Law' : 'Ley de Inmigración',
      subtitle: language === 'en' ? 'Your Path to the American Dream' : 'Tu Camino al Sueño Americano',
      description:
        language === 'en'
          ? 'From visa applications to citizenship, we guide you through every step with expertise and compassion.'
          : 'Desde solicitudes de visa hasta ciudadanía, te guiamos en cada paso con experiencia y compasión.',
      features:
        language === 'en'
          ? ['Green Cards', 'Citizenship', 'Work Visas', 'Family Reunification', 'Deportation Defense']
          : ['Tarjetas Verdes', 'Ciudadanía', 'Visas de Trabajo', 'Reunificación Familiar', 'Defensa de Deportación'],
      stats: {
        cases: language === 'en' ? '5,000+ Cases Won' : '5,000+ Casos Ganados',
        rate: '98% Success Rate',
      },
    },
    {
      id: 'personal-injury',
      icon: '🏥',
      color: '#6B1F2E',
      title: language === 'en' ? 'Personal Injury' : 'Lesiones Personales',
      subtitle:
        language === 'en' ? 'Maximum Compensation for Your Pain' : 'Máxima Compensación por Tu Dolor',
      description:
        language === 'en'
          ? 'When accidents happen, we fight insurance companies to secure the compensation you deserve.'
          : 'Cuando ocurren accidentes, luchamos contra las aseguradoras para asegurar la compensación que mereces.',
      features:
        language === 'en'
          ? ['Car Accidents', 'Truck Accidents', 'Slip & Fall', 'Medical Malpractice', 'Product Liability']
          : ['Accidentes de Auto', 'Accidentes de Camión', 'Resbalones y Caídas', 'Negligencia Médica', 'Responsabilidad del Producto'],
      stats: {
        cases: language === 'en' ? '$50M+ Recovered' : '$50M+ Recuperados',
        rate: language === 'en' ? 'No Win, No Fee' : 'Sin Ganar, Sin Pagar',
      },
    },
    {
      id: 'criminal-defense',
      icon: '⚖️',
      color: '#8B0000',
      title: language === 'en' ? 'Criminal Defense' : 'Defensa Criminal',
      subtitle: language === 'en' ? 'Your Freedom Is Our Mission' : 'Tu Libertad Es Nuestra Misión',
      description:
        language === 'en'
          ? 'From misdemeanors to federal cases, we provide aggressive defense when your future is at stake.'
          : 'Desde delitos menores hasta casos federales, proporcionamos defensa agresiva cuando tu futuro está en juego.',
      features:
        language === 'en'
          ? ['DUI/DWI', 'Drug Charges', 'Federal Crimes', 'White Collar', 'Expungements']
          : ['DUI/DWI', 'Cargos de Drogas', 'Crímenes Federales', 'Cuello Blanco', 'Eliminación de Antecedentes'],
      stats: {
        cases: language === 'en' ? '500+ Dismissals' : '500+ Desestimaciones',
        rate: language === 'en' ? '24/7 Available' : '24/7 Disponible',
      },
    },
    {
      id: 'workers-comp',
      icon: '👷',
      color: '#FF8C00',
      title: language === 'en' ? "Workers' Compensation" : 'Compensación Laboral',
      subtitle:
        language === 'en' ? 'Protecting Injured Workers' : 'Protegiendo a Trabajadores Lesionados',
      description:
        language === 'en'
          ? 'Workplace injuries can devastate families. We ensure you get medical care and lost wages covered.'
          : 'Las lesiones laborales pueden devastar familias. Aseguramos que recibas atención médica y salarios perdidos.',
      features:
        language === 'en'
          ? ['Construction Injuries', 'Factory Accidents', 'Repetitive Stress', 'Disability Benefits', 'Third-Party Claims']
          : ['Lesiones de Construcción', 'Accidentes de Fábrica', 'Estrés Repetitivo', 'Beneficios por Discapacidad', 'Reclamos de Terceros'],
      stats: {
        cases: language === 'en' ? '2,500+ Workers Helped' : '2,500+ Trabajadores Ayudados',
        rate: '95% Approval Rate',
      },
    },
  ], [language]);

  const currentArea = areas[activeArea];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-burgundy-950/5 to-black py-24">
      {/* Floating gradient orbs */}
      <div className="gradient-orb-burgundy w-80 h-80 top-20 right-10 animate-float-orb opacity-50" />
      <div className="gradient-orb-gold w-72 h-72 bottom-20 left-20 animate-float-orb-reverse opacity-40" />
      
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div
          className="mb-16 text-center animate-fadeIn"
        >
          <h2 className="mb-4 text-5xl font-black text-white md:text-6xl font-serif">
            {language === 'en' ? 'Practice Areas' : 'Áreas de Práctica'}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {language === 'en'
              ? 'Four pillars of legal excellence, powered by 60+ years of experience'
              : 'Cuatro pilares de excelencia legal, impulsados por 60+ años de experiencia'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Active Area Display */}
          <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 animate-slideUp">
            <div className="flex h-full flex-col justify-between">
              {/* Icon and Title */}
              <div>
                <div
                  className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full animate-float"
                  style={{ backgroundColor: currentArea.color + '20' }}
                >
                  <span className="text-5xl">{currentArea.icon}</span>
                </div>
                
                <h3 className="mb-2 text-3xl font-bold text-white">{currentArea.title}</h3>
                <p className="mb-4 text-xl text-[#C9974D]">{currentArea.subtitle}</p>
                <p className="mb-6 text-lg text-gray-300">{currentArea.description}</p>
                
                {/* Features */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {currentArea.features.map(feature => (
                    <span
                      key={feature}

                className="rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <div className="text-2xl font-bold text-[#C9974D]">{currentArea.stats.cases}</div>
                  <div className="text-sm text-gray-400">
                    {language === 'en' ? 'Track Record' : 'Historial'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C9974D]">{currentArea.stats.rate}</div>
                  <div className="text-sm text-gray-400">
                    {language === 'en' ? 'Success Metric' : 'Métrica de Éxito'}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/practice-areas/${currentArea.id}`}

                className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C9974D] to-[#E5B568] px-6 py-3 font-bold text-black transition-all hover:scale-105"
              >
                {language === 'en' ? 'Learn More' : 'Aprende Más'} →
              </Link>
            </div>

            {/* Active Area Indicator */}
            <div className="absolute bottom-8 right-8">
              <div className="flex gap-2">
                {areas.map((_, index) => (
                  <button
                    key={index}

                onClick={() => setActiveArea(index)}

                className={`h-2 w-8 rounded-full transition-all ${
                      activeArea === index ? 'bg-[#C9974D]' : 'bg-white/20'
                    }`}

                aria-label={`View ${areas[index].title}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Practice Area Cards */}
          <div className="space-y-4">
            {areas.map((area, index) => (
              <div
                key={area.id}
                onMouseEnter={() => setActiveArea(index)}

                className={`group relative overflow-hidden rounded-2xl border transition-all cursor-pointer animate-slideUp ${
                  activeArea === index
                    ? 'border-[#C9974D] bg-gradient-to-br from-[#6B1F2E]/20 to-transparent'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}

                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-white">{area.title}</h3>
                      <p className="text-sm text-gray-400">{area.subtitle}</p>
                    </div>
                    <div
                      className="rounded-full p-2"
                      style={{ backgroundColor: area.color + '20' }}
                    >
                      <span className="text-2xl">{area.icon}</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <span className="text-[#C9974D]">{area.stats.cases}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-300">{area.stats.rate}</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${area.color}20, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 text-center animate-fadeIn"
        >
          <p className="mb-6 text-xl text-gray-300">
            {language === 'en'
              ? 'Not sure which practice area fits your case?'
              : '¿No está seguro qué área de práctica se ajusta a su caso?'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            {language === 'en' ? 'Get Free Case Evaluation' : 'Obtener Evaluación Gratuita'}
            <span className="text-[#C9974D]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
});

PracticeAreasShowcase.displayName = 'PracticeAreasShowcase';

export default PracticeAreasShowcase;
