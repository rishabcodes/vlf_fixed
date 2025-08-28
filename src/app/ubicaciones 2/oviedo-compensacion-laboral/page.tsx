import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
  const serviceData = getLocationServiceByKey('compensacion-laboral');

  if (!cityData || !serviceData) {
    return <div>Page not found</div>;
  }

  return (
    <LocationServiceTemplate
      city={cityData.name}
      state={cityData.state}
      service={serviceData}
      nearestOffice={cityData.nearestOffice}
      language="es"
    />
  );
}

export const metadata = {
  title: 'Workers Compensation en Oviedo, FL | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'compensación laboral Oviedo, abogado Oviedo, compensación laboral FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Workers Compensation en Oviedo, FL | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/oviedo-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Oviedo, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-compensacion-laboral',
    },
  },
};
