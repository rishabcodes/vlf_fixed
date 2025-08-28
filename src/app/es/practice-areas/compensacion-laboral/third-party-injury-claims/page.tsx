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

export default function ThirdPartyInjuryClaimsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="third-party-injury-claims"
      language="en"
    />
  );
}
