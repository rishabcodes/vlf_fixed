import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function BurlingtonDuiPage() {
  const cityData = getLocationServiceCityBySlug('burlington');
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
  title: 'Defensa DUI en Burlington, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Burlington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa dui Burlington, abogado Burlington, defensa dui NC, abogado español Burlington, servicios legales Burlington',
  openGraph: {
    title: 'Defensa DUI en Burlington, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Burlington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/burlington-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Burlington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/burlington-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-dui'
      
    }
  }
};