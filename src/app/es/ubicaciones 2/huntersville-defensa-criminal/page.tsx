import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HuntersvilleDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('huntersville');
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
  title: 'Defensa Criminal en Huntersville, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Huntersville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa criminal Huntersville, abogado Huntersville, defensa criminal NC, abogado español Huntersville, servicios legales Huntersville',
  openGraph: {
    title: 'Defensa Criminal en Huntersville, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Huntersville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/huntersville-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Huntersville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/huntersville-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-defensa-criminal'
      
    }
  }
};