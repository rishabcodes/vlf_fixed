import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'DWI/DUI Defense Abogado - YO PELEO POR TI™ | Vasquez Law Firm',
  description:
    'Aggressive DWI/DUI defense lawyers. Protect your license & freedom. 24/7 emergency response. License restoration help. Call 1-844-YO-PELEO now!',
  keywords: [
    'DWI attorney',
    'DUI lawyer',
    'drunk driving defense',
    'license restoration',
    'breathalyzer test',
    'field sobriety test',
    'North Carolina DWI defense',
  ],
  openGraph: {
    title: 'DWI/DUI Defense - I FIGHT FOR YOUR FREEDOM | Vasquez Law Firm',
    description:
      'Aggressive DWI/DUI defense attorneys. Protect your driving privileges and freedom. Emergency legal response available 24/7.',
    images: [
      {
        url: '/images/dwi-defense.jpg',
      },
    ],
  },
};

export default function DwiDrunkDrivingPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="dwi-drunk-driving"
      language="en"
    />
  );
}
