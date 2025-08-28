import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
// ResourceHintsLite removed for performance

// Power-packed metadata with urgency and trust signals
const powerTitle = 'Elite Immigration & Injury Lawyers NC/FL | 24/7 Help';
const powerDescription =
  'Award-Winning Attorneys • 30,000+ WINS • Maximum Settlements FAST • Veteran-Owned • FREE Consultation TODAY • Hablamos Español • Call 1-844-YO-PELEO Now!';

export const metadata: Metadata = {
  title: powerTitle,
  description: powerDescription,
  keywords:
    'elite immigration lawyer, top-rated personal injury attorney, award-winning immigration attorney near me, aggressive car accident lawyer, maximum settlement workers compensation attorney, 24/7 criminal defense lawyer, best North Carolina immigration lawyer, elite Florida personal injury attorney, trusted Charlotte immigration attorney, aggressive Raleigh personal injury lawyer, top Orlando immigration lawyer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    siteName: 'Vasquez Law Firm',
    title: powerTitle,
    description:
      'Elite Legal Team • U.S. Air Force Veteran-Owned • 30,000+ Clients WON • Immediate FREE Consultation • Maximum Results GUARANTEED • Se Habla Español',
    images: [
      {
        url: '/images/BANNER_TRANS.PNG',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm - Elite Immigration and Personal Injury Attorneys',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: powerTitle,
    description:
      '60+ Years WINNING • 30,000+ Cases WON • FREE Consultation NOW • Call 1-844-YO-PELEO',
    images: ['/images/BANNER_TRANS.PNG'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com',
      'es-ES': 'https://www.vasquezlawnc.com/es',
    },
  },
  authors: [
    { name: 'William Vasquez', url: 'https://www.vasquezlawnc.com/attorneys/william-vasquez' },
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function Page() {
  return <HomePage />;
}
