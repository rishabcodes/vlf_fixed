import { Metadata } from 'next';

import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
export const metadata: Metadata = {
  title: 'Durham Inmigración Abogados | Lesiones Personales Abogados - Vasquez Law Firm',
  description:
    'Durham NC immigration lawyers and personal injury attorneys. Serving Durham County with deportation defense, green cards, work visas & accident claims. Free consultation.',
  openGraph: {
    title: 'Durham Inmigración Abogados | Lesiones Personales Abogados - Vasquez Law Firm',
    description:
      'Expert legal representation in Durham NC. Inmigración, personal injury, workers comp & criminal defense. Free consultation. Se habla español.',
    images: [{ url: '/images/offices/durham-office.jpg' }],
  },
};

export default function DurhamPage() {
  const locationData = {
    cityName: 'Durham',
    officeName: 'Durham Office',
    address: {
      street: '3425 Westgate Dr Suite 100',
      city: 'Durham',
      state: 'NC',
      zip: '27707',
    },
    phone: '1-844-YO-PELEO',
    email: 'leads@vasquezlawfirm.com',
    hours: {
      weekdays: 'Mon-Fri: 8:30 AM - 5:30 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Downtown Durham',
      'North Durham',
      'Research Triangle Park',
      'Chapel Hill',
      'Carrboro',
      'Hillsborough',
      'Roxboro',
      'Oxford',
      'Creedmoor',
      'Bahama',
      'Gorman',
      'Timberlake',
      'Rougemont',
      'Duke University',
      'University of North Carolina',
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
        'Inmigración Court Representation',
      ],
      personalInjury: [
        'Car Accidents on I-85, I-147, NC-55',
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.987654321!2d-78.9234!3d35.9876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDU5JzE1LjQiTiA3OMKwNTUnMjQuMyJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',
  };

  return (
    <>
      <ModernLocationTemplate data={locationData} />
      {/* Structured Data for SEO */}
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Durham',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '3425 Westgate Dr Suite 100',
              addressLocality: 'Durham',
              addressRegion: 'NC',
              postalCode: '27707',
              addressCountry: 'US',
            },
            telephone: '+1-844-967-3536',
            url: 'https://www.vasquezlawfirm.com/locations/durham',
            priceRange: '$$',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:30',
              closes: '17:30',
            },
          }),
        }}
      />
    </>
  );
}
