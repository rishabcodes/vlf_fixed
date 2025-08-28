import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premises Liability & Slip and Fall Abogados NC & FL | Vasquez Law Firm',
  description:
    'Expert premises liability attorneys in Raleigh, Charlotte, Smithfield & Orlando. Slip and fall accidents, unsafe property conditions, negligent security. Free consultation.',
  keywords: [
    'slip and fall lawyer',
    'premises liability attorney',
    'trip and fall',
    'unsafe property',
    'negligent security',
    'store accident',
    'apartment injury',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Premises Liability & Slip and Fall Abogados | Vasquez Law Firm',
    description:
      'Expert premises liability attorneys fighting for victims injured on unsafe properties.',
    type: 'website',
    images: [
      {
        url: '/images/premises-liability-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Premises Liability and Slip and Fall Abogados',
      },
    ],
  },
};

export default function PremisesLiabilityPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="premises-liability"
      language="en"
    />
  );
}
