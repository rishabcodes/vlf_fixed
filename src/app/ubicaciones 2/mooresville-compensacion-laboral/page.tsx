import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MooresvilleCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('mooresville');
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
  title: 'Workers Compensation en Mooresville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Mooresville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Mooresville, abogado Mooresville, compensación laboral NC, abogado español Mooresville, servicios legales Mooresville',
  openGraph: {
    title: 'Workers Compensation en Mooresville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Mooresville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mooresville-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Mooresville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mooresville-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-compensacion-laboral',
    },
  },
};
