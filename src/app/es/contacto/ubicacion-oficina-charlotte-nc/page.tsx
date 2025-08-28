import { OfficeLocationTemplate } from '@/components/templates/OfficeLocationTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oficina de Charlotte NC | Abogados de Inmigración | Vasquez Law Firm',
  description:
    'Visite nuestra oficina de Charlotte para consultas legales en español. Inmigración, lesiones personales, defensa criminal. 5701 Executive Center Dr. Llame (704) 533-7000.',
  keywords:
    'abogado Charlotte NC, oficina legal Charlotte, abogado inmigracion Charlotte, abogado español Charlotte',
  openGraph: {
    title: 'Oficina Legal en Charlotte NC | Vasquez Law Firm',
    description:
      'Abogados que hablan español en Charlotte. Consultas gratuitas para inmigración, accidentes y más.',
    url: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-charlotte-nc',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/charlotte-office-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Oficina de Vasquez Law Firm en Charlotte NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-charlotte-nc',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/contact/charlotte-nc-office-location',
      'es-ES': 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-charlotte-nc',
    },
  },
};

export default function CharlotteOfficePageES() {
  const officeData = {
    city: 'Charlotte',
    state: 'NC',
    address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
    phone: '(704) 533-7000',
    email: 'info@vasquezlawnc.com',
    hours: {
      weekdays: '8:00 AM - 5:00 PM',
      saturday: 'Con cita previa',
      sunday: undefined,
    },
    mapUrl: 'https://maps.google.com/maps?q=5701+Executive+Center+Dr+Charlotte+NC+28212',
    practiceAreas: [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'car-accidents',
    ],
    attorneys: ['William Vasquez', 'Christopher Afanador', 'Mark Kelsey'],
    parkingInfo: 'Amplio estacionamiento gratuito disponible en el complejo Executive Center',
    publicTransit: 'Línea de autobús CATS #11 University City con parada a 5 minutos caminando',
  };

  return <OfficeLocationTemplate office={officeData} language="es" />;
}
