import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MonroeCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('monroe');
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
  title: 'Workers Compensation en Monroe, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Monroe, abogado Monroe, compensación laboral NC, abogado español Monroe, servicios legales Monroe',
  openGraph: {
    title: 'Workers Compensation en Monroe, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/monroe-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Monroe, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/monroe-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-compensacion-laboral',
    },
  },
};
