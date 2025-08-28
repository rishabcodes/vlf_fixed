import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GastoniaBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('gastonia');
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
  title: 'Bancarrota en Gastonia, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Gastonia, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'bancarrota Gastonia, abogado Gastonia, bancarrota NC, abogado español Gastonia, servicios legales Gastonia',
  openGraph: {
    title: 'Bancarrota en Gastonia, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Gastonia, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/gastonia-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Gastonia, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/gastonia-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-bancarrota',
    },
  },
};
