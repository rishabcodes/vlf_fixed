import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('durham');
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
  title: 'Criminal Defense en Durham, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Durham, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa criminal Durham, abogado Durham, defensa criminal NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Criminal Defense en Durham, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Durham, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/durham-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Durham, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-defensa-criminal',
    },
  },
};
