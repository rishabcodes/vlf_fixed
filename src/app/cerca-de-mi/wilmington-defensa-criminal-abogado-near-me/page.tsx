import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Attorney Near Me in Wilmington | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers near you in Wilmington, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export default function WilmingtonCriminalDefenseNearMePage() {
  return (
    <LocationPageTemplate
      data={{
        city: 'Wilmington',
        state: 'NC',
        practiceAreas: [
          {
            title: 'Immigration Law',
            icon: '🌐',
            services: ['Green Cards', 'Citizenship', 'Work Visas', 'Deportation Defense'],
            link: '/areas-de-practica/immigration-law',
          },
          {
            title: 'Personal Injury',
            icon: '🏥',
            services: ['Car Accidents', 'Slip & Fall', 'Medical Malpractice', 'Wrongful Death'],
            link: '/areas-de-practica/personal-injury',
          },
          {
            title: 'Criminal Defense',
            icon: '⚖️',
            services: ['DUI/DWI', 'Drug Charges', 'Assault', 'Theft Crimes'],
            link: '/areas-de-practica/criminal-defense',
          },
        ],
        localInfo: {
          courts: [
            { name: 'Wilmington District Court', type: 'District Court' },
            { name: 'County Superior Court', type: 'Superior Court' },
          ],
          commonIssues: [
            'legal services consultations',
            'Emergency legal assistance',
            'Free case evaluations',
            'Bilingual legal services',
          ],
        },
        testimonials: [
          {
            name: 'Maria G.',
            location: 'Wilmington Resident',
            rating: 5,
            text: 'Excellent legal services representation. They helped me with my case and were very professional.',
          },
          {
            name: 'John D.',
            location: 'Local Client',
            rating: 5,
            text: 'Great experience with my legal services case. They fought hard for my rights.',
          },
          {
            name: 'Carlos M.',
            location: 'Wilmington Area',
            rating: 5,
            text: 'Very knowledgeable attorneys. Highly recommend their legal services services.',
          },
        ],
        nearbyLocations: [
          { name: 'Raleigh', slug: 'raleigh' },
          { name: 'Durham', slug: 'durham' },
          { name: 'Chapel Hill', slug: 'chapel-hill' },
          { name: 'Charlotte', slug: 'charlotte' },
        ],
      }}
    />
  );
}
