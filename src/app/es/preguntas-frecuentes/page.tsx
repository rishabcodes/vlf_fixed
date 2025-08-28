import { Metadata } from 'next';
import FAQPageContent from '@/components/FAQPageContent';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Vasquez Law Firm, PLLC',
  description:
    'Encuentre respuestas a preguntas legales comunes sobre inmigración, lesiones personales, defensa criminal y más. Obtenga información de abogados experimentados de Carolina del Norte.',
  keywords:
    'preguntas frecuentes legales, preguntas de inmigración, FAQ lesiones personales, preguntas defensa criminal, FAQ ley Carolina del Norte',
  openGraph: {
    title: 'Preguntas Frecuentes | Vasquez Law Firm',
    description: 'Encuentre respuestas a preguntas comunes sobre nuestros servicios legales y procesos.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/es/preguntas-frecuentes',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/faq-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Preguntas Frecuentes',
      },
    ],
  },
  alternates: {
    languages: {
      'en-US': '/faq',
      'es-US': '/es/preguntas-frecuentes',
    },
  },
};

export default function PreguntasFrecuentesPage() {
  return (
    <FAQPageContent language="es" />
  );
}
