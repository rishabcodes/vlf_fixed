import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function PinevilleBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('pineville');
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
  title: 'Bancarrota en Pineville, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Pineville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'bancarrota Pineville, abogado Pineville, bancarrota NC, abogado español Pineville, servicios legales Pineville',
  openGraph: {
    title: 'Bancarrota en Pineville, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Pineville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/pineville-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Pineville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/pineville-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-bancarrota'
      
    }
  }
};