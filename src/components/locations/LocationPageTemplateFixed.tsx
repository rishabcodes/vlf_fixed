import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

interface LocationPageProps {
  city: string;
  state: string;
  language: 'en' | 'es';
  nearbyOffice?: {
    name: string;
    address: string;
    phone: string;
  };
}

const content = {
  en: {
    hero: {
      title: (city: string, state: string) =>
        `${city} ${state} Immigration & Personal Injury Lawyers`,
      subtitle: (city: string) =>
        `Serving ${city} and surrounding areas with experienced legal representation.`,
      cta1: 'Get Free Consultation',
      cta2: 'Call Now',
    },
    services: {
      title: 'Legal Services We Offer',
      immigration: 'Immigration Law',
      personalInjury: 'Personal Injury',
      workersComp: "Workers' Compensation",
      criminalDefense: 'Criminal Defense',
    },
    whyChoose: {
      title: 'Why Choose Vasquez Law Firm',
      experience: '60+ Years Combined Experience',
      results: '30,000+ Successful Cases',
      available: '24/7 Availability',
      multilingual: 'Bilingual Staff',
      noFee: 'No Fee Unless We Win',
      military: 'Veteran-Owned Firm',
    },
    serving: {
      title: (city: string) => `Serving ${city} and Nearby Areas`,
      description: 'We proudly serve clients throughout the region',
    },
    contact: {
      title: 'Contact Our Office',
      nearestOffice: 'Nearest Office',
      schedule: 'Schedule Your Free Consultation Today',
      available: 'Available 24/7 for emergencies',
    },
    faq: {
      title: 'Frequently Asked Questions',
      q1: (city: string) => `Do you have a physical office in ${city}?`,
      a1: (city: string, nearbyOffice: string) =>
        `While our main offices are in Raleigh, Charlotte, Smithfield, and Orlando, we regularly meet with clients throughout ${city}. Our nearest office in ${nearbyOffice} serves the entire region, and we offer virtual consultations for your convenience.`,
      q2: 'How much do your services cost?',
      a2: "We offer free consultations and work on a contingency fee basis for personal injury cases - meaning you don't pay unless we win. For other services, we provide transparent flat fees and payment plans.",
      q3: 'What languages do you speak?',
      a3: 'Our team is fully bilingual in English and Spanish. We can also arrange for interpreters in other languages as needed.',
    },
  },
  es: {
    hero: {
      title: (city: string, state: string) =>
        `Abogados de Inmigración y Lesiones Personales en ${city} ${state}`,
      subtitle: (city: string) =>
        `Sirviendo a ${city} y áreas circundantes con representación legal experimentada.`,
      cta1: 'Consulta Gratuita',
      cta2: 'Llame Ahora',
    },
    services: {
      title: 'Servicios Legales que Ofrecemos',
      immigration: 'Ley de Inmigración',
      personalInjury: 'Lesiones Personales',
      workersComp: 'Compensación Laboral',
      criminalDefense: 'Defensa Criminal',
    },
    whyChoose: {
      title: 'Por Qué Elegir Vasquez Law Firm',
      experience: '60+ Años de Experiencia Combinada',
      results: '30,000+ Casos Exitosos',
      available: 'Disponible 24/7',
      multilingual: 'Personal Bilingüe',
      noFee: 'Sin Costo a Menos que Ganemos',
      military: 'Firma de Veteranos',
    },
    serving: {
      title: (city: string) => `Sirviendo a ${city} y Áreas Cercanas`,
      description: 'Orgullosamente servimos a clientes en toda la región',
    },
    contact: {
      title: 'Contacte Nuestra Oficina',
      nearestOffice: 'Oficina Más Cercana',
      schedule: 'Agende Su Consulta Gratuita Hoy',
      available: 'Disponible 24/7 para emergencias',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      q1: (city: string) => `¿Tienen una oficina física en ${city}?`,
      a1: (city: string, nearbyOffice: string) =>
        `Aunque nuestras oficinas principales están en Raleigh, Charlotte, Smithfield y Orlando, regularmente nos reunimos con clientes en ${city}. Nuestra oficina más cercana en ${nearbyOffice} sirve a toda la región, y ofrecemos consultas virtuales para su conveniencia.`,
      q2: '¿Cuánto cuestan sus servicios?',
      a2: 'Ofrecemos consultas gratuitas y trabajamos con honorarios de contingencia para casos de lesiones personales - lo que significa que no paga a menos que ganemos. Para otros servicios, proporcionamos tarifas fijas transparentes y planes de pago.',
      q3: '¿Qué idiomas hablan?',
      a3: 'Nuestro equipo es completamente bilingüe en inglés y español. También podemos organizar intérpretes en otros idiomas según sea necesario.',
    },
  },
};

export const LocationPageTemplateFixed: React.FC<LocationPageProps> = ({
  city,
  state,
  language,
  nearbyOffice,
}) => {
  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.hero.title(city, state)}</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">{t.hero.subtitle(city)}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={language === 'es' ? '/es/contacto' : '/contact'}

                className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105"
              >
                {t.hero.cta1}
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="px-8 py-4 bg-white hover:bg-gray-100 text-[#6B1F2E] font-bold rounded-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.services.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(t.services).map(([key, value]) => {
              if (key === 'title') return null;
              return (
                <div
                  key={key}

                className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <h3
                className="font-semibold text-lg mb-2">{value}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.whyChoose.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(t.whyChoose).map(([key, value]) => {
              if (key === 'title') return null;
              return (
                <div key={key}

                className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#C9974D] flex-shrink-0 mt-1" />
                  <p
                className="text-lg">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {nearbyOffice && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{t.contact.title}</h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">{t.contact.nearestOffice}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#6B1F2E] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">{nearbyOffice.name}</p>
                    <p className="text-gray-600">{nearbyOffice.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#6B1F2E]" />
                  <a
                    href={`tel:${nearbyOffice.phone.replace(/[^0-9]/g, '')}`}

                className="text-[#6B1F2E] font-semibold hover:underline"
                  >
                    {nearbyOffice.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#6B1F2E]" />
                  <p className="text-gray-600">{t.contact.available}</p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href={language === 'es' ? '/es/contacto' : '/contact'}

                className="block w-full text-center px-6 py-3 bg-[#6B1F2E] text-white font-semibold rounded-lg hover:bg-[#8B2635] transition-colors"
                >
                  {t.contact.schedule}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.faq.title}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-2">{t.faq.q1(city)}</h3>
              <p className="text-gray-600">
                {t.faq.a1(city, nearbyOffice?.name || 'our main office')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-2">{t.faq.q2}</h3>
              <p className="text-gray-600">{t.faq.a2}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-2">{t.faq.q3}</h3>
              <p className="text-gray-600">{t.faq.a3}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPageTemplateFixed;
