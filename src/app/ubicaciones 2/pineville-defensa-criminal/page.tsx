import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function PinevilleDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('pineville');
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
  title: 'Criminal Defense en Pineville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Pineville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal Pineville, abogado Pineville, defensa criminal NC, abogado español Pineville, servicios legales Pineville',
  openGraph: {
    title: 'Criminal Defense en Pineville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Pineville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/pineville-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Pineville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/pineville-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-defensa-criminal',
    },
  },
};
