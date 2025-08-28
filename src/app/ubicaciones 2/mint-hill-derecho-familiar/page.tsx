import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
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
  title: 'Family Law en Mint Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'derecho familiar Mint Hill, abogado Mint Hill, derecho familiar NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Family Law en Mint Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mint-hill-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Mint Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-derecho-familiar',
    },
  },
};
