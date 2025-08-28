import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilsonBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('wilson');
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
  title: 'Bancarrota en Wilson, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Wilson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'bancarrota Wilson, abogado Wilson, bancarrota NC, abogado español Wilson, servicios legales Wilson',
  openGraph: {
    title: 'Bancarrota en Wilson, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Wilson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/wilson-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Wilson, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilson-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-bancarrota',
    },
  },
};
