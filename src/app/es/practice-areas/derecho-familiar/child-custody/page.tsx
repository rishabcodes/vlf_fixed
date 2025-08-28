import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Child Custody Abogado | Custody & Visitation Abogado | Vasquez Law Firm',
  description:
    'Fighting for your parental rights in North Carolina. Our child custody attorneys handle custody disputes, modifications, and visitation issues. Se habla español.',
  keywords: [
    'child custody lawyer NC',
    'North Carolina custody attorney',
    'visitation rights lawyer',
    'joint custody attorney NC',
    'child custody modification lawyer',
    'Charlotte custody lawyer',
    'Raleigh family custody attorney',
    'abogado custodia hijos',
    'emergency custody lawyer NC',
    'parenting plan attorney',
  ],
  openGraph: {
    title: 'NC Child Custody Abogado | Fighting for Your Children',
    description:
      "Protecting parent-child relationships with experienced custody representation. We fight for your rights and your children's best interests.",
    images: [
      {
        url: '/images/child-custody-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Child Custody Abogado',
      },
    ],
  },
};

export default function ChildCustodyPage() {
  return <PracticeAreaWrapper practiceArea="family-law" subArea="child-custody" language="en" />;
}
