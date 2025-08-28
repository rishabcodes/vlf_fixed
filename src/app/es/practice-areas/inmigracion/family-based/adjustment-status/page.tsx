import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Adjustment of Status | Vasquez Law Firm',
  description: 'Changing from temporary to permanent resident status',
  keywords: 'adjustment of status, immigration, family based, legal services, attorney, lawyer',
};

export default function AdjustmentofStatusPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
