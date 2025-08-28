import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function BurlingtonBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('burlington');
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
  title: 'Bancarrota en Burlington, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Burlington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'bancarrota Burlington, abogado Burlington, bancarrota NC, abogado español Burlington, servicios legales Burlington',
  openGraph: {
    title: 'Bancarrota en Burlington, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Burlington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/burlington-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Burlington, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/burlington-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-bancarrota',
    },
  },
};
