import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Consular Processing | Vasquez Law Firm',
  description: 'Obtaining immigrant visas through US consulates abroad',
  keywords: 'consular processing, immigration, family based, legal services, attorney, lawyer',
};

export default function ConsularProcessingPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
