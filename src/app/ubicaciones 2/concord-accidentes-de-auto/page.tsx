import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ConcordAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('concord');
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
  title: 'Accidentes de Auto en Concord, NC | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Concord, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'accidentes de auto Concord, abogado Concord, accidentes de auto NC, abogado español Concord, servicios legales Concord',
  openGraph: {
    title: 'Accidentes de Auto en Concord, NC | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Concord, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/concord-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Concord, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/concord-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/concord-accidentes-de-auto',
    },
  },
};
