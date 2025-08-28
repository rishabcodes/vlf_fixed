import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MonroeDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('monroe');
  const serviceData = getLocationServiceByKey('derecho-familiar');

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
  title: 'Family Law en Monroe, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'derecho familiar Monroe, abogado Monroe, derecho familiar NC, abogado español Monroe, servicios legales Monroe',
  openGraph: {
    title: 'Family Law en Monroe, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/monroe-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Monroe, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/monroe-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-derecho-familiar',
    },
  },
};
