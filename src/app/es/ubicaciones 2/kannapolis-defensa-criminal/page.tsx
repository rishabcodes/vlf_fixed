import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KannapolisDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('kannapolis');
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
  title: 'Defensa Criminal en Kannapolis, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa criminal Kannapolis, abogado Kannapolis, defensa criminal NC, abogado español Kannapolis, servicios legales Kannapolis',
  openGraph: {
    title: 'Defensa Criminal en Kannapolis, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kannapolis-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Kannapolis, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kannapolis-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-defensa-criminal'
      
    }
  }
};