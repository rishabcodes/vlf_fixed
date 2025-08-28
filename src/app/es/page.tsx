import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import ResourceHints from '@/components/ResourceHints';

export const metadata: Metadata = {
  title:
    'Bufete de Abogados Vasquez - YO PELEO POR TI™ | Abogados de Inmigración y Lesiones Personales',
  description:
    'Representación legal honesta y confiable a un precio accesible. Más de 60 años de experiencia. Inmigración, lesiones personales, compensación laboral y defensa criminal. Disponible 24/7.',
  keywords:
    'abogado de inmigración, abogado de lesiones personales, abogado de inmigración cerca de mí, abogado de accidentes de auto, abogado de compensación laboral, abogado de defensa criminal, abogado de inmigración en Carolina del Norte, abogado de lesiones personales en Florida, abogado de inmigración en Charlotte, abogado de lesiones personales en Raleigh, abogado de inmigración en Orlando, YO PELEO POR TI™',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    siteName: 'Bufete de Abogados Vasquez',
    title: 'Bufete de Abogados Vasquez - YO PELEO POR TI™',
    description:
      'Representación legal honesta y confiable. Más de 30,000 casos ganados. Abogado veterano de la Fuerza Aérea de EE.UU. Disponible 24/7 con asistencia de IA en español.',
    images: [
      {
        url: '/images/BANNER_TRANS.PNG',
        width: 1200,
        height: 630,
        alt: 'Bufete de Abogados Vasquez - Abogados de Inmigración y Lesiones Personales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bufete de Abogados Vasquez - YO PELEO POR TI™',
    description:
      '60+ años de experiencia. 30,000+ casos ganados. Consulta gratuita. Llama 1-844-YO-PELEO',
    images: ['/images/BANNER_TRANS.PNG'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com',
      'es-ES': 'https://www.vasquezlawnc.com/es',
    },
  },
  authors: [
    { name: 'William Vasquez', url: 'https://www.vasquezlawnc.com/es/abogados/william-vasquez' },
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function EsPage() {
  return (
    <>
      <ResourceHints
        criticalImages={[
          '/images/BANNER_TRANS.PNG',
          '/william-vasquez-cutout.png',
          '/images/LOGO_TRANS.PNG',
        ]}
        preconnectDomains={['https://fonts.gstatic.com']}
      />
      <HomePage language="es" />
    </>
  );
}
