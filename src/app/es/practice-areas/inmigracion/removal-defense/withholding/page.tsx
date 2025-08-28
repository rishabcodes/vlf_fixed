import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Withholding of Removal | Vasquez Law Firm',
  description: 'Protection from removal to countries where you face persecution',
  keywords:
    'withholding of removal, immigration, removal defense, legal services, attorney, lawyer',
};

export default function WithholdingofRemovalPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="removal-defense" language="en" />;
}
