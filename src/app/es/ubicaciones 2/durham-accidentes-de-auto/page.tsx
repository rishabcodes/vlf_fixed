import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('durham');
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
  title: 'Accidentes de Auto en Durham, NC | Vasquez Law Firm',
  description: 'Servicios legales de accidentes de auto en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'accidentes de auto Durham, abogado Durham, accidentes de auto NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Accidentes de Auto en Durham, NC | Vasquez Law Firm',
    description: 'Servicios legales de accidentes de auto en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-accidentes-de-auto',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/durham-accidentes-de-auto-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Accidentes de Auto en Durham, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-accidentes-de-auto'
      
    }
  }
};