import { Metadata } from 'next';

export const blogMetadata: Metadata = {
  title: 'Legal Blog | Expert Insights & News | Vasquez Law Firm, PLLC',
  description:
    'Stay informed with expert legal analysis on immigration, personal injury, criminal defense, workers compensation, and family law in North Carolina and Florida.',
  keywords:
    'legal blog, immigration law, personal injury, criminal defense, workers compensation, family law, North Carolina attorney, Florida lawyer, legal advice',
  openGraph: {
    title: 'Legal Blog | Vasquez Law Firm, PLLC',
    description: 'Expert legal insights and updates for North Carolina and Florida',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/blog',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Legal Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Blog | Vasquez Law Firm, PLLC',
    description: 'Expert legal insights on immigration, personal injury, and more',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/blog',
    languages: {
      en: '/blog',
      es: '/es/blog',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
