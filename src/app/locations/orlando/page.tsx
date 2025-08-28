import { Metadata } from 'next';

import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Orlando Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
  description:
    'Orlando FL immigration lawyers and personal injury attorneys. Full-service law firm serving Orange County with bilingual staff. Free consultation. Se habla español.',
  keywords:
    'Orlando immigration lawyer, Orlando personal injury attorney, Orlando workers comp lawyer, Orange County attorney, Orlando criminal defense, abogado Orlando FL',
  openGraph: {
    title: 'Orlando Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
    description:
      'Orlando FL law office serving Orange County & Central Florida. Immigration, personal injury, workers comp & criminal defense. Bilingual attorneys. 24/7 Emergency Services.',
    images: [{ url: '/images/offices/orlando-office.jpg' }],
    url: 'https://www.vasquezlawnc.com/locations/orlando',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orlando Immigration & Personal Injury Lawyers - Vasquez Law Firm',
    description:
      'Serving Orlando & Central Florida with expert legal services. Bilingual attorneys.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/locations/orlando',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando',
    },
  },
};

export default function OrlandoPage() {
  const locationData = {
    cityName: 'Orlando',
    officeName: 'Orlando Office - Vasquez Law Firm',
    address: {
      street: '1111 E Amelia Street',
      city: 'Orlando',
      state: 'FL',
      zip: '32803',
    },
    phone: '(407) 955-5000',
    email: 'orlando@vasquezlawnc.com',
    hours: {
      weekdays: 'Mon-Fri: 8:30 AM - 5:30 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Downtown Orlando',
      'Winter Park',
      'College Park',
      'Thornton Park',
      'Lake Eola Heights',
      'Audubon Park',
      'Baldwin Park',
      'Kissimmee',
      'St. Cloud',
      'Celebration',
      'Sanford',
      'Lake Mary',
      'Longwood',
      'Altamonte Springs',
      'Casselberry',
      'Maitland',
      'Winter Springs',
      'Oviedo',
      'Apopka',
      'Winter Garden',
      'Windermere',
      'Dr. Phillips',
      'Bay Hill',
      'MetroWest',
      'Pine Hills',
      'Universal Studios Area',
      'Disney World Area',
      'International Drive',
      'Lake Nona',
      'Avalon Park',
      'Waterford Lakes',
    ],
    practiceAreas: {
      immigration: [
        'Green Cards & Permanent Residency',
        'Deportation Defense & Removal Proceedings',
        'Work Visas (H-1B, L-1, E-2, O-1, P-1)',
        'Entertainment & Artist Visas',
        'Tourism Industry Work Visas',
        'Family-Based Immigration & Reunification',
        'Citizenship & Naturalization Applications',
        'DACA Applications & Renewals',
        'Asylum & Refugee Protection',
        'Cuban Adjustment Act Cases',
        'Venezuelan TPS Applications',
        'Haitian Family Reunification',
        'Immigration Court Representation',
        'Immigration Appeals',
        'U Visas for Crime Victims',
        'VAWA Self-Petitions',
        'Consular Processing',
        'Immigration Waivers & Pardons',
      ],
      personalInjury: [
        'Car Accidents on I-4, SR-408, SR-417, US-192',
        'Theme Park Accidents & Injuries',
        'Tourist & Visitor Accidents',
        'Truck & Commercial Vehicle Accidents',
        'Motorcycle & Scooter Accidents',
        'Pedestrian & Bicycle Injuries',
        'Uber/Lyft Rideshare Accidents',
        'Hotel & Resort Injuries',
        'Slip and Fall Cases',
        'Swimming Pool Accidents',
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
        'Theme Park Employee Injuries',
        'Hotel & Hospitality Worker Injuries',
        'Restaurant Worker Injuries',
        'Construction Site Accidents',
        'Warehouse & Distribution Center Injuries',
        'Healthcare Worker Injuries',
        'Repetitive Stress Injuries',
        'Heat-Related Illnesses',
        'Back & Neck Injuries',
        'Denied Claims Appeals',
        'Disability Benefits',
        'Third-Party Claims',
        'Occupational Diseases',
        'Return to Work Disputes',
        'Medical Treatment Disputes',
        'Permanent Disability Claims',
        'Death Benefits',
      ],
      criminalDefense: [
        'DWI/DUI Defense',
        'Drug Possession & Trafficking',
        'Tourist Arrest Defense',
        'Theme Park Incidents',
        'Domestic Violence Charges',
        'Assault & Battery',
        'Theft & Shoplifting',
        'Traffic Violations & Speeding',
        'Red Light Camera Tickets',
        'Expungements & Record Sealing',
        'Federal Crimes',
        'White Collar Crimes',
        'Probation Violations',
        'Bond Hearings',
        'Juvenile Crimes',
        'Sex Crimes Defense',
        'Weapons Charges',
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123456789!2d-81.3792!3d28.5383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzE3LjkiTiA4McKwMjInNDUuMSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',
  };

  return (
    <>
      <ModernLocationTemplate data={locationData} />
      {/* Structured Data for SEO */}
      <Script
        id="orlando-location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              '@id': 'https://www.vasquezlawnc.com/locations/orlando#organization',
              name: 'Vasquez Law Firm - Orlando Office',
              alternateName: 'Orlando Immigration & Personal Injury Lawyers',
              description:
                "Full-service law firm in Orlando FL specializing in immigration, personal injury, workers compensation, criminal defense, and family law. Serving Central Florida's diverse communities with bilingual attorneys available 24/7.",
              url: 'https://www.vasquezlawnc.com/locations/orlando',
              telephone: '+1-407-955-5000',
              email: 'orlando@vasquezlawnc.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '1111 E Amelia Street',
                addressLocality: 'Orlando',
                addressRegion: 'FL',
                postalCode: '32803',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.5383,
                longitude: -81.3792,
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Orlando',
                  '@id': 'https://www.wikidata.org/wiki/Q49233',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Orange County',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Osceola County',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Seminole County',
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
                      name: 'Immigration Law',
                      description:
                        'Comprehensive immigration legal services including green cards, citizenship, deportation defense, work visas, and specialized services for Central and South American communities.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Personal Injury Law',
                      description:
                        'Expert representation for car accidents, theme park injuries, tourist accidents, slip and fall, medical malpractice, and wrongful death cases.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Workers Compensation',
                      description:
                        'Fighting for injured workers rights including theme park employees, hospitality workers, and construction workers.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Criminal Defense',
                      description:
                        'Aggressive defense for DUI, drug charges, tourist arrests, and other criminal matters in Orange County courts.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Family Law',
                      description:
                        'Compassionate representation in divorce, custody, support, and adoption matters for Florida families.',
                    },
                  },
                ],
              },
              review: {
                '@type': 'Review',
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '4.8',
                  bestRating: '5',
                },
                author: {
                  '@type': 'Organization',
                  name: 'Google Reviews',
                },
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '278',
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
                  url: 'https://www.vasquezlawnc.com/images/offices/orlando-office.jpg',
                  width: '1200',
                  height: '800',
                  caption: 'Vasquez Law Firm Orlando Office Building',
                },
              ],
              sameAs: [
                'https://www.facebook.com/vasquezlawfirmorlando',
                'https://www.linkedin.com/company/vasquez-law-firm-orlando',
                'https://twitter.com/vasquezlaworl',
              ],
              knowsAbout: [
                'Immigration Law',
                'Personal Injury Law',
                'Workers Compensation Law',
                'Criminal Defense Law',
                'Family Law',
                'Florida Law',
                'Federal Immigration Law',
                'Tourism Law',
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
                {
                  '@type': 'Language',
                  name: 'Portuguese',
                  alternateName: 'pt',
                },
                {
                  '@type': 'Language',
                  name: 'Haitian Creole',
                  alternateName: 'ht',
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
                  name: 'Orlando',
                  item: 'https://www.vasquezlawnc.com/locations/orlando',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.vasquezlawnc.com/locations/orlando#localbusiness',
              name: 'Vasquez Law Firm Orlando',
              description:
                "Orlando FL immigration and personal injury law firm with experienced multilingual attorneys serving Central Florida's diverse communities.",
              address: {
                '@type': 'PostalAddress',
                streetAddress: '1111 E Amelia Street',
                addressLocality: 'Orlando',
                addressRegion: 'FL',
                postalCode: '32803',
              },
              telephone: '+14079555000',
              openingHours: 'Mo-Fr 08:30-17:30',
              hasMap: 'https://goo.gl/maps/orlando-vasquez-law',
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
