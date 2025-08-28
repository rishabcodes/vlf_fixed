import { Metadata } from 'next';

import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
export const metadata: Metadata = {
  title: 'Cary Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
  description:
    'Cary NC immigration lawyers and personal injury attorneys. Expert legal representation with deportation defense, green cards, work visas & accident claims. Free consultation.',
  openGraph: {
    title: 'Cary Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
    description:
      'Expert legal representation in Cary NC. Immigration, personal injury, workers comp & criminal defense. Free consultation. Se habla español.',
    images: [{ url: '/images/offices/cary-office.jpg' }],
  },
};

export default function CaryPage() {
  const locationData = {
    cityName: 'Cary',
    officeName: 'Cary Office',
    address: {
      street: 'Contact for address',
      city: 'Cary',
      state: 'NC',
      zip: '',
    },
    phone: '1-844-YO-PELEO',
    email: 'info@vasquezlawfirm.com',
    hours: {
      weekdays: 'Mon-Fri: 9:00 AM - 6:00 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Downtown Cary',
      'Morrisville',
      'Apex',
      'Research Triangle Park',
      'Holly Springs',
      'Raleigh',
      'Durham',
      'Chapel Hill',
      'Fuquay-Varina',
      'Garner',
      'Wake Forest',
      'Knightdale',
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
        'Immigration Court Representation',
      ],
      personalInjury: [
        'Car Accidents on I-40, US-1, NC-540',
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
            name: 'Vasquez Law Firm - Cary',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Cary',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            telephone: '+1-844-967-3536',
            url: 'https://www.vasquezlawfirm.com/locations/nc/cary',
            priceRange: '$$',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '18:00',
            },
          }),
        }}
      />
    </>
  );
}
