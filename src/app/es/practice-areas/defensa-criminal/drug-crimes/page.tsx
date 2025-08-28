import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drug Crime Defense Abogados NC & FL | Possession & Trafficking | Vasquez Law Firm',
  description:
    'Expert drug crime defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Possession, trafficking, manufacturing, distribution charges. Aggressive defense.',
  keywords:
    'drug crime lawyer, drug possession attorney, drug trafficking defense, controlled substance, narcotics attorney, marijuana lawyer, Raleigh NC, Charlotte NC, Orlando FL',
  openGraph: {
    title: 'Drug Crime Defense Abogados | Possession & Trafficking | Vasquez Law Firm',
    description:
      'Expert drug crime defense attorneys fighting possession, trafficking, and distribution charges.',
    type: 'website',
    images: [
      {
        url: '/images/drug-crime-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Drug Crime Defense Abogados',
      },
    ],
  },
};

export default function DrugCrimesPage() {
  return (
    <PracticeAreaWrapper practiceArea="criminal-defense" subArea="drug-crimes" language="en" />
  );
}
