import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function BurlingtonDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('burlington');
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
  title: 'Defensa Criminal en Burlington, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Burlington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa criminal Burlington, abogado Burlington, defensa criminal NC, abogado español Burlington, servicios legales Burlington',
  openGraph: {
    title: 'Defensa Criminal en Burlington, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Burlington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/burlington-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Burlington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/burlington-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-defensa-criminal'
      
    }
  }
};