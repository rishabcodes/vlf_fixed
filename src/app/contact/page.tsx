import ContactPageClient from './ContactPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Vasquez Law Firm | Available 24/7',
  description:
    'Contact Vasquez Law Firm for a free consultation. Available 24/7. Offices in NC & FL. Call 1-844-YO-PELEO or fill out our contact form.',
  keywords:
    'contact Vasquez Law Firm, immigration lawyer contact, personal injury attorney, free consultation, NC lawyer, FL attorney',
  openGraph: {
    title: 'Contact Us | Vasquez Law Firm | Available 24/7',
    description: 'Get in touch for a free consultation. We fight for you - YO PELEO POR TI',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/contact',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/contact-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Vasquez Law Firm',
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageClient language="en" />;
}
