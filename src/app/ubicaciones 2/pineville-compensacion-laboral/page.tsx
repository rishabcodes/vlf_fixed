import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function PinevilleCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('pineville');
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
  title: 'Workers Compensation en Pineville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Pineville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Pineville, abogado Pineville, compensación laboral NC, abogado español Pineville, servicios legales Pineville',
  openGraph: {
    title: 'Workers Compensation en Pineville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Pineville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/pineville-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Pineville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/pineville-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-compensacion-laboral',
    },
  },
};
