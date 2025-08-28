import { Metadata } from 'next';

import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Raleigh Inmigración Abogados | Lesiones Personales Abogados - Vasquez Law Firm',
  description:
    'Raleigh NC immigration lawyers and personal injury attorneys. Main office serving Wake County with deportation defense, family visas, work permits & accident claims.',
  keywords:
    'Raleigh immigration lawyer, Raleigh personal injury attorney, Raleigh workers comp lawyer, Wake County attorney, Raleigh criminal defense, abogado Raleigh NC',
  openGraph: {
    title: 'Raleigh Inmigración Abogados | Lesiones Personales Abogados - Vasquez Law Firm',
    description:
      'Main office serving Wake County & Triangle Area. Inmigración, personal injury, workers comp & criminal defense. Free consultation. Se habla español.',
    images: [{ url: '/images/offices/raleigh-office.jpg' }],
    url: 'https://www.vasquezlawnc.com/locations/raleigh',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raleigh Inmigración & Lesiones Personales Abogados - Vasquez Law Firm',
    description: 'Serving Raleigh & Wake County with expert legal services. Bilingual attorneys.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/locations/raleigh',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh',
    },
  },
};

export default function RaleighPage() {
  const locationData = {
    cityName: 'Raleigh',
    officeName: 'Raleigh Office - Vasquez Law Firm',
    address: {
      street: '4426 Louisburg Road',
      city: 'Raleigh',
      state: 'NC',
      zip: '27616',
    },
    phone: '1-844-YO-PELEO',
    email: 'leads@vasquezlawnc.com',
    hours: {
      weekdays: 'Mon-Fri: 8:30 AM - 5:30 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Downtown Raleigh',
      'North Raleigh',
      'Cary',
      'Apex',
      'Garner',
      'Clayton',
      'Knightdale',
      'Wake Forest',
      'Rolesville',
      'Youngsville',
      'Wendell',
      'Zebulon',
      'Morrisville',
      'Holly Springs',
      'Fuquay-Varina',
    ],
    practiceAreas: {
      immigration: [
        'Green Cards & Permanent Residency',
        'Deportation Defense',
        'Work Visas (H-1B, L-1, E-2)',
        'Family-Based Inmigración',
        'Citizenship & Naturalization',
        'DACA Applications',
        'Asylum & Refugee Protection',
        'Inmigración Appeals',
        'Consular Processing',
        'Waivers & Pardons',
      ],
      personalInjury: [
        'Car Accidents on I-40, I-440, I-540',
        'Truck & Commercial Vehicle Accidents',
        'Motorcycle Accidents',
        'Pedestrian & Bicycle Injuries',
        'Slip and Fall Cases',
        'Wrongful Death Claims',
        'Medical Malpractice',
        'Product Liability',
        'Premises Liability',
        'Dog Bite Cases',
      ],
      workersComp: [
        'Workplace Injuries',
        'Construction Accidents',
        'Repetitive Stress Injuries',
        'Denied Claims Appeals',
        'Disability Benefits',
        'Third-Party Claims',
        'Occupational Diseases',
        'Return to Work Issues',
        'Medical Treatment Disputes',
        'Permanent Disability Claims',
      ],
      criminalDefense: [
        'DWI/DUI Defense',
        'Drug Charges',
        'Domestic Violence',
        'Traffic Violations',
        'Expungements',
        'Federal Crimes',
        'White Collar Crimes',
        'Juvenile Cases',
        'Assault Charges',
        'Theft & Larceny',
      ],
      familyLaw: [
        'Divorce & Separation',
        'Child Custody & Support',
        'Spousal Support/Alimony',
        'Property Division',
        'Prenuptial Agreements',
        'Domestic Violence Protection',
        'Adoption Services',
        'Paternity Cases',
      ],
    },
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.123456789!2d-78.6569!3d35.8324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ5JzU2LjYiTiA3OMKwMzknMjQuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',
  };

  return (
    <>
      <ModernLocationTemplate data={locationData} />
      {/* Structured Data for SEO */}
      <Script
        id="raleigh-location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              '@id': 'https://www.vasquezlawnc.com/locations/raleigh#organization',
              name: 'Vasquez Law Firm - Raleigh Office',
              alternateName: 'Raleigh Inmigración & Lesiones Personales Abogados',
              description:
                'Full-service law firm in Raleigh NC specializing in immigration, personal injury, workers compensation, criminal defense, and family law. Bilingual attorneys available 24/7.',
              url: 'https://www.vasquezlawnc.com/locations/raleigh',
              telephone: '+1-844-967-3536',
              faxNumber: '+1-919-557-3339',
              email: 'raleigh@vasquezlawnc.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '4426 Louisburg Road',
                addressLocality: 'Raleigh',
                addressRegion: 'NC',
                postalCode: '27616',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 35.8324,
                longitude: -78.6569,
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Raleigh',
                  '@id': 'https://www.wikidata.org/wiki/Q39',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Wake County',
                },
              ],
              priceRange: '$$',
              paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Debit Card', 'Wire Transfer'],
              currenciesAccepted: 'USD',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:30',
                  closes: '17:30',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '14:00',
                  description: 'By appointment only',
                },
              ],
              specialOpeningHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                validFrom: '2024-01-01',
                validThrough: '2024-12-31',
                opens: '00:00',
                closes: '23:59',
                description: '24/7 Emergency Legal Services Available',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Legal Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Inmigración Law',
                      description:
                        'Comprehensive immigration legal services including green cards, citizenship, deportation defense, and work visas.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Lesiones Personales Law',
                      description:
                        'Expert representation for car accidents, slip and fall, medical malpractice, and wrongful death cases.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Compensación Laboral',
                      description:
                        'Fighting for injured workers rights and maximum compensation for workplace injuries.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Defensa Criminal',
                      description:
                        'Aggressive defense for DWI, drug charges, assault, and other criminal matters.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Derecho Familiar',
                      description:
                        'Compassionate representation in divorce, custody, support, and adoption matters.',
                    },
                  },
                ],
              },
              review: {
                '@type': 'Review',
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '4.9',
                  bestRating: '5',
                },
                author: {
                  '@type': 'Organization',
                  name: 'Google Reviews',
                },
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '412',
                bestRating: '5',
                worstRating: '1',
              },
              slogan: 'Yo Peleo Por Ti® - I Fight For You',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.vasquezlawnc.com/images/logo.png',
                width: '300',
                height: '100',
              },
              image: [
                {
                  '@type': 'ImageObject',
                  url: 'https://www.vasquezlawnc.com/images/offices/raleigh-office.jpg',
                  width: '1200',
                  height: '800',
                  caption: 'Vasquez Law Firm Raleigh Office Building',
                },
              ],
              sameAs: [
                'https://www.facebook.com/vasquezlawfirmraleigh',
                'https://www.linkedin.com/company/vasquez-law-firm-raleigh',
                'https://twitter.com/vasquezlawral',
              ],
              knowsAcerca: [
                'Inmigración Law',
                'Lesiones Personales Law',
                'Compensación Laboral Law',
                'Defensa Criminal Law',
                'Derecho Familiar',
                'North Carolina Law',
                'Federal Inmigración Law',
              ],
              availableLanguage: [
                {
                  '@type': 'Language',
                  name: 'English',
                  alternateName: 'en',
                },
                {
                  '@type': 'Language',
                  name: 'Spanish',
                  alternateName: 'es',
                },
              ],
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Wheelchair Accessible',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Free Parking',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Free Wi-Fi',
                  value: true,
                },
              ],
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
                  name: 'Ubicaciones',
                  item: 'https://www.vasquezlawnc.com/locations',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Raleigh',
                  item: 'https://www.vasquezlawnc.com/locations/raleigh',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.vasquezlawnc.com/locations/raleigh#localbusiness',
              name: 'Vasquez Law Firm Raleigh',
              description:
                'Raleigh NC immigration and personal injury law firm with experienced bilingual attorneys.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '4426 Louisburg Road',
                addressLocality: 'Raleigh',
                addressRegion: 'NC',
                postalCode: '27616',
              },
              telephone: '+18449673536',
              openingHours: 'Mo-Fr 08:30-17:30',
              hasMap: 'https://goo.gl/maps/raleigh-vasquez-law',
              parentOrganization: {
                '@id': 'https://www.vasquezlawnc.com/#organization',
              },
            },
          ]),
        }}
      />
    </>
  );
}
