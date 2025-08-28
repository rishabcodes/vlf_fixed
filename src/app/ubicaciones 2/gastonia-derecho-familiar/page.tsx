import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GastoniaDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('gastonia');
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
  title: 'Family Law en Gastonia, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Gastonia, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'derecho familiar Gastonia, abogado Gastonia, derecho familiar NC, abogado español Gastonia, servicios legales Gastonia',
  openGraph: {
    title: 'Family Law en Gastonia, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Gastonia, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/gastonia-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Gastonia, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/gastonia-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-derecho-familiar',
    },
  },
};
