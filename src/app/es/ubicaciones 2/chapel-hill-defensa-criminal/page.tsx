import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ChapelHillDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('chapel-hill');
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
  title: 'Defensa Criminal en Chapel Hill, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Chapel Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa criminal Chapel Hill, abogado Chapel Hill, defensa criminal NC, abogado español Chapel Hill, servicios legales Chapel Hill',
  openGraph: {
    title: 'Defensa Criminal en Chapel Hill, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Chapel Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/chapel-hill-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Chapel Hill, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/chapel-hill-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-defensa-criminal'
      
    }
  }
};