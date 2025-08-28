import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'K-1 Fiancé(e) Visa | Vasquez Law Firm',
  description: 'Visa for foreign fiancé(e)s of US citizens',
  keywords: 'k-1 fiancé(e) visa, immigration, family based, legal services, attorney, lawyer',
};

export default function K1FianceVisaPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
