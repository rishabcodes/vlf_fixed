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

export default function DomesticViolenceAbusePage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="domestic-violence-abuse"
      language="en"
    />
  );
}
