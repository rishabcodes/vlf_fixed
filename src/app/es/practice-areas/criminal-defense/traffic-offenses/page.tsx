import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'NC Traffic Ticket Abogado | Speeding & Moving Violations Abogado',
  description:
    'Fight traffic tickets in North Carolina. Our attorneys handle speeding, reckless driving, license issues, and CDL violations. Save your license and insurance rates.',
  keywords: [
    'traffic ticket lawyer NC',
    'North Carolina speeding ticket attorney',
    'reckless driving lawyer NC',
    'CDL traffic violation attorney',
    'license restoration lawyer Charlotte',
    'traffic court attorney Raleigh',
    'moving violation lawyer NC',
    'speeding ticket defense',
    'abogado multas trafico NC',
    'North Carolina DMV attorney',
  ],
  openGraph: {
    title: 'NC Traffic Ticket & Moving Violations Abogado',
    description:
      "Don't just pay that ticket! We fight traffic violations to protect your license, insurance rates, and driving record.",
    images: [
      {
        url: '/images/traffic-offenses-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Traffic Violations Abogado',
      },
    ],
  },
};

export default function TrafficOffensesPage() {
  return (
    <PracticeAreaWrapper practiceArea="criminal-defense" subArea="traffic-offenses" language="en" />
  );
}
