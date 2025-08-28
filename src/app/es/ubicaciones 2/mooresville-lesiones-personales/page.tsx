import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MooresvilleLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('mooresville');
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
  title: 'Lesiones Personales en Mooresville, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Mooresville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'lesiones personales Mooresville, abogado Mooresville, lesiones personales NC, abogado español Mooresville, servicios legales Mooresville',
  openGraph: {
    title: 'Lesiones Personales en Mooresville, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Mooresville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/mooresville-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Mooresville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mooresville-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-lesiones-personales'
      
    }
  }
};