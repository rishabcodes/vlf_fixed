import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KissimmeeCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('kissimmee');
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
  title: 'Workers Compensation en Kissimmee, FL | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Kissimmee, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'compensación laboral Kissimmee, abogado Kissimmee, compensación laboral FL, abogado español Kissimmee, servicios legales Kissimmee',
  openGraph: {
    title: 'Workers Compensation en Kissimmee, FL | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Kissimmee, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/kissimmee-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Kissimmee, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kissimmee-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-compensacion-laboral',
    },
  },
};
