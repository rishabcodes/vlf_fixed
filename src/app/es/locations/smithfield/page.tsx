import { Metadata } from 'next';

import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Smithfield Inmigración Abogados | Lesiones Personales Abogados - Vasquez Law Firm',
  description:
    'Smithfield NC immigration lawyers and personal injury attorneys. Full-service law firm serving Johnston County with bilingual staff. Free consultation. Se habla español.',
  keywords:
    'Smithfield immigration lawyer, Smithfield personal injury attorney, Smithfield workers comp lawyer, Johnston County attorney, Smithfield criminal defense, abogado Smithfield NC',
  openGraph: {
    title: 'Smithfield Inmigración Abogados | Lesiones Personales Abogados - Vasquez Law Firm',
    description:
      'Smithfield NC law office serving Johnston County. Inmigración, personal injury, workers comp & criminal defense. Bilingual attorneys. 24/7 Emergency Services.',
    images: [{ url: '/images/offices/smithfield-office.jpg' }],
    url: 'https://www.vasquezlawnc.com/locations/smithfield',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smithfield Inmigración & Lesiones Personales Abogados - Vasquez Law Firm',
    description:
      'Serving Smithfield & Johnston County with expert legal services. Bilingual attorneys.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/locations/smithfield',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/smithfield',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/smithfield',
    },
  },
};

