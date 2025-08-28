import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ChapelHillAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('chapel-hill');
  const serviceData = getLocationServiceByKey('accidentes-de-auto');
  
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
  title: 'Accidentes de Auto en Chapel Hill, NC | Vasquez Law Firm',
  description: 'Servicios legales de accidentes de auto en Chapel Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'accidentes de auto Chapel Hill, abogado Chapel Hill, accidentes de auto NC, abogado español Chapel Hill, servicios legales Chapel Hill',
  openGraph: {
    title: 'Accidentes de Auto en Chapel Hill, NC | Vasquez Law Firm',
    description: 'Servicios legales de accidentes de auto en Chapel Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-accidentes-de-auto',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/chapel-hill-accidentes-de-auto-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Accidentes de Auto en Chapel Hill, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/chapel-hill-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-accidentes-de-auto'
      
    }
  }
};