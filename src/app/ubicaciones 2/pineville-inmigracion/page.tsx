import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function PinevilleInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('pineville');
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
  title: 'Ley de Immigration en Pineville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Pineville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración Pineville, abogado Pineville, ley de inmigración NC, abogado español Pineville, servicios legales Pineville',
  openGraph: {
    title: 'Ley de Immigration en Pineville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Pineville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/pineville-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Pineville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/pineville-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-inmigracion',
    },
  },
};
