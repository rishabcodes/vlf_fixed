import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'NC Property Division Abogado | Equitable Distribution Abogado',
  description:
    'Protecting your assets in North Carolina divorce. Our property division attorneys fight for fair distribution of marital property, debts, and retirement accounts.',
  keywords: [
    'property division lawyer NC',
    'equitable distribution attorney North Carolina',
    'marital property lawyer',
    'divorce asset division attorney',
    'retirement division QDRO lawyer',
    'Charlotte property division attorney',
    'Raleigh equitable distribution lawyer',
    'abogado division bienes divorcio',
    'business valuation divorce NC',
    'separate property attorney',
  ],
  openGraph: {
    title: 'NC Property Division & Equitable Distribution Abogado',
    description:
      "Fair division of marital assets and debts. We protect what you\'ve earned and fight for your financial security.",
    images: [
      {
        url: '/images/property-division-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Property Division Abogado',
      },
    ],
  },
};

export default function PropertyDivisionPage() {
  return (
    <PracticeAreaWrapper practiceArea="family-law" subArea="property-division" language="en" />
  );
}
