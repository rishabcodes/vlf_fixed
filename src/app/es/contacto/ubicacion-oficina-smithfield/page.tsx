import { OfficeLocationTemplate } from '@/components/templates/OfficeLocationTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oficina de Smithfield NC | Abogados de Inmigración | Vasquez Law Firm',
  description:
    'Visite nuestra oficina de Smithfield para consultas legales en español. Inmigración, lesiones personales, defensa criminal. 612 S Brightleaf Blvd. Llame (919) 989-3000.',
  keywords:
    'abogado Smithfield NC, oficina legal Smithfield, abogado inmigracion Smithfield, abogado español Smithfield',
  openGraph: {
    title: 'Oficina Legal en Smithfield NC | Vasquez Law Firm',
    description:
      'Abogados que hablan español en Smithfield. Consultas gratuitas para inmigración, accidentes y más.',
    url: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-smithfield',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/smithfield-office-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Oficina de Vasquez Law Firm en Smithfield NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-smithfield',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/contact/smithfield-office-location',
      'es-ES': 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-smithfield',
    },
  },
};

export default function SmithfieldOfficePageES() {
  const officeData = {
    city: 'Smithfield',
    state: 'NC',
    address: '612 S Brightleaf Blvd, Smithfield, NC 27577',
    phone: '(919) 989-3000',
    email: 'info@vasquezlawnc.com',
    hours: {
      weekdays: '8:30 AM - 5:30 PM',
      saturday: 'Con cita previa',
      sunday: undefined,
    },
    mapUrl: 'https://maps.google.com/maps?q=612+S+Brightleaf+Blvd+Smithfield+NC+27577',
    practiceAreas: [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'car-accidents',
    ],
    attorneys: ['William Vasquez', 'Judith Parkes', 'Jillian Baucom'],
    parkingInfo: 'Estacionamiento gratuito amplio disponible en el complejo',
    publicTransit: 'Servicio de autobús local con parada a una cuadra',
  };

  return <OfficeLocationTemplate office={officeData} language="es" />;
}
