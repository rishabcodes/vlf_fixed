import { OfficeLocationTemplate } from '@/components/templates/OfficeLocationTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oficina de Raleigh NC | Abogados de Inmigración | Vasquez Law Firm',
  description:
    'Visite nuestra oficina de Raleigh para consultas legales en español. Inmigración, lesiones personales, defensa criminal. 4426 Louisburg Road. Llame (919) 533-7000.',
  keywords:
    'abogado Raleigh NC, oficina legal Raleigh, abogado inmigracion Raleigh, abogado español Raleigh',
  openGraph: {
    title: 'Oficina Legal en Raleigh NC | Vasquez Law Firm',
    description:
      'Abogados que hablan español en Raleigh. Consultas gratuitas para inmigración, accidentes y más.',
    url: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-raleigh-nc',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/raleigh-office-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Oficina de Vasquez Law Firm en Raleigh NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-raleigh-nc',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/contact/raleigh-nc-office-location',
      'es-ES': 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-raleigh-nc',
    },
  },
};

export default function RaleighOfficePageES() {
  const officeData = {
    city: 'Raleigh',
    state: 'NC',
    address: '4426 Louisburg Road, Raleigh, NC 27616',
    phone: '(919) 533-7000',
    email: 'info@vasquezlawnc.com',
    hours: {
      weekdays: '8:30 AM - 5:30 PM',
      saturday: 'Con cita previa',
      sunday: undefined,
    },
    mapUrl: 'https://maps.google.com/maps?q=4426+Louisburg+Road+Raleigh+NC+27616',
    practiceAreas: [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'car-accidents',
    ],
    attorneys: ['William Vasquez', 'Mark Kelsey', 'Roselyn V. Torrellas'],
    parkingInfo: 'Estacionamiento gratuito disponible frente al edificio',
    publicTransit: 'Línea de autobús GoRaleigh #12 con parada cerca',
  };

  return <OfficeLocationTemplate office={officeData} language="es" />;
}
