import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CorneliusDuiPage() {
  const cityData = getLocationServiceCityBySlug('cornelius');
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
  title: 'Defensa DUI en Cornelius, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Cornelius, abogado Cornelius, defensa dui NC, abogado español Cornelius, servicios legales Cornelius',
  openGraph: {
    title: 'Defensa DUI en Cornelius, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/cornelius-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Cornelius, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cornelius-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-dui'
      
    }
  }
};