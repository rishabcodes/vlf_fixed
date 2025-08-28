import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theft, Larceny & Shoplifting Defense Abogado | Vasquez Law Firm',
  description:
    'Experienced theft crime defense attorneys in North Carolina. Defending against shoplifting, larceny, embezzlement, and theft charges. Free consultation.',
  keywords:
    'theft attorney, larceny lawyer, shoplifting defense, North Carolina theft charges, criminal defense attorney, embezzlement lawyer',
  openGraph: {
    title: 'Theft, Larceny & Shoplifting Defense Abogado | Vasquez Law Firm',
    description:
      'Protect your future with experienced theft crime defense. Free consultation available.',
    images: ['/images/practice-areas/theft-defense.jpg'],
  },
};

export default function TheftLarcenyShopliftingPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="theft-larceny-shoplifting"
      language="en"
    />
  );
}
