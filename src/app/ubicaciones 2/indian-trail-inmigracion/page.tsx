import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
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
  title: 'Ley de Immigration en Indian Trail, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración Indian Trail, abogado Indian Trail, ley de inmigración NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Ley de Immigration en Indian Trail, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/indian-trail-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Indian Trail, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-inmigracion',
    },
  },
};
