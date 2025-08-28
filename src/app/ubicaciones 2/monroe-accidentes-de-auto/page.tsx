import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MonroeAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('monroe');
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
  title: 'Accidentes de Auto en Monroe, NC | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'accidentes de auto Monroe, abogado Monroe, accidentes de auto NC, abogado español Monroe, servicios legales Monroe',
  openGraph: {
    title: 'Accidentes de Auto en Monroe, NC | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/monroe-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Monroe, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/monroe-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-accidentes-de-auto',
    },
  },
};
