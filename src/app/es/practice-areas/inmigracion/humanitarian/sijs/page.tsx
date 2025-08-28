import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Special Immigrant Juvenile Status | Vasquez Law Firm',
  description: 'Protection for abused, abandoned, or neglected children',
  keywords:
    'special immigrant juvenile status, immigration, humanitarian, legal services, attorney, lawyer',
};

export default function SpecialImmigrantJuvenileStatusPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="humanitarian" language="en" />;
}
