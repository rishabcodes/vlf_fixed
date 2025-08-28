import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'EB-2 Advanced Degree/NIW | Vasquez Law Firm',
  description: 'Inmigración for professionals with advanced degrees or exceptional ability',
  keywords: 'eb-2 advanced degree/niw, immigration, business, legal services, attorney, lawyer',
};

export default function EB2AdvancedDegreeNIWPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="business" language="en" />;
}
