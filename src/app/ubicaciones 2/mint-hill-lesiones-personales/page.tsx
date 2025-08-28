import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
  const serviceData = getLocationServiceByKey('lesiones-personales');

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
  title: 'Personal Injury en Mint Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales Mint Hill, abogado Mint Hill, lesiones personales NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Personal Injury en Mint Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mint-hill-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Mint Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-lesiones-personales',
    },
  },
};
