import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
  const serviceData = getLocationServiceByKey('accidentes-de-auto');

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
  title: 'Accidentes de Auto en Mint Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'accidentes de auto Mint Hill, abogado Mint Hill, accidentes de auto NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Accidentes de Auto en Mint Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Mint Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mint-hill-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Mint Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-accidentes-de-auto',
    },
  },
};
