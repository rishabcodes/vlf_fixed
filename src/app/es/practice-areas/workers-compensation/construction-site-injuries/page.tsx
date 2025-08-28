import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Construction Site Injury Abogados NC & FL | Workers Comp | Vasquez Law Firm',
  description:
    'Expert construction accident attorneys in Raleigh, Charlotte, Smithfield & Orlando. Falls, equipment injuries, electrocutions. Get workers comp benefits.',
  keywords: [
    'construction accident lawyer',
    'construction site injury',
    'workers compensation',
    'scaffold falls',
    'equipment accidents',
    'OSHA violations',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Construction Site Injury Abogados | Workers Comp | Vasquez Law Firm',
    description:
      'Expert construction accident attorneys fighting for injured construction workers rights and benefits.',
    type: 'website',
    images: [
      {
        url: '/images/construction-site-injury-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Construction Site Injury Abogados',
      },
    ],
  },
};

export default function ConstructionSiteInjuriesPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="construction-site-injuries"
      language="en"
    />
  );
}
