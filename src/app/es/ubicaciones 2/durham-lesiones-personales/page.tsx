import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('durham');
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
  title: 'Lesiones Personales en Durham, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'lesiones personales Durham, abogado Durham, lesiones personales NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Lesiones Personales en Durham, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/durham-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Durham, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-lesiones-personales'
      
    }
  }
};