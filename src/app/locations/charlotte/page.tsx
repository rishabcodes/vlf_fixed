import { Metadata } from 'next';

import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Charlotte Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
  description:
    'Charlotte NC immigration lawyers and personal injury attorneys. Full-service law firm with bilingual staff serving Mecklenburg County. Free consultation. Se habla español.',
  keywords:
    'Charlotte immigration lawyer, Charlotte personal injury attorney, Charlotte workers comp lawyer, Charlotte criminal defense attorney, Charlotte family law attorney, abogado Charlotte NC',
  openGraph: {
    title: 'Charlotte Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
    description:
      'Charlotte NC law office serving Mecklenburg County. Immigration, personal injury, workers comp & criminal defense. Bilingual attorneys. 24/7 Emergency Services.',
    images: [{ url: '/images/offices/charlotte-office.jpg' }],
    url: 'https://www.vasquezlawnc.com/locations/charlotte',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Immigration & Personal Injury Lawyers - Vasquez Law Firm',
    description:
      'Serving Charlotte NC with expert legal services. Bilingual attorneys. Free consultation.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/locations/charlotte',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte',
    },
  },
};

export default function CharlottePage() {
  const locationData = {
    cityName: 'Charlotte',
    officeName: 'Charlotte Office',
    address: {
      street: '5701 Executive Center Dr, Suite 103',
      city: 'Charlotte',
      state: 'NC',
      zip: '28212',
    },
    phone: '1-844-YO-PELEO',
    email: 'leads@vasquezlawnc.com',
    hours: {
      weekdays: 'Mon-Fri: 8:00 AM - 5:00 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Uptown Charlotte',
      'South End',
      'NoDa',
      'Plaza Midwood',
      'Myers Park',
      'Matthews',
      'Mint Hill',
      'Pineville',
      'Huntersville',
      'Cornelius',
      'Davidson',
      'Mooresville',
      'Indian Trail',
      'Monroe',
      'Gastonia',
    ],
    practiceAreas: {
      immigration: [
        'Green Cards & Permanent Residency',
        'Deportation Defense',
        'Work Visas (H-1B, L-1, E-2)',
        'Family-Based Immigration',
        'Citizenship & Naturalization',
        'DACA Applications',
        'Asylum & Refugee Protection',
        'Immigration Appeals',
      ],
      personalInjury: [
        'Car Accidents on I-77, I-85, I-485',
        'Truck & Commercial Vehicle Accidents',
        'Motorcycle Accidents',
        'Pedestrian & Bicycle Injuries',
        'Slip and Fall Cases',
        'Wrongful Death Claims',
        'Medical Malpractice',
        'Product Liability',
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8651648937!2d-80.8433!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzM3LjYiTiA4MMKwNTAnMzUuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',
  };

  return (
    <>
      <ModernLocationTemplate data={locationData} />
      {/* Structured Data for SEO */}
      <Script
        id="charlotte-location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              '@id': 'https://www.vasquezlawnc.com/locations/charlotte#organization',
              name: 'Vasquez Law Firm - Charlotte Office',
              alternateName: 'Charlotte Immigration & Personal Injury Lawyers',
              description:
                'Full-service law firm in Charlotte NC specializing in immigration, personal injury, workers compensation, criminal defense, and family law. Bilingual attorneys available 24/7.',
              url: 'https://www.vasquezlawnc.com/locations/charlotte',
              telephone: '+1-704-533-7000',
              faxNumber: '+1-704-800-6779',
              email: 'charlotte@vasquezlawnc.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5701 Executive Center Dr, Suite 103',
                addressLocality: 'Charlotte',
                addressRegion: 'NC',
                postalCode: '28212',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 35.2271,
                longitude: -80.8431,
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Charlotte',
                  '@id': 'https://www.wikidata.org/wiki/Q16565',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Mecklenburg County',
                },
              ],
              priceRange: '$$',
              paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Debit Card', 'Wire Transfer'],
              currenciesAccepted: 'USD',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '17:00',
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
                      name: 'Immigration Law',
                      description:
                        'Comprehensive immigration legal services including green cards, citizenship, deportation defense, and work visas.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Personal Injury Law',
                      description:
                        'Expert representation for car accidents, slip and fall, medical malpractice, and wrongful death cases.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Workers Compensation',
                      description:
                        'Fighting for injured workers rights and maximum compensation for workplace injuries.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Criminal Defense',
                      description:
                        'Aggressive defense for DWI, drug charges, assault, and other criminal matters.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Family Law',
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
                reviewCount: '342',
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
                  url: 'https://www.vasquezlawnc.com/images/offices/charlotte-office.jpg',
                  width: '1200',
                  height: '800',
                  caption: 'Vasquez Law Firm Charlotte Office Building',
                },
              ],
              sameAs: [
                'https://www.facebook.com/vasquezlawfirmcharlotte',
                'https://www.linkedin.com/company/vasquez-law-firm-charlotte',
                'https://twitter.com/vasquezlawclt',
              ],
              knowsAbout: [
                'Immigration Law',
                'Personal Injury Law',
                'Workers Compensation Law',
                'Criminal Defense Law',
                'Family Law',
                'North Carolina Law',
                'Federal Immigration Law',
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
                  name: 'Locations',
                  item: 'https://www.vasquezlawnc.com/locations',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Charlotte',
                  item: 'https://www.vasquezlawnc.com/locations/charlotte',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.vasquezlawnc.com/locations/charlotte#localbusiness',
              name: 'Vasquez Law Firm Charlotte',
              description:
                'Charlotte NC immigration and personal injury law firm with experienced bilingual attorneys.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5701 Executive Center Dr, Suite 103',
                addressLocality: 'Charlotte',
                addressRegion: 'NC',
                postalCode: '28212',
              },
              telephone: '+17045337000',
              openingHours: 'Mo-Fr 08:00-17:00',
              hasMap: 'https://goo.gl/maps/charlotte-vasquez-law',
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
