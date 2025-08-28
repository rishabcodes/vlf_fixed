'use client';

import React, { useState, useEffect, memo } from 'react';
import { Button } from '@/design-system/components/Button';

import { Phone, MessageCircle, ChevronRight, Shield, Award, Clock, Users } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load schema component
const PracticeAreaSchema = dynamic(
  () => import('@/components/SEO/PracticeAreaSchema').then(mod => mod.PracticeAreaSchema),
  { ssr: true }
);

interface ModernPracticeAreaTemplateProps {
  title: string;
  subtitle?: string;
  description?: string;
  content:
    | React.ReactElement
    | {
        introduction?: string;
        processTitle?: string;
        process?: Array<{
          step: string;
          title: string;
          description: string;
        }>;
        urgencyTitle?: string;
        urgencyMessage?: string;
        successStats?: Array<{
          number: string;
          label: string;
        }>;
        whyChooseTitle?: string;
        whyChoosePoints?: string[];
        penaltiesTitle?: string;
        penalties?: Array<{
          title: string;
          criminal: string[];
          license: string[];
        }>;
        stateComparison?: {
          title: string;
          states: Array<{
            name: string;
            points: string[];
          }>;
        };
      };
  services?: Array<{
    title: string;
    description: string;
    icon?: string;
    features?: string[];
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  metadata?: {
    title: string;
    description: string;
  };
}

export const ModernPracticeAreaTemplate: React.FC<ModernPracticeAreaTemplateProps> = ({
  title,
  subtitle,
  description,
  content,
  services = [],
  faqs = [],
}) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [activeService, setActiveService] = useState<number>(-1);

