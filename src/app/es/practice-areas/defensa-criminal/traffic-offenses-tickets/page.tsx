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

export default function TrafficOffensesTicketsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="traffic-offenses-tickets"
      language="en"
    />
  );
}
