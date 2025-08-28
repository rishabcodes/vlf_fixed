import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
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
  title: 'Family Law en Sanford, FL | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Sanford, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'derecho familiar Sanford, abogado Sanford, derecho familiar FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Family Law en Sanford, FL | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Sanford, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/sanford-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Sanford, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-derecho-familiar',
    },
  },
};
