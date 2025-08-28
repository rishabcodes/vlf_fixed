import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KissimmeeDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('kissimmee');
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
  title: 'Defensa Criminal en Kissimmee, FL | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Kissimmee, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'defensa criminal Kissimmee, abogado Kissimmee, defensa criminal FL, abogado español Kissimmee, servicios legales Kissimmee',
  openGraph: {
    title: 'Defensa Criminal en Kissimmee, FL | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Kissimmee, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kissimmee-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Kissimmee, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kissimmee-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-defensa-criminal'
      
    }
  }
};