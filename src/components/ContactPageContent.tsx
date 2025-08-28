'use client';

import React, { Suspense } from 'react';

import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle, Globe, Building } from 'lucide-react';
import { ModernPageWrapper } from '@/components/ModernPageWrapper';
import dynamic from 'next/dynamic';
import { officeLocations } from '@/data/locations';
import { ContactForm } from '@/components/forms/ContactForm';

// Lazy load the map component for better performance
const AllOfficesMap = dynamic(() => import('@/components/AllOfficesMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-900 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  ),
});

interface ContactPageContentProps {
  language?: 'en' | 'es';
}

export default function ContactPageContent({ language = 'en' }: ContactPageContentProps) {
  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get Your Free Consultation Today',
      description:
        'Available 24/7 through our AI assistant or schedule a consultation with our experienced attorneys',
      formTitle: 'Send Us a Message',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      caseType: 'Case Type',
      selectCase: 'Select your case type',
      message: 'Tell us about your case',
      preferredContact: 'Preferred Contact Method',
      location: 'Nearest Office',
      selectLocation: 'Select preferred location',
      submit: 'Send Message',
      or: 'OR',
      callUs: 'Call Us Now',
      mainNumber: '1-844-YO-PELEO',
      mainNumberDesc: '(967-3536)',
      emailUs: 'Email Us',
      emailAddress: 'leads@vasquezlawfirm.com',
      instantHelp: 'Need Instant Help?',
      chatNow: 'Chat with AI Assistant',
      officeHours: 'Office Hours',
      monday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      hours1: '8:30 AM - 5:30 PM',
      hours2: '10:00 AM - 2:00 PM',
      hours3: 'AI Available 24/7',
      locations: 'Our Offices',
      getDirections: 'Get Directions',
      emergency: 'Emergency Legal Help',
      emergencyText:
        'If you need immediate legal assistance outside of business hours, our AI assistant is available 24/7 to help you understand your rights and next steps.',
      startChat: 'Start Emergency Chat',
      languages: 'We Speak Your Language',
      languagesText:
        'Our team provides services in English, Spanish, and Portuguese. All our AI assistants are fully bilingual.',
      consultation: 'Free Consultation Includes:',
      benefit1: 'Case evaluation by experienced attorney',
      benefit2: 'AI-powered case outcome prediction',
      benefit3: 'Clear explanation of your legal options',
      benefit4: 'Transparent fee structure discussion',
      benefit5: 'No obligation to hire us',
    },
    es: {
      title: 'Contáctanos',
      subtitle: 'Obtenga Su Consulta Gratuita Hoy',
      description:
        'Disponible 24/7 a través de nuestro asistente de IA o programe una consulta con nuestros abogados experimentados',
      formTitle: 'Envíanos un Mensaje',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      caseType: 'Tipo de Caso',
      selectCase: 'Seleccione su tipo de caso',
      message: 'Cuéntenos sobre su caso',
      preferredContact: 'Método de Contacto Preferido',
      location: 'Oficina Más Cercana',
      selectLocation: 'Seleccione ubicación preferida',
      submit: 'Enviar Mensaje',
      or: 'O',
      callUs: 'Llámanos Ahora',
      mainNumber: '1-844-YO-PELEO',
      mainNumberDesc: '(967-3536)',
      emailUs: 'Envíanos un Email',
      emailAddress: 'leads@vasquezlawfirm.com',
      instantHelp: '¿Necesita Ayuda Instantánea?',
      chatNow: 'Chatear con Asistente IA',
      officeHours: 'Horario de Oficina',
      monday: 'Lunes - Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
      hours1: '8:30 AM - 5:30 PM',
      hours2: '10:00 AM - 2:00 PM',
      hours3: 'IA Disponible 24/7',
      locations: 'Nuestras Oficinas',
      getDirections: 'Obtener Direcciones',
      emergency: 'Ayuda Legal de Emergencia',
      emergencyText:
        'Si necesita asistencia legal inmediata fuera del horario comercial, nuestro asistente de IA está disponible 24/7 para ayudarle a entender sus derechos y próximos pasos.',
      startChat: 'Iniciar Chat de Emergencia',
      languages: 'Hablamos Tu Idioma',
      languagesText:
        'Nuestro equipo brinda servicios en inglés, español y portugués. Todos nuestros asistentes de IA son completamente bilingües.',
      consultation: 'La Consulta Gratuita Incluye:',
      benefit1: 'Evaluación del caso por abogado experimentado',
      benefit2: 'Predicción del resultado del caso con IA',
      benefit3: 'Explicación clara de sus opciones legales',
      benefit4: 'Discusión transparente de la estructura de tarifas',
      benefit5: 'Sin obligación de contratarnos',
    },
  };

  const t = content[language];

  return (
    <ModernPageWrapper title={t.title} subtitle={t.subtitle}>
      {/* Main Content Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            {t.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">{t.formTitle}</h2>
                <div className="filter invert brightness-90">
                  <ContactForm language={language} />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div
className="space-y-6"
            >
              {/* Quick Contact Options */}
              <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl p-8 text-black">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageCircle className="mr-2" />
                  {t.instantHelp}
                </h3>
                <button className="w-full px-6 py-3 bg-black text-gold-400 rounded-lg font-semibold hover:bg-neutral-900 transition-all mb-4">
                  🤖 {t.chatNow}
                </button>
                <div className="text-center mb-4">
                  <p className="text-black/70">{t.or}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Phone className="mr-2" />
                    <p className="text-3xl font-black">{t.mainNumber}</p>
                  </div>
                  <p className="text-lg">{t.mainNumberDesc}</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-gold-400 mb-4 flex items-center">
                  <Clock className="mr-2" />
                  {t.officeHours}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.monday}</span>
                    <span className="font-medium text-white">{t.hours1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.saturday}</span>
                    <span className="font-medium text-white">{t.hours2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.sunday}</span>
                    <span className="font-medium text-gold-400">{t.hours3}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Help */}
              <div className="bg-burgundy-700/20 backdrop-blur-sm rounded-xl p-6 border border-burgundy-700/30">
                <h3 className="text-xl font-bold text-burgundy-400 mb-3">{t.emergency}</h3>
                <p className="text-gray-300 mb-4">{t.emergencyText}</p>
                <button className="px-6 py-2 bg-burgundy-700 text-white rounded-lg font-medium hover:bg-burgundy-800 transition-colors">
                  {t.startChat}
                </button>
              </div>

              {/* Languages */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-gold-400 mb-3 flex items-center">
                  <Globe className="mr-2" />
                  {t.languages}
                </h3>
                <p className="text-gray-300 mb-4">{t.languagesText}</p>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-gold-500/20 text-gold-400 rounded-full text-sm font-medium">
                    English
                  </span>
                  <span className="px-3 py-1 bg-gold-500/20 text-gold-400 rounded-full text-sm font-medium">
                    Español
                  </span>
                  <span className="px-3 py-1 bg-gold-500/20 text-gold-400 rounded-full text-sm font-medium">
                    Português
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gold-400 mb-12 flex items-center justify-center">
            <MapPin className="mr-2" />
            {t.locations}
          </h2>

          {/* Interactive Map */}
          <div
className="mb-12"
          >
            <AllOfficesMap
              offices={officeLocations.map(office => ({
                name: office.name,
                address: office.fullAddress,
                lat: office.lat,
                lng: office.lng,
                phone: office.phone,
                hours: office.hours,
              }))}
              height="500px"
              className="rounded-xl border border-gold-500/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {officeLocations.map((location, index) => {
              const officeImages: { [key: string]: string } = {
                Charlotte: '/images/offices/charlotte-office.jpg',
                Raleigh: '/images/offices/raleigh-office.jpg',
                Smithfield: '/images/offices/smithfield-office.jpg',
                Orlando: '/images/offices/orlando-office.jpg',
              };

              return (
                <div
                  key={location.id}

                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all hover:transform hover:-translate-y-1"
                >
                  {/* Office Image */}
                  <div className="h-48 w-full overflow-hidden bg-gradient-to-r from-neutral-800 to-neutral-900 flex items-center justify-center">
                    {officeImages[location.city] ? (
                      <Image
                        src={officeImages[location.city] || '/images/offices/default-office.jpg'}

                alt={`${location.city} office exterior`}
                        width={400}
                        height={300}

                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-gold-400 text-center">
                        <Building className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm font-medium">{location.city}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gold-400 mb-2">
                      {location.city}, {location.state}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2 flex items-start">
                      <MapPin className="w-4 h-4 mr-1 mt-0.5 text-gold-500" />
                      {location.fullAddress}
                    </p>
                    <p className="text-sm text-gold-500 font-medium mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {location.phone}
                    </p>
                    <p className="text-xs text-gray-400 mb-4 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {language === 'es'
                        ? location.hours.replace('Mon-Fri', 'Lun-Vie')
                        : location.hours}
                    </p>
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold-400 font-medium hover:text-gold-300 transition-colors flex items-center"
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      {t.getDirections} →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Benefits */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-black">
            <h2 className="text-3xl font-bold mb-8 text-center">{t.consultation}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[t.benefit1, t.benefit2, t.benefit3, t.benefit4, t.benefit5].map(
                (benefit, index) => (
                  <div
                    key={index}

                className="flex items-start"
                  >
                    <span className="text-2xl mr-3">✓</span>
                    <p
                className="text-lg">{benefit}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </ModernPageWrapper>
  );
}
