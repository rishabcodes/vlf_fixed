import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
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
  title: 'Defensa Criminal en Winter Park, FL | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'defensa criminal Winter Park, abogado Winter Park, defensa criminal FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Defensa Criminal en Winter Park, FL | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winter-park-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Winter Park, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-defensa-criminal'
      
    }
  }
};