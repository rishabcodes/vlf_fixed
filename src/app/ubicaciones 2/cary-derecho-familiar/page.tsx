import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CaryDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('cary');
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
  title: 'Family Law en Cary, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'derecho familiar Cary, abogado Cary, derecho familiar NC, abogado español Cary, servicios legales Cary',
  openGraph: {
    title: 'Family Law en Cary, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cary-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cary-derecho-familiar',
    },
  },
};
