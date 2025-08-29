import React from 'react';
import { TRADEMARK } from '@/lib/constants/trademark';

interface QwikHeroProps {
  language: 'en' | 'es';
}

export const QwikHero: React.FC<QwikHeroProps> = ({ language = 'en' }) => {
  const content = {
    en: {
      badge: 'U.S. Air Force Veteran Attorney',
      title: TRADEMARK.YO_PELEO_POR_TI,
      intro: 'Fighting for your',
      rotatingWords: ['Immigration', 'Personal Injury', 'Workers Comp', 'Criminal Defense'],
      description:
        'When you need a fighter in your corner, I bring military discipline and legal expertise to protect your rights and secure your future.',
      cta1: 'Free Case Evaluation',
      cta2: 'Call Now: 1-844-YO-PELEO',
      stats: [
        { value: '60+', label: 'Years Experience' },
        { value: '30K+', label: 'Clients Helped' },
        { value: '98%', label: 'Success Rate' },
        { value: '24/7', label: 'Available' },
      ],
    },
    es: {
      badge: 'Abogado Veterano de la Fuerza Aérea',
      title: TRADEMARK.YO_PELEO_POR_TI,
      intro: 'Luchando por tu',
      rotatingWords: [
        'Inmigración',
        'Lesiones Personales',
        'Compensación Laboral',
        'Defensa Criminal',
      ],
      description:
        'Cuando necesitas un luchador en tu esquina, traigo disciplina militar y experiencia legal para proteger tus derechos y asegurar tu futuro.',
      cta1: 'Evaluación Gratuita',
      cta2: 'Llame Ahora: 1-844-YO-PELEO',
      stats: [
        { value: '60+', label: 'Años de Experiencia' },
        { value: '30K+', label: 'Clientes Ayudados' },
        { value: '98%', label: 'Tasa de Éxito' },
        { value: '24/7', label: 'Disponible' },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Static Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium text-primary">{t.badge}</span>
              </div>

              {/* Title */}
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-black text-white font-playfair">
                {t.title}
              </h1>

              {/* Static rotating text display - shows first word */}
              <div className="mb-8 flex items-baseline gap-3 text-2xl sm:text-3xl">
                <span className="text-gray-300">{t.intro}</span>
                <span className="font-bold text-primary">{t.rotatingWords[0]}</span>
              </div>

              {/* Description */}
              <p className="mb-10 max-w-xl text-lg text-gray-300">{t.description}</p>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-primary rounded-full hover:bg-primary-600 transition-colors shadow-lg"
                >
                  {t.cta1}
                </a>
                <a
                  href="tel:1-844-965-3536"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary bg-transparent border-2 border-primary rounded-full hover:bg-primary hover:text-black transition-colors"
                >
                  {t.cta2}
                </a>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {t.stats.map(stat => (
                  <div key={stat.label}

                className="text-center">
                    <div
                className="text-3xl font-black text-primary">{stat.value}</div>
                    <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Attorney Image */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <img
                  src="/william-vasquez-cutout.png"
                  alt="William Vasquez"
                  width={500}
                  height={600}

                className="relative z-10"
                  loading="eager"
                />
                {/* Static Glow Effect */}
                <div className="absolute inset-0 blur-3xl">
                  <div className="h-full w-full bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/50 p-2">
          <div className="h-3 w-1 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};
