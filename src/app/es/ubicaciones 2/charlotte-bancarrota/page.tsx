import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CharlotteBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('charlotte');
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
  title: 'Bancarrota en Charlotte, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'bancarrota Charlotte, abogado Charlotte, bancarrota NC, abogado español Charlotte, servicios legales Charlotte',
  openGraph: {
    title: 'Bancarrota en Charlotte, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-bancarrota'
      
    }
  }
};