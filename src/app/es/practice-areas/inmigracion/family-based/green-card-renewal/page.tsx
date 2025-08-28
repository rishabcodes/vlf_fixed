import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Green Card Renewal | Vasquez Law Firm',
  description: 'Renewing or replacing permanent resident cards',
  keywords: 'green card renewal, immigration, family based, legal services, attorney, lawyer',
};

export default function GreenCardRenewalPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
