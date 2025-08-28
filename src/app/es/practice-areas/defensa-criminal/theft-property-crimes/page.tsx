import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theft & Property Crime Defense Abogados NC & FL | Vasquez Law Firm',
  description:
    'Expert theft and property crime defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Shoplifting, burglary, robbery, embezzlement, fraud defense.',
  keywords: [
    'theft defense lawyer',
    'property crime attorney',
    'shoplifting',
    'burglary',
    'robbery',
    'embezzlement',
    'fraud',
    'larceny',
    'criminal defense',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Theft & Property Crime Defense Abogados | Vasquez Law Firm',
    description:
      'Expert theft and property crime defense attorneys protecting your freedom and future.',
    type: 'website',
    images: [
      {
        url: '/images/theft-property-crime-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Theft and Property Crime Defense Abogados',
      },
    ],
  },
};

export default function TheftPropertyCrimesPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="theft-property-crimes"
      language="en"
    />
  );
}
