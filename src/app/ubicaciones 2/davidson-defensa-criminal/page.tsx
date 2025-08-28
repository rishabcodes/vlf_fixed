import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DavidsonDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('davidson');
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
  title: 'Criminal Defense en Davidson, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Davidson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa criminal Davidson, abogado Davidson, defensa criminal NC, abogado español Davidson, servicios legales Davidson',
  openGraph: {
    title: 'Criminal Defense en Davidson, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Davidson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/davidson-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Davidson, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/davidson-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-defensa-criminal',
    },
  },
};
