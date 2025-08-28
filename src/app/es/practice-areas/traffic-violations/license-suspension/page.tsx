import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'License Suspension | Vasquez Law Firm',
  description: 'Fighting license suspension and restoration',
  keywords: 'license suspension, traffic violations, legal services, attorney, lawyer',
};

export default function LicenseSuspensionPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="traffic-violations"
      subArea="license-suspension"
      language="en"
    />
  );
}
