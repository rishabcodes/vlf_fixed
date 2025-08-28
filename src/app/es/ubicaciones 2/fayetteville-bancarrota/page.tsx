import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function FayettevilleBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('fayetteville');
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
  title: 'Bancarrota en Fayetteville, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Fayetteville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'bancarrota Fayetteville, abogado Fayetteville, bancarrota NC, abogado español Fayetteville, servicios legales Fayetteville',
  openGraph: {
    title: 'Bancarrota en Fayetteville, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Fayetteville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/fayetteville-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Fayetteville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/fayetteville-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-bancarrota'
      
    }
  }
};