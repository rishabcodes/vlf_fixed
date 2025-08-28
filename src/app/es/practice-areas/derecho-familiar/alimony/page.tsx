import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Alimony Abogado | Spousal Support Abogado | Vasquez Law Firm',
  description:
    'Navigating alimony and spousal support in North Carolina. Whether seeking or defending against alimony, our attorneys protect your financial future. Se habla español.',
  keywords: [
    'alimony lawyer NC',
    'North Carolina spousal support attorney',
    'post separation support lawyer',
    'permanent alimony attorney NC',
    'alimony modification lawyer',
    'Charlotte alimony attorney',
    'Raleigh spousal support lawyer',
    'abogado pension alimenticia',
    'alimony defense attorney NC',
    'spousal support calculation lawyer',
  ],
  openGraph: {
    title: 'NC Alimony & Spousal Support Abogado',
    description:
      'Experienced representation in alimony cases. We help clients seek fair support or defend against excessive demands.',
    images: [
      {
        url: '/images/alimony-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Alimony Abogado',
      },
    ],
  },
};

export default function AlimonyPage() {
  return <PracticeAreaWrapper practiceArea="family-law" subArea="alimony" language="en" />;
}
