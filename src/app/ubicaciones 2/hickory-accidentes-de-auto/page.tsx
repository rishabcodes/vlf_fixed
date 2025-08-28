import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Accidentes de Auto en Hickory, NC | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'accidentes de auto Hickory, abogado Hickory, accidentes de auto NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Accidentes de Auto en Hickory, NC | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/hickory-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Hickory, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-accidentes-de-auto',
    },
  },
};
