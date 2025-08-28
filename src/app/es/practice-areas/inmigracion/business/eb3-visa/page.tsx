import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'EB-3 Skilled Workers | Vasquez Law Firm',
  description: 'Employment-based immigration for skilled workers and professionals',
  keywords: 'eb-3 skilled workers, immigration, business, legal services, attorney, lawyer',
};

export default function EB3SkilledWorkersPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="business" language="en" />;
}
