import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Compensación Laboral Abogado Near Me in Raleigh | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers near you in Raleigh, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export default function RaleighWorkersCompensationNearMePage() {
  return (
    <LocationPageTemplate
      data={{
        city: 'Raleigh',
        state: 'NC',
        practiceAreas: [
          {
            title: 'Inmigración Law',
            icon: '🌐',
            services: ['Green Cards', 'Citizenship', 'Work Visas', 'Deportation Defense'],
            link: '/practice-areas/immigration-law',
          },
          {
            title: 'Lesiones Personales',
            icon: '🏥',
            services: ['Car Accidents', 'Slip & Fall', 'Medical Malpractice', 'Wrongful Death'],
            link: '/practice-areas/personal-injury',
          },
          {
            title: 'Defensa Criminal',
            icon: '⚖️',
            services: ['DUI/DWI', 'Drug Charges', 'Assault', 'Theft Crimes'],
            link: '/practice-areas/criminal-defense',
          },
        ],
        localInfo: {
          courts: [
            { name: 'Raleigh District Court', type: 'District Court' },
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
            location: 'Raleigh Resident',
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
            location: 'Raleigh Area',
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
