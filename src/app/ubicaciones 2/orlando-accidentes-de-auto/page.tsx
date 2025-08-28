import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
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
  title: 'Accidentes de Auto en Orlando, FL | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'accidentes de auto Orlando, abogado Orlando, accidentes de auto FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Accidentes de Auto en Orlando, FL | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Orlando, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/orlando-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Orlando, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-accidentes-de-auto',
    },
  },
};
