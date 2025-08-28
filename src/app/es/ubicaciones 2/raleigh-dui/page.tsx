import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RaleighDuiPage() {
  const cityData = getLocationServiceCityBySlug('raleigh');
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
  title: 'Defensa DUI en Raleigh, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Raleigh, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa dui Raleigh, abogado Raleigh, defensa dui NC, abogado español Raleigh, servicios legales Raleigh',
  openGraph: {
    title: 'Defensa DUI en Raleigh, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Raleigh, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/raleigh-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Raleigh, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-dui'
      
    }
  }
};