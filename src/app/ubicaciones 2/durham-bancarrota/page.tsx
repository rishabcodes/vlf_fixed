import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('durham');
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
  title: 'Bancarrota en Durham, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Durham, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'bancarrota Durham, abogado Durham, bancarrota NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Bancarrota en Durham, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Durham, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/durham-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Durham, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-bancarrota',
    },
  },
};
