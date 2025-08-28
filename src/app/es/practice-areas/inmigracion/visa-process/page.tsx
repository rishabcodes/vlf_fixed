import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Raleigh, NC Immigrant Visa Abogados - Vasquez Law Firm, PLLC',
  description:
    'Need a visa? Raleigh, NC immigrant visa attorneys provide expert legal guidance for work, family, and investor visas. Get trusted representation today.',
  openGraph: {
    title: 'Raleigh, NC Immigrant Visa Abogados - Vasquez Law Firm, PLLC',
    description:
      'Need a visa? Raleigh, NC immigrant visa attorneys provide expert legal guidance for work, family, and investor visas. Get trusted representation today.',
    images: [
      {
        url: '../../wp-content/uploads/2024/04/charlotte-immigrant-visa-application-attorneys.jpg',
      },
    ],
  },
};

export default function VisaProcessPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="visa-process" language="en" />;
}
