import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
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
  title: 'Defensa Criminal en Matthews, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Matthews, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa criminal Matthews, abogado Matthews, defensa criminal NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Defensa Criminal en Matthews, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Matthews, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/matthews-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Matthews, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-defensa-criminal'
      
    }
  }
};