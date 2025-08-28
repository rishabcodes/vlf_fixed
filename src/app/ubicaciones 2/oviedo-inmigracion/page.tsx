import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
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
  title: 'Ley de Immigration en Oviedo, FL | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'ley de inmigración Oviedo, abogado Oviedo, ley de inmigración FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Ley de Immigration en Oviedo, FL | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/oviedo-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Oviedo, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-inmigracion',
    },
  },
};
