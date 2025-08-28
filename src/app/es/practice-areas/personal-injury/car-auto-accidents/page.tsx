import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Car Accident Abogados North Carolina | Auto Accident Abogados - Vasquez Law Firm',
  description:
    'Top car accident attorneys in NC. Maximum compensation for auto accident victims. Free consultation. No fee unless we win. Call 1-844-YO-PELEO today!',
  openGraph: {
    title: 'Car Accident Abogados North Carolina | Auto Accident Abogados - Vasquez Law Firm',
    description:
      'Top car accident attorneys in NC. Maximum compensation for auto accident victims. Free consultation. No fee unless we win. Call 1-844-YO-PELEO today!',
    images: [{ url: '../wp-content/uploads/2024/04/charlotte-nc-car-accident-lawyers.jpg' }],
  },
};

export default function CarAutoAccidentsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="car-auto-accidents"
      language="en"
    />
  );
}
