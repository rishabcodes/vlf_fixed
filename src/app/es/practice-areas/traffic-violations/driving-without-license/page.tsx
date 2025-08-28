import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Driving Without License | Vasquez Law Firm',
  description: 'Legal help for driving without a valid license',
  keywords: 'driving without license, traffic violations, legal services, attorney, lawyer',
};

export default function DrivingWithoutLicensePage() {
  return (
    <PracticeAreaWrapper
      practiceArea="traffic-violations"
      subArea="driving-without-license"
      language="en"
    />
  );
}
