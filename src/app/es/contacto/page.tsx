import { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contacto - Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    '¿Necesita ayuda legal? Contáctenos hoy para una consulta gratuita con nuestros abogados expertos. Disponible 24/7 en español. Inmigración, lesiones personales, compensación laboral.',
  keywords:
    'contacto abogado, consulta gratuita, abogado español, inmigración contacto, lesiones personales consulta, Charlotte abogado, Raleigh abogado, Orlando abogado',
  openGraph: {
    title: 'Contacto - Bufete de Abogados Vasquez - YO PELEO POR TI™',
    description:
      '¿Necesita ayuda legal? Contáctenos hoy para una consulta gratuita con nuestros abogados expertos. Disponible 24/7 en español.',
    images: [{ url: '/images/BANNER_TRANS.PNG' }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/contacto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/contact',
      'es-ES': 'https://www.vasquezlawnc.com/es/contacto',
    },
  },
};

export default function ContactoPage() {
  return (
    <ContactPageContent language="es" />
  );
}
