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

export default function ExpungementExpunctionPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="expungement-expunction"
      language="en"
    />
  );
}
