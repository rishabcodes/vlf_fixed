'use client';

import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  Users,
  Award,
  Scale,
  FileText,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PracticeAreaData } from '@/data/practice-areas';

interface ModernPracticeAreaTemplateV3Props {
  practiceArea: PracticeAreaData;
  language: 'en' | 'es';
}

const translations = {
  en: {
    heroTitle: 'Expert Legal Services',
    heroSubtitle:
      'Experienced attorneys providing comprehensive legal solutions with personalized attention',
    ctaButton: 'Free Consultation',
    whyChooseTitle: 'Why Choose Vasquez Law Firm?',
    ourProcessTitle: 'Our Process',
    faqsTitle: 'Frequently Asked Questions',
    relatedServicesTitle: 'Related Services',
    contactTitle: 'Contact Us Today',
    contactSubtitle: 'Get the legal help you need. Free consultation available.',
    phoneLabel: 'Call Now',
    addressLabel: 'Visit Our Office',
    hoursLabel: 'Office Hours',
    experienceYears: '15+ Years Experience',
    successfulCases: '1000+ Successful Cases',
    clientSatisfaction: '98% Client Satisfaction',
    freeConsultation: 'Free Consultation',
    bilingualServices: 'Bilingual Services',
    localExperts: 'Local Legal Experts',
    scheduleConsultation: 'Schedule Consultation',
    learnMore: 'Learn More',
    readMore: 'Read More',
    readLess: 'Read Less',
    offices: {
      charlotte: 'Charlotte Office',
      raleigh: 'Raleigh Office',
      goldsboro: 'Goldsboro Office',
      smithfield: 'Smithfield Office',
      orlando: 'Orlando Office',
    },
  },
  es: {
    heroTitle: 'Servicios Legales Expertos',
    heroSubtitle:
      'Abogados experimentados brindando soluciones legales integrales con atención personalizada',
    ctaButton: 'Consulta Gratuita',
    whyChooseTitle: '¿Por Qué Elegir Vasquez Law Firm?',
    ourProcessTitle: 'Nuestro Proceso',
    faqsTitle: 'Preguntas Frecuentes',
    relatedServicesTitle: 'Servicios Relacionados',
    contactTitle: 'Contáctanos Hoy',
    contactSubtitle: 'Obtén la ayuda legal que necesitas. Consulta gratuita disponible.',
    phoneLabel: 'Llama Ahora',
    addressLabel: 'Visita Nuestra Oficina',
    hoursLabel: 'Horario de Oficina',
    experienceYears: '15+ Años de Experiencia',
    successfulCases: '1000+ Casos Exitosos',
    clientSatisfaction: '98% Satisfacción del Cliente',
    freeConsultation: 'Consulta Gratuita',
    bilingualServices: 'Servicios Bilingües',
    localExperts: 'Expertos Legales Locales',
    scheduleConsultation: 'Programar Consulta',
    learnMore: 'Saber Más',
    readMore: 'Leer Más',
    readLess: 'Leer Menos',
    offices: {
      charlotte: 'Oficina de Charlotte',
      raleigh: 'Oficina de Raleigh',
      goldsboro: 'Oficina de Goldsboro',
      smithfield: 'Oficina de Smithfield',
      orlando: 'Oficina de Orlando',
    },
  },
};

export function ModernPracticeAreaTemplateV3({
  practiceArea,
  language,
}: ModernPracticeAreaTemplateV3Props) {
  const t = translations[language];
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const offices = [
    {
      name: t.offices.charlotte,
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
    },
    {
      name: t.offices.raleigh,
      address: '3605 Glenwood Ave, Suite 410, Raleigh, NC 27612',
      phone: '(919) 533-7000',
    },
    {
      name: t.offices.goldsboro,
      address: '2558 US Highway 70 W, Goldsboro, NC 27530',
      phone: '(919) 533-7000',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90" />
        <div className="absolute inset-0 bg-[url('/images/law-office-bg.jpg')] bg-cover bg-center" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Scale className="h-16 w-16 text-blue-400" />
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {practiceArea.name[language]}
          </h1>

          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            {practiceArea.description[language]}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              {t.ctaButton}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {t.scheduleConsultation}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            {[
              { icon: Award, label: t.experienceYears, color: 'text-blue-600' },
              { icon: Users, label: t.successfulCases, color: 'text-green-600' },
              { icon: Star, label: t.clientSatisfaction, color: 'text-yellow-600' },
              { icon: MessageCircle, label: t.freeConsultation, color: 'text-purple-600' },
              { icon: Users, label: t.bilingualServices, color: 'text-red-600' },
              { icon: MapPin, label: t.localExperts, color: 'text-indigo-600' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <p className="text-sm font-medium text-gray-900">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.whyChooseTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceArea.benefits[language].map((benefit, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.ourProcessTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceArea.process[language].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.faqsTitle}</h2>
          </div>

          <div className="space-y-4">
            {practiceArea.faqs[language].map((faq, index) => (
              <div key={index}>
                <Card>
                  <CardContent className="p-0">
                    <button
                      className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                      {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {practiceArea.relatedServices[language].length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t.relatedServicesTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceArea.relatedServices[language].map((service, index) => (
                <div key={index}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <FileText className="h-8 w-8 text-blue-600 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{service}</h3>
                      <Button variant="outline" size="sm">
                        {t.learnMore}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.contactTitle}</h2>
            <p className="text-xl text-blue-100">{t.contactSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index}>
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{office.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-300 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-blue-100">{office.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-blue-300 mr-3" />
                        <p className="text-blue-100">{office.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-300 mr-3" />
                        <p className="text-blue-100">Mon-Fri: 9AM-6PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 text-lg">
              <Phone className="mr-2 h-5 w-5" />
              {t.phoneLabel}: (704) 533-7000
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
