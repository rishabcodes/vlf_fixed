import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KissimmeeInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('kissimmee');
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
  title: 'Ley de Immigration en Kissimmee, FL | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Kissimmee, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'ley de inmigración Kissimmee, abogado Kissimmee, ley de inmigración FL, abogado español Kissimmee, servicios legales Kissimmee',
  openGraph: {
    title: 'Ley de Immigration en Kissimmee, FL | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Kissimmee, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/kissimmee-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Kissimmee, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kissimmee-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-inmigracion',
    },
  },
};
