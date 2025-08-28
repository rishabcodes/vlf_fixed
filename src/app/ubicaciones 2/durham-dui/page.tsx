import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamDuiPage() {
  const cityData = getLocationServiceCityBySlug('durham');
  const serviceData = getLocationServiceByKey('dui');

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
  title: 'Defensa DUI en Durham, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Durham, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa dui Durham, abogado Durham, defensa dui NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Defensa DUI en Durham, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Durham, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/durham-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Durham, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-dui',
    },
  },
};
