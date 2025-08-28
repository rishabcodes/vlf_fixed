import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
  const serviceData = getLocationServiceByKey('abogado-espanol');

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
  title: 'Attorney que Habla Español en Orlando, FL | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'abogado que habla español Orlando, abogado Orlando, abogado que habla español FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Attorney que Habla Español en Orlando, FL | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/orlando-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Orlando, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-abogado-espanol',
    },
  },
};
