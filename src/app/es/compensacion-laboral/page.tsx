import { ModernPracticeAreaTemplateV3 } from '@/components/templates/ModernPracticeAreaTemplateV3';
import { getPracticeAreaByKey } from '@/data/practice-areas';

export default function CompensacionLaboralPage() {
  const practiceArea = getPracticeAreaByKey('workers-compensation');

  if (!practiceArea) {
    return <div>Practice area not found</div>;
  }

  return <ModernPracticeAreaTemplateV3 practiceArea={practiceArea} language="es" />;
}

export const metadata = {
  title: 'Compensación Laboral | Abogados de Compensación de Trabajadores NC | Vasquez Law Firm',
  description:
    'Representación experta en compensación laboral en Carolina del Norte. Lesiones en el trabajo, beneficios médicos. Abogados bilingües. Llame (704) 533-7000.',
  keywords:
    'compensación laboral, compensación trabajadores NC, lesiones trabajo, beneficios médicos trabajo, abogados bilingües compensación laboral',
  openGraph: {
    title: 'Compensación Laboral | Abogados de Compensación de Trabajadores NC | Vasquez Law Firm',
    description:
      'Representación experta en compensación laboral. Lesiones en el trabajo, beneficios médicos. Abogados bilingües experimentados.',
    url: 'https://www.vasquezlawnc.com/es/compensacion-laboral',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/workers-compensation-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Compensación Laboral - Vasquez Law Firm',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/compensacion-laboral',
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
