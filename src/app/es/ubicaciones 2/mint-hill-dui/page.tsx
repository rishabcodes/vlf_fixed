import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MintHillDuiPage() {
  const cityData = getLocationServiceCityBySlug('mint-hill');
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
  title: 'Defensa DUI en Mint Hill, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Mint Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Mint Hill, abogado Mint Hill, defensa dui NC, abogado español Mint Hill, servicios legales Mint Hill',
  openGraph: {
    title: 'Defensa DUI en Mint Hill, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Mint Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/mint-hill-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Mint Hill, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mint-hill-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mint-hill-dui'
      
    }
  }
};