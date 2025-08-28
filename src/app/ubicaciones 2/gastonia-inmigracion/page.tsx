import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GastoniaInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('gastonia');
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
  title: 'Ley de Immigration en Gastonia, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Gastonia, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración Gastonia, abogado Gastonia, ley de inmigración NC, abogado español Gastonia, servicios legales Gastonia',
  openGraph: {
    title: 'Ley de Immigration en Gastonia, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Gastonia, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/gastonia-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Gastonia, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/gastonia-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-inmigracion',
    },
  },
};
