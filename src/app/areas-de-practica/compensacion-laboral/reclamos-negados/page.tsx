import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Reclamos Negados | Vasquez Law Firm',
  description: 'Apelación de reclamos de compensación laboral negados',
  keywords: 'reclamos negados, abogado, servicios legales, compensacion laboral',
};

export default function ReclamosNegadosPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="compensacion-laboral"
      subArea="reclamos-negados"
      language="es"
    />
  );
}
