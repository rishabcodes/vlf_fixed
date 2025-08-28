import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailDuiPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
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
  title: 'Defensa DUI en Indian Trail, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa dui Indian Trail, abogado Indian Trail, defensa dui NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Defensa DUI en Indian Trail, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/indian-trail-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Indian Trail, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-dui',
    },
  },
};
