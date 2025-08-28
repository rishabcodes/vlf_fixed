import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
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
  title: 'Lesiones Personales en Oviedo, FL | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Oviedo, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'lesiones personales Oviedo, abogado Oviedo, lesiones personales FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Lesiones Personales en Oviedo, FL | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Oviedo, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/oviedo-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Oviedo, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-lesiones-personales'
      
    }
  }
};