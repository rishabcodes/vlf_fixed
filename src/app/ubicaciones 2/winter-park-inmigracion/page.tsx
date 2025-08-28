import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
  const serviceData = getLocationServiceByKey('inmigracion');

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
  title: 'Ley de Immigration en Winter Park, FL | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Winter Park, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'ley de inmigración Winter Park, abogado Winter Park, ley de inmigración FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Ley de Immigration en Winter Park, FL | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Winter Park, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winter-park-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Winter Park, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-inmigracion',
    },
  },
};
