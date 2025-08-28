import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RaleighBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('raleigh');
  const serviceData = getLocationServiceByKey('bancarrota');
  
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
  title: 'Bancarrota en Raleigh, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Raleigh, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'bancarrota Raleigh, abogado Raleigh, bancarrota NC, abogado español Raleigh, servicios legales Raleigh',
  openGraph: {
    title: 'Bancarrota en Raleigh, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Raleigh, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/raleigh-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Raleigh, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-bancarrota'
      
    }
  }
};