import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
export const metadata: Metadata = {
  title: 'Disability Benefits | Vasquez Law Firm',
  description: 'Securing disability benefits for workplace injuries',
  keywords: 'disability benefits, workers compensation, legal services, attorney, lawyer',
};

export default function DisabilityBenefitsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="disability-benefits"
      language="en"
    />
  );
}
