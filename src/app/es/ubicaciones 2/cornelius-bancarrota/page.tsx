import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CorneliusBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('cornelius');
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
  title: 'Bancarrota en Cornelius, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'bancarrota Cornelius, abogado Cornelius, bancarrota NC, abogado español Cornelius, servicios legales Cornelius',
  openGraph: {
    title: 'Bancarrota en Cornelius, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/cornelius-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Cornelius, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cornelius-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-bancarrota'
      
    }
  }
};