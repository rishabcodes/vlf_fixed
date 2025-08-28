import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
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
  title: 'Family Law en Matthews, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'derecho familiar Matthews, abogado Matthews, derecho familiar NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Family Law en Matthews, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/matthews-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Matthews, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-derecho-familiar',
    },
  },
};
