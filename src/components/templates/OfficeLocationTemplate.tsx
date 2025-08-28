'use client';

import { MapPin, Phone, Clock, Mail, Car, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';

interface OfficeLocationTemplateProps {
  office: {
    city: string;
    state: string;
    address: string;
    phone: string;
    email: string;
    hours: {
      weekdays: string;
      saturday?: string;
      sunday?: string;
    };
    mapUrl: string;
    image?: string;
    practiceAreas: string[];
    attorneys: string[];
    parkingInfo?: string;
    publicTransit?: string;
  };
  language: 'en' | 'es';
}

export function OfficeLocationTemplate({ office, language }: OfficeLocationTemplateProps) {
  const isSpanish = language === 'es';

  const content = {
    hero: {
      title: isSpanish ? `Oficina de ${office.city}` : `${office.city} Office`,
      subtitle: isSpanish
        ? 'Representación legal experta en su comunidad'
        : 'Expert legal representation in your community',
    },
    contact: {
      title: isSpanish ? 'Información de Contacto' : 'Contact Information',
      address: isSpanish ? 'Dirección' : 'Address',
      phone: isSpanish ? 'Teléfono' : 'Phone',
      email: isSpanish ? 'Correo' : 'Email',
      hours: isSpanish ? 'Horario de Atención' : 'Office Hours',
      weekdays: isSpanish ? 'Lunes - Viernes' : 'Monday - Friday',
      saturday: isSpanish ? 'Sábado' : 'Saturday',
      sunday: isSpanish ? 'Domingo' : 'Sunday',
      closed: isSpanish ? 'Cerrado' : 'Closed',
    },
    services: {
      title: isSpanish ? 'Servicios en Esta Oficina' : 'Services at This Office',
      consultation: isSpanish ? 'Consultas gratuitas disponibles' : 'Free consultations available',
    },
    attorneys: {
      title: isSpanish ? 'Abogados en Esta Oficina' : 'Attorneys at This Office',
    },
    directions: {
      title: isSpanish ? 'Cómo Llegar' : 'Getting Here',
      parking: isSpanish ? 'Estacionamiento' : 'Parking',
      transit: isSpanish ? 'Transporte Público' : 'Public Transit',
      getDirections: isSpanish ? 'Obtener Direcciones' : 'Get Directions',
    },
    cta: {
      title: isSpanish ? 'Programe Su Consulta Gratuita' : 'Schedule Your Free Consultation',
      subtitle: isSpanish
        ? 'Nuestro equipo está listo para ayudarle con sus necesidades legales'
        : 'Our team is ready to help with your legal needs',
      button: isSpanish ? 'Contactar Ahora' : 'Contact Now',
    },
  };

  const practiceAreaTranslations: Record<string, { en: string; es: string }> = {
    immigration: { en: 'Immigration Law', es: 'Ley de Inmigración' },
    'personal-injury': { en: 'Personal Injury', es: 'Lesiones Personales' },
    'workers-compensation': { en: 'Workers Compensation', es: 'Compensación Laboral' },
    'criminal-defense': { en: 'Criminal Defense', es: 'Defensa Criminal' },
    'family-law': { en: 'Family Law', es: 'Derecho Familiar' },
    'car-accidents': { en: 'Car Accidents', es: 'Accidentes de Auto' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl text-gray-200">
              {content.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Contact Details */}
              <div>
                <h2 className="text-3xl font-bold mb-8">{content.contact.title}</h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{content.contact.address}</h3>
                      <p className="text-gray-600">{office.address}</p>
                      <a
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 mt-2"
                      >
                        {content.directions.getDirections}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{content.contact.phone}</h3>
                      <a
                        href={`tel:${office.phone.replace(/\D/g, '')}`}
                        className="text-2xl font-bold text-primary-600 hover:text-primary-700"
                      >
                        {office.phone}
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        {isSpanish
                          ? 'Disponible 24/7 para emergencias'
                          : 'Available 24/7 for emergencies'}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{content.contact.email}</h3>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{content.contact.hours}</h3>
                      <p className="text-gray-600">
                        {content.contact.weekdays}: {office.hours.weekdays}
                      </p>
                      <p className="text-gray-600">
                        {content.contact.saturday}:{' '}
                        {office.hours.saturday || content.contact.closed}
                      </p>
                      <p className="text-gray-600">
                        {content.contact.sunday}: {office.hours.sunday || content.contact.closed}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Parking & Transit Info */}
                {(office.parkingInfo || office.publicTransit) && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-4">{content.directions.title}</h3>
                    {office.parkingInfo && (
                      <div className="mb-3">
                        <Car className="w-5 h-5 text-gray-600 inline mr-2" />
                        <span className="font-medium">{content.directions.parking}:</span>
                        <p className="text-gray-600 ml-7">{office.parkingInfo}</p>
                      </div>
                    )}
                    {office.publicTransit && (
                      <div>
                        <MapPin className="w-5 h-5 text-gray-600 inline mr-2" />
                        <span className="font-medium">{content.directions.transit}:</span>
                        <p className="text-gray-600 ml-7">{office.publicTransit}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column - Map */}
              <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src={office.mapUrl.replace('/search/', '/embed/v1/place/')}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{content.services.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {office.practiceAreas.map((area, index) => {
                const translation = practiceAreaTranslations[area];
                const displayName = translation ? translation[language] : area;

                return (
                  <div
                    key={area}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 mb-3" />
                    <h3 className="text-xl font-semibold mb-2">{displayName}</h3>
                    <p className="text-gray-600 text-sm">{content.services.consultation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Attorneys Section */}
      {office.attorneys.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{content.attorneys.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {office.attorneys.map(attorney => (
                  <div key={attorney} className="text-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4" />
                    <h3 className="font-semibold text-lg">{attorney}</h3>
                    <p className="text-gray-600">{isSpanish ? 'Abogado' : 'Attorney'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
            <p className="text-xl mb-8 text-gray-200">{content.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${office.phone.replace(/\D/g, '')}`}
                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {office.phone}
              </a>
              <Link
                href={isSpanish ? '/es/contacto' : '/contact'}
                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
              >
                {content.cta.button}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                {isSpanish ? 'Envíenos un Mensaje' : 'Send Us a Message'}
              </h3>
              <ContactForm language={language} source={`office-${office.city.toLowerCase()}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
