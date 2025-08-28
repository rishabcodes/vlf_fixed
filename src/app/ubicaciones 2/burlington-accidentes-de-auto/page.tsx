import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function BurlingtonAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('burlington');
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
  title: 'Accidentes de Auto en Burlington, NC | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Burlington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'accidentes de auto Burlington, abogado Burlington, accidentes de auto NC, abogado español Burlington, servicios legales Burlington',
  openGraph: {
    title: 'Accidentes de Auto en Burlington, NC | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Burlington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/burlington-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Burlington, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/burlington-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-accidentes-de-auto',
    },
  },
};
