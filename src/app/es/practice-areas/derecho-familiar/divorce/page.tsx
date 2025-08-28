import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Divorce Abogado | Separation & Derecho Familiar Abogado | Vasquez Law Firm',
  description:
    'Compassionate divorce attorneys in North Carolina. We guide you through separation, absolute divorce, and complex property division. Se habla español.',
  keywords: [
    'divorce lawyer NC',
    'North Carolina divorce attorney',
    'separation agreement lawyer',
    'absolute divorce NC',
    'uncontested divorce attorney',
    'Charlotte divorce lawyer',
    'Raleigh family law attorney',
    'abogado divorcio NC',
    'equitable distribution lawyer',
    'NC divorce process',
  ],
  openGraph: {
    title: 'NC Divorce Abogado | Compassionate Derecho Familiar Abogado',
    description:
      'Navigate your divorce with experienced attorneys who understand NC law. We protect your rights and future.',
    images: [
      {
        url: '/images/divorce-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Divorce Abogado',
      },
    ],
  },
};

export default function DivorcePage() {
  return <PracticeAreaWrapper practiceArea="family-law" subArea="divorce" language="en" />;
}
