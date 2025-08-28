import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'DUI Lawyer Near Me in Greensboro | Vasquez Law Firm',
  description:
    'Find experienced dui lawyers near you in Greensboro, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export default function GreensboroDUINearMePage() {
  return (
    <LocationPageTemplate
      data={{
        city: 'Greensboro',
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
            { name: 'Greensboro District Court', type: 'District Court' },
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
            location: 'Greensboro Resident',
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
            location: 'Greensboro Area',
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
