import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'T Visa (Trafficking Victims) | Vasquez Law Firm',
  description: 'Protection for victims of human trafficking through T visa',
  keywords:
    't visa (trafficking victims), immigration, humanitarian, legal services, attorney, lawyer',
};

export default function TVisaTraffickingVictimsPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="humanitarian" language="en" />;
}
