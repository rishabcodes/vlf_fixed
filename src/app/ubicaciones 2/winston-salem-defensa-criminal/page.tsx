import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
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
  title: 'Criminal Defense en Winston-Salem, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal Winston-Salem, abogado Winston-Salem, defensa criminal NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Criminal Defense en Winston-Salem, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winston-salem-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Winston-Salem, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-defensa-criminal',
    },
  },
};
