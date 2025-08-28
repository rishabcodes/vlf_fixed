import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
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
  title: 'Workers Compensation en Sanford, FL | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Sanford, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'compensación laboral Sanford, abogado Sanford, compensación laboral FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Workers Compensation en Sanford, FL | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Sanford, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/sanford-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Sanford, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-compensacion-laboral',
    },
  },
};
