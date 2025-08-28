import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
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
  title: 'Accidentes de Auto en Rocky Mount, NC | Vasquez Law Firm',
  description:
    'Servicios legales de accidentes de auto en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'accidentes de auto Rocky Mount, abogado Rocky Mount, accidentes de auto NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Accidentes de Auto en Rocky Mount, NC | Vasquez Law Firm',
    description:
      'Servicios legales de accidentes de auto en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-accidentes-de-auto',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/rocky-mount-accidentes-de-auto-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes de Auto en Rocky Mount, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-accidentes-de-auto',
    },
  },
};
