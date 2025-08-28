import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
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
  title: 'Defensa Criminal en Indian Trail, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Indian Trail, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa criminal Indian Trail, abogado Indian Trail, defensa criminal NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Defensa Criminal en Indian Trail, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Indian Trail, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/indian-trail-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Indian Trail, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-defensa-criminal'
      
    }
  }
};