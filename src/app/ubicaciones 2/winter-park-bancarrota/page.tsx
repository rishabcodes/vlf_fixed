import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
  const serviceData = getLocationServiceByKey('bancarrota');

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
  title: 'Bancarrota en Winter Park, FL | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Winter Park, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'bancarrota Winter Park, abogado Winter Park, bancarrota FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Bancarrota en Winter Park, FL | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Winter Park, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winter-park-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Winter Park, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-bancarrota',
    },
  },
};
