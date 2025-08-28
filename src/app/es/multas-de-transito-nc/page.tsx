import { ModernPracticeAreaTemplateV3 } from '@/components/templates/ModernPracticeAreaTemplateV3';
import { getPracticeAreaByKey } from '@/data/practice-areas';

export default function MultasDeTransitoNCPage() {
  const practiceArea = getPracticeAreaByKey('traffic-tickets');

  if (!practiceArea) {
    return <div>Practice area not found</div>;
  }

  return <ModernPracticeAreaTemplateV3 practiceArea={practiceArea} language="es" />;
}

export const metadata = {
  title: 'Multas de Tráfico NC | Abogados de Tráfico en Carolina del Norte | Vasquez Law Firm',
  description:
    'Defensa experta de multas de tráfico en Carolina del Norte. Proteja su récord de conducir y seguro. Abogados bilingües. Llame (704) 533-7000.',
  keywords:
    'multas tráfico NC, abogados tráfico Carolina del Norte, defensa multas velocidad, DUI NC, abogados bilingües tráfico, récord conducir',
  openGraph: {
    title: 'Multas de Tráfico NC | Abogados de Tráfico en Carolina del Norte | Vasquez Law Firm',
    description:
      'Defensa experta de multas de tráfico en Carolina del Norte. Proteja su récord de conducir y seguro. Abogados bilingües.',
    url: 'https://www.vasquezlawnc.com/es/multas-de-transito-nc',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/traffic-tickets-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Multas de Tráfico NC - Vasquez Law Firm',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/multas-de-transito-nc',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/traffic-tickets-nc',
      'es-ES': 'https://www.vasquezlawnc.com/es/multas-de-transito-nc',
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
