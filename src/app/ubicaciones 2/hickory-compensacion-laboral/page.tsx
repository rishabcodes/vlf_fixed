import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Workers Compensation en Hickory, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Hickory, abogado Hickory, compensación laboral NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Workers Compensation en Hickory, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/hickory-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Hickory, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-compensacion-laboral',
    },
  },
};
