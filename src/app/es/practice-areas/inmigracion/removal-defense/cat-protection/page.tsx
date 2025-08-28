import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'CAT Protection | Vasquez Law Firm',
  description: 'Protection under Convention Against Torture',
  keywords: 'cat protection, immigration, removal defense, legal services, attorney, lawyer',
};

export default function CATProtectionPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="removal-defense" language="en" />;
}
