import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HuntersvilleLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('huntersville');
  const serviceData = getLocationServiceByKey('lesiones-personales');

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
  title: 'Personal Injury en Huntersville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales Huntersville, abogado Huntersville, lesiones personales NC, abogado español Huntersville, servicios legales Huntersville',
  openGraph: {
    title: 'Personal Injury en Huntersville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/huntersville-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Huntersville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/huntersville-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-lesiones-personales',
    },
  },
};
