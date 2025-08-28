import EvaluacionIAClient from './EvaluacionIAClient';

export default function EvaluacionIAPage() {
  return <EvaluacionIAClient />;
}

export const metadata = {
  title: 'Evaluación de Caso con IA | Análisis Legal Gratuito | Vasquez Law Firm',
  description:
    'Evalúe la fortaleza de su caso legal con inteligencia artificial. Análisis instantáneo y gratuito basado en miles de casos exitosos. 100% confidencial.',
  keywords:
    'evaluacion caso IA, analisis legal gratis, evaluacion caso abogado, inteligencia artificial legal',
  openGraph: {
    title: 'Evaluación de Caso con IA - Análisis Legal Instantáneo',
    description:
      'Descubra la fortaleza de su caso legal en minutos con nuestra evaluación impulsada por IA.',
    url: 'https://www.vasquezlawnc.com/es/evaluacion-ia',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/ai-evaluation-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Evaluación de Caso con Inteligencia Artificial',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/evaluacion-ia',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/ai-case-evaluation',
      'es-ES': 'https://www.vasquezlawnc.com/es/evaluacion-ia',
    },
  },
};
