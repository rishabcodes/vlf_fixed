import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DavidsonBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('davidson');
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
  title: 'Bancarrota en Davidson, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Davidson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'bancarrota Davidson, abogado Davidson, bancarrota NC, abogado español Davidson, servicios legales Davidson',
  openGraph: {
    title: 'Bancarrota en Davidson, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Davidson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/davidson-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Davidson, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/davidson-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-bancarrota',
    },
  },
};
