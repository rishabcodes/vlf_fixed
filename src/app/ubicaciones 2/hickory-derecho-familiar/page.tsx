import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Family Law en Hickory, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'derecho familiar Hickory, abogado Hickory, derecho familiar NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Family Law en Hickory, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/hickory-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Hickory, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-derecho-familiar',
    },
  },
};
