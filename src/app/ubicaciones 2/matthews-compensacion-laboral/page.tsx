import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
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
  title: 'Workers Compensation en Matthews, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'compensación laboral Matthews, abogado Matthews, compensación laboral NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Workers Compensation en Matthews, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/matthews-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Matthews, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-compensacion-laboral',
    },
  },
};
