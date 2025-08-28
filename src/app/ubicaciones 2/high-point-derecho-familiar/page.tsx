import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HighPointDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('high-point');
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
  title: 'Family Law en High Point, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'derecho familiar High Point, abogado High Point, derecho familiar NC, abogado español High Point, servicios legales High Point',
  openGraph: {
    title: 'Family Law en High Point, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/high-point-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en High Point, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/high-point-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-derecho-familiar',
    },
  },
};
