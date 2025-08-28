import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoDuiPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
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
  title: 'Defensa DUI en Oviedo, FL | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'defensa dui Oviedo, abogado Oviedo, defensa dui FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Defensa DUI en Oviedo, FL | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/oviedo-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Oviedo, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-dui',
    },
  },
};
