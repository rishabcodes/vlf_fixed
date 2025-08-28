import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Guardianship | Vasquez Law Firm',
  description: 'Establishing legal guardianship for minors or incapacitated adults',
  keywords: 'guardianship, family law, legal services, attorney, lawyer',
};

export default function GuardianshipPage() {
  return <PracticeAreaWrapper practiceArea="family-law" subArea="guardianship" language="en" />;
}
