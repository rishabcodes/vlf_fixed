import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Prosecutorial Discretion | Vasquez Law Firm',
  description: 'Requesting discretion in deportation proceedings',
  keywords:
    'prosecutorial discretion, immigration, removal defense, legal services, attorney, lawyer',
};

export default function ProsecutorialDiscretionPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="removal-defense" language="en" />;
}
