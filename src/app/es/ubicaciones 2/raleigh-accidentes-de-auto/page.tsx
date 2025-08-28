import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RaleighAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('raleigh');
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
  title: 'Accidentes de Auto en Raleigh, NC | Vasquez Law Firm',
  description: 'Servicios legales de accidentes de auto en Raleigh, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'accidentes de auto Raleigh, abogado Raleigh, accidentes de auto NC, abogado español Raleigh, servicios legales Raleigh',
  openGraph: {
    title: 'Accidentes de Auto en Raleigh, NC | Vasquez Law Firm',
    description: 'Servicios legales de accidentes de auto en Raleigh, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-accidentes-de-auto',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/raleigh-accidentes-de-auto-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Accidentes de Auto en Raleigh, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-accidentes-de-auto'
      
    }
  }
};