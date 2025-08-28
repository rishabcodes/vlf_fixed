import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CharlotteDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('charlotte');
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
  title: 'Defensa Criminal en Charlotte, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa criminal Charlotte, abogado Charlotte, defensa criminal NC, abogado español Charlotte, servicios legales Charlotte',
  openGraph: {
    title: 'Defensa Criminal en Charlotte, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-defensa-criminal'
      
    }
  }
};