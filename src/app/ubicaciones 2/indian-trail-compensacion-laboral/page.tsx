import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
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
  title: 'Workers Compensation en Indian Trail, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Indian Trail, abogado Indian Trail, compensación laboral NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Workers Compensation en Indian Trail, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/indian-trail-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Indian Trail, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-compensacion-laboral',
    },
  },
};
