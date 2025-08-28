import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GreensboroDuiPage() {
  const cityData = getLocationServiceCityBySlug('greensboro');
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
  title: 'Defensa DUI en Greensboro, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa dui Greensboro, abogado Greensboro, defensa dui NC, abogado español Greensboro, servicios legales Greensboro',
  openGraph: {
    title: 'Defensa DUI en Greensboro, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/greensboro-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Greensboro, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/greensboro-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-dui'
      
    }
  }
};