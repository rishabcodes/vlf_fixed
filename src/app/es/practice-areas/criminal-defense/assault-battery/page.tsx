import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Assault & Battery Defense | Vasquez Law Firm',
  description:
    'Experienced assault and battery defense attorneys in North Carolina. Free consultation. Se habla español.',
  keywords: [
    'assault battery lawyer NC',
    'assault defense attorney',
    'battery charges lawyer',
    'criminal defense',
  ],
  openGraph: {
    title: 'Assault & Battery Defense | Vasquez Law Firm',
    description: 'Expert assault and battery defense in North Carolina.',
  },
};

export default function AssaultBatteryPage() {
  return (
    <PracticeAreaWrapper practiceArea="criminal-defense" subArea="assault-battery" language="en" />
  );
}
