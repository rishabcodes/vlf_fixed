import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MooresvilleDuiPage() {
  const cityData = getLocationServiceCityBySlug('mooresville');
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
  title: 'Defensa DUI en Mooresville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Mooresville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa dui Mooresville, abogado Mooresville, defensa dui NC, abogado español Mooresville, servicios legales Mooresville',
  openGraph: {
    title: 'Defensa DUI en Mooresville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Mooresville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mooresville-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Mooresville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mooresville-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-dui',
    },
  },
};
