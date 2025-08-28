import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilsonDuiPage() {
  const cityData = getLocationServiceCityBySlug('wilson');
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
  title: 'Defensa DUI en Wilson, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa dui Wilson, abogado Wilson, defensa dui NC, abogado español Wilson, servicios legales Wilson',
  openGraph: {
    title: 'Defensa DUI en Wilson, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilson-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Wilson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilson-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-dui'
      
    }
  }
};