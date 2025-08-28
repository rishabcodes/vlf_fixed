import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Chapel Hill NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Chapel Hill attorneys serving Orange County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Chapel Hill immigration lawyer, Chapel Hill criminal defense attorney, Chapel Hill personal injury lawyer, Chapel Hill abogado, Chapel Hill DWI lawyer, Orange County attorney`,
  openGraph: {
    title: `Chapel Hill Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Chapel Hill, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-chapel-hill.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function ChapelHillPage() {
  const locationData = {
    city: 'Chapel Hill',
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
