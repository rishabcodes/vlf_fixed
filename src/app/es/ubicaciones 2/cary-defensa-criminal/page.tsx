import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CaryDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('cary');
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
  title: 'Defensa Criminal en Cary, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Cary, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa criminal Cary, abogado Cary, defensa criminal NC, abogado español Cary, servicios legales Cary',
  openGraph: {
    title: 'Defensa Criminal en Cary, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Cary, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/cary-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Cary, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cary-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cary-defensa-criminal'
      
    }
  }
};