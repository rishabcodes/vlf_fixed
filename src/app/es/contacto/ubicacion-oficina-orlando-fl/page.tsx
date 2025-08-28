import { OfficeLocationTemplate } from '@/components/templates/OfficeLocationTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oficina de Orlando FL | Abogados de Inmigración | Vasquez Law Firm',
  description:
    'Visite nuestra oficina de Orlando para consultas legales en español. Inmigración, lesiones personales, defensa criminal. 1111 E Amelia Street. Llame (407) 955-5000.',
  keywords:
    'abogado Orlando FL, oficina legal Orlando, abogado inmigracion Orlando, abogado español Orlando',
  openGraph: {
    title: 'Oficina Legal en Orlando FL | Vasquez Law Firm',
    description:
      'Abogados que hablan español en Orlando. Consultas gratuitas para inmigración, accidentes y más.',
    url: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-orlando-fl',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/orlando-office-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Oficina de Vasquez Law Firm en Orlando FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-orlando-fl',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/contact/orlando-fl-office-location',
      'es-ES': 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-orlando-fl',
    },
  },
};

export default function OrlandoOfficePageES() {
  const officeData = {
    city: 'Orlando',
    state: 'FL',
    address: '1111 E Amelia Street, Orlando, FL 32803',
    phone: '(407) 955-5000',
    email: 'info@vasquezlawnc.com',
    hours: {
      weekdays: '8:30 AM - 5:30 PM',
      saturday: 'Con cita previa',
      sunday: undefined,
    },
    mapUrl: 'https://maps.google.com/maps?q=1111+E+Amelia+Street+Orlando+FL+32803',
    practiceAreas: [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'car-accidents',
    ],
    attorneys: ['William Vasquez', 'Christopher Afanador'],
    parkingInfo: 'Estacionamiento gratuito disponible en el edificio',
    publicTransit: 'Línea de autobús LYNX #3 y #11 con paradas cercanas',
  };

  return <OfficeLocationTemplate office={officeData} language="es" />;
}
