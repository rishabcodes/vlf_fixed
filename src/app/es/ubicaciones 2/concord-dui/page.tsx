import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ConcordDuiPage() {
  const cityData = getLocationServiceCityBySlug('concord');
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
  title: 'Defensa DUI en Concord, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Concord, abogado Concord, defensa dui NC, abogado español Concord, servicios legales Concord',
  openGraph: {
    title: 'Defensa DUI en Concord, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/concord-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Concord, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/concord-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/concord-dui'
      
    }
  }
};