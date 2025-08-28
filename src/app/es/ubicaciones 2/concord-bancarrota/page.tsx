import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ConcordBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('concord');
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
  title: 'Bancarrota en Concord, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'bancarrota Concord, abogado Concord, bancarrota NC, abogado español Concord, servicios legales Concord',
  openGraph: {
    title: 'Bancarrota en Concord, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/concord-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Concord, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/concord-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/concord-bancarrota'
      
    }
  }
};