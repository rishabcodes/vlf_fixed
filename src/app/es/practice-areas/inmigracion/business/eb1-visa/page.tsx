import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'EB-1 Extraordinary Ability | Vasquez Law Firm',
  description: 'Employment-based immigration for individuals with extraordinary abilities',
  keywords: 'eb-1 extraordinary ability, immigration, business, legal services, attorney, lawyer',
};

export default function EB1ExtraordinaryAbilityPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="business" language="en" />;
}
