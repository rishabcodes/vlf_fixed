'use client';

import React, { useState, useEffect } from 'react';

import {
  Phone,
  MessageCircle,
  ArrowRight,
  Globe,
  Shield,
  Users,
  Award,
  Zap,
  Brain,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { EnhancedCTA, AnimatedStats } from './EnhancedTemplates';

interface HomePageTemplateProps {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  stats?: Array<{
    value: string;
    label: string;
    prefix?: string;
    suffix?: string;
  }>;
  practiceAreas: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    urgency: 'critical' | 'high' | 'medium' | 'low';
    href: string;
  }>;
  features?: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

export const HomePageTemplate: React.FC<HomePageTemplateProps> = ({
  heroTitle,
  heroSubtitle: _heroSubtitle,
  heroDescription,
  stats,
  practiceAreas,
  features,
}) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const { scrollY } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Animated text effect
  const [displayText, setDisplayText] = useState('');
  const fullText = language === 'en' ? 'YO PELEO POR TI™' : 'I FIGHT FOR YOU™';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  const defaultStats = stats || [
    {
      value: '60',
      suffix: '+',
      label: language === 'en' ? 'Years Combined Experience' : 'Años de Experiencia Combinada',
    },
    {
      value: '30',
      suffix: 'K+',
      label: language === 'en' ? 'Clients Represented' : 'Clientes Representados',
    },
    { value: '98', suffix: '%', label: language === 'en' ? 'Success Rate' : 'Tasa de Éxito' },
    { value: '24/7', label: language === 'en' ? 'Emergency Response' : 'Respuesta de Emergencia' },
  ];

  const defaultFeatures = features || [
    {
      title: language === 'en' ? 'AI-Powered Legal Assistant' : 'Asistente Legal con IA',
      description:
        language === 'en'
          ? 'Get instant answers to your legal questions 24/7'
          : 'Obtenga respuestas instantáneas a sus preguntas legales 24/7',
      icon: <Brain className="w-8 h-8" />,
    },
    {
      title: language === 'en' ? 'Former Prosecutors on Staff' : 'Ex Fiscales en el Personal',
      description:
        language === 'en'
          ? 'We know both sides of the courtroom'
          : 'Conocemos ambos lados de la sala del tribunal',
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: language === 'en' ? 'No Win, No Fee' : 'Sin Ganar, Sin Honorarios',
      description:
        language === 'en'
          ? 'You pay nothing unless we win your case'
          : 'No paga nada a menos que ganemos su caso',
      icon: <Award className="w-8 h-8" />,
    },
  ];

  return (
    <>
      {/* Hero Section - Full Screen with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-burgundy-900/20 to-gold-900/10" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 container mx-auto px-4 text-center"

        >
          {/* Language Toggle - Floating */}
          <div className="absolute right-4 top-4 flex items-center gap-2"
          >
            <Globe className="w-5 h-5 text-gold-400" />
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold transition-all',
                language === 'en' ? 'bg-gold-500 text-black' : 'text-white/70 hover:text-white'
              )}
            >
              EN
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => setLanguage('es')}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold transition-all',
                language === 'es' ? 'bg-gold-500 text-black' : 'text-white/70 hover:text-white'
              )}
            >
              ES
            </button>
          </div>

          {/* Main Hero Content */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              {heroTitle}
            </h1>

            <div className="text-3xl md:text-4xl text-gold-400 font-bold mb-6 h-12">
              {displayText}
              <span className="inline-block w-1 h-8 bg-gold-400 ml-1"
              />
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              {heroDescription}
            </p>

            {/* CTA Buttons with Animation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <EnhancedCTA variant="primary" size="lg" href="/contact" className="group">
                {language === 'en' ? 'Get Free Case Review' : 'Evaluación Gratuita'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </EnhancedCTA>

              <EnhancedCTA variant="secondary" size="lg" href="tel:1-844-967-3536">
                <Phone className="w-5 h-5 mr-2 animate-pulse" />
                1-844-YO-PELEO
              </EnhancedCTA>
            </div>

            {/* Trust Indicators */}
            <div
className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold-400" />
                {language === 'en' ? 'Licensed in NC & FL' : 'Licenciado en NC y FL'}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold-400" />
                {language === 'en' ? 'Se Habla Español' : 'We Speak English'}
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold-400" />
                {language === 'en' ? '24/7 Emergency' : 'Emergencia 24/7'}
              </span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="w-8 h-8 text-gold-400" />
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-20 bg-gradient-to-r from-neutral-950 to-neutral-900">
        <div className="container mx-auto px-4">
          <AnimatedStats stats={defaultStats} variant="dark" />
        </div>
      </section>

      {/* Practice Areas Grid with Urgency Indicators */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-900/5 to-transparent" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {language === 'en' ? 'How Can We Help You?' : '¿Cómo Podemos Ayudarte?'}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Select your legal issue below for immediate assistance'
                : 'Seleccione su problema legal a continuación para asistencia inmediata'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area, index) => (
              <div key={area.id} className="group"
              >
                <Link href={area.href}>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-6 border border-gold-500/20 hover:border-gold-500 transition-all overflow-hidden">
                    {/* Urgency Badge */}
                    {area.urgency !== 'low' && (
                      <div
                        className={cn(
                          'absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white',
                          area.urgency === 'critical' && 'bg-red-600 animate-pulse',
                          area.urgency === 'high' && 'bg-orange-600',
                          area.urgency === 'medium' && 'bg-blue-600'
                        )}
                      >
                        {area.urgency === 'critical' && 'URGENT'}
                        {area.urgency === 'high' && 'TIME SENSITIVE'}
                        {area.urgency === 'medium' && 'IMPORTANT'}
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                      <span className="text-4xl mb-4 block">{area.icon}</span>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{area.description}</p>
                      <span className="inline-flex items-center text-gold-400 font-semibold">
                        {language === 'en' ? 'Learn More' : 'Aprende Más'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 via-burgundy-950/10 to-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {language === 'en'
                ? 'Why Choose Vasquez Law Firm?'
                : '¿Por Qué Elegir Bufete Vásquez?'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {defaultFeatures.map((feature, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500/20 transition-colors">
                  <div
                className="text-gold-400">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Paralegal Popup */}
      <div
className="fixed bottom-24 right-6 z-50"
      >
        <div className="bg-gradient-to-br from-gold-600 to-gold-500 rounded-lg p-4 shadow-2xl max-w-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <p className="text-black font-semibold text-sm">
                {language === 'en'
                  ? 'Need help? Chat with our AI assistant!'
                  : '¿Necesita ayuda? ¡Chatea con nuestro asistente!'}
              </p>
              <button className="text-black/80 text-xs underline mt-1">
                {language === 'en' ? 'Start Chat' : 'Iniciar Chat'}
              </button>
            </div>
            <button className="text-black/60 hover:text-black">
              <span className="text-xl">×</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageTemplate;
