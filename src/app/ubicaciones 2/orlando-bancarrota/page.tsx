import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
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
  title: 'Bancarrota en Orlando, FL | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'bancarrota Orlando, abogado Orlando, bancarrota FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Bancarrota en Orlando, FL | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/orlando-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Orlando, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-bancarrota',
    },
  },
};
