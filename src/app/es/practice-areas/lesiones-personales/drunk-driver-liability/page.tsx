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

export default function DrunkDriverLiabilityPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="drunk-driver-liability"
      language="en"
    />
  );
}
