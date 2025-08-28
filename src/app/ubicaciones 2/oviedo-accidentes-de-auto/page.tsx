import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
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
  title: 'Accidentes de Auto en Oviedo, FL | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'accidentes de auto Oviedo, abogado Oviedo, accidentes de auto FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Accidentes de Auto en Oviedo, FL | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Oviedo, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/oviedo-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Oviedo, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-accidentes-de-auto',
    },
  },
};
