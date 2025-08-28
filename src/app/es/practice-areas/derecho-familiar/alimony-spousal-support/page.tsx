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

export default function AlimonySpousalSupportPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="family-law"
      subArea="alimony-spousal-support"
      language="en"
    />
  );
}
