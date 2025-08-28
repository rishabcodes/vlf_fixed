import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KissimmeeLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('kissimmee');
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
  title: 'Lesiones Personales en Kissimmee, FL | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Kissimmee, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'lesiones personales Kissimmee, abogado Kissimmee, lesiones personales FL, abogado español Kissimmee, servicios legales Kissimmee',
  openGraph: {
    title: 'Lesiones Personales en Kissimmee, FL | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Kissimmee, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kissimmee-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Kissimmee, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kissimmee-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-lesiones-personales'
      
    }
  }
};