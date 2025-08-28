import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Reckless Driving | Vasquez Law Firm',
  description: 'Legal defense for reckless driving charges',
  keywords: 'reckless driving, traffic violations, legal services, attorney, lawyer',
};

export default function RecklessDrivingPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="traffic-violations"
      subArea="reckless-driving"
      language="en"
    />
  );
}
