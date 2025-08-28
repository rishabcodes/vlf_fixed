import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
  const serviceData = getLocationServiceByKey('derecho-familiar');

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
  title: 'Family Law en Indian Trail, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'derecho familiar Indian Trail, abogado Indian Trail, derecho familiar NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Family Law en Indian Trail, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/indian-trail-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Indian Trail, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-derecho-familiar',
    },
  },
};
