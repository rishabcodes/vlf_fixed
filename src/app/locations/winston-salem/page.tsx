import { Metadata } from 'next';

import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
export const metadata: Metadata = {
  title: 'Winston-Salem Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
  description:
    'Winston-Salem NC immigration lawyers and personal injury attorneys. Serving Forsyth County with deportation defense, green cards, work visas & accident claims. Free consultation.',
  openGraph: {
    title: 'Winston-Salem Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
    description:
      'Expert legal representation in Winston-Salem NC. Immigration, personal injury, workers comp & criminal defense. Free consultation. Se habla español.',
    images: [{ url: '/images/offices/winston-salem-office.jpg' }],
  },
};

export default function WinstonSalemPage() {
  const locationData = {
    cityName: 'Winston-Salem',
    officeName: 'Winston-Salem Office',
    address: {
      street: '301 N Main St Suite 1806',
      city: 'Winston-Salem',
      state: 'NC',
      zip: '27101',
    },
    phone: '1-844-YO-PELEO',
    email: 'leads@vasquezlawfirm.com',
    hours: {
      weekdays: 'Mon-Fri: 8:30 AM - 5:30 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Downtown Winston-Salem',
      'Forsyth County',
      'Kernersville',
      'Clemmons',
      'Lewisville',
      'Tobaccoville',
      'Rural Hall',
      'Walkertown',
      'Bethania',
      'King',
      'Stokes County',
      'Davie County',
      'Yadkin County',
      'Surry County',
      'Pilot Mountain',
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
        'Car Accidents on I-40, US-52, I-74',
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
        'Manufacturing Accidents',
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.654321098!2d-80.2569!3d36.0986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDU5JzE4LjkiTiA4MMKwMTUnMjQuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',
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
            name: 'Vasquez Law Firm - Winston-Salem',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '301 N Main St Suite 1806',
              addressLocality: 'Winston-Salem',
              addressRegion: 'NC',
              postalCode: '27101',
              addressCountry: 'US',
            },
            telephone: '+1-844-967-3536',
            url: 'https://www.vasquezlawfirm.com/locations/winston-salem',
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
