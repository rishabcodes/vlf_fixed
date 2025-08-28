import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Adoption | Vasquez Law Firm',
  description: 'Legal assistance with adoption proceedings',
  keywords: 'adoption, family law, legal services, attorney, lawyer',
};

export default function AdoptionPage() {
  return <PracticeAreaWrapper practiceArea="family-law" subArea="adoption" language="en" />;
}
