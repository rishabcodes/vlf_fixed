import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
};

export default function DrugCrimeCasesPage() {
  return (
    <PracticeAreaWrapper practiceArea="criminal-defense" subArea="drug-crime-cases" language="en" />
  );
}
