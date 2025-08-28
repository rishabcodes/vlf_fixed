import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DavidsonDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('davidson');
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
  title: 'Family Law en Davidson, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Davidson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'derecho familiar Davidson, abogado Davidson, derecho familiar NC, abogado español Davidson, servicios legales Davidson',
  openGraph: {
    title: 'Family Law en Davidson, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Davidson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/davidson-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Davidson, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/davidson-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-derecho-familiar',
    },
  },
};
