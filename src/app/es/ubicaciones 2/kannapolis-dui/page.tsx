import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KannapolisDuiPage() {
  const cityData = getLocationServiceCityBySlug('kannapolis');
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
  title: 'Defensa DUI en Kannapolis, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Kannapolis, abogado Kannapolis, defensa dui NC, abogado español Kannapolis, servicios legales Kannapolis',
  openGraph: {
    title: 'Defensa DUI en Kannapolis, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kannapolis-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Kannapolis, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kannapolis-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-dui'
      
    }
  }
};