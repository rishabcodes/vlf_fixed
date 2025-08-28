'use client';

import { MapPin, Phone, Star, CheckCircle, ArrowRight, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';

interface LocationServiceTemplateProps {
  city: string;
  state: string;
  service: {
    key: string;
    name: { en: string; es: string };
    description: { en: string; es: string };
    icon: string;
  };
  nearestOffice: {
    name: string;
    address: string;
    phone: string;
    distance: string;
  };
  language: 'en' | 'es';
}

export function LocationServiceTemplate({
  city,
  state,
  service,
  nearestOffice,
  language,
}: LocationServiceTemplateProps) {
  const isSpanish = language === 'es';

  const content = {
    hero: {
      title: isSpanish
        ? `${service.name.es} en ${city}, ${state}`
        : `${service.name.en} in ${city}, ${state}`,
      subtitle: isSpanish
        ? `Abogados locales especializados en ${service.name.es.toLowerCase()} sirviendo a ${city}`
        : `Local attorneys specializing in ${service.name.en.toLowerCase()} serving ${city}`,
      cta1: isSpanish ? 'Llamar Ahora' : 'Call Now',
      cta2: isSpanish ? 'Consulta Gratuita' : 'Free Consultation',
    },
    stats: {
      title: isSpanish ? 'Experiencia Local Comprobada' : 'Proven Local Experience',
      stat1: { number: '500+', label: isSpanish ? 'Casos Locales' : 'Local Cases' },
      stat2: { number: '15+', label: isSpanish ? 'Años en la Comunidad' : 'Years in Community' },
      stat3: { number: '24/7', label: isSpanish ? 'Disponibilidad' : 'Availability' },
      stat4: { number: '98%', label: isSpanish ? 'Tasa de Éxito' : 'Success Rate' },
    },
    about: {
      title: isSpanish ? `Sobre Nuestros Servicios en ${city}` : `About Our Services in ${city}`,
      description: service.description[language],
    },
    whyChoose: {
      title: isSpanish
        ? `¿Por Qué Elegir Vasquez Law Firm en ${city}?`
        : `Why Choose Vasquez Law Firm in ${city}?`,
      reason1: isSpanish
        ? 'Conocimiento profundo de las leyes locales'
        : 'Deep knowledge of local laws',
      reason2: isSpanish
        ? 'Relaciones establecidas con tribunales locales'
        : 'Established relationships with local courts',
      reason3: isSpanish
        ? 'Disponibilidad para reuniones en persona'
        : 'Available for in-person meetings',
      reason4: isSpanish ? 'Comprensión de la comunidad local' : 'Understanding of local community',
    },
    process: {
      title: isSpanish ? 'Nuestro Proceso' : 'Our Process',
      step1: {
        title: isSpanish ? 'Consulta Inicial' : 'Initial Consultation',
        desc: isSpanish ? 'Evaluamos su caso sin costo' : 'We evaluate your case at no cost',
      },
      step2: {
        title: isSpanish ? 'Investigación' : 'Investigation',
        desc: isSpanish ? 'Recopilamos evidencia y documentos' : 'We gather evidence and documents',
      },
      step3: {
        title: isSpanish ? 'Estrategia' : 'Strategy',
        desc: isSpanish ? 'Desarrollamos un plan personalizado' : 'We develop a customized plan',
      },
      step4: {
        title: isSpanish ? 'Resolución' : 'Resolution',
        desc: isSpanish ? 'Trabajamos hacia el mejor resultado' : 'We work toward the best outcome',
      },
    },
    location: {
      title: isSpanish ? 'Oficina Más Cercana' : 'Nearest Office',
      serving: isSpanish
        ? `Sirviendo a ${city} y Áreas Circundantes`
        : `Serving ${city} and Surrounding Areas`,
      getDirections: isSpanish ? 'Obtener Direcciones' : 'Get Directions',
    },
    cta: {
      title: isSpanish ? `Comience Su Caso en ${city} Hoy` : `Start Your ${city} Case Today`,
      subtitle: isSpanish
        ? 'No espere para proteger sus derechos. Contacte a nuestros abogados locales ahora.'
        : "Don't wait to protect your rights. Contact our local attorneys now.",
    },
  };

  const getServiceBenefits = () => {
    const benefits: Record<string, { en: string[]; es: string[] }> = {
      immigration: {
        en: [
          'Family visa applications',
          'Green card processing',
          'Deportation defense',
          'Citizenship assistance',
          'Work authorization',
          'Asylum applications',
        ],
        es: [
          'Solicitudes de visa familiar',
          'Procesamiento de tarjeta verde',
          'Defensa contra deportación',
          'Asistencia para ciudadanía',
          'Autorización de trabajo',
          'Solicitudes de asilo',
        ],
      },
      'personal-injury': {
        en: [
          'Car accident claims',
          'Slip and fall cases',
          'Medical malpractice',
          "Workers' compensation",
          'Product liability',
          'Wrongful death',
        ],
        es: [
          'Reclamos por accidentes de auto',
          'Casos de resbalones y caídas',
          'Negligencia médica',
          'Compensación laboral',
          'Responsabilidad del producto',
          'Muerte injusta',
        ],
      },
      'criminal-defense': {
        en: [
          'DUI/DWI defense',
          'Drug charges',
          'Assault cases',
          'Theft charges',
          'Domestic violence',
          'Traffic violations',
        ],
        es: [
          'Defensa DUI/DWI',
          'Cargos de drogas',
          'Casos de asalto',
          'Cargos de robo',
          'Violencia doméstica',
          'Violaciones de tráfico',
        ],
      },
      'family-law': {
        en: [
          'Divorce proceedings',
          'Child custody',
          'Child support',
          'Spousal support',
          'Property division',
          'Adoption',
        ],
        es: [
          'Procedimientos de divorcio',
          'Custodia de menores',
          'Manutención infantil',
          'Pensión alimenticia',
          'División de propiedades',
          'Adopción',
        ],
      },
      'workers-compensation': {
        en: [
          'Workplace injuries',
          'Disability benefits',
          'Medical coverage',
          'Lost wages',
          'Permanent disability',
          'Return to work',
        ],
        es: [
          'Lesiones en el trabajo',
          'Beneficios por discapacidad',
          'Cobertura médica',
          'Salarios perdidos',
          'Discapacidad permanente',
          'Regreso al trabajo',
        ],
      },
      'car-accidents': {
        en: [
          'Insurance negotiations',
          'Medical expenses',
          'Property damage',
          'Lost income',
          'Pain and suffering',
          'Uninsured motorists',
        ],
        es: [
          'Negociaciones con seguros',
          'Gastos médicos',
          'Daños a la propiedad',
          'Ingresos perdidos',
          'Dolor y sufrimiento',
          'Motoristas sin seguro',
        ],
      },
    };

    return benefits[service.key] || benefits.immigration;
  };

  const benefitsList = getServiceBenefits();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-400 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                {content.location.serving}
              </span>
            </div>

            <h1
className="text-4xl md:text-6xl font-bold mb-6"
            >
              {content.hero.title}
            </h1>

            <p
className="text-xl mb-8 text-gray-200"
            >
              {content.hero.subtitle}
            </p>

            <div
className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {content.hero.cta1}: {nearestOffice.phone}
              </a>
              <Link
                href={isSpanish ? '/es/consulta-gratis' : '/free-consultation'}

                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
              >
                {content.hero.cta2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{content.stats.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                content.stats.stat1,
                content.stats.stat2,
                content.stats.stat3,
                content.stats.stat4,
              ].map((stat, index) => (
                <div
                  key={index}

                className="text-center"
                >
                  <div
                className="text-4xl font-bold text-secondary-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-6xl mb-4 block">{service.icon}</span>
              <h2 className="text-3xl font-bold mb-6">{content.about.title}</h2>
              <p className="text-xl text-gray-600">{content.about.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isSpanish ? 'Servicios Incluidos' : 'Services Included'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {(benefitsList?.[language] || []).map((benefit, index) => (
                <div
                  key={benefit}

                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 mb-3" />
                  <h3
                className="text-lg font-semibold mb-2">{benefit}</h3>
                  <p className="text-gray-600 text-sm">
                    {isSpanish
                      ? 'Representación experta disponible'
                      : 'Expert representation available'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{content.whyChoose.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Star, title: content.whyChoose.reason1 },
                { icon: Award, title: content.whyChoose.reason2 },
                { icon: Users, title: content.whyChoose.reason3 },
                { icon: CheckCircle, title: content.whyChoose.reason4 },
              ].map((reason, index) => (
                <div
                  key={index}

                className="flex items-start gap-4"
                >
                  <reason.icon className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3
                className="text-lg font-semibold">{reason.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{content.process.title}</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                content.process.step1,
                content.process.step2,
                content.process.step3,
                content.process.step4,
              ].map((step, index) => (
                <div
                  key={index}

                className="text-center"
                >
                  <div
                className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">{content.location.title}</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">{nearestOffice.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-600">{nearestOffice.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary-600" />
                      <a
                        href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        {nearestOffice.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <ArrowRight className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-medium">
                        {nearestOffice.distance} {isSpanish ? 'de' : 'from'} {city}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      {content.hero.cta1}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px]">
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p>
                      {city}, {state}
                    </p>
                    <p className="text-sm">
                      {isSpanish ? 'Mapa interactivo disponible' : 'Interactive map available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
            <p className="text-xl mb-8 text-gray-200">{content.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {nearestOffice.phone}
              </a>
              <Link
                href={isSpanish ? '/es/contacto' : '/contact'}

                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
              >
                {isSpanish ? 'Contactar Ahora' : 'Contact Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">
                {isSpanish ? 'Envíenos un Mensaje' : 'Send Us a Message'}
              </h3>
              <ContactForm
                language={language}
                source={`location-${city.toLowerCase()}-${service.key}`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
