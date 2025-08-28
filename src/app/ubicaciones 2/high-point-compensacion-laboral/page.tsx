import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HighPointCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('high-point');
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
  title: 'Workers Compensation en High Point, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral High Point, abogado High Point, compensación laboral NC, abogado español High Point, servicios legales High Point',
  openGraph: {
    title: 'Workers Compensation en High Point, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/high-point-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en High Point, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/high-point-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-compensacion-laboral',
    },
  },
};
