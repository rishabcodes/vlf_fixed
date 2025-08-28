import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
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
  title: 'Criminal Defense en Sanford, FL | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Sanford, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'defensa criminal Sanford, abogado Sanford, defensa criminal FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Criminal Defense en Sanford, FL | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Sanford, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/sanford-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Sanford, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-defensa-criminal',
    },
  },
};
