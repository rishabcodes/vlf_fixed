import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neighborhood Page',
  description: 'Neighborhood information and services',
};

export default function NeighborhoodPage() {
  const locationData = {
    city: 'Uptown Charlotte',
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
        { name: 'Mecklenburg County Courthouse', type: 'District Court' },
        { name: 'Federal Courthouse', type: 'Federal Court' },
      ],
      commonIssues: [
        'Immigration consultations for business district workers',
        'Personal injury from construction site accidents',
        'Traffic violations in downtown area',
        'Criminal defense for nightlife-related charges',
      ],
    },
    testimonials: [
      {
        name: 'Sarah L.',
        location: 'Uptown Resident',
        rating: 5,
        text: 'Great law firm in the heart of Charlotte. Very convenient location and excellent service.',
      },
      {
        name: 'Mike R.',
        location: 'Business Owner',
        rating: 5,
        text: 'Helped with my business immigration needs. Professional and knowledgeable team.',
      },
      {
        name: 'Jennifer K.',
        location: 'Uptown Worker',
        rating: 5,
        text: 'After my car accident downtown, they handled everything perfectly. Highly recommend!',
      },
    ],
    nearbyLocations: [
      { name: 'South End', slug: 'charlotte/neighborhoods/south-end' },
      { name: 'NoDa', slug: 'charlotte/neighborhoods/noda' },
      { name: 'Plaza Midwood', slug: 'charlotte/neighborhoods/plaza-midwood' },
      { name: 'Dilworth', slug: 'charlotte/neighborhoods/dilworth' },
    ],
  };

  return <LocationPageTemplate data={locationData} />;
}
