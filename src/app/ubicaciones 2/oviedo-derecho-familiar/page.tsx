import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
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
  title: 'Family Law en Oviedo, FL | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'derecho familiar Oviedo, abogado Oviedo, derecho familiar FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Family Law en Oviedo, FL | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/oviedo-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Oviedo, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-derecho-familiar',
    },
  },
};
