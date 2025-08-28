import { Metadata } from 'next';
import OurTeamPageClient from './OurTeamPageClient';

export const metadata: Metadata = {
  title: 'Our Team | Vasquez Law Firm',
  description:
    'Meet the dedicated team at Vasquez Law Firm. Our bilingual staff is committed to providing exceptional legal support to our clients.',
  keywords: 'legal team, law firm staff, bilingual legal support, Vasquez Law Firm team',
};

export default function OurTeamPage() {
  return <OurTeamPageClient />;
}
