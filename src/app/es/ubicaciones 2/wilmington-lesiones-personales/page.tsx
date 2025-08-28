import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilmingtonLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('wilmington');
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
  title: 'Lesiones Personales en Wilmington, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'lesiones personales Wilmington, abogado Wilmington, lesiones personales NC, abogado español Wilmington, servicios legales Wilmington',
  openGraph: {
    title: 'Lesiones Personales en Wilmington, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilmington-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Wilmington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilmington-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-lesiones-personales'
      
    }
  }
};