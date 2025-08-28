import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Boating Accident Abogado | Watercraft Injury Abogado | Vasquez Law Firm',
  description:
    'Injured in a boating or watercraft accident in North Carolina? Our experienced maritime attorneys fight for victims on NC lakes and coastal waters. Se habla español.',
  keywords: [
    'boating accident lawyer NC',
    'North Carolina watercraft accident attorney',
    'boat crash lawyer Lake Norman',
    'Jordan Lake boating accident attorney',
    'NC maritime injury lawyer',
    'jet ski accident lawyer North Carolina',
    'abogado accidente barco',
    'Outer Banks boating accident attorney',
    'NC boat accident compensation',
    'watercraft injury claim North Carolina',
  ],
  openGraph: {
    title: 'NC Boating Accident Abogado | Watercraft Injury Abogado',
    description:
      'Fighting for boating accident victims on North Carolina waters. We overcome contributory negligence defenses and maritime law complexities. Free consultation.',
    images: [
      {
        url: '/images/boating-accident-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Boating Accident Abogado',
      },
    ],
  },
};

export default function BoatingAccidentsPage() {
  return (
    <PracticeAreaWrapper practiceArea="personal-injury" subArea="boating-accidents" language="en" />
  );
}
