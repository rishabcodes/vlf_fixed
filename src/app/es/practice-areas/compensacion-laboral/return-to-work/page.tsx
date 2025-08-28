import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Return to Work | Vasquez Law Firm',
  description: 'Navigating return to work after workplace injury',
  keywords: 'return to work, workers compensation, legal services, attorney, lawyer',
};

export default function ReturntoWorkPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="return-to-work"
      language="en"
    />
  );
}
