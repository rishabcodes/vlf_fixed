'use client';

import React from 'react';
import Link from 'next/link';

import { MapPin, Phone, Clock, Star } from 'lucide-react';

interface LocationPageClientProps {
  state: string;
  city: string;
  service?: string;
  language?: 'en' | 'es';
}

const officeInfo: Record<
  string,
  Record<
    string,
    {
      address: string;
      phone: string;
      hours: string;
    }
  >
> = {
  NC: {
    Charlotte: {
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      hours: 'Mon-Fri 9AM-6PM, Sat 10AM-2PM',
    },
    Raleigh: {
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      hours: 'Mon-Fri 9AM-6PM',
    },
    Durham: {
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      hours: 'Mon-Fri 9AM-5PM',
    },
  },
  FL: {
    Orlando: {
      address: '456 International Dr, Orlando, FL 32819',
      phone: '(407) 555-0123',
      hours: 'Mon-Fri 9AM-6PM, Sat 10AM-2PM',
    },
    Kissimmee: {
      address: '789 W Vine St, Kissimmee, FL 34741',
      phone: '(407) 555-0124',
      hours: 'Mon-Fri 9AM-5PM',
    },
  },
};

const serviceDescriptions: Record<string, Record<string, string>> = {
  immigration: {
    en: 'Expert immigration attorneys helping with visas, green cards, citizenship, and deportation defense.',
    es: 'Abogados expertos en inmigración ayudando con visas, tarjetas verdes, ciudadanía y defensa contra deportación.',
  },
  'personal-injury': {
    en: 'Dedicated personal injury lawyers fighting for maximum compensation for accident victims.',
    es: 'Abogados dedicados de lesiones personales luchando por la máxima compensación para víctimas de accidentes.',
  },
  'criminal-defense': {
    en: 'Aggressive criminal defense attorneys protecting your rights and freedom.',
    es: 'Abogados agresivos de defensa criminal protegiendo sus derechos y libertad.',
  },
  'workers-compensation': {
    en: "Experienced workers' compensation lawyers ensuring you get the benefits you deserve.",
    es: 'Abogados experimentados en compensación laboral asegurando que obtenga los beneficios que merece.',
  },
  'family-law': {
    en: 'Compassionate family law attorneys guiding you through divorce, custody, and support matters.',
    es: 'Abogados compasivos de derecho familiar guiándolo a través de divorcio, custodia y manutención.',
  },
};

export default function LocationPageClient({
  state,
  city,
  service,
  language = 'en',
}: LocationPageClientProps) {
  const isSpanish = language === 'es';
  const office = officeInfo[state]?.[city];
  const serviceDesc = service ? serviceDescriptions[service]?.[language] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {service ? (
              <>
                {service
                  .split('-')
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}{' '}
                {isSpanish ? 'Abogados' : 'Lawyers'}
              </>
            ) : (
              <>{isSpanish ? 'Abogados' : 'Attorneys'}</>
            )}{' '}
            {isSpanish ? 'en' : 'in'} {city}, {state}
          </h1>
          <p className="text-xl mb-8 opacity-90">
            {isSpanish
              ? 'Representación legal confiable con más de 20 años de experiencia'
              : 'Trusted Legal Representation with Over 20 Years of Experience'}
          </p>
          {serviceDesc && <p className="text-lg mb-8">{serviceDesc}</p>}
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:1-844-967-3536"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              {isSpanish ? 'Llame Ahora' : 'Call Now'}: 1-844-YO-PELEO
            </a>
            <Link
              href={isSpanish ? '/es/consulta' : '/consultation'}

                className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              {isSpanish ? 'Consulta Gratuita' : 'Free Consultation'}
            </Link>
          </div>
        </div>
      </section>

      {/* Office Information */}
      {office && (
        <section
className="py-16 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">
              {isSpanish ? 'Nuestra Oficina en' : 'Our'} {city} {isSpanish ? '' : 'Office'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{isSpanish ? 'Dirección' : 'Address'}</h3>
                  <p className="text-gray-600">{office.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{isSpanish ? 'Teléfono' : 'Phone'}</h3>
                  <p className="text-gray-600">{office.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{isSpanish ? 'Horario' : 'Hours'}</h3>
                  <p className="text-gray-600">{office.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Practice Areas */}
      <section
className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {isSpanish ? 'Áreas de Práctica en' : 'Practice Areas in'} {city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(serviceDescriptions).map(([key, desc]) => (
              <Link
                key={key}

                href={`/locations/${state.toLowerCase()}/${city.toLowerCase()}/${key}`}

                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-700">
                  {key
                    .split('-')
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
                </h3>
                <p className="text-gray-600">{desc[language]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isSpanish ? 'Lo Que Dicen Nuestros Clientes' : 'What Our Clients Say'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i}

                className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                {isSpanish
                  ? '"El mejor bufete de abogados en Charlotte. Me ayudaron con mi caso de inmigración y ahora soy residente permanente."'
                  : '"Best law firm in Charlotte. They helped me with my immigration case and now I am a permanent resident."'}
              </p>
              <p className="font-semibold">- Maria G., {city}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i}

                className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                {isSpanish
                  ? '"Excelente servicio y resultados. Ganaron mi caso de compensación laboral cuando otros abogados dijeron que no tenía caso."'
                  : '"Excellent service and results. They won my workers\' comp case when other lawyers said I had no case."'}
              </p>
              <p className="font-semibold">- John D., {city}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isSpanish
              ? '¿Necesita Ayuda Legal en ' + city + '?'
              : 'Need Legal Help in ' + city + '?'}
          </h2>
          <p className="text-xl mb-8">
            {isSpanish
              ? 'Consulta gratuita • Sin cargos por adelantado • Hablamos español'
              : 'Free Consultation • No Upfront Fees • We Speak Spanish'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:1-844-967-3536"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              1-844-YO-PELEO
            </a>
            <Link
              href={isSpanish ? '/es/contacto' : '/contact'}

                className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              {isSpanish ? 'Contáctenos' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
