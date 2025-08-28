// Helper script to generate modern location page data
const fs = require('fs');
const path = require('path');

// Location data for NC cities
const ncCityData = {
  apex: {
    cityName: 'Apex',
    servingAreas: [
      'Downtown Apex',
      'Cary',
      'Holly Springs',
      'Morrisville',
      'Research Triangle Park',
      'Fuquay-Varina',
      'Garner',
      'Raleigh',
    ],
    highways: ['US-1, US-64, NC-540'],
  },
  cary: {
    cityName: 'Cary',
    servingAreas: [
      'Downtown Cary',
      'Morrisville',
      'Apex',
      'Research Triangle Park',
      'Holly Springs',
      'Raleigh',
      'Durham',
      'Chapel Hill',
    ],
    highways: ['I-40, US-1, NC-540'],
  },
  clayton: {
    cityName: 'Clayton',
    servingAreas: [
      'Downtown Clayton',
      'Garner',
      'Smithfield',
      'Four Oaks',
      'Archer Lodge',
      'Wendell',
      'Knightdale',
      'Raleigh',
    ],
    highways: ['US-70, NC-42, I-40'],
  },
  durham: {
    cityName: 'Durham',
    servingAreas: [
      'Downtown Durham',
      'Chapel Hill',
      'Research Triangle Park',
      'Hillsborough',
      'Roxboro',
      'Oxford',
      'Creedmoor',
      'Raleigh',
    ],
    highways: ['I-85, I-147, NC-55'],
  },
  garner: {
    cityName: 'Garner',
    servingAreas: [
      'Downtown Garner',
      'Clayton',
      'Raleigh',
      'Fuquay-Varina',
      'Apex',
      'Cary',
      'Wendell',
      'Knightdale',
    ],
    highways: ['US-70, NC-50, I-40'],
  },
  greensboro: {
    cityName: 'Greensboro',
    servingAreas: [
      'Downtown Greensboro',
      'High Point',
      'Winston-Salem',
      'Burlington',
      'Kernersville',
      'Jamestown',
      'Summerfield',
      'Pleasant Garden',
    ],
    highways: ['I-85, I-40, US-29'],
  },
  raleigh: {
    cityName: 'Raleigh',
    servingAreas: [
      'Downtown Raleigh',
      'Cary',
      'Apex',
      'Garner',
      'Clayton',
      'Wake Forest',
      'Knightdale',
      'Morrisville',
    ],
    highways: ['I-40, I-440, I-540'],
  },
  smithfield: {
    cityName: 'Smithfield',
    servingAreas: [
      'Downtown Smithfield',
      'Clayton',
      'Four Oaks',
      'Pine Level',
      'Princeton',
      'Benson',
      'Selma',
      'Kenly',
    ],
    highways: ['I-95, US-70, NC-42'],
  },
  'winston-salem': {
    cityName: 'Winston-Salem',
    servingAreas: [
      'Downtown Winston-Salem',
      'Kernersville',
      'Clemmons',
      'Lewisville',
      'Rural Hall',
      'King',
      'Walkertown',
      'Tobaccoville',
    ],
    highways: ['I-40, US-52, I-74'],
  },
};

// Generate template for a city
function generateLocationTemplate(cityKey, specialtyAreas = []) {
  const data = ncCityData[cityKey];
  if (!data) return null;

  const template = `import { Metadata } from 'next';
import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: '${data.cityName} Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
  description:
    '${data.cityName} NC immigration lawyers and personal injury attorneys. Expert legal representation with deportation defense, green cards, work visas & accident claims. Free consultation.',
  openGraph: {
    title: '${data.cityName} Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
    description: 'Expert legal representation in ${data.cityName} NC. Immigration, personal injury, workers comp & criminal defense. Free consultation. Se habla español.',
    images: [{ url: '/images/offices/${cityKey.toLowerCase()}-office.jpg' }],
  },
};

export default function ${data.cityName}Page() {
  const locationData = {
    cityName: '${data.cityName}',
    officeName: '${data.cityName} Office',
    address: {
      street: 'Contact for address',
      city: '${data.cityName}',
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
    servingAreas: ${JSON.stringify(data.servingAreas, null, 6)},
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
        'Car Accidents on ${data.highways}',
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
    },
  };

  return (
    <>
      <MasterLayout variant="default" showBreadcrumbs={true}>
        <ModernLocationTemplate data={locationData} />
      </MasterLayout>

      {/* Structured Data for SEO */}
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - ${data.cityName}',
            address: {
              '@type': 'PostalAddress',
              addressLocality: '${data.cityName}',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            telephone: '+1-844-967-3536',
            url: 'https://www.vasquezlawfirm.com/locations/nc/${cityKey}',
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
}`;

  return template;
}

console.log(
  'Location page template generator ready. Use generateLocationTemplate(cityKey) to create templates.'
);
module.exports = { generateLocationTemplate, ncCityData };
