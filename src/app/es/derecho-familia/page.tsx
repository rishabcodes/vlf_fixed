import { ModernPracticeAreaTemplateV3 } from '@/components/templates/ModernPracticeAreaTemplateV3';
import { getPracticeAreaByKey } from '@/data/practice-areas';

export default function DerechoFamiliaPage() {
  const practiceArea = getPracticeAreaByKey('family-law');

  if (!practiceArea) {
    return <div>Practice area not found</div>;
  }

  return <ModernPracticeAreaTemplateV3 practiceArea={practiceArea} language="es" />;
}

export const metadata = {
  title: 'Derecho Familiar | Abogados de Familia en NC y FL | Vasquez Law Firm',
  description:
    'Servicios legales compasivos de derecho familiar en Carolina del Norte y Florida. Divorcio, custodia, manutención. Abogados bilingües. Llame (704) 533-7000.',
  keywords:
    'derecho familiar, abogados familia, divorcio NC, custodia menores, manutención infantil, abogados bilingües familia, consulta divorcio',
  openGraph: {
    title: 'Derecho Familiar | Abogados de Familia en NC y FL | Vasquez Law Firm',
    description:
      'Servicios legales compasivos de derecho familiar. Divorcio, custodia, manutención. Abogados bilingües experimentados.',
    url: 'https://www.vasquezlawnc.com/es/derecho-familia',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/family-law-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Derecho Familiar - Vasquez Law Firm',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/derecho-familia',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/derecho-familia',
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
