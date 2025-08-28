'use client';

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  Award,
  Users,
  Scale,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UniversalPageTemplateProps {
  // Page Content
  title: string;
  titleEs?: string;
  subtitle?: string;
  subtitleEs?: string;
  description: string;
  descriptionEs?: string;

  // Hero Section
  heroImage?: string;
  heroVideo?: string;
  heroOverlay?: boolean;

  // Features/Services
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    titleEs?: string;
    description: string;
    descriptionEs?: string;
  }>;

  // Benefits
  benefits?: Array<{
    title: string;
    titleEs?: string;
    description: string;
    descriptionEs?: string;
  }>;

  // Process Steps
  processSteps?: Array<{
    number: string;
    title: string;
    titleEs?: string;
    description: string;
    descriptionEs?: string;
  }>;

  // FAQ
  faqs?: Array<{
    question: string;
    questionEs?: string;
    answer: string;
    answerEs?: string;
  }>;

  // CTA
  ctaTitle?: string;
  ctaTitleEs?: string;
  ctaDescription?: string;
  ctaDescriptionEs?: string;
  ctaButtonText?: string;
  ctaButtonTextEs?: string;
  ctaButtonLink?: string;

  // Stats
  stats?: Array<{
    value: string;
    label: string;
    labelEs?: string;
  }>;

  // Testimonials
  testimonials?: Array<{
    name: string;
    content: string;
    contentEs?: string;
    rating: number;
  }>;

  // Related Pages
  relatedPages?: Array<{
    title: string;
    titleEs?: string;
    description: string;
    descriptionEs?: string;
    link: string;
  }>;

  // Meta
  locale?: 'en' | 'es';
  className?: string;
}

export function UniversalPageTemplate({
  title,
  titleEs,
  subtitle,
  subtitleEs,
  description,
  descriptionEs,
  heroImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=80',
  heroVideo,
  heroOverlay = true,
  features = [],
  benefits = [],
  processSteps = [],
  faqs = [],
  ctaTitle,
  ctaTitleEs,
  ctaDescription,
  ctaDescriptionEs,
  ctaButtonText = 'Get Free Consultation',
  ctaButtonTextEs = 'Consulta Gratuita',
  ctaButtonLink = '/contact',
  stats = [],
  testimonials = [],
  relatedPages = [],
  locale = 'en',
  className,
}: UniversalPageTemplateProps) {
  const isSpanish = locale === 'es';

  // Default stats if none provided
  const defaultStats =
    stats.length > 0
      ? stats
      : [
          { value: '25+', label: 'Years Experience', labelEs: 'Años de Experiencia' },
          { value: '10,000+', label: 'Cases Won', labelEs: 'Casos Ganados' },
          { value: '98%', label: 'Success Rate', labelEs: 'Tasa de Éxito' },
          { value: '24/7', label: 'Available', labelEs: 'Disponible' },
        ];

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        {/* Background */}
        {heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
                src={heroImage}

                alt={title} fill className="object-cover" priority />
        )}

        {/* Overlay */}
        {heroOverlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        )}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="py-24 md:py-32 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {isSpanish ? titleEs || title : title}
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl mb-6 text-white/90">
                {isSpanish ? subtitleEs || subtitle : subtitle}
              </p>
            )}
            <p className="text-lg md:text-xl max-w-3xl mb-8 text-white/80">
              {isSpanish ? descriptionEs || description : description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaButtonLink}

                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {isSpanish ? ctaButtonTextEs : ctaButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-965-3536"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {defaultStats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-300">
                  {isSpanish ? stat.labelEs || stat.label : stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isSpanish ? 'Nuestros Servicios' : 'Our Services'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isSpanish ? feature.titleEs || feature.title : feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {isSpanish ? feature.descriptionEs || feature.description : feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isSpanish ? 'Nuestro Proceso' : 'Our Process'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  <div className="text-6xl font-bold text-primary-100 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isSpanish ? step.titleEs || step.title : step.title}
                  </h3>
                  <p className="text-gray-600">
                    {isSpanish ? step.descriptionEs || step.description : step.description}
                  </p>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-primary-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <section className="py-16 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isSpanish ? '¿Por Qué Elegirnos?' : 'Why Choose Us?'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-primary-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {isSpanish ? benefit.titleEs || benefit.title : benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {isSpanish
                        ? benefit.descriptionEs || benefit.description
                        : benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isSpanish ? 'Lo Que Dicen Nuestros Clientes' : 'What Our Clients Say'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "
                    {isSpanish ? testimonial.contentEs || testimonial.content : testimonial.content}
                    "
                  </p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isSpanish ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                    {isSpanish ? faq.questionEs || faq.question : faq.question}
                    <span className="ml-4 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    {isSpanish ? faq.answerEs || faq.answer : faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Pages */}
      {relatedPages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isSpanish ? 'Páginas Relacionadas' : 'Related Pages'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPages.map((page, index) => (
                <div
                  key={index}
                >
                  <Link
                    href={page.link}
                    className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {isSpanish ? page.titleEs || page.title : page.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {isSpanish ? page.descriptionEs || page.description : page.description}
                    </p>
                    <span className="inline-flex items-center text-primary-600 hover:text-primary-700">
                      {isSpanish ? 'Leer más' : 'Learn more'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isSpanish
                ? ctaTitleEs || ctaTitle || '¿Listo para Comenzar?'
                : ctaTitle || 'Ready to Get Started?'}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {isSpanish
                ? ctaDescriptionEs || ctaDescription || 'Contáctenos hoy para una consulta gratuita'
                : ctaDescription || 'Contact us today for a free consultation'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={ctaButtonLink}

                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                {isSpanish ? ctaButtonTextEs : ctaButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-965-3536"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold"
              >
                <Phone className="mr-2 w-5 h-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
