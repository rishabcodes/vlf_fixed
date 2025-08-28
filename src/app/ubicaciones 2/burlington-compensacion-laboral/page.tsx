import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function BurlingtonCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('burlington');
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
  title: 'Workers Compensation en Burlington, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Burlington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'compensación laboral Burlington, abogado Burlington, compensación laboral NC, abogado español Burlington, servicios legales Burlington',
  openGraph: {
    title: 'Workers Compensation en Burlington, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Burlington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/burlington-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Burlington, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/burlington-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-compensacion-laboral',
    },
  },
};
