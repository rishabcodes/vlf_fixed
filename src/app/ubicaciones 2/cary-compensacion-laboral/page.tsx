import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CaryCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('cary');
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
  title: 'Workers Compensation en Cary, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'compensación laboral Cary, abogado Cary, compensación laboral NC, abogado español Cary, servicios legales Cary',
  openGraph: {
    title: 'Workers Compensation en Cary, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cary-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cary-compensacion-laboral',
    },
  },
};
