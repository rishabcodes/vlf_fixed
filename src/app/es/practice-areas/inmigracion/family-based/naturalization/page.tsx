import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Naturalization/Citizenship | Vasquez Law Firm',
  description: 'Becoming a US citizen through naturalization',
  keywords:
    'naturalization/citizenship, immigration, family based, legal services, attorney, lawyer',
};

export default function NaturalizationCitizenshipPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
