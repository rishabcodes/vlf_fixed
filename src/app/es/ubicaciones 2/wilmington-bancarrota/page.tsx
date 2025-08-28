import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilmingtonBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('wilmington');
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
  title: 'Bancarrota en Wilmington, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'bancarrota Wilmington, abogado Wilmington, bancarrota NC, abogado español Wilmington, servicios legales Wilmington',
  openGraph: {
    title: 'Bancarrota en Wilmington, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilmington-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Wilmington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilmington-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-bancarrota'
      
    }
  }
};