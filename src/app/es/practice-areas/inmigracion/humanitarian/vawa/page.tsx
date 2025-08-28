import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'VAWA (Violence Against Women Act) | Vasquez Law Firm',
  description: 'Inmigración relief under the Violence Against Women Act',
  keywords:
    'vawa (violence against women act), immigration, humanitarian, legal services, attorney, lawyer',
};

export default function VAWAViolenceAgainstWomenActPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="humanitarian" language="en" />;
}
