import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
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
  title: 'Bancarrota en Indian Trail, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Indian Trail, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'bancarrota Indian Trail, abogado Indian Trail, bancarrota NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Bancarrota en Indian Trail, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Indian Trail, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/indian-trail-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Indian Trail, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-bancarrota'
      
    }
  }
};