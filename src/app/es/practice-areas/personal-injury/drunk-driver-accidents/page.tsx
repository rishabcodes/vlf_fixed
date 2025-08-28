import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'NC Drunk Driver Accident Abogado | DWI Victim Abogado | Vasquez Law Firm',
  description:
    'Hit by a drunk driver in North Carolina? Our experienced DWI victim attorneys fight for maximum compensation including punitive damages. Se habla español.',
  keywords: [
    'drunk driver accident lawyer NC',
    'North Carolina DWI victim attorney',
    'drunk driving accident lawyer Raleigh',
    'Charlotte DUI accident attorney',
    'NC drunk driver compensation',
    'DWI accident lawyer near me',
    'abogado accidente conductor ebrio',
    'North Carolina impaired driving lawyer',
    'drunk driver punitive damages NC',
    'NC drunk driving accident statistics',
  ],
  openGraph: {
    title: 'NC Drunk Driver Accident Abogado | DWI Victim Abogado',
    description:
      'Fighting for victims of drunk drivers in North Carolina. We pursue maximum compensation including punitive damages. Free consultation.',
    images: [
      {
        url: '/images/drunk-driver-accident-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Drunk Driver Accident Abogado',
      },
    ],
  },
};

export default function DrunkDriverAccidentsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="drunk-driver-accidents"
      language="en"
    />
  );
}
