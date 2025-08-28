import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
  const serviceData = getLocationServiceByKey('inmigracion');
  
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
  title: 'Ley de Inmigración en Mint Hill, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Mint Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'ley de inmigración Mint Hill, abogado Mint Hill, ley de inmigración NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Ley de Inmigración en Mint Hill, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Mint Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/mint-hill-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Mint Hill, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-inmigracion'
      
    }
  }
};