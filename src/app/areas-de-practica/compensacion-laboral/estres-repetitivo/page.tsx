import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title:
    'Lesiones por Estrés Repetitivo y Túnel Carpiano NC | Workers Compensation | YO PELEO POR TI™',
  description:
    'Compensación por lesiones de estrés repetitivo en Carolina del Norte. Túnel carpiano, tendinitis, lesiones de espalda por trabajo repetitivo. Beneficios completos.',
  keywords:
    'túnel carpiano compensación NC, estrés repetitivo trabajo, RSI workers comp, tendinitis laboral, lesiones movimientos repetitivos Carolina del Norte',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/compensacion-laboral/estres-repetitivo',
    languages: {
      'en-US':
        'https://www.vasquezlawnc.com/practice-areas/workers-compensation/repetitive-stress-carpal-tunnel',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/compensacion-laboral/estres-repetitivo',
    },
  },
};

const services = [
  {
    title: 'Síndrome del Túnel Carpiano',
    description: 'Compensación por lesiones de muñeca causadas por movimientos repetitivos.',
    features: [
      'Trabajo de computadora/tipeo',
      'Líneas de ensamblaje',
      'Herramientas vibradoras',
      'Cirugía de liberación',
      'Terapia física',
      'Modificaciones de trabajo',
    ],
  },
  {
    title: 'Lesiones de Espalda por Estrés',
    description: 'Problemas de espalda desarrollados gradualmente por actividades laborales.',
    features: [
      'Levantamiento repetitivo',
      'Doblarse constantemente',
      'Posiciones incómodas',
      'Vibración de vehículos',
      'Hernias de disco',
      'Dolor crónico de espalda',
    ],
  },
];

const faqs = [
  {
    question: '¿Están cubiertas las lesiones que se desarrollan lentamente?',
    answer:
      'Sí, las lesiones por estrés repetitivo están cubiertas bajo compensación laboral en NC, incluso si se desarrollan gradualmente con el tiempo. La clave es probar que se relacionan con el trabajo.',
  },
];

export default function EstresRepetitivoPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Lesiones por Estrés Repetitivo"
      subtitle="Compensación por Lesiones que Se Desarrollan con el Tiempo"
      description="No todas las lesiones laborales son súbitas. Las lesiones por estrés repetitivo pueden ser tan incapacitantes como accidentes agudos. Luchamos por beneficios completos."
      content={{
        introduction:
          'Las lesiones por estrés repetitivo como túnel carpiano, tendinitis y problemas de espalda se desarrollan gradualmente pero pueden ser devastadoras. Aseguramos que reciba la compensación completa que merece.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
