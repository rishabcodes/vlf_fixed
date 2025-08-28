import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
  const serviceData = getLocationServiceByKey('derecho-familiar');

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
  title: 'Family Law en Winter Park, FL | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Winter Park, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'derecho familiar Winter Park, abogado Winter Park, derecho familiar FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Family Law en Winter Park, FL | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Winter Park, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winter-park-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Winter Park, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-derecho-familiar',
    },
  },
};
