import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neighborhood Page',
  description: 'Neighborhood information and services',
};

export default function NeighborhoodPage() {
  const locationData = {
    city: 'Downtown Raleigh',
    state: 'NC',
    practiceAreas: [
      {
        title: 'Immigration Law',
        icon: '🌐',
        services: ['Green Cards', 'Citizenship', 'Work Visas', 'Deportation Defense'],
        link: '/practice-areas/immigration-law',
      },
      {
        title: 'Personal Injury',
        icon: '🏥',
        services: ['Car Accidents', 'Slip & Fall', 'Medical Malpractice', 'Wrongful Death'],
        link: '/practice-areas/personal-injury',
      },
      {
        title: 'Criminal Defense',
        icon: '⚖️',
        services: ['DUI/DWI', 'Drug Charges', 'Assault', 'Theft Crimes'],
        link: '/practice-areas/criminal-defense',
      },
    ],
    localInfo: {
      courts: [
        { name: 'Wake County Courthouse', type: 'District Court' },
        { name: 'Wake County Justice Center', type: 'Superior Court' },
      ],
      commonIssues: [
        'Immigration services for state government workers',
        'Personal injury from pedestrian accidents',
        'Criminal defense for downtown incidents',
        'Business immigration consultations',
      ],
    },
    testimonials: [
      {
        name: 'David M.',
        location: 'Downtown Resident',
        rating: 5,
        text: 'Convenient downtown location. They helped me with my immigration case professionally.',
      },
      {
        name: 'Lisa P.',
        location: 'Government Worker',
        rating: 5,
        text: 'After my slip and fall accident, they got me the compensation I deserved. Excellent service!',
      },
      {
        name: 'Robert T.',
        location: 'Downtown Business Owner',
        rating: 5,
        text: 'Great legal advice for my business needs. They speak Spanish which helped my employees.',
      },
    ],
    nearbyLocations: [
      { name: 'Cameron Village', slug: 'raleigh/neighborhoods/cameron-village' },
      { name: 'Glenwood South', slug: 'raleigh/neighborhoods/glenwood-south' },
      { name: 'North Hills', slug: 'raleigh/neighborhoods/north-hills' },
      { name: 'Five Points', slug: 'raleigh/neighborhoods/five-points' },
    ],
  };

  return <LocationPageTemplate data={locationData} />;
}
