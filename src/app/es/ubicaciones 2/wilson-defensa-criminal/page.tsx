import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilsonDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('wilson');
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
  title: 'Defensa Criminal en Wilson, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa criminal Wilson, abogado Wilson, defensa criminal NC, abogado español Wilson, servicios legales Wilson',
  openGraph: {
    title: 'Defensa Criminal en Wilson, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilson-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Wilson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilson-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-defensa-criminal'
      
    }
  }
};