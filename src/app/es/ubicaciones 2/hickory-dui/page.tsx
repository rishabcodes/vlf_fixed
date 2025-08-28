import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryDuiPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Defensa DUI en Hickory, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Hickory, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Hickory, abogado Hickory, defensa dui NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Defensa DUI en Hickory, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Hickory, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/hickory-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Hickory, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-dui'
      
    }
  }
};