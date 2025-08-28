import AboutPageClient from '@/components/About/AboutPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Vasquez Law Firm | Fighting for You Since 2011',
  description:
    'Founded in 2011, Vasquez Law Firm provides accessible, high-quality legal representation across North Carolina and Florida. Learn about our mission, values, and team.',
  keywords:
    'Vasquez Law Firm, about us, legal services, North Carolina attorney, Florida lawyer, immigration law, personal injury, criminal defense',
  openGraph: {
    title: 'About Vasquez Law Firm | Fighting for You Since 2011',
    description: 'Learn about our mission, values, and experienced legal team.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/about',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Team',
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageClient language="en" />;
}
