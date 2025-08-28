import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CaryDuiPage() {
  const cityData = getLocationServiceCityBySlug('cary');
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
  title: 'Defensa DUI en Cary, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa dui Cary, abogado Cary, defensa dui NC, abogado español Cary, servicios legales Cary',
  openGraph: {
    title: 'Defensa DUI en Cary, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cary-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cary-dui',
    },
  },
};
