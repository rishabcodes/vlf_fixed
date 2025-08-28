import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HuntersvilleCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('huntersville');
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
  title: 'Workers Compensation en Huntersville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Huntersville, abogado Huntersville, compensación laboral NC, abogado español Huntersville, servicios legales Huntersville',
  openGraph: {
    title: 'Workers Compensation en Huntersville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/huntersville-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Huntersville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/huntersville-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-compensacion-laboral',
    },
  },
};
