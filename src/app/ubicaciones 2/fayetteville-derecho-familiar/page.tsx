import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function FayettevilleDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('fayetteville');
  const serviceData = getLocationServiceByKey('derecho-familiar');

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
  title: 'Family Law en Fayetteville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de derecho familiar en Fayetteville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'derecho familiar Fayetteville, abogado Fayetteville, derecho familiar NC, abogado español Fayetteville, servicios legales Fayetteville',
  openGraph: {
    title: 'Family Law en Fayetteville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de derecho familiar en Fayetteville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-derecho-familiar',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/fayetteville-derecho-familiar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Law en Fayetteville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/fayetteville-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-derecho-familiar',
    },
  },
};
