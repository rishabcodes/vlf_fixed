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

export default function EquitableDistributionPropertyDebtDivisionPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="family-law"
      subArea="equitable-distribution-property-debt-division"
      language="en"
    />
  );
}
