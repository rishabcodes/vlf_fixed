import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
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
  title: 'Defensa Criminal en Mint Hill, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa criminal en Mint Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa criminal Mint Hill, abogado Mint Hill, defensa criminal NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Defensa Criminal en Mint Hill, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa criminal en Mint Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-defensa-criminal',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/mint-hill-defensa-criminal-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa Criminal en Mint Hill, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-defensa-criminal'
      
    }
  }
};