import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Shelby NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Shelby attorneys serving Cleveland County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Shelby immigration lawyer, Shelby criminal defense attorney, Shelby personal injury lawyer, Shelby abogado, Shelby DWI lawyer, Cleveland County attorney`,
  openGraph: {
    title: `Shelby Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Shelby, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-shelby.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function ShelbyPage() {
  const locationData = {
    city: 'Shelby',
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
        { name: 'Local District Court', type: 'District Court' },
        { name: 'County Superior Court', type: 'Superior Court' },
      ],
      commonIssues: [
        'Immigration consultations and proceedings',
        'Traffic violations and DUI cases',
        'Personal injury claims',
        'Family-based immigration petitions',
      ],
    },
    testimonials: [
      {
        name: 'Maria G.',
        location: 'Local Resident',
        rating: 5,
        text: 'Excellent legal representation. They helped me with my immigration case and were very professional.',
      },
      {
        name: 'John D.',
        location: 'Local Business Owner',
        rating: 5,
        text: 'Great experience with personal injury claim. They fought hard for my rights.',
      },
      {
        name: 'Carlos M.',
        location: 'Community Member',
        rating: 5,
        text: 'Very knowledgeable about criminal defense. Highly recommend their services.',
      },
    ],
    nearbyLocations: [
      { name: 'Raleigh', slug: 'raleigh' },
      { name: 'Durham', slug: 'durham' },
      { name: 'Chapel Hill', slug: 'chapel-hill' },
      { name: 'Cary', slug: 'cary' },
    ],
  };

  return <LocationPageTemplate data={locationData} />;
}
