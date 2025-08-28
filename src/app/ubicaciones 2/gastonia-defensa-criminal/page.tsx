import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GastoniaDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('gastonia');
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
  title: 'Criminal Defense en Gastonia, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Gastonia, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal Gastonia, abogado Gastonia, defensa criminal NC, abogado español Gastonia, servicios legales Gastonia',
  openGraph: {
    title: 'Criminal Defense en Gastonia, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Gastonia, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/gastonia-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Gastonia, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/gastonia-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-defensa-criminal',
    },
  },
};
