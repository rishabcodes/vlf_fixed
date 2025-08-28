import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Bancarrota en Hickory, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'bancarrota Hickory, abogado Hickory, bancarrota NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Bancarrota en Hickory, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/hickory-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Hickory, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-bancarrota',
    },
  },
};
