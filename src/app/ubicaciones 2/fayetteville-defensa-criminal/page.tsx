import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function FayettevilleDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('fayetteville');
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
  title: 'Criminal Defense en Fayetteville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Fayetteville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa criminal Fayetteville, abogado Fayetteville, defensa criminal NC, abogado español Fayetteville, servicios legales Fayetteville',
  openGraph: {
    title: 'Criminal Defense en Fayetteville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Fayetteville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/fayetteville-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Fayetteville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/fayetteville-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-defensa-criminal',
    },
  },
};
