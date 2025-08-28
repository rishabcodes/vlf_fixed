import FreeConsultationPageClient from './FreeConsultationPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Consultation | Vasquez Law Firm | No Obligation',
  description:
    'Schedule your free legal consultation with Vasquez Law Firm. No obligation. Available in English and Spanish. Get expert legal advice today.',
  keywords:
    'free consultation, legal consultation, immigration lawyer consultation, personal injury consultation, free legal advice, NC lawyer, FL attorney',
  openGraph: {
    title: 'Free Consultation | Vasquez Law Firm | No Obligation',
    description: 'Schedule your free consultation today. We fight for you - YO PELEO POR TI',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/free-consultation',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/consultation-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Consultation with Vasquez Law Firm',
      },
    ],
  },
};

export default function FreeConsultationPage() {
  return <FreeConsultationPageClient language="en" />;
}
