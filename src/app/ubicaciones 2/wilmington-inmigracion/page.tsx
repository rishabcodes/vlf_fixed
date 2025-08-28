import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilmingtonInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('wilmington');
  const serviceData = getLocationServiceByKey('inmigracion');

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
  title: 'Ley de Immigration en Wilmington, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Wilmington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'ley de inmigración Wilmington, abogado Wilmington, ley de inmigración NC, abogado español Wilmington, servicios legales Wilmington',
  openGraph: {
    title: 'Ley de Immigration en Wilmington, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Wilmington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/wilmington-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Wilmington, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilmington-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-inmigracion',
    },
  },
};
