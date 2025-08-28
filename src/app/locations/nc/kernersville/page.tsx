import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Kernersville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Kernersville attorneys serving Forsyth County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Kernersville immigration lawyer, Kernersville criminal defense attorney, Kernersville personal injury lawyer, Kernersville abogado, Kernersville DWI lawyer, Forsyth County attorney`,
  openGraph: {
    title: `Kernersville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Kernersville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-kernersville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function KernersvillePage() {
  const locationData = {
    city: 'Kernersville',
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
