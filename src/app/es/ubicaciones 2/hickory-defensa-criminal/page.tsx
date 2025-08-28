import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Defensa Criminal en Hickory, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Hickory, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa criminal Hickory, abogado Hickory, defensa criminal NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Defensa Criminal en Hickory, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Hickory, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/hickory-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Hickory, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-defensa-criminal'
      
    }
  }
};