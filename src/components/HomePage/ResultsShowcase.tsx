'use client';

import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface ResultsShowcaseProps {
  language: 'en' | 'es';
}

export default function ResultsShowcase({ language }: ResultsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const content = {
    en: {
      title: 'Proven Results That Speak Volumes',
      subtitle: 'Real victories for real people',
      categories: [
        {
          name: 'Immigration Success',
          icon: '🌍',
          results: [
            {
              amount: '$0',
              label: 'Average Cost Saved',
              description: 'Through efficient case handling',
            },
            {
              amount: '5,000+',
              label: 'Families Reunited',
              description: 'Bringing loved ones together',
            },
            { amount: '98%', label: 'Approval Rate', description: 'For properly prepared cases' },
            {
              amount: '2-3 months',
              label: 'Faster Processing',
              description: 'Than industry average',
            },
          ],
          testimonial: {
            quote:
              "They made my American dream come true. After 10 years of waiting, I'm finally a citizen!",
            author: 'Maria Rodriguez',
            case: 'Citizenship Application',
          },
        },
        {
          name: 'Personal Injury Wins',
          icon: '🏥',
          results: [
            { amount: '$2.5M', label: 'Largest Settlement', description: 'Truck accident case' },
            { amount: '$50M+', label: 'Total Recovered', description: 'For injured clients' },
            {
              amount: '100%',
              label: 'No Win, No Fee',
              description: 'You pay nothing unless we win',
            },
            { amount: '30 days', label: 'Average Settlement', description: 'Quick resolution' },
          ],
          testimonial: {
            quote:
              'After my accident, they fought the insurance company and got me 10x what I was offered.',
            author: 'James Thompson',
            case: 'Car Accident',
          },
        },
        {
          name: 'Criminal Defense Victories',
          icon: '⚖️',
          results: [
            { amount: '500+', label: 'Cases Dismissed', description: 'Charges dropped completely' },
            { amount: '98%', label: 'Trial Success Rate', description: 'When we go to court' },
            {
              amount: '24/7',
              label: 'Emergency Response',
              description: 'Always there when needed',
            },
            {
              amount: '1,000+',
              label: 'Reduced Sentences',
              description: 'Minimizing consequences',
            },
          ],
          testimonial: {
            quote: 'Facing 10 years, but they got my case dismissed. I owe them my freedom.',
            author: 'Michael Davis',
            case: 'Federal Drug Case',
          },
        },
        {
          name: "Workers' Compensation",
          icon: '🏗️',
          results: [
            {
              amount: '$1.2M',
              label: 'Largest Settlement',
              description: 'Construction injury case',
            },
            {
              amount: '2,500+',
              label: 'Injured Workers Helped',
              description: 'Getting benefits they deserve',
            },
            {
              amount: '95%',
              label: 'Approval Rate',
              description: 'For workplace injury claims',
            },
            {
              amount: '48 hours',
              label: 'Initial Response',
              description: 'Fast claim processing',
            },
          ],
          testimonial: {
            quote:
              'After my workplace injury, they secured my medical care and lost wages. I could focus on healing.',
            author: 'Roberto Martinez',
            case: 'Construction Site Accident',
          },
        },
        {
          name: 'Family Law Success',
          icon: '👨‍👩‍👧‍👦',
          results: [
            { amount: '1,000+', label: 'Families Helped', description: 'Through difficult times' },
            {
              amount: '90%',
              label: 'Custody Success',
              description: 'Favorable custody arrangements',
            },
            {
              amount: '30 days',
              label: 'Average Resolution',
              description: 'For uncontested divorces',
            },
            {
              amount: '24/7',
              label: 'Emergency Support',
              description: 'For domestic situations',
            },
          ],
          testimonial: {
            quote:
              'They helped me protect my children and secure a fair settlement. Professional and compassionate.',
            author: 'Sarah Johnson',
            case: 'Divorce & Custody',
          },
        },
      ],
    },
    es: {
      title: 'Resultados Comprobados Que Hablan Por Sí Solos',
      subtitle: 'Victorias reales para personas reales',
      categories: [
        {
          name: 'Éxito en Inmigración',
          icon: '🌍',
          results: [
            {
              amount: '$0',
              label: 'Costo Promedio Ahorrado',
              description: 'A través del manejo eficiente',
            },
            { amount: '5,000+', label: 'Familias Reunidas', description: 'Uniendo seres queridos' },
            {
              amount: '98%',
              label: 'Tasa de Aprobación',
              description: 'Para casos bien preparados',
            },
            {
              amount: '2-3 meses',
              label: 'Procesamiento Más Rápido',
              description: 'Que el promedio',
            },
          ],
          testimonial: {
            quote:
              'Hicieron realidad mi sueño americano. ¡Después de 10 años de espera, finalmente soy ciudadana!',
            author: 'Maria Rodriguez',
            case: 'Solicitud de Ciudadanía',
          },
        },
        {
          name: 'Victorias en Lesiones',
          icon: '🏥',
          results: [
            { amount: '$2.5M', label: 'Mayor Acuerdo', description: 'Caso de accidente de camión' },
            { amount: '$50M+', label: 'Total Recuperado', description: 'Para clientes lesionados' },
            {
              amount: '100%',
              label: 'Sin Ganar, Sin Pagar',
              description: 'No paga nada si no ganamos',
            },
            { amount: '30 días', label: 'Acuerdo Promedio', description: 'Resolución rápida' },
          ],
          testimonial: {
            quote:
              'Después de mi accidente, lucharon contra la aseguradora y obtuve 10x más de lo ofrecido.',
            author: 'James Thompson',
            case: 'Accidente de Auto',
          },
        },
        {
          name: 'Victorias en Defensa Criminal',
          icon: '⚖️',
          results: [
            {
              amount: '500+',
              label: 'Casos Desestimados',
              description: 'Cargos retirados completamente',
            },
            {
              amount: '98%',
              label: 'Tasa de Éxito en Juicio',
              description: 'Cuando vamos a corte',
            },
            {
              amount: '24/7',
              label: 'Respuesta de Emergencia',
              description: 'Siempre disponibles',
            },
            {
              amount: '1,000+',
              label: 'Sentencias Reducidas',
              description: 'Minimizando consecuencias',
            },
          ],
          testimonial: {
            quote: 'Enfrentaba 10 años, pero desestimaron mi caso. Les debo mi libertad.',
            author: 'Michael Davis',
            case: 'Caso Federal de Drogas',
          },
        },
        {
          name: 'Compensación Laboral',
          icon: '🏗️',
          results: [
            {
              amount: '$1.2M',
              label: 'Mayor Acuerdo',
              description: 'Caso de lesión en construcción',
            },
            {
              amount: '2,500+',
              label: 'Trabajadores Ayudados',
              description: 'Obteniendo beneficios merecidos',
            },
            {
              amount: '95%',
              label: 'Tasa de Aprobación',
              description: 'Para reclamos de lesiones',
            },
            {
              amount: '48 horas',
              label: 'Respuesta Inicial',
              description: 'Procesamiento rápido',
            },
          ],
          testimonial: {
            quote:
              'Después de mi lesión laboral, aseguraron mi atención médica y salarios perdidos. Pude enfocarme en sanar.',
            author: 'Roberto Martinez',
            case: 'Accidente en Construcción',
          },
        },
        {
          name: 'Éxito en Derecho Familiar',
          icon: '👨‍👩‍👧‍👦',
          results: [
            { amount: '1,000+', label: 'Familias Ayudadas', description: 'En tiempos difíciles' },
            { amount: '90%', label: 'Éxito en Custodia', description: 'Arreglos favorables' },
            {
              amount: '30 días',
              label: 'Resolución Promedio',
              description: 'Para divorcios sin disputa',
            },
            {
              amount: '24/7',
              label: 'Apoyo de Emergencia',
              description: 'Para situaciones domésticas',
            },
          ],
          testimonial: {
            quote:
              'Me ayudaron a proteger a mis hijos y asegurar un acuerdo justo. Profesionales y compasivos.',
            author: 'Sarah Johnson',
            case: 'Divorcio y Custodia',
          },
        },
      ],
    },
  };

  const t = content[language];
  const activeResults = activeCategory !== null ? t.categories[activeCategory] : null;

  return (
    <section ref={ref}

                className="relative overflow-hidden bg-mesh-dark py-24">
      {/* Floating gradient orbs */}
      <div className="gradient-orb-gold w-72 h-72 top-10 right-20 animate-float-orb opacity-60" />
      <div className="gradient-orb-burgundy w-96 h-96 bottom-0 left-0 animate-float-orb-reverse opacity-50" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/justice-pattern.svg')] bg-center" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div
          className="mb-16 text-center animate-fadeIn"
        >
          <h2 className="mb-4 text-5xl font-black text-white md:text-6xl font-serif">{t.title}</h2>
          <p className="text-xl text-gray-300">{t.subtitle}</p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {t.categories.map((category, index) => (
            <button
              key={index}

                onClick={() => setActiveCategory(index)}

                className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all transform hover:scale-105 active:scale-95 ${
                activeCategory === index
                  ? 'bg-[#C9974D] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {activeResults && (
          <div
            key={activeCategory}

                className="animate-fadeIn"
          >
            {/* Results Grid */}
            <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {activeResults.results.map((result, index) => (
                <div
                  key={index}

                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 text-center backdrop-blur-sm animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-2 text-4xl font-black text-[#C9974D]">
                    {result.amount.includes('$') ||
                    result.amount.includes('%') ||
                    result.amount.includes('+') ? (
                      result.amount
                    ) : inView ? (
                      <CountUp end={parseInt(result.amount)} duration={2} suffix="+" />
                    ) : (
                      '0'
                    )}
                  </div>
                  <h4 className="mb-1 font-semibold text-white font-serif">{result.label}</h4>
                  <p className="text-sm text-gray-400">{result.description}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6B1F2E]/20 to-transparent p-8 backdrop-blur-sm animate-fadeIn"
              style={{ animationDelay: '500ms' }}
            >
              <div className="absolute -top-4 -left-4 text-6xl text-[#C9974D]/20">&quot;</div>
              <blockquote className="relative z-10">
                <p className="mb-4 text-xl italic text-white">{activeResults.testimonial.quote}</p>
                <footer className="flex items-center justify-between">
                  <div>
                    <cite className="font-semibold text-[#C9974D]">
                      {activeResults.testimonial.author}
                    </cite>
                    <p className="text-sm text-gray-400">{activeResults.testimonial.case}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}

                className="h-5 w-5 text-[#C9974D]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-12 text-center animate-fadeIn"
        >
          <p className="mb-4 text-lg text-gray-300">
            {language === 'en'
              ? 'Ready to add your success story to our collection?'
              : '¿Listo para agregar su historia de éxito a nuestra colección?'}
          </p>
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#C9974D] to-[#E5B568] px-8 py-4 font-bold text-black transition-all hover:scale-105">
            <span className="relative z-10">
              {language === 'en' ? 'Start Your Victory' : 'Comience Su Victoria'}
            </span>
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-20" />
          </button>
        </div>
      </div>
    </section>
  );
}
