'use client';

import React from 'react';

interface ContactCTAProps {
  language: 'en' | 'es';
}

export default function ContactCTA({ language }: ContactCTAProps) {
  const content = {
    en: {
      title: 'Ready to Fight for Your Rights?',
      subtitle: 'YO PELEO POR TI™ - We Fight For You',
      description: 'Available 24/7. Free consultation. No fees unless we win.',
      cta: {
        primary: 'Start Free Consultation',
        secondary: 'Call Now: (855) 929-6299',
      },
      features: [
        'Immediate Response',
        'Bilingual Support',
        '4 Office Locations',
        '60+ Years Experience',
      ],
    },
    es: {
      title: '¿Listo para Luchar por Sus Derechos?',
      subtitle: 'YO PELEO POR TI™ - Luchamos Por Ti',
      description: 'Disponible 24/7. Consulta gratuita. Sin cargos a menos que ganemos.',
      cta: {
        primary: 'Iniciar Consulta Gratuita',
        secondary: 'Llame Ahora: (855) 929-6299',
      },
      features: [
        'Respuesta Inmediata',
        'Apoyo Bilingüe',
        '4 Ubicaciones',
        '60+ Años de Experiencia',
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#6B1F2E] via-[#8B2F3E] to-[#C9974D] py-24">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/justice-pattern.svg')] opacity-10" />
        <div
className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        />
        <div
className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-black/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div
className="text-center"
        >
          {/* Main Content */}
          <h2 className="mb-4 text-5xl font-black text-white md:text-7xl">{t.title}</h2>
          <p className="mb-2 text-3xl font-bold text-[#FFF8E7]">{t.subtitle}</p>
          <p className="mb-12 text-xl text-white/90">{t.description}</p>

          {/* Features */}
          <div className="mb-12 flex flex-wrap justify-center gap-6">
            {t.features.map((feature, index) => (
              <div
                key={index}

                className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm"
              >
                <svg className="h-5 w-5 text-[#FFF8E7]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                className="font-semibold text-white">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
className="group relative overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-[#6B1F2E] shadow-2xl transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.cta.primary}
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8E7] to-white opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <a
              href="tel:8559296299"
className="group flex items-center gap-3 rounded-full border-2 border-white bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#6B1F2E]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>{t.cta.secondary}</span>
            </a>
          </div>

          {/* Office Locations */}
          <div
className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { city: 'Raleigh', address: '4426 Louisburg Road' },
              { city: 'Charlotte', address: '6925 E Independence Blvd' },
              { city: 'Winston-Salem', address: '3800 Vest Mill Rd' },
              { city: 'Orlando', address: '37 N Orange Ave #500' },
            ].map((office, index) => (
              <div key={index}

                className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <h4
                className="font-bold text-white">{office.city}</h4>
                <p className="text-sm text-white/80">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div
className="absolute top-10 left-10 text-6xl opacity-20"
      >
        ⚖️
      </div>
      <div
className="absolute bottom-10 right-10 text-6xl opacity-20"
      >
        🛡️
      </div>
    </section>
  );
}
