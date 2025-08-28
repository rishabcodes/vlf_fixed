import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
  const serviceData = getLocationServiceByKey('abogado-espanol');

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
  title: 'Attorney que Habla Español en Mint Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'abogado que habla español Mint Hill, abogado Mint Hill, abogado que habla español NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Attorney que Habla Español en Mint Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mint-hill-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Mint Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-abogado-espanol',
    },
  },
};
