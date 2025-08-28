import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
  const serviceData = getLocationServiceByKey('bancarrota');

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
  title: 'Bancarrota en Mint Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'bancarrota Mint Hill, abogado Mint Hill, bancarrota NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Bancarrota en Mint Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mint-hill-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Mint Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-bancarrota',
    },
  },
};
