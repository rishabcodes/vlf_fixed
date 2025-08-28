import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function PinevilleDuiPage() {
  const cityData = getLocationServiceCityBySlug('pineville');
  const serviceData = getLocationServiceByKey('dui');
  
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
  title: 'Defensa DUI en Pineville, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Pineville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Pineville, abogado Pineville, defensa dui NC, abogado español Pineville, servicios legales Pineville',
  openGraph: {
    title: 'Defensa DUI en Pineville, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Pineville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/pineville-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Pineville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/pineville-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-dui'
      
    }
  }
};