import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Traffic Court Representation | Vasquez Law Firm',
  description: 'Professional representation in traffic court',
  keywords: 'traffic court representation, traffic violations, legal services, attorney, lawyer',
};

export default function TrafficCourtRepresentationPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="traffic-violations"
      subArea="traffic-court-representation"
      language="en"
    />
  );
}
