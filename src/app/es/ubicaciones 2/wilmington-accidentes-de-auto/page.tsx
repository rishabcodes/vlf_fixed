import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilmingtonAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('wilmington');
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
  title: 'Accidentes de Auto en Wilmington, NC | Vasquez Law Firm',
  description: 'Servicios legales de accidentes de auto en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'accidentes de auto Wilmington, abogado Wilmington, accidentes de auto NC, abogado español Wilmington, servicios legales Wilmington',
  openGraph: {
    title: 'Accidentes de Auto en Wilmington, NC | Vasquez Law Firm',
    description: 'Servicios legales de accidentes de auto en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-accidentes-de-auto',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilmington-accidentes-de-auto-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Accidentes de Auto en Wilmington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilmington-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-accidentes-de-auto'
      
    }
  }
};