import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
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
  title: 'Ley de Immigration en Rocky Mount, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'ley de inmigración Rocky Mount, abogado Rocky Mount, ley de inmigración NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Ley de Immigration en Rocky Mount, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/rocky-mount-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Rocky Mount, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-inmigracion',
    },
  },
};
