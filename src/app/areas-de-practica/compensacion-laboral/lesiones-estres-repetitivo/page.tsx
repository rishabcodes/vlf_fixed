import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Lesiones por Estrés Repetitivo | Vasquez Law Firm',
  description: 'Reclamos por túnel carpiano y otras lesiones por esfuerzo repetitivo',
  keywords: 'lesiones por estrés repetitivo, abogado, servicios legales, compensacion laboral',
};

export default function LesionesporEstrsRepetitivoPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="compensacion-laboral"
      subArea="lesiones-estres-repetitivo"
      language="es"
    />
  );
}
