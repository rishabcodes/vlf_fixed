import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Probation Violation Defense Abogado | Vasquez Law Firm',
  description:
    'Experienced probation violation defense attorneys in North Carolina. Protect your freedom and avoid jail time. Free consultation available 24/7.',
  keywords:
    'probation violation attorney, probation violation lawyer, violated probation, North Carolina probation violation, criminal defense attorney',
  openGraph: {
    title: 'Probation Violation Defense Abogado | Vasquez Law Firm',
    description:
      'Protect your freedom with experienced probation violation defense. Available 24/7.',
    images: ['/images/practice-areas/probation-violation.jpg'],
  },
};

export default function ProbationViolationPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="probation-violation"
      language="en"
    />
  );
}
