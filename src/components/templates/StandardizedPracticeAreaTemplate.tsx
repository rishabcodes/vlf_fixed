'use client';

import React, { useState } from 'react';
import { Button } from '@/design-system/components/Button';

import {
  Phone,
  MessageCircle,
  ChevronRight,
  Shield,
  Award,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { PracticeAreaSchema } from '@/components/SEO/PracticeAreaSchema';

// Type definitions
interface Attorney {
  name: string;
  role: string;
  experience: string;
  specializations: string[];
  image?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Service {
  title: string;
  description: string;
  icon?: React.ReactNode;
  features?: string[];
  link?: string;
}

interface RelatedService {
  title: string;
  description: string;
  link: string;
  urgency?: 'high' | 'medium' | 'low';
}

interface CTA {
  primary: {
    text: string;
    link: string;
  };
  secondary: {
    text: string;
    link: string;
  };
}

interface StandardizedPracticeAreaTemplateProps {
  // Core content
  title: string;
  subtitle?: string;
  description: string;

  // Sections
  overview: {
    title?: string;
    content: string;
    highlights?: string[];
  };

  services: Service[];

  faqs: FAQ[];

  attorneys?: Attorney[];

  relatedServices?: RelatedService[];

  // CTAs
  cta?: CTA;

  // SEO
  metadata?: {
    title: string;
    description: string;
    keywords?: string;
  };

  // Additional content
  additionalContent?: React.ReactNode;

  // Language support
  isSpanish?: boolean;
}

const StandardizedPracticeAreaTemplate: React.FC<StandardizedPracticeAreaTemplateProps> = ({
  title,
  subtitle,
  description,
  overview,
  services,
  faqs,
  attorneys = [],
  relatedServices = [],
  cta,
  metadata,
  additionalContent,
  isSpanish = false,
}) => {
  const [activeService, setActiveService] = useState<number>(-1);
  const [activeFAQ, setActiveFAQ] = useState<number>(-1);
  const { language } = useLanguage();

  // Default CTAs
  const defaultCTA = {
    primary: {
      text: isSpanish ? 'Consulta Gratis' : 'Free Consultation',
      link: isSpanish ? '/es/contacto' : '/contact',
    },
    secondary: {
      text: '1-844-YO-PELEO',
      link: 'tel:1-844-967-3536',
    },
  };

  const finalCTA = cta || defaultCTA;

  // Stats for hero section
  const stats = [
    {
      icon: Shield,
      value: '60+',
      label: isSpanish ? 'Años de Experiencia' : 'Years Experience',
    },
    {
      icon: Users,
      value: '30K+',
      label: isSpanish ? 'Clientes Ayudados' : 'Clients Helped',
    },
    {
      icon: Award,
      value: '98%',
      label: isSpanish ? 'Tasa de Éxito' : 'Success Rate',
    },
    {
      icon: Clock,
      value: '24/7',
      label: isSpanish ? 'Disponible' : 'Available',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
            <div
              className="absolute inset-0"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                {title}
              </h1>
              {subtitle && <h2 className="text-2xl md:text-3xl text-primary mb-6">{subtitle}</h2>}
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">{description}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href={finalCTA.primary.link}
                  size="lg"
                  className="bg-primary text-black hover:bg-primary-300 transition-all transform hover:scale-105"
                >
                  {finalCTA.primary.text}
                </Button>
                <Button
                  href={finalCTA.secondary.link}
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-black transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {finalCTA.secondary.text}
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

        {/* Overview Section */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
                {overview.title || (isSpanish ? 'Resumen' : 'Overview')}
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">{overview.content}</p>
                {overview.highlights && overview.highlights.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {overview.highlights.map((highlight, index) => (
                      <div
                        key={index}

                className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span
                className="text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        {services.length > 0 && (
          <section className="py-20 bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {isSpanish ? 'Nuestros Servicios' : 'Our Services'}
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

                    <p className="text-gray-300 mb-3">{service.description}</p>

                    <>
                      {activeService === index && service.features && (
                        <div
className="overflow-hidden"
                        >
                          <ul className="space-y-2 mt-4">
                            {service.features.map((feature, fIndex) => (
                              <li key={fIndex}

                className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span
                className="text-sm text-gray-400">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {isSpanish ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden"
                  >
                    <button
                onClick={() => setActiveFAQ(activeFAQ === index ? -1 : index)}

                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-primary pr-4">{faq.question}</h3>
                      <ChevronRight
                        className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
                          activeFAQ === index ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    <>
                      {activeFAQ === index && (
                        <div
className="px-6 pb-6"
                        >
                          <p className="text-gray-300">{faq.answer}</p>
                        </div>
                      )}
                    </>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Attorney Expertise Section */}
        {attorneys.length > 0 && (
          <section className="py-20 bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {isSpanish ? 'Nuestros Abogados Expertos' : 'Our Expert Attorneys'}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {attorneys.map((attorney, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                  >
                    {attorney.image && (
                      <img
                        src={attorney.image}

                alt={attorney.name}

                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                    )}
                    <h3 className="text-xl font-bold text-white text-center mb-2">
                      {attorney.name}
                    </h3>
                    <p className="text-primary text-center mb-2">{attorney.role}</p>
                    <p className="text-gray-400 text-center mb-4">{attorney.experience}</p>
                    <div className="space-y-1">
                      {attorney.specializations.map((spec, sIndex) => (
                        <div key={sIndex}

                className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span
                className="text-sm text-gray-300">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Additional Content */}
        {additionalContent && (
          <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{additionalContent}</div>
          </section>
        )}

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {isSpanish ? 'Servicios Relacionados' : 'Related Services'}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((service, index) => (
                  <div
                    key={index}
                  >
                    <Link
                      href={service.link}
                      className={`block p-6 rounded-lg border transition-all hover:scale-105 ${
                        service.urgency === 'high'
                          ? 'bg-red-900/20 border-red-500/30 hover:border-red-500'
                          : 'bg-white/5 border-white/10 hover:border-primary/50'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                      <div className="flex items-center text-primary">
                        <span className="text-sm font-semibold">
                          {isSpanish ? 'Más información' : 'Learn more'}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Link>
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
                {isSpanish ? 'Obtenga Su Consulta GRATIS Hoy' : 'Get Your FREE Consultation Today'}
              </h2>
              <p className="text-xl text-black/80 mb-8">
                {isSpanish
                  ? 'Llame al 1-844-YO-PELEO o chatee con nuestro asistente AI 24/7'
                  : 'Call 1-844-YO-PELEO or chat with our AI assistant 24/7'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="tel:1-844-967-3536"
                  size="lg"
                  className="bg-black text-primary hover:bg-gray-900 transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {isSpanish ? 'Llame Ahora' : 'Call Now'}: 1-844-YO-PELEO
                </Button>
                <Button
                  href={isSpanish ? '/es/contacto' : '/contact'}
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-primary transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {isSpanish ? 'Iniciar Chat en Vivo' : 'Start Live Chat'}
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

        {/* SEO Schema */}
        <PracticeAreaSchema
          title={metadata?.title || title}
          description={metadata?.description || description}
          services={services}
          faqs={faqs}
        />
      </div>
    </>
  );
};

export default StandardizedPracticeAreaTemplate;
