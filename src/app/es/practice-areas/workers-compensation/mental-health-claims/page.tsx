import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'NC Mental Health Workers Comp Abogado | PTSD & Workplace Stress Abogado',
  description:
    'Suffering from PTSD, anxiety, or depression from workplace trauma in North Carolina? Our workers comp attorneys fight for mental health injury benefits.',
  keywords: [
    'mental health workers comp lawyer NC',
    'PTSD workers compensation attorney',
    'workplace stress claim lawyer North Carolina',
    'anxiety depression workers comp',
    'psychological injury attorney NC',
    'workplace trauma lawyer Charlotte',
  ],
};

export default function MentalHealthClaimsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="mental-health-claims"
      language="en"
    />
  );
}
