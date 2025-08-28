import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Attorneys | Immigration & Personal Injury Lawyers | Vasquez Law Firm',
  description:
    'Meet our experienced team of attorneys at Vasquez Law Firm. Immigration lawyers, personal injury attorneys, and criminal defense lawyers serving NC & FL. Free consultation: 1-844-YO-PELEO.',
  keywords:
    'immigration attorneys North Carolina, personal injury lawyers Charlotte, criminal defense attorneys Raleigh, abogados de inmigración, workers compensation lawyers NC, family law attorneys Florida',
  openGraph: {
    title: 'Meet Our Attorneys - Vasquez Law Firm',
    description:
      '100+ years combined experience. Bilingual attorneys fighting for your rights in immigration, personal injury, and criminal defense cases.',
    images: ['/images/attorneys/team-photo.jpg'],
    url: 'https://vasquezlawnc.com/attorneys',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Attorneys - Vasquez Law Firm',
    description:
      'Experienced bilingual attorneys serving NC & FL. Immigration, personal injury, criminal defense.',
  },
  alternates: {
    canonical: 'https://vasquezlawnc.com/attorneys',
  },
};

export default function AttorneysLayout({ children }: { children: React.ReactNode }) {
  return children;
}
