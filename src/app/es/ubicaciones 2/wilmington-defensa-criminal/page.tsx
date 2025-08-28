import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilmingtonDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('wilmington');
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
  title: 'Defensa Criminal en Wilmington, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa criminal Wilmington, abogado Wilmington, defensa criminal NC, abogado español Wilmington, servicios legales Wilmington',
  openGraph: {
    title: 'Defensa Criminal en Wilmington, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilmington-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Wilmington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilmington-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-defensa-criminal'
      
    }
  }
};