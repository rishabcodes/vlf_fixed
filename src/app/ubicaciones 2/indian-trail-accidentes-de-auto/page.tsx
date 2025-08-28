import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
  const serviceData = getLocationServiceByKey('accidentes-de-auto');

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
  title: 'Accidentes de Auto en Indian Trail, NC | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'accidentes de auto Indian Trail, abogado Indian Trail, accidentes de auto NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Accidentes de Auto en Indian Trail, NC | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/indian-trail-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Indian Trail, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-accidentes-de-auto',
    },
  },
};
