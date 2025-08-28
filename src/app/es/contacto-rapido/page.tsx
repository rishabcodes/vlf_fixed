import ContactoRapidoClient from './ContactoRapidoClient';

export default function ContactoRapidoPage() {
  return <ContactoRapidoClient />;
}

export const metadata = {
  title: 'Contacto Rápido - Emergencias Legales 24/7 | Vasquez Law Firm',
  description:
    'Atención inmediata para emergencias legales. Disponible 24/7. Llame ahora: 1-844-YO-PELEO. Respuesta en minutos para casos urgentes.',
  keywords:
    'contacto urgente abogado, emergencia legal, abogado 24 horas, contacto rapido, ayuda legal inmediata',
  openGraph: {
    title: 'Contacto de Emergencia 24/7 | Vasquez Law Firm',
    description: 'Ayuda legal inmediata disponible. Llame ahora para emergencias: 1-844-YO-PELEO',
    url: 'https://www.vasquezlawnc.com/es/contacto-rapido',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/emergency-contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contacto de Emergencia Legal',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/contacto-rapido',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/quick-contact',
      'es-ES': 'https://www.vasquezlawnc.com/es/contacto-rapido',
    },
  },
};
