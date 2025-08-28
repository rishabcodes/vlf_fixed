import ConsultaGratisClient from './ConsultaGratisClient';

export default function ConsultaGratisPage() {
  return <ConsultaGratisClient />;
}

export const metadata = {
  title: 'Consulta Gratis | Abogados que Hablan Español | Vasquez Law Firm',
  description:
    'Obtenga una consulta legal GRATIS con abogados que hablan español. Sin costo, sin obligación. Inmigración, lesiones personales, defensa criminal. Llame 1-844-YO-PELEO.',
  keywords:
    'consulta gratis abogado, abogado español gratis, consulta legal gratuita, abogado hispano, consulta sin costo',
  openGraph: {
    title: 'Consulta Legal GRATIS en Español | Vasquez Law Firm',
    description:
      'Hable con un abogado experimentado sin costo. Inmigración, accidentes, defensa criminal. 100% en español.',
    url: 'https://www.vasquezlawnc.com/es/consulta-gratis',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/consulta-gratis-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Consulta Legal Gratis en Español',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/consulta-gratis',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/free-consultation',
      'es-ES': 'https://www.vasquezlawnc.com/es/consulta-gratis',
    },
  },
};
