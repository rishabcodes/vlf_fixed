import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoDuiPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
  const serviceData = getLocationServiceByKey('dui');

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
  title: 'Defensa DUI en Orlando, FL | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'defensa dui Orlando, abogado Orlando, defensa dui FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Defensa DUI en Orlando, FL | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/orlando-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Orlando, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-dui',
    },
  },
};
