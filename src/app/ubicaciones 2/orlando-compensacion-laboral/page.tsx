import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
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
  title: 'Workers Compensation en Orlando, FL | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'compensación laboral Orlando, abogado Orlando, compensación laboral FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Workers Compensation en Orlando, FL | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/orlando-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Orlando, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-compensacion-laboral',
    },
  },
};
