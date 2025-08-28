import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KissimmeeDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('kissimmee');
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
  title: 'Derecho Familiar en Kissimmee, FL | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Kissimmee, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'derecho familiar Kissimmee, abogado Kissimmee, derecho familiar FL, abogado español Kissimmee, servicios legales Kissimmee',
  openGraph: {
    title: 'Derecho Familiar en Kissimmee, FL | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Kissimmee, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kissimmee-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Kissimmee, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kissimmee-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-derecho-familiar'
      
    }
  }
};