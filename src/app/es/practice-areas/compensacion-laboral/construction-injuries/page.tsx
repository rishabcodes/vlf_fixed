import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Construction Injuries | Vasquez Law Firm',
  description: 'Workers compensation for construction site accidents',
  keywords: 'construction injuries, workers compensation, legal services, attorney, lawyer',
};

export default function ConstructionInjuriesPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="construction-injuries"
      language="en"
    />
  );
}
