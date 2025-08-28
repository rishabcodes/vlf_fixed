import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'O-1 Extraordinary Ability | Vasquez Law Firm',
  description: 'Temporary work visa for individuals with extraordinary abilities',
  keywords: 'o-1 extraordinary ability, immigration, business, legal services, attorney, lawyer',
};

export default function O1ExtraordinaryAbilityPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="business" language="en" />;
}
