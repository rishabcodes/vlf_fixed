import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ConcordDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('concord');
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
  title: 'Criminal Defense en Concord, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Concord, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal Concord, abogado Concord, defensa criminal NC, abogado español Concord, servicios legales Concord',
  openGraph: {
    title: 'Criminal Defense en Concord, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Concord, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/concord-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Concord, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/concord-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/concord-defensa-criminal',
    },
  },
};
