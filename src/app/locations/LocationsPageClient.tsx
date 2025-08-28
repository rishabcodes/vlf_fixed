'use client';

import Script from 'next/script';
import Image from 'next/image';
import DbImage from '@/components/DbImage';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ArrowRight,
  Building2,
  Car,
  Accessibility,
  Users,
  Shield,
  Award,
} from 'lucide-react';
import { TRADEMARK } from '@/lib/constants/trademark';
import { officeLocations } from '@/data/locations';

interface LocationsPageClientProps {
  language?: 'en' | 'es';
}

export default function LocationsPageClient({ language = 'en' }: LocationsPageClientProps) {
  // Map the office locations from the data file
  const locations = officeLocations.map(office => ({
    id: office.slug.replace('-office-location', ''),
    name: office.name,
    address: office.fullAddress,
    phone: office.phone,
    fax: office.fax,
    hours: office.hours,
    email: `${office.city.toLowerCase()}@vasquezlawnc.com`,
    mapUrl: office.mapUrl,
    image: `/images/offices/${office.id}-office.jpg`,
    imageId: office.imageId,
    features:
      language === 'es'
        ? [
            'Estacionamiento Gratis',
            'Accesible para Sillas de Ruedas',
            'Personal Bilingüe (Inglés/Español)',
          ]
        : ['Free Parking', 'Wheelchair Accessible', 'Bilingual Staff (English/Spanish)'],
    description: getOfficeDescription(office.id),
    lat: office.lat,
    lng: office.lng,
  }));

  function getOfficeDescription(id: string) {
    const descriptions =
      language === 'es'
        ? {
            smithfield:
              'Nuestra oficina principal sirviendo al Condado de Johnston y el este de Carolina del Norte con servicios legales integrales. Más de 60 años de experiencia combinada.',
            raleigh:
              'Sirviendo el área del Triángulo incluyendo el Condado de Wake, Durham y Chapel Hill con representación experta en inmigración y lesiones personales.',
            charlotte:
              'Dedicados a servir al Condado de Mecklenburg y el área metropolitana de Charlotte con servicios legales bilingües.',
            orlando:
              'Extendiendo nuestros excepcionales servicios legales a las diversas comunidades de Florida Central con soporte multilingüe.',
          }
        : {
            smithfield:
              'Our main office serving Johnston County and Eastern North Carolina with comprehensive legal services. Over 60 years of combined experience.',
            raleigh:
              'Serving the Triangle area including Wake County, Durham, and Chapel Hill with expert immigration and personal injury representation.',
            charlotte:
              'Dedicated to serving Mecklenburg County and the greater Charlotte metro area with bilingual legal services.',
            orlando:
              "Extending our exceptional legal services to Central Florida's diverse communities with multilingual support.",
          };
    return (
      descriptions[id as keyof typeof descriptions] ||
      (language === 'es'
        ? 'Proporcionando servicios legales excepcionales a nuestra comunidad.'
        : 'Providing exceptional legal services to our community.')
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-24">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
          <div
            className="absolute inset-0"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="inline-flex items-center px-6 py-3 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                <Building2 className="w-5 h-5 text-primary mr-2" />
                <span className="text-primary font-semibold">
                  {language === 'es' ? '4 Ubicaciones Convenientes' : '4 Convenient Locations'}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
                {language === 'es' ? (
                  <>
                    Nuestras <span className="text-primary">Ubicaciones</span>
                  </>
                ) : (
                  <>
                    Our Office <span className="text-primary">Locations</span>
                  </>
                )}
              </h1>
              <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">
                {language === 'es'
                  ? `Sirviendo Carolina del Norte y Florida - ${TRADEMARK.YO_PELEO_POR_TI}`
                  : `Serving North Carolina and Florida - ${TRADEMARK.YO_PELEO_POR_TI}`}
              </p>
              <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                {language === 'es'
                  ? 'Con cuatro oficinas estratégicamente ubicadas en Carolina del Norte y Florida, el Bufete de Abogados Vasquez siempre está a su alcance. Cada oficina proporciona los mismos servicios legales excepcionales con personal bilingüe listo para asistirle.'
                  : 'With four strategically located offices across North Carolina and Florida, Vasquez Law Firm is always within reach. Each office provides the same exceptional legal services with bilingual staff ready to assist you.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {language === 'es' ? (
                <>
                  Encuentre la Oficina <span className="text-primary">Más Cercana</span>
                </>
              ) : (
                <>
                  Find the Office <span className="text-primary">Nearest You</span>
                </>
              )}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Haga clic en cualquier tarjeta de ubicación a continuación para ver detalles y obtener direcciones'
                : 'Click on any location card below to view details and get directions'}
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {locations.map((location, index) => (
              <div
                key={location.id}

                className="group relative"
              >
                <div
                className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all h-full">
                  {/* Office Image */}
                  <div className="relative h-56 overflow-hidden">
                    {location.imageId ? (
                      <DbImage
                        id={location.imageId}
                        alt={`${location.name} exterior`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <Image
                        src={location.image}
                        alt={`${location.name} exterior`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    {location.id === 'smithfield' && (
                      <div className="absolute top-4 right-4 bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
                        {language === 'es' ? 'Oficina Principal' : 'Main Office'}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{location.name}</h3>
                    <p className="text-gray-400 mb-6">{location.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-gray-300 text-sm">{location.address}</p>
                          <a
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-300 text-sm inline-flex items-center mt-1"
                          >
                            {language === 'es' ? 'Obtener Direcciones' : 'Get Directions'}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-primary mr-3" />
                        <div>
                          <a
                            href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}

                className="text-gray-300 hover:text-primary transition-colors"
                          >
                            {location.phone}
                          </a>
                          {location.fax && (
                            <p className="text-gray-400 text-sm">
                              {language === 'es' ? 'Fax' : 'Fax'}: {location.fax}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-primary mr-3" />
                        <p className="text-gray-300 text-sm">{location.hours}</p>
                      </div>

                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-primary mr-3" />
                        <a
                          href={`mailto:${location.email}`}

                className="text-gray-300 hover:text-primary transition-colors text-sm"
                        >
                          {location.email}
                        </a>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-6 pt-6 border-t border-primary/10">
                      <div className="flex flex-wrap gap-2">
                        {location.features.map((feature, idx) => {
                          const icon = feature.includes('Parking') ? (
                            <Car className="w-4 h-4" />
                          ) : feature.includes('Wheelchair') ? (
                            <Accessibility className="w-4 h-4" />
                          ) : feature.includes('Bilingual') ? (
                            <Users className="w-4 h-4" />
                          ) : (
                            <Building2 className="w-4 h-4" />
                          );

                          return (
                            <div
                              key={idx}

                className="flex items-center text-xs text-gray-400 bg-primary/10 px-3 py-1 rounded-full"
                            >
                              <span
                className="mr-1">{icon}</span>
                              {feature}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      <Link
                        href={
                          location.id === 'orlando'
                            ? '/locations/orlando'
                            : `/locations/nc/${location.id}`
                        }
                        className="flex-1 text-center bg-primary text-black py-3 px-4 rounded-full font-bold hover:bg-primary-300 transition-all"
                      >
                        {language === 'es' ? 'Ver Detalles' : 'View Details'}
                      </Link>
                      <Link
                        href="/contact"
                        className="flex-1 text-center border-2 border-white text-white py-3 px-4 rounded-full font-bold hover:bg-white hover:text-black transition-all"
                      >
                        {language === 'es' ? 'Contactar' : 'Contact'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {language === 'es' ? (
                <>
                  ¿Por Qué Elegir <span className="text-primary">Nuestras Oficinas</span>?
                </>
              ) : (
                <>
                  Why Choose <span className="text-primary">Our Offices</span>
                </>
              )}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Cada ubicación está diseñada pensando en su comodidad y conveniencia'
                : 'Every location is designed with your comfort and convenience in mind'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(language === 'es'
              ? [
                  {
                    icon: <Building2 className="w-12 h-12" />,
                    title: 'Instalaciones Modernas',
                    description:
                      'Oficinas de última generación diseñadas para la comodidad y privacidad del cliente',
                  },
                  {
                    icon: <Car className="w-12 h-12" />,
                    title: 'Fácil Acceso',
                    description:
                      'Estacionamiento gratuito y ubicaciones convenientes con accesibilidad para sillas de ruedas',
                  },
                  {
                    icon: <Users className="w-12 h-12" />,
                    title: 'Personal Bilingüe',
                    description: 'Profesionales que hablan español e inglés en cada ubicación',
                  },
                  {
                    icon: <Shield className="w-12 h-12" />,
                    title: 'Seguro y Confidencial',
                    description: 'Salas de consulta privadas y manejo seguro de documentos',
                  },
                  {
                    icon: <Clock className="w-12 h-12" />,
                    title: 'Horarios Flexibles',
                    description: 'Horarios extendidos y citas de fin de semana disponibles',
                  },
                  {
                    icon: <Award className="w-12 h-12" />,
                    title: 'Equipo Experimentado',
                    description:
                      'Más de 60 años de experiencia legal combinada en todas las oficinas',
                  },
                ]
              : [
                  {
                    icon: <Building2 className="w-12 h-12" />,
                    title: 'Modern Facilities',
                    description: 'State-of-the-art offices designed for client comfort and privacy',
                  },
                  {
                    icon: <Car className="w-12 h-12" />,
                    title: 'Easy Access',
                    description:
                      'Free parking and convenient locations with wheelchair accessibility',
                  },
                  {
                    icon: <Users className="w-12 h-12" />,
                    title: 'Bilingual Staff',
                    description: 'Spanish and English speaking professionals at every location',
                  },
                  {
                    icon: <Shield className="w-12 h-12" />,
                    title: 'Secure & Confidential',
                    description: 'Private consultation rooms and secure document handling',
                  },
                  {
                    icon: <Clock className="w-12 h-12" />,
                    title: 'Flexible Hours',
                    description: 'Extended hours and weekend appointments available',
                  },
                  {
                    icon: <Award className="w-12 h-12" />,
                    title: 'Experienced Team',
                    description: '60+ years of combined legal experience across all offices',
                  },
                ]
            ).map((feature, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div className="bg-gradient-to-b from-primary/20 to-transparent p-6 rounded-2xl mb-4 inline-block">
                  <div
                className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {language === 'es' ? (
                <>
                  ¿Listo para <span className="text-primary">Comenzar</span>?
                </>
              ) : (
                <>
                  Ready to <span className="text-primary">Get Started?</span>
                </>
              )}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {language === 'es'
                ? 'Visite cualquiera de nuestras oficinas o programe una consulta virtual hoy'
                : 'Visit any of our offices or schedule a virtual consultation today'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300 hover:scale-105 active:scale-95"
              >
                <Phone className="mr-2 w-5 h-5" />
                {language === 'es' ? 'Llame' : 'Call'} 1-844-YO-PELEO
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
              >
                {language === 'es' ? 'Programar Consulta' : 'Schedule Consultation'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Script
        id="locations-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.vasquezlawnc.com/#organization',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawnc.com',
              logo: 'https://www.vasquezlawnc.com/images/logo.png',
              telephone: '+1-844-967-3536',
              email: 'leads@vasquezlawnc.com',
              sameAs: [
                'https://www.facebook.com/vasquezlawfirm',
                'https://www.linkedin.com/company/vasquez-law-firm',
                'https://twitter.com/vasquezlawfirm',
              ],
              location: locations.map(location => ({
                '@type': 'Place',
                name: location.name,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: location.address.split(',')[0],
                  addressLocality: location.address.split(',')[1]?.trim(),
                  addressRegion: location.address.split(',')[2]?.trim().split(' ')[0],
                  postalCode: location.address.match(/\d{5}/)?.[0],
                  addressCountry: 'US',
                },
                telephone: location.phone,
                faxNumber: location.fax,
                email: location.email,
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: location.lat,
                  longitude: location.lng,
                },
                openingHoursSpecification: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:30',
                  closes: '17:30',
                },
                hasMap: location.mapUrl,
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.vasquezlawnc.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Locations',
                  item: 'https://www.vasquezlawnc.com/locations',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: locations.map((location, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'LegalService',
                  name: location.name,
                  url: `https://www.vasquezlawnc.com/locations/${location.id}`,
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: location.address.split(',')[0],
                    addressLocality: location.address.split(',')[1]?.trim(),
                    addressRegion: location.address.split(',')[2]?.trim().split(' ')[0],
                    postalCode: location.address.match(/\d{5}/)?.[0],
                  },
                  telephone: location.phone,
                },
              })),
            },
          ]),
        }}
      />
    </div>
  );
}
