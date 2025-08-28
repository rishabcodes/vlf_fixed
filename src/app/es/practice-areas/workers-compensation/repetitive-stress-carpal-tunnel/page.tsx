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

export default function RepetitiveStressCarpalTunnelPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="repetitive-stress-carpal-tunnel"
      language="en"
    />
  );
}
