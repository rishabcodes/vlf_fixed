import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilmingtonDuiPage() {
  const cityData = getLocationServiceCityBySlug('wilmington');
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
  title: 'Defensa DUI en Wilmington, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Wilmington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa dui Wilmington, abogado Wilmington, defensa dui NC, abogado español Wilmington, servicios legales Wilmington',
  openGraph: {
    title: 'Defensa DUI en Wilmington, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Wilmington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/wilmington-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Wilmington, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilmington-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-dui',
    },
  },
};
