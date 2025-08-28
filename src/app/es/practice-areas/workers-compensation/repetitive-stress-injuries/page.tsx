import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
export const metadata: Metadata = {
  title: 'Repetitive Stress Injuries | Vasquez Law Firm',
  description: 'Claims for carpal tunnel and other repetitive strain injuries',
  keywords: 'repetitive stress injuries, workers compensation, legal services, attorney, lawyer',
};

export default function RepetitiveStressInjuriesPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="repetitive-stress-injuries"
      language="en"
    />
  );
}
