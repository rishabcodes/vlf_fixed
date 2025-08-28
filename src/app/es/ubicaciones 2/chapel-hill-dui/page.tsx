import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ChapelHillDuiPage() {
  const cityData = getLocationServiceCityBySlug('chapel-hill');
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
  title: 'Defensa DUI en Chapel Hill, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Chapel Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa dui Chapel Hill, abogado Chapel Hill, defensa dui NC, abogado español Chapel Hill, servicios legales Chapel Hill',
  openGraph: {
    title: 'Defensa DUI en Chapel Hill, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Chapel Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/chapel-hill-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Chapel Hill, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/chapel-hill-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-dui'
      
    }
  }
};