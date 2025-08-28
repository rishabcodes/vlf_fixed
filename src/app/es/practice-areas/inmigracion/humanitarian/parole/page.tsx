import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Parole & Humanitarian Parole | Vasquez Law Firm',
  description: 'Temporary admission for urgent humanitarian reasons',
  keywords:
    'parole & humanitarian parole, immigration, humanitarian, legal services, attorney, lawyer',
};

export default function ParoleHumanitarianParolePage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="humanitarian" language="en" />;
}
