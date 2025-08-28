import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MonroeBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('monroe');
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
  title: 'Bancarrota en Monroe, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Monroe, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'bancarrota Monroe, abogado Monroe, bancarrota NC, abogado español Monroe, servicios legales Monroe',
  openGraph: {
    title: 'Bancarrota en Monroe, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Monroe, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/monroe-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Monroe, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/monroe-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-bancarrota'
      
    }
  }
};