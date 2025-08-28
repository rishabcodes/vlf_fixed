import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GreensboroDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('greensboro');
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
  title: 'Criminal Defense en Greensboro, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Greensboro, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa criminal Greensboro, abogado Greensboro, defensa criminal NC, abogado español Greensboro, servicios legales Greensboro',
  openGraph: {
    title: 'Criminal Defense en Greensboro, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Greensboro, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/greensboro-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Greensboro, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/greensboro-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-defensa-criminal',
    },
  },
};
