import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HighPointDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('high-point');
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
  title: 'Criminal Defense en High Point, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal High Point, abogado High Point, defensa criminal NC, abogado español High Point, servicios legales High Point',
  openGraph: {
    title: 'Criminal Defense en High Point, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/high-point-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en High Point, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/high-point-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-defensa-criminal',
    },
  },
};
