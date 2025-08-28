import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ChapelHillBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('chapel-hill');
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
  title: 'Bancarrota en Chapel Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Chapel Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'bancarrota Chapel Hill, abogado Chapel Hill, bancarrota NC, abogado español Chapel Hill, servicios legales Chapel Hill',
  openGraph: {
    title: 'Bancarrota en Chapel Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Chapel Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/chapel-hill-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Chapel Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/chapel-hill-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-bancarrota',
    },
  },
};
