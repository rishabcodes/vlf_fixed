import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HuntersvilleInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('huntersville');
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
  title: 'Ley de Immigration en Huntersville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración Huntersville, abogado Huntersville, ley de inmigración NC, abogado español Huntersville, servicios legales Huntersville',
  openGraph: {
    title: 'Ley de Immigration en Huntersville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/huntersville-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Huntersville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/huntersville-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-inmigracion',
    },
  },
};
