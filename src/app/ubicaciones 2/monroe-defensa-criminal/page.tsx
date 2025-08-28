import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MonroeDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('monroe');
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
  title: 'Criminal Defense en Monroe, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal Monroe, abogado Monroe, defensa criminal NC, abogado español Monroe, servicios legales Monroe',
  openGraph: {
    title: 'Criminal Defense en Monroe, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/monroe-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Monroe, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/monroe-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-defensa-criminal',
    },
  },
};
