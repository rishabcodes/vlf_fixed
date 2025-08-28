'use client';

import React, { useState, useEffect, useCallback } from 'react';

import {
  Map,
  Phone,
  Clock,
  Star,
  MessageCircle,
  Calendar,
  Navigation,
  ChevronRight,
  Award,
  Users,
  Shield,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic imports for heavy components
const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

interface NearMePageClientProps {
  city: string;
  service: string;
  language?: 'en' | 'es';
  coordinates?: { lat: number; lng: number };
  nearbyOffices?: Array<{
    name: string;
    address: string;
    phone: string;
    distance: string;
  }>;
}

export default function NearMePageClient({
  city,
  service,
  language = 'en',
  coordinates,
  nearbyOffices = [],
}: NearMePageClientProps) {
  const [showMap, setShowMap] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Translations
  const t =
    language === 'es'
      ? {
          hero: {
            badge: 'Disponible 24/7',
            title: `${service} en ${city}`,
            subtitle: 'Los Abogados Más Agresivos de Carolina del Norte',
            cta: 'Consulta Gratuita',
            secondary: 'Ver Ubicaciones',
          },
          stats: {
            cases: 'Casos Ganados',
            recovered: 'Recuperado para Clientes',
            rating: 'Calificación de Clientes',
            years: 'Años de Experiencia',
          },
          sections: {
            whyChoose: '¿Por Qué Elegirnos?',
            testimonials: 'Lo Que Dicen Nuestros Clientes',
            locations: 'Oficinas Cerca de Ti',
            contact: 'Comienza Tu Caso Hoy',
            faq: 'Preguntas Frecuentes',
          },
          features: [
            {
              icon: Shield,
              title: 'Sin Cargos por Adelantado',
              desc: 'No pagas a menos que ganemos tu caso',
            },
            {
              icon: Award,
              title: 'Resultados Comprobados',
              desc: 'Más de $100M recuperados para clientes',
            },
            {
              icon: Users,
              title: 'Equipo Bilingüe',
              desc: 'Hablamos tu idioma y entendemos tu cultura',
            },
            {
              icon: Clock,
              title: 'Respuesta Rápida',
              desc: 'Disponible 24/7 para emergencias legales',
            },
          ],
        }
      : {
          hero: {
            badge: 'Available 24/7',
            title: `${service} in ${city}`,
            subtitle: "North Carolina's Most Aggressive Law Firm",
            cta: 'Free Consultation',
            secondary: 'View Locations',
          },
          stats: {
            cases: 'Cases Won',
            recovered: 'Recovered for Clients',
            rating: 'Client Rating',
            years: 'Years of Experience',
          },
          sections: {
            whyChoose: 'Why Choose Us?',
            testimonials: 'What Our Clients Say',
            locations: 'Offices Near You',
            contact: 'Start Your Case Today',
            faq: 'Frequently Asked Questions',
          },
          features: [
            {
              icon: Shield,
              title: 'No Upfront Fees',
              desc: "You don't pay unless we win your case",
            },
            { icon: Award, title: 'Proven Results', desc: 'Over $100M recovered for clients' },
            {
              icon: Users,
              title: 'Bilingual Team',
              desc: 'We speak your language and understand your culture',
            },
            { icon: Clock, title: 'Fast Response', desc: 'Available 24/7 for legal emergencies' },
          ],
        };

  // Sample testimonials
  const testimonials = [
    {
      name: 'Maria Rodriguez',
      rating: 5,
      text:
        language === 'es'
          ? 'Excelente servicio y resultados. Recuperaron más de lo esperado para mi caso.'
          : 'Excellent service and results. They recovered more than expected for my case.',
      case: language === 'es' ? 'Accidente de Auto' : 'Car Accident',
    },
    {
      name: 'John Smith',
      rating: 5,
      text:
        language === 'es'
          ? 'Profesionales y dedicados. Siempre disponibles para responder preguntas.'
          : 'Professional and dedicated. Always available to answer questions.',
      case: language === 'es' ? 'Compensación Laboral' : "Workers' Compensation",
    },
    {
      name: 'Ana Garcia',
      rating: 5,
      text:
        language === 'es'
          ? 'Me trataron como familia. Ganamos el caso y cambió mi vida.'
          : 'They treated me like family. We won the case and it changed my life.',
      case: language === 'es' ? 'Lesiones Personales' : 'Personal Injury',
    },
  ];

  // Initialize
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowMap(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleCall = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:1-844-967-3536';

      // Track analytics
      if (window.gtag) {
        window.gtag('event', 'contact', {
          event_category: 'engagement',
          event_label: 'phone_call',
          page_location: window.location.href,
        });
      }
    }
  }, []);

  const handleSchedule = useCallback(() => {
    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'schedule_consultation', {
        event_category: 'engagement',
        event_label: service,
        city: city,
      });
    }
  }, [city, service]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] via-[#8B2635] to-[#4A1620] text-white">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative container mx-auto px-4 py-20">
          <div
className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              {t.hero.badge}
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.hero.title}</h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90">{t.hero.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleCall} className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {t.hero.cta}
              </button>

              <button
                onClick={() =>
                  document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Map className="w-5 h-5" />
                {t.hero.secondary}
              </button>
            </div>
          </div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '30,000+', label: t.stats.cases },
              { value: '$100M+', label: t.stats.recovered },
              { value: '5.0', label: t.stats.rating, stars: true },
              { value: '35+', label: t.stats.years },
            ].map((stat, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div
                className="text-3xl md:text-4xl font-bold text-[#6B1F2E] mb-2">
                  {stat.value}
                  {stat.stars && (
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i}

                className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.sections.whyChoose}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.map((feature, index) => (
              <div
                key={index}

                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-[#6B1F2E] mb-4" />
                <h3
                className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="locations" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.sections.locations}</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>{showMap && <InteractiveMap city={city} coordinates={coordinates} />}</div>

            <div>
              <div className="space-y-4">
                {nearbyOffices.length > 0 ? (
                  nearbyOffices.map((office, index) => (
                    <div
                      key={index}

                className={`p-4 bg-white rounded-lg shadow cursor-pointer transition-all ${
                        selectedOffice === index ? 'ring-2 ring-[#6B1F2E]' : 'hover:shadow-lg'
                      }`}
      onClick={() => setSelectedOffice(index)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{office.name}</h3>
                          <p className="text-gray-600">{office.address}</p>
                          <p className="text-[#6B1F2E] font-medium">{office.phone}</p>
                        </div>
                        <div className="text-right">
                          <Navigation className="w-5 h-5 text-gray-400 mb-1" />
                          <p className="text-sm text-gray-500">{office.distance}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {language === 'es'
                        ? 'Cargando oficinas cercanas...'
                        : 'Loading nearby offices...'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.sections.testimonials}</h2>

          <div className="max-w-3xl mx-auto">
            <>
              <div
                key={testimonialIndex}

                className="bg-white p-8 rounded-lg shadow-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonials[testimonialIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i}

                className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-lg italic mb-4">
                  "{testimonials[testimonialIndex]?.text || ''}"
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{testimonials[testimonialIndex]?.name || ''}</p>
                    <p className="text-sm text-gray-600">
                      {testimonials[testimonialIndex]?.case || ''}
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-gray-300" />
                </div>
              </div>
            </>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-[#6B1F2E] to-[#4A1620] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.sections.contact}</h2>

          <div className="max-w-2xl mx-auto">
            <ContactForm
              service={service}
              city={city}
              language={language}
                onSubmitSuccess={handleSchedule}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.sections.faq}</h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: language === 'es' ? '¿Cuánto costará mi caso?' : 'How much will my case cost?',
                a:
                  language === 'es'
                    ? 'Trabajamos con honorarios de contingencia. No pagas nada por adelantado y solo cobramos si ganamos tu caso.'
                    : 'We work on a contingency fee basis. You pay nothing upfront and we only get paid if we win your case.',
              },
              {
                q:
                  language === 'es'
                    ? '¿Cuánto tiempo tomará mi caso?'
                    : 'How long will my case take?',
                a:
                  language === 'es'
                    ? 'Cada caso es único, pero la mayoría se resuelven en 6-12 meses. Los casos complejos pueden tomar más tiempo.'
                    : 'Every case is unique, but most are resolved within 6-12 months. Complex cases may take longer.',
              },
              {
                q: language === 'es' ? '¿Necesito una cita?' : 'Do I need an appointment?',
                a:
                  language === 'es'
                    ? 'Preferimos citas programadas, pero aceptamos casos urgentes sin cita previa.'
                    : 'We prefer scheduled appointments, but we accept walk-ins for urgent matters.',
              },
            ].map((faq, index) => (
              <div
                key={index}

                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <CheckCircle
                className="w-5 h-5 text-[#6B1F2E]" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 ml-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div
className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4 z-40"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="font-bold text-[#6B1F2E]">
              {language === 'es' ? '¿Necesitas ayuda legal?' : 'Need Legal Help?'}
            </p>
            <p className="text-sm text-gray-600">
              {language === 'es' ? 'Consulta gratuita disponible' : 'Free consultation available'}
            </p>
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <button onClick={handleCall} className="flex-1 sm:flex-initial px-6 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">1-844-YO-PELEO</span>
              <span className="sm:hidden">{language === 'es' ? 'Llamar' : 'Call'}</span>
            </button>

            <Link
              href={language === 'es' ? '/es/contacto' : '/contact'}

                className="flex-1 sm:flex-initial px-6 py-3 bg-gray-100 text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar
                className="w-4 h-4" />
              <span>{language === 'es' ? 'Agendar' : 'Schedule'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
