import { generateEnhancedLocalBusinessSchema } from '@/components/SEO/enhanced-schemas';
import { StructuredData } from '@/components/SEO/StructuredData';
import { officeLocations } from '@/data/locations';
import Link from 'next/link';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

interface LocationPageProps {
  city: string;
  state: string;
  customContent?: {
    heroTitle?: string;
    heroDescription?: string;
    practiceAreas?: Array<{
      title: string;
      description: string;
      link: string;
    }>;
    localStatistics?: Array<{
      label: string;
      value: string;
    }>;
  };
}

export function LocationPage({ city, state, customContent }: LocationPageProps) {
  // Find office location data
  const office = officeLocations.find(
    loc => loc.city.toLowerCase() === city.toLowerCase() && loc.state === state
  );

  const heroTitle =
    customContent?.heroTitle || `${city} ${state} Immigration & Personal Injury Lawyers`;

  const heroDescription =
    customContent?.heroDescription ||
    `Top-rated attorneys serving ${city} and surrounding areas. Free consultation. Se habla español.`;

  const defaultPracticeAreas = [
    {
      title: 'Immigration Law',
      description: `Expert immigration attorneys in ${city} helping with green cards, citizenship, and deportation defense.`,
      link: '/practice-areas/immigration',
    },
    {
      title: 'Personal Injury',
      description: `Experienced ${city} personal injury lawyers fighting for maximum compensation in accident cases.`,
      link: '/practice-areas/personal-injury',
    },
    {
      title: 'Criminal Defense',
      description: `Aggressive criminal defense representation in ${city} courts. Protect your rights and freedom.`,
      link: '/practice-areas/criminal-defense',
    },
    {
      title: 'Workers Compensation',
      description: `Get the workers comp benefits you deserve. Serving injured workers in ${city} and ${state}.`,
      link: '/practice-areas/workers-compensation',
    },
  ];

  const practiceAreas = customContent?.practiceAreas || defaultPracticeAreas;

  const defaultStats = [
    { label: 'Years of Experience', value: '60+' },
    { label: 'Cases Won', value: '30,000+' },
    { label: 'Client Satisfaction', value: '98%' },
    { label: 'Languages Spoken', value: '2' },
  ];

  const statistics = customContent?.localStatistics || defaultStats;

  return (
    <>
      {/* Structured Data */}
      {office && (
        <StructuredData
          data={generateEnhancedLocalBusinessSchema({
            name: office.name,
            address: office.address,
            city: office.city,
            state: office.state,
            zip: office.fullAddress.match(/\d{5}$/)?.[0] || '',
            phone: office.phone,
            fax: office.fax,
            lat: office.lat,
            lng: office.lng,
            hours: office.hours,
            slug: office.slug,
          })}
        />
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl md:text-2xl mb-8">{heroDescription}</p>

            {office && (
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold-400" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gold-400" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gold-400" />
                  <span>{office.hours}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index}

                className="text-center">
                <div
                className="text-4xl font-bold text-burgundy-700 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-burgundy-900 mb-12">
            Legal Services in {city}, {state}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {practiceAreas.map((area, index) => (
              <div
                key={index}

                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <h3
                className="text-2xl font-bold text-burgundy-700 mb-4">{area.title}</h3>
                <p className="text-gray-700 mb-6">{area.description}</p>
                <Link
                  href={area.link}

                className="inline-flex items-center text-burgundy-700 font-semibold hover:text-burgundy-900"
                >
                  Learn More
                  <ArrowRight
                className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      {office && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-burgundy-900 mb-12">
              Visit Our {city} Office
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(office.fullAddress)}`}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Vasquez Law Firm ${city} Office Location`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-burgundy-700 mb-4">{office.name}</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>{office.fullAddress}</p>
                    <p>Phone: {office.phone}</p>
                    {office.fax && <p>Fax: {office.fax}</p>}
                    <p>Hours: {office.hours}</p>
                  </div>
                  <div className="mt-6">
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-burgundy-700 text-white font-semibold rounded-full hover:bg-burgundy-800 transition-colors"
                    >
                      Get Directions
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Local Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
              Why Choose Vasquez Law Firm in {city}?
            </h2>
            <p>
              When you need legal representation in {city}, {state}, you deserve an attorney who
              understands the local courts, judges, and legal landscape. Vasquez Law Firm has been
              serving the {city}
              community for over 35 years, building strong relationships and achieving outstanding
              results for our clients.
            </p>
            <h3 className="text-2xl font-bold text-burgundy-700 mt-8 mb-4">
              Local Experience Matters
            </h3>
            <p>
              Our {city} attorneys are familiar with the specific challenges and opportunities in{' '}
              {state}
              courts. Whether you're facing immigration issues, recovering from an accident, or
              dealing with criminal charges, we have the local knowledge and experience to fight for
              your rights.
            </p>
            <h3 className="text-2xl font-bold text-burgundy-700 mt-8 mb-4">
              Serving All of {state}
            </h3>
            <p>
              While our office is conveniently located in {city}, we proudly serve clients
              throughout {state}. Our bilingual team is ready to help you navigate the legal system
              and achieve the best possible outcome for your case.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact our {city} office today for a free consultation. We're here to fight for
              you - YO PELEO POR TI™!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now: 1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
