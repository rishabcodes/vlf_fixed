import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KissimmeeAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('kissimmee');
  const serviceData = getLocationServiceByKey('accidentes-de-auto');

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
  title: 'Accidentes de Auto en Kissimmee, FL | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Kissimmee, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'accidentes de auto Kissimmee, abogado Kissimmee, accidentes de auto FL, abogado español Kissimmee, servicios legales Kissimmee',
  openGraph: {
    title: 'Accidentes de Auto en Kissimmee, FL | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Kissimmee, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/kissimmee-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Kissimmee, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kissimmee-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-accidentes-de-auto',
    },
  },
};
