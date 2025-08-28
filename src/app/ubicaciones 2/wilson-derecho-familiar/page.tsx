import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilsonDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('wilson');
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
  title: 'Family Law en Wilson, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Wilson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'derecho familiar Wilson, abogado Wilson, derecho familiar NC, abogado español Wilson, servicios legales Wilson',
  openGraph: {
    title: 'Family Law en Wilson, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Wilson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/wilson-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Wilson, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilson-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-derecho-familiar',
    },
  },
};
