import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ChapelHillCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('chapel-hill');
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
  title: 'Workers Compensation en Chapel Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Chapel Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'compensación laboral Chapel Hill, abogado Chapel Hill, compensación laboral NC, abogado español Chapel Hill, servicios legales Chapel Hill',
  openGraph: {
    title: 'Workers Compensation en Chapel Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Chapel Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/chapel-hill-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Chapel Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/chapel-hill-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-compensacion-laboral',
    },
  },
};
