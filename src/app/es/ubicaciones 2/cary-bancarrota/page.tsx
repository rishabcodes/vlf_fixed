import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CaryBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('cary');
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
  title: 'Bancarrota en Cary, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Cary, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'bancarrota Cary, abogado Cary, bancarrota NC, abogado español Cary, servicios legales Cary',
  openGraph: {
    title: 'Bancarrota en Cary, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Cary, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/cary-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Cary, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cary-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cary-bancarrota'
      
    }
  }
};