export default function SmithfieldPage() {
  const locationData = {
    cityName: 'Smithfield',
    officeName: 'Smithfield Office - Vasquez Law Firm (Main Office)',
    address: {
      street: '612 S Brightleaf Blvd',
      city: 'Smithfield',
      state: 'NC',
      zip: '27577',
    },
    phone: '(919) 989-3000',
    email: 'smithfield@vasquezlawnc.com',
    hours: {
      weekdays: 'Mon-Fri: 8:30 AM - 5:30 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Downtown Smithfield',
      'Selma',
      'Clayton',
      'Four Oaks',
      'Pine Level',
      'Princeton',
      'Benson',
      'Micro',
      "Wilson's Mills",
      'Kenly',
      'Archer Lodge',
      'Cleveland',
      "McGee's Crossroads",
      'Flowers Plantation',
      'West Smithfield',
      'Buffalo',
      'Meadow',
      'Newton Grove',
      'Dunn',
      'Angier',
      'Coats',
      'Lillington',
      'Fuquay-Varina',
      'Holly Springs',
      'Garner',
      'Wendell',
      'Zebulon',
      'Knightdale',
      'Wilson',
      'Goldsboro',
    ],
    practiceAreas: {
      immigration: [
        'Green Cards & Permanent Residency',
        'Deportation Defense & Removal Proceedings',
        'Work Visas (H-1B, L-1, E-2, H-2A, H-2B)',
        'Agricultural Worker Visas',
        'Family-Based Inmigración & Reunification',
        'Citizenship & Naturalization Applications',
        'DACA Applications & Renewals',
        'Asylum & Refugee Protection',
        'Inmigración Court Representation',
        'Inmigración Appeals',
        'U Visas for Crime Victims',
        'VAWA Self-Petitions',
        'T Visas for Trafficking Victims',
        'Consular Processing',
        'Inmigración Waivers & Pardons',
      ],
      personalInjury: [
        'Car Accidents on I-95, US-70, NC-42, NC-96',
        'Truck & Commercial Vehicle Accidents',
        'Farm Equipment Accidents',
        'Motorcycle & ATV Accidents',
        'Pedestrian & Bicycle Injuries',
        'School Bus Accidents',
        'Hit and Run Accidents',
        'Slip and Fall Cases',
        'Premises Liability Claims',
        'Dog Bite Injuries',
        'Medical Malpractice',
        'Nursing Home Negligence',
        'Wrongful Death Claims',
        'Product Liability',
        'Brain & Spinal Cord Injuries',
      ],
      workersComp: [
        'Workplace Injuries & Accidents',
        'Construction Site Accidents',
        'Agricultural & Farm Injuries',
        'Manufacturing Plant Injuries',
        'Warehouse & Distribution Center Injuries',
        'Repetitive Stress Injuries',
        'Back & Neck Injuries',
        'Heat-Related Illnesses',
        'Denied Claims Appeals',
        'Disability Benefits',
        'Third-Party Claims',
        'Occupational Diseases',
        'Pesticide Exposure',
        'Return to Work Disputes',
        'Medical Treatment Disputes',
        'Permanent Disability Claims',
        'Death Benefits',
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.987654321!2d-78.3406!3d35.5089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDMwJzMyLjAiTiA3OMKwMjAnMjUuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',
  };

  return (
    <>
      <ModernLocationTemplate data={locationData} />
      {/* Structured Data for SEO */}
      <Script
        id="smithfield-location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              '@id': 'https://www.vasquezlawnc.com/locations/smithfield#organization',
              name: 'Vasquez Law Firm - Smithfield Office (Main Office)',
              alternateName: 'Smithfield Inmigración & Lesiones Personales Abogados',
              description:
                'Main office of Vasquez Law Firm in Smithfield NC. Full-service law firm specializing in immigration, personal injury, workers compensation, criminal defense, and family law. Bilingual attorneys available 24/7.',
              url: 'https://www.vasquezlawnc.com/locations/smithfield',
              telephone: '+1-919-989-3000',
              faxNumber: '+1-919-261-1707',
              email: 'smithfield@vasquezlawnc.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '612 S Brightleaf Blvd',
                addressLocality: 'Smithfield',
                addressRegion: 'NC',
                postalCode: '27577',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 35.5085,
                longitude: -78.3394,
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Smithfield',
                  '@id': 'https://www.wikidata.org/wiki/Q2022914',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Johnston County',
                },
              ],
              priceRange: '$$',
              paymentAccepted: [
                'Cash',
                'Check',
                'Credit Card',
                'Debit Card',
                'Wire Transfer',
                'PayPal',
              ],
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
                        'Comprehensive immigration legal services including green cards, citizenship, deportation defense, agricultural worker visas, and family reunification.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Lesiones Personales Law',
                      description:
                        'Expert representation for car accidents, farm equipment accidents, slip and fall, medical malpractice, and wrongful death cases.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Compensación Laboral',
                      description:
                        'Fighting for injured workers rights including agricultural workers, construction workers, and factory workers.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Defensa Criminal',
                      description:
                        'Aggressive defense for DWI, drug charges, assault, and other criminal matters in Johnston County courts.',
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
                reviewCount: '486',
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
                  url: 'https://www.vasquezlawnc.com/images/offices/smithfield-office.jpg',
                  width: '1200',
                  height: '800',
                  caption: 'Vasquez Law Firm Smithfield Main Office Building',
                },
              ],
              sameAs: [
                'https://www.facebook.com/vasquezlawfirm',
                'https://www.linkedin.com/company/vasquez-law-firm',
                'https://twitter.com/vasquezlawfirm',
              ],
              knowsAcerca: [
                'Inmigración Law',
                'Lesiones Personales Law',
                'Compensación Laboral Law',
                'Defensa Criminal Law',
                'Derecho Familiar',
                'Agricultural Law',
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
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Conference Rooms',
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
                  name: 'Smithfield',
                  item: 'https://www.vasquezlawnc.com/locations/smithfield',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.vasquezlawnc.com/locations/smithfield#localbusiness',
              name: 'Vasquez Law Firm Smithfield',
              description:
                'Smithfield NC immigration and personal injury law firm. Main office serving Johnston County with experienced bilingual attorneys.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '612 S Brightleaf Blvd',
                addressLocality: 'Smithfield',
                addressRegion: 'NC',
                postalCode: '27577',
              },
              telephone: '+19199893000',
              openingHours: 'Mo-Fr 08:30-17:30',
              hasMap: 'https://goo.gl/maps/smithfield-vasquez-law',
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
