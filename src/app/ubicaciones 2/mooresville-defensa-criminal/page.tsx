import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MooresvilleDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('mooresville');
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
  title: 'Criminal Defense en Mooresville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Mooresville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal Mooresville, abogado Mooresville, defensa criminal NC, abogado español Mooresville, servicios legales Mooresville',
  openGraph: {
    title: 'Criminal Defense en Mooresville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Mooresville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mooresville-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Mooresville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mooresville-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-defensa-criminal',
    },
  },
};
