import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'NC Lifting Injury Workers Comp Abogado | Back Injury Abogado',
  description:
    'Suffered a lifting injury at work in North Carolina? Our workers comp attorneys fight denied claims and get maximum benefits for back and spine injuries.',
  keywords: [
    'lifting injury lawyer NC',
    'back injury workers comp attorney',
    'spine injury workplace lawyer',
    'herniated disc workers compensation',
    'lifting accident attorney NC',
    'workplace back injury lawyer',
  ],
};

export default function LiftingInjuriesPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="lifting-injuries"
      language="en"
    />
  );
}
