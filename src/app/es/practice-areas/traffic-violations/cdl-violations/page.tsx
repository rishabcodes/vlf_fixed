import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'CDL Violations | Vasquez Law Firm',
  description: 'Defense for commercial driver license violations',
  keywords: 'cdl violations, traffic violations, legal services, attorney, lawyer',
};

export default function CDLViolationsPage() {
  return (
    <PracticeAreaWrapper practiceArea="traffic-violations" subArea="cdl-violations" language="en" />
  );
}
