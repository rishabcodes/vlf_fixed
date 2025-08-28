import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MonroeInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('monroe');
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
  title: 'Ley de Immigration en Monroe, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración Monroe, abogado Monroe, ley de inmigración NC, abogado español Monroe, servicios legales Monroe',
  openGraph: {
    title: 'Ley de Immigration en Monroe, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/monroe-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Monroe, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/monroe-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-inmigracion',
    },
  },
};
