import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GreensboroBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('greensboro');
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
  title: 'Bancarrota en Greensboro, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'bancarrota Greensboro, abogado Greensboro, bancarrota NC, abogado español Greensboro, servicios legales Greensboro',
  openGraph: {
    title: 'Bancarrota en Greensboro, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/greensboro-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Greensboro, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/greensboro-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-bancarrota'
      
    }
  }
};