import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
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
  title: 'Workers Compensation en Mint Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Mint Hill, abogado Mint Hill, compensación laboral NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Workers Compensation en Mint Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mint-hill-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Mint Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-compensacion-laboral',
    },
  },
};
