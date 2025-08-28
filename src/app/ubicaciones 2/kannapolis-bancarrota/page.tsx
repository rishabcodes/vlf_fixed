import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KannapolisBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('kannapolis');
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
  title: 'Bancarrota en Kannapolis, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Kannapolis, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'bancarrota Kannapolis, abogado Kannapolis, bancarrota NC, abogado español Kannapolis, servicios legales Kannapolis',
  openGraph: {
    title: 'Bancarrota en Kannapolis, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Kannapolis, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/kannapolis-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Kannapolis, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kannapolis-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-bancarrota',
    },
  },
};
