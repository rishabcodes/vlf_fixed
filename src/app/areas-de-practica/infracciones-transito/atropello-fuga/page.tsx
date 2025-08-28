import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Atropello y Fuga | Vasquez Law Firm',
  description: 'Defensa contra cargos de atropello y fuga',
  keywords: 'atropello y fuga, abogado, servicios legales, infracciones transito',
};

export default function AtropelloyFugaPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="atropello-fuga"
      language="es"
    />
  );
}
