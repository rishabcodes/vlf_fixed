import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
  const serviceData = getLocationServiceByKey('lesiones-personales');

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
  title: 'Personal Injury en Orlando, FL | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'lesiones personales Orlando, abogado Orlando, lesiones personales FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Personal Injury en Orlando, FL | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/orlando-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Orlando, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-lesiones-personales',
    },
  },
};
