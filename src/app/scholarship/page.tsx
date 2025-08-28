import { Metadata } from 'next';
import ScholarshipPageClient from './ScholarshipPageClient';

export const metadata: Metadata = {
  title: 'DACA Dreamer Scholarship | Vasquez Law Firm',
  description: 'Apply for the $1,000 Vasquez Law Firm DACA Dreamer Scholarship. Supporting DACA recipients pursuing higher education with a 3.5+ GPA. Two winners per semester.',
  keywords: 'DACA scholarship, Dreamer scholarship, Vasquez Law Firm scholarship, DACA student support, immigration scholarship, college scholarship',
};

export default function ScholarshipPage() {
  return <ScholarshipPageClient />;
}
