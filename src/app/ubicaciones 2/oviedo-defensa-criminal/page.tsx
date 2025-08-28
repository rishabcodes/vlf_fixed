import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
  const serviceData = getLocationServiceByKey('defensa-criminal');

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
  title: 'Criminal Defense en Oviedo, FL | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'defensa criminal Oviedo, abogado Oviedo, defensa criminal FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Criminal Defense en Oviedo, FL | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/oviedo-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Oviedo, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-defensa-criminal',
    },
  },
};
