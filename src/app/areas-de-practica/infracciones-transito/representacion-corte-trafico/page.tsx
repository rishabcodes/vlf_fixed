import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Representación en Corte de Tráfico | Vasquez Law Firm',
  description: 'Representación profesional en corte de tráfico',
  keywords: 'representación en corte de tráfico, abogado, servicios legales, infracciones transito',
};

export default function RepresentacinenCortedeTrficoPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="representacion-corte-trafico"
      language="es"
    />
  );
}
