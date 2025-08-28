import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CharlotteDuiPage() {
  const cityData = getLocationServiceCityBySlug('charlotte');
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
  title: 'Defensa DUI en Charlotte, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Charlotte, abogado Charlotte, defensa dui NC, abogado español Charlotte, servicios legales Charlotte',
  openGraph: {
    title: 'Defensa DUI en Charlotte, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-dui'
      
    }
  }
};