import { Metadata } from 'next';
import PersonalInjuryPage from '@/components/PersonalInjury/PersonalInjuryPageClient';

export const metadata: Metadata = {
  title: 'Personal Injury Lawyer Charlotte & Raleigh NC | Vasquez Law Firm',
  description:
    'Injured in an accident? We fight for the compensation you deserve. Expert personal injury attorneys in NC & FL. Motor vehicle, premises liability & more. FREE consultation. Call 1-844-YO-PELEO.',
  keywords:
    'personal injury lawyer Charlotte NC, car accident attorney Raleigh, motor vehicle accident lawyer, premises liability attorney, boat accident lawyer, personal injury compensation NC FL',
  openGraph: {
    title: 'Personal Injury Attorney | Vasquez Law Firm - We Fight for You',
    description: 'Expert personal injury lawyers in NC & FL. Maximum compensation for car accidents, slip & falls, boat accidents. FREE consultation. 30+ years experience.',
    images: [
      {
        url: '/images/personal-injury-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Personal Injury Lawyers',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/personal-injury',
  },
};

export default function PersonalInjuryPageRoute() {
  return <PersonalInjuryPage />;
}
