import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HighPointAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('high-point');
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
  title: 'Accidentes de Auto en High Point, NC | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'accidentes de auto High Point, abogado High Point, accidentes de auto NC, abogado español High Point, servicios legales High Point',
  openGraph: {
    title: 'Accidentes de Auto en High Point, NC | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/high-point-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en High Point, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/high-point-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-accidentes-de-auto',
    },
  },
};
