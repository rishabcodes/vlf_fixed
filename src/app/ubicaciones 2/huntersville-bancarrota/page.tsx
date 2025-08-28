import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HuntersvilleBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('huntersville');
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
  title: 'Bancarrota en Huntersville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'bancarrota Huntersville, abogado Huntersville, bancarrota NC, abogado español Huntersville, servicios legales Huntersville',
  openGraph: {
    title: 'Bancarrota en Huntersville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/huntersville-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Huntersville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/huntersville-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-bancarrota',
    },
  },
};
