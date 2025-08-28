import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CorneliusDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('cornelius');
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
  title: 'Criminal Defense en Cornelius, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Cornelius, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal Cornelius, abogado Cornelius, defensa criminal NC, abogado español Cornelius, servicios legales Cornelius',
  openGraph: {
    title: 'Criminal Defense en Cornelius, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Cornelius, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cornelius-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Cornelius, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cornelius-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-defensa-criminal',
    },
  },
};
