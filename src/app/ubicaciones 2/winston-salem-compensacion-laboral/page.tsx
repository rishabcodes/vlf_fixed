import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
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
  title: 'Workers Compensation en Winston-Salem, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Winston-Salem, abogado Winston-Salem, compensación laboral NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Workers Compensation en Winston-Salem, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winston-salem-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Winston-Salem, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-compensacion-laboral',
    },
  },
};
