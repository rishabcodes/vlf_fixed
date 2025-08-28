import { Metadata } from 'next';
import FAQPageContent from '@/components/FAQPageContent';

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions | Vasquez Law Firm',
  description:
    'Find answers to common questions about legal services, fees, consultation process, and more. Learn how Vasquez Law Firm can help with your legal needs.',
  keywords:
    'legal FAQ, attorney fees, consultation process, immigration questions, personal injury FAQ, criminal defense questions, legal services FAQ',
  openGraph: {
    title: 'FAQ | Frequently Asked Questions | Vasquez Law Firm',
    description: 'Find answers to common questions about our legal services and processes.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/faq',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/faq-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm FAQ',
      },
    ],
  },
};

export default function FAQPage() {
  return (
    <FAQPageContent />
  );
}
