import ConsultaIAClient from './ConsultaIAClient';

export default function ConsultaIAPage() {
  return <ConsultaIAClient />;
}

export const metadata = {
  title: 'Consulta Legal con IA | Asistente Virtual 24/7 | Vasquez Law Firm',
  description:
    'Obtenga respuestas legales instantáneas con nuestro asistente de IA. Disponible 24/7 en español. Inmigración, accidentes, defensa criminal. Gratis y confidencial.',
  keywords:
    'consulta legal IA, abogado virtual, chatbot legal español, inteligencia artificial abogado, consulta gratis IA',
  openGraph: {
    title: 'Consulta Legal con IA - Respuestas Instantáneas 24/7',
    description:
      'Asistente legal virtual en español. Respuestas inmediatas sobre inmigración, accidentes y más.',
    url: 'https://www.vasquezlawnc.com/es/consulta-ia',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/ai-consultation-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Consulta Legal con Inteligencia Artificial',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/consulta-ia',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/ai-consultation',
      'es-ES': 'https://www.vasquezlawnc.com/es/consulta-ia',
    },
  },
};
