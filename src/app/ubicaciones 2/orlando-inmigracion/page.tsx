import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
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
  title: 'Ley de Immigration en Orlando, FL | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'ley de inmigración Orlando, abogado Orlando, ley de inmigración FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Ley de Immigration en Orlando, FL | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/orlando-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Orlando, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-inmigracion',
    },
  },
};
