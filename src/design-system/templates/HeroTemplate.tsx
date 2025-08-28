'use client';

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '../constants';

interface HeroTemplateProps {
  language: 'en' | 'es';
  variant?: 'default' | 'video' | 'split' | 'centered';
  backgroundImage?: string;
  videoUrl?: string;
  height?: 'full' | 'large' | 'medium';
}

export const HeroTemplate: React.FC<HeroTemplateProps> = ({
  language,
  variant = 'default',
  backgroundImage = '/images/hero-bg.jpg',
  videoUrl,
  height = 'full',
}) => {
  const content = {
    en: {
      headline: 'Fighting For Your Rights',
      subheadline: 'Since 1989',
      description:
        'Experienced immigration and personal injury attorneys serving North Carolina and Florida. Available 24/7 with AI-powered assistance.',
      cta1: 'Get Free Consultation',
      cta2: 'Chat with AI Assistant',
      stats: [
        { number: '60+', label: 'Years Experience' },
        { number: '30K+', label: 'Clients Helped' },
        { number: '98%', label: 'Success Rate' },
        { number: '24/7', label: 'AI Available' },
      ],
    },
    es: {
      headline: 'Luchando Por Tus Derechos',
      subheadline: 'Desde 1989',
      description:
        'Abogados experimentados de inmigración y lesiones personales sirviendo Carolina del Norte y Florida. Disponible 24/7 con asistencia impulsada por IA.',
      cta1: 'Consulta Gratis',
      cta2: 'Chatear con Asistente IA',
      stats: [
        { number: '60+', label: 'Años de Experiencia' },
        { number: '30K+', label: 'Clientes Ayudados' },
        { number: '98%', label: 'Tasa de Éxito' },
        { number: '24/7', label: 'IA Disponible' },
      ],
    },
  };

  const t = content[language];

  const getHeight = () => {
    switch (height) {
      case 'full':
        return 'min-h-screen';
      case 'large':
        return 'min-h-[80vh]';
      case 'medium':
        return 'min-h-[60vh]';
      default:
        return 'min-h-screen';
        }
};

  if (variant === 'video' && videoUrl) {
    return (
      <section
        className={`relative ${getHeight()} flex items-center justify-center overflow-hidden`}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div      className="relative z-10 text-center text-white px-4">
          <div
           }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">{t.headline}</h1>
            <p className="text-primary text-2xl md:text-3xl font-bold mb-2">{BRAND.tagline}</p>
            <p className="text-xl md:text-2xl mb-8 text-white/90">{t.subheadline}</p>
          <div className="animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">{t.headline}</h1>
            <p className="text-primary text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">{BRAND.tagline}</p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">{t.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary text-secondary font-bold rounded-full hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
              >
                {t.cta1}
              </Link>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border-2 border-white/50">
                {t.cta2}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className={`relative ${getHeight()} flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
             }}
            >
            <div className="animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
                {t.headline}
              </h1>
              <p className="text-primary text-xl md:text-2xl font-bold mb-2">{BRAND.tagline}</p>
              <p className="text-lg md:text-xl text-neutral-600 mb-8">{t.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-primary text-secondary font-bold rounded-full hover:bg-primary-600 transition-all transform hover:scale-105 shadow-md text-center"
                >
                  {t.cta1}
                </Link>
                <button className="px-6 py-3 bg-secondary text-white font-bold rounded-full hover:bg-secondary-700 transition-all shadow-md">
                  {t.cta2}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                {t.stats.map((stat, index) => (
                  <div
                    key={index}

                className="text-center lg:text-left"
                  >
                    <div
                className="text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <Image
                src="/william-vasquez-hero.png"
                alt="William Vasquez"
                width={500}
                height={600}
                className="w-full h-auto rounded-lg shadow-2xl max-w-md mx-auto lg:max-w-none"
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-secondary p-6 rounded-lg shadow-xl">
                <p className="font-bold text-lg">William Vasquez</p>
                <p className="text-sm">Founding Attorney</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section
      className={`relative ${getHeight()} flex items-center justify-center bg-cover bg-center`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div
         }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t.headline}</h1>
          <p className="text-primary text-xl md:text-2xl font-bold mb-2">{BRAND.tagline}</p>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">{t.description}</p>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{t.headline}</h1>
          <p className="text-primary text-lg sm:text-xl md:text-2xl font-bold mb-2">{BRAND.tagline}</p>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">{t.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12">
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-secondary font-bold rounded-full hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg text-center"
            >
              {t.cta1}
            </Link>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border-2 border-white/50">
              {t.cta2}
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {t.stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
