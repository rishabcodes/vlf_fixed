import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RaleighDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('raleigh');
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
  title: 'Criminal Defense en Raleigh, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Raleigh, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa criminal Raleigh, abogado Raleigh, defensa criminal NC, abogado español Raleigh, servicios legales Raleigh',
  openGraph: {
    title: 'Criminal Defense en Raleigh, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Raleigh, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/raleigh-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Raleigh, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-defensa-criminal',
    },
  },
};
