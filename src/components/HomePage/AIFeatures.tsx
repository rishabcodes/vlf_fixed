'use client';

import React, { useRef } from 'react';

// Simplified AIBrain component without 3D dependencies
function AIBrain() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#C9974D]/10 to-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
      {/* Animated particles effect using CSS */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#C9974D]/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface AIFeaturesProps {
  language: 'en' | 'es';
}

export default function AIFeatures({ language }: AIFeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const features = {
    en: [
      {
        title: 'AI Legal Assistant',
        description:
          '24/7 intelligent support that understands your case and provides instant guidance',
        icon: '🤖',
        stats: '10,000+ questions answered daily',
      },
      {
        title: 'Document Analysis',
        description:
          'Upload any legal document and get instant AI-powered analysis and recommendations',
        icon: '📄',
        stats: '99.9% accuracy rate',
      },
      {
        title: 'Voice-First Interface',
        description:
          'Speak naturally in English or Spanish - our AI understands context and nuance',
        icon: '🎙️',
        stats: '27 languages supported',
      },
      {
        title: 'Predictive Case Outcomes',
        description: 'AI analyzes thousands of similar cases to predict your chances of success',
        icon: '📊',
        stats: '85% prediction accuracy',
      },
      {
        title: 'Smart Scheduling',
        description:
          'AI finds the perfect meeting time and sends reminders in your preferred language',
        icon: '📅',
        stats: 'Zero missed appointments',
      },
      {
        title: 'Real-Time Updates',
        description: 'Get instant notifications about your case progress via text, email, or app',
        icon: '⚡',
        stats: '< 1 minute response time',
      },
    ],
    es: [
      {
        title: 'Asistente Legal IA',
        description:
          'Soporte inteligente 24/7 que entiende su caso y proporciona orientación instantánea',
        icon: '🤖',
        stats: '10,000+ preguntas respondidas diariamente',
      },
      {
        title: 'Análisis de Documentos',
        description: 'Suba cualquier documento legal y obtenga análisis instantáneo con IA',
        icon: '📄',
        stats: '99.9% tasa de precisión',
      },
      {
        title: 'Interfaz de Voz',
        description:
          'Hable naturalmente en inglés o español - nuestra IA entiende contexto y matices',
        icon: '🎙️',
        stats: '27 idiomas soportados',
      },
      {
        title: 'Predicción de Resultados',
        description: 'IA analiza miles de casos similares para predecir sus posibilidades de éxito',
        icon: '📊',
        stats: '85% precisión de predicción',
      },
      {
        title: 'Programación Inteligente',
        description: 'IA encuentra el momento perfecto para reuniones y envía recordatorios',
        icon: '📅',
        stats: 'Cero citas perdidas',
      },
      {
        title: 'Actualizaciones en Tiempo Real',
        description: 'Reciba notificaciones instantáneas sobre el progreso de su caso',
        icon: '⚡',
        stats: '< 1 minuto tiempo de respuesta',
      },
    ],
  };

  const t = features[language];

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden bg-black py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <AIBrain />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black text-white md:text-6xl">
            {language === 'en' ? 'AI-Powered Legal Services' : 'Servicios Legales con IA'}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {language === 'en'
              ? 'The future of law is here. Experience legal services enhanced by cutting-edge artificial intelligence.'
              : 'El futuro del derecho está aquí. Experimente servicios legales mejorados con inteligencia artificial de vanguardia.'}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9974D]/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                <p className="mb-4 text-gray-300">{feature.description}</p>
                <div className="flex items-center gap-2 text-sm text-[#C9974D]">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature.stats}</span>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#C9974D] to-[#E5B568] px-8 py-4 font-bold text-black transition-all hover:scale-105">
            <span className="relative z-10">
              {language === 'en' ? 'Experience AI Legal Help' : 'Experimente Ayuda Legal con IA'}
            </span>
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-20" />
          </button>
        </div>
      </div>
    </section>
  );
}
