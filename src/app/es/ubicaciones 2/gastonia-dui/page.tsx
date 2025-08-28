import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GastoniaDuiPage() {
  const cityData = getLocationServiceCityBySlug('gastonia');
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
  title: 'Defensa DUI en Gastonia, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Gastonia, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Gastonia, abogado Gastonia, defensa dui NC, abogado español Gastonia, servicios legales Gastonia',
  openGraph: {
    title: 'Defensa DUI en Gastonia, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Gastonia, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/gastonia-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Gastonia, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/gastonia-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-dui'
      
    }
  }
};