import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
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
  title: 'Derecho Familiar en Orlando, FL | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Orlando, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'derecho familiar Orlando, abogado Orlando, derecho familiar FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Derecho Familiar en Orlando, FL | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Orlando, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/orlando-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Orlando, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-derecho-familiar'
      
    }
  }
};