import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RaleighCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('raleigh');
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
  title: 'Workers Compensation en Raleigh, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Raleigh, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'compensación laboral Raleigh, abogado Raleigh, compensación laboral NC, abogado español Raleigh, servicios legales Raleigh',
  openGraph: {
    title: 'Workers Compensation en Raleigh, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Raleigh, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/raleigh-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Raleigh, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-compensacion-laboral',
    },
  },
};
