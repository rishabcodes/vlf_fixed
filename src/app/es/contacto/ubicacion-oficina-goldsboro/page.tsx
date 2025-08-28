import { OfficeLocationTemplate } from '@/components/templates/OfficeLocationTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oficina de Goldsboro NC | Abogados de Inmigración | Vasquez Law Firm',
  description:
    'Próximamente en Goldsboro para consultas legales en español. Inmigración, lesiones personales, defensa criminal. Llame (919) 533-7000.',
  keywords:
    'abogado Goldsboro NC, oficina legal Goldsboro, abogado inmigracion Goldsboro, abogado español Goldsboro',
  openGraph: {
    title: 'Oficina Legal en Goldsboro NC | Vasquez Law Firm',
    description:
      'Abogados que hablan español próximamente en Goldsboro. Consultas gratuitas para inmigración, accidentes y más.',
    url: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-goldsboro',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/goldsboro-office-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Oficina de Vasquez Law Firm en Goldsboro NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-goldsboro',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/contact/goldsboro-office-location',
      'es-ES': 'https://www.vasquezlawnc.com/es/contacto/ubicacion-oficina-goldsboro',
    },
  },
};

export default function GoldsboroOfficePageES() {
  const officeData = {
    city: 'Goldsboro',
    state: 'NC',
    address: 'Por determinar - Próximamente',
    phone: '(919) 533-7000',
    email: 'info@vasquezlawnc.com',
    hours: {
      weekdays: '8:30 AM - 5:30 PM',
      saturday: 'Con cita previa',
      sunday: undefined,
    },
    mapUrl: 'https://maps.google.com/maps?q=Goldsboro+NC',
    practiceAreas: [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'car-accidents',
    ],
    attorneys: ['William Vasquez'],
    parkingInfo: 'Información de estacionamiento disponible próximamente',
    publicTransit: 'Información de transporte público disponible próximamente',
  };

  return <OfficeLocationTemplate office={officeData} language="es" />;
}
