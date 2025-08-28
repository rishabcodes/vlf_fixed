import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
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
  title: 'Bancarrota en Oviedo, FL | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'bancarrota Oviedo, abogado Oviedo, bancarrota FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Bancarrota en Oviedo, FL | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/oviedo-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Oviedo, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-bancarrota',
    },
  },
};
