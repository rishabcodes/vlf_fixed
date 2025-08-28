import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HighPointBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('high-point');
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
  title: 'Bancarrota en High Point, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'bancarrota High Point, abogado High Point, bancarrota NC, abogado español High Point, servicios legales High Point',
  openGraph: {
    title: 'Bancarrota en High Point, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/high-point-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en High Point, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/high-point-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-bancarrota',
    },
  },
};
