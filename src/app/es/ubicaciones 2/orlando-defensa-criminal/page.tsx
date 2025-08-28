import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OrlandoDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('orlando');
  const serviceData = getLocationServiceByKey('defensa-criminal');
  
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
  title: 'Defensa Criminal en Orlando, FL | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Orlando, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'defensa criminal Orlando, abogado Orlando, defensa criminal FL, abogado español Orlando, servicios legales Orlando',
  openGraph: {
    title: 'Defensa Criminal en Orlando, FL | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Orlando, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/orlando-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Orlando, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/orlando-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/orlando-defensa-criminal'
      
    }
  }
};