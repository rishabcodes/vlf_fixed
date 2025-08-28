import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Prenuptial Agreements | Vasquez Law Firm',
  description: 'Creating and reviewing prenuptial agreements',
  keywords: 'prenuptial agreements, family law, legal services, attorney, lawyer',
};

export default function PrenuptialAgreementsPage() {
  return (
    <PracticeAreaWrapper practiceArea="family-law" subArea="prenuptial-agreements" language="en" />
  );
}