  useEffect(() => {
    // Only access navigator in browser environment
    if (typeof window !== 'undefined' && navigator?.language) {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('es')) {
        setLanguage('es');
      }
    }
  }, []);

  const stats = [
    {
      icon: Shield,
      value: '60+',
      label: language === 'en' ? 'Years Experience' : 'Años de Experiencia',
    },
    {
      icon: Users,
      value: '30K+',
      label: language === 'en' ? 'Clients Helped' : 'Clientes Ayudados',
    },
    { icon: Award, value: '98%', label: language === 'en' ? 'Success Rate' : 'Tasa de Éxito' },
    { icon: Clock, value: '24/7', label: language === 'en' ? 'Available' : 'Disponible' },
  ];

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Language Toggle */}
        <div className="fixed right-4 top-20 z-40 flex gap-2 rounded-full bg-black/50 p-1 backdrop-blur-sm"
        >
          <button
            onClick={() => setLanguage('en')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              language === 'en' ? 'bg-primary text-black' : 'text-white hover:text-primary'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              language === 'es' ? 'bg-primary text-black' : 'text-white hover:text-primary'
            }`}
          >
            ES
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
            <div className="absolute inset-0" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                {title}
              </h1>
              {subtitle && <h2 className="text-2xl md:text-3xl text-primary mb-6">{subtitle}</h2>}
              {description && (
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">{description}</p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-primary text-black hover:bg-primary-300 transition-all transform hover:scale-105"
                >
                  {language === 'en' ? 'Free Case Evaluation' : 'Evaluación Gratuita'}
                </Button>
                <Button
                  href="tel:1-844-967-3536"
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-black transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  1-844-YO-PELEO
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div
className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-primary/20"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div
                className="text-3xl font-black text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        {services.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {language === 'en' ? 'Our Services' : 'Nuestros Servicios'}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}

                onClick={() => setActiveService(activeService === index ? -1 : index)}

                className={`cursor-pointer p-6 rounded-lg border transition-all ${
                      activeService === index
                        ? 'bg-primary/10 border-primary'
                        : 'bg-white/5 border-white/10 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          activeService === index ? 'rotate-90 text-primary' : 'text-gray-400'
                        }`}
                      />
                    </div>

                    <>
                      {activeService === index && (
                        <div
className="overflow-hidden"
                        >
                          <p className="text-gray-300 mb-3">{service.description}</p>
                          {service.features && service.features.length > 0 && (
                            <ul className="space-y-2">
                              {service.features.map((feature, fIndex) => (
                                <li key={fIndex}

                className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span
                className="text-sm text-gray-400">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </>
                  </div>
                ))}
              </div>

              {/* Service Details Panel - Alternative Display Option */}
              <>
                {activeService >= 0 && activeService < services.length && (
                  <div
className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20"
                  >
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      {services[activeService]?.title || ''}
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      {services[activeService]?.description || ''}
                    </p>
                    {services[activeService]?.features &&
                      services[activeService]?.features.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">
                            {language === 'en' ? 'What We Handle:' : 'Lo Que Manejamos:'}
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {services[activeService].features.map((feature, index) => (
                              <div key={index}

                className="flex items-center">
                                <Shield className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                <span
                className="text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    <div className="mt-6 flex gap-4">
                      <Button
                        href="/contact"
                        size="md"
                        className="bg-primary text-black hover:bg-primary-300"
                      >
                        {language === 'en' ? 'Get Help Now' : 'Obtener Ayuda Ahora'}
                      </Button>
                      <Button
                        href="tel:1-844-967-3536"
                        variant="outline"
                        size="md"
                        className="border-primary text-primary hover:bg-primary hover:text-black"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Call Now' : 'Llame Ahora'}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-20 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
className="space-y-16"
            >
              {/* Render custom ReactElement content or structured object content */}
              {React.isValidElement(content) ? (
                content
              ) : (
                <>
                  {/* Introduction */}
                  {typeof content === 'object' &&
                    content &&
                    'introduction' in content &&
                    content.introduction && (
                      <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl text-gray-300 leading-relaxed">
                          {content.introduction}
                        </p>
                      </div>
                    )}

                  {/* Process Section */}
                  {typeof content === 'object' &&
                    content &&
                    'process' in content &&
                    'processTitle' in content &&
                    content.process &&
                    content.processTitle && (
                      <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
                          {content.processTitle}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {content.process.map((step, index) => (
                            <div
                              key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                            >
                              <div
                className="text-3xl font-black text-primary mb-3">
                                {step.step}
                              </div>
                              <h3 className="text-xl font-semibold text-white mb-3">
                                {step.title}
                              </h3>
                              <p className="text-gray-300">{step.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Urgency Section */}
                  {typeof content === 'object' &&
                    content &&
                    'urgencyTitle' in content &&
                    'urgencyMessage' in content &&
                    content.urgencyTitle &&
                    content.urgencyMessage && (
                      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-black text-red-400 mb-4">
                          {content.urgencyTitle}
                        </h2>
                        <p className="text-lg text-gray-300">{content.urgencyMessage}</p>
                      </div>
                    )}

                  {/* Success Stats */}
                  {typeof content === 'object' &&
                    content &&
                    'successStats' in content &&
                    content.successStats && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {content.successStats.map((stat, index) => (
                          <div
                            key={index}

                className="text-center"
                          >
                            <div
                className="text-4xl md:text-5xl font-black text-primary mb-2">
                              {stat.number}
                            </div>
                            <div className="text-gray-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                  {/* Why Choose Us */}
                  {typeof content === 'object' &&
                    content &&
                    'whyChooseTitle' in content &&
                    'whyChoosePoints' in content &&
                    content.whyChooseTitle &&
                    content.whyChoosePoints && (
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
                          {content.whyChooseTitle}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {content.whyChoosePoints.map((point, index) => (
                            <div
                              key={index}

                className="flex items-center gap-3"
                            >
                              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                              <span
                className="text-gray-300">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Penalties Section */}
                  {typeof content === 'object' &&
                    content &&
                    'penalties' in content &&
                    'penaltiesTitle' in content &&
                    content.penalties &&
                    content.penaltiesTitle && (
                      <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
                          {content.penaltiesTitle}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                          {content.penalties.map((penalty, index) => (
                            <div
                              key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30"
                            >
                              <h3
                className="text-xl font-bold text-red-400 mb-6">
                                {penalty.title}
                              </h3>
                              <div className="grid gap-6">
                                <div>
                                  <h4 className="text-lg font-semibold text-white mb-3">
                                    Criminal Penalties
                                  </h4>
                                  <ul className="space-y-2">
                                    {penalty.criminal.map((item: string, i: number) => (
                                      <li key={i}

                className="flex items-center gap-2 text-gray-300">
                                        <span
                className="text-red-400">•</span>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-white mb-3">
                                    License Penalties
                                  </h4>
                                  <ul className="space-y-2">
                                    {penalty.license.map((item: string, i: number) => (
                                      <li key={i}

                className="flex items-center gap-2 text-gray-300">
                                        <span
                className="text-red-400">•</span>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* State Comparison */}
                  {typeof content === 'object' &&
                    content &&
                    'stateComparison' in content &&
                    content.stateComparison && (
                      <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
                          {content.stateComparison.title}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                          {content.stateComparison.states.map((state, index) => (
                            <div
                              key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                            >
                              <h3
                className="text-xl font-bold text-primary mb-6">{state.name}</h3>
                              <ul className="space-y-3">
                                {state.points.map((point: string, i: number) => (
                                  <li key={i}

                className="flex items-start gap-2 text-gray-300">
                                    <span
                className="text-primary mt-1">•</span>
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                  >
                    <h3
                className="text-xl font-semibold text-primary mb-3">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
                {language === 'en'
                  ? 'Get Your FREE Consultation Today'
                  : 'Obtenga Su Consulta GRATIS Hoy'}
              </h2>
              <p className="text-xl text-black/80 mb-8">
                {language === 'en'
                  ? 'Call 1-844-YO-PELEO or chat with our AI assistant 24/7'
                  : 'Llame al 1-844-YO-PELEO o chatee con nuestro asistente AI 24/7'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="tel:1-844-967-3536"
                  size="lg"
                  className="bg-black text-primary hover:bg-gray-900 transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Call Now' : 'Llame Ahora'}: 1-844-YO-PELEO
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-primary transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Start Live Chat' : 'Iniciar Chat en Vivo'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        {/* Comprehensive Practice Area Schema for SEO */}
        <PracticeAreaSchema
          title={title}
          description={
            description ||
            (React.isValidElement(content)
              ? title
              : typeof content === 'object' && content && 'introduction' in content
                ? content.introduction
                : title) ||
            title
          }
          services={services}
          faqs={faqs}
        />
      </div>
    </>
  );
};

export default ModernPracticeAreaTemplate;
