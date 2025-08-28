import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: '42B Cancellation (LPR) | Vasquez Law Firm',
  description: 'Cancellation of removal for lawful permanent residents',
  keywords:
    '42b cancellation (lpr), immigration, removal defense, legal services, attorney, lawyer',
};

export default function FortyTwoBCancellationLPRPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="removal-defense" language="en" />;
}
