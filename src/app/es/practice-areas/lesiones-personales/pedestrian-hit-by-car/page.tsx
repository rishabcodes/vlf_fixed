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

export default function PedestrianHitByCarPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="pedestrian-hit-by-car"
      language="en"
    />
  );
}